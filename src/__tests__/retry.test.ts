import {
  batchRetry,
  CircuitBreaker,
  createRetryableFetch,
  retry,
  retryWithBreaker,
  withTimeout,
} from "@/lib/retry"

describe("retry", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("returns successful result without retrying", async () => {
    const fn = jest.fn().mockResolvedValue("success")
    const result = await retry(fn)

    expect(result).toBe("success")
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it("retries on failure up to maxAttempts", async () => {
    const fn = jest
      .fn()
      .mockRejectedValueOnce(new Error("fail1"))
      .mockRejectedValueOnce(new Error("fail2"))
      .mockResolvedValue("success")

    const result = await retry(fn, { maxAttempts: 3 })

    expect(result).toBe("success")
    expect(fn).toHaveBeenCalledTimes(3)
  })

  it("throws after maxAttempts", async () => {
    const fn = jest.fn().mockRejectedValue(new Error("persistent failure"))

    await expect(retry(fn, { maxAttempts: 3 })).rejects.toThrow(
      "persistent failure"
    )
    expect(fn).toHaveBeenCalledTimes(3)
  })

  it("does not retry when shouldRetry returns false", async () => {
    const fn = jest.fn().mockRejectedValue(new Error("Invalid request"))
    const shouldRetry = jest.fn().mockReturnValue(false)

    await expect(retry(fn, { shouldRetry })).rejects.toThrow("Invalid request")
    expect(fn).toHaveBeenCalledTimes(1)
    expect(shouldRetry).toHaveBeenCalledWith(expect.any(Error), 1)
  })

  it("calls onRetry callback", async () => {
    const fn = jest
      .fn()
      .mockRejectedValueOnce(new Error("fail"))
      .mockResolvedValue("success")
    const onRetry = jest.fn()

    await retry(fn, { onRetry })

    expect(onRetry).toHaveBeenCalledWith(expect.any(Error), 1)
  })

  it("uses exponential backoff with jitter", async () => {
    const fn = jest
      .fn()
      .mockRejectedValueOnce(new Error("fail1"))
      .mockRejectedValueOnce(new Error("fail2"))
      .mockResolvedValue("success")

    const start = Date.now()
    await retry(fn, {
      maxAttempts: 3,
      initialDelay: 100,
      backoffMultiplier: 2,
    })
    const duration = Date.now() - start

    // Should take roughly 100ms + 200ms = 300ms (plus some jitter and execution time)
    expect(duration).toBeGreaterThanOrEqual(250)
    expect(duration).toBeLessThan(500)
  })

  it("respects maxDelay", async () => {
    const fn = jest
      .fn()
      .mockRejectedValueOnce(new Error("fail1"))
      .mockRejectedValueOnce(new Error("fail2"))
      .mockResolvedValue("success")

    const start = Date.now()
    await retry(fn, {
      maxAttempts: 3,
      initialDelay: 1000,
      maxDelay: 100,
      backoffMultiplier: 10,
    })
    const duration = Date.now() - start

    // Should be limited by maxDelay (2 retries × 100ms + overhead)
    // より安定したテスト実行のため、余裕を持った閾値を設定
    expect(duration).toBeLessThan(800)
  })

  it("does not retry on 4xx errors except 429", async () => {
    const error400 = new Error("Bad Request") as Error & { status: number }
    error400.status = 400

    const fn = jest.fn().mockRejectedValue(error400)

    await expect(retry(fn)).rejects.toThrow("Bad Request")
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it("retries on 429 errors", async () => {
    const error429 = new Error("Too Many Requests") as Error & {
      status: number
    }
    error429.status = 429

    const fn = jest
      .fn()
      .mockRejectedValueOnce(error429)
      .mockResolvedValue("success")

    const result = await retry(fn, { initialDelay: 10 })
    expect(result).toBe("success")
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it("retries on 5xx errors", async () => {
    const error500 = new Error("Internal Server Error") as Error & {
      status: number
    }
    error500.status = 500

    const fn = jest
      .fn()
      .mockRejectedValueOnce(error500)
      .mockResolvedValue("success")

    const result = await retry(fn, { initialDelay: 10 })
    expect(result).toBe("success")
    expect(fn).toHaveBeenCalledTimes(2)
  })
})

describe("CircuitBreaker", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("allows calls when circuit is closed", async () => {
    const breaker = new CircuitBreaker()
    const fn = jest.fn().mockResolvedValue("success")

    const result = await breaker.execute(fn)

    expect(result).toBe("success")
    expect(fn).toHaveBeenCalled()
  })

  it("opens circuit after threshold failures", async () => {
    const breaker = new CircuitBreaker({ threshold: 3 })
    const fn = jest.fn().mockRejectedValue(new Error("fail"))

    // Fail 3 times to open circuit
    for (let i = 0; i < 3; i++) {
      await expect(breaker.execute(fn)).rejects.toThrow("fail")
    }

    // Circuit should now be open
    await expect(breaker.execute(fn)).rejects.toThrow("Circuit breaker is OPEN")
    expect(fn).toHaveBeenCalledTimes(3) // Should not call fn when open
  })

  it("transitions to half-open after timeout", async () => {
    const breaker = new CircuitBreaker({ threshold: 1, timeout: 100 })
    const fn = jest
      .fn()
      .mockRejectedValueOnce(new Error("fail"))
      .mockResolvedValue("success")

    // Open the circuit
    await expect(breaker.execute(fn)).rejects.toThrow("fail")

    // Wait for timeout
    await new Promise(resolve => setTimeout(resolve, 150))

    // Should be half-open now and allow one call
    const result = await breaker.execute(fn)
    expect(result).toBe("success")
  })

  it("closes circuit after successful calls in half-open state", async () => {
    const breaker = new CircuitBreaker({ threshold: 1, timeout: 100 })
    const fn = jest
      .fn()
      .mockRejectedValueOnce(new Error("fail"))
      .mockResolvedValue("success")

    // Open the circuit
    await expect(breaker.execute(fn)).rejects.toThrow("fail")

    // Wait for timeout
    await new Promise(resolve => setTimeout(resolve, 150))

    // Make 3 successful calls to close the circuit
    for (let i = 0; i < 3; i++) {
      await breaker.execute(fn)
    }

    expect(breaker.getState()).toBe("CLOSED")
  })

  it("reopens circuit on failure in half-open state", async () => {
    const breaker = new CircuitBreaker({ threshold: 1, timeout: 100 })
    const fn = jest.fn().mockRejectedValue(new Error("fail"))

    // Open the circuit
    await expect(breaker.execute(fn)).rejects.toThrow("fail")

    // Wait for timeout
    await new Promise(resolve => setTimeout(resolve, 150))

    // Fail again in half-open state
    await expect(breaker.execute(fn)).rejects.toThrow("fail")

    // Should be open again
    await expect(breaker.execute(fn)).rejects.toThrow("Circuit breaker is OPEN")
  })

  it("calls lifecycle callbacks", async () => {
    const onOpen = jest.fn()
    const onClose = jest.fn()
    const onHalfOpen = jest.fn()

    const breaker = new CircuitBreaker({
      threshold: 1,
      timeout: 100,
      onOpen,
      onClose,
      onHalfOpen,
    })

    const fn = jest
      .fn()
      .mockRejectedValueOnce(new Error("fail"))
      .mockResolvedValue("success")

    // Open the circuit
    await expect(breaker.execute(fn)).rejects.toThrow("fail")
    expect(onOpen).toHaveBeenCalled()

    // Wait for timeout
    await new Promise(resolve => setTimeout(resolve, 150))

    // Transition to half-open
    await breaker.execute(fn)
    expect(onHalfOpen).toHaveBeenCalled()

    // Close the circuit
    for (let i = 0; i < 2; i++) {
      await breaker.execute(fn)
    }
    expect(onClose).toHaveBeenCalled()
  })

  it("resets circuit state", () => {
    const breaker = new CircuitBreaker({ threshold: 1 })
    const fn = jest.fn().mockRejectedValue(new Error("fail"))

    // Open the circuit
    breaker.execute(fn).catch(() => {})

    // Reset
    breaker.reset()
    expect(breaker.getState()).toBe("CLOSED")
  })
})

describe("retryWithBreaker", () => {
  it("combines retry and circuit breaker", async () => {
    const breaker = new CircuitBreaker()
    const fn = jest
      .fn()
      .mockRejectedValueOnce(new Error("fail"))
      .mockResolvedValue("success")

    const result = await retryWithBreaker(fn, breaker, { initialDelay: 10 })

    expect(result).toBe("success")
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it("respects circuit breaker state", async () => {
    const breaker = new CircuitBreaker({ threshold: 1 })
    const fn = jest.fn().mockRejectedValue(new Error("fail"))

    // Open the circuit
    await expect(
      retryWithBreaker(fn, breaker, { maxAttempts: 1 })
    ).rejects.toThrow("fail")

    // Circuit should be open
    await expect(retryWithBreaker(fn, breaker)).rejects.toThrow(
      "Circuit breaker is OPEN"
    )
  })
})

describe("createRetryableFetch", () => {
  let originalFetch: typeof global.fetch

  beforeEach(() => {
    originalFetch = global.fetch
  })

  afterEach(() => {
    global.fetch = originalFetch
  })

  it("retries failed fetch requests", async () => {
    const mockFetch = jest
      .fn()
      .mockRejectedValueOnce(new Error("Network error"))
      .mockResolvedValue({ ok: true, status: 200 } as Response)

    global.fetch = mockFetch

    const retryableFetch = createRetryableFetch({ initialDelay: 10 })
    const result = await retryableFetch("https://api.example.com")

    expect(result.ok).toBe(true)
    expect(mockFetch).toHaveBeenCalledTimes(2)
  })

  it("throws on non-2xx responses", async () => {
    const mockFetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 404,
      statusText: "Not Found",
    } as Response)

    global.fetch = mockFetch

    const retryableFetch = createRetryableFetch()

    await expect(retryableFetch("https://api.example.com")).rejects.toThrow(
      "HTTP 404: Not Found"
    )
  })

  it("does not retry 4xx errors by default", async () => {
    const mockFetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 400,
      statusText: "Bad Request",
    } as Response)

    global.fetch = mockFetch

    const retryableFetch = createRetryableFetch()

    await expect(retryableFetch("https://api.example.com")).rejects.toThrow(
      "HTTP 400: Bad Request"
    )

    expect(mockFetch).toHaveBeenCalledTimes(1)
  })

  it("retries 5xx errors", async () => {
    const mockFetch = jest
      .fn()
      .mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: "Internal Server Error",
      } as Response)
      .mockResolvedValue({ ok: true, status: 200 } as Response)

    global.fetch = mockFetch

    const retryableFetch = createRetryableFetch({ initialDelay: 10 })
    const result = await retryableFetch("https://api.example.com")

    expect(result.ok).toBe(true)
    expect(mockFetch).toHaveBeenCalledTimes(2)
  })
})

