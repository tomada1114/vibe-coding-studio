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
import { Navbar } from "@/components/navbar"
import { getLatestCoupons, getRelatedCoupons } from "@/lib/coupons/coupon-data"
import type { Metadata } from "next"

// 静的生成を明示的に設定
export const dynamic = "force-static"
export const revalidate = 21600 // 6時間ごとに再生成

const COURSE_ID = "6827941"

export const metadata: Metadata = {
  title:
    "【Claude Code】FlaskとGeminiで作る Python AI アプリ！実践レベルのAI駆動開発を学ぼう - 特別割引クーポン",
  description:
    "Claude CodeとFlaskでPython AIアプリを開発！要件定義から設計・実装まで、プロの開発フローで作る自動レビュー＆バグ診断ツール。初心者も安心のPython Web開発完全ガイド。",
  openGraph: {
    title:
      "【Claude Code】FlaskとGeminiで作る Python AI アプリ！実践レベルのAI駆動開発を学ぼう",
    description:
      "FlaskとGemini AIでプロの開発フローを体験！要件定義から実装まで学べる実践講座",
    type: "website",
    url: "/coupons/claude-code-flask",
    images: [
      {
        url: "/images/udemy/claude-code-flask.png",
        width: 1280,
        height: 720,
        alt: "【Claude Code】FlaskとGeminiで作る Python AI アプリ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "【Claude Code】FlaskとGeminiで作る Python AI アプリ！実践レベルのAI駆動開発を学ぼう",
    description:
      "FlaskとGemini AIでプロの開発フローを体験！要件定義から実装まで学べる実践講座",
    images: ["/images/udemy/claude-code-flask.png"],
  },
  alternates: {
    canonical: "/coupons/claude-code-flask",
  },
}

const courseDetails = {
  title:
    "【Claude Code】FlaskとGeminiで作る Python AI アプリ！実践レベルのAI駆動開発を学ぼう",
  subtitle:
    "Flask×Gemini AI×TDD実践！要件定義から設計・実装まで、プロの開発フローで作る自動レビュー＆バグ診断ツール。初心者も安心のPython Web開発完全ガイド",
  description: `自分のコードが正しいのか不安...誰かにレビューしてもらいたい...
エラーが解決できない...原因が分からずに時間だけが過ぎていく...
AIツールは使えるけど、本格的なWebアプリ開発は難しそう...

そんな悩みを解決する、画期的なアプリを一緒に作ってみませんか？

本講座では、Claude Codeという最新AIエージェントを使った「バイブコーディング」で、Gemini AIと連携する本格的なコードレビュー自動化アプリを開発します。

あなたが作るアプリは、コードを貼り付けるだけでセキュリティ、パフォーマンス、可読性など様々な観点から自動でレビューしてくれる優れもの。さらに、エラーメッセージから原因を特定し、修正方法まで提案してくれる機能も実装します！`,
  projects: [
    {
      title: "FizzBuzzプログラム",
      tech: "Python基礎",
      description: "Claude Codeの基本操作とPythonプログラミングの基礎を学ぶ",
    },
    {
      title: "コードレビュー自動化ツール",
      tech: "Flask + Gemini AI",
      description: "セキュリティ・パフォーマンス・可読性を自動評価するAIツール",
    },
    {
      title: "バグ診断システム",
      tech: "Flask + エラー解析",
      description: "エラーメッセージから原因を特定し修正方法を提案",
    },
    {
      title: "RESTful API実装",
      tech: "Flask REST API",
      description: "プロダクションレベルのAPI設計と実装",
    },
    {
      title: "TDD実践プロジェクト",
      tech: "pytest + Flask",
      description: "テスト駆動開発で品質の高いコードを実装",
    },
  ],
  features: [
    {
      title: "プログラミング未経験でも安心",
      description:
        "ターミナル操作から環境構築まで丁寧に解説。Python初心者向けの完全サポート付き。つまずきポイントは全て動画でカバー。",
    },
    {
      title: "実践的な開発手法を体系的に習得",
      description:
        "TDD（テスト駆動開発）とDDD（ドメイン駆動設計）を実践。要件定義→設計→実装の本格的な開発フローを体験できます。",
    },
    {
      title: "FlaskでPython Web開発をマスター",
      description:
        "軽量で学習しやすいFlaskフレームワークを使用。RESTful API設計、テンプレートエンジン、セキュリティ対策まで網羅。",
    },
    {
      title: "AI連携アプリの実装ノウハウ",
      description:
        "Gemini AIとの効果的な連携方法、プロンプトエンジニアリング、APIキーの安全な管理、レート制限とエラー処理を実践的に学びます。",
    },
  ],
  targetAudience: [
    {
      title: "プログラミング完全未経験の方",
      points: [
        "コードを書いたことがないけどWebアプリを作ってみたい",
        "Pythonで本格的な開発を始めたい",
        "AIツールを使った効率的な開発方法を学びたい",
        "プログラミングスクールは高額で手を出せない",
      ],
    },
    {
      title: "Python学習中の方",
      points: [
        "基礎は学んだけど実践的なアプリが作れない",
        "Flaskで本格的なWeb開発を学びたい",
        "AIとの連携方法を知りたい",
        "コードレビューを受ける機会がない",
      ],
    },
    {
      title: "AI開発に興味がある方",
      points: [
        "Gemini AIを使った実装方法を学びたい",
        "プロンプトエンジニアリングを実践したい",
        "Claude Codeの活用方法を知りたい",
        "バイブコーディングで開発効率を上げたい",
      ],
    },
    {
      title: "実務レベルのスキルを身につけたい方",
      points: [
        "TDDやDDDなどプロの開発手法を学びたい",
        "要件定義から実装まで一通り経験したい",
        "ポートフォリオに載せる実践的なアプリが欲しい",
        "現場で使える開発フローを身につけたい",
      ],
    },
  ],
  whatYouLearn: [
    "Claude Codeを使ったバイブコーディングでPython Web開発を効率化",
    "プログラミング未経験でも本格的なコードレビュー自動化アプリを完成",
    "FlaskフレームワークによるWebアプリケーション開発の基礎から実践まで",
    "Gemini AIとの連携によるAI機能の実装方法とプロンプトエンジニアリング",
    "TDD（テスト駆動開発）とDDD（ドメイン駆動設計）の実践的な活用法",
    "要件定義→設計→実装という実際の開発フローの完全理解",
    "RESTful APIの設計と実装、セキュリティ対策の基礎",
    "Gitによるバージョン管理とSuperClaudeによる開発効率化",
  ],
  requirements: [
    "パソコンの基本的な操作ができること（ファイル作成、フォルダ移動など）",
    "インターネット接続環境があること",
    "Claude サブスクリプション（Pro または Max）の契約",
    "学習意欲と新しいことにチャレンジする好奇心",
    "プログラミング経験・Python知識は一切不要！",
  ],
}

export default function ClaudeCodeFlaskPage() {
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
