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

  test("公開日が日本語形式で表示される", () => {
    render(<VideoCard video={mockVideo} />)

    const publishedDate = screen.getByText(/公開日:/)
    expect(publishedDate).toBeInTheDocument()
    expect(publishedDate.textContent).toContain("2025")
  })

  test("詳細ページへのリンクが正しい", () => {
    render(<VideoCard video={mockVideo} />)

    const link = screen.getByRole("link")
    expect(link).toHaveAttribute("href", "/videos/test-video-001")
  })

  test("ホバー時のスタイルが適用されている", () => {
    render(<VideoCard video={mockVideo} />)

    const link = screen.getByRole("link")
    expect(link).toHaveClass("hover:shadow-lg")
  })
})
