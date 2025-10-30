import { commonSections } from "@/data/shared/common-sections"
import type { VideoMetadata } from "@/types/video"

/**
 * OpenAI AgentKitとAgent Builderの使い方解説動画
 * ノーコードでAIワークフローを構築する方法を実践的に解説
 */
export const video_4MUadOFHy9M: VideoMetadata = {
  // 基本情報
  id: "4MUadOFHy9M",
  title:
    "【AgentKit登場】ノーコードでAIワークフローを構築！Agent Builderの使い方を完全解説",
  publishedAt: "2025-10-07T12:00:00+09:00",
  videoUrl: "https://www.youtube.com/watch?v=4MUadOFHy9M",

  // 冒頭セクション
  opening: {
    lines: [
      "OpenAI Dev Day 2025で発表されたAgentKit、その中でも特に注目のAgent Builderを実際に触ってみました!",
      "ドラッグ&ドロップでAIエージェントのワークフローを組み立てられる時代が来ました。",
      "条件分岐、Guardrails、JSON出力、ユーザー承認フローなど、プログラミング知識がなくても高度なAI処理を実現できる神ツールです。",
      "この動画では、Agent Builderの基本的な使い方から実践的なワークフロー作成まで、初めての方でも分かるように1から丁寧に解説していきます。",
    ],
  },

  // 学べる内容セクション
  learningPoints: {
    title: "💡 この動画で学べること",
    items: [
      "✅ Agent Builderの基本的な使い方",
      "✅ ワークフローのノード配置と接続方法",
      "✅ Guardrailsでセキュリティを強化",
      "✅ AgentノードでAI処理を組み込む",
      "✅ 条件分岐(if/else)で処理を分ける",
      "✅ JSON形式での出力設定",
      "✅ User Approvalで承認フローを実装",
      "✅ Previewで動作確認する方法",
    ],
  },

  // タイムスタンプセクション
  timestamps: {
    title: "⏰ タイムスタンプ",
    items: [
      { time: "00:00", label: "OpenAI Dev Day 2025のアップデート概要" },
      { time: "01:03", label: "Agent Builderにアクセス" },
      { time: "02:25", label: "カスタマーサービステンプレートを試す" },
      { time: "03:42", label: "実際にプレビューで動かしてみる" },
      { time: "06:50", label: "ゼロからワークフローを作成" },
      { time: "08:14", label: "Guardrailsノードで安全性を確保" },
      { time: "09:58", label: "Agentノードで分類処理を実装" },
      { time: "14:19", label: "JSON形式で出力を設定" },
      { time: "16:53", label: "条件分岐(if/else)で処理を分ける" },
      { time: "20:59", label: "User Approvalで承認フローを追加" },
      { time: "24:07", label: "MCP・ファイル検索などツール紹介" },
      { time: "26:56", label: "高度なデータ処理ツール" },
      { time: "29:46", label: "Agents SDK とは？" },
      { time: "31:18", label: "まとめと活用のヒント" },
    ],
  },

  // タグ
  tags: [
    "AgentBuilder",
    "VibeCoding",
    "バイブコーディング",
    "AgentKit",
    "OpenAI",
    "DevDay2025",
    "AI駆動開発",
    "ノーコード",
    "AIエージェント",
    "ワークフロー",
    "ChatGPT",
    "プログラミング",
  ],

  // カスタムセクション
  customSections: [
    {
      type: "list",
      title: "🎯 AgentKitでできること",
      items: [
        "カスタマーサポートの自動化",
        "フィードバック分類システム",
        "ドキュメント検索アシスタント",
        "Gmail/Googleカレンダー連携（その他、各種ツール）",
        "Web検索を活用した情報収集",
        "Pythonコード実行による複雑な処理",
        "MCPサーバとの連携",
      ],
    },
    {
      type: "links",
      title: "🔗 関連リンク",
      links: [
        {
          label: "OpenAI Agent Builder公式",
          url: "https://platform.openai.com/docs/guides/agent-builder",
        },
      ],
    },
  ],

  // 共通データ参照
  social: commonSections.social,
  discordCommunity: commonSections.discordCommunity,
  engagement: commonSections.engagement,
}
