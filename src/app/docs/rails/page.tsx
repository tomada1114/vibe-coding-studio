import {
  Briefcase,
  Code,
  GitBranch,
  Layout,
  Paintbrush,
  Rocket,
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
const slug = "rails"

/**
 * Rails コース用のテーマカラー
 */
const railsThemeColors: ThemeColors = {
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
 * Rails コース用のコンテンツ
 */
const railsContent: CourseContent = {
  // コースの基本情報
  title: "Ruby on Rails 実践",
  description:
    "現場で使えるWebアプリケーション開発スキルを基礎から実践まで体系的に学ぶ",
  shortDescription: "実践的なWebアプリケーション開発スキルを学ぶ",
  tagline: "基礎から実践まで、ポートフォリオの完成まで一気通貫",

  // メタ情報（SEO対策）
  meta: {
    title: "Ruby on Rails 実践カリキュラム",
    description:
      "現場で使えるWebアプリケーション開発スキルを基礎から実践まで体系的に学ぶ",
  },

  // 特徴セクション - コンテンツの特徴
  features: [
    {
      icon: Layout,
      title: "Webアプリケーション開発の全工程",
      description: "企画からデプロイまで、一気通貫で開発プロセスを体験できます",
    },
    {
      icon: GitBranch,
      title: "現場で必須のGit/GitHub操作",
      description: "チーム開発で欠かせないバージョン管理の基本を実践的に習得",
    },
    {
      icon: ShieldCheck,
      title: "自動テストの導入と活用",
      description:
        "プロフェッショナルな開発現場で重視されるテスト駆動開発の基礎",
    },
    {
      icon: Paintbrush,
      title: "モダンなフロントエンド技術",
      description: "Tailwind CSSを使った効率的なUI実装方法を学べます",
    },
  ],

  // 対象者セクション - 誰に向けたコンテンツか - Lucideアイコンを使用（変えてはいけない）
  targetAudience: [
    {
      icon: Code,
      title: "Rubyの基礎を学んだ後、次のステップに進みたい方",
      description:
        "Rubyの知識を活かして、実際のWebアプリケーション開発にチャレンジできます",
    },
    {
      icon: Briefcase,
      title: "ポートフォリオ作品を作りたいエンジニア志望の方",
      description:
        "就職・転職活動で差がつく、本格的なWebアプリケーションを作れます",
    },
    {
      icon: Rocket,
      title: "プログラミングの知識を実践に活かしたい方",
      description:
        "学んだことを実際のプロダクト開発に応用するプロセスを体験できます",
    },
    {
      icon: Users,
      title: "現場レベルの開発フローを学びたい方",
      description:
        "GitHubやテスト駆動開発など、実務で重視されるスキルを習得できます",
    },
  ],

  // カリキュラム内容 - 各章のタイトルと説明
  curriculum: [
    {
      title: "【Chapter 1】Ruby on Railsの世界への第一歩",
      description:
        "Railsの基本概念と優位性を理解し、現代のWeb開発における位置づけを学びます。なぜ多くの企業がRailsを採用し続けているのか、その魅力と可能性を知りましょう。",
    },
    {
      title: "【Chapter 2】Railsの基礎を体系的にマスター",
      description:
        "<strong>MVCアーキテクチャ</strong>からデータ操作の基本まで、Railsの核となる概念を実際にコードを書きながら学びます。<strong>scaffold</strong>で全体の流れを掴み、各アクションの役割と実装方法を着実に理解していきます。データベースの関連付けなど、実践的なアプリに必須の知識も身につけられます。",
    },
    {
      title: "【Chapter 3】現場レベルの開発環境と開発フロー",
      description:
        "実際の開発現場で使用される便利な<strong>Gem</strong>やツールを活用し、効率的な開発環境を構築します。<strong>Git/GitHub</strong>でのバージョン管理、コード品質を保つ<strong>Rubocop</strong>、自動テストの<strong>RSpec</strong>など、プロフェッショナルな開発フローを体験しながら学習記録アプリを作り始めます。",
    },
    {
      title: "【Chapter 4】ユーザー認証システムの実装",
      description:
        "多くのWebサービスに必須のログイン機能を<strong>Devise</strong>を使って実装します。単なる機能追加にとどまらず、UIのカスタマイズや多言語対応など、ユーザー体験を高めるための実践的なテクニックを習得します。",
    },
    {
      title: "【Chapter 5】投稿・コメント機能の実装",
      description:
        "Webアプリケーションの基本となる<strong>CRUD操作</strong>を応用し、投稿機能とコメント機能を実装します。モデル間の関連付けやバリデーションなど、実践的なデータ設計のノウハウを学びながら、アプリケーションの核となる機能を段階的に追加していきます。",
    },
    {
      title: "【Chapter 6】ポートフォリオとしてWebに公開",
      description:
        "完成したアプリケーションを<strong>RenderとNeon</strong>を使って無料でインターネット上に公開します。ローカル環境と本番環境の違いや、デプロイ時の注意点なども学べます。自分の作品としてアピールできるポートフォリオの完成です。",
    },
  ],

  // CTAセクション
  cta: {
    title: "アイデアを形にして、自分だけのWebアプリケーションを実現しよう",
    description:
      "このカリキュラムはすべて無料で学べます。Ruby の基礎を学んだ後、このRails カリキュラムに進むことで、本格的なWebアプリケーション開発スキルを自分のペースで着実に身につけていくことができます！",
    primaryButtonText: "学習をスタート",
    primaryButtonLink: "/docs/rails/introduction/rails-overview", // 最初のレッスンへのリンク
  },

  // チャプターの総数 - curriculum の長さと一致させる
  chapterCount: 6,
}

// メタデータをエクスポート
export const metadata: Metadata = {
  ...railsContent.meta,
  openGraph: {
    title: `${railsContent.meta.title} - Vibe Coding Studio`,
    description: railsContent.meta.description,
    type: "website",
    url: "/docs/rails",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${railsContent.meta.title} - Vibe Coding Studio`,
      },
    ],
  },
  alternates: {
    canonical: "/docs/rails",
  },
}

/**
 * Ruby on Rails カリキュラムのランディングページ
 *
 * Curriculum共通コンポーネントを使用してコンテンツを表示
 */
export default function RubyCurriculumPage() {
  return (
    <Curriculum
      slug={slug}
      courseContent={railsContent}
      themeColors={railsThemeColors}
    />
  )
}
