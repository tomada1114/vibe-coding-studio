export interface RetryOptions {
  maxAttempts?: number
  initialDelay?: number
  maxDelay?: number
  backoffMultiplier?: number
  shouldRetry?: (error: unknown, attempt: number) => boolean
  onRetry?: (error: unknown, attempt: number) => void
}

export interface CircuitBreakerOptions {
  threshold?: number
  timeout?: number
  onOpen?: () => void
  onClose?: () => void
  onHalfOpen?: () => void
}

/**
 * Default retry options
 */
const defaultRetryOptions: Required<RetryOptions> = {
  maxAttempts: 3,
  initialDelay: 1000,
  maxDelay: 10000,
  backoffMultiplier: 2,
  shouldRetry: (error: unknown) => {
    // Don't retry on certain errors
    if (error instanceof Error) {
      // Don't retry on 4xx client errors (except 429)
      if ("status" in error && typeof error.status === "number") {
        if (error.status >= 400 && error.status < 500 && error.status !== 429) {
          return false
        }
      }
      // Don't retry on specific error types
      if (
        error.message.includes("Invalid") ||
        error.message.includes("Unauthorized")
      ) {
        return false
      }
    }
    return true
  },
  onRetry: () => {
    // Default: no-op
  },
}

/**
 * Circuit breaker state
 */
enum CircuitState {
  CLOSED = "CLOSED",
  OPEN = "OPEN",
  HALF_OPEN = "HALF_OPEN",
}

/**
 * Circuit breaker implementation
 */
export class CircuitBreaker {
  private state: CircuitState = CircuitState.CLOSED
  private failures = 0
  private lastFailureTime?: number
  private successCount = 0
  private readonly threshold: number
  private readonly timeout: number
  private readonly onOpen?: () => void
  private readonly onClose?: () => void
  private readonly onHalfOpen?: () => void

  constructor(options: CircuitBreakerOptions = {}) {
    this.threshold = options.threshold ?? 5
    this.timeout = options.timeout ?? 60000 // 1 minute
    this.onOpen = options.onOpen
    this.onClose = options.onClose
    this.onHalfOpen = options.onHalfOpen
  }

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    // Check if circuit should transition from OPEN to HALF_OPEN
    if (this.state === CircuitState.OPEN) {
      const now = Date.now()
      if (this.lastFailureTime && now - this.lastFailureTime >= this.timeout) {
        this.setState(CircuitState.HALF_OPEN)
      } else {
        throw new Error("Circuit breaker is OPEN")
      }
    }

    try {
      const result = await fn()
      this.onSuccess()
      return result
    } catch (error) {
      this.onFailure()
      throw error
    }
  }

  private onSuccess(): void {
    this.failures = 0

    if (this.state === CircuitState.HALF_OPEN) {
      this.successCount++
      // Require 3 successful calls to fully close the circuit
      if (this.successCount >= 3) {
        this.setState(CircuitState.CLOSED)
        this.successCount = 0
      }
    }
  }

  private onFailure(): void {
    this.failures++
    this.lastFailureTime = Date.now()
    this.successCount = 0

    if (this.failures >= this.threshold) {
      this.setState(CircuitState.OPEN)
    }
  }

  private setState(newState: CircuitState): void {
    const oldState = this.state
    this.state = newState

    if (oldState !== newState) {
      switch (newState) {
        case CircuitState.OPEN:
          this.onOpen?.()
          break
        case CircuitState.CLOSED:
          this.onClose?.()
          break
        case CircuitState.HALF_OPEN:
          this.onHalfOpen?.()
          break
      }
    }
  }

  getState(): CircuitState {
    return this.state
  }

  reset(): void {
    this.setState(CircuitState.CLOSED)
    this.failures = 0
    this.successCount = 0
    this.lastFailureTime = undefined
  }
}

/**
 * Retry a function with exponential backoff
 */
export async function retry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const opts = { ...defaultRetryOptions, ...options }
  let lastError: unknown

  for (let attempt = 1; attempt <= opts.maxAttempts; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error

      // Check if we should retry
      if (!opts.shouldRetry(error, attempt)) {
        throw error
      }

      // Don't retry if this was the last attempt
      if (attempt === opts.maxAttempts) {
        break
      }

      // Call the retry callback
      opts.onRetry(error, attempt)

      // Calculate delay with exponential backoff
      const delay = Math.min(
        opts.initialDelay * Math.pow(opts.backoffMultiplier, attempt - 1),
        opts.maxDelay
      )

      // Add jitter (±10%)
      const jitter = delay * 0.1
      const actualDelay = delay + (Math.random() * 2 - 1) * jitter

      // Wait before retrying
      await sleep(actualDelay)
    }
  }

  throw lastError
}

/**
 * Retry with circuit breaker
 */
export async function retryWithBreaker<T>(
  fn: () => Promise<T>,
  breaker: CircuitBreaker,
  retryOptions: RetryOptions = {}
): Promise<T> {
  return breaker.execute(() => retry(fn, retryOptions))
}

/**
 * Create a retryable fetch function
 */
export function createRetryableFetch(options: RetryOptions = {}): typeof fetch {
  return async (input: RequestInfo | URL, init?: RequestInit) => {
    return retry(
      async () => {
        const response = await fetch(input, init)

        // Throw on non-2xx responses so retry logic can handle them
        if (!response.ok) {
          const error = new Error(
            `HTTP ${response.status}: ${response.statusText}`
          ) as Error & { status: number }
          error.status = response.status
          throw error
        }

        return response
      },
      {
        ...options,
        shouldRetry: (error: unknown, attempt: number) => {
          // Use custom shouldRetry if provided
          if (options.shouldRetry) {
            return options.shouldRetry(error, attempt)
          }

          // Otherwise use default logic
          return defaultRetryOptions.shouldRetry(error, attempt)
        },
      }
    )
  }
}

/**
 * Sleep utility
 */
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Timeout wrapper for promises
 */
export async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  timeoutError = new Error("Operation timed out")
): Promise<T> {
  let timeoutId: NodeJS.Timeout

  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => reject(timeoutError), timeoutMs)
  })

  try {
    const result = await Promise.race([promise, timeoutPromise])
    clearTimeout(timeoutId!)
    return result
  } catch (error) {
    clearTimeout(timeoutId!)
    throw error
  }
}

/**
 * Batch retry for multiple operations
 */
export async function batchRetry<T>(
  operations: Array<() => Promise<T>>,
  options: RetryOptions & { concurrency?: number } = {}
): Promise<Array<{ success: boolean; result?: T; error?: unknown }>> {
  const concurrency = options.concurrency ?? 3
  const results: Array<{ success: boolean; result?: T; error?: unknown }> = []

  // Process in batches
  for (let i = 0; i < operations.length; i += concurrency) {
    const batch = operations.slice(i, i + concurrency)
    const batchResults = await Promise.all(
      batch.map(async operation => {
        try {
          const result = await retry(operation, options)
          return { success: true, result }
        } catch (error) {
          return { success: false, error }
        }
      })
    )
    results.push(...batchResults)
  }

  return results
}
