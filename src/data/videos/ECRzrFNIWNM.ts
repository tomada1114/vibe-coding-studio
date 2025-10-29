import { commonSections } from "@/data/shared/common-sections"
import type { VideoMetadata } from "@/types/video"

export const video_ECRzrFNIWNM: VideoMetadata = {
  id: "ECRzrFNIWNM",
  title:
    "【実践編】SuperClaudeのコマンドをフル活用！要件定義・設計・計画・エラー解決から品質改善までの推奨フローを完全解説",
  publishedAt: "2025-08-29",
  videoUrl: "https://www.youtube.com/watch?v=ECRzrFNIWNM",

  opening: {
    lines: [
      "『SuperClaudeのコマンドが多すぎて使い方がわからない』という方に向けた動画です。",
      "",
      "実はSuperClaudeには『推奨ワークフロー』があります！",
      "今回は天気予報アプリを0から作りながら、17種あるカスタムコマンドを実践的に使いこなす方法を完全解説します。",
    ],
  },

  learningPoints: {
    title: "🎯 この動画を見ると得られるスキル",
    items: [
      "SuperClaudeの推奨ワークフローを完全理解",
      "brainstorm→design→workflowの黄金パターン習得",
      "エラー解決コマンドの活用(troubleshoot)",
      "コード品質を92点に改善する手法",
      "要件定義から実装まで体系的な開発プロセス",
      "ドキュメント自動生成でチーム開発対応",
    ],
  },

  timestamps: {
    title: "⏰ タイムスタンプ",
    items: [
      { time: "00:00", label: "はじめに" },
      { time: "01:18", label: "プロジェクト作成" },
      { time: "04:23", label: "SuperClaudeのアップデート" },
      { time: "09:16", label: "OpenWeatherMap APIキー取得" },
      { time: "12:04", label: "/sc:brainstormで要件定義" },
      { time: "18:33", label: "/sc:designでシステム設計" },
      { time: "21:45", label: "/sc:workflowで実装計画作成" },
      { time: "25:40", label: "/sc:implementで基本機能実装" },
      { time: "30:36", label: "/sc:troubleshootでエラー解決" },
      { time: "33:19", label: "/sc:analyzeで問題分析(応用)" },
      { time: "39:24", label: "/sc:estimateで工数見積もり" },
      { time: "43:03", label: "/sc:taskでタスクを細分化" },
      { time: "45:54", label: "/sc:documentでドキュメント化" },
      { time: "53:34", label: "/sc:analyzeで品質チェック" },
      { time: "57:18", label: "/sc:improveで品質改善" },
      { time: "59:35", label: "/sc:test --coverage" },
      { time: "1:03:14", label: "まとめ" },
    ],
  },

  tags: [
    "バイブコーディング",
    "VibeCoding",
    "プログラミング",
    "SuperClaude",
    "ClaudeCode",
    "AI駆動開発",
    "Next.js",
    "天気予報アプリ",
    "Webアプリ開発",
  ],

  customSections: [
    {
      type: "mixed",
      title: "💡 こんな悩みを解決します",
      items: [
        "SuperClaudeのコマンドが多すぎて混乱する",
        "どの順番でコマンドを使えばいいかわからない",
        "エラーが出た時の対処法がわからない",
        "コード品質の改善方法を知りたい",
        "AI駆動開発をもっと効率化したい",
      ],
    },
    {
      type: "text",
      title: "📝 動画の内容",
      content:
        "Next.jsで天気予報アプリを作りながら、SuperClaudeの17種のカスタムコマンドを実践的に解説。\n\n要件定義→システム設計→実装計画→段階的実装の流れで、プロ級の開発プロセスを体験できます。\n途中でエラーが発生しても、コード品質に問題があっても、コマンドで解決する様子をリアルタイムで実演！",
    },
  ],

  relatedVideos: {
    title: "📚 関連記事・動画",
    videos: [
      {
        title:
          "Qiita：SuperClaudeの推奨ワークフローで天気予報アプリを作ったら開発効率が劇的に向上した話",
        url: "https://qiita.com/tomada/items/2eb1b0...",
        emoji: "📝",
      },
      {
        title:
          "前回の動画：SuperClaudeでClaude Codeの品質が爆上がり！チーム開発・個人開発...",
        url: "https://www.youtube.com/watch?v=...",
        emoji: "📹",
      },
    ],
  },

  udemyCourses: {
    title: "🚀 体系的に学びたい方へ",
    description: "SuperClaude公式GitHub",
    cta: {
      text: "Claude Code 完全マスター講座",
      url: "https://school.learning-next.app/coup...",
    },
    courses: ["https://github.com/SuperClaude-Org/Su..."],
  },

  social: commonSections.social,
  discordCommunity: commonSections.discordCommunity,
  engagement: commonSections.engagement,
}
