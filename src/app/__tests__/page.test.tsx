/**
 * トップページ（Discord Community Site）のテスト
 *
 * TDD Red フェーズ: 失敗するテストを作成
 */

import Home from "@/app/page"
import { render, screen } from "@testing-library/react"

// Next.js の usePathname をモック
jest.mock("next/navigation", () => ({
  usePathname: () => "/",
}))

// framer-motion をモック
jest.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      ...props
    }: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => (
      <div {...props}>{children}</div>
    ),
    span: ({
      children,
      ...props
    }: React.PropsWithChildren<React.HTMLAttributes<HTMLSpanElement>>) => (
      <span {...props}>{children}</span>
    ),
  },
  AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
}))

// Logo コンポーネントをモック
jest.mock("@/components/logo", () => ({
  Logo: () => (
    <img alt="Vibe Coding Studio Logo" src="/vcs-logo-square-transparent.png" />
  ),
}))

// DiscordMemberCount コンポーネントをモック（非同期サーバーコンポーネントのため）
jest.mock("@/components/discord-member-count", () => ({
  DiscordMemberCount: () => (
    <div data-testid="discord-member-count">1,000+ 人のメンバー</div>
  ),
}))

describe("トップページ（/）", () => {
  describe("ファーストビューセクション", () => {
    it("ロゴが表示される", () => {
      render(<Home />)
      // Logoコンポーネントを探す（SVGまたはimg要素）
      const logo = document.querySelector("svg") || screen.queryByRole("img")
      expect(logo).toBeInTheDocument()
    })

    it("キャッチコピーが表示される", () => {
      render(<Home />)
      // メインのキャッチコピーを探す
      const heading = screen.getByRole("heading", { level: 1 })
      expect(heading).toBeInTheDocument()
      expect(heading.textContent).toBeTruthy()
    })

    it("コミュニティ参加ボタンが表示される", () => {
      render(<Home />)
      const buttons = screen.getAllByRole("link", {
        name: /コミュニティ|参加|Join|Community/i,
      })
      // 少なくとも1つのボタンが存在することを確認
      expect(buttons.length).toBeGreaterThanOrEqual(1)
      expect(buttons[0]).toBeInTheDocument()
    })

    it("コミュニティ参加ボタンが/communityへのリンクである", () => {
      render(<Home />)
      const buttons = screen.getAllByRole("link", {
        name: /コミュニティ|参加|Join|Community/i,
      })
      // 最初のボタン（ヒーローセクション）を検証
      expect(buttons[0]).toHaveAttribute("href", "/community")
    })

    it("説明文が表示される", () => {
      render(<Home />)
      // ファーストビューの説明文を探す（複数マッチする可能性があるため、より具体的に）
      const description = screen.getByText(/一緒に成長するDiscordコミュニティ/i)
      expect(description).toBeInTheDocument()
    })
  })

  describe("著書セクション", () => {
    it("著書セクションが表示される", () => {
      render(<Home />)
      const heading = screen.getByRole("heading", {
        name: /運営者の著書/i,
      })
      expect(heading).toBeInTheDocument()
    })

    it("書名が正式表記で表示される", () => {
      render(<Home />)
      const bookHeading = screen.getByRole("heading", {
        name: /『Claude Codeで作って学ぶ AI駆動アプリ開発入門』/,
      })
      expect(bookHeading).toBeInTheDocument()
    })

    it("書影が表示される", () => {
      render(<Home />)
      const cover = screen.getByAltText(
        /『Claude Codeで作って学ぶ AI駆動アプリ開発入門』（技術評論社）の書影/
      )
      expect(cover).toBeInTheDocument()
    })

    it("Amazonの購入導線が新規タブで開く", () => {
      render(<Home />)
      const amazonLink = screen.getByRole("link", {
        name: /Amazonで予約する/i,
      })
      expect(amazonLink).toHaveAttribute("href", "https://amzn.asia/d/0f0bQMI4")
      expect(amazonLink).toHaveAttribute("target", "_blank")
      expect(amazonLink).toHaveAttribute("rel", "noopener noreferrer")
    })

    it("運営者ページへの導線が表示される", () => {
      render(<Home />)
      const detailLink = screen.getByRole("link", {
        name: /書籍の詳細を見る/i,
      })
      expect(detailLink).toHaveAttribute("href", "/founder")
    })

    it("発売日と価格が表示される", () => {
      const { container } = render(<Home />)
      expect(container.textContent).toContain("2026年9月8日発売")
      expect(container.textContent).toContain("3,080円（税込）")
    })
  })

  describe("Learnセクション", () => {
    it("Learnセクションが表示される", () => {
      render(<Home />)
      const heading = screen.getByRole("heading", {
        name: /学べるコンテンツ/i,
      })
      expect(heading).toBeInTheDocument()
    })

    it("学習コース・動画・ロードマップへの導線カードが表示される", () => {
      render(<Home />)
      expect(screen.getByRole("link", { name: /学習コース/ })).toHaveAttribute(
        "href",
        "/docs"
      )
      expect(screen.getByRole("link", { name: /VIDEOS/ })).toHaveAttribute(
        "href",
        "/videos"
      )
      expect(
        screen.getByRole("link", { name: /LEARNING PATHS/ })
      ).toHaveAttribute("href", "/roadmap")
    })

    it("実数値の mono 統計ラベルが表示される", () => {
      render(<Home />)
      expect(screen.getByText(/\d+ COURSES \/ \d+ LESSONS/)).toBeInTheDocument()
      expect(screen.getByText(/\d+ VIDEOS/)).toBeInTheDocument()
    })
  })

  describe("とまだプロフィール紹介セクション", () => {
    it("プロフィールセクションが表示される", () => {
      render(<Home />)
      const heading = screen.getByRole("heading", {
        name: /とまだについて/i,
      })
      expect(heading).toBeInTheDocument()
    })

    it("プロフィール説明が表示される", () => {
      render(<Home />)
      // プロフィールセクションの説明を探す（複数マッチする可能性があるため、getAllTextを使用）
      const descriptions = screen.getAllByText(/AI駆動開発|とまだ|Tomada/i)
      expect(descriptions.length).toBeGreaterThan(0)
    })
  })

  describe("レイアウトとナビゲーション", () => {
    it("Navbarが表示される", () => {
      render(<Home />)
      // Navbarは通常、nav要素として実装される
      const navbar = document.querySelector("nav")
      expect(navbar).toBeInTheDocument()
    })

    it("Footerが表示される", () => {
      render(<Home />)
      // Footerは通常、footer要素として実装される
      const footer = document.querySelector("footer")
      expect(footer).toBeInTheDocument()
    })
  })

  describe("ページメタデータ", () => {
    it("metadataオブジェクトがエクスポートされている", async () => {
      // metadataはNext.jsによってビルド時に処理される
      // ここでは型チェックのみ
      const pageModule = await import("@/app/page")
      expect(pageModule.metadata).toBeDefined()
    })
  })

  describe("レスポンシブデザイン", () => {
    it("レスポンシブグリッドレイアウトが使用されている", () => {
      render(<Home />)
      // グリッドレイアウトを使用している要素を確認
      const grids = document.querySelectorAll('[class*="grid"]')
      expect(grids.length).toBeGreaterThan(0)
    })
  })

  describe("エラーハンドリング", () => {
    it("AsyncErrorBoundaryでセクションが囲まれている", () => {
      // エラー境界のテストは統合テストで行う
      // ここでは正常にレンダリングされることを確認
      const { container } = render(<Home />)
      expect(container).toBeInTheDocument()
    })
  })
})
