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

const COURSE_ID = "6826831"

export const metadata: Metadata = {
  title:
    "CodexでAI駆動開発！Python FastAPI で作る本格的な天気予報 API | バックエンド開発入門 - 特別割引クーポン",
  description:
    "プログラミング未経験でも大丈夫！Codex IDE & CLIでPythonの基礎からFastAPI、MCPツール連携まで完全習得。要件定義→設計→実装の本格的な開発フローで実用的な天気予報APIを完成させよう",
  openGraph: {
    title:
      "CodexでAI駆動開発！Python FastAPI で作る本格的な天気予報 API | バックエンド開発入門",
    description:
      "プログラミング未経験でもCodex IDE & CLIでPythonの基礎からFastAPI開発まで完全習得！",
    type: "website",
    url: "/coupons/codex-python-fast-api",
    images: [
      {
        url: "/images/udemy/codex-python-fast-api.png",
        width: 1280,
        height: 720,
        alt: "CodexでAI駆動開発！Python FastAPI で作る本格的な天気予報 API | バックエンド開発入門",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "CodexでAI駆動開発！Python FastAPI で作る本格的な天気予報 API | バックエンド開発入門",
    description:
      "プログラミング未経験でもCodex IDE & CLIでPythonの基礎からFastAPI開発まで完全習得！",
    images: ["/images/udemy/codex-python-fast-api.png"],
  },
  alternates: {
    canonical: "/coupons/codex-python-fast-api",
  },
}

const courseDetails = {
  title:
    "CodexでAI駆動開発！Python FastAPI で作る本格的な天気予報 API | バックエンド開発入門",
  subtitle:
    "プログラミング未経験でも大丈夫！Codex IDE & CLIでPythonの基礎からFastAPI、MCPツール連携まで完全習得。要件定義→設計→実装の本格的な開発フローで実用的な天気予報APIを完成させよう",
  description: `「プログラミング未経験だけど、バックエンド開発に挑戦してみたい」

「FastAPIって聞いたことあるけど、どう使えばいいか分からない」

「Codexを使って、実務レベルのAPI開発スキルを身につけたい」

そんな悩みを抱えるあなたに、OpenAI Codexで実現する本格的なバックエンド開発をお届けします！

本講座では、OpenAI CodexのIDEとCLI両方を使いこなし、
MCPツール連携やカスタムプロンプトといった高度な機能を活用しながら、
FastAPIで実用的な天気予報APIを開発します。

プログラミング未経験でも大丈夫。
「こんな機能を追加して」とAIに指示するだけで、
プロ級のPythonコードとAPI設計が完成します。`,
  projects: [
    {
      title: "主要5都市の天気取得API",
      tech: "FastAPI + OpenWeatherMap API",
      description: "基本的なAPIエンドポイントの実装と外部API連携",
    },
    {
      title: "任意都市の天気検索機能",
      tech: "FastAPI + パラメータ処理",
      description: "RESTful APIの設計とクエリパラメータ処理",
    },
    {
      title: "5日分の天気予報表示",
      tech: "FastAPI + データ変換",
      description: "複雑なAPIレスポンスの処理とデータ整形",
    },
    {
      title: "複数都市の天気比較機能",
      tech: "FastAPI + 並列処理",
      description: "効率的なAPI設計と非同期処理の実装",
    },
  ],
  features: [
    {
      title: "🎯 プログラミング未経験でも安心",
      description:
        "コマンド・ターミナルの基礎から丁寧に解説。Python環境構築（pip、venv）も完全サポート。VS CodeとCodex IDEの設定まで網羅。",
    },
    {
      title: "💡 Codex IDE & CLI の両方をマスター",
      description:
        "VS Code拡張機能版（IDE）とターミナル版（CLI）の両方を習得。AGENTS.mdによるプロジェクト共通設定で、状況に応じた最適な使い分けが可能に。",
    },
    {
      title: "🚀 MCPツール連携で外部サービスを自在に操る",
      description:
        "Context7 MCPで最新ドキュメントを自動取得。Playwright MCPでブラウザ操作を完全自動化。config.tomlでMCP設定を完全理解。",
    },
    {
      title: "⚡ 実践的なFastAPI開発で即戦力スキル",
      description:
        "OpenWeatherMap APIとの外部連携。要件定義→設計→実装計画の本格的な開発フロー。RESTful APIの設計とエラーハンドリング、セキュリティ対策まで。",
    },
  ],
  targetAudience: [
    {
      title: "プログラミング未経験からバックエンド開発を始めたい方",
      points: [
        "Pythonを基礎から学びたい",
        "FastAPIでAPI開発に挑戦したい",
        "フロントエンド（React/Vue）と分離した開発を体験したい",
        "AIの力を借りて効率的に学習したい",
      ],
    },
    {
      title: "Webアプリの幅を広げたい方",
      points: [
        "フロントエンドは作れるけど、バックエンドは未経験",
        "外部APIとの連携方法を学びたい",
        "サーバーサイドの仕組みを理解したい",
        "モダンなAPI開発手法を習得したい",
      ],
    },
    {
      title: "AI駆動開発を実践したい方",
      points: [
        "OpenAI Codexの使い方を学びたい",
        "バイブコーディングを実践したい",
        "MCPツール連携で開発効率を最大化したい",
        "カスタムプロンプトで作業を自動化したい",
      ],
    },
    {
      title: "ポートフォリオを充実させたい方",
      points: [
        "実用的なAPIを作って実績にしたい",
        "要件定義から実装まで体系的に学びたい",
        "エラーハンドリングやテストも含めた本格開発を経験したい",
      ],
    },
  ],
  whatYouLearn: [
    "OpenAI CodexのIDE版とCLI版の両方を使いこなすスキル",
    "プログラミング未経験から実用的なFastAPI開発までの完全ガイド",
    "カスタムプロンプトとMCP連携による開発効率の最大化",
    "Python環境構築からパッケージ管理（pip、venv）まで",
    "要件定義→設計→実装という本格的な開発フロー",
    "FastAPIによるRESTful API設計と実装",
    "OpenWeatherMap APIとの外部サービス連携",
    "エラーハンドリングとセキュリティ対策の基礎",
  ],
  requirements: [
    "パソコンの基本的な操作ができること（ファイル作成、フォルダ移動など）",
    "インターネット接続環境があること",
    "ChatGPT Plus のサブスクリプション契約（月額$20）",
    "学習意欲と新しいことにチャレンジする好奇心",
    "プログラミング経験は一切不要です！",
    "Pythonの知識も不要です！",
  ],
}

export default function CodexPythonFastApiPage() {
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
      <main
        id="main-content"
        className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/30"
      >
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
