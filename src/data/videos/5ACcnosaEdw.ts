import { commonSections } from "@/data/shared/common-sections"
import type { VideoMetadata } from "@/types/video"

/**
 * Claude Sonnet 4.5 vs GPT-5-Codex の性能比較動画
 * 実装速度とコード品質を実際の開発タスクで検証
 */
export const video_5ACcnosaEdw: VideoMetadata = {
  // 基本情報
  id: "5ACcnosaEdw",
  title:
    "Claude Sonnet 4.5 vs GPT-5-Codex！速度2倍差でも品質は互角？現役エンジニアの結論を解説",
  publishedAt: "2025-10-03T12:00:00+09:00",
  videoUrl: "https://www.youtube.com/watch?v=5ACcnosaEdw",

  // 冒頭セクション
  opening: {
    lines: [
      "Claude Sonnet 4.5とGPT-5-Codexのコード品質を100点満点で採点！",
      "同じ要件で100万件のログ分析システムを実装させた結果...",
      "【検証結果】",
      "・Claude Sonnet 4.5：74点（実装3分）",
      "・GPT-5-Codex：75点（実装7分）",
      "速度は2倍差、でも品質はほぼ互角。",
      "ただし決定的な違いが1つありました。",
      "なぜその違いが発生したのか？問題を防ぐには？",
      "動画で詳しく解説しています！",
      "※あくまで小〜中規模程度・新規機能開発時の比較となります。",
    ],
  },

  // 学べる内容セクション
  learningPoints: {
    title: "💡 この動画で学べること",
    items: [
      "✅ Claude Sonnet 4.5とGPT-5-Codexのコード品質比較",
      "✅ 実装速度とコード品質のトレードオフ",
      "✅ AI駆動開発での品質評価の方法",
    ],
  },

  // タイムスタンプセクション
  timestamps: {
    title: "⏰ タイムライン",
    items: [
      { time: "00:00", label: "はじめに" },
      { time: "01:27", label: "今回の検証内容" },
      { time: "03:25", label: "SuperClaudeの使用について補足" },
      { time: "04:40", label: "実装開始" },
      { time: "06:43", label: "コード品質の分析開始" },
      { time: "09:04", label: "分析結果の確認" },
      { time: "12:42", label: "比較のサマリ" },
    ],
  },

  // タグ
  tags: [
    "#claude",
    "#VibeCoding",
    "#sonnet",
    "#ClaudeSonnet4.5",
    "#GPT5Codex",
    "#コード品質",
    "#AI駆動開発",
    "#ClaudeCode",
    "#CodexCLI",
    "#anthropic",
    "#codex",
    "#python",
  ],

  // カスタムセクション
  customSections: [
    {
      type: "links",
      title: "📌 関連リンク",
      links: [
        {
          label: "【性能比較】Claude Sonnet 4.5 vs GPT-5-Codex（Qiita 記事版）",
          url: "https://qiita.com/tomada/items/fde259",
        },
      ],
    },
  ],

  // Udemy講座誘導セクション
  udemyCourses: {
    title: "🚀 AI駆動開発を体系的に学ぶ",
    description: "UdemyでClaude Code/Codex CLI実践講座公開中",
    cta: {
      text: "限定クーポンで最大90%OFF！",
      url: "https://school.learning-next.app/coupons",
    },
  },

  // 共通データ参照
  social: commonSections.social,
  discordCommunity: commonSections.discordCommunity,
  engagement: commonSections.engagement,
}
