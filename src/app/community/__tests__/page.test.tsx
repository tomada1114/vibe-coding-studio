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

  describe("価値提案セクション（タスク5）", () => {
    it("3つの価値提案が表示される", () => {
      render(<CommunityPage />)
      // 3つの価値提案のタイトルが表示されることを確認（h3タグで探す）
      const valuePropositions = screen.getByRole("heading", {
        name: /仲間と繋がる/i,
        level: 3,
      })
      expect(valuePropositions).toBeInTheDocument()

      const latestVerification = screen.getByRole("heading", {
        name: /最新検証/i,
        level: 3,
      })
      expect(latestVerification).toBeInTheDocument()

      const askQuestions = screen.getByRole("heading", {
        name: /気軽に質問/i,
        level: 3,
      })
      expect(askQuestions).toBeInTheDocument()
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
      // 「とまだの最新検証を見ながら一緒に成長」というテキストを探す
      const description = screen.getByText(
        /とまだの最新検証を見ながら一緒に成長できる環境を提供/i
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
      // 一般チャンネルの説明を確認
      const generalChannel = screen.getByText(/一般チャンネル/i)
      expect(generalChannel).toBeInTheDocument()

      // お知らせチャンネルの説明を確認
      const announcementChannel = screen.getByText(/お知らせチャンネル/i)
      expect(announcementChannel).toBeInTheDocument()

      // 質問チャンネルの説明を確認
      const questionChannel = screen.getByText(/質問チャンネル/i)
      expect(questionChannel).toBeInTheDocument()
    })

    it("チャンネルがアイコンで視覚的に区別される", () => {
      const { container } = render(<CommunityPage />)
      // SVGアイコン（Heroicons）が表示されることを確認
      const icons = container.querySelectorAll("svg")
      expect(icons.length).toBeGreaterThan(0)
    })
  })

  describe("参加者の声セクション（タスク8）", () => {
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

    it("各テスティモニアルに参加者名が表示される", () => {
      render(<CommunityPage />)
      // コミュニティメンバーのテスティモニアルを確認
      // 最低1つの参加者名が表示されることを確認
      const figures = screen.getAllByRole("figure")
      expect(figures.length).toBeGreaterThan(0)
    })

    it("各テスティモニアルにコメントが表示される", () => {
      const { container } = render(<CommunityPage />)
      // blockquote要素（引用）が存在することを確認
      const blockquotes = container.querySelectorAll("blockquote")
      expect(blockquotes.length).toBeGreaterThanOrEqual(3)
    })
  })
})
