import { commonSections } from "@/data/shared/common-sections"
import type { VideoMetadata } from "@/types/video"

/**
 * Chrome DevTools MCPの解説動画
 * Playwright MCPとの違いと使い分けを実践的に解説
 */
export const video_gXwS9dJewrU: VideoMetadata = {
  // 基本情報
  id: "gXwS9dJewrU",
  title:
    "【Chrome DevTools MCP】ブラウザ操作やパフォーマンス確認まで！Playwright MCPとの違いと使い分けを徹底解説",
  publishedAt: "2025-10-01T12:00:00+09:00",
  videoUrl: "https://www.youtube.com/watch?v=gXwS9dJewrU",

  // 冒頭セクション
  opening: {
    lines: [
      "フロントエンド開発でDevToolsを開いてエラーやスクショをコピペする作業、もう必要ありません！",
      "9/23 に登場したばかりの Chrome DevTools MCP について徹底的に解説！",
      "また、似たような「Playwright MCP」との違いも気になる方が多いのではないでしょうか？",
      "今回は実際に両方のMCPを使いながら、それぞれの特徴と使い分け方を解説します！",
      "Claude Code、Codex、Cursor、GitHub Copilot での設定方法もご紹介。",
    ],
  },

  // 学べる内容セクション
  learningPoints: {
    title: "💡 この動画で学べること",
    items: [
      "✅ Chrome DevTools MCPの基本的な使い方",
      "✅ Playwright MCPとの比較と使い分け",
      "✅ ブラウザ操作とパフォーマンス確認の自動化",
      "✅ 各開発ツール（Claude Code、Codex、Cursor）への設定方法",
    ],
  },

  // タイムスタンプセクション
  timestamps: {
    title: "⏰ タイムスタンプ",
    items: [
      { time: "00:00", label: "はじめに" },
      { time: "00:34", label: "Chrome DevTools MCPとは" },
      { time: "02:23", label: "Playwright MCPとの比較表" },
      { time: "08:11", label: "各ツールへのインストール方法" },
      { time: "11:51", label: "ブラウザを自動操作する" },
      { time: "16:36", label: "コンソールのエラーをチェック" },
      { time: "18:31", label: "パフォーマンス分析" },
      { time: "23:06", label: "Playwright MCPとのトークン比較" },
      { time: "27:49", label: "補足：Playwright MCPを使うべき場面" },
      { time: "29:56", label: "まとめ：Playwright MCPとの使い分け" },
    ],
  },

  // タグ
  tags: [
    "PlaywrightMCP",
    "バイブコーディング",
    "自動化",
    "ChromeDevTools",
    "MCP",
    "AI駆動開発",
    "フロントエンド",
    "Web開発",
    "VibeCoding",
    "ClaudeCode",
    "Cursor",
    "Codex",
  ],

  // カスタムセクション
  customSections: [
    {
      type: "links",
      title: "🔗 関連リンク",
      links: [
        {
          label: "Chrome DevTools MCP 公式リポジトリ",
          url: "https://github.com/ChromeDevTools/chrome-devtools-mcp",
        },
        {
          label: "【詳細記事】Chrome DevTools MCPとPlaywright MCPの比較",
          url: "https://qiita.com/tomada/items/8b22ca",
        },
      ],
    },
  ],

  // Udemy講座誘導セクション
  udemyCourses: {
    title: "🚀 AI駆動開発をマスターしたい方へ",
    description:
      "MCP の使い方を含め、体系的に AI 駆動開発を学びたい方のためにUdemy講座を公開しています！",
    courses: ["Claude Code や Codex CLI", "MCP 専門講座"],
    cta: {
      text: "多くの高評価をいただき、複数のベストセラーを獲得!",
      url: "https://www.vibecodingstudio.dev/coupons",
    },
  },

  relatedVideos: {
    title: "🎬 関連動画",
    videos: [
      {
        title:
          "【Playwright入門】Claude Code × MCPでブラウザテストを完全自動化！AI 駆動の E2Eテスト実践ガイド",
        url: "https://www.youtube.com/watch?v=TDECUH62yYQ",
      },
      {
        title:
          "【Playwright MCP】Codex CLI の Webアプリ・デザインテストを自動化！AI 駆動の E2Eテスト実践ガイド",
        url: "https://www.youtube.com/watch?v=pRHyMLH1bcU",
      },
      {
        title:
          "【神アプデ】Claude CodeからCodexをMCPとして利用可能に！両者の良いとこどりで最強の開発環境を構築する方法",
        url: "https://www.youtube.com/watch?v=fTONBWDWke0",
      },
    ],
  },

  // 共通データ参照
  social: commonSections.social,
  discordCommunity: commonSections.discordCommunity,
  engagement: commonSections.engagement,
}
