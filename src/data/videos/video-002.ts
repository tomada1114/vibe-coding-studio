import { commonSections } from "@/data/shared/common-sections"
import type { VideoMetadata } from "@/types/video"

/**
 * サンプル動画データ 2
 * TypeScript型安全性の実践
 *
 * オプション項目を一部省略したシンプルな構成のサンプルです。
 * 最小限の構成でも十分な情報を提供できることを示します。
 */
export const video002: VideoMetadata = {
  // 基本情報
  id: "video-002",
  title: "TypeScriptで学ぶ型安全なコーディング実践",
  publishedAt: "2025-10-15T14:00:00+09:00",
  videoUrl: "https://youtu.be/example002",

  // 冒頭セクション
  opening: {
    lines: [
      "この動画では、TypeScriptの型システムを活用した安全なコーディング手法を学びます。",
      "実際のプロジェクトで役立つ実践的なテクニックを紹介します。",
    ],
  },

  // 学べる内容セクション
  learningPoints: {
    title: "💡 この動画で学べること",
    items: [
      "✅ TypeScript型定義の基本と応用",
      "✅ ジェネリクスを使った再利用可能なコードの書き方",
      "✅ Union型とIntersection型の使い分け",
      "✅ 型ガードによる安全な型絞り込み",
      "✅ utilityTypesを活用したコード最適化",
    ],
  },

  // タイムスタンプセクション
  timestamps: {
    title: "⏰ タイムスタンプ",
    items: [
      { time: "00:00", label: "イントロダクション" },
      { time: "01:45", label: "TypeScript型システムの概要" },
      { time: "07:20", label: "ジェネリクスの基礎" },
      { time: "15:30", label: "Union型とIntersection型" },
      { time: "22:10", label: "型ガードの実装" },
      { time: "28:45", label: "Utility Types活用法" },
      { time: "35:00", label: "実践例とまとめ" },
    ],
  },

  // タグ
  tags: ["#TypeScript", "#型安全性", "#Web開発", "#プログラミング"],

  // カスタムセクション(混合型の例)
  customSections: [
    {
      type: "mixed",
      title: "📚 推奨する事前学習",
      content:
        "JavaScriptの基本文法とES6+の機能を理解しておくことをお勧めします。",
      items: [
        "JavaScriptの変数、関数、オブジェクト",
        "アロー関数とテンプレートリテラル",
        "分割代入とスプレッド構文",
        "Promise と async/await",
      ],
      links: [
        {
          label: "MDN JavaScript ガイド",
          url: "https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide",
        },
      ],
    },
  ],

  // 共通データ参照
  social: commonSections.social,
  engagement: commonSections.engagement,
}
