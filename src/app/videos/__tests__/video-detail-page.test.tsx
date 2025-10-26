import { render, screen } from "@testing-library/react"
import { describe, expect, test } from "@jest/globals"
import VideoDetailPage from "../[id]/page"
import { notFound } from "next/navigation"

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

    // 動画タイトルが表示される
    expect(
      screen.getByText("Next.js App Routerで学ぶモダンWeb開発入門")
    ).toBeInTheDocument()

    // Containerコンポーネントが使用されている
    const containerElement = container.querySelector(".mx-auto")
    expect(containerElement).toBeInTheDocument()
  })

  test("YouTube埋め込みプレーヤーが表示される", async () => {
    const params = Promise.resolve({ id: "video-001" })
    const page = await VideoDetailPage({ params })

    const { container } = render(page)

    // iframeが存在する
    const iframe = container.querySelector("iframe")
    expect(iframe).toBeInTheDocument()

    // YouTube Embed URLが設定されている
    expect(iframe?.getAttribute("src")).toContain("youtube.com/embed/")
  })

  test("冒頭セクションが表示される", async () => {
    const params = Promise.resolve({ id: "video-001" })
    const page = await VideoDetailPage({ params })

    render(page)

    // 冒頭セクションの内容が表示される
    expect(
      screen.getByText(
        /この動画では、Next.js 15のApp Routerについて基礎から学びます/
      )
    ).toBeInTheDocument()
  })

  test("学べる内容セクションが表示される", async () => {
    const params = Promise.resolve({ id: "video-001" })
    const page = await VideoDetailPage({ params })

    render(page)

    // 学べる内容セクションのタイトルが表示される
    expect(screen.getByText("💡 この動画で学べること")).toBeInTheDocument()

    // 学べる内容の項目が表示される
    expect(screen.getByText(/✅ App Routerの基本概念/)).toBeInTheDocument()
  })

  test("タイムスタンプセクションが表示される", async () => {
    const params = Promise.resolve({ id: "video-001" })
    const page = await VideoDetailPage({ params })

    render(page)

    // タイムスタンプセクションのタイトルが表示される
    expect(screen.getByText("⏰ タイムスタンプ")).toBeInTheDocument()

    // タイムスタンプの時間とラベルが表示される
    // getByTextで正規表現を使用して検索
    expect(screen.getByText(/00:00/)).toBeInTheDocument()
    expect(screen.getByText(/イントロダクション/)).toBeInTheDocument()
  })

  test("SNS・コミュニティセクションが表示される", async () => {
    const params = Promise.resolve({ id: "video-001" })
    const page = await VideoDetailPage({ params })

    render(page)

    // SNSセクションのタイトルが表示される
    expect(screen.getByText("🔗 SNS・コミュニティ")).toBeInTheDocument()

    // SNSアカウントのリンクが表示される
    const links = screen.getAllByRole("link")
    const xLink = links.find(link =>
      link.getAttribute("href")?.includes("x.com")
    )
    expect(xLink).toBeInTheDocument()
  })

  test("エンゲージメント促進セクションが表示される", async () => {
    const params = Promise.resolve({ id: "video-001" })
    const page = await VideoDetailPage({ params })

    render(page)

    // エンゲージメント促進セクションの内容が表示される
    expect(
      screen.getByText(/実際に試してみた感想や、つまずいた点があれば/)
    ).toBeInTheDocument()
  })

  test("存在しない動画IDでnotFound()が呼ばれる", async () => {
    const params = Promise.resolve({ id: "nonexistent-id" })

    await VideoDetailPage({ params })

    // notFound関数が呼ばれることを確認
    expect(notFound).toHaveBeenCalled()
  })

  test("関連動画セクションが存在する場合に表示される", async () => {
    const params = Promise.resolve({ id: "video-001" })
    const page = await VideoDetailPage({ params })

    render(page)

    // 関連動画セクションのタイトルが表示される
    expect(screen.getByText("📌 関連動画")).toBeInTheDocument()
  })

  test("Udemy講座セクションが存在する場合に表示される", async () => {
    const params = Promise.resolve({ id: "video-001" })
    const page = await VideoDetailPage({ params })

    render(page)

    // Udemy講座セクションのタイトルが表示される
    expect(screen.getByText("🚀 体系的に学びたい方へ")).toBeInTheDocument()
  })

  test("カスタムセクションが存在する場合に表示される", async () => {
    const params = Promise.resolve({ id: "video-001" })
    const page = await VideoDetailPage({ params })

    render(page)

    // カスタムセクションのタイトルが表示される(実際のデータに基づく)
    expect(screen.getByText("📝 この動画の前提知識")).toBeInTheDocument()
    expect(screen.getByText("🔧 動画で使用する技術")).toBeInTheDocument()
    expect(screen.getByText("🔗 参考リソース")).toBeInTheDocument()
  })
})
