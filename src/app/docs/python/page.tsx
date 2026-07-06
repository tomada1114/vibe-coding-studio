import { BarChart3, BookOpen, Brain, Code, Database } from "lucide-react"

import {
  Curriculum,
  type CourseContent,
  type ThemeColors,
} from "@/components/docs/Curriculum"
import type { Metadata } from "next"

// コースのスラッグを定義
const slug = "python"

/**
 * Python コース用のテーマカラー
 */
const pythonThemeColors: ThemeColors = {
  primary: "blue",
  accent: "blue-500",
  gradient: {
    from: "from-blue-500",
    to: "to-indigo-600",
  },
  bg: {
    light: "from-blue-50",
  },
  border: {
    light: "border-l-blue-500",
  },
  text: {
    accent: "text-blue-500",
    hover: "hover:text-blue-500",
  },
  button: {
    bg: "bg-blue-500",
    bgHover: "hover:bg-blue-600",
    outline: "focus-visible:outline-blue-500",
  },
}

/**
 * Python コース用のコンテンツ
 */
const pythonContent: CourseContent = {
  // コースの基本情報
  title: "Python 基礎",
  description:
    "データ分析とAI開発の基盤となる、世界で最も人気の高いプログラミング言語を基礎から実践まで体系的に学ぶ",
  shortDescription: "データサイエンス・AI開発の定番言語",
  tagline:
    "シンプルで読みやすい構文で、データサイエンスとAI開発の第一歩を踏み出そう",

  // メタ情報（SEO対策）
  meta: {
    title: "Python 基礎カリキュラム",
    description:
      "データ分析とAI開発の基盤となる、世界で最も人気の高いプログラミング言語を基礎から実践まで体系的に学ぶ",
  },

  // 特徴セクション - コンテンツの特徴
  features: [
    {
      icon: Code,
      title: "読みやすく、学びやすいシンプルな構文",
      description:
        "Pythonの哲学「シンプルであることは複雑であることよりも良い」に基づいた、初心者にも理解しやすい言語設計を学べます",
    },
    {
      icon: BarChart3,
      title: "データ分析・可視化の強力なライブラリ",
      description:
        "pandas、matplotlib、numpyなどの豊富なライブラリを活用した、実践的なデータ分析手法を習得できます",
    },
    {
      icon: Brain,
      title: "AI・機械学習への確実なステップ",
      description:
        "TensorFlow、scikit-learnなどのAI・機械学習ライブラリに向けた基礎固めができ、将来の発展性が広がります",
    },
    {
      icon: Database,
      title: "ファイル操作からWeb API連携まで",
      description:
        "CSV、JSON、Webスクレイピング、API通信など、実際の業務で必要となるデータ処理スキルを体系的に学習できます",
    },
  ],

  // 対象者セクション - 誰に向けたコンテンツか - Lucideアイコンを使用（変えてはいけない）
  targetAudience: [
    {
      icon: Code,
      title: "プログラミング初心者で、データ分析・AI分野に興味がある方",
      description:
        "Pythonの読みやすい構文により、プログラミングの基礎からデータサイエンスまでスムーズに習得できます",
    },
    {
      icon: BarChart3,
      title: "データ分析や業務の自動化を身につけたい方",
      description:
        "Excel作業の自動化、データの集計・可視化、レポート生成など、日常業務に直結するスキルを学べます",
    },
    {
      icon: Brain,
      title: "AI・機械学習分野へのキャリアチェンジを考えている方",
      description:
        "AIエンジニアやデータサイエンティストに必要なPythonの基礎力を確実に身につけられます",
    },
    {
      icon: BookOpen,
      title: "他の言語の経験があり、Pythonを新たに学びたい方",
      description:
        "Pythonならではの特徴や書き方、データサイエンス特有のライブラリの使い方を効率的に習得できます",
    },
  ],

  // カリキュラム内容 - 各章のタイトルと説明
  curriculum: [
    {
      title: "【Chapter 1】はじめに",
      description:
        "<strong>Pythonとは何か</strong>を理解し、なぜデータサイエンスやAI分野で圧倒的な人気を誇るのかを学びます。Pythonの哲学や特徴、活用分野の幅広さを把握していきます。",
    },
    {
      title: "【Chapter 2】Python開発環境の構築",
      description:
        "<strong>Python</strong>のインストールから<strong>VS Code</strong>での開発環境構築まで学習します。ターミナルの基本操作も含め、Pythonプログラミングに必要な環境を整えます。",
    },
    {
      title: "【Chapter 3】Pythonの基本文法",
      description:
        "コメントや変数の使い方から、<strong>数値・文字列・真偽値</strong>の操作、<strong>ユーザー入力</strong>の受け取りまで、Pythonの基本的な文法を一つずつ丁寧に学習していきます。",
    },
    {
      title: "【Chapter 4】データ型とコレクション",
      description:
        "<strong>リスト・辞書・タプル・セット</strong>といったPythonの主要なデータ構造を学習します。データの保存、取得、操作方法を習得し、情報管理の基礎を築きます。",
    },
    {
      title: "【Chapter 5】制御構造",
      description:
        "<strong>if文による条件分岐</strong>から<strong>for・while文による繰り返し処理</strong>まで、プログラムの流れを制御する重要な構文を学習し、論理的思考力を身につけます。",
    },
    {
      title: "【Chapter 6】関数の基礎",
      description:
        "関数の定義から<strong>引数・戻り値</strong>の扱い方、<strong>デフォルト引数・キーワード引数</strong>まで、コードの再利用性を高める関数の活用方法を習得します。",
    },
    {
      title: "【Chapter 7】エラー処理と例外",
      description:
        "よくあるエラーの種類から<strong>try-except文</strong>による適切なエラー処理まで学習し、堅牢なプログラムを作成するための技術を身につけます。",
    },
    {
      title: "【Chapter 8】ファイル操作の基礎",
      description:
        "<strong>テキストファイル・CSVファイル</strong>の読み書きから、ファイルを使ったデータ管理プログラムの作成まで、実用的なファイル操作スキルを学習します。",
    },
    {
      title: "【Chapter 9】モジュールとライブラリ",
      description:
        "<strong>標準ライブラリ</strong>の活用から<strong>独自モジュール</strong>の作成まで学習し、数学計算、乱数生成、日付処理など実用的な機能を身につけます。",
    },
    {
      title: "【Chapter 10】クラスとオブジェクト指向の基礎",
      description:
        "<strong>オブジェクト指向</strong>の基本概念を理解し、クラスとインスタンスの作成、属性とメソッドの定義など、より構造化されたプログラミング手法を学習します。",
    },
    {
      title: "【Chapter 11】インターネット通信の基礎",
      description:
        "<strong>Web API</strong>との通信方法や<strong>JSON</strong>データの扱い方を学習し、インターネット上のデータを活用したプログラム作成の基礎を身につけます。",
    },
  ],

  // CTAセクション
  cta: {
    title: "データサイエンス・AI開発への第一歩を踏み出そう",
    description:
      "このカリキュラムはすべて無料で学べます。Pythonをマスターすることで、データ分析、機械学習、Web開発など幅広い分野への道が開けます。世界で最も人気の高いプログラミング言語の基礎を固めて、次世代のテクノロジー分野で活躍できるスキルを身につけましょう！",
    primaryButtonText: "学習をスタート",
    primaryButtonLink: "/docs/python/introduction/what_is_python", // 最初のレッスンへのリンク
  },

  // チャプターの総数 - curriculum の長さと一致させる
  chapterCount: 11,
}

// メタデータをエクスポート
export const metadata: Metadata = {
  ...pythonContent.meta,
  openGraph: {
    title: `${pythonContent.meta.title} - Vibe Coding Studio`,
    description: pythonContent.meta.description,
    type: "website",
    url: "/docs/python",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${pythonContent.meta.title} - Vibe Coding Studio`,
      },
    ],
  },
  alternates: {
    canonical: "/docs/python",
  },
}

/**
 * Python カリキュラムのランディングページ
 *
 * Curriculum共通コンポーネントを使用してコンテンツを表示
 */
export default function PythonCurriculumPage() {
  return (
    <Curriculum
      slug={slug}
      courseContent={pythonContent}
      themeColors={pythonThemeColors}
    />
  )
}
