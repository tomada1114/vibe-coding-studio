import { commonSections } from "@/data/shared/common-sections"
import type { VideoMetadata } from "@/types/video"

export const video_ZUr_Sp72q50: VideoMetadata = {
  id: "ZUr_Sp72q50",
  title:
    "SuperClaudeでClaude Codeの品質が爆上がり！チーム開発・個人開発の両方でおすすめの神ツールとは？",
  publishedAt: "2025-08-22",
  videoUrl: "https://www.youtube.com/watch?v=ZUr_Sp72q50",

  opening: {
    lines: [
      "Claude Codeユーザー必見！無料で使えるSuperClaudeで開発品質が劇的に向上しました。",
      "個人開発のクーポンページを実際に分析・改善しながら、コード量70%削減、品質スコア90%達成の全工程をお見せします！",
    ],
  },

  learningPoints: {
    title: "🎯 この動画を見ると得られるスキル",
    items: [
      "SuperClaudeのインストールから設定まで完全理解",
      "11種類の専門家ペルソナを使いこなせる",
      "コード品質を数値化して改善できる",
      "セキュリティ・パフォーマンスの問題を自動発見",
      "チーム開発レベルの品質管理ができる",
      "技術的負債を計画的に解消できる",
    ],
  },

  customSections: [
    {
      title: "💡 こんな悩みを解決します",
      type: "list",
      items: [
        "Claude Codeでセキュリティが心配",
        "コードが複雑になってきて管理が大変",
        "リファクタリングのタイミングが分からない",
        "チーム開発の品質基準を作りたい",
        "もっと効率的にClaude Codeを使いたい",
      ],
    },
    {
      title: "🛠 必要なもの",
      type: "list",
      items: [
        "Mac/Linux環境（Windows WSLも可）",
        "Python環境（uvパッケージマネージャー）",
        "Claude Pro/Maxプラン",
      ],
    },
    {
      title: "📚 参考リンク",
      type: "text",
      content:
        "インストールコマンドや詳細はQiita記事をチェック！\n\n[SuperClaude とは？Claude Codeのコード品質を30%改善できた神ツールの完全ガイド！](https://qiita.com/tomada/items/2eb1b0623c9f59424235)",
    },
  ],

  timestamps: {
    title: "⏰ タイムスタンプ",
    items: [
      { time: "00:00", label: "SuperClaudeとは" },
      { time: "00:48", label: "ペルソナとは" },
      { time: "02:42", label: "スラッシュコマンドとは" },
      { time: "05:18", label: "インストール" },
      { time: "12:20", label: "/sc:analyze で分析" },
      { time: "23:27", label: "/sc:improve で改善" },
      { time: "30:03", label: "まとめ" },
    ],
  },

  udemyCourses: {
    title: "📚 さらに学びたい方へ",
    description: "Claude Code完全マスター講座をUdemyで公開中！",
    cta: {
      text: "お得なクーポンはこちら",
      url: "https://school.learning-next.app/coupons",
    },
  },

  tags: [
    "SuperClaude",
    "ClaudeCode",
    "AI駆動開発",
    "コード品質",
    "VibeCoding",
    "バイブコーディング",
    "プログラミング",
    "個人開発",
  ],

  social: commonSections.social,
  discordCommunity: commonSections.discordCommunity,
  engagement: commonSections.engagement,
}
