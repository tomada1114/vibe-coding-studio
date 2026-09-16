/**
 * @jest-environment jsdom
 */

import { render, screen, waitFor } from "@testing-library/react"
import { DiscordMemberCountClient } from "../discord-member-count-client"

function mockMatchMedia(reducedMotion: boolean) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query: string) => ({
      matches:
        query === "(prefers-reduced-motion: reduce)" ? reducedMotion : false,
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    })),
  })
}

describe("DiscordMemberCountClient", () => {
  it("framer-motion に依存せずレンダリングされる", () => {
    mockMatchMedia(true)
    const { container } = render(
      <DiscordMemberCountClient formattedCount="1,230+" />
    )
    expect(container.textContent).toContain("名の仲間が参加中")
  })

  it("prefers-reduced-motion 時は即座に最終値を表示する", () => {
    mockMatchMedia(true)
    render(<DiscordMemberCountClient formattedCount="1,230+" />)

    expect(screen.getByText(/1,230\+/)).toBeInTheDocument()
  })

  it("通常時は rAF カウントアップで最終値に到達する", async () => {
    mockMatchMedia(false)
    render(<DiscordMemberCountClient formattedCount="560+" />)

    await waitFor(
      () => {
        expect(screen.getByText(/^560\+$/)).toBeInTheDocument()
      },
      { timeout: 3000 }
    )
  })

  it("数値は mono フォントで表示される", () => {
    mockMatchMedia(true)
    const { container } = render(
      <DiscordMemberCountClient formattedCount="1,230+" />
    )
    const numberSpan = container.querySelector(".gg-meta")
    expect(numberSpan).toBeInTheDocument()
    expect(numberSpan).toHaveClass("text-[32px]")
  })
})
