import { commonSections } from "@/data/shared/common-sections"
import type { VideoMetadata } from "@/types/video"

/**
 * Google Antigravity速報動画
 * 無料で使える新しいAI IDEの全機能を徹底解説
 */
export const video_DDP9_YzjUYU: VideoMetadata = {
  // 基本情報
  id: "DDP9-YzjUYU",
  title:
    "【速報】Google Antigravityを紹介！Gemini 3 Pro/Claude Sonnet 4.5も無料！？",
  publishedAt: "2025-11-18T12:00:00+09:00",
  videoUrl: "https://www.youtube.com/watch?v=DDP9-YzjUYU",

  // 冒頭セクション
  opening: {
    lines: [
      "Google から新しい AI エディター「Antigravity」が登場しました！",
      "Cursor や Windsurf と同じく AI が組み込まれており、Gemini 3 Pro、Claude Sonnet 4.5、GPT-OSS など複数のモデルを無料で使えます。",
      "さらに驚くべきことに、個人であれば入力補完やコマンド実行まで無制限に利用可能です（Public Preview 期間中）。",
      "Agent Manager による複数ワークスペースの同時管理機能も搭載され、効率的な開発が可能になります。",
    ],
  },

  // 学べる内容セクション
  learningPoints: {
    title: "💡 この動画で学べること",
    items: [
      "✅ Google Antigravity の基本機能と使い方",
      "✅ 無料で使える AI モデル（Gemini 3 Pro、Claude Sonnet 4.5、GPT-OSS）",
      "✅ Planning モードと Fast モードの使い分け",
      "✅ Agent Manager による複数ワークスペース管理",
      "✅ 入力補完機能の活用方法",
      "✅ Chrome ブラウザとの連携機能",
    ],
  },

  // タイムスタンプセクション
  timestamps: {
    title: "⏰ タイムスタンプ",
    items: [
      { time: "00:00", label: "はじめに・Google Antigravity とは" },
      { time: "01:25", label: "料金プランと無料の範囲" },
      { time: "02:48", label: "エディターの全体像" },
      { time: "04:12", label: "Planning モードと Fast モード" },
      {
        time: "05:35",
        label: "モデル選択（Gemini 3 Pro / Claude Sonnet 4.5 等）",
      },
      { time: "07:18", label: "Rate Limit について" },
      { time: "09:03", label: "入力補完機能の使い方" },
      { time: "11:47", label: "Agent Manager の紹介" },
      { time: "14:22", label: "複数ワークスペースの管理方法" },
      { time: "17:55", label: "Chrome ブラウザとの連携" },
      { time: "19:40", label: "まとめと使い方の提案" },
    ],
  },

  // タグ
  tags: [
    "Google Antigravity",
    "Gemini 3 Pro",
    "Claude Sonnet 4.5",
    "GPT-OSS",
    "AI駆動開発",
    "IDE",
    "無料ツール",
    "Cursor",
    "Windsurf",
    "AIエディター比較",
  ],

  // カスタムセクション
  customSections: [
    {
      type: "links",
      title: "🔗 関連リンク",
      links: [
        {
          label: "Google Antigravity 公式サイト",
          url: "https://antigravity.google/",
        },
        {
          label: "Google Antigravity ドキュメント",
          url: "https://antigravity.google/docs/get-started",
        },
      ],
    },
    {
      type: "list",
      title: "🚀 Google Antigravity の特徴",
      items: [
        "複数の AI モデルを選択可能（Gemini 3 Pro、Claude Sonnet 4.5、GPT-OSS など）",
        "個人プランは無料（レート制限あり）",
        "Planning モードで事前に計画を立てられる",
        "Fast モードで通常のコーディングをサポート",
        "Agent Manager で複数ワークスペースを同時管理",
        "入力補完機能が無制限に使える（Public Preview 期間中）",
        "Chrome ブラウザと直接連携可能",
        "MCP サーバーとの接続に対応",
      ],
    },
  ],

  // 関連動画セクション
  relatedVideos: {
    title: "🎬 関連動画",
    videos: [
      {
        title:
          "【仕様駆動開発】cc-sddでClaude Code/CursorなどをKiro化！日本語対応の国産ツールで簡単に始めるスペック駆動開発",
        url: "https://www.youtube.com/watch?v=HM0SLThgXqE",
      },
      {
        title:
          "【どっちを選ぶ？】Claude Code vs Codex CLI！両方使い倒した現役エンジニアの最終結論を徹底解説！",
        url: "https://www.youtube.com/watch?v=4HJCCAfDGU4",
      },
      {
        title:
          "【無料】Replit Agent3で知識ゼロからバイブコーディング！ブラウザだけでWeb・データ分析・3Dゲーム・自動化ツールを作れる最新 AI エディタを試してみた",
        url: "https://www.youtube.com/watch?v=geZT1xTb06I",
      },
    ],
  },

  // Udemy講座誘導セクション
  udemyCourses: {
    title: "🚀 体系的に学びたい方へ",
    description:
      "プログラミング初心者からベテランまで、あなたのレベルに合わせたUdemy講座を多数ご用意しています。",
    cta: {
      text: "Udemy講座を見る",
      url: "https://www.vibecodingstudio.dev/coupons",
    },
  },

  // 共通データ参照
  social: commonSections.social,
  discordCommunity: commonSections.discordCommunity,
  engagement: commonSections.engagement,
}
