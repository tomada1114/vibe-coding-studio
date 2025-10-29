import type { VideoMetadata } from "@/types/video"
import { render, screen } from "@testing-library/react"
import { VideoDetail } from "../video-detail"

// モックデータ
const mockVideoData: VideoMetadata = {
  id: "test-video",
  title: "テスト動画タイトル",
  publishedAt: "2025-10-01T12:00:00+09:00",
  videoUrl: "https://www.youtube.com/watch?v=test123",

  opening: {
    lines: [
      "これは冒頭セクションの1行目です。",
      "これは冒頭セクションの2行目です。",
    ],
  },

  learningPoints: {
    title: "💡 この動画で学べること",
    items: ["✅ 学習項目1", "✅ 学習項目2", "✅ 学習項目3"],
  },

  timestamps: {
    title: "⏰ タイムスタンプ",
    items: [
      { time: "00:00", label: "イントロダクション" },
      { time: "05:30", label: "メインコンテンツ" },
      { time: "15:45", label: "まとめ" },
    ],
  },

  tags: ["#テスト", "#サンプル", "#動画"],

  social: {
    title: "🔗 SNS・コミュニティ",
    accounts: [
      {
        platform: "X",
        emoji: "🐦",
        label: "X(Twitter)",
        url: "https://x.com/test_account",
      },
      {
        platform: "note",
        emoji: "📝",
        url: "https://note.com/test_account",
      },
    ],
  },

  engagement: {
    title: "💬 コメント・質問お待ちしています!",
    message: "実際に試してみた感想や質問があればコメント欄で教えてください。",
    callToAction: "チャンネル登録・高評価お願いします!",
  },
}

