import type { VideoMetadata } from "@/types/video"
import { describe, expect, test } from "@jest/globals"
import { render, screen } from "@testing-library/react"
import { VideoCard } from "../video-card"

// テスト用のモックデータ
const mockVideo: VideoMetadata = {
  id: "test-video-001",
  title: "テスト動画タイトル",
  publishedAt: "2025-10-01T12:00:00+09:00",
  videoUrl: "https://www.youtube.com/watch?v=test",
  opening: {
    lines: ["テスト冒頭"],
  },
  learningPoints: {
    title: "💡 この動画で学べること",
    items: ["✅ テスト項目1"],
  },
  timestamps: {
    title: "⏰ タイムスタンプ",
    items: [{ time: "00:00", label: "イントロ" }],
  },
  tags: ["#テスト"],
  social: {
    title: "🔗 SNS",
    accounts: [
      {
        platform: "X",
        emoji: "🐦",
        url: "https://x.com/test",
      },
    ],
  },
  engagement: {
    message: "テストメッセージ",
    callToAction: "テストCTA",
  },
}

describe("VideoCard", () => {
  test("動画タイトルが表示される", () => {
    render(<VideoCard video={mockVideo} />)

    const title = screen.getByText("テスト動画タイトル")
    expect(title).toBeInTheDocument()
  })

  test("YouTubeサムネイルが遅延読み込みで表示される（next/image 不使用）", () => {
    const { container } = render(<VideoCard video={mockVideo} />)

    const img = container.querySelector("img")
    expect(img).not.toBeNull()
    expect(img).toHaveAttribute(
      "src",
      "https://i.ytimg.com/vi/test-video-001/hqdefault.jpg"
    )
    expect(img).toHaveAttribute("loading", "lazy")
    expect(img).toHaveAttribute("width", "480")
    expect(img).toHaveAttribute("height", "360")
  })

  test("公開日が mono の日付として表示される", () => {
    render(<VideoCard video={mockVideo} />)

    const publishedDate = screen.getByText("2025-10-01")
    expect(publishedDate).toBeInTheDocument()
    expect(publishedDate).toHaveClass("font-mono")
  })

  test("タグが上位3件まで mono バッジで表示される", () => {
    const video = {
      ...mockVideo,
      tags: ["#タグ1", "#タグ2", "#タグ3", "#タグ4"],
    }
    render(<VideoCard video={video} />)

    expect(screen.getByText("#タグ1")).toBeInTheDocument()
    expect(screen.getByText("#タグ2")).toBeInTheDocument()
    expect(screen.getByText("#タグ3")).toBeInTheDocument()
    expect(screen.queryByText("#タグ4")).not.toBeInTheDocument()
    expect(screen.getByText("#タグ1")).toHaveClass("font-mono")
  })

  test("詳細ページへのリンクが正しい", () => {
    render(<VideoCard video={mockVideo} />)

    const link = screen.getByRole("link")
    expect(link).toHaveAttribute("href", "/videos/test-video-001")
  })

  test("ホバー時は ring 強調とスペクトラムビームが適用される", () => {
    render(<VideoCard video={mockVideo} />)

    const link = screen.getByRole("link")
    expect(link).toHaveClass("hover:ring-gray-950/10")
    const beam = link.querySelector("span[aria-hidden='true']")
    expect(beam).not.toBeNull()
  })
})
