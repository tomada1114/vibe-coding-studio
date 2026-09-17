import GlobalError from "@/app/global-error"
import { fireEvent, render, screen } from "@testing-library/react"

describe("Global error page", () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it("renders its standalone document shell and recovery actions", () => {
    const reset = jest.fn()
    render(<GlobalError error={new Error("global failure")} reset={reset} />)

    const html = document.documentElement
    expect(html).toHaveAttribute("lang", "ja")
    expect(html).toHaveAttribute("data-theme", "dark")
    expect(document.head.querySelector("script")).toHaveTextContent(
      "data-theme"
    )

    const body = document.body
    expect(body).toHaveClass("gg-surface", "antialiased")
    expect(
      screen.getByRole("link", { name: "メインコンテンツへスキップ" })
    ).toHaveAttribute("href", "#main-content")
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
    const error = new Error("global failure")

    try {
      render(<GlobalError error={error} reset={jest.fn()} />)

      if (shouldLog) {
        expect(consoleError).toHaveBeenCalledWith("[app/global-error]", error)
      } else {
        expect(consoleError).not.toHaveBeenCalled()
      }
    } finally {
      environment.restore()
    }
  })
})
