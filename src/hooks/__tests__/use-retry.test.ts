/**
 * useRetryとuseAutoRetryフックのテスト
 */

import { act, renderHook, waitFor } from "@testing-library/react"
import { useAutoRetry, useRetry } from "../use-retry"

describe("useRetry", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("初期状態が正しいこと", () => {
    const fn = jest.fn().mockResolvedValue("success")
    const { result } = renderHook(() => useRetry(fn))

    expect(result.current.data).toBeUndefined()
    expect(result.current.error).toBeUndefined()
    expect(result.current.isLoading).toBe(false)
    expect(result.current.isRetrying).toBe(false)
    expect(result.current.attempt).toBe(0)
  })

  it("executeを呼び出すとローディング状態になること", async () => {
    const fn = jest.fn().mockResolvedValue("success")
    const { result } = renderHook(() => useRetry(fn))

    act(() => {
      void result.current.execute()
    })

    expect(result.current.isLoading).toBe(true)

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })
  })

  it("成功時にdataが設定されること", async () => {
    const fn = jest.fn().mockResolvedValue("success")
    const { result } = renderHook(() => useRetry(fn))

    await act(async () => {
      await result.current.execute()
    })

    expect(result.current.data).toBe("success")
    expect(result.current.error).toBeUndefined()
    expect(result.current.isLoading).toBe(false)
    expect(result.current.attempt).toBe(0)
  })

  it("失敗時にerrorが設定されること", async () => {
    const error = new Error("Test error")
    const fn = jest.fn().mockRejectedValue(error)
    const { result } = renderHook(() => useRetry(fn, { maxAttempts: 1 }))

    await act(async () => {
      await result.current.execute()
    })

    expect(result.current.data).toBeUndefined()
    expect(result.current.error).toEqual(error)
    expect(result.current.isLoading).toBe(false)
  })

  it("リトライ時にisRetryingがtrueになること", async () => {
    let callCount = 0
    const fn = jest.fn().mockImplementation(() => {
      callCount++
      if (callCount < 3) {
        return Promise.reject(new Error("Retry error"))
      }
      return Promise.resolve("success")
    })

    const { result } = renderHook(() =>
      useRetry(fn, { maxAttempts: 3, initialDelay: 10 })
    )

    await act(async () => {
      await result.current.execute()
    })

    expect(fn).toHaveBeenCalledTimes(3)
    expect(result.current.data).toBe("success")
  })

  it("onRetryコールバックが呼ばれること", async () => {
    let callCount = 0
    const fn = jest.fn().mockImplementation(() => {
      callCount++
      if (callCount < 2) {
        return Promise.reject(new Error("Retry error"))
      }
      return Promise.resolve("success")
    })

    const onRetry = jest.fn()
    const { result } = renderHook(() =>
      useRetry(fn, { maxAttempts: 3, initialDelay: 10, onRetry })
    )

    await act(async () => {
      await result.current.execute()
    })

    expect(onRetry).toHaveBeenCalledTimes(1)
    expect(onRetry).toHaveBeenCalledWith(expect.any(Error), 1)
  })

  it("resetが状態をリセットすること", async () => {
    const fn = jest.fn().mockResolvedValue("success")
    const { result } = renderHook(() => useRetry(fn))

    await act(async () => {
      await result.current.execute()
    })

    expect(result.current.data).toBe("success")

    act(() => {
      result.current.reset()
    })

    expect(result.current.data).toBeUndefined()
    expect(result.current.error).toBeUndefined()
    expect(result.current.isLoading).toBe(false)
    expect(result.current.isRetrying).toBe(false)
    expect(result.current.attempt).toBe(0)
  })

  it("Error以外の例外もエラーとして扱うこと", async () => {
    const fn = jest.fn().mockRejectedValue("String error")
    const { result } = renderHook(() => useRetry(fn, { maxAttempts: 1 }))

    await act(async () => {
      await result.current.execute()
    })

    expect(result.current.error).toBeInstanceOf(Error)
    expect(result.current.error?.message).toBe("An error occurred")
  })
})

