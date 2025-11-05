import { commonSections } from "@/data/shared/common-sections"
import type { VideoMetadata } from "@/types/video"

/**
 * Spec Driven Codex 紹介動画
 * Codex CLI専用の仕様駆動開発ツールのリリースと使い方を解説
 */
export const video_1EQllS_3TJo: VideoMetadata = {
  // 基本情報
  id: "1EQllS_3TJo",
  title:
    "【Codex CLI対応】仕様駆動開発を1コマンドで導入！Spec Driven Codexで要件定義→設計→実装まで完全自動化",
  publishedAt: "2025-09-26T00:00:00+09:00",
  videoUrl: "https://www.youtube.com/watch?v=1EQllS_3TJo",

  // 冒頭セクション
  opening: {
    lines: [
      "Codex CLI専用の仕様駆動開発ツール「Spec Driven Codex」をOSSとしてリリースしました！",
      "既存の仕様駆動開発ツールはCodex CLIに対応していませんでしたが、自分が欲しくてついに専用ツールを公開。",
      "要件定義→設計→実装の流れを6つのコマンドで実現！",
      "この動画を見れば、AIと認識を合わせながら手戻りなく開発を進める方法が身につきます。",
      "実際にReactアプリを作る実演もお見せするので、流れをサクッと理解できます。",
    ],
  },

  // 学べる内容セクション
  learningPoints: {
    title: "💡 この動画で学べること",
    items: [
      "✅ Spec Driven Codexのインストール方法",
      "✅ 6つのコマンドによる仕様駆動開発フロー",
      "✅ AIと認識を合わせながら手戻りなく開発する方法",
      "✅ Reactアプリの実演デモ",
    ],
  },

  // タイムスタンプセクション
  timestamps: {
    title: "⏰ タイムライン",
    items: [
      { time: "00:00", label: "はじめに" },
      { time: "01:45", label: "インストール方法" },
      { time: "03:39", label: "/sdd-steering でプロジェクト理解" },
      { time: "06:46", label: "description.mdに「やりたいこと」を追記" },
      { time: "08:31", label: "/sdd-requirements で要件定義" },
      { time: "11:18", label: "/sdd-design で設計" },
      { time: "14:03", label: "/sdd-tasks で実装計画作成" },
      { time: "16:25", label: "/sdd-implement で実装スタート" },
      { time: "20:40", label: "/sdd-archive でクロージング" },
      { time: "23:34", label: "まとめ" },
    ],
  },

  // タグ
  tags: [
    "バイブコーディング",
    "VibeCoding",
    "プログラミング",
    "codexcli",
    "codex",
    "specdriven",
    "仕様駆動開発",
    "AI駆動開発",
    "Webアプリ開発",
    "OSS",
    "npm",
    "要件定義",
    "設計書",
  ],

  // カスタムセクション
  customSections: [
    {
      type: "text",
      title: "📦 Spec Driven Codexのインストール方法",
      content:
        "日本語版のインストールはこちら：\nnpx spec-driven-codex init --locale ja\n\nGitHub（日本語README）：\nhttps://github.com/tomada1114/spec-driven-codex",
    },
    {
      type: "links",
      title: "📌 関連動画",
      links: [
        {
          label: "【仕様駆動開発】cc-sddでClaude Code/CursorなどをKiro化！",
          url: "https://www.youtube.com/watch?v=VIDEO_ID_PLACEHOLDER",
        },
        {
          label:
            "【爆速開発】Codex CLIのカスタムコマンドで繰り返し作業を1秒で終わらせる方法！",
          url: "https://www.youtube.com/watch?v=VIDEO_ID_PLACEHOLDER",
        },
        {
          label: "【1時間でわかる】OpenAI Codex入門",
          url: "https://www.youtube.com/watch?v=VIDEO_ID_PLACEHOLDER",
        },
      ],
    },
    {
      type: "text",
      title: "📝 詳細記事",
      content:
        "実装の詳細や使用シーンについてはQiitaで詳しく解説しています。\nhttps://qiita.com/tomada/items/781d6e...",
    },
  ],

  // 関連動画セクション
  relatedVideos: {
    title: "🎬 関連動画",
    videos: [
      {
        title:
          "【Playwright MCP】Codex CLI の Webアプリ・デザインテストを自動化！AI 駆動の E2Eテスト実践ガイド",
        url: "https://www.youtube.com/watch?v=pRHyMLH1bcU",
      },
      {
        title: "リアルなAI駆動開発の全工程！現役エンジニアの仕様駆動開発を公開",
        url: "https://www.youtube.com/watch?v=1-1NAB5jIjo",
      },
      {
        title:
          "【1時間でわかる】OpenAI Codex（ChatGPT）でバイブコーディング入門！IDE・CLI 版の比較と基礎を動画1本で完全理解",
        url: "https://www.youtube.com/watch?v=H5TGzM_PCW4",
      },
    ],
  },

  // Udemy講座誘導セクション
  udemyCourses: {
    title: "🚀 体系的にCodex CLIを学んで一歩先へ！",
    description:
      "UdemyのCodex CLI実践マスター講座では、Codex CLI を体系的に学べます。",
    courses: [
      "MCP連携で外部ツールを自在に操る",
      "Playwright・Supabase操作も自動化",
      "Next.js × Supabaseで本格アプリ開発",
      "AGENTS.mdを活用した高度な開発手法",
      "実践的なアプリ開発の全工程",
    ],
    cta: {
      text: "🎁 限定クーポンで最大90%OFF!",
      url: "https://www.vibecodingstudio.dev/coupons?topic=codex",
    },
  },

  // 共通データ参照
  social: commonSections.social,
  discordCommunity: commonSections.discordCommunity,
  engagement: commonSections.engagement,
}
