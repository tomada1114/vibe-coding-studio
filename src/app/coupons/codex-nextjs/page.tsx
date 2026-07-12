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

// クーポン検索用の courseId（COURSE_INFO のキー）
const COURSE_ID = "6801509"

// 表示用のコースタイトル
const COURSE_TITLE =
  "【Codex CLI】実践レベルのアプリ開発で学ぶバイブコーディング！カスタムコマンド・MCP連携の完全ガイド"

export const metadata: Metadata = {
  title: COURSE_TITLE,
  description:
    "初心者も安心！OpenAI Codexの基礎から実践まで完全網羅。カスタムコマンドとMCP（Context7・Playwright・Supabase）で開発効率10倍。React/Next.jsアプリを作りながら次世代のAI開発手法を習得！",
  openGraph: {
    title: COURSE_TITLE,
    description:
      "初心者も安心！OpenAI Codexの基礎から実践まで完全網羅。カスタムコマンドとMCP（Context7・Playwright・Supabase）で開発効率10倍。React/Next.jsアプリを作りながら次世代のAI開発手法を習得！",
    type: "website",
    url: "/coupons/codex-nextjs",
    images: [
      {
        url: "/images/udemy/codex-nextjs.png",
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
      "初心者も安心！OpenAI Codexの基礎から実践まで完全網羅。カスタムコマンドとMCP（Context7・Playwright・Supabase）で開発効率10倍。React/Next.jsアプリを作りながら次世代のAI開発手法を習得！",
    images: ["/images/udemy/codex-nextjs.png"],
  },
  alternates: {
    canonical: "/coupons/codex-nextjs",
  },
}

const courseDetails = {
  title: COURSE_TITLE,
  subtitle:
    "初心者も安心！OpenAI Codexの基礎から実践まで完全網羅。カスタムコマンドとMCP（Context7・Playwright・Supabase）で開発効率10倍。React/Next.jsアプリを作りながら次世代のAI開発手法を習得！",
  description: `「Claude Codeは使ってるけど、他のAIツールも試してみたい」

「Codexって聞いたことあるけど、どう使えばいいか分からない」

「カスタムコマンドやMCP連携で、もっと効率的に開発したい」

そんな悩みを抱えるあなたに、OpenAI Codexを使った次世代の開発手法をお届けします！

本講座では、OpenAI CodexのIDE版とCLI版の両方を使いこなし、
カスタムコマンドやMCP連携といった高度な機能まで完全マスターできます。

さらに、Next.js x Supabase のメモアプリ開発を通じて、
基礎レベルだけでなく実践レベルの AI 駆動開発スキルが身につきます。

分からないことがあれば、Q&Aでいつでも質問してください。必ず解決までサポートします！`,
  features: [
    {
      title: "IDE版とCLI版の両方を完全カバー",
      description:
        "VS Code拡張機能版とターミナルCLI版の使い方を学習。それぞれの得意分野と使い分けのコツを理解し、状況に応じた最適な選択ができるようになります",
    },
    {
      title: "カスタムコマンドで開発効率10倍",
      description:
        "/reviewコマンドの作成を通じてカスタマイズ手法を学習。頻繁に使う作業を1コマンドで実行できるようになり、反復作業から解放されます",
    },
    {
      title: "MCP連携で外部ツールを自在に操る",
      description:
        "Context7で最新ドキュメント自動取得、Playwrightでブラウザ操作自動化、Supabaseでデータベース直接操作。複数MCPを組み合わせた強力な開発環境を構築",
    },
    {
      title: "実践的なアプリ開発で即戦力スキル",
      description:
        "ストップウォッチアプリで基礎を理解し、Next.js 15 x Supabaseで本格メモアプリを開発。マークダウンプレビュー対応、全文検索機能まで実装する実践的な内容",
    },
  ],
  projects: [
    {
      title: "Codex IDE/CLIの基本操作",
      tech: "OpenAI Codex",
      description:
        "VS Code拡張機能版とCLI版の導入から基本的な使い方まで段階的に学習",
    },
    {
      title: "カスタムコマンド作成",
      tech: "Codex CLI",
      description:
        "/reviewコマンドを作成しながら、カスタムコマンドの作成方法と活用法を習得",
    },
    {
      title: "MCP連携 - Context7",
      tech: "Context7",
      description:
        "最新のライブラリドキュメントを自動取得し、常に最新情報で開発",
    },
    {
      title: "MCP連携 - Playwright",
      tech: "Playwright",
      description:
        "ブラウザ操作の自動化、スクリーンショット取得、レスポンシブチェック",
    },
    {
      title: "MCP連携 - Supabase",
      tech: "Supabase",
      description:
        "データベースのテーブル作成からCRUD操作まで、MCP経由で直接実行",
    },
    {
      title: "ストップウォッチアプリ開発",
      tech: "Next.js",
      description:
        "バイブコーディングの基礎を実践的に学ぶシンプルなアプリケーション開発",
    },
    {
      title: "メモアプリ開発（本格版）",
      tech: "Next.js + Supabase",
      description:
        "認証機能、マークダウン対応、全文検索、カテゴリ・タグ分類まで実装",
    },
  ],
  targetAudience: [
    {
      title: "他のAIツールも試してみたい方",
      points: [
        "Claude Code以外の選択肢を探している",
        "OpenAI Codexの実力を体験したい",
        "複数のAIツールを使い分けたい",
        "最新のAI開発手法を学びたい",
      ],
    },
    {
      title: "カスタムコマンド・MCP連携を学びたい方",
      points: [
        "開発作業を自動化したい",
        "外部ツールと連携したい",
        "効率的な開発環境を構築したい",
        "最新の開発技術を習得したい",
      ],
    },
    {
      title: "AI駆動開発の実践スキルを身につけたい方",
      points: [
        "バイブコーディングを実践的に学びたい",
        "実際のアプリ開発を通じて学習したい",
        "Next.jsとSupabaseの連携を学びたい",
        "即戦力となるスキルを習得したい",
      ],
    },
    {
      title: "効率的な開発手法を探している方",
      points: [
        "開発時間を大幅に短縮したい",
        "反復作業から解放されたい",
        "AIを活用した新しい開発手法を学びたい",
        "ChatGPT Plusを最大限活用したい",
      ],
    },
  ],
}

export default function CodexNextjsCoursePage() {
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
