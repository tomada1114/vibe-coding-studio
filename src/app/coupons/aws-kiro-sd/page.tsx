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

// クーポン検索用の courseId（COURSE_INFO のキー）
const COURSE_ID = "6772961"

// udemy-course-info-temp.md に記載の正式タイトル（表示用）
const COURSE_TITLE =
  "【AWS Kiro完全ガイド】仕様駆動開発で学ぶ次世代AI開発 - Next.jsメモアプリ実装からMCP連携まで"

export const metadata: Metadata = {
  title: COURSE_TITLE,
  description:
    "計画を立ててから開発する新スタイル！要件・設計・タスクの3段階ドキュメント生成、エージェントフック、MCP連携まで。品質重視のAI駆動開発を基礎から実践まで徹底解説",
  openGraph: {
    title: COURSE_TITLE,
    description:
      "計画を立ててから開発する新スタイル！要件・設計・タスクの3段階ドキュメント生成、エージェントフック、MCP連携まで。品質重視のAI駆動開発を基礎から実践まで徹底解説",
    type: "website",
    url: "/coupons/aws-kiro-sd",
    images: [
      {
        url: "/images/udemy/aws-kiro-sd.png",
        width: 1280,
        height: 720,
        alt: COURSE_TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: COURSE_TITLE,
    description:
      "計画を立ててから開発する新スタイル！要件・設計・タスクの3段階ドキュメント生成、エージェントフック、MCP連携まで。品質重視のAI駆動開発を基礎から実践まで徹底解説",
    images: ["/images/udemy/aws-kiro-sd.png"],
  },
  alternates: {
    canonical: "/coupons/aws-kiro-sd",
  },
}

// udemy-course-info-temp.md の内容をもとに、ユーザーに見える情報のみを定義
const courseDetails = {
  title: COURSE_TITLE,
  subtitle:
    "計画を立ててから開発する新スタイル！要件・設計・タスクの3段階ドキュメント生成、エージェントフック、MCP連携まで。品質重視のAI駆動開発を基礎から実践まで徹底解説",
  description: `「AIツールでコードは生成できるけど、要件と違う実装になってしまう...」

「チーム開発でAIを使いたいけど、品質管理やドキュメント整備が追いつかない...」

そんな悩みを抱える開発者の皆さんに、AWSが開発した最新エディタ「Kiro」をご紹介します！

Kiroは「仕様駆動開発」という革新的なアプローチで、AI開発の品質と効率を劇的に向上させます。
単にコードを生成するだけでなく、要件定義から設計、実装計画まで段階的に進めることで、
ビジネス要求を確実に満たす高品質なアプリケーションを開発できます。`,
  features: [
    {
      title: "仕様駆動開発の完全理解",
      description:
        "要件・設計・タスクリストの3段階アプローチと承認プロセスで品質を担保。要件と実装を確実に紐付け、ビジネスと開発を橋渡しします。",
    },
    {
      title: "実践的なNext.jsメモアプリ開発",
      description:
        "プロジェクトセットアップから完成までを体験。ローカルストレージによる永続化、レスポンシブとアクセシビリティ対応、TDDまで実践します。",
    },
    {
      title: "Kiroの強力な機能をフル活用",
      description:
        "エージェントフックでドキュメント自動更新や品質分析を自動化。ステアリングで情報を一元管理し、MCP連携でContext 7やPlaywrightと統合します。",
    },
    {
      title: "品質と効率を両立する開発手法",
      description:
        "テストファーストで堅牢な実装を行い、自動テストと手動確認のバランスを最適化。Git連携で変更管理し、チーム開発にも適用できます。",
    },
  ],
  projects: [
    {
      title: "LPページ制作で仕様駆動開発を体験",
      tech: "Kiro",
      description:
        "要件定義 → 設計 → 実装計画（タスクリスト）→ 実装 の基本フローをLP制作で体験します。",
    },
    {
      title: "Next.js メモアプリ開発",
      tech: "Next.js",
      description:
        "プロジェクトセットアップから、ローカルストレージの永続化、アクセシビリティ、テスト駆動開発まで段階的に実装します。",
    },
    {
      title: "MCP連携と自動E2Eテスト",
      tech: "MCP / Context 7 / Playwright",
      description:
        "外部ツール連携による情報取得と、Playwrightでのスクリーンショット・E2E自動テストを実践します。",
    },
  ],
  targetAudience: [
    {
      title: "より計画的なAI開発を目指す方",
      points: [
        "要件定義から実装まで体系的に進めたい",
        "AIの出力を適切にコントロールしたい",
        "品質を犠牲にせず開発効率を上げたい",
        "ドキュメント作成を効率化したい",
      ],
    },
    {
      title: "チーム開発でAIを活用したい方",
      points: [
        "ビジネスサイドとの連携を強化したい",
        "開発プロセスを標準化したい",
        "品質基準を明確にしたい",
        "タスク管理を効率化したい",
      ],
    },
    {
      title: "既存のAIツールに限界を感じている方",
      points: [
        "より高度な自動化を実現したい",
        "外部ツールとの連携を強化したい",
        "テスト自動化を推進したい",
        "開発の再現性を高めたい",
      ],
    },
    {
      title: "VS Codeユーザーの方",
      points: [
        "慣れ親しんだ環境でAI開発を始めたい",
        "既存の設定や拡張機能を活かしたい",
        "スムーズに移行したい",
        "最新のAI開発環境を体験したい",
      ],
    },
  ],
}

export default function AwsKiroCoursePage() {
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
