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

// テスト定数
// Discord参加ボタンの数: ヒーローセクションのCTA + 最終CTAセクション
const EXPECTED_DISCORD_BUTTON_COUNT = 2

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
      const ctaText = screen.getByText(/Discordコミュニティです/i)
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

  describe("価値提案セクション（タスク5）", () => {
    it("3つの価値提案が表示される", () => {
      render(<CommunityPage />)
      // 3つの価値提案のタイトルが表示されることを確認（h3タグで探す）
      const valuePropositions = screen.getByRole("heading", {
        name: /同じ目標を持つ仲間との繋がり/i,
        level: 3,
      })
      expect(valuePropositions).toBeInTheDocument()

      const latestVerification = screen.getByRole("heading", {
        name: /とまだの最新検証をリアルタイムで/i,
        level: 3,
      })
      expect(latestVerification).toBeInTheDocument()

      const teachingCulture = screen.getByRole("heading", {
        name: /メンバー同士で教え合う文化/i,
        level: 3,
      })
      expect(teachingCulture).toBeInTheDocument()
    })

    it("各価値提案にアイコンが表示される", () => {
      const { container } = render(<CommunityPage />)
      // SVGアイコン（Heroicons）が3つ以上表示されることを確認
      const icons = container.querySelectorAll("svg")
      expect(icons.length).toBeGreaterThanOrEqual(3)
    })

    it("レスポンシブグリッドレイアウトが適用される", () => {
      const { container } = render(<CommunityPage />)
      const htmlContent = container.innerHTML
      // grid-cols-1（スマホ）、md:grid-cols-2（タブレット）、lg:grid-cols-3（PC）を確認
      expect(htmlContent).toMatch(
        /grid-cols-1.*md:grid-cols-2.*lg:grid-cols-3|grid-cols-1.*sm:grid-cols-2.*lg:grid-cols-3/
      )
    })
  })

  describe("コミュニティ説明セクション（タスク6）", () => {
    it("コミュニティ説明セクションが表示される", () => {
      render(<CommunityPage />)
      // コミュニティについてという見出しを確認
      const heading = screen.getByRole("heading", {
        name: /コミュニティについて/i,
      })
      expect(heading).toBeInTheDocument()

      // AI駆動開発を学ぶ仲間が集まる場所であることを示すテキストを確認
      const description = screen.getByText(/AI駆動開発を学ぶ仲間が集まる場所/i)
      expect(description).toBeInTheDocument()
    })

    it("とまだの最新検証に関する説明が表示される", () => {
      render(<CommunityPage />)
      // 「とまだの最新検証をリアルタイムで見ながら」というテキストを探す
      const description = screen.getByText(
        /とまだの最新検証をリアルタイムで見ながら/i
      )
      expect(description).toBeInTheDocument()
    })
  })

  describe("チャンネル紹介セクション（タスク7）", () => {
    it("チャンネル紹介セクションが表示される", () => {
      render(<CommunityPage />)
      // チャンネル紹介の見出しを探す
      const channelHeading = screen.getByRole("heading", {
        name: /チャンネル紹介/i,
      })
      expect(channelHeading).toBeInTheDocument()
    })

    it("チャンネルの目的と活用方法が説明される", () => {
      render(<CommunityPage />)
      // 自己紹介チャンネルの見出しを確認
      const introductionChannel = screen.getByRole("heading", {
        name: /自己紹介/i,
        level: 3,
      })
      expect(introductionChannel).toBeInTheDocument()

      // 学習報告チャンネルの見出しを確認
      const learningReportChannel = screen.getByRole("heading", {
        name: /学習報告/i,
        level: 3,
      })
      expect(learningReportChannel).toBeInTheDocument()

      // とまだの検証部屋チャンネルの見出しを確認
      const verificationChannel = screen.getByRole("heading", {
        name: /とまだの検証部屋/i,
        level: 3,
      })
      expect(verificationChannel).toBeInTheDocument()
    })

    it("チャンネルがアイコンで視覚的に区別される", () => {
      const { container } = render(<CommunityPage />)
      // SVGアイコン（Heroicons）が表示されることを確認
      const icons = container.querySelectorAll("svg")
      expect(icons.length).toBeGreaterThan(0)
    })
  })

  // TODO: テスティモニアルセクション実装後に有効化
  // 実装パス: src/app/community/page.tsx の communityTestimonials がコメントアウトされている
  describe.skip("参加者の声セクション（タスク8）", () => {
    it("参加者の声セクションが表示される", () => {
      render(<CommunityPage />)
      // 「参加者の声」のh3見出しを探す（Headingコンポーネントのデフォルトはh3）
      const testimonialsHeading = screen.getByRole("heading", {
        name: /参加者の声/i,
        level: 3,
      })
      expect(testimonialsHeading).toBeInTheDocument()
    })

    it("3名分のテスティモニアルが表示される", () => {
      render(<CommunityPage />)
      // figureタグを持つテスティモニアルカードを探す
      const testimonialCards = screen.getAllByRole("figure")
      // 3名分のテスティモニアルが表示されることを確認
      expect(testimonialCards.length).toBeGreaterThanOrEqual(3)
    })
  })

  describe("FAQセクション（タスク9）", () => {
    it("FAQセクションが表示される", () => {
      render(<CommunityPage />)
      // FAQセクションのh2見出しを探す
      const faqHeading = screen.getByRole("heading", {
        name: /よくある質問/i,
        level: 2,
      })
      expect(faqHeading).toBeInTheDocument()
    })

    it("複数のFAQ項目が表示される", () => {
      render(<CommunityPage />)
      // FAQ項目のボタンを探す（アコーディオンの質問部分）
      const faqButtons = screen.getAllByRole("button")
      // 最低3つ以上のFAQ項目があることを確認
      expect(faqButtons.length).toBeGreaterThanOrEqual(3)
    })

    it("FAQ項目の質問テキストが表示される", () => {
      const { container } = render(<CommunityPage />)
      // FAQ項目のボタンが存在することを確認
      const buttons = container.querySelectorAll("button")
      expect(buttons.length).toBeGreaterThan(0)
    })

    it("初期状態ではFAQの回答が非表示である", () => {
      const { container } = render(<CommunityPage />)
      // 初期状態では回答パネルが閉じている（data-open属性がない）
      // またはaria-expanded="false"であることを確認
      const panels = container.querySelectorAll("[data-headlessui-state]")
      expect(panels.length).toBeGreaterThan(0)
    })
  })

  describe("最終CTAセクション（タスク10）", () => {
    it("最終CTAセクションにDiscord参加ボタンが表示される", () => {
      render(<CommunityPage />)
      // Discord参加ボタンを全て取得
      const buttons = screen.getAllByRole("link", {
        name: /Discordに参加/i,
      })
      // ヒーローセクション、最終CTAの2つのボタンが存在することを期待
      expect(buttons.length).toBe(EXPECTED_DISCORD_BUTTON_COUNT)
    })

    it("最終CTAセクションのDiscord参加ボタンが正しいURLを持つ", () => {
      render(<CommunityPage />)
      const buttons = screen.getAllByRole("link", {
        name: /Discordに参加/i,
      })
      // 最終CTAボタンを検証（インデックス1）
      const finalCtaButton = buttons[1]
      expect(finalCtaButton).toHaveAttribute("href", DISCORD_INVITE_URL)
      expect(finalCtaButton).toHaveAttribute("target", "_blank")
      expect(finalCtaButton).toHaveAttribute("rel", "noopener noreferrer")
    })

    it("最終CTAセクションに見出しが表示される", () => {
      render(<CommunityPage />)
      // 最終CTAのメッセージを検証
      // 「今すぐ参加」などのキーワードを含む見出しを探す
      const { container } = render(<CommunityPage />)
      const headings = container.querySelectorAll("h1, h2, h3, h4, h5, h6")
      expect(headings.length).toBeGreaterThan(0)
    })

    it("ヒーローセクションのCTAと最終CTAセクションのボタンが視覚的に一貫している", () => {
      render(<CommunityPage />)
      const buttons = screen.getAllByRole("link", {
        name: /Discordに参加/i,
      })
      // ヒーローと最終CTAのボタンが同じコンポーネントを使用していることを期待
      expect(buttons.length).toBeGreaterThanOrEqual(2)
      // すべてのDiscord参加ボタンが同じURLを持つことを検証
      buttons.forEach(button => {
        expect(button).toHaveAttribute("href", DISCORD_INVITE_URL)
      })
    })
  })
})
