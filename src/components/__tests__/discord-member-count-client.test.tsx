/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react"
import { DiscordMemberCountClient } from "../discord-member-count-client"

describe("DiscordMemberCountClient", () => {
  it("サーバーで整形された値をそのままレンダリングする", () => {
    const { container } = render(
      <DiscordMemberCountClient formattedCount="1,230+" />
    )
    expect(container.textContent).toContain("名の仲間が参加中")
    expect(screen.getByText("1,230+")).toBeInTheDocument()
  })

  it("カスタムラベルを表示できる", () => {
    render(
      <DiscordMemberCountClient
        formattedCount="560+"
        label="members learning together"
      />
    )
    expect(screen.getByText("560+")).toBeInTheDocument()
    expect(screen.getByText("members learning together")).toBeInTheDocument()
  })

  it("数値は mono フォントで表示される", () => {
    const { container } = render(
      <DiscordMemberCountClient formattedCount="1,230+" />
    )
    const numberSpan = container.querySelector(".gg-meta")
    expect(numberSpan).toBeInTheDocument()
    expect(numberSpan).toHaveClass("text-[32px]")
  })
})
