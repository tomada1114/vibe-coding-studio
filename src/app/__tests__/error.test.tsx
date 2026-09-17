import ErrorPage from "@/app/error"
import { fireEvent, render, screen } from "@testing-library/react"

describe("Error page", () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it("renders the error message and its recovery actions", () => {
    const reset = jest.fn()
    const error = new Error("page failed")

    render(<ErrorPage error={error} reset={reset} />)

    expect(
      screen.getByRole("heading", { name: "エラーが発生しました" })
    ).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "ホームに戻る" })).toHaveAttribute(
      "href",
      "/"
    )

    fireEvent.click(screen.getByRole("button", { name: "再試行する" }))
    expect(reset).toHaveBeenCalledTimes(1)
  })

  it.each([
    { nodeEnv: "development" as const, shouldLog: true },
    { nodeEnv: "production" as const, shouldLog: false },
  ])("logs the error only in $nodeEnv", ({ nodeEnv, shouldLog }) => {
    const consoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => {})
    const environment = jest.replaceProperty(process.env, "NODE_ENV", nodeEnv)
    const error = new Error("page failed")

    try {
      render(<ErrorPage error={error} reset={jest.fn()} />)

      if (shouldLog) {
        expect(consoleError).toHaveBeenCalledWith("[app/error]", error)
      } else {
        expect(consoleError).not.toHaveBeenCalled()
      }
    } finally {
      environment.restore()
    }
  })
})
