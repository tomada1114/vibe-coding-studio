import { render, screen } from "@testing-library/react"
import type { VideoMetadata } from "@/types/video"
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
    items: [
      "✅ 学習項目1",
      "✅ 学習項目2",
      "✅ 学習項目3",
    ],
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

// カスタムセクションを含むモックデータ
const mockVideoWithCustomSections: VideoMetadata = {
  ...mockVideoData,
  customSections: [
    {
      type: "text",
      title: "📝 テキストセクション",
      content: "これはテキストセクションのコンテンツです。",
    },
    {
      type: "list",
      title: "📋 リストセクション",
      items: ["リスト項目1", "リスト項目2", "リスト項目3"],
    },
    {
      type: "links",
      title: "🔗 リンクセクション",
      links: [
        { label: "リンク1", url: "https://example.com/link1" },
        { label: "リンク2", url: "https://example.com/link2" },
      ],
    },
    {
      type: "mixed",
      title: "🎨 混合セクション",
      content: "混合セクションのテキスト",
      items: ["混合項目1", "混合項目2"],
      links: [{ label: "混合リンク", url: "https://example.com/mixed" }],
    },
  ],
}

// 関連動画とUdemy講座を含むモックデータ
const mockVideoWithOptionalSections: VideoMetadata = {
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
  udemyCourses: {
    title: "🚀 体系的に学びたい方へ",
    description: "Udemy講座の説明文です。",
    courses: ["講座1", "講座2"],
    cta: {
      text: "Udemy講座の詳細はこちら",
      url: "https://www.udemy.com/course/test",
    },
  },
  discordCommunity: {
    title: "💬 Discordコミュニティ(無料)",
    description: "Discordコミュニティの説明文です。",
    url: "https://discord.gg/test",
    isFree: true,
  },
}