describe("withTimeout", () => {
  it("resolves when promise completes within timeout", async () => {
    const promise = new Promise(resolve =>
      setTimeout(() => resolve("success"), 50)
    )
    const result = await withTimeout(promise, 100)

    expect(result).toBe("success")
  })

  it("rejects when promise exceeds timeout", async () => {
    const promise = new Promise(resolve =>
      setTimeout(() => resolve("success"), 200)
    )

    await expect(withTimeout(promise, 50)).rejects.toThrow(
      "Operation timed out"
    )
  })

  it("uses custom timeout error", async () => {
    const promise = new Promise(resolve =>
      setTimeout(() => resolve("success"), 200)
    )
    const customError = new Error("Custom timeout")

    await expect(withTimeout(promise, 50, customError)).rejects.toThrow(
      "Custom timeout"
    )
  })

  it("cleans up timeout on success", async () => {
    const clearTimeoutSpy = jest.spyOn(global, "clearTimeout")
    const promise = Promise.resolve("success")

    await withTimeout(promise, 100)

    expect(clearTimeoutSpy).toHaveBeenCalled()
    clearTimeoutSpy.mockRestore()
  })

  it("cleans up timeout on rejection", async () => {
    const clearTimeoutSpy = jest.spyOn(global, "clearTimeout")
    const promise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("fail")), 50)
    )

    await expect(withTimeout(promise, 100)).rejects.toThrow("fail")

    expect(clearTimeoutSpy).toHaveBeenCalled()
    clearTimeoutSpy.mockRestore()
  })
})

