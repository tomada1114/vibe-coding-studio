import { useAutoRetry } from "@/hooks/use-retry"
import { act, renderHook, waitFor } from "@testing-library/react"
import React from "react"

describe("useAutoRetry", () => {
  const strictWrapper = ({ children }: { children: React.ReactNode }) => (
    <React.StrictMode>{children}</React.StrictMode>
  )

  it("runs the async task once on mount even under Strict Mode", async () => {
    const fn = jest.fn().mockResolvedValue("ok")

    const { result } = renderHook(() => useAutoRetry(fn), {
      wrapper: strictWrapper,
    })

    expect(result.current.isLoading).toBe(true)

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false)
      },
      { timeout: 2000 }
    )

    expect(fn).toHaveBeenCalledTimes(1)
    expect(result.current.data).toBe("ok")
    expect(result.current.error).toBeUndefined()
    expect(result.current.attempt).toBe(0)
  })

  it("does not auto run when disabled but can be retried manually", async () => {
    const fn = jest.fn().mockResolvedValue("manual")

    const { result } = renderHook(() => useAutoRetry(fn, { enabled: false }), {
      wrapper: strictWrapper,
    })

    expect(fn).not.toHaveBeenCalled()
    expect(result.current.isLoading).toBe(false)

    await act(async () => {
      await result.current.retry()
    })

    expect(fn).toHaveBeenCalledTimes(1)
    expect(result.current.data).toBe("manual")
    expect(result.current.error).toBeUndefined()
  })

  it("exposes retry API that updates attempt count on failures", async () => {
    const failingOnce = jest
      .fn()
      .mockRejectedValueOnce(new Error("fail"))
      .mockResolvedValue("recovered")

    const { result } = renderHook(() => useAutoRetry(failingOnce), {
      wrapper: strictWrapper,
    })

    expect(result.current.isLoading).toBe(true)

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false)
      },
      { timeout: 2000 }
    )

    expect(failingOnce).toHaveBeenCalledTimes(2)
    expect(result.current.data).toBe("recovered")
    expect(result.current.attempt).toBe(0)
    expect(result.current.isRetrying).toBe(false)

    await act(async () => {
      await result.current.retry()
    })

    expect(failingOnce).toHaveBeenCalledTimes(3)
    expect(result.current.data).toBe("recovered")
  })
})
