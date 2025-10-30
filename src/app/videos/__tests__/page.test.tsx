import { describe, expect, test } from "@jest/globals"
import { render, screen } from "@testing-library/react"
import VideosPage from "../page"

/**
 * タスク9.1: 動画一覧ページの統合テスト
 * Requirements: 5.1, 5.2, 5.3, 5.4, 5.5
 */
describe("動画一覧ページ", () => {
  test("正しくレンダリングされる", () => {
    render(<VideosPage />)

    // ページタイトルが表示される
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "動画一覧"
    )
  })

  test("動画データが存在する場合、動画カードが表示される", () => {
    render(<VideosPage />)

    // 動画タイトルが表示される(実際のデータから)
    expect(
      screen.getByText("AIが書いたコード、いつコミットする？失敗しないGit運用術")
    ).toBeInTheDocument()
  })

  test("動画カードに詳細ページへのリンクが含まれる", () => {
    render(<VideosPage />)

    // 詳細ページへのリンクが存在する
    const links = screen.getAllByRole("link")
    expect(links.length).toBeGreaterThan(0)

    // リンクが正しいhref属性を持つ
    const firstLink = links.find(link =>
      link.getAttribute("href")?.includes("/videos/1LP4ZAsU_UI")
    )
    expect(firstLink).toBeInTheDocument()
  })

  test("公開日が表示される", () => {
    render(<VideosPage />)

    // 公開日が表示される
    const dateElements = screen.getAllByText(/\d{4}年\d{1,2}月\d{1,2}日/)
    expect(dateElements.length).toBeGreaterThan(0)
  })

  test("レスポンシブグリッドレイアウトのクラスが適用されている", () => {
    const { container } = render(<VideosPage />)

    // グリッドレイアウトのクラスが存在する
    const gridElement = container.querySelector(".grid")
    expect(gridElement).toBeInTheDocument()

    // レスポンシブクラスが含まれている
    expect(gridElement).toHaveClass("sm:grid-cols-2")
    expect(gridElement).toHaveClass("lg:grid-cols-3")
  })

  test("Containerコンポーネントが使用されている", () => {
    const { container } = render(<VideosPage />)

    // Containerコンポーネントのクラスが存在する
    const containerElement = container.querySelector(".mx-auto")
    expect(containerElement).toBeInTheDocument()
  })
})
