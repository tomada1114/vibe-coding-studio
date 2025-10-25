import { Container } from "@/components/container"
import { CourseContent } from "@/components/coupons/course-detail/CourseContent"
import { CourseDetailHero } from "@/components/coupons/course-detail/CourseDetailHero"
import { CourseFeatures } from "@/components/coupons/course-detail/CourseFeatures"
import { CourseProjects } from "@/components/coupons/course-detail/CourseProjects"
import { FloatingCTA } from "@/components/coupons/course-detail/FloatingCTA"
import { PriceSection } from "@/components/coupons/course-detail/PriceSection"
import { TargetAudience } from "@/components/coupons/course-detail/TargetAudience"
import { AsyncErrorBoundary } from "@/components/error-boundary"
import { Footer } from "@/components/footer"
import { Gradient } from "@/components/gradient"
import { Navbar } from "@/components/navbar"
import { getLatestCoupons } from "@/lib/coupons/coupon-data"
import type { Metadata } from "next"

// 静的生成を明示的に設定
export const dynamic = "force-static"
export const revalidate = 3600 // 1時間ごとに再生成

const COURSE_ID = "6694011"

// udemy-course-info-temp.md に記載の正式タイトル・サブタイトルのみを使用
const COURSE_TITLE =
  "【無料ではじめる】Gemini CLI x Vibe Coding入門 - プログラミング未経験から作れるマインドマップ"
const COURSE_SUBTITLE =
  "最新AIエージェント！Google Gemini CLIの使い方から環境構築まで完全サポート。コードを1行も書かずに、Apple風デザインのモダンなマインドマップアプリを開発。完全無料で学べるAI駆動開発の決定版！"

export const metadata: Metadata = {
  title: COURSE_TITLE,
  description: COURSE_SUBTITLE,
  openGraph: {
    title: COURSE_TITLE,
    description: COURSE_SUBTITLE,
    type: "website",
    url: "https://school.learning-next.app/coupons/gemini-cli-vibe-coding-mind-map",
    images: [
      {
        url: "/images/udemy/gemini-cli-vibe-coding-mind-map.png",
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
    images: ["/images/udemy/gemini-cli-vibe-coding-mind-map.png"],
  },
}

// udemy-course-info-temp.md の内容をもとに、ユーザーに見える情報のみを定義（新規情報の創作は禁止）
const courseDetails = {
  title: COURSE_TITLE,
  subtitle: COURSE_SUBTITLE,
  description: `Google が公開した最新のオープンソースAIエージェント「Gemini CLI」を使って、完全無料ではじめるAI駆動開発を体験できます。

ターミナル操作の基礎から、Gemini CLI の導入、Next.js プロジェクトのセットアップ、Jest によるTDD、shadcn/uiによるUI構築までを段階的に学習。

ドラッグ&ドロップで操作できるAIマインドマップアプリを完成させ、GitHubとVercelで公開してポートフォリオとして活用できるところまで到達します。`,
  features: [
    {
      title: "完全無料で学べる",
      description:
        "Gemini CLI / VS Code / Node.js / GitHub / Vercel など、学習〜公開まで無料ツールで完結（収録時点）。",
    },
    {
      title: "段階的カリキュラム",
      description:
        "ターミナル基礎、Gemini CLI 導入、Next.js セットアップ、Jest でのテスト駆動開発、shadcn/uiでUI構築。",
    },
    {
      title: "実用的なAIアプリ開発",
      description:
        "ドラッグ&ドロップ操作、AIによるアイデア提案、ローカル保存、レスポンシブ対応まで実装。",
    },
    {
      title: "初心者も安心の支援",
      description:
        "コピペ可能な指示書、つまずきポイントの事前解消、実際の開発画面での丁寧な解説。",
    },
  ],
  projects: [
    {
      title: "Gemini CLI の導入と基本操作",
      tech: "Gemini CLI",
      description: "インストールと基本コマンドで特徴を理解。",
    },
    {
      title: "Next.js セットアップと TDD",
      tech: "Next.js / Jest / shadcn/ui",
      description: "プロジェクトを構築し、テスト駆動でUIを組み立てる。",
    },
    {
      title: "AIマインドマップの実装と公開",
      tech: "Gemini CLI / GitHub / Vercel",
      description: "指示書を活用して実装し、GitHubとVercelでデプロイ。",
    },
  ],
  targetAudience: [
    {
      title: "無料でAI開発を始めたい方",
      points: [
        "有料ツールの前に試したい",
        "費用をかけずにスキルを身につけたい",
        "最新技術を無料で学びたい",
      ],
    },
    {
      title: "AIエージェントを体験したい方",
      points: [
        "Gemini CLI を使いこなしたい",
        "Vibe Coding を実践したい",
        "AIの可能性を検証したい",
      ],
    },
    {
      title: "個人開発・ポートフォリオを強化したい方",
      points: [
        "自分のアイデアを形にしたい",
        "効率的な開発手法を学びたい",
        "完成物を公開してアピールしたい",
      ],
    },
    {
      title: "他ツールとの比較検討をしたい方",
      points: [
        "Claude Code や Cursor と比較したい",
        "無料環境でどこまで出来るか試したい",
      ],
    },
  ],
}

export default function GeminiCliVibeCodingMindMapPage() {
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

        <FloatingCTA coupon={coupon} />
      </main>

      {/* フッターセクション */}
      <AsyncErrorBoundary>
        <Footer />
      </AsyncErrorBoundary>
    </div>
  )
}
