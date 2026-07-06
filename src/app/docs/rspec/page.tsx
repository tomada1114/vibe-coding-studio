import {
  Briefcase,
  CheckCheck,
  Code,
  KeySquare,
  Layout,
  ShieldCheck,
  Users,
} from "lucide-react"

import {
  Curriculum,
  type CourseContent,
  type ThemeColors,
} from "@/components/docs/Curriculum"
import type { Metadata } from "next"

// コースのスラグを定義
const slug = "rspec"

/**
 * RSpec コース用のテーマカラー
 * ここはコースごとに異なるテーマカラーを定義する（文字色にも使われるので、読みやすさを考慮すること
 */
const rspecThemeColors: ThemeColors = {
  primary: "red",
  accent: "red-600",
  gradient: {
    from: "from-red-600",
    to: "to-red-500",
  },
  bg: {
    light: "from-red-50",
  },
  border: {
    light: "border-l-red-600",
  },
  text: {
    accent: "text-red-600",
    hover: "hover:text-red-600",
  },
  button: {
    bg: "bg-red-600",
    bgHover: "hover:bg-red-500",
    outline: "focus-visible:outline-red-600",
  },
}

/**
 * RSpec コース用のコンテンツ
 */
const rspecContent: CourseContent = {
  // コースの基本情報
  title: "RSpec テスト駆動開発",
  description: "プロの開発現場で求められるテスト自動化スキルを体系的に学ぶ",
  shortDescription: "テスト駆動開発の実践スキルを習得",
  tagline: "開発の品質と効率を高めるテスト技術",

  // メタ情報（SEO対策）
  meta: {
    title: "RSpec テスト駆動開発マスターコース",
    description: "プロの開発現場で求められるテスト自動化スキルを体系的に学ぶ",
  },

  // 特徴セクション - コンテンツの特徴
  features: [
    {
      icon: ShieldCheck,
      title: "RSpecによるテスト自動化の基礎",
      description:
        "手作業によるバグ検出の限界を超え、効率的に品質を担保する方法を習得",
    },
    {
      icon: Code,
      title: "テストコードの設計と構造化",
      description:
        "メンテナンス性の高い、読みやすいテストコードの作成技術を学べる",
    },
    {
      icon: KeySquare,
      title: "モックとスタブを使った高度なテスト",
      description:
        "外部サービスに依存するコードもテスト可能にする実践的テクニック",
    },
    {
      icon: Layout,
      title: "Rails連携による実践的テスト",
      description:
        "モデル、コントローラー、システムテストなど実務で使えるスキル",
    },
  ],

  // 対象者セクション - 誰に向けたコンテンツか - Lucideアイコンを使用（変えてはいけない）
  targetAudience: [
    {
      icon: Code,
      title: "Ruby/Railsを学習中で、次のステップを目指す方",
      description:
        "基本的なコーディングスキルをさらに高めるための実践的なテスト技術が学べます",
    },
    {
      icon: CheckCheck,
      title: "品質の高いコードを書きたいエンジニア",
      description:
        "テスト駆動開発によってコードの信頼性と保守性を高める手法を習得できます",
    },
    {
      icon: Users,
      title: "チーム開発での貢献度を高めたい方",
      description:
        "テストの文化を取り入れることで、チーム全体の開発効率を向上させる方法を学べます",
    },
    {
      icon: Briefcase,
      title: "Ruby/Rails開発の実務スキルを磨きたい方",
      description:
        "現場で求められるテスト技術を体系的に学び、即戦力となるスキルが身につきます",
    },
  ],

  // カリキュラム内容 - 各章のタイトルと説明
  curriculum: [
    {
      title: "【Chapter 1】テストの基礎とRSpecの概要",
      description:
        "RSpecの基本概念とテストフレームワークの重要性を理解し、手動テストの限界と自動テストのメリットを学びます。自然言語的な記述方法を用いた<strong>読みやすいテストコード</strong>の書き方や、テストケースの作成方法を習得できます。",
    },
    {
      title: "【Chapter 2】RSpecを導入してみよう",
      description:
        "開発環境にRSpecを導入し、最初のテストを実行するまでの一連の流れを学びます。<strong>Bundler</strong>を使用したGem管理から、RSpecの初期設定、テストファイルの作成と実行まで、実践的な環境構築のノウハウを身につけられます。",
    },
    {
      title: "【Chapter 3】RSpec の書き方を学ぼう",
      description:
        "RSpecの基本構文である<strong>describe、context、it、expect</strong>などを使って、構造化された読みやすいテストコードの書き方を学びます。<strong>様々なマッチャー</strong>を用いた検証方法や、テストコードの効率的な記述法を習得できます。",
    },
    {
      title: "【Chapter 4】複雑な処理を簡単にテストする方法を学ぼう",
      description:
        "<strong>letやbefore</strong>を使ったテストデータの管理方法や、<strong>allow</strong>を用いたスタブ、<strong>double</strong>によるモックなど、複雑なコードをテストするための高度なテクニックを学びます。実際の開発現場で使われる手法を通じて、実践的なテストスキルを身につけられます。",
    },
    {
      title: "【Chapter 5】Ruby on Rails のモデルをテストしよう",
      description:
        "Railsアプリケーションにおけるモデルテストの書き方を学びます。<strong>バリデーション</strong>、<strong>アソシエーション</strong>、カスタムメソッドなど、モデルの様々な側面を確実にテストするための手法を習得できます。",
    },
    {
      title: "【Chapter 6】Ruby on Rails のコントローラをテストしよう",
      description:
        "<strong>リクエストスペック</strong>を使ったコントローラテストの方法を学びます。<strong>GETリクエスト</strong>によるデータ取得から、<strong>POST、PATCH、DELETE</strong>を使ったデータの作成・更新・削除処理まで、APIエンドポイントのテスト手法を身につけられます。",
    },
    {
      title: "【Chapter 7】ブラウザ操作を自動テストしよう",
      description:
        "<strong>Capybara</strong>とRSpecを組み合わせた<strong>システムスペック</strong>の書き方を学び、実際のブラウザ操作を自動的にテストする方法を習得します。フォーム入力・送信、バリデーション検証、<strong>JavaScript</strong>の動作確認など、ユーザー視点での総合的なテスト手法を身につけられます。",
    },
  ],

  // CTAセクション
  cta: {
    title: "テスト駆動開発のスキルで、あなたのエンジニアとしての価値を高めよう",
    description:
      "このカリキュラムはすべて無料で学べます。Ruby・Railsの基礎知識を活かして、プロレベルのテスト技術を自分のペースで着実に身につけていきましょう！",
    primaryButtonText: "学習をスタート",
    primaryButtonLink: "/docs/rspec/basics_and_introduction/rspec_basics", // 最初のレッスンへのリンク
  },

  // チャプターの総数 - curriculum の長さと一致させる
  chapterCount: 7,
}

// メタデータをエクスポート
export const metadata: Metadata = {
  ...rspecContent.meta,
  openGraph: {
    title: `${rspecContent.meta.title} - Vibe Coding Studio`,
    description: rspecContent.meta.description,
    type: "website",
    url: "/docs/rspec",
    images: [
      {
        url: "/vcs-logo-wide-transparent.png",
        width: 1200,
        height: 630,
        alt: `${rspecContent.meta.title} - Vibe Coding Studio`,
      },
    ],
  },
  alternates: {
    canonical: "/docs/rspec",
  },
}

/**
 * RSpec カリキュラムのランディングページ
 *
 * Curriculum共通コンポーネントを使用してコンテンツを表示
 */
export default function RSpecCurriculumPage() {
  return (
    <Curriculum
      slug={slug}
      courseContent={rspecContent}
      themeColors={rspecThemeColors}
    />
  )
}