describe("VideoDetail", () => {
  describe("プレーンテキスト表示のテスト", () => {
    it("プレーンテキスト形式で動画情報が表示される", () => {
      const { container } = render(<VideoDetail video={mockVideoData} />)
      const preElement = container.querySelector("pre")
      expect(preElement).toBeInTheDocument()
      expect(preElement).toHaveClass("whitespace-pre-wrap")
    })

    it("動画タイトルがプレーンテキストに含まれる", () => {
      const { container } = render(<VideoDetail video={mockVideoData} />)
      const text = container.textContent || ""
      expect(text).toContain("テスト動画タイトル")
    })

    it("公開日がプレーンテキストに含まれる", () => {
      const { container } = render(<VideoDetail video={mockVideoData} />)
      const text = container.textContent || ""
      expect(text).toContain("公開日:")
      // タイムゾーンの違いを考慮
      expect(text).toMatch(/2025年(9月30日|10月1日)/)
    })

    it("セクション区切り線が表示される", () => {
      const { container } = render(<VideoDetail video={mockVideoData} />)
      const text = container.textContent || ""
      expect(text).toContain("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
    })

    it("冒頭セクションの内容がプレーンテキストに含まれる", () => {
      const { container } = render(<VideoDetail video={mockVideoData} />)
      const text = container.textContent || ""
      expect(text).toContain("これは冒頭セクションの1行目です。")
      expect(text).toContain("これは冒頭セクションの2行目です。")
    })

    it("学べる内容セクションがプレーンテキストに含まれる", () => {
      const { container } = render(<VideoDetail video={mockVideoData} />)
      const text = container.textContent || ""
      expect(text).toContain("💡 この動画で学べること")
      expect(text).toContain("✅ 学習項目1")
      expect(text).toContain("✅ 学習項目2")
      expect(text).toContain("✅ 学習項目3")
    })

    it("タイムスタンプセクションがプレーンテキストに含まれる", () => {
      const { container } = render(<VideoDetail video={mockVideoData} />)
      const text = container.textContent || ""
      expect(text).toContain("⏰ タイムスタンプ")
      expect(text).toContain("00:00 - イントロダクション")
      expect(text).toContain("05:30 - メインコンテンツ")
      expect(text).toContain("15:45 - まとめ")
    })

    it("タグがスペース区切りでプレーンテキストに含まれる", () => {
      const { container } = render(<VideoDetail video={mockVideoData} />)
      const text = container.textContent || ""
      expect(text).toContain("#テスト #サンプル #動画")
    })

    it("SNSアカウント情報が「ラベル: URL」形式で表示される", () => {
      const { container } = render(<VideoDetail video={mockVideoData} />)
      const text = container.textContent || ""
      expect(text).toContain("🔗 SNS・コミュニティ")
      expect(text).toContain("🐦 X(Twitter): https://x.com/test_account")
      expect(text).toContain("📝 note: https://note.com/test_account")
    })

    it("エンゲージメント促進セクションがプレーンテキストに含まれる", () => {
      const { container } = render(<VideoDetail video={mockVideoData} />)
      const text = container.textContent || ""
      expect(text).toContain("💬 コメント・質問お待ちしています!")
      expect(text).toContain(
        "実際に試してみた感想や質問があればコメント欄で教えてください。"
      )
      expect(text).toContain("チャンネル登録・高評価お願いします!")
    })

    it("YouTube概要欄コピー用の説明文が表示される", () => {
      render(<VideoDetail video={mockVideoData} />)
      expect(
        screen.getByText(
          "この内容はYouTube概要欄へのコピー用プレーンテキストです"
        )
      ).toBeInTheDocument()
    })
  })

  describe("オプションセクションのテスト", () => {
    it("関連動画セクションが「タイトル: URL」形式で表示される", () => {
      const videoWithRelated: VideoMetadata = {
        ...mockVideoData,
        relatedVideos: {
          title: "📌 関連動画",
          videos: [
            {
              emoji: "🎯",
              title: "関連動画1",
              url: "https://www.youtube.com/watch?v=related1",
            },
            {
              title: "関連動画2",
              url: "https://www.youtube.com/watch?v=related2",
            },
          ],
        },
      }

      const { container } = render(<VideoDetail video={videoWithRelated} />)
      const text = container.textContent || ""
      expect(text).toContain("📌 関連動画")
      expect(text).toContain(
        "🎯 関連動画1: https://www.youtube.com/watch?v=related1"
      )
      expect(text).toContain(
        "関連動画2: https://www.youtube.com/watch?v=related2"
      )
    })

    it("Udemy講座セクションがプレーンテキストで表示される", () => {
      const videoWithUdemy: VideoMetadata = {
        ...mockVideoData,
        udemyCourses: {
          title: "🚀 体系的に学びたい方へ",
          description: "Udemy講座の説明文です。",
          courses: ["講座1", "講座2"],
          cta: {
            text: "Udemy講座の詳細はこちら",
            url: "https://www.udemy.com/course/test",
          },
        },
      }

      const { container } = render(<VideoDetail video={videoWithUdemy} />)
      const text = container.textContent || ""
      expect(text).toContain("🚀 体系的に学びたい方へ")
      expect(text).toContain("Udemy講座の説明文です。")
      expect(text).toContain("講座1")
      expect(text).toContain("講座2")
      expect(text).toContain(
        "Udemy講座の詳細はこちら: https://www.udemy.com/course/test"
      )
    })

    it("Discordコミュニティセクションがプレーンテキストで表示される", () => {
      const videoWithDiscord: VideoMetadata = {
        ...mockVideoData,
        discordCommunity: {
          title: "💬 Discordコミュニティ(無料)",
          description: "Discordコミュニティの説明文です。",
          url: "https://discord.gg/test",
          isFree: true,
        },
      }

      const { container } = render(<VideoDetail video={videoWithDiscord} />)
      const text = container.textContent || ""
      expect(text).toContain("💬 Discordコミュニティ(無料)")
      expect(text).toContain("Discordコミュニティの説明文です。")
      expect(text).toContain("Discordに参加する: https://discord.gg/test")
    })
  })

  describe("カスタムセクションのテスト", () => {
    it("テキストセクションがプレーンテキストで表示される", () => {
      const videoWithCustom: VideoMetadata = {
        ...mockVideoData,
        customSections: [
          {
            type: "text",
            title: "📝 テキストセクション",
            content: "これはテキストセクションのコンテンツです。",
          },
        ],
      }

      const { container } = render(<VideoDetail video={videoWithCustom} />)
      const text = container.textContent || ""
      expect(text).toContain("📝 テキストセクション")
      expect(text).toContain("これはテキストセクションのコンテンツです。")
    })

    it("リストセクションがプレーンテキストで表示される", () => {
      const videoWithList: VideoMetadata = {
        ...mockVideoData,
        customSections: [
          {
            type: "list",
            title: "📋 リストセクション",
            items: ["リスト項目1", "リスト項目2", "リスト項目3"],
          },
        ],
      }

      const { container } = render(<VideoDetail video={videoWithList} />)
      const text = container.textContent || ""
      expect(text).toContain("📋 リストセクション")
      expect(text).toContain("リスト項目1")
      expect(text).toContain("リスト項目2")
      expect(text).toContain("リスト項目3")
    })

    it("リンクセクションが「ラベル: URL」形式で表示される", () => {
      const videoWithLinks: VideoMetadata = {
        ...mockVideoData,
        customSections: [
          {
            type: "links",
            title: "🔗 リンクセクション",
            links: [
              { label: "リンク1", url: "https://example.com/link1" },
              { label: "リンク2", url: "https://example.com/link2" },
            ],
          },
        ],
      }

      const { container } = render(<VideoDetail video={videoWithLinks} />)
      const text = container.textContent || ""
      expect(text).toContain("🔗 リンクセクション")
      expect(text).toContain("リンク1: https://example.com/link1")
      expect(text).toContain("リンク2: https://example.com/link2")
    })

    it("混合セクションがすべての要素を含めて表示される", () => {
      const videoWithMixed: VideoMetadata = {
        ...mockVideoData,
        customSections: [
          {
            type: "mixed",
            title: "🎨 混合セクション",
            content: "混合セクションのテキスト",
            items: ["混合項目1", "混合項目2"],
            links: [{ label: "混合リンク", url: "https://example.com/mixed" }],
          },
        ],
      }

      const { container } = render(<VideoDetail video={videoWithMixed} />)
      const text = container.textContent || ""
      expect(text).toContain("🎨 混合セクション")
      expect(text).toContain("混合セクションのテキスト")
      expect(text).toContain("混合項目1")
      expect(text).toContain("混合項目2")
      expect(text).toContain("混合リンク: https://example.com/mixed")
    })
  })

  describe("スタイリングのテスト", () => {
    it("カード形式で表示される", () => {
      const { container } = render(<VideoDetail video={mockVideoData} />)
      const card = container.querySelector(".rounded-lg.border")
      expect(card).toBeInTheDocument()
      expect(card).toHaveClass("bg-white")
    })

    it("プレーンテキストに適切なスタイルが適用される", () => {
      const { container } = render(<VideoDetail video={mockVideoData} />)
      const preElement = container.querySelector("pre")
      expect(preElement).toHaveClass(
        "max-w-prose",
        "whitespace-pre-wrap",
        "break-words",
        "font-sans",
        "text-base",
        "leading-7",
        "text-gray-950"
      )
    })
  })
})
