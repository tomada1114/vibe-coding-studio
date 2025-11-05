import { commonSections } from "@/data/shared/common-sections"
import type { VideoMetadata } from "@/types/video"

export const video_Yy2alUag5I8: VideoMetadata = {
  id: "Yy2alUag5I8",
  title:
    "【完全比較】Claude Code vs Codex！Codexのコード品質がClaude Codeを超えた！Claude Code ユーザーは Codex（GPT-5）に乗り換えるべき？",
  publishedAt: "2025-09-11T12:00:00+09:00",
  videoUrl: "https://www.youtube.com/watch?v=Yy2alUag5I8",

  opening: {
    lines: [
      "Claude CodeとCodex、どちらを使うべきか悩んでいませんか？",
      "今回は同じ要件定義のToDoアプリを両ツールで作成し、コード品質を5つの観点から徹底比較しました。",
    ],
  },

  learningPoints: {
    title: "💡 この動画で学べること",
    items: [
      "両ツールの実装アプローチの違い",
      "ドメイン駆動設計を自動採用するCodexの実力",
      "テストフレームワーク選択の違い（Jest vs Vitest）",
      "実務レベルでの使い分け方法",
      "それぞれのツールが向いているプロジェクト",
    ],
  },

  timestamps: {
    title: "⏰ タイムスタンプ",
    items: [
      { time: "00:00", label: "Claude Code と Codex 紹介" },
      { time: "00:40", label: "Google Trends で注目度を比較" },
      { time: "01:35", label: "Codex が注目を集めている理由" },
      { time: "02:52", label: "作成するアプリの要件定義" },
      { time: "07:13", label: "Next.js プロジェクト作成" },
      { time: "08:16", label: "メモリファイル作成" },
      { time: "11:01", label: "設計・実装計画の準備" },
      { time: "16:50", label: "実装開始（両方）" },
      { time: "26:11", label: "完成版の確認（Claude Code）" },
      { time: "29:53", label: "実装の続き（Codex）" },
      { time: "31:20", label: "完成版の確認（Codex）" },
      { time: "34:52", label: "SuperClaude で品質チェック" },
      { time: "38:55", label: "品質スコアの確認" },
      { time: "42:38", label: "まとめ" },
    ],
  },

  tags: [
    "ClaudeCode",
    "Codex",
    "GPT5",
    "AI駆動開発",
    "VibeCoding",
    "バイブコーディング",
    "プログラミング",
  ],

  customSections: [
    {
      type: "mixed",
      title: "🏆 検証結果サマリー",
      content: "総合スコア",
      items: ["Codex：81.0点", "Claude Code：76.8点"],
    },
  ],

  relatedVideos: {
    title: "🎬 関連動画",
    videos: [
      {
        title:
          "【コード品質UP】技術的負債を作らないための AI 向け開発ルールを設定しよう（Claude Code/Codex/Cursor 対応）",
        url: "https://www.youtube.com/watch?v=SO5qov2qTUE",
      },
      {
        title:
          "【Codex】はじめてのスマホアプリ AI 駆動開発！知識ゼロでも通知機能・ナビゲーションメニューまで作れるチュートリアル",
        url: "https://www.youtube.com/watch?v=Y15kBuMhCO4",
      },
      {
        title: "AIが書いたコード、いつコミットする？失敗しないGit運用術",
        url: "https://www.youtube.com/watch?v=1LP4ZAsU_UI",
      },
    ],
  },

  udemyCourses: {
    title: "📚 関連講座・リソース",
    description: "プログラミング未経験OK！5つのアプリを作りながら学ぶ",
    courses: ["🎓 Claude Code × Vibe Coding入門講座"],
    cta: {
      text: "講座の詳細はこちら",
      url: "https://www.vibecodingstudio.dev/coupons",
    },
  },

  social: commonSections.social,
  discordCommunity: commonSections.discordCommunity,
  engagement: commonSections.engagement,
}
