import { act, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { CopyDescriptionButton } from "../copy-description-button"

describe("CopyDescriptionButton", () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  it("クリックで全文がクリップボードに書き込まれる", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    const writeText = jest.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    })

    render(<CopyDescriptionButton text="概要欄の全文テキスト" />)
    await user.click(screen.getByRole("button", { name: "概要欄をコピー" }))

    expect(writeText).toHaveBeenCalledWith("概要欄の全文テキスト")
    expect(
      await screen.findByRole("button", { name: "コピーしました" })
    ).toBeInTheDocument()
  })

  it("コピー成功時にラベルが「コピーしました」に切り替わり、2秒後に戻る", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    const writeText = jest.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    })

    render(<CopyDescriptionButton text="text" />)
    await user.click(screen.getByRole("button", { name: "概要欄をコピー" }))

    expect(
      await screen.findByRole("button", { name: "コピーしました" })
    ).toBeInTheDocument()

    await act(async () => {
      await jest.advanceTimersByTimeAsync(2000)
    })
    expect(
      screen.getByRole("button", { name: "概要欄をコピー" })
    ).toBeInTheDocument()
  })

  it("コピー失敗時は握りつぶさず「コピーできませんでした」を表示する", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    const writeText = jest.fn().mockRejectedValue(new Error("not allowed"))
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    })

    render(<CopyDescriptionButton text="text" />)
    await user.click(screen.getByRole("button", { name: "概要欄をコピー" }))

    expect(
      await screen.findByRole("button", { name: "コピーできませんでした" })
    ).toBeInTheDocument()

    await act(async () => {
      await jest.advanceTimersByTimeAsync(2000)
    })
    expect(
      screen.getByRole("button", { name: "概要欄をコピー" })
    ).toBeInTheDocument()
  })
})
