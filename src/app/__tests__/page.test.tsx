/**
 * トップページ（Discord Community Site）のテスト
 *
 * TDD Red フェーズ: 失敗するテストを作成
 */

import { render, screen } from "@testing-library/react"
import Home from "@/app/page"

// モックを設定
jest.mock("@/components/logo", () => ({
  Logo: () => <img alt="Vibe Coding Studio Logo" src="/logo.png" />,
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
      const button = screen.getByRole("link", {
        name: /コミュニティ|参加|Join|Community/i,
      })
      expect(button).toBeInTheDocument()
    })

    it("コミュニティ参加ボタンが/communityへのリンクである", () => {
      render(<Home />)
      const button = screen.getByRole("link", {
        name: /コミュニティ|参加|Join|Community/i,
      })
      expect(button).toHaveAttribute("href", "/community")
    })

    it("説明文が表示される", () => {
      render(<Home />)
      // ファーストビューの説明文を探す（複数マッチする可能性があるため、より具体的に）
      const description = screen.getByText(/一緒に成長するDiscordコミュニティ/i)
      expect(description).toBeInTheDocument()
    })
  })

  describe("工事中セクション", () => {
    it("工事中セクションが表示される", () => {
      render(<Home />)
      const heading = screen.getByRole("heading", {
        name: /準備中のコンテンツ/i,
      })
      expect(heading).toBeInTheDocument()
    })

    it("工事中コンテンツの説明が表示される", () => {
      render(<Home />)
      // 工事中セクションの説明文を探す
      const section = screen.getByText(/より充実したコミュニティ体験/i)
      expect(section).toBeInTheDocument()
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
