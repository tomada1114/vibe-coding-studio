import { Container } from "@/components/container"
import { CouponExpiredFallback } from "@/components/coupons/CouponExpiredFallback"
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

const COURSE_ID = "6851913"

export const metadata: Metadata = {
  title:
    "【Codex × スマホアプリ開発】AI駆動開発で作る！React Native ではじめるモバイルアプリ開発実践 - 特別割引クーポン",
  description:
    "OpenAI CodexとReact Native(Expo)でプログラミング初心者でもゼロからスマホアプリを開発！TypeScript・テスト・SQLite・AsyncStorageに通知機能まで学べる実践講座",
  openGraph: {
    title:
      "【Codex × スマホアプリ開発】AI駆動開発で作る！React Native ではじめるモバイルアプリ開発実践",
    description:
      "OpenAI CodexとReact Native(Expo)でプログラミング初心者でもゼロからスマホアプリを開発！",
    type: "website",
    url: "/coupons/codex-react-native",
    images: [
      {
        url: "/images/udemy/codex-react-native.png",
        width: 1280,
        height: 720,
        alt: "【Codex × スマホアプリ開発】AI駆動開発で作る！React Native ではじめるモバイルアプリ開発実践",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "【Codex × スマホアプリ開発】AI駆動開発で作る！React Native ではじめるモバイルアプリ開発実践",
    description:
      "OpenAI CodexとReact Native(Expo)でプログラミング初心者でもゼロからスマホアプリを開発！",
    images: ["/images/udemy/codex-react-native.png"],
  },
  alternates: {
    canonical: "/coupons/codex-react-native",
  },
}

const courseDetails = {
  title:
    "【Codex × スマホアプリ開発】AI駆動開発で作る！React Native ではじめるモバイルアプリ開発実践",
  subtitle:
    "OpenAI CodexとReact Native(Expo)で、プログラミング初心者でもゼロからスマホアプリを開発！TypeScript・テスト・SQLite・AsyncStorageに通知機能まで学べる実践講座",
  description: `「スマホアプリを作ってみたいけど、SwiftやKotlinは難しそう...」
「React Nativeって聞いたことあるけど、環境構築で挫折しそう...」
「AIツールは使えるけど、モバイル開発は別次元の難しさがありそう...」

そんな悩みを抱えるあなたに、OpenAI Codexで実現する革新的なスマホアプリ開発をお届けします！

本講座では、OpenAI CodexのIDE版とCLI版を使いこなし、プログラミング未経験でもReact Native/Expoで本格的なスマホアプリが作れるようになります。

読書記録アプリを実際に作りながら、通知機能、データ保存、SQLiteデータベースまで、実用的な機能を段階的に実装していきます。`,
  projects: [
    {
      title: "ローカル通知機能",
      tech: "expo-notifications",
      description: "ユーザーに読書リマインダーを通知",
    },
    {
      title: "AsyncStorageでの設定保存",
      tech: "AsyncStorage",
      description: "アプリの設定データを永続化",
    },
    {
      title: "SQLiteデータベース",
      tech: "expo-sqlite",
      description: "本格的なデータ管理と検索機能",
    },
    {
      title: "TypeScript開発",
      tech: "TypeScript",
      description: "型安全な開発で品質向上",
    },
    {
      title: "Jest自動テスト",
      tech: "Jest",
      description: "テスト駆動開発でコード品質を担保",
    },
  ],
  features: [
    {
      title: "プログラミング未経験でも安心",
      description:
        "ターミナル操作から丁寧に解説。VS CodeとNode.jsの環境構築を完全ガイド。つまずきポイントは全て動画でカバー。",
    },
    {
      title: "IDE版とCLI版の両方をマスター",
      description:
        "VS Code拡張機能版とターミナルから使うCLI版の両方を習得。それぞれの得意分野と使い分けのコツを理解します。",
    },
    {
      title: "React Native/Expoの基礎から実践",
      description:
        "FlutterやSwift/Kotlinとの違いを理解。Expo Goで実機確認しながら開発。クロスプラットフォーム開発の真髄を習得。",
    },
    {
      title: "バイブコーディングで開発効率10倍",
      description:
        "コードを書かずにAIとの対話だけで開発。エラーが出てもAIが即座に修正。プロ級のReact Nativeコードを自動生成。",
    },
  ],
  targetAudience: [
    {
      title: "スマホアプリ開発に挑戦したい初心者",
      points: [
        "iOSもAndroidも作ってみたい",
        "ネイティブ開発は難しそうで踏み出せない",
        "React Nativeを基礎から学びたい",
        "AIの力を借りて効率的に習得したい",
      ],
    },
    {
      title: "Codexの可能性を最大限活用したい方",
      points: [
        "IDE版とCLI版を使いこなしたい",
        "Web開発だけでなくモバイルも作りたい",
        "最新のAI開発手法を習得したい",
        "バイブコーディングを極めたい",
      ],
    },
    {
      title: "実践的なスキルを身につけたい方",
      points: [
        "ポートフォリオ用のアプリを作りたい",
        "データベース連携まで学びたい",
        "TypeScriptとテストも習得したい",
        "現場で使える技術を身につけたい",
      ],
    },
    {
      title: "効率的にアプリ開発したいエンジニア",
      points: [
        "開発時間を大幅に短縮したい",
        "複数プラットフォーム対応を効率化したい",
        "AIツールを実践で活用したい",
        "最新の開発トレンドをキャッチアップしたい",
      ],
    },
  ],
  whatYouLearn: [
    "OpenAI Codex（IDE版・CLI版）を使ったバイブコーディングによるスマホアプリ開発手法",
    "プログラミング未経験でもReact Native/Expoで実用的なアプリを完成させる実践スキル",
    "iOSシミュレータ・Androidエミュレータの設定と効率的な動作確認方法",
    "expo-notificationsによる通知機能、AsyncStorage、SQLiteを使った段階的なデータ管理手法",
    "TypeScriptによる型安全な開発とJestを使った自動テストの実装方法",
    "AIとの対話だけでコードを生成・修正・改善するバイブコーディング技術",
    "要件定義から実装まで、実践的な読書記録アプリの開発プロセス",
    "クロスプラットフォーム開発の基礎とReact Nativeの実践的な活用法",
  ],
  requirements: [
    "パソコンの基本的な操作ができること（ファイル作成、フォルダ移動など）",
    "インターネット接続環境があること",
    "ChatGPT Plusのサブスクリプション（月額$20）の契約",
    "学習意欲と新しいことにチャレンジする好奇心",
    "プログラミング経験は一切不要です！",
    "React NativeやExpoの知識も不要です！",
  ],
}

export default function CodexReactNativePage() {
  const coupons = getLatestCoupons()
  const coupon = coupons.find(c => c.courseId === COURSE_ID)

  if (!coupon) {
    return <CouponExpiredFallback />
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
