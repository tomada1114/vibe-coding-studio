import { commonSections } from "@/data/shared/common-sections"
import type { VideoMetadata } from "@/types/video"

/**
 * リアルなAI駆動開発の全工程！現役エンジニアの仕様駆動開発の流れを公開
 */
export const video_1_1NAB5jIjo: VideoMetadata = {
  // 基本情報
  id: "1-1NAB5jIjo",
  title: "リアルなAI駆動開発の全工程！現役エンジニアの仕様駆動開発を公開",
  publishedAt: "2025-11-02T08:00:00+09:00",
  videoUrl: "https://www.youtube.com/watch?v=1-1NAB5jIjo",

  // 冒頭セクション
  opening: {
    lines: [
      "綺麗なチュートリアルじゃなく、リアルな開発プロセスをすべてお見せします！",
      "個人開発サイト「Vibe Coding Studio」にカスタムコマンド公開機能を追加する過程を、試行錯誤も含めてすべての思考プロセスを収録しました。",
      "実際にAI駆動開発を日常的にやっているエンジニアが、どう仕様を詰めて、どこでつまづいて、どう修正していくか。",
      "そういうリアルなAI駆動開発の思考プロセスを学び、ご自身の開発に活用していただければ幸いです。",
    ],
  },

  // 学べる内容セクション
  learningPoints: {
    title: "💡 この動画の特徴",
    items: [
      "✅ チュートリアルではなく、実際の開発プロセスをそのまま収録",
      "✅ cc-sdd（仕様駆動開発）を使った要件定義・設計の対話プロセス",
      "✅ Codexによる自動レビューでの指摘と軌道修正",
      "✅ スコープ調整や優先順位判断のリアルな判断",
      "✅ コンテキスト管理やMCP無効化などの実務テクニック",
      "✅ 失敗や迷いも含めた、飾らない開発の実態",
    ],
  },

  // タイムスタンプセクション
  timestamps: {
    title: "⏰ タイムライン",
    items: [
      { time: "00:00", label: "はじめに" },
      { time: "01:50", label: "今回作る機能を整理" },
      { time: "08:11", label: "ブランチを作成" },
      { time: "09:14", label: "cc-sddで仕様駆動開発" },
      { time: "13:45", label: "要件定義フェーズ" },
      { time: "27:34", label: "設計フェーズ" },
      { time: "41:55", label: "計画フェーズ" },
      { time: "48:29", label: "実装フェーズ" },
      { time: "50:54", label: "品質チェック" },
      { time: "52:34", label: "MCPで自動確認" },
      { time: "01:00:52", label: "手動で動作確認" },
      { time: "01:05:17", label: "GitHub PR作成" },
      { time: "01:08:57", label: "/reviewで自動レビュー" },
      { time: "01:12:45", label: "まとめ" },
    ],
  },

  // タグ
  tags: [
    "AI駆動開発",
    "仕様駆動開発",
    "ccsdd",
    "SpecDrivenCodex",
    "VibeCoding",
    "バイブコーディング",
    "ClaudeCode",
    "CodexCLI",
    "個人開発",
    "実践的プログラミング",
    "開発プロセス",
    "試行錯誤",
  ],

  // 関連動画セクション
  relatedVideos: {
    title: "📌 関連動画",
    videos: [
      {
        title:
          "【仕様駆動開発】cc-sddでClaude Code/CursorなどをKiro化！日本語対応の国産ツールで簡単に始めるスペック駆動開発",
        url: "https://www.youtube.com/watch?v=HM0SLThgXqE",
      },
      {
        title:
          "【1時間で速習】Claude Code完全ガイド AI駆動開発で企業サイトを作ってデプロイまで実演！",
        url: "https://www.youtube.com/watch?v=Xr_HhLuzOy8",
      },
      {
        title:
          "【コード品質UP】技術的負債を作らないための AI 向け開発ルールを設定しよう（Claude Code/Codex/Cursor 対応）",
        url: "https://www.youtube.com/watch?v=SO5qov2qTUE",
      },
      {
        title: "AIが書いたコード、いつコミットする？失敗しないGit運用術",
        url: "https://www.youtube.com/watch?v=1LP4ZAsU_UI",
      },
    ],
  },

  // Udemy講座誘導セクション
  udemyCourses: {
    title: "🚀 体系的にClaude Codeを学びたい方へ",
    description:
      "Udemy講座でClaude Codeを体系的にマスター！カスタムコマンドや仕様駆動開発など実践的なスキルを習得できます。",
    courses: [
      "カスタムコマンドの作成と活用方法",
      "仕様駆動開発（cc-sdd）の実践",
      "実践的なアプリ開発の全工程",
      "MCP連携で外部ツールを自在に操る",
      "コード品質を保ちながら爆速開発",
    ],
    cta: {
      text: "🎁 限定クーポンで最大90%OFF!",
      url: "https://www.vibecodingstudio.dev/coupons?topic=claude-code",
    },
  },

  // カスタムセクション
  customSections: [
    {
      type: "text",
      title: "📝 関連記事・リソース",
      content:
        "・公開したカスタムコマンド\nVibe Coding Studioの公式サイトで公開中\nhttps://www.vibecodingstudio.dev/claude-code/commands",
    },
  ],

  // 共通データ参照
  social: commonSections.social,
  discordCommunity: commonSections.discordCommunity,
  engagement: commonSections.engagement,
}
