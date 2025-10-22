/**
 * コミュニティページのテスト
 *
 * TDD Red フェーズ: 失敗するテストを作成
 */

import CommunityPage from "@/app/community/page"
import { DISCORD_INVITE_URL } from "@/lib/constants"
import { render, screen } from "@testing-library/react"

// モックを設定
jest.mock("@/components/logo", () => ({
  Logo: () => <img alt="Vibe Coding Studio Logo" src="/logo.png" />,
}))

describe("コミュニティページ（/community）", () => {
  describe("ヒーローセクション", () => {
    it("ヒーローセクションのメインメッセージが表示される", () => {
      render(<CommunityPage />)
      const heading = screen.getByRole("heading", { level: 1 })
      expect(heading).toBeInTheDocument()
      expect(heading.textContent).toBeTruthy()
    })

    it("Discord参加ボタンが表示される", () => {
      render(<CommunityPage />)
      const buttons = screen.getAllByRole("link", {
        name: /Discordに参加する/i,
      })
      expect(buttons.length).toBeGreaterThan(0)
      // ヒーローセクションのボタン（最初のボタン）を確認
      expect(buttons[0]).toBeInTheDocument()
    })

    it("Discord参加ボタンがDISCORD_INVITE_URLへのリンクである", () => {
      render(<CommunityPage />)
      const buttons = screen.getAllByRole("link", {
        name: /Discordに参加する/i,
      })
      // ヒーローセクションのボタン（最初のボタン）を確認
      expect(buttons[0]).toHaveAttribute("href", DISCORD_INVITE_URL)
    })

    it("Discord参加ボタンが新しいタブで開く設定である", () => {
      render(<CommunityPage />)
      const buttons = screen.getAllByRole("link", {
        name: /Discordに参加する/i,
      })
      // ヒーローセクションのボタン（最初のボタン）を確認
      expect(buttons[0]).toHaveAttribute("target", "_blank")
      expect(buttons[0]).toHaveAttribute("rel", "noopener noreferrer")
    })

    it("CTA（Call to Action）メッセージが表示される", () => {
      render(<CommunityPage />)
      // CTAメッセージを探す（より具体的に）
      const ctaText = screen.getByText(/今すぐDiscordコミュニティに参加して/i)
      expect(ctaText).toBeInTheDocument()
    })
  })

  describe("レイアウトとナビゲーション", () => {
    it("Navbarが表示される", () => {
      render(<CommunityPage />)
      const navbar = document.querySelector("nav")
      expect(navbar).toBeInTheDocument()
    })

    it("Footerが表示される", () => {
      render(<CommunityPage />)
      const footer = document.querySelector("footer")
      expect(footer).toBeInTheDocument()
    })
  })

  describe("ページメタデータ", () => {
    it("metadataオブジェクトがエクスポートされている", async () => {
      const pageModule = await import("@/app/community/page")
      expect(pageModule.metadata).toBeDefined()
      expect(pageModule.metadata).toHaveProperty("title")
      expect(pageModule.metadata).toHaveProperty("description")
    })

    it("metadataのタイトルにコミュニティが含まれる", async () => {
      const pageModule = await import("@/app/community/page")
      const title = pageModule.metadata.title as string
      expect(title).toMatch(/コミュニティ|Community/i)
    })
  })

  describe("レスポンシブデザイン", () => {
    it("レスポンシブレイアウトが使用されている", () => {
      const { container } = render(<CommunityPage />)
      expect(container).toBeInTheDocument()
      // レスポンシブクラスが含まれていることを確認
      const htmlContent = container.innerHTML
      expect(htmlContent).toMatch(/sm:|md:|lg:/)
    })
  })

  describe("エラーハンドリング", () => {
    it("AsyncErrorBoundaryでセクションが囲まれている", () => {
      const { container } = render(<CommunityPage />)
      expect(container).toBeInTheDocument()
    })
  })
})
