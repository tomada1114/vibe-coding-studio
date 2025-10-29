import { commonSections } from "@/data/shared/common-sections"
import type { VideoMetadata } from "@/types/video"

export const video_TDECUH62yYQ: VideoMetadata = {
  id: "TDECUH62yYQ",
  title:
    "【Playwright入門】Claude Code × MCPでブラウザテストを完全自動化！AI 駆動の E2Eテスト実践ガイド",
  publishedAt: "2025-09-05",
  videoUrl: "https://www.youtube.com/watch?v=TDECUH62yYQ",

  opening: {
    lines: [
      "Claude CodeとMCPでE2Eテスト（ブラウザ操作レベルのテスト）を完全自動化する方法をお伝えします！",
      "Playwrightを使って、ユーザー操作レベルのテストをAIと対話しながら実装していきましょう。",
      "この内容を学べば、手動で動作確認する手間が減り、手間もバグも一気に削減できるようになります。",
    ],
  },

  learningPoints: {
    title: "💡 この動画で学べること",
    items: [
      "Claude Codeをもっと効率的に使いたい",
      "手動テストから解放されたい",
      "MCPツールの実践的な使い方を学びたい",
      "E2Eテストを自動化したい",
      "AI駆動開発で品質管理を効率化したい",
    ],
  },

  timestamps: {
    title: "⏰ タイムスタンプ",
    items: [
      { time: "00:00", label: "Playwright とは？" },
      { time: "00:35", label: "Next.js プロジェクト作成" },
      { time: "04:01", label: "Claude Code 初期化" },
      { time: "08:02", label: "動作確認用 Todo アプリ作成" },
      { time: "13:00", label: "Playwright MCP の設定" },
      { time: "15:32", label: "Webページの情報を自動取得してみよう" },
      { time: "21:51", label: "ブラウザを自動操作する方法" },
      { time: "26:22", label: "スクリーンショットを撮影しながらE2Eテスト" },
      { time: "31:36", label: "まとめ" },
    ],
  },

  tags: [
    "#ClaudeCode",
    "#MCP",
    "#Playwright",
    "#E2Eテスト",
    "#テスト自動化",
    "#AI駆動開発",
    "#VibeCoding",
    "#バイブコーディング",
    "#プログラミング",
    "#Webアプリ開発",
    "#自動テスト",
    "#ModelContextProtocol",
  ],

  customSections: [
    {
      type: "text",
      title: "📖 動画の内容",
      content:
        "この動画では、Claude CodeにMCP（Model Context Protocol）を連携させて、Playwrightによる自動テスト環境を構築します。\nMCPの基本的な仕組みから、実際のE2Eテスト作成、そして自動実行まで、すべて画面を見ながら学べます。",
    },
  ],

  udemyCourses: {
    title: "🎓 より体系的に学びたい方へ",
    description:
      "「Claude Code × MCP完全攻略」Udemy講座でさらに深く学べます！\n5つのMCPツールを使った本格的な開発手法を習得できます。",
    cta: {
      text: "特別クーポンはこちら",
      url: "https://school.learning-next.app/coupons",
    },
  },

  relatedVideos: {
    title: "📚 関連動画",
    videos: [
      {
        emoji: "📺",
        title: "Claude Code入門（1時間で完全マスター）",
        url: "https://www.youtube.com/watch?v=1TJydjQM6eo",
      },
    ],
  },

  social: commonSections.social,
  discordCommunity: commonSections.discordCommunity,
  engagement: commonSections.engagement,
}
