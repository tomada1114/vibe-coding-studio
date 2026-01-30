import { BookOpen, Code, FileCode, Shield, Target, Zap, CheckCircle } from 'lucide-react'

import { Curriculum, type CourseContent, type ThemeColors } from '@/components/docs/Curriculum'

// コースのスラッグを定義
const slug = 'typescript'

/**
 * TypeScript コース用のテーマカラー
 */
const typescriptThemeColors: ThemeColors = {
  // 基本色（TypeScript公式のブルー）
  primary: 'blue',
  accent: 'blue-500',
  accentDark: 'blue-400',

  // グラデーション用
  gradient: {
    from: 'from-blue-500',
    to: 'to-indigo-600',
    darkFrom: 'dark:from-blue-600',
    darkTo: 'dark:to-indigo-700',
  },

  // 背景用
  bg: {
    light: 'from-blue-50',
    dark: 'dark:from-blue-950/30',
  },

  // ボーダー用
  border: {
    light: 'border-l-blue-500',
    dark: 'dark:border-l-blue-400',
  },

  // テキスト用
  text: {
    accent: 'text-blue-500',
    accentDark: 'dark:text-blue-400',
    hover: 'hover:text-blue-500',
    hoverDark: 'dark:hover:text-blue-400',
  },

  // ボタン用
  button: {
    bg: 'bg-blue-500',
    bgHover: 'hover:bg-blue-600',
    bgDark: 'dark:bg-blue-600',
    bgHoverDark: 'dark:hover:bg-blue-700',
    outline: 'focus-visible:outline-blue-500',
  },
}

/**
 * TypeScript コース用のコンテンツ
 */
