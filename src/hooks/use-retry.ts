"use client"

import { retry, type RetryOptions } from "@/lib/retry"
import { useCallback, useEffect, useRef, useState } from "react"

interface UseRetryState<T> {
  data?: T
  error?: Error
  isLoading: boolean
  isRetrying: boolean
  attempt: number
}

interface UseRetryResult<T> extends UseRetryState<T> {
  execute: () => Promise<void>
  reset: () => void
}

interface UseAutoRetryResult<T> extends UseRetryState<T> {
  retry: () => Promise<void>
  reset: () => void
}

/**
 * Hook for retryable operations
 */
export function useRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): UseRetryResult<T> {
  const [state, setState] = useState<UseRetryState<T>>({
    isLoading: false,
    isRetrying: false,
    attempt: 0,
  })

  const execute = useCallback(async () => {
    setState(prev => ({
      ...prev,
      isLoading: true,
      isRetrying: prev.attempt > 0,
      error: undefined,
    }))

    try {
      const result = await retry(fn, {
        ...options,
        onRetry: (error, attempt) => {
          setState(prev => ({
            ...prev,
            attempt,
            isRetrying: true,
          }))
          options.onRetry?.(error, attempt)
        },
      })

      setState({
        data: result,
        isLoading: false,
        isRetrying: false,
        attempt: 0,
      })
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error : new Error("An error occurred"),
        isLoading: false,
        isRetrying: false,
      }))
    }
  }, [fn, options])

  const reset = useCallback(() => {
    setState({
      isLoading: false,
      isRetrying: false,
      attempt: 0,
    })
  }, [])

  return {
    ...state,
    execute,
    reset,
  }
}

/**
 * Hook for automatic retry on mount
 */
export function useAutoRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions & { enabled?: boolean } = {}
): UseAutoRetryResult<T> {
  const { enabled = true, ...rest } = options
  const retryOptions = rest as RetryOptions
  const { execute, reset, ...state } = useRetry(fn, retryOptions)
  const hasStartedRef = useRef(false)

  const retryNow = useCallback(async () => {
    hasStartedRef.current = true
    await execute()
  }, [execute])

  const resetState = useCallback(() => {
    hasStartedRef.current = false
    reset()
  }, [reset])

  useEffect(() => {
    if (!enabled) {
      hasStartedRef.current = false
      return
    }

    if (hasStartedRef.current) {
      return
    }

    void retryNow()
  }, [enabled, retryNow])

  const effectiveState =
    enabled && !hasStartedRef.current
      ? {
          ...state,
          isLoading: true,
        }
      : state

  return {
    ...effectiveState,
    retry: retryNow,
    reset: resetState,
  }
}
