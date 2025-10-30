import { commonSections } from "@/data/shared/common-sections"
import type { VideoMetadata } from "@/types/video"

/**
 * 【GPT-5搭載】JetBrains最新AIエージェント「Junie」でRailsアプリ開発！Claude Codeとの違いも徹底比較
 */
export const video_VHZNtl46CJw: VideoMetadata = {
  // 基本情報
  id: "VHZNtl46CJw",
  title:
    "【GPT-5搭載】JetBrains最新AIエージェント「Junie」でRailsアプリ開発！Claude Codeとの違いも徹底比較",
  publishedAt: "2025-08-19T00:00:00+09:00",
  videoUrl: "https://www.youtube.com/watch?v=VHZNtl46CJw",

  // 冒頭セクション
  opening: {
    lines: [
      "現役フリーランスエンジニアのとまだです！",
      "今回はJetBrains社の最新AIエージェント「Junie」を実際に使って、既存のRailsアプリに機能追加してみました。",
      "なんと、最新モデルGPT-5がデフォルトで使える上に、指示していないのに勝手にテストを書いて品質を担保してくれる優秀なAIでした！",
    ],
  },

  // 学べる内容セクション
  learningPoints: {
    title: "💡 この動画で学べること",
    items: [
      "✅ JetBrains Junieの実際の使い方と特徴",
      "✅ GPT-5を使った高品質なAI駆動開発の実践",
      "✅ Claude Codeとの違いと使い分けポイント",
      "✅ 曖昧な指示でも品質を保った実装をする方法",
      "✅ RubyMineでのAI開発環境構築",
    ],
  },

  // タイムスタンプセクション
  timestamps: {
    title: "⏰ タイムライン",
    items: [
      { time: "00:00", label: "はじめに" },
      { time: "00:30", label: "Junieの概要説明" },
      { time: "02:15", label: "Junieのインストール" },
      { time: "05:00", label: "RailsアプリへのJunie統合" },
      { time: "08:30", label: "機能追加の実装デモ" },
      { time: "15:45", label: "自動テスト実行と品質確保" },
      { time: "20:00", label: "Claude Codeとの比較" },
      { time: "25:30", label: "メリット・デメリット" },
      { time: "28:45", label: "使い分けポイント" },
      { time: "30:00", label: "まとめ" },
    ],
  },

  // タグ
  tags: [
    "Junie",
    "JetBrains",
    "RubyMine",
    "GPT5",
    "AI駆動開発",
    "バイブコーディング",
    "VibeCoding",
    "RubyonRails",
    "ClaudeCode比較",
    "AIエージェント",
  ],

  // カスタムセクション
  customSections: [
    {
      type: "text",
      title: "💡 Junieの特徴まとめ",
      content:
        "✨ 最新モデルGPT-5がデフォルトで使える\n✨ 特に指示しなくてもテストを自動実行\n✨ 曖昧な指示でも品質の高い実装\n✨ プロジェクト理解力が高い（1分で全体把握）\n✨ ローカルLLMでオフラインモードも対応\n✨ エディタ内でチュートリアル完備",
    },
    {
      type: "text",
      title: "📢 総評（Claude Code使いの視点から）",
      content:
        "【Junieがおすすめな人】\n✅ JetBrains IDE利用者で「まずAIを試したい」\n✅ 品質重視で安全に開発を進めたい\n✅ チームでAIツールを導入検討している\n\n【Claude Codeがおすすめな人】\n✅ IDE問わず様々な環境で使いたい\n✅ カスタマイズ性を重視したい\n✅ 日本語の情報が豊富な方が良い\n\nどちらも素晴らしいツールなので、用途に応じて使い分けるのがベストだと思います！",
    },
    {
      type: "links",
      title: "📝 詳細記事",
      links: [
        {
          label: "RubyMineでJunie AIエージェントを使ってみた！GPT-5にも対応しつつ自主的に品質を担保",
          url: "https://qiita.com/tomada/items/4009e9...",
        },
      ],
    },
  ],

  // 共通データ参照
  social: commonSections.social,
  discordCommunity: commonSections.discordCommunity,
  engagement: commonSections.engagement,
}