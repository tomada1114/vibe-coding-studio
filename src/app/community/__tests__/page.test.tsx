/**
 * コミュニティページのテスト
 */

import CommunityPage from "@/app/community/page"
import { DISCORD_INVITE_URL } from "@/lib/constants"
import { render, screen } from "@testing-library/react"

jest.mock("@/components/discord-member-count", () => ({
  DiscordMemberCount: () => null,
}))

describe("コミュニティページ（/community）", () => {
  it("主要メッセージと Discord 導線を表示する", () => {
    render(<CommunityPage />)

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /AI駆動開発を.*一緒に学ぶ仲間が待っています/,
      })
    ).toBeInTheDocument()

    const links = screen.getAllByRole("link", { name: "Discordに参加する" })
    expect(links).toHaveLength(2)
    links.forEach(link => {
      expect(link).toHaveAttribute("href", DISCORD_INVITE_URL)
      expect(link).toHaveAttribute("target", "_blank")
      expect(link).toHaveAttribute("rel", "noopener noreferrer")
    })
  })

  it("既存のコミュニティ情報をセルへ移す", () => {
    const { container } = render(<CommunityPage />)

    expect(
      screen.getByRole("heading", { name: "ここで得られること" })
    ).toBeInTheDocument()
    expect(
      screen.getByRole("heading", { name: "コミュニティについて" })
    ).toBeInTheDocument()
    expect(
      screen.getByRole("heading", { name: "チャンネル紹介" })
    ).toBeInTheDocument()
    expect(
      screen.getByText(/AI駆動開発を学ぶ仲間が集まる場所/)
    ).toBeInTheDocument()
    expect(
      screen.getByRole("heading", { name: "自己紹介", level: 3 })
    ).toBeInTheDocument()
    expect(
      screen.getByRole("heading", { name: "学習報告", level: 3 })
    ).toBeInTheDocument()
    expect(
      screen.getByRole("heading", { name: "とまだの検証部屋", level: 3 })
    ).toBeInTheDocument()
    expect(container.querySelectorAll(".gg-cell-grid").length).toBeGreaterThan(
      3
    )
    expect(container.querySelectorAll("svg")).toHaveLength(0)
  })

  it("FAQ をネイティブ details として表示する", () => {
    const { container } = render(<CommunityPage />)

    expect(
      screen.getByRole("heading", { name: "よくある質問" })
    ).toBeInTheDocument()
    const details = container.querySelectorAll("details")
    expect(details).toHaveLength(5)
    details.forEach(item => expect(item).not.toHaveAttribute("open"))
    expect(container.querySelectorAll("[data-headlessui-state]")).toHaveLength(
      0
    )
  })

  it("レスポンシブなセル構成と単一の main を持つ", () => {
    const { container } = render(<CommunityPage />)
    const htmlContent = container.innerHTML

    expect(container.querySelectorAll("main")).toHaveLength(1)
    expect(htmlContent).toMatch(/sm:|md:|lg:/)
    expect(htmlContent).toContain("grid-cols-1")
    expect(htmlContent).toContain("md:grid-cols-2")
    expect(htmlContent).toContain("lg:grid-cols-3")
    expect(htmlContent).toContain("flex-col")
    expect(htmlContent).toContain("sm:flex-row")
  })

  it("ページメタデータを公開する", async () => {
    const pageModule = await import("@/app/community/page")

    expect(pageModule.metadata).toMatchObject({
      title: "コミュニティ",
      description: expect.stringContaining("Discord"),
    })
  })
})
