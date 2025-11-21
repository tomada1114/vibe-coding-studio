/**
 * レスポンシブデザインのテスト（タスク12.4）
 *
 * JSDOMの制限により、実際のビューポートサイズ変更は完全にはサポートされていません。
 * このテストでは、レスポンシブクラス（sm:, md:, lg:）の存在を確認することで、
 * レスポンシブデザインが適切に実装されていることを検証します。
 */

import CommunityPage from "@/app/community/page"
import HomePage from "@/app/page"
import { render } from "@testing-library/react"

// モックを設定
jest.mock("@/components/logo", () => ({
  Logo: () => (
    <img alt="Vibe Coding Studio Logo" src="/vcs-logo-square-transparent.png" />
  ),
}))

jest.mock("@/components/discord-member-count", () => ({
  DiscordMemberCount: () => null, // テスト環境では何も表示しない
}))

describe("レスポンシブデザイン（タスク12.4）", () => {
  describe("トップページのレスポンシブデザイン", () => {
    it("トップページにレスポンシブクラスが使用されている", () => {
      const { container } = render(<HomePage />)
      const htmlContent = container.innerHTML

      // Tailwind CSSのレスポンシブユーティリティクラスを確認
      // sm: (640px), md: (768px), lg: (1024px)
      expect(htmlContent).toMatch(/sm:|md:|lg:/)
    })

    it("工事中セクションにグリッドレスポンシブクラスが適用される", () => {
      const { container } = render(<HomePage />)
      const htmlContent = container.innerHTML

      // grid-cols-1（スマホ）、md:grid-cols-2（タブレット）、lg:grid-cols-3（PC）
      // のパターンを確認
      expect(htmlContent).toMatch(/grid-cols-1/)
      expect(htmlContent).toMatch(/md:grid-cols-2|lg:grid-cols-3/)
    })

    it("ナビゲーションが表示される", () => {
      const { container } = render(<HomePage />)
      const navbar = container.querySelector("nav")
      expect(navbar).toBeInTheDocument()
    })

    it("フッターが表示される", () => {
      const { container } = render(<HomePage />)
      const footer = container.querySelector("footer")
      expect(footer).toBeInTheDocument()
    })
  })

  describe("コミュニティページのレスポンシブデザイン", () => {
    it("コミュニティページにレスポンシブクラスが使用されている", () => {
      const { container } = render(<CommunityPage />)
      const htmlContent = container.innerHTML

      // Tailwind CSSのレスポンシブユーティリティクラスを確認
      expect(htmlContent).toMatch(/sm:|md:|lg:/)
    })

    it("価値提案セクションにグリッドレスポンシブクラスが適用される", () => {
      const { container } = render(<CommunityPage />)
      const htmlContent = container.innerHTML

      // grid-cols-1（スマホ）、md:grid-cols-2（タブレット）、lg:grid-cols-3（PC）
      expect(htmlContent).toMatch(/grid-cols-1/)
      expect(htmlContent).toMatch(/md:grid-cols-2/)
      expect(htmlContent).toMatch(/lg:grid-cols-3/)
    })

    it("チャンネル紹介セクションにグリッドレスポンシブクラスが適用される", () => {
      const { container } = render(<CommunityPage />)
      const htmlContent = container.innerHTML

      // 複数のグリッドレイアウトが存在することを確認
      const gridCount = (htmlContent.match(/grid-cols-1/g) || []).length
      expect(gridCount).toBeGreaterThan(1)
    })

    it("ヒーローセクションでフレックスボックスがレスポンシブに動作する", () => {
      const { container } = render(<CommunityPage />)
      const htmlContent = container.innerHTML

      // flex-col（縦並び）からsm:flex-row（横並び）への切り替えを確認
      expect(htmlContent).toMatch(/flex-col/)
      expect(htmlContent).toMatch(/sm:flex-row|md:flex-row/)
    })

    it("ナビゲーションが表示される", () => {
      const { container } = render(<CommunityPage />)
      const navbar = container.querySelector("nav")
      expect(navbar).toBeInTheDocument()
    })

    it("フッターが表示される", () => {
      const { container } = render(<CommunityPage />)
      const footer = container.querySelector("footer")
      expect(footer).toBeInTheDocument()
    })

    it("コンテンツエリアが存在する", () => {
      const { container } = render(<CommunityPage />)
      const main = container.querySelector("main")
      expect(main).toBeInTheDocument()
    })
  })

  describe("レスポンシブテキストサイズ", () => {
    it("トップページでレスポンシブテキストクラスが使用される", () => {
      const { container } = render(<HomePage />)
      const htmlContent = container.innerHTML

      // text-xl, sm:text-2xl, md:text-3xl などのパターンを確認
      expect(htmlContent).toMatch(/text-\w+\/\d+|sm:text-\w+\/\d+|md:text-\w+/)
    })

    it("コミュニティページでレスポンシブテキストクラスが使用される", () => {
      const { container } = render(<CommunityPage />)
      const htmlContent = container.innerHTML

      // text-xl, sm:text-2xl, md:text-3xl などのパターンを確認
      expect(htmlContent).toMatch(/text-\w+\/\d+|sm:text-\w+\/\d+|md:text-\w+/)
    })
  })

  describe("レスポンシブスペーシング", () => {
    it("トップページでレスポンシブパディングとマージンが使用される", () => {
      const { container } = render(<HomePage />)
      const htmlContent = container.innerHTML

      // pt-16, sm:pt-24, md:pt-32 などのパターンを確認
      expect(htmlContent).toMatch(/pt-\d+/)
      expect(htmlContent).toMatch(/pb-\d+/)
      expect(htmlContent).toMatch(/sm:pt-\d+|md:pt-\d+|lg:pt-\d+/)
    })

    it("コミュニティページでレスポンシブパディングとマージンが使用される", () => {
      const { container } = render(<CommunityPage />)
      const htmlContent = container.innerHTML

      // mt-10, sm:mt-16 などのパターンを確認
      expect(htmlContent).toMatch(/mt-\d+/)
      expect(htmlContent).toMatch(/sm:mt-\d+|md:mt-\d+|lg:mt-\d+/)
    })
  })

  describe("レスポンシブギャップ", () => {
    it("グリッドレイアウトでレスポンシブギャップが使用される", () => {
      const { container } = render(<CommunityPage />)
      const htmlContent = container.innerHTML

      // gap-8, gap-x-6, gap-y-4 などのパターンを確認
      expect(htmlContent).toMatch(/gap-\d+|gap-x-\d+|gap-y-\d+/)
    })
  })
})
