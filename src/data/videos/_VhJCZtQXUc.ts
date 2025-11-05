import { commonSections } from "@/data/shared/common-sections"
import type { VideoMetadata } from "@/types/video"

export const video__VhJCZtQXUc: VideoMetadata = {
  id: "_VhJCZtQXUc",
  title:
    "【爆速開発】Codex CLIのカスタムコマンドで繰り返し作業を1秒で終わらせる方法！実践デモ付き",
  publishedAt: "2025-09-13T12:00:00+09:00",
  videoUrl: "https://www.youtube.com/watch?v=_VhJCZtQXUc",

  opening: {
    lines: [
      "こんにちは、とまだです！",
      "「Codex CLIで同じ指示を何度も入力するのが面倒...」",
      "「コードレビューやリファクタリングをもっと効率化したい」",
      "「Claude Codeのカスタムコマンドみたいな機能がCodexにもあれば...」",
      "実は、Codex CLIには「カスタムプロンプト」という超便利な機能があるんです！",
      "※便宜上、カスタムコマンドと呼ぶこともあります。",
      "今回は、よく使う指示をコマンド化して、/reviewと打つだけでコードレビューができる方法を実演しながら解説します。",
    ],
  },

  learningPoints: {
    title: "💡 この動画で学べること",
    items: [
      "✨ Codex CLIのカスタムプロンプト機能の基本",
      "✨ よく使う指示をコマンド化する方法",
      "✨ /reviewコマンドで自動コードレビュー",
      "✨ 開発効率を劇的に向上させる実践テクニック",
    ],
  },

  timestamps: {
    title: "⏰ タイムスタンプ",
    items: [
      { time: "00:00", label: "カスタムプロンプトとは？" },
      { time: "02:55", label: "カスタムプロンプトを作ってみよう" },
      { time: "06:58", label: "/greet コマンドを実行" },
      { time: "10:33", label: "/review コマンドで自動レビュー" },
      { time: "14:25", label: "/review コマンドを実行" },
      { time: "16:40", label: "まとめ" },
    ],
  },

  tags: [
    "Codex CLI",
    "codex",
    "カスタムコマンド",
    "カスタムプロンプト",
    "AI駆動開発",
    "VibeCoding",
    "バイブコーディング",
    "プログラミング",
  ],

  relatedVideos: {
    title: "📌 関連動画",
    videos: [
      {
        title:
          "【1時間でわかる】OpenAI Codex（ChatGPT）でバイブコーディング入門！IDE・CLI 版の比較と基礎を動画1本で完全理解",
        url: "https://www.youtube.com/watch?v=H5TGzM_PCW4",
      },
      {
        title:
          "【Codex CLI対応】仕様駆動開発を1コマンドで導入！Spec Driven Codexで要件定義→設計→実装まで完全自動化",
        url: "https://www.youtube.com/watch?v=1EQllS_3TJo",
      },
      {
        title:
          "【Codex CLI活用術】MCPサーバを設定する方法！config.toml と CLI コマンドの使い方を初心者向けに解説",
        url: "https://www.youtube.com/watch?v=1TJydjQM6eo",
      },
    ],
  },

  udemyCourses: {
    title: "🚀 さらに深く学びたい方へ",
    description:
      "Udemy の Codex CLI 実践マスター講座では、さらに高度な内容を体系的に学べます。",
    courses: [
      "✨ MCP連携で外部ツールを自在に操る",
      "✨ Playwright・Supabase操作も自動化",
      "✨ Next.js × Supabaseで本格アプリ開発",
      "✨ AGENTS.mdを活用した高度な開発手法",
      "✨ 実践的なアプリ開発の全工程",
    ],
    cta: {
      text: "🎁 限定クーポンで最大90%OFF!",
      url: "https://www.vibecodingstudio.dev/coupons?topic=codex",
    },
  },

  customSections: [
    {
      type: "mixed",
      title: "📊 動画の補足情報",
      items: [
        "⚠️ 注意事項",
        "・カスタムプロンプトは現在グローバル設定のみ対応",
        "・プロジェクトローカルの設定は今後のアップデート待ち",
        "・IDE版では一部機能が不安定な場合があります",
        "",
        "💻 必要な環境",
        "・Codex CLI がインストール済み",
        "・ChatGPT Plus/Pro サブスクリプション",
        "・基本的なターミナル操作の知識",
      ],
    },
  ],

  social: commonSections.social,
  discordCommunity: commonSections.discordCommunity,
  engagement: commonSections.engagement,
}
