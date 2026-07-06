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

const COURSE_ID = "6691241"

export const metadata: Metadata = {
  title:
    "【Claude Code×Vibe Coding】プログラミング未経験OK！ゼロから学べる AI 駆動開発実践講座 - 特別割引クーポン",
  description:
    "Claude Code×Vibe Codingでプログラミング未経験でもReact・Next.jsで5つのアプリを開発！実践的な開発スキルを身につけることができます。",
  openGraph: {
    title:
      "【Claude Code×Vibe Coding】プログラミング未経験OK！ゼロから学べる AI 駆動開発実践講座",
    description:
      "Claude Code×Vibe Codingでプログラミング未経験でもReact・Next.jsで5つのアプリを開発！",
    type: "website",
    url: "/coupons/claude-code-vibe-coding",
    images: [
      {
        url: "/images/udemy/claude-code-vibe-coding.png",
        width: 1280,
        height: 720,
        alt: "【Claude Code×Vibe Coding】プログラミング未経験OK！ゼロから学べる AI 駆動開発実践講座",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "【Claude Code×Vibe Coding】プログラミング未経験OK！ゼロから学べる AI 駆動開発実践講座",
    description:
      "Claude Code×Vibe Codingでプログラミング未経験でもReact・Next.jsで5つのアプリを開発！",
    images: ["/images/udemy/claude-code-vibe-coding.png"],
  },
  alternates: {
    canonical: "/coupons/claude-code-vibe-coding",
  },
}

const courseDetails = {
  title:
    "【Claude Code×Vibe Coding】プログラミング未経験OK！ゼロから学べる AI 駆動開発実践講座",
  subtitle:
    "環境構築からデプロイまで完全サポート！React / Next.js アプリを作りながら Claude Code のコツ、実践的な使い方を学びます。",
  description: `プログラミングを学びたいけど、難しそうで踏み出せない...
AIツールは使えるけど、本格的なアプリ開発はハードルが高い...
Cursor は使ってるけど、もっと効率的にAIを活用したい...

そんな皆さんに朗報です！本講座では、Claude Codeという最新AIエージェントを使った「Vibe Coding」で、プログラミング未経験でも本格的なWebアプリが作れるようになります。`,
  projects: [
    {
      title: "マウス追従パーティクル背景",
      tech: "JavaScript",
      description: "インタラクティブなビジュアルエフェクトの基礎を学ぶ",
    },
    {
      title: "紙吹雪エフェクト付きTodoアプリ",
      tech: "React + shadcn/ui",
      description: "モダンUIライブラリを使った実践的なアプリ開発",
    },
    {
      title: "モダンUIポモドーロタイマー",
      tech: "React + shadcn/ui",
      description: "時間管理アプリで学ぶ状態管理とアニメーション",
    },
    {
      title: "Apple風デザインの付箋アプリ",
      tech: "React + shadcn/ui",
      description: "洗練されたUIデザインの実装テクニック",
    },
    {
      title: "Gemini AI 文体分析アプリ",
      tech: "Next.js + Google Gemini AI",
      description: "AI APIとの統合方法を実践的に学ぶ",
    },
  ],
  features: [
    {
      title: "プログラミング未経験でも安心",
      description:
        "ターミナルの使い方から丁寧に解説。Mac/Windows両対応で、つまずきポイントは全て解決策を用意。",
    },
    {
      title: "段階的に学べる5つのプロジェクト",
      description:
        "簡単なHTML/JavaScriptから始まり、徐々にReact、最終的にはNext.jsとAI統合まで無理なくステップアップ。",
    },
    {
      title: "実務で使えるモダンな技術",
      description:
        "React 19、Next.js 15など最新フレームワーク。Tailwind CSS 4 + shadcn/uiによる効率的なスタイリング。",
    },
    {
      title: "Vibe Codingのコツを習得",
      description:
        "効果的な指示の出し方、エラー対処法、機能改善の依頼方法など、AIとの協働テクニックを徹底解説。",
    },
  ],
  targetAudience: [
    {
      title: "プログラミング完全未経験の方",
      points: [
        "コードを書いたことがないけどアプリを作ってみたい",
        "プログラミングスクールは高額で手を出せない",
        "独学で挫折した経験がある",
        "AIの力を借りて効率的に学びたい",
      ],
    },
    {
      title: "AIツールをもっと活用したい方",
      points: [
        "ChatGPTは使えるけど開発には活かせていない",
        "Cursor 使用者でClaude Codeも試してみたい",
        "もっと効率的なAI活用法を知りたい",
        "AIエージェントをフル活用して作業を効率化させたい",
      ],
    },
    {
      title: "ポートフォリオを充実させたい方",
      points: [
        "就職・転職用のポートフォリオを作りたい",
        "複数のアプリを短期間で開発したい",
        "モダンな技術を使った作品を作りたい",
        "実際に公開できるアプリが欲しい",
      ],
    },
    {
      title: "副業・フリーランスを目指す方",
      points: [
        "Web制作の仕事を受注したい",
        "短時間で高品質なアプリを作りたい",
        "最新の開発手法で差別化したい",
        "1人で開発を完結させたい",
      ],
    },
  ],
  whatYouLearn: [
    "Claude Codeを使ったVibe Codingの基本から応用まで",
    "プログラミング未経験でも5つの本格的なWebアプリを完成",
    "HTML/CSS/JavaScriptの基礎からReact、Next.jsまでの段階的な技術習得",
    "AIへの適切な指示の出し方とエラー対処法",
    "GitHubとVercelを使った無料デプロイ方法",
    "最新のフロントエンド技術（React 19、Next.js 15、Tailwind CSS 4.x）",
    "Google Gemini AIなど外部APIとの連携方法",
  ],
  requirements: [
    "パソコンの基本的な操作ができること",
    "インターネット接続環境があること",
    "Claude サブスクリプション（Pro または Max）",
    "学習意欲と新しいことにチャレンジする好奇心",
    "プログラミング経験は一切不要！",
  ],
}

export default function ClaudeCodeVibeCodingPage() {
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
      <main id="main-content" className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/30">
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