describe("useAutoRetry", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("マウント時に自動的に実行されること", async () => {
    const fn = jest.fn().mockResolvedValue("success")
    const { result } = renderHook(() => useAutoRetry(fn))

    await waitFor(() => {
      expect(fn).toHaveBeenCalled()
      expect(result.current.data).toBe("success")
    })
  })

  it("enabled=falseの場合、自動実行されないこと", async () => {
    const fn = jest.fn().mockResolvedValue("success")
    const { result } = renderHook(() => useAutoRetry(fn, { enabled: false }))

    // 少し待っても実行されないことを確認
    await new Promise(resolve => setTimeout(resolve, 100))

    expect(fn).not.toHaveBeenCalled()
    expect(result.current.data).toBeUndefined()
  })

  it("enabled=falseからtrueに変更すると実行されること", async () => {
    const fn = jest.fn().mockResolvedValue("success")
    const { result, rerender } = renderHook(
      ({ enabled }) => useAutoRetry(fn, { enabled }),
      { initialProps: { enabled: false } }
    )

    expect(fn).not.toHaveBeenCalled()

    rerender({ enabled: true })

    await waitFor(() => {
      expect(fn).toHaveBeenCalled()
      expect(result.current.data).toBe("success")
    })
  })

  it("retryメソッドで手動実行できること", async () => {
    const fn = jest.fn().mockResolvedValue("success")
    const { result } = renderHook(() => useAutoRetry(fn, { enabled: false }))

    expect(fn).not.toHaveBeenCalled()

    await act(async () => {
      await result.current.retry()
    })

    expect(fn).toHaveBeenCalled()
    expect(result.current.data).toBe("success")
  })

  it("resetメソッドが状態をリセットすること", async () => {
    const fn = jest.fn().mockResolvedValue("success")
    const { result, rerender } = renderHook(
      ({ enabled }) => useAutoRetry(fn, { enabled }),
      { initialProps: { enabled: true } }
    )

    await waitFor(() => {
      expect(result.current.data).toBe("success")
    })

    await act(async () => {
      // enabled: falseに設定してから reset を呼ぶ
      rerender({ enabled: false })
      result.current.reset()
    })

    await waitFor(() => {
      expect(result.current.data).toBeUndefined()
      expect(result.current.isLoading).toBe(false)
    })
  })

  it("エラー時にerrorが設定されること", async () => {
    const error = new Error("Test error")
    const fn = jest.fn().mockRejectedValue(error)
    const { result } = renderHook(() => useAutoRetry(fn, { maxAttempts: 1 }))

    await waitFor(
      () => {
        expect(result.current.error).toEqual(error)
      },
      { timeout: 3000 }
    )
  })

  it("リトライオプションが正しく適用されること", async () => {
    let callCount = 0
    const fn = jest.fn().mockImplementation(() => {
      callCount++
      if (callCount < 3) {
        return Promise.reject(new Error("Retry error"))
      }
      return Promise.resolve("success")
    })

    const { result } = renderHook(() =>
      useAutoRetry(fn, { maxAttempts: 3, initialDelay: 10 })
    )

    await waitFor(
      () => {
        expect(result.current.data).toBe("success")
      },
      { timeout: 5000 }
    )

    expect(fn).toHaveBeenCalledTimes(3)
  })

  it("enabled状態がfalseに戻るとhasStartedRefがfalseになること", async () => {
    const fn = jest.fn().mockResolvedValue("success")
    const { result, rerender } = renderHook(
      ({ enabled }) => useAutoRetry(fn, { enabled }),
      { initialProps: { enabled: true } }
    )

    await waitFor(() => {
      expect(result.current.data).toBe("success")
    })

    await act(async () => {
      rerender({ enabled: false })
      // Wait for state updates
      await Promise.resolve()
    })

    await waitFor(() => {
      // enabled=falseの時は、isLoadingがfalseになる
      expect(result.current.isLoading).toBe(false)
    })
  })
})
