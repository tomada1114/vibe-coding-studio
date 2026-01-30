import { BookOpen, Code, CodeSquare, Layers, Layout, LifeBuoy, Terminal } from 'lucide-react'

import { Curriculum, type CourseContent, type ThemeColors } from '@/components/docs/Curriculum'

// コースのスラグを定義
const slug = 'ruby'

/**
 * Ruby コース用のテーマカラー
 * ここはコースごとに異なるテーマカラーを定義する（文字色にも使われるので、読みやすさを考慮すること
 */
const rubyThemeColors: ThemeColors = {
  // 基本色
  primary: 'red',
  accent: 'red-600',
  accentDark: 'red-500',

  // グラデーション用
  gradient: {
    from: 'from-red-600',
    to: 'to-red-500',
    darkFrom: 'dark:from-red-700',
    darkTo: 'dark:to-red-600',
  },

  // 背景用
  bg: {
    light: 'from-red-50',
    dark: 'dark:from-red-950/30',
  },

  // ボーダー用
  border: {
    light: 'border-l-red-600',
    dark: 'dark:border-l-red-500',
  },

  // テキスト用
  text: {
    accent: 'text-red-600',
    accentDark: 'dark:text-red-500',
    hover: 'hover:text-red-600',
    hoverDark: 'dark:hover:text-red-500',
  },

  // ボタン用
  button: {
    bg: 'bg-red-600',
    bgHover: 'hover:bg-red-500',
    bgDark: 'dark:bg-red-700',
    bgHoverDark: 'dark:hover:bg-red-600',
    outline: 'focus-visible:outline-red-600',
  },
}

/**
 * Ruby コース用のコンテンツ
 */
const rubyContent: CourseContent = {
  // コースの基本情報
  title: 'Ruby 基礎',
  description: 'プログラミングの基礎から実践的なスキルまで、体系的に学べる Ruby 学習コンテンツ',
  shortDescription: '体系的に学べる Ruby 学習コンテンツ',
  tagline: 'プログラミングの基礎から実践的なスキルまで',

  // メタ情報（SEO対策）
  meta: {
    title: 'Ruby プログラミング基礎カリキュラム',
    description: 'プログラミングの基礎から実践的なスキルまで、体系的に学べる Ruby 学習コンテンツ',
  },

  // 特徴セクション - コンテンツの特徴
  features: [
    {
      icon: Code,
      title: 'Ruby 言語の基礎から応用まで',
      description: '変数・配列・条件分岐などの基本から、オブジェクト指向プログラミングの本質まで',
    },
    {
      icon: Terminal,
      title: '実践的な開発環境の構築手順',
      description: 'Mac/Windows両対応の環境構築ガイドと、効率的な開発ツールの活用法',
    },
    {
      icon: Layout,
      title: 'Rails 開発に必須の Ruby 応用テクニック',
      description: '実務で役立つメソッドや処理パターンを体系的に学習',
    },
    {
      icon: CodeSquare,
      title: '具体的なサンプルコードで学ぶ',
      description: '抽象的な概念も実際のコード例で理解しやすく解説',
    },
  ],

  // 対象者セクション - 誰に向けたコンテンツか - Lucideアイコンを使用（変えてはいけない）
  targetAudience: [
    {
      icon: LifeBuoy,
      title: 'プログラミング未経験からスタートしたい方',
      description: '基礎から順を追って学べる構成で、着実にスキルを積み上げられます',
    },
    {
      icon: CodeSquare,
      title: 'Ruby on Rails でアプリ開発を目指す方',
      description: 'Railsを使いこなすための確かな Ruby 基礎力を身につけられます',
    },
    {
      icon: Layers,
      title: 'オブジェクト指向プログラミングを理解したい方',
      description: '実践的なコード例で「使える」知識として学べます',
    },
    {
      icon: BookOpen,
      title: '独学で学習を進めている方',
      description: '体系的なカリキュラムで学習の抜け漏れを防げます',
    },
  ],

  // カリキュラム内容 - 各章のタイトルと説明
  curriculum: [
    {
      title: '【Chapter 1】Ruby 言語への第一歩',
      description: 'Ruby の概要と特徴を学び、これから始まる学習の全体像をつかみます。',
    },
    {
      title: '【Chapter 2】開発環境構築',
      description: 'Mac・Windows それぞれの環境に Ruby 開発環境を構築します。<strong>Visual Studio Code</strong> のセットアップから効率的な拡張機能の設定まで、実際の開発環境で学習をスタートできるよう詳しく解説します。',
    },
    {
      title: '【Chapter 3】Ruby プログラミングの基礎',
      description: 'プログラミングの基本となる<strong>変数、データ型、配列、条件分岐、繰り返し処理</strong>など、Ruby の基礎文法を順序立てて学びます。コードサンプルを通して実行結果を確認しながら着実に理解を深めます。',
    },
    {
      title: '【Chapter 4】メソッドによるコードの体系化',
      description: 'コードを整理して再利用性を高める<strong>「メソッド」</strong>の概念と実装方法を学びます。シンプルなメソッドから始め、引数の扱いや例外処理などの応用まで段階的に習得できます。',
    },
    {
      title: '【Chapter 5】オブジェクト指向設計の実践',
      description: 'Ruby の中核となる<strong>「オブジェクト指向」</strong>について学びます。<strong>クラスとインスタンス、継承、モジュール</strong>などの概念を具体的なコード例と共に理解できるよう解説します。',
    },
    {
      title: '【Chapter 6】Rails 開発でよく使う Ruby のメソッド',
      description: 'Ruby on Rails 開発で頻繁に使われる<strong>メソッドやテクニック</strong>を紹介します。<strong>配列操作、文字列加工、日付処理</strong>など、実務ですぐに役立つ知識をサンプルコードと共に解説します。',
    },
  ],

  // CTAセクション
  cta: {
    title: 'Ruby の基礎をマスターして、あなたのプログラミングスキルを広げましょう',
    description: '<strong>月額サブスクリプション</strong>にご登録いただくと、このカリキュラムの全コンテンツにアクセスできます。自分のペースで学習を進め、Ruby プログラミングのスキルを着実に身につけていきましょう！',
    primaryButtonText: 'サブスクリプションを見る', // 不変
    primaryButtonLink: '/docs', // 料金ページへのリンク（全カリキュラムで共通）
    secondaryButtonText: '学習をスタート', // 不変
    secondaryButtonLink: '/docs/ruby/introduction/what_is_ruby', // 最初のチャプターへのリンク
  },

  // チャプターの総数 - curriculum の長さと一致させる
  chapterCount: 6,
}

// メタデータをエクスポート
export const metadata = rubyContent.meta

/**
 * Ruby カリキュラムのランディングページ
 *
 * Curriculum共通コンポーネントを使用してコンテンツを表示
 */
export default function RubyCurriculumPage() {
  return <Curriculum slug={slug} courseContent={rubyContent} themeColors={rubyThemeColors} />
}
