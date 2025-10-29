import { commonSections } from "@/data/shared/common-sections"
import type { VideoMetadata } from "@/types/video"

export const video_HM0SLThgXqE: VideoMetadata = {
  id: "HM0SLThgXqE",
  title:
    "【仕様駆動開発】cc-sddでClaude Code/CursorなどをKiro化！日本語対応の国産ツールで簡単に始めるスペック駆動開発",
  publishedAt: "2025-09-19",
  videoUrl: "https://www.youtube.com/watch?v=HM0SLThgXqE",

  opening: {
    lines: [
      "こんにちは、とまだです！",
      "",
      "今回は、日本の開発者が作った仕様駆動開発ツール「cc-sdd」を徹底解説します。",
      "AWS Kiroの仕様駆動開発（Spec-Driven Development）を、Claude CodeやCursorで実践できる神ツールです。",
    ],
  },

  learningPoints: {
    title: "💡 この動画で学べること",
    items: [
      "cc-sddのインストール（30秒で完了）",
      "既存プロジェクトへの導入",
      "ステアリング文書の自動生成",
      "機能仕様の初期化から実装まで",
      "承認フローの実際の様子",
      "進捗管理とタスク追跡",
    ],
  },

  timestamps: {
    title: "⏰ タイムスタンプ",
    items: [
      { time: "00:00", label: "cc-sddとは？" },
      { time: "03:04", label: "インストール方法" },
      { time: "06:14", label: "steering でプロジェクト理解" },
      { time: "09:57", label: "spec-init で仕様駆動開発準備" },
      { time: "14:24", label: "spec-requirements で要件定義" },
      { time: "17:35", label: "spec-design で技術設計" },
      { time: "19:32", label: "spec-tasks で実装タスクに分解" },
      { time: "23:01", label: "spec-impl で実装スタート" },
      { time: "26:28", label: "spec-status で開発状況確認" },
      { time: "29:43", label: "まとめ・感想" },
    ],
  },

  tags: [
    "#cc_sdd",
    "#AWS_Kiro",
    "#仕様駆動開発",
    "#SDD",
    "#ClaudeCode",
    "#Cursor",
    "#AI駆動開発",
    "#国産ツール",
    "#日本語対応",
  ],

  customSections: [
    {
      title: "🚀 cc-sddとは？",
      type: "mixed",
      content:
        "AWS Kiroに搭載されている仕様駆動開発の手法を、Claude Code、Cursor、Gemini CLIなどで実現する国産ツール。",
      items: [
        "日本語完全対応（コマンドも日本語）",
        "1コマンドでインストール完了",
        "AWS Kiroと同じワークフローを実現",
        "要件定義→設計→実装の承認フロー付き",
      ],
      links: [
        {
          label: "cc-sdd GitHub",
          url: "https://github.com/gotalab/cc-sdd",
        },
      ],
    },
    {
      title: "👨‍💻 謝辞",
      type: "text",
      content:
        "cc-sddの開発者の方に心から感謝します。日本の開発者コミュニティにとって本当に価値のあるツールを作っていただきました。開発者GitHub: https://github.com/gotalab",
    },
  ],

  relatedVideos: {
    title: "🎬 関連動画で理解を深める",
    videos: [
      {
        title:
          "【仕様駆動開発】AWS Kiro がすごい！手戻り削減の要件定義→設計→計画→実装を誰でも実現できる時代へ",
        url: "https://www.youtube.com/watch?v=VIDEO_ID_1",
        emoji: "🚀",
      },
      {
        title:
          "【1時間で速習】Claude Code完全ガイド！AI駆動開発で企業サイトを作ってデプロイまで実演！",
        url: "https://www.youtube.com/watch?v=VIDEO_ID_2",
        emoji: "📚",
      },
    ],
  },

  social: commonSections.social,
  discordCommunity: commonSections.discordCommunity,
  engagement: commonSections.engagement,
}
