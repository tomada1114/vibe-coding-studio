import {
  BookOpen,
  Code,
  Component,
  FileCode,
  Layers,
  Layout,
  Palette,
  Zap,
} from "lucide-react"

import {
  Curriculum,
  type CourseContent,
  type ThemeColors,
} from "@/components/docs/Curriculum"

// コースのスラッグを定義
const slug = "react"

/**
 * React コース用のテーマカラー
 */
const reactThemeColors: ThemeColors = {
  primary: "cyan",
  accent: "cyan-500",
  gradient: {
    from: "from-cyan-500",
    to: "to-blue-500",
  },
  bg: {
    light: "from-cyan-50",
  },
  border: {
    light: "border-l-cyan-500",
  },
  text: {
    accent: "text-cyan-500",
    hover: "hover:text-cyan-500",
  },
  button: {
    bg: "bg-cyan-500",
    bgHover: "hover:bg-cyan-600",
    outline: "focus-visible:outline-cyan-500",
  },
}

/**
 * React コース用のコンテンツ
 */
const reactContent: CourseContent = {
  // コースの基本情報
  title: "React 基礎",
  description:
    "モダンなユーザーインターフェースを構築する、最も人気の高いフロントエンドライブラリを基礎から実践まで体系的に学ぶ",
  shortDescription: "コンポーネント指向で効率的なUI開発を実現するライブラリ",
  tagline:
    "コンポーネント指向の開発で、再利用可能で保守性の高いWebアプリを作ろう",

  // メタ情報（SEO対策）
  meta: {
    title: "React 基礎カリキュラム",
    description:
      "モダンなユーザーインターフェースを構築する、最も人気の高いフロントエンドライブラリを基礎から実践まで体系的に学ぶ",
  },

  // 特徴セクション - コンテンツの特徴
  features: [
    {
      icon: Component,
      title: "コンポーネント指向による効率的な開発",
      description:
        "再利用可能なコンポーネントを作成し、大規模なアプリケーションでも保守性の高いコードを書けるようになります",
    },
    {
      icon: Zap,
      title: "Virtual DOMによる高速なUI更新",
      description:
        "Reactの仮想DOM技術により、パフォーマンスの高いユーザーインターフェースを構築する方法を学べます",
    },
    {
      icon: Palette,
      title: "Tailwind CSSでモダンなデザイン",
      description:
        "ユーティリティファーストのTailwind CSSを使って、効率的で美しいUIデザインを実現できます",
    },
    {
      icon: FileCode,
      title: "TypeScriptによる型安全な開発",
      description:
        "TypeScriptを活用してより安全で保守性の高いReactアプリケーションの開発手法を習得できます",
    },
  ],

  // 対象者セクション - 誰に向けたコンテンツか - Lucideアイコンを使用（変えてはいけない）
  targetAudience: [
    {
      icon: Code,
      title: "JavaScriptの基礎を習得し、モダンなフレームワークを学びたい方",
      description:
        "JavaScriptの知識を活かして、現代的なWebアプリケーション開発のスキルを身につけられます",
    },
    {
      icon: Layout,
      title: "フロントエンド開発者として本格的なキャリアを積みたい方",
      description:
        "企業で広く採用されているReactを学ぶことで、実務で通用するスキルを習得できます",
    },
    {
      icon: Layers,
      title: "コンポーネント指向の開発手法を理解したい方",
      description:
        "再利用可能なコンポーネント設計により、効率的で保守性の高い開発手法を学べます",
    },
    {
      icon: BookOpen,
      title: "Next.js やGatsby などのReactベースフレームワークの準備をしたい方",
      description:
        "Reactの基礎をしっかり学ぶことで、より高度なフレームワークもスムーズに習得できます",
    },
  ],

  // カリキュラム内容 - 各章のタイトルと説明
  curriculum: [
    {
      title: "【Chapter 1】はじめに",
      description:
        "<strong>Reactとは何か</strong>を理解し、その基本概念とモダンフロントエンド開発における位置づけを学びます。従来のDOM操作との違いやコンポーネント指向のメリット、Reactエコシステムの全体像を把握していきます。",
    },
    {
      title: "【Chapter 2】React開発環境の構築",
      description:
        "<strong>Vite</strong>を使った高速なReact開発環境の構築方法を学習します。プロジェクトの基本構成やディレクトリ構造の理解、<strong>VS Code</strong>での効率的な開発環境設定まで、実際の開発で必要な環境を整えます。",
    },
    {
      title: "【Chapter 3】Tailwind CSSでスタイリングを学ぼう",
      description:
        "<strong>Tailwind CSS</strong>の基本概念から実践的な使い方まで学習します。ユーティリティファーストアプローチによる効率的なスタイリング手法を習得し、ReactコンポーネントとTailwindを組み合わせた美しいUIの作成方法を身につけます。",
    },
    {
      title: "【Chapter 4】JSXとコンポーネントの基礎",
      description:
        "<strong>JSX</strong>の書き方から始まり、関数コンポーネントの作成、<strong>Props</strong>によるデータの受け渡し、イベントハンドリングまで、Reactの基本的な構成要素を一つずつ丁寧に学習していきます。",
    },
    {
      title: "【Chapter 5】Stateとライフサイクル",
      description:
        "<strong>useState</strong>によるコンポーネントの状態管理から、<strong>useEffect</strong>を使ったサイドエフェクトの扱い方まで学習します。Reactの核となるHooksの概念を理解し、動的なアプリケーション開発の基礎を築きます。",
    },
    {
      title: "【Chapter 6】Todoアプリを作ろう",
      description:
        "これまでの学習内容を統合して<strong>本格的なTodoアプリケーション</strong>を開発します。一覧表示から追加・削除・編集・完了機能まで段階的に実装し、<strong>localStorage</strong>を活用したデータ永続化も学びます。",
    },
    {
      title: "【Chapter 7】TypeScriptでReactを書こう",
      description:
        "<strong>TypeScript</strong>を導入したReact開発を学習します。コンポーネントの型定義、HooksやEventの型安全な扱い方を習得し、TypeScriptでの<strong>計算機アプリ</strong>開発を通じて実践的なスキルを身につけます。",
    },
  ],

  // CTAセクション
  cta: {
    title: "モダンなUI開発のスタンダードを身につけよう",
    description:
      "<strong>月額サブスクリプション</strong>にご登録いただくと、このカリキュラムの全コンテンツにアクセスできます。Reactをマスターすることで、Next.js や Gatsby などのより高度なフレームワークへの道筋も見えてきます。コンポーネント指向の開発手法を身につけて、現代的なWeb開発者への第一歩を踏み出しましょう！",
    primaryButtonText: "サブスクリプションを見る", // 不変
    primaryButtonLink: "/docs", // 料金ページへのリンク（全カリキュラムで共通）
    secondaryButtonText: "学習をスタート", // 不変
    secondaryButtonLink: "/docs/react/introduction/react_basic_concepts", // 最初のチャプターへのリンク
  },

  // チャプターの総数 - curriculum の長さと一致させる
  chapterCount: 7,
}

// メタデータをエクスポート
export const metadata = reactContent.meta

/**
 * React カリキュラムのランディングページ
 *
 * Curriculum共通コンポーネントを使用してコンテンツを表示
 */
export default function ReactCurriculumPage() {
  return (
    <Curriculum
      slug={slug}
      courseContent={reactContent}
      themeColors={reactThemeColors}
    />
  )
}