const typescriptContent: CourseContent = {
  // コースの基本情報
  title: 'TypeScript 基礎',
  description: 'JavaScriptに型安全性を追加し、大規模開発でも安心してコードを書けるようになる静的型付け言語を基礎から実践まで体系的に学ぶ',
  shortDescription: '型安全性で開発の効率と品質を大幅に向上させる言語',
  tagline: '型安全なコードで、バグを未然に防ぎ、開発効率を大幅に向上させよう',

  // メタ情報（SEO対策）
  meta: {
    title: 'TypeScript 基礎カリキュラム',
    description: 'JavaScriptに型安全性を追加し、大規模開発でも安心してコードを書けるようになる静的型付け言語を基礎から実践まで体系的に学ぶ',
  },

  // 特徴セクション - コンテンツの特徴
  features: [
    {
      icon: Shield,
      title: '型安全性による堅牢なコード',
      description: '静的型チェックにより、コンパイル時にエラーを検出し、実行時エラーを大幅に削減できます',
    },
    {
      icon: Zap,
      title: '開発効率の大幅な向上',
      description: 'エディターでの強力な補完機能やリファクタリング支援により、開発速度が飛躍的に向上します',
    },
    {
      icon: Code,
      title: 'JavaScriptとの完全な互換性',
      description: '既存のJavaScriptコードをそのまま活用でき、段階的にTypeScriptへの移行が可能です',
    },
    {
      icon: Target,
      title: '実践的なAPI通信とエラーハンドリング',
      description: '型安全なAPI通信の実装方法やエラーハンドリングなど、実務で必要なスキルを習得できます',
    },
  ],

  // 対象者セクション - 誰に向けたコンテンツか - Lucideアイコンを使用（変えてはいけない）
  targetAudience: [
    {
      icon: Code,
      title: 'JavaScriptの基礎を理解し、より安全なコードを書きたい方',
      description: 'JavaScriptの知識を活かして、型安全性の恩恵を受けながら品質の高いコードを書けるようになります',
    },
    {
      icon: FileCode,
      title: '大規模なWebアプリケーション開発に挑戦したい方',
      description: 'TypeScriptの型システムにより、チーム開発や長期保守において威力を発揮するスキルを身につけられます',
    },
    {
      icon: CheckCircle,
      title: 'バグを未然に防ぎ、開発効率を向上させたい方',
      description: 'コンパイル時の型チェックにより、実行前にエラーを発見し、デバッグ時間を大幅に短縮できます',
    },
    {
      icon: BookOpen,
      title: 'React、Vue、Node.jsなどの型安全な開発を学びたい方',
      description: 'TypeScriptの基礎を固めることで、モダンフレームワークでの型安全な開発手法をマスターできます',
    },
  ],

  // カリキュラム内容 - 各章のタイトルと説明
  curriculum: [
    {
      title: '【Chapter 1】はじめに',
      description: '<strong>TypeScriptとは何か</strong>を理解し、JavaScriptとの違いや型安全性のメリットを学びます。なぜTypeScriptが現代のWeb開発で重要視されているのか、その背景と利点を把握していきます。',
    },
    {
      title: '【Chapter 2】TypeScript開発環境の構築',
      description: '<strong>Node.js</strong>のインストールから<strong>TypeScript</strong>のセットアップまで、開発に必要な環境構築を学習します。<strong>VS Code</strong>での効率的なTypeScript開発環境の整備方法も習得します。',
    },
    {
      title: '【Chapter 3】型注釈と基本的な型',
      description: '変数への型付けから始まり、<strong>プリミティブ型</strong>、<strong>配列・タプル型</strong>、<strong>オブジェクト型</strong>まで、TypeScriptの基本的な型システムを段階的に学習していきます。',
    },
    {
      title: '【Chapter 4】関数の型定義',
      description: '関数の引数と戻り値への型指定、<strong>関数型とコールバック関数</strong>、<strong>async/awaitとエラーハンドリング</strong>まで、関数を安全に扱うための型定義を習得します。',
    },
    {
      title: '【Chapter 5】インターフェースと型エイリアス',
      description: '<strong>インターフェース</strong>によるオブジェクトの形の定義から、<strong>型エイリアスとUnion型</strong>による柔軟な型定義まで、複雑なデータ構造を安全に扱う方法を学びます。',
    },
    {
      title: '【Chapter 6】ジェネリクスの基礎',
      description: '<strong>ジェネリクス</strong>による再利用可能な型の作成方法を学習します。型パラメータを活用して、汎用性の高い関数やクラスを型安全に実装する技術を習得します。',
    },
    {
      title: '【Chapter 7】実践的なTypeScript開発',
      description: '<strong>型安全なAPI通信</strong>の実装から<strong>モジュールの型定義</strong>まで、実際の開発現場で活用できる実践的なTypeScriptのスキルを総合的に身につけます。',
    },
  ],

  // CTAセクション
  cta: {
    title: '型安全な開発で、コードの品質を次のレベルへ',
    description: '<strong>月額サブスクリプション</strong>にご登録いただくと、このカリキュラムの全コンテンツにアクセスできます。TypeScriptをマスターすることで、React、Vue、Node.jsなどの人気フレームワークでも型安全な開発が可能になります。バグを未然に防ぎ、開発効率を大幅に向上させる現代必須のスキルを身につけましょう！',
    primaryButtonText: 'サブスクリプションを見る', // 不変
    primaryButtonLink: '/docs', // 料金ページへのリンク（全カリキュラムで共通）
    secondaryButtonText: '学習をスタート', // 不変
    secondaryButtonLink: '/docs/typescript/introduction/what_is_typescript', // 最初のチャプターへのリンク
  },

  // チャプターの総数 - curriculum の長さと一致させる
  chapterCount: 7,
}

// メタデータをエクスポート
export const metadata = typescriptContent.meta

/**
 * TypeScript カリキュラムのランディングページ
 *
 * Curriculum共通コンポーネントを使用してコンテンツを表示
 */
export default function TypeScriptCurriculumPage() {
  return <Curriculum slug={slug} courseContent={typescriptContent} themeColors={typescriptThemeColors} />
}