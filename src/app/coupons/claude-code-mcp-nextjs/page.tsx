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

// クーポン検索用の courseId（COURSE_INFO のキー）
const COURSE_ID = "6769253"

// udemy-course-info-temp.md に記載の正式タイトル（表示用）
const COURSE_TITLE =
  "【Claude Code × MCP完全攻略】Next.jsアプリ開発を劇的に効率化する5つの最新MCPツール実践ガイド"

export const metadata: Metadata = {
  title: COURSE_TITLE,
  description:
    "Vibe Codingの次のステップへ！Serena、Context7、Playwright、Sequential Thinking、Supabaseを統合し、トークン節約・自動テスト・DB連携まで完全マスター。無料で始められる実践的MCP活用術",
  openGraph: {
    title: COURSE_TITLE,
    description:
      "Vibe Codingの次のステップへ！Serena、Context7、Playwright、Sequential Thinking、Supabaseを統合し、トークン節約・自動テスト・DB連携まで完全マスター。無料で始められる実践的MCP活用術",
    type: "website",
    url: "/coupons/claude-code-mcp-nextjs",
    images: [
      {
        url: "/images/udemy/claude-code-mcp-nextjs.png",
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
      "Vibe Codingの次のステップへ！Serena、Context7、Playwright、Sequential Thinking、Supabaseを統合し、トークン節約・自動テスト・DB連携まで完全マスター。無料で始められる実践的MCP活用術",
    images: ["/images/udemy/claude-code-mcp-nextjs.png"],
  },
}

// udemy-course-info-temp.md の内容をもとに、ユーザーに見える情報のみを定義
const courseDetails = {
  title: COURSE_TITLE,
  subtitle:
    "Vibe Codingの次のステップへ！Serena、Context7、Playwright、Sequential Thinking、Supabaseを統合し、トークン節約・自動テスト・DB連携まで完全マスター。無料で始められる実践的MCP活用術",
  description: `「Claude Codeは使えるようになったけど、もっと効率的に開発したい...」

「トークン消費が気になるし、毎回同じような作業の繰り返しが非効率...」

「最新のMCPツールが気になるけど、どう組み合わせて使えばいいか分からない...」

そんなClaude Codeユーザーの悩みを、本講座で一気に解決しましょう！

MCP（Model Context Protocol）は、AIエージェントの能力を大幅に拡張する最新技術です。
本講座では、実践的な5つのMCPツールを組み合わせて、開発効率を劇的に向上させる方法を学びます。

すべて無料で使えるツールのみを使用し、Dockerも不要なので、今すぐ始められます！`,
  features: [
    {
      title: "実践的な5つのMCPツールを完全マスター",
      description:
        "Serena（トークン削減）、Context7（最新情報取得）、Playwright（ブラウザ自動化）、Sequential Thinking（段階的解決）、Supabase（DB連携）を体系的に学習",
    },
    {
      title: "実際のTodoアプリ開発で学ぶ実践的な内容",
      description:
        "Vibe Codingで基本機能を実装後、各MCPで機能を拡張。連携方法も含めて学習し、実務や個人開発で使えるテクニックを習得",
    },
    {
      title: "開発効率を劇的に向上させる実践テクニック",
      description:
        "トークン消費の削減、ブラウザテストの自動化、データベース連携の高速実装、複雑な機能追加の計画と実行方法を解説",
    },
    {
      title: "初心者でも安心の丁寧な解説",
      description:
        "インストールから設定まで画面で解説。コピペ可能なコマンド、Windows向け補足資料、つまずきポイントの事前解消",
    },
  ],
  projects: [
    {
      title: "Todoアプリ開発（Vibe Coding → MCP拡張）",
      tech: "Next.js",
      description:
        "シンプルなTodoアプリを題材に、各MCPの使い方と連携を段階的に学ぶ",
    },
    {
      title: "Serenaによるトークン最適化",
      tech: "Serena",
      description:
        "ファイル操作の効率化とトークン消費の大幅削減、ダッシュボード活用",
    },
    {
      title: "Context7で最新情報を自動取得",
      tech: "Context7",
      description:
        "ライブラリドキュメントの自動取得や最新セットアップ情報の収集",
    },
    {
      title: "Playwrightでブラウザ操作とE2E自動テスト",
      tech: "Playwright",
      description: "ブラウザ操作の自動化、スクリーンショット取得、E2Eテスト",
    },
    {
      title: "Supabaseでデータベース連携",
      tech: "Supabase",
      description: "テーブル自動作成、CRUD実装、リアルタイム機能の追加",
    },
  ],
  targetAudience: [
    {
      title: "Claude Codeをもっと効率的に使いたい方",
      points: [
        "トークン消費を削減したい",
        "繰り返し作業を自動化したい",
        "開発スピードを向上させたい",
        "最新のMCP技術を習得したい",
      ],
    },
    {
      title: "Vibe Codingの次のステップに進みたい方",
      points: [
        "基本的なVibe Codingはマスターした",
        "より高度な開発手法を学びたい",
        "AIエージェントの可能性を最大限引き出したい",
        "実務レベルの開発効率を実現したい",
      ],
    },
    {
      title: "個人開発・副業で差をつけたい方",
      points: [
        "開発時間を大幅に短縮したい",
        "品質の高いアプリを効率的に作りたい",
        "最新技術で競争優位を築きたい",
        "無料ツールで開発環境を構築したい",
      ],
    },
    {
      title: "チーム開発の効率を改善したい方",
      points: [
        "自動テストを導入したい",
        "データベース連携を簡素化したい",
        "開発プロセスを標準化したい",
        "メンバーの生産性を向上させたい",
      ],
    },
  ],
}

export default function ClaudeCodeMcpCoursePage() {
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
