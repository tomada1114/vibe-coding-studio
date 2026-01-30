import {
  Code,
  Globe,
  Layout,
  Lightbulb,
  MousePointer,
  Puzzle,
  Rocket,
  Zap,
} from "lucide-react"

import {
  Curriculum,
  type CourseContent,
  type ThemeColors,
} from "@/components/docs/Curriculum"

// コースのスラッグを定義
const slug = "javascript"

/**
 * JavaScript コース用のテーマカラー
 */
const javascriptThemeColors: ThemeColors = {
  primary: "yellow",
  accent: "yellow-600",
  gradient: {
    from: "from-yellow-600",
    to: "to-yellow-500",
  },
  bg: {
    light: "from-yellow-50",
  },
  border: {
    light: "border-l-yellow-600",
  },
  text: {
    accent: "text-yellow-600",
    hover: "hover:text-yellow-600",
  },
  button: {
    bg: "bg-yellow-600",
    bgHover: "hover:bg-yellow-500",
    outline: "focus-visible:outline-yellow-600",
  },
}

/**
 * JavaScript コース用のコンテンツ
 */
const javascriptContent: CourseContent = {
  // コースの基本情報
  title: "JavaScript 基礎",
  description:
    "Webページに動きを与える、フロントエンド開発の必須言語を基礎から実践まで体系的に学ぶ",
  shortDescription: "ブラウザとの対話を実現する動的プログラミング言語",
  tagline: "ブラウザを制御し、ユーザーとの対話を実現する力を身につけよう",

  // メタ情報（SEO対策）
  meta: {
    title: "JavaScript 基礎カリキュラム",
    description:
      "Webページに動きを与える、フロントエンド開発の必須言語を基礎から実践まで体系的に学ぶ",
  },

  // 特徴セクション - コンテンツの特徴
  features: [
    {
      icon: MousePointer,
      title: "インタラクティブなWebページ制作",
      description:
        "クリック、スクロール、フォーム入力など、ユーザーの操作に反応するWebページを作れるようになります",
    },
    {
      icon: Zap,
      title: "DOM操作によるリアルタイム更新",
      description:
        "ページを再読み込みせずに、コンテンツを動的に変更する技術を習得できます",
    },
    {
      icon: Globe,
      title: "非同期処理とAPI通信",
      description:
        "サーバーとの通信やデータ取得など、現代的なWeb開発に必須の非同期処理を学べます",
    },
    {
      icon: Puzzle,
      title: "実践的なアプリケーション開発",
      description:
        "ToDoリストやおみくじアプリなど、実際に使える小さなアプリケーションを作れます",
    },
  ],

  // 対象者セクション - 誰に向けたコンテンツか - Lucideアイコンを使用（変えてはいけない）
  targetAudience: [
    {
      icon: Layout,
      title: "HTML/CSSを学んで、さらに動的なサイトを作りたい方",
      description:
        "静的なWebページから一歩進んで、ユーザーと対話できるWebサイトを制作できるようになります",
    },
    {
      icon: Code,
      title: "プログラミング初心者でWebエンジニアを目指す方",
      description:
        "プログラミングの基本概念から始めて、フロントエンド開発の基礎スキルを身につけられます",
    },
    {
      icon: Lightbulb,
      title: "Webページにアニメーションや機能を追加したい方",
      description:
        "ボタンのクリック処理、フォームの検証、スライドショーなど、様々な機能を実装できます",
    },
    {
      icon: Rocket,
      title: "React や Vue.js などのフレームワーク学習の準備をしたい方",
      description:
        "JavaScriptの基礎をしっかり学ぶことで、モダンなフレームワークもスムーズに習得できます",
    },
  ],

  // カリキュラム内容 - 各章のタイトルと説明
  curriculum: [
    {
      title: "【Chapter 1】JavaScriptの世界へようこそ",
      description:
        "JavaScriptとは何かを理解し、<strong>プログラミングの基本概念</strong>を学びます。HTML/CSSとの関係性や、JavaScriptがWebページをどのように動的にするのかを実際のコードで体験しながら理解していきます。",
    },
    {
      title: "【Chapter 2】開発環境を整えて最初のコードを書こう",
      description:
        "HTMLファイルへのJavaScript組み込み方法や、<strong>VS Code</strong>での効率的な開発環境の構築、<strong>ブラウザの開発者ツール</strong>の使い方を学びます。コンソールでの実行からファイルでの管理まで、実際の開発で使用する手法を習得します。",
    },
    {
      title: "【Chapter 3】JavaScriptの基本文法をマスター",
      description:
        "<strong>変数宣言（let、const）</strong>から始まり、数値・文字列・真偽値の扱い方、配列やオブジェクトの操作方法まで、JavaScriptプログラミングの土台となる文法要素を一つずつ着実に学んでいきます。",
    },
    {
      title: "【Chapter 4】条件分岐と繰り返しで処理を制御する",
      description:
        "<strong>if文やswitch文</strong>による条件分岐、<strong>for文やwhile文</strong>による繰り返し処理を学習します。配列と組み合わせた効果的な処理方法も習得し、プログラムの基本的な制御構造をマスターします。",
    },
    {
      title: "【Chapter 5】関数で処理をまとめて再利用しよう",
      description:
        "関数の基本的な作り方から、引数と戻り値の扱い方、モダンな<strong>アロー関数</strong>の記法まで学習します。<strong>forEach、map、filter</strong>などの配列メソッドも習得し、効率的なコード記述方法を身につけます。",
    },
    {
      title: "【Chapter 6】エラーに立ち向かう力を身につけよう",
      description:
        "<strong>try-catch文</strong>を使ったエラー処理の方法や、様々なエラーの種類とその対処法を学習します。エラーメッセージを読む習慣をつけ、自己解決能力を向上させる重要なスキルを習得します。",
    },
    {
      title: "【Chapter 7】DOM操作でWebページを動的に変更しよう",
      description:
        "<strong>DOM（Document Object Model）</strong>の概念から、要素の取得・テキスト変更・イベント処理まで、JavaScriptの最も重要な機能を学習します。ボタンクリックやフォーム処理など、ユーザーとの対話を実現する方法を習得します。",
    },
    {
      title: "【Chapter 8】非同期処理でサーバーと通信しよう",
      description:
        "同期処理と非同期処理の違いから始まり、<strong>Promise、async/await</strong>を使った現代的な非同期処理の書き方を学習します。<strong>fetch API</strong>を使ったサーバー通信やJSONデータの扱い方も習得します。",
    },
    {
      title: "【Chapter 9】APIと連携して実用的な機能を実装しよう",
      description:
        "<strong>fetch API</strong>を使って外部サービスからデータを取得し、画面に表示する実践的な手法を学習します。APIエラーの適切な処理方法も身につけ、堅牢なWebアプリケーション開発の基礎を築きます。",
    },
    {
      title: "【Chapter 10】実践！アプリケーション開発にチャレンジ",
      description:
        "これまでに学んだ知識を活用して、<strong>ToDoリストアプリ</strong>や<strong>おみくじアプリ</strong>など、実際に使える小さなアプリケーションを作成します。企画から実装まで、一連の開発プロセスを体験できます。",
    },
  ],

  // CTAセクション
  cta: {
    title: "Webページに命を吹き込み、ユーザーとの対話を実現しよう",
    description:
      "<strong>月額サブスクリプション</strong>にご登録いただくと、このカリキュラムの全コンテンツにアクセスできます。JavaScriptの基礎をしっかり学ぶことで、React や Vue.js などのモダンなフレームワークへの道筋も見えてきます。自分のペースでプログラミングの楽しさを体験していきましょう！",
    primaryButtonText: "サブスクリプションを見る", // 不変
    primaryButtonLink: "/docs", // 料金ページへのリンク（全カリキュラムで共通）
    secondaryButtonText: "学習をスタート", // 不変
    secondaryButtonLink: "/docs/javascript/introduction/what_is_javascript", // 最初のチャプターへのリンク
  },

  // チャプターの総数 - curriculum の長さと一致させる
  chapterCount: 10,
}

// メタデータをエクスポート
export const metadata = javascriptContent.meta

/**
 * JavaScript カリキュラムのランディングページ
 *
 * Curriculum共通コンポーネントを使用してコンテンツを表示
 */
export default function JavaScriptCurriculumPage() {
  return (
    <Curriculum
      slug={slug}
      courseContent={javascriptContent}
      themeColors={javascriptThemeColors}
    />
  )
}
