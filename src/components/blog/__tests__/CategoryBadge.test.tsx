/**
 * Category Badge Component Tests
 */

import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import { CategoryBadge } from "../CategoryBadge"

describe("CategoryBadge", () => {
  // Happy Path
  test("クリック可能なバッジがLinkでラップされる（clickable=true）", () => {
    // Given: clickable=true のバッジ
    // When: コンポーネントをレンダリング
    render(<CategoryBadge category="javascript" clickable={true} />)

    // Then: Linkが存在する
    const link = screen.getByRole("link")
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute("href", "/blog/javascript")
  })

  test("クリック不可のバッジはLinkでラップされない（clickable=false）", () => {
    // Given: clickable=false のバッジ
    // When: コンポーネントをレンダリング
    render(<CategoryBadge category="javascript" clickable={false} />)

    // Then: Linkが存在しない
    const link = screen.queryByRole("link")
    expect(link).not.toBeInTheDocument()
    // バッジ自体は表示される
    expect(screen.getByText("JavaScript")).toBeInTheDocument()
  })

  test("カテゴリ名が正しく表示される（プログラミングカテゴリ）", () => {
    // Given: プログラミングカテゴリ
    // When: コンポーネントをレンダリング
    render(<CategoryBadge category="react" />)

    // Then: 表示名が正しい
    expect(screen.getByText("React")).toBeInTheDocument()
  })

  test("カテゴリ名が正しく表示される（非プログラミングカテゴリ）", () => {
    // Given: 非プログラミングカテゴリ
    // When: コンポーネントをレンダリング
    render(<CategoryBadge category="tutorial" />)

    // Then: 表示名が正しい
    expect(screen.getByText("Tutorial")).toBeInTheDocument()
  })

  // デフォルト値テスト
  test("clickableのデフォルト値はtrue", () => {
    // Given: clickableプロップを省略
    // When: コンポーネントをレンダリング
    render(<CategoryBadge category="javascript" />)

    // Then: クリック可能（Linkでラップ）
    const link = screen.getByRole("link")
    expect(link).toBeInTheDocument()
  })

  // Edge Case
  test("未定義カテゴリでフォールバック表示される", () => {
    // Given: 未定義のカテゴリ
    // When: コンポーネントをレンダリング
    render(<CategoryBadge category="unknown-category" />)

    // Then: カテゴリ名がそのまま表示される
    expect(screen.getByText("unknown-category")).toBeInTheDocument()
  })

  test("バッジにアイコンが含まれる（Devicon）", () => {
    // Given: プログラミングカテゴリ
    // When: コンポーネントをレンダリング
    render(<CategoryBadge category="javascript" />)

    // Then: Deviconアイコンが表示される
    const icon = screen.getByLabelText("javascript icon")
    expect(icon).toBeInTheDocument()
  })

  test("バッジにアイコンが含まれる（絵文字）", () => {
    // Given: 非プログラミングカテゴリ
    // When: コンポーネントをレンダリング
    render(<CategoryBadge category="tutorial" />)

    // Then: 絵文字アイコンが表示される
    const icon = screen.getByRole("img")
    expect(icon).toBeInTheDocument()
    expect(icon).toHaveTextContent("📚")
  })

  test("異なるサイズでレンダリングできる", () => {
    // Given: 各サイズのバッジ
    const { rerender } = render(
      <CategoryBadge category="javascript" size="sm" />
    )
    expect(screen.getByText("JavaScript")).toBeInTheDocument()

    rerender(<CategoryBadge category="javascript" size="md" />)
    expect(screen.getByText("JavaScript")).toBeInTheDocument()

    rerender(<CategoryBadge category="javascript" size="lg" />)
    expect(screen.getByText("JavaScript")).toBeInTheDocument()
  })

  test("リンクが正しいパスを持つ", () => {
    // Given: 様々なカテゴリ
    const { rerender } = render(<CategoryBadge category="react" />)
    expect(screen.getByRole("link")).toHaveAttribute("href", "/blog/react")

    rerender(<CategoryBadge category="tutorial" />)
    expect(screen.getByRole("link")).toHaveAttribute("href", "/blog/tutorial")

    rerender(<CategoryBadge category="unknown" />)
    expect(screen.getByRole("link")).toHaveAttribute("href", "/blog/unknown")
  })
})
