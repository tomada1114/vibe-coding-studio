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

const COURSE_ID = "6536597"

// udemy-course-info-temp.md に記載の正式タイトル・サブタイトルのみを使用
const COURSE_TITLE =
  "Next.js（React）で作る AI アプリのポートフォリオ実践！モダンフロントエンド開発を初心者でも学べるコース"
const COURSE_SUBTITLE =
  "フロントエンドで人気な Next.js、React Hooks、TypeScript、TailwindCSS の実践的な使い方を学びます。アニメーション機能やGemini APIとの連携など、実用的なスキルが身に付く完全ガイドです！"

export const metadata: Metadata = {
  title: COURSE_TITLE,
  description: COURSE_SUBTITLE,
  openGraph: {
    title: COURSE_TITLE,
    description: COURSE_SUBTITLE,
    type: "website",
    url: "/coupons/nextjs-ai-pomodoro-timer",
    images: [
      {
        url: "/images/udemy/nextjs-ai-pomodoro-timer.png",
        width: 1280,
        height: 720,
        alt: COURSE_TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: COURSE_TITLE,
    description: COURSE_SUBTITLE,
    images: ["/images/udemy/nextjs-ai-pomodoro-timer.png"],
  },
  alternates: {
    canonical: "/coupons/nextjs-ai-pomodoro-timer",
  },
}

// udemy-course-info-temp.md の内容をもとに、ユーザーに見える情報のみを定義（新規情報の創作は禁止）
const courseDetails = {
  title: COURSE_TITLE,
  subtitle: COURSE_SUBTITLE,
  // コース説明（mdのコードブロックから、そのまま抜粋・改行維持）
  description: `「React や Next.js を勉強したけど、実際にどうやってアプリを作ればいいの？」

「フロントエンドエンジニアとして中級者になりたい」 

「AI 機能を自分のWebアプリに組み込んでみたい！」

そんな方にこそ受講していただきたいのが、本講座です！

セクション1～2でプロジェクトの基本設定から始め、

セクション3～5でポモドーロタイマーの基本機能を段階的に実装していきます。

そしてセクション6ではGoogle Gemini APIを活用したAI機能の組み込み方法を学び、

最後にセクション7でVercelを使ったデプロイ（公開）まで行います。

TypeScript、React、Next.js に少し触れたことがある方が最も効果的に学習できるように設計しています。

全く触れたことが無いと難しく感じるかもしれませんが、それでも AI アプリを作り上げる経験を積むことはできます！

また、初心者の方でも理解しやすいよう、コード解説は丁寧に行っていますので、ご安心ください。

■ まとめ

このコース一本で、以下の流れをすべて学ぶことができます。

Next.jsプロジェクトのセットアップ

TypeScriptを使ったコンポーネント開発

TailwindCSSとshadcnによるUI実装

Framer Motionでのアニメーション処理

Gemini APIとの連携によるAI機能実装

Vercelを使ったデプロイ（公開）

初心者にもわかりやすい解説を心がけながら、モダンなフロントエンド開発の流れを体験できる内容となっています。

 「チュートリアルを終えたけど、実際のアプリ開発の流れがわからない...」

 「AI機能を取り入れた独自性のあるアプリを作ってみたい！」

 「フロントエンドエンジニアとしてのスキルを磨きたい！」

そう思っているあなたに、ぜひ挑戦してほしい講座です。`,
  // features は「■ 得られるスキル・メリット」からそのまま構成
  features: [
    {
      title: "実践的なNext.js/React開発",
      description:
        "コンポーネント分割や状態管理、型安全な実装まで現場で使える基礎を習得。",
    },
    {
      title: "モダンUIとアニメーション",
      description:
        "TailwindCSS/shadcnで効率的なUI、Framer Motionで滑らかなアニメーションを実装。",
    },
    {
      title: "AI連携の実装フロー",
      description: "Gemini APIを用いたAI機能の組み込みとレスポンス処理の実践。",
    },
    {
      title: "デプロイまで到達",
      description: "Vercel でアプリを公開し、ポートフォリオとして活用可能に。",
    },
  ],
  projects: [
    {
      title: "ポモドーロタイマーの基本機能",
      tech: "React / Next.js",
      description:
        "タイマーの開始・一時停止・リセットなどの基本機能を段階的に実装。",
    },
    {
      title: "Gemini API の統合",
      tech: "Google Gemini API",
      description: "AI を活用した支援機能（提案/生成）の組み込み方法を学習。",
    },
    {
      title: "公開（デプロイ）",
      tech: "Vercel",
      description: "Next.js アプリをVercelへデプロイし、URL共有可能な状態に。",
    },
  ],
  // audiences は コース説明内の「■ こんな方におすすめ！」の「〜方 → 〜できます」の対を使用
  targetAudience: [
    {
      title: "JavaScriptの基礎を学んだ後のステップアップを目指している方",
      points: [
        "Reactコンポーネントの設計や状態管理、TypeScriptの活用法を実践的に学べます",
      ],
    },
    {
      title: "TypeScriptを実際のプロジェクトで使ってみたい方",
      points: ["型定義やインターフェースの活用方法を実際のコードで学べます"],
    },
    {
      title: "モダンなUIを持つWebアプリを開発したい方",
      points: ["TailwindCSSとshadcnを使った効率的なUIデザインを習得できます"],
    },
    {
      title: "アニメーションを活用したインタラクティブなアプリを作りたい方",
      points: ["Framer Motionによる魅力的なモーションの実装方法を学べます"],
    },
    {
      title: "AI機能を自分のアプリに統合してみたい方",
      points: ["Gemini APIの連携方法と実践的な活用テクニックを習得できます"],
    },
  ],
}

export default function NextjsAiPomodoroTimerPage() {
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