describe("VideoDetail", () => {
  describe("基本表示のテスト", () => {
    it("動画タイトルが表示される", () => {
      render(<VideoDetail video={mockVideoData} />)
      expect(screen.getByText("テスト動画タイトル")).toBeInTheDocument()
    })

    it("公開日が日本語形式で表示される", () => {
      render(<VideoDetail video={mockVideoData} />)
      // 日本語形式の日付を確認
      expect(screen.getByText(/公開日:/)).toBeInTheDocument()
      // タイムゾーンの違いを考慮して、9月30日または10月1日のいずれかを許容
      const dateText = screen.getByText(/公開日:/).textContent
      expect(dateText).toMatch(/2025年(9月30日|10月1日)/)
    })

    it("冒頭セクションのすべての行が表示される", () => {
      render(<VideoDetail video={mockVideoData} />)
      expect(
        screen.getByText("これは冒頭セクションの1行目です。")
      ).toBeInTheDocument()
      expect(
        screen.getByText("これは冒頭セクションの2行目です。")
      ).toBeInTheDocument()
    })

    it("学べる内容セクションのタイトルとすべての項目が表示される", () => {
      render(<VideoDetail video={mockVideoData} />)
      expect(screen.getByText("💡 この動画で学べること")).toBeInTheDocument()
      expect(screen.getByText("✅ 学習項目1")).toBeInTheDocument()
      expect(screen.getByText("✅ 学習項目2")).toBeInTheDocument()
      expect(screen.getByText("✅ 学習項目3")).toBeInTheDocument()
    })

    it("タイムスタンプセクションのタイトルとすべての項目が表示される", () => {
      render(<VideoDetail video={mockVideoData} />)
      expect(screen.getByText("⏰ タイムスタンプ")).toBeInTheDocument()
      expect(screen.getByText("00:00")).toBeInTheDocument()
      expect(screen.getByText(/イントロダクション/)).toBeInTheDocument()
      expect(screen.getByText("05:30")).toBeInTheDocument()
      expect(screen.getByText(/メインコンテンツ/)).toBeInTheDocument()
      expect(screen.getByText("15:45")).toBeInTheDocument()
      expect(screen.getByText(/まとめ/)).toBeInTheDocument()
    })

    it("すべてのタグが表示される", () => {
      render(<VideoDetail video={mockVideoData} />)
      expect(screen.getByText("#テスト")).toBeInTheDocument()
      expect(screen.getByText("#サンプル")).toBeInTheDocument()
      expect(screen.getByText("#動画")).toBeInTheDocument()
    })

    it("SNSアカウント情報が表示される", () => {
      render(<VideoDetail video={mockVideoData} />)
      expect(screen.getByText("🔗 SNS・コミュニティ")).toBeInTheDocument()
      expect(screen.getByText("🐦")).toBeInTheDocument()
      expect(screen.getByText("X(Twitter)")).toBeInTheDocument()
      expect(screen.getByText("📝")).toBeInTheDocument()
    })

    it("エンゲージメント促進セクションが表示される", () => {
      render(<VideoDetail video={mockVideoData} />)
      expect(
        screen.getByText("💬 コメント・質問お待ちしています!")
      ).toBeInTheDocument()
      expect(
        screen.getByText(/実際に試してみた感想や質問があれば/)
      ).toBeInTheDocument()
      expect(
        screen.getByText("チャンネル登録・高評価お願いします!")
      ).toBeInTheDocument()
    })
  })

  describe("リンク表示のテスト", () => {
    it("SNSアカウントのURLがクリック可能なリンクとして表示される", () => {
      render(<VideoDetail video={mockVideoData} />)
      const links = screen.getAllByRole("link")
      const twitterLink = links.find(
        (link) =>
          link.getAttribute("href") === "https://x.com/test_account"
      )
      expect(twitterLink).toBeInTheDocument()
      expect(twitterLink).toHaveAttribute("target", "_blank")
      expect(twitterLink).toHaveAttribute("rel", "noopener noreferrer")
    })

    it("外部リンクに適切な属性が設定されている", () => {
      render(<VideoDetail video={mockVideoData} />)
      const noteLink = screen
        .getAllByRole("link")
        .find(
          (link) =>
            link.getAttribute("href") === "https://note.com/test_account"
        )
      expect(noteLink).toHaveAttribute("target", "_blank")
      expect(noteLink).toHaveAttribute("rel", "noopener noreferrer")
      expect(noteLink).toHaveClass("text-blue-600", "underline")
    })
  })

  describe("オプションセクションのテスト", () => {
    it("関連動画セクションが存在する場合に表示される", () => {
      render(<VideoDetail video={mockVideoWithOptionalSections} />)
      expect(screen.getByText("📌 関連動画")).toBeInTheDocument()
      expect(screen.getByText("🎯")).toBeInTheDocument()
      expect(screen.getByText("関連動画1")).toBeInTheDocument()
      expect(screen.getByText("関連動画2")).toBeInTheDocument()
    })

    it("関連動画の絵文字がある場合のみ表示される", () => {
      const { container } = render(
        <VideoDetail video={mockVideoWithOptionalSections} />
      )
      // 絵文字がある関連動画1には🎯が表示される
      expect(screen.getByText("🎯")).toBeInTheDocument()

      // HTMLの構造を確認: video.relatedVideos.videosの最初の要素には絵文字があり、2番目にはない
      const html = container.innerHTML
      // 🎯が1回だけ表示されることを確認(関連動画セクションに1つだけ)
      const emojiCount = (html.match(/🎯/g) || []).length
      expect(emojiCount).toBe(1)
    })

    it("Udemy講座セクションが存在する場合に表示される", () => {
      render(<VideoDetail video={mockVideoWithOptionalSections} />)
      expect(screen.getByText("🚀 体系的に学びたい方へ")).toBeInTheDocument()
      expect(screen.getByText("Udemy講座の説明文です。")).toBeInTheDocument()
      expect(screen.getByText("講座1")).toBeInTheDocument()
      expect(screen.getByText("講座2")).toBeInTheDocument()
      expect(screen.getByText("Udemy講座の詳細はこちら")).toBeInTheDocument()
    })

    it("Discordコミュニティセクションが存在する場合に表示される", () => {
      render(<VideoDetail video={mockVideoWithOptionalSections} />)
      expect(
        screen.getByText("💬 Discordコミュニティ(無料)")
      ).toBeInTheDocument()
      expect(
        screen.getByText("Discordコミュニティの説明文です。")
      ).toBeInTheDocument()
      expect(screen.getByText("Discordに参加する")).toBeInTheDocument()
    })

    it("オプションセクションがない場合は表示されない", () => {
      render(<VideoDetail video={mockVideoData} />)
      expect(screen.queryByText("📌 関連動画")).not.toBeInTheDocument()
      expect(
        screen.queryByText("🚀 体系的に学びたい方へ")
      ).not.toBeInTheDocument()
      expect(
        screen.queryByText("💬 Discordコミュニティ(無料)")
      ).not.toBeInTheDocument()
    })
  })

  describe("カスタムセクションのテスト", () => {
    it("テキストセクションが適切に表示される", () => {
      render(<VideoDetail video={mockVideoWithCustomSections} />)
      expect(screen.getByText("📝 テキストセクション")).toBeInTheDocument()
      expect(
        screen.getByText("これはテキストセクションのコンテンツです。")
      ).toBeInTheDocument()
    })

    it("リストセクションが箇条書きで表示される", () => {
      render(<VideoDetail video={mockVideoWithCustomSections} />)
      expect(screen.getByText("📋 リストセクション")).toBeInTheDocument()
      expect(screen.getByText("リスト項目1")).toBeInTheDocument()
      expect(screen.getByText("リスト項目2")).toBeInTheDocument()
      expect(screen.getByText("リスト項目3")).toBeInTheDocument()
    })

    it("リンクセクションがリンク集として表示される", () => {
      render(<VideoDetail video={mockVideoWithCustomSections} />)
      expect(screen.getByText("🔗 リンクセクション")).toBeInTheDocument()
      const link1 = screen.getByText("リンク1")
      expect(link1.closest("a")).toHaveAttribute(
        "href",
        "https://example.com/link1"
      )
      const link2 = screen.getByText("リンク2")
      expect(link2.closest("a")).toHaveAttribute(
        "href",
        "https://example.com/link2"
      )
    })

    it("混合セクションがテキスト、リスト、リンクを含めて表示される", () => {
      render(<VideoDetail video={mockVideoWithCustomSections} />)
      expect(screen.getByText("🎨 混合セクション")).toBeInTheDocument()
      expect(screen.getByText("混合セクションのテキスト")).toBeInTheDocument()
      expect(screen.getByText("混合項目1")).toBeInTheDocument()
      expect(screen.getByText("混合項目2")).toBeInTheDocument()
      const mixedLink = screen.getByText("混合リンク")
      expect(mixedLink.closest("a")).toHaveAttribute(
        "href",
        "https://example.com/mixed"
      )
    })

    it("カスタムセクションがない場合は表示されない", () => {
      render(<VideoDetail video={mockVideoData} />)
      expect(screen.queryByText("📝 テキストセクション")).not.toBeInTheDocument()
      expect(screen.queryByText("📋 リストセクション")).not.toBeInTheDocument()
    })
  })

  describe("セクション区切りのテスト", () => {
    it("セクション間に区切り線が表示される", () => {
      const { container } = render(<VideoDetail video={mockVideoData} />)
      // border-tクラスを持つdiv要素が複数存在することを確認
      const dividers = container.querySelectorAll(".border-t")
      expect(dividers.length).toBeGreaterThan(0)
    })
  })

  describe("セクション表示順序のテスト", () => {
    it("すべてのセクションが正しい順序で表示される", () => {
      const { container } = render(
        <VideoDetail video={mockVideoWithCustomSections} />
      )
      const text = container.textContent || ""

      // セクションのタイトルの出現順序を確認
      const openingIndex = text.indexOf("これは冒頭セクションの1行目")
      const learningIndex = text.indexOf("💡 この動画で学べること")
      const customIndex = text.indexOf("📝 テキストセクション")
      const socialIndex = text.indexOf("🔗 SNS・コミュニティ")
      const timestampIndex = text.indexOf("⏰ タイムスタンプ")
      const engagementIndex = text.indexOf("💬 コメント・質問お待ちしています!")

      // 順序の検証
      expect(openingIndex).toBeLessThan(learningIndex)
      expect(learningIndex).toBeLessThan(customIndex)
      expect(customIndex).toBeLessThan(socialIndex)
      expect(socialIndex).toBeLessThan(timestampIndex)
      expect(timestampIndex).toBeLessThan(engagementIndex)
    })

    it("オプションセクションを含む場合の正しい順序", () => {
      const fullVideo: VideoMetadata = {
        ...mockVideoWithCustomSections,
        ...mockVideoWithOptionalSections,
      }
      const { container } = render(<VideoDetail video={fullVideo} />)
      const text = container.textContent || ""

      // セクションのタイトルの出現順序を確認
      const openingIndex = text.indexOf("これは冒頭セクションの1行目")
      const learningIndex = text.indexOf("💡 この動画で学べること")
      const customIndex = text.indexOf("📝 テキストセクション")
      const relatedIndex = text.indexOf("📌 関連動画")
      const udemyIndex = text.indexOf("🚀 体系的に学びたい方へ")
      const socialIndex = text.indexOf("🔗 SNS・コミュニティ")
      const discordIndex = text.indexOf("💬 Discordコミュニティ(無料)")
      const timestampIndex = text.indexOf("⏰ タイムスタンプ")
      const engagementIndex = text.indexOf("💬 コメント・質問お待ちしています!")

      // 順序の検証
      expect(openingIndex).toBeLessThan(learningIndex)
      expect(learningIndex).toBeLessThan(customIndex)
      expect(customIndex).toBeLessThan(relatedIndex)
      expect(relatedIndex).toBeLessThan(udemyIndex)
      expect(udemyIndex).toBeLessThan(socialIndex)
      expect(socialIndex).toBeLessThan(discordIndex)
      expect(discordIndex).toBeLessThan(timestampIndex)
      expect(timestampIndex).toBeLessThan(engagementIndex)
    })
  })
})