describe("batchRetry", () => {
  it("processes all operations", async () => {
    const operations = [
      jest.fn().mockResolvedValue("result1"),
      jest.fn().mockResolvedValue("result2"),
      jest.fn().mockResolvedValue("result3"),
    ]

    const results = await batchRetry(operations)

    expect(results).toHaveLength(3)
    expect(results[0]).toEqual({ success: true, result: "result1" })
    expect(results[1]).toEqual({ success: true, result: "result2" })
    expect(results[2]).toEqual({ success: true, result: "result3" })
  })

  it("handles mixed success and failure", async () => {
    const operations = [
      jest.fn().mockResolvedValue("success"),
      jest.fn().mockRejectedValue(new Error("fail")),
      jest.fn().mockResolvedValue("success2"),
    ]

    const results = await batchRetry(operations, { maxAttempts: 1 })

    expect(results).toHaveLength(3)
    expect(results[0]).toEqual({ success: true, result: "success" })
    expect(results[1]).toEqual({ success: false, error: expect.any(Error) })
    expect(results[2]).toEqual({ success: true, result: "success2" })
  })

  it("respects concurrency limit", async () => {
    let concurrent = 0
    let maxConcurrent = 0

    const operations = Array.from({ length: 6 }, () =>
      jest.fn().mockImplementation(async () => {
        concurrent++
        maxConcurrent = Math.max(maxConcurrent, concurrent)
        await new Promise(resolve => setTimeout(resolve, 50))
        concurrent--
        return "result"
      })
    )

    await batchRetry(operations, { concurrency: 2 })

    expect(maxConcurrent).toBeLessThanOrEqual(2)
  })

  it("retries failed operations", async () => {
    const operation = jest
      .fn()
      .mockRejectedValueOnce(new Error("fail"))
      .mockResolvedValue("success")

    const results = await batchRetry([operation], { initialDelay: 10 })

    expect(results[0]).toEqual({ success: true, result: "success" })
    expect(operation).toHaveBeenCalledTimes(2)
  })
})
