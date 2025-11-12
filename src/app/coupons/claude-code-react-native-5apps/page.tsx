import { Container } from "@/components/container"
import { CourseContent } from "@/components/coupons/course-detail/CourseContent"
import { CourseDetailHero } from "@/components/coupons/course-detail/CourseDetailHero"
import { CourseFeatures } from "@/components/coupons/course-detail/CourseFeatures"
import { CourseProjects } from "@/components/coupons/course-detail/CourseProjects"
import { FloatingCTA } from "@/components/coupons/course-detail/FloatingCTA"
import { PriceSection } from "@/components/coupons/course-detail/PriceSection"
import { TargetAudience } from "@/components/coupons/course-detail/TargetAudience"
import { RelatedCoupons } from "@/components/coupons/RelatedCoupons"
import { AsyncErrorBoundary } from "@/components/error-boundary"
import { Footer } from "@/components/footer"
import { Gradient } from "@/components/gradient"
import { Navbar } from "@/components/navbar"
import { getLatestCoupons, getRelatedCoupons } from "@/lib/coupons/coupon-data"
import type { Metadata } from "next"

// 静的生成を明示的に設定
export const dynamic = "force-static"
export const revalidate = 3600 // 1時間ごとに再生成

const COURSE_ID = "6783611"

export const metadata: Metadata = {
  title:
    "【未経験OK】Claude CodeとReact Nativeでスマホアプリ開発！5つのアプリでバイブコーディング実践 - 特別割引クーポン",
  description:
    "プログラミング未経験でもClaude CodeとReact Nativeでスマホアプリ開発！カウンター、計算機、単位変換、Todo、読書記録の5つのアプリを作りながら、バイブコーディングを実践的に学べます。",
  openGraph: {
    title:
      "【未経験OK】Claude CodeとReact Nativeでスマホアプリ開発！5つのアプリでバイブコーディング実践",
    description:
      "プログラミング未経験でもClaude CodeとReact Nativeでスマホアプリ開発！5つのアプリを作りながら実践的に学習。",
    type: "website",
    url: "https://school.learning-next.app/coupons/claude-code-react-native-5apps",
    images: [
      {
        url: "/images/udemy/claude-code-react-native-5apps.png",
        width: 1280,
        height: 720,
        alt: "【未経験OK】Claude CodeとReact Nativeでスマホアプリ開発！5つのアプリでバイブコーディング実践",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "【未経験OK】Claude CodeとReact Nativeでスマホアプリ開発！5つのアプリでバイブコーディング実践",
    description:
      "プログラミング未経験でもClaude CodeとReact Nativeでスマホアプリ開発！5つのアプリを作りながら実践的に学習。",
    images: ["/images/udemy/claude-code-react-native-5apps.png"],
  },
}

const courseDetails = {
  title:
    "【未経験OK】Claude CodeとReact Nativeでスマホアプリ開発！5つのアプリでバイブコーディング実践",
  subtitle:
    "プログラミング知識ゼロでもOK！AIと対話するだけでiOSアプリが作れる。カウンター、計算機、単位変換、Todo、読書記録の5つのアプリを作りながら、スマホアプリ開発の基礎から実践まで完全マスター",
  description: `「スマホアプリを作ってみたいけど、プログラミングは難しそう...」
「React Nativeって聞いたことあるけど、環境構築で挫折しそう...」
「AIを使えばコードが書けなくてもアプリが作れるって本当？」

そんな不安を抱えるあなたに、Claude Codeで実現する新しいアプリ開発の世界をお届けします！

本講座では、プログラミング経験ゼロでも、AIとの対話（バイブコーディング）だけで5つの実用的なスマホアプリを次々と完成させていきます。難しいコードは一切書かずに、「○○な機能を追加して」とClaude Codeに指示するだけ。まるで優秀なプログラマーとペアプログラミングしているような体験が得られます。`,
  projects: [
    {
      title: "カウンターアプリ",
      tech: "React Native + Expo",
      description: "基本的な動作確認とバイブコーディング入門",
    },
    {
      title: "計算機アプリ",
      tech: "React Native + Expo",
      description: "実用的な機能をAIと対話で実装",
    },
    {
      title: "単位変換アプリ",
      tech: "React Native + Expo",
      description: "複数画面とリファクタリング技術",
    },
    {
      title: "Todoアプリ",
      tech: "React Native + AsyncStorage",
      description: "データ保存と永続化の実装",
    },
    {
      title: "読書記録アプリ",
      tech: "React Native + SQLite",
      description: "SQLiteデータベースを使った本格開発",
    },
  ],
  features: [
    {
      title: "完全初心者でも安心のステップバイステップ構成",
      description:
        "環境構築からClaude Codeの使い方まで丁寧に解説。ターミナルって何？という方でも大丈夫。Mac向けに最適化された解説でスムーズに学習。",
    },
    {
      title: "5つのアプリで段階的にスキルアップ",
      description:
        "カウンターから始まり、計算機、単位変換、Todo、読書記録と徐々に複雑なアプリへ。段階的な難易度設定で無理なく成長。",
    },
    {
      title: "バイブコーディングで開発効率10倍",
      description:
        "コードを書かずにAIとの対話だけで開発。エラーが出てもAIが即座に修正。「こんな機能追加して」の一言で実装完了。",
    },
    {
      title: "実機で動くアプリが確実に完成",
      description:
        "iOSシミュレータで動作確認しながら開発。ホットリロードで変更を即座に確認。実際にスマホで使えるクオリティ。",
    },
  ],
  targetAudience: [
    {
      title: "プログラミング未経験だけどアプリを作りたい方",
      points: [
        "コードが書けなくても大丈夫",
        "環境構築で挫折した経験がある",
        "とにかくアプリを完成させたい",
        "AIの力を借りて効率的に学びたい",
      ],
    },
    {
      title: "スマホアプリ開発に興味がある方",
      points: [
        "React Nativeを始めてみたい",
        "iOSアプリを作ってみたい",
        "実機で動くアプリを開発したい",
        "副業でアプリ開発を始めたい",
      ],
    },
    {
      title: "AI駆動開発を体験したい方",
      points: [
        "Claude Codeの使い方を学びたい",
        "バイブコーディングを実践したい",
        "最新の開発手法を身につけたい",
        "開発効率を劇的に向上させたい",
      ],
    },
    {
      title: "実践的なスキルを身につけたい方",
      points: [
        "段階的にレベルアップしたい",
        "データベース連携まで学びたい",
        "リファクタリング技術を習得したい",
        "ポートフォリオを充実させたい",
      ],
    },
  ],
  whatYouLearn: [
    "Claude Codeを使ったバイブコーディングによるスマホアプリ開発手法",
    "プログラミング未経験でも5つの実用的なReact Nativeアプリを完成させる実践スキル",
    "Expoを使った効率的なスマホアプリ開発環境の構築方法",
    "AIとの対話だけでコードを生成・修正・改善する技術",
    "AsyncStorageとSQLiteを使ったデータ永続化の実装方法",
    "複数画面アプリの設計とリファクタリング手法",
    "iOSシミュレータでの動作確認とデバッグ方法",
    "エラーが出た時のAIへの適切な修正依頼テクニック",
  ],
  requirements: [
    "Mac環境を推奨（iOSシミュレータ使用のため）",
    "インターネット接続環境があること",
    "Claude サブスクリプション（Pro または Max）の契約",
    "学習意欲と新しいことにチャレンジする好奇心",
    "プログラミング経験は一切不要です！",
    "React NativeやExpoの知識も不要です！",
  ],
}

export default function ClaudeCodeReactNative5AppsPage() {
  const coupons = getLatestCoupons()
  const coupon = coupons.find(c => c.courseId === COURSE_ID)

  if (!coupon) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-zinc-600">
          クーポン情報が見つかりませんでした
        </p>
      </div>
    )
  }

  // 関連クーポンを取得（最大4件）
  const relatedCoupons = getRelatedCoupons(coupon, coupons, 4)

  return (
    <div className="overflow-hidden">
      {/* ヘッダーセクション */}
      <AsyncErrorBoundary>
        <div className="relative">
          <Gradient className="absolute inset-2 bottom-0 rounded-4xl ring-1 ring-black/5 ring-inset" />
          <Container className="relative">
            <Navbar />
          </Container>
        </div>
      </AsyncErrorBoundary>

      {/* メインコンテンツ */}
      <main className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/30">
        <CourseDetailHero
          title={courseDetails.title}
          subtitle={courseDetails.subtitle}
          topics={coupon.courseInfo.topics}
          slug={coupon.courseInfo.slug}
        />

        <div className="mx-auto max-w-7xl py-8 sm:px-4 sm:py-12 lg:px-8">
          <div className="grid gap-6 sm:gap-8 lg:grid-cols-3">
            <div className="space-y-6 sm:space-y-8 lg:col-span-2">
              <CourseContent description={courseDetails.description} />
              <CourseFeatures features={courseDetails.features} />
              <CourseProjects projects={courseDetails.projects} />
              <TargetAudience audiences={courseDetails.targetAudience} />
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <PriceSection coupon={coupon} />
              </div>
            </div>
          </div>
        </div>

        {/* 関連クーポンセクション */}
        <RelatedCoupons coupons={relatedCoupons} />

        <FloatingCTA coupon={coupon} />
      </main>

      {/* フッターセクション */}
      <AsyncErrorBoundary>
        <Footer />
      </AsyncErrorBoundary>
    </div>
  )
}
