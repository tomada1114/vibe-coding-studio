/**
 * Post Card Component Tests
 */

import type { Post } from "@/lib/blog/posts"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import { PostCard } from "../PostCard"

describe("PostCard", () => {
  const mockPost: Post = {
    slug: "hello-world",
    title: "Hello World",
    date: "2026-01-14",
    category: "javascript",
    excerpt: "This is a test excerpt for the blog post.",
    content: "# Hello World\n\nThis is the content.",
  }

  // Happy Path
  test("投稿カードが正しくレンダリングされる", () => {
    // Given: 有効なPostオブジェクト
    // When: コンポーネントをレンダリング
    render(<PostCard post={mockPost} />)

    // Then: タイトル、抜粋、「Read more」が表示される
    expect(screen.getByText("Hello World")).toBeInTheDocument()
    expect(
      screen.getByText("This is a test excerpt for the blog post.")
    ).toBeInTheDocument()
    expect(screen.getByText("Read more →")).toBeInTheDocument()
  })

  test("正しいリンクURLが生成される", () => {
    // Given: category='javascript', slug='hello-world' のPost
    // When: コンポーネントをレンダリング
    render(<PostCard post={mockPost} />)

    // Then: href="/blog/javascript/hello-world" が設定される
    const link = screen.getByRole("link")
    expect(link).toHaveAttribute("href", "/blog/javascript/hello-world")
  })

  test("カテゴリバッジが表示される（showCategory=true）", () => {
    // Given: showCategory=true
    // When: コンポーネントをレンダリング
    render(<PostCard post={mockPost} showCategory={true} />)

    // Then: カテゴリ名が表示される
    expect(screen.getByText("JavaScript")).toBeInTheDocument()
  })

  test("カテゴリバッジが非表示（showCategory=false）", () => {
    // Given: showCategory=false
    // When: コンポーネントをレンダリング
    render(<PostCard post={mockPost} showCategory={false} />)

    // Then: カテゴリ名が表示されない
    expect(screen.queryByText("JavaScript")).not.toBeInTheDocument()
  })

  // デフォルト値テスト
  test("showCategoryのデフォルト値はtrue", () => {
    // Given: showCategoryプロップを省略
    // When: コンポーネントをレンダリング
    render(<PostCard post={mockPost} />)

    // Then: カテゴリが表示される
    expect(screen.getByText("JavaScript")).toBeInTheDocument()
  })

  // Edge Case
  test("excerptが空文字列でもエラーなくレンダリングされる", () => {
    // Given: excerptが空のPost
    const postWithEmptyExcerpt: Post = {
      ...mockPost,
      excerpt: "",
    }

    // When: コンポーネントをレンダリング
    render(<PostCard post={postWithEmptyExcerpt} />)

    // Then: エラーなくレンダリングされる
    expect(screen.getByText("Hello World")).toBeInTheDocument()
  })

  test("長いタイトルでもレンダリングされる", () => {
    // Given: 非常に長いタイトルのPost
    const postWithLongTitle: Post = {
      ...mockPost,
      title:
        "This is a very long title that should be truncated by the line-clamp-2 CSS class to prevent layout issues",
    }

    // When: コンポーネントをレンダリング
    render(<PostCard post={postWithLongTitle} />)

    // Then: タイトルが表示される
    const title = screen.getByRole("heading", { level: 2 })
    expect(title).toBeInTheDocument()
    expect(title).toHaveClass("line-clamp-2")
  })

  test("長いexcerptでもレンダリングされる", () => {
    // Given: 非常に長いexcerptのPost
    const postWithLongExcerpt: Post = {
      ...mockPost,
      excerpt: "This is a very long excerpt ".repeat(20),
    }

    // When: コンポーネントをレンダリング
    render(<PostCard post={postWithLongExcerpt} />)

    // Then: excerptが表示される（line-clampで制限）
    const excerptElement = screen.getByText(/This is a very long excerpt/i)
    expect(excerptElement).toBeInTheDocument()
    expect(excerptElement).toHaveClass("line-clamp-3")
  })

  test("未定義カテゴリでフォールバック表示される", () => {
    // Given: 未定義のカテゴリを持つPost
    const postWithUnknownCategory: Post = {
      ...mockPost,
      category: "unknown-category",
    }

    // When: コンポーネントをレンダリング
    render(<PostCard post={postWithUnknownCategory} />)

    // Then: カテゴリ名がそのまま表示される
    expect(screen.getByText("unknown-category")).toBeInTheDocument()
  })

  test("articleタグでラップされている", () => {
    // Given: 有効なPost
    // When: コンポーネントをレンダリング
    render(<PostCard post={mockPost} />)

    // Then: articleタグが存在する
    const article = screen.getByRole("article")
    expect(article).toBeInTheDocument()
  })

  test("カードに基本スタイルが適用されている", () => {
    // Given: 有効なPost
    // When: コンポーネントをレンダリング
    render(<PostCard post={mockPost} />)

    // Then: 基本スタイルクラスが適用される
    const article = screen.getByRole("article")
    expect(article).toHaveClass("rounded-lg")
    expect(article).toHaveClass("border")
    expect(article).toHaveClass("bg-white")
    expect(article).toHaveClass("shadow-sm")
    expect(article).toHaveClass("hover:shadow-md")
  })

  // 異なるカテゴリのテスト
  test("非プログラミングカテゴリでも正しく表示される", () => {
    // Given: 非プログラミングカテゴリのPost
    const postWithTutorialCategory: Post = {
      ...mockPost,
      category: "tutorial",
    }

    // When: コンポーネントをレンダリング
    render(<PostCard post={postWithTutorialCategory} />)

    // Then: カテゴリ名が表示される
    expect(screen.getByText("Tutorial")).toBeInTheDocument()
  })
})
