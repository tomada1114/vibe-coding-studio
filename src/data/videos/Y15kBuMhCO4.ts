import { commonSections } from "@/data/shared/common-sections"
import type { VideoMetadata } from "@/types/video"

/**
 * Codexスマホアプリ開発チュートリアル
 * React Native/Expoを使った実践的なモバイルアプリ開発
 */
export const video_Y15kBuMhCO4: VideoMetadata = {
  // 基本情報
  id: "Y15kBuMhCO4",
  title:
    "【Codex】はじめてのスマホアプリ AI 駆動開発！知識ゼロでも通知機能・ナビゲーションメニューまで作れるチュートリアル",
  publishedAt: "2025-10-18T12:00:00+09:00",
  videoUrl: "https://www.youtube.com/watch?v=Y15kBuMhCO4",

  // 冒頭セクション
  opening: {
    lines: [
      "Codex × Expoでスマホアプリ開発の基本機能を実践的に学べる動画です！",
      "複数ページのナビゲーション、ハンバーガーメニュー、プッシュ通知など、実用的なアプリに必須の機能をAI駆動開発で実装していきます。",
      "Udemy講座から練習パートを抜粋した内容なので、これからスマホアプリ開発を始めたい方の第一歩として最適です。",
      "この動画を見れば、AIとの対話だけで本格的なアプリの土台が作れるようになります！",
    ],
  },

  // 学べる内容セクション
  learningPoints: {
    title: "🚀 この動画で学べること",
    items: [
      "✅ 複数ページ間のナビゲーション実装",
      "✅ ハンバーガーメニューの作り方",
      "✅ プッシュ通知機能の組み込み方法",
      "✅ Expo × React Nativeの基本操作",
      "✅ Codexを使った効率的な開発フロー",
      "✅ AIへの適切な指示の出し方",
    ],
  },

  // タイムスタンプセクション
  timestamps: {
    title: "⏰ タイムライン",
    items: [
      { time: "00:00", label: "はじめに" },
      { time: "06:58", label: "AGENTS.mdを作成" },
      { time: "15:20", label: "トップをカスタマイズ" },
      { time: "23:46", label: "ページ遷移メニューを作成" },
      { time: "33:22", label: "通知機能を追加" },
    ],
  },

  // タグ
  tags: [
    "バイブコーディング",
    "VibeCoding",
    "プログラミング",
    "Codex",
    "CodexCLI",
    "Expo",
    "ReactNative",
    "スマホアプリ開発",
    "モバイルアプリ",
    "AI駆動開発",
    "ナビゲーション",
    "プッシュ通知",
    "ハンバーガーメニュー",
    "ChatGPT",
    "GPT5",
  ],

  // カスタムセクション
  customSections: [
    {
      type: "mixed",
      title: "🎯 こんな方におすすめ",
      items: [
        "Webアプリは作れるけどスマホアプリに挑戦したい",
        "React Native/Expoの基本を実践的に学びたい",
        "AIを使った効率的な開発方法を身につけたい",
        "ナビゲーションや通知の実装方法を知りたい",
        "Codexの実力を実際に体感してみたい",
      ],
      content:
        "プログラミング経験があまりなくても、AIの力を借りれば実装できることを実感できます！",
    },
    {
      type: "text",
      title: "📱 まだ環境構築が済んでいない方へ",
      content:
        "環境構築がまだの方は、まずReact Native（Expo）入門動画で準備を整えましょう！Node.js、Expo、シミュレータのセットアップまで、1時間で完全マスターできる内容です。",
    },
  ],

  // 関連動画セクション
  relatedVideos: {
    title: "📌 関連動画",
    videos: [
      {
        title:
          "React Native（Expo）入門!iOS・Android アプリ環境構築の全手順を初心者向けに解説",
        url: "https://www.youtube.com/watch?v=TWUpzNGp7fI",
      },
      {
        title:
          "OpenAI Codex（ChatGPT）でバイブコーディング入門!動画1本で完全理解",
        url: "https://www.youtube.com/watch?v=H5TGzM_PCW4",
      },
      {
        title:
          "【Codex CLI対応】仕様駆動開発を1コマンドで導入!Spec Driven Codex",
        url: "https://www.youtube.com/watch?v=1EQllS_3TJo",
      },
    ],
  },

  // Udemy講座誘導セクション
  udemyCourses: {
    title: "📚 スマホアプリ × AI駆動開発を体系的に学ぶ",
    description:
      "本動画はCodexでスマホアプリ開発を行う講座の練習パートを抜粋しています。より体系的に学びたい方向けに、最大90%OFFクーポンをご用意しています！",
    courses: [
      "【Codex × スマホアプリ開発】AI駆動開発で作る！React Native ではじめるモバイルアプリ開発実践",
    ],
    cta: {
      text: "講座では読書記録アプリを完成まで作り上げ、SQLiteデータベース連携やTypeScript対応まで学べます",
      url: "https://www.vibecodingstudio.dev/coupons?topic=codex",
    },
  },

  // 共通データ参照
  social: commonSections.social,
  discordCommunity: commonSections.discordCommunity,
  engagement: commonSections.engagement,
}
