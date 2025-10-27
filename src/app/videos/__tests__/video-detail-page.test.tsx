import { describe, expect, test } from "@jest/globals"
import { render, screen } from "@testing-library/react"
import { notFound } from "next/navigation"
import VideoDetailPage from "../[id]/page"

// next/navigationのnotFound関数をモック
jest.mock("next/navigation", () => ({
  notFound: jest.fn(),
}))

/**
 * タスク9.1: 動画詳細ページの統合テスト
 * Requirements: 6.1, 6.2, 6.3, 6.4, 6.5
 */
describe("動画詳細ページ", () => {
  test("存在する動画IDで正しくレンダリングされる", async () => {
    const params = Promise.resolve({ id: "video-001" })
    const page = await VideoDetailPage({ params })

    const { container } = render(page)

    // 動画タイトルがプレーンテキストに含まれる
    const text = container.textContent || ""
    expect(text).toContain("Next.js App Routerで学ぶモダンWeb開発入門")

    // Containerコンポーネントが使用されている
    const containerElement = container.querySelector(".mx-auto")
    expect(containerElement).toBeInTheDocument()
  })

  test("プレーンテキスト形式で表示される", async () => {
    const params = Promise.resolve({ id: "video-001" })
    const page = await VideoDetailPage({ params })

    const { container } = render(page)

    // preタグが使用されている
    const preElement = container.querySelector("pre")
    expect(preElement).toBeInTheDocument()
    expect(preElement).toHaveClass("whitespace-pre-wrap")
  })

  test("冒頭セクションがプレーンテキストに含まれる", async () => {
    const params = Promise.resolve({ id: "video-001" })
    const page = await VideoDetailPage({ params })

    const { container } = render(page)
    const text = container.textContent || ""

    // 冒頭セクションの内容がプレーンテキストに含まれる
    expect(text).toContain(
      "この動画では、Next.js 15のApp Routerについて基礎から学びます"
    )
  })

  test("学べる内容セクションがプレーンテキストに含まれる", async () => {
    const params = Promise.resolve({ id: "video-001" })
    const page = await VideoDetailPage({ params })

    const { container } = render(page)
    const text = container.textContent || ""

    // 学べる内容セクションのタイトルがプレーンテキストに含まれる
    expect(text).toContain("💡 この動画で学べること")

    // 学べる内容の項目がプレーンテキストに含まれる
    expect(text).toContain("✅ App Routerの基本概念")
  })

  test("タイムスタンプセクションがプレーンテキストに含まれる", async () => {
    const params = Promise.resolve({ id: "video-001" })
    const page = await VideoDetailPage({ params })

    const { container } = render(page)
    const text = container.textContent || ""

    // タイムスタンプセクションのタイトルがプレーンテキストに含まれる
    expect(text).toContain("⏰ タイムスタンプ")

    // タイムスタンプの時間とラベルがプレーンテキストに含まれる
    expect(text).toContain("00:00 - イントロダクション")
  })

  test("SNS・コミュニティセクションが「ラベル: URL」形式で表示される", async () => {
    const params = Promise.resolve({ id: "video-001" })
    const page = await VideoDetailPage({ params })

    const { container } = render(page)
    const text = container.textContent || ""

    // SNSセクションのタイトルがプレーンテキストに含まれる
    expect(text).toContain("🔗 SNS・コミュニティ")

    // SNSアカウントが「ラベル: URL」形式でプレーンテキストに含まれる
    expect(text).toContain("X(Twitter): https://x.com/muscle_coding")
  })

  test("エンゲージメント促進セクションがプレーンテキストに含まれる", async () => {
    const params = Promise.resolve({ id: "video-001" })
    const page = await VideoDetailPage({ params })

    const { container } = render(page)
    const text = container.textContent || ""

    // エンゲージメント促進セクションの内容がプレーンテキストに含まれる
    expect(text).toContain("実際に試してみた感想や、つまずいた点があれば")
  })

  test("存在しない動画IDでnotFound()が呼ばれる", async () => {
    const params = Promise.resolve({ id: "nonexistent-id" })

    await VideoDetailPage({ params })

    // notFound関数が呼ばれることを確認
    expect(notFound).toHaveBeenCalled()
  })

  test("関連動画セクションが「タイトル: URL」形式で表示される", async () => {
    const params = Promise.resolve({ id: "video-001" })
    const page = await VideoDetailPage({ params })

    const { container } = render(page)
    const text = container.textContent || ""

    // 関連動画セクションのタイトルがプレーンテキストに含まれる
    expect(text).toContain("📌 関連動画")
  })

  test("Udemy講座セクションがプレーンテキストで表示される", async () => {
    const params = Promise.resolve({ id: "video-001" })
    const page = await VideoDetailPage({ params })

    const { container } = render(page)
    const text = container.textContent || ""

    // Udemy講座セクションのタイトルがプレーンテキストに含まれる
    expect(text).toContain("🚀 体系的に学びたい方へ")
  })

  test("カスタムセクションがプレーンテキストで表示される", async () => {
    const params = Promise.resolve({ id: "video-001" })
    const page = await VideoDetailPage({ params })

    const { container } = render(page)
    const text = container.textContent || ""

    // カスタムセクションのタイトルがプレーンテキストに含まれる(実際のデータに基づく)
    expect(text).toContain("📝 この動画の前提知識")
    expect(text).toContain("🔧 動画で使用する技術")
    expect(text).toContain("🔗 参考リソース")
  })

  test("YouTube概要欄コピー用の説明文が表示される", async () => {
    const params = Promise.resolve({ id: "video-001" })
    const page = await VideoDetailPage({ params })

    render(page)

    // YouTube概要欄コピー用の説明文が表示される
    expect(
      screen.getByText(
        "この内容はYouTube概要欄へのコピー用プレーンテキストです"
      )
    ).toBeInTheDocument()
  })

  test("セクション区切り線が表示される", async () => {
    const params = Promise.resolve({ id: "video-001" })
    const page = await VideoDetailPage({ params })

    const { container } = render(page)
    const text = container.textContent || ""

    // セクション区切り線が複数回表示される
    const dividerCount = (
      text.match(/━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━/g) || []
    ).length
    expect(dividerCount).toBeGreaterThan(5)
  })
})
