import { commonSections } from "@/data/shared/common-sections"
import type { VideoMetadata } from "@/types/video"

/**
 * Slack×Claude連携の解説動画
 * Slackでのチャット要約、エラー解決など業務効率化の方法を実演
 */
export const video_qrDUjfnlOiI: VideoMetadata = {
  // 基本情報
  id: "qrDUjfnlOiI",
  title:
    "【Slack×Claude連携】業務効率化に使える！チャット要約・相談・エラー解決も AI で自動化できるアップデート",
  publishedAt: "2025-10-04T12:00:00+09:00",
  videoUrl: "https://www.youtube.com/watch?v=qrDUjfnlOiI",

  // 冒頭セクション
  opening: {
    lines: [
      "Claude が Slack と正式に連携！チーム内でのAI活用が劇的に進化しました。",
      "Slack内でClaudeを呼び出してそのまま会話の要約、エラー解決、ドキュメント分析まで、すべてSlack内で完結できるようになります。",
    ],
  },

  // 学べる内容セクション
  learningPoints: {
    title: "🚀 この動画で得られるスキル",
    items: [
      "✅ Slack×Claude連携の初期設定方法",
      "✅ ダイレクトメッセージでClaudeと会話する方法",
      "✅ スレッド内でClaudeをメンション呼び出しする方法",
      "✅ チャンネルの会話を瞬時に要約する活用法",
    ],
  },

  // タイムスタンプセクション
  timestamps: {
    title: "⏰ タイムスタンプ",
    items: [{ time: "00:00", label: "はじめに" }],
  },

  // タグ
  tags: [
    "Slack",
    "VibeCoding",
    "Claude",
    "AI活用",
    "業務効率化",
    "SlackAI",
    "ClaudeAPI",
    "チャットボット",
    "エラー解析",
    "MCP",
    "AI駆動開発",
    "バイブコーディング",
  ],

  // カスタムセクション
  customSections: [
    {
      type: "list",
      title: "📌 おすすめ活用シーン",
      items: [
        "🔸 長いスレッドの要約を1クリックで生成",
        "🔸 本番環境のエラー通知メッセージを即座に分析",
        "🔸 ミーティング前の資料準備を効率化",
        "🔸 技術的な質問にSlack内で即回答",
        "🔸 過去の会話履歴から必要な情報を検索",
      ],
    },
    {
      type: "links",
      title: "🔗 関連リンク",
      links: [
        {
          label: "Slack×Claude連携 公式発表",
          url: "https://www.anthropic.com/news/claude-slack",
        },
      ],
    },
  ],

  // Udemy講座誘導セクション
  udemyCourses: {
    title: "🎁 体系的にAI駆動開発を学びたい方へ",
    description:
      "UdemyではClaude Code実践マスター講座を公開中！最新のAI開発手法を体系的に学べます。",
    courses: [
      "MCP連携で外部ツールを自在に操る",
      "Claude Codeでの本格アプリ開発",
      "エラー解決の自動化テクニック",
      "チーム開発での AI 活用法",
    ],
    cta: {
      text: "🎯 限定クーポンで最大90%OFF!",
      url: "https://www.vibecodingstudio.dev/coupons?topic=claude-code",
    },
  },

  // 共通データ参照
  social: commonSections.social,
  discordCommunity: commonSections.discordCommunity,
  engagement: commonSections.engagement,
}
