import { commonSections } from "@/data/shared/common-sections"
import type { VideoMetadata } from "@/types/video"

/**
 * Visual Studio Code（VSCode）のインストールと基本操作ガイド
 * Microsoft開発の無料エディターで、拡張機能やターミナル統合など高機能な開発環境の構築方法を解説
 */
export const video_Mwp4_DYGzTI: VideoMetadata = {
  // 基本情報
  id: "Mwp4_DYGzTI",
  title: "VSCode（Visual Studio Code）のインストールと使い方",
  publishedAt: "2025-11-07T00:00:00+09:00",
  videoUrl: "https://www.youtube.com/watch?v=Mwp4_DYGzTI",

  // 冒頭セクション
  opening: {
    lines: [
      "この動画では、人気のエディター Visual Studio Code（VS Code）のインストール方法と使い方について見ていきます。",
      "VS CodeはMicrosoftが開発している無料のエディターで、メモ帳などよりも高機能なコード編集ができます。拡張機能を使ってエディターをより便利に拡張できるため、世界中で人気のエディターの1つです。",
      "すでにお使いのエディターがある場合はこの動画はスキップしていただいて大丈夫です。",
    ],
  },

  // 学べる内容セクション
  learningPoints: {
    title: "💡 この動画で学べること",
    items: [
      "✅ VS Codeのダウンロードとインストール方法（Mac/Windows）",
      "✅ 日本語拡張機能（Japanese Language Pack）のインストール",
      "✅ フォルダーとファイルの管理（エクスプローラー機能）",
      "✅ 文字検索と一括置換の使い方",
      "✅ 統合ターミナルの起動と基本操作",
      "✅ VS Codeでフォルダーを開いてターミナルを使う方法",
    ],
  },

  // タイムスタンプセクション
  timestamps: {
    title: "⏰ タイムスタンプ",
    items: [
      { time: "00:00", label: "イントロダクション" },
      { time: "00:36", label: "VS Codeとは？" },
      { time: "01:22", label: "VS Codeのダウンロード" },
      { time: "02:18", label: "Mac版のインストール手順" },
      { time: "03:45", label: "日本語拡張機能のインストール" },
      { time: "05:10", label: "エクスプローラー機能（フォルダー・ファイル管理）" },
      { time: "07:30", label: "検索機能と一括置換" },
      { time: "10:15", label: "統合ターミナルの使い方" },
      { time: "13:20", label: "まとめ" },
    ],
  },

  // タグ
  tags: [
    "VSCode",
    "VisualStudioCode",
    "エディター",
    "開発環境",
    "初心者向け",
    "プログラミング入門",
    "Microsoft",
    "拡張機能",
    "ターミナル",
    "コードエディター",
    "Mac",
    "Windows",
    "日本語化",
    "ファイル管理",
    "検索機能",
  ],

  // 関連動画セクション
  relatedVideos: {
    title: "🎬 関連動画",
    videos: [
      {
        title: "ターミナル（コマンドライン）とは？初心者向け基本操作ガイド",
        url: "https://www.youtube.com/watch?v=OfXZCu6xJJg",
      },
      {
        title: "CLI(コマンドラインインターフェース)を練習してみよう",
        url: "https://www.youtube.com/watch?v=dV1cZ3R-GEI",
      },
      {
        title: "AIが書いたコード、いつコミットする？失敗しないGit運用術",
        url: "https://www.youtube.com/watch?v=1LP4ZAsU_UI",
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

  // 共通セクション
  social: commonSections.social,
  discordCommunity: commonSections.discordCommunity,
  engagement: commonSections.engagement,
}
