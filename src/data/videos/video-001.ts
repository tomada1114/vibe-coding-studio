import { commonSections } from "@/data/shared/common-sections"
import type { VideoMetadata } from "@/types/video"

/**
 * サンプル動画データ 1
 * Next.js App Routerの入門動画
 *
 * すべての必須項目とオプション項目(関連動画、Udemy講座、カスタムセクション)を含む
 * フルセットのサンプルとして活用してください。
 */
export const video001: VideoMetadata = {
  // 基本情報
  id: "video-001",
  title: "Next.js App Routerで学ぶモダンWeb開発入門",
  publishedAt: "2025-10-01T12:00:00+09:00",
  videoUrl: "https://www.youtube.com/watch?v=example001",

  // 冒頭セクション
  opening: {
    lines: [
      "この動画では、Next.js 15のApp Routerについて基礎から学びます。",
      "Server ComponentsやServer Actionsなど、最新機能を実際に手を動かしながら理解していきましょう。",
      "ReactとTypeScriptの基本知識があれば、誰でも理解できる内容になっています。",
    ],
  },

  // 学べる内容セクション
  learningPoints: {
    title: "💡 この動画で学べること",
    items: [
      "✅ App Routerの基本概念とPages Routerとの違い",
      "✅ Server ComponentsとClient Componentsの使い分け",
      "✅ Server Actionsによるフォーム処理の実装方法",
      "✅ Next.js 15の新機能とベストプラクティス",
      "✅ 実践的なプロジェクト構造の設計方法",
    ],
  },

  // タイムスタンプセクション
  timestamps: {
    title: "⏰ タイムスタンプ",
    items: [
      { time: "00:00", label: "イントロダクション" },
      { time: "02:30", label: "App Routerの概要とPages Routerとの違い" },
      { time: "08:45", label: "Server ComponentsとClient Componentsの解説" },
      { time: "15:20", label: "実際にプロジェクトを作成してみる" },
      { time: "25:10", label: "Server Actionsでフォーム処理を実装" },
      { time: "35:00", label: "Next.js 15の新機能紹介" },
      { time: "42:15", label: "まとめと次のステップ" },
    ],
  },

  // タグ
  tags: ["#NextJS", "#React", "#AppRouter", "#TypeScript", "#Web開発"],

  // カスタムセクション
  customSections: [
    {
      type: "text",
      title: "📝 この動画の前提知識",
      content:
        "ReactとTypeScriptの基本を理解していることを前提としています。Reactのコンポーネント、hooks、propsの概念について事前に学習しておくことをお勧めします。",
    },
    {
      type: "list",
      title: "🔧 動画で使用する技術",
      items: [
        "Next.js 15 (App Router)",
        "React 19",
        "TypeScript 5",
        "Tailwind CSS",
        "Server Actions",
      ],
    },
    {
      type: "links",
      title: "🔗 参考リソース",
      links: [
        {
          label: "Next.js公式ドキュメント",
          url: "https://nextjs.org/docs",
        },
        {
          label: "React公式ドキュメント",
          url: "https://react.dev",
        },
        {
          label: "TypeScript公式ドキュメント",
          url: "https://www.typescriptlang.org/docs",
        },
      ],
    },
  ],

  // 関連動画セクション
  relatedVideos: {
    title: "📌 関連動画",
    videos: [
      {
        emoji: "🎯",
        title: "TypeScript入門 - 型安全なコードの書き方",
        url: "https://www.youtube.com/watch?v=example-ts",
      },
      {
        emoji: "⚛️",
        title: "React Hooksの基礎と実践",
        url: "https://www.youtube.com/watch?v=example-hooks",
      },
    ],
  },

  // Udemy講座誘導セクション
  udemyCourses: {
    title: "🚀 体系的に学びたい方へ",
    description:
      "Next.jsとTypeScriptを使った実践的なWebアプリケーション開発を、より体系的に学びたい方向けのUdemy講座を提供しています。",
    courses: [
      "Next.js 15 マスターコース - App Routerで学ぶモダンWeb開発",
      "TypeScript実践講座 - 型安全なアプリケーション開発",
    ],
    cta: {
      text: "Udemy講座の詳細はこちら",
      url: "https://www.udemy.com/course/nextjs-app-router",
    },
  },

  // 共通データ参照
  social: commonSections.social,
  discordCommunity: commonSections.discordCommunity,
  engagement: commonSections.engagement,
}
