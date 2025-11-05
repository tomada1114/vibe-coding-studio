import { commonSections } from "@/data/shared/common-sections"
import type { VideoMetadata } from "@/types/video"

/**
 * Claude Code vs Codex CLI 徹底比較動画
 * 10の観点から両ツールの違いと使い分けを解説
 */
export const video_4HJCCAfDGU4: VideoMetadata = {
  // 基本情報
  id: "4HJCCAfDGU4",
  title:
    "【どっちを選ぶ？】Claude Code vs Codex CLI！両方使い倒した現役エンジニアの最終結論を徹底解説！",
  publishedAt: "2025-09-29T12:00:00+09:00",
  videoUrl: "https://www.youtube.com/watch?v=4HJCCAfDGU4",

  // 冒頭セクション
  opening: {
    lines: [
      "Claude Code と Codex CLI、結局どっちを選べばいいのか？",
      "両ツールを日常的に使い倒している現役エンジニアが、10の観点から徹底比較して、あなたに最適な選択をお教えします！",
      "まず、それぞれを併用していいとこ取りする使い方もご紹介しますので、コスパ良く、品質も兼ね揃えた最適解を知りたい方は、ぜひ最後までご覧ください。",
      "なお、収録の関係上 Claude 4.5 Sonnet 登場前の比較となりますこと、ご了承ください。",
    ],
  },

  // 学べる内容セクション
  learningPoints: {
    title: "💡 この動画でわかること",
    items: [
      "✅ Claude Code と Codex CLI の10個の比較観点",
      "✅ それぞれのツールの強みと弱み",
      "✅ 用途・目的別の使い分け方",
      "✅ 併用によるいいとこ取りの方法",
    ],
  },

  // タイムスタンプセクション
  timestamps: {
    title: "⏰ タイムスタンプ",
    items: [
      { time: "00:00", label: "この動画でわかること" },
      { time: "00:24", label: "はじめに" },
      { time: "00:55", label: "自己紹介" },
      { time: "02:04", label: "こんな悩みありませんか？" },
      { time: "03:05", label: "今回比較する10個の観点" },
      { time: "06:16", label: "前提知識のおさらい" },
      { time: "07:17", label: "観点1: 料金プラン" },
      { time: "10:29", label: "観点2: コード品質" },
      { time: "13:58", label: "観点3: カスタマイズ性" },
      { time: "19:39", label: "観点4: 要件・設計と計画性" },
      { time: "22:58", label: "観点5: 操作の簡単さ" },
      { time: "26:48", label: "観点6: 学びやすさ" },
      { time: "29:38", label: "観点7: チーム開発" },
      { time: "31:46", label: "観点8: 用途・目的別" },
      { time: "34:31", label: "観点9: 開発テンポ" },
      { time: "36:49", label: "観点10: コーディング以外" },
      { time: "38:59", label: "実は併用が最強説？" },
      { time: "42:51", label: "まとめ" },
    ],
  },

  // タグ
  tags: [
    "バイブコーディング",
    "Claude",
    "VibeCoding",
    "ClaudeCode",
    "CodexCLI",
    "AI駆動開発",
    "プログラミング",
    "エンジニア",
    "ChatGPT",
    "開発ツール",
    "比較",
    "使い分け",
    "MCP",
    "個人開発",
    "フリーランス",
  ],

  // カスタムセクション
  customSections: [
    {
      type: "text",
      title: "💬 コメントお待ちしています！",
      content:
        "・どちらを使っていますか？\n・使い分けのコツがあれば教えてください\n・動画のリクエストもお気軽に！",
    },
  ],

  // 関連動画セクション
  relatedVideos: {
    title: "🎬 関連動画",
    videos: [
      {
        title:
          "【神アプデ】Claude CodeからCodexをMCPとして利用可能に！両者の良いとこどりで最強の開発環境を構築する方法",
        url: "https://www.youtube.com/watch?v=fTONBWDWke0",
      },
      {
        title: "AIが書いたコード、いつコミットする？失敗しないGit運用術",
        url: "https://www.youtube.com/watch?v=1LP4ZAsU_UI",
      },
      {
        title:
          "リアルなAI駆動開発の全工程！現役エンジニアの仕様駆動開発を公開",
        url: "https://www.youtube.com/watch?v=1-1NAB5jIjo",
      },
    ],
  },

  // Udemy講座誘導セクション
  udemyCourses: {
    title: "🚀 AI駆動開発を本格的に学びたい方へ",
    description: "ベストセラー講座も複数あります",
    courses: [
      "Claude Code 実践マスター講座",
      "Codex CLI 完全攻略講座",
      "バイブコーディング入門（プログラミング未経験OK）",
      "MCP連携による外部ツール自動化",
      "Next.js × Supabase本格アプリ開発",
    ],
    cta: {
      text: "🎁 最大90%OFFクーポン配布中!",
      url: "https://www.vibecodingstudio.dev/coupons",
    },
  },

  // 共通データ参照
  social: commonSections.social,
  discordCommunity: commonSections.discordCommunity,
  engagement: commonSections.engagement,
}
