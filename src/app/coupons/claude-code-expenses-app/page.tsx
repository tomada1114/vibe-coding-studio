import { Container } from "@/components/container"
import { CourseContent } from "@/components/coupons/course-detail/CourseContent"
import { CourseDetailHero } from "@/components/coupons/course-detail/CourseDetailHero"
import { CourseFeatures } from "@/components/coupons/course-detail/CourseFeatures"
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

// udemy-course-info-temp.md に記載の正式タイトル（照合用）
const COURSE_TITLE =
  "【Claude Code】実践！本格的なサブスク型家計簿アプリ開発で学ぶAI駆動開発マスター講座"

// サブタイトルも udemy-course-info-temp.md の内容をそのまま使用
const COURSE_SUBTITLE =
  "Vibe Codingで誰でも作れる！課金機能・Clerk認証・Supabaseを統合した本格SaaSアプリ開発。個人開発でストック収入を目指す完全実践ガイド"

export const metadata: Metadata = {
  title: COURSE_TITLE,
  description: COURSE_SUBTITLE,
  openGraph: {
    title: COURSE_TITLE,
    description: COURSE_SUBTITLE,
    type: "website",
    url: "https://school.learning-next.app/coupons/claude-code-expenses-app",
    images: [
      {
        url: "/images/udemy/claude-code-expenses-app.png",
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
    images: ["/images/udemy/claude-code-expenses-app.png"],
  },
}

// udemy-course-info-temp.md の内容をもとに、ユーザーに見える情報のみを定義（新規情報の創作は禁止）
const courseDetails = {
  title: COURSE_TITLE,
  subtitle: COURSE_SUBTITLE,
  description: `「プログラミングは難しそうで手が出せない...」

「個人開発でサブスクアプリを作って収益化したいけど、何から始めればいいか分からない...」

「AIツールは使えるけど、決済機能付きの本格的なアプリは作れない...」

そんな悩みを抱えるあなたに、Vibe Coding でサブスク型アプリを作る開発手法をお届けします！

本講座では、Claude Codeという最新AIエージェントを使った「Vibe Coding」で、プログラミング未経験でも本格的なサブスクリプション型家計簿アプリが作れるようになります。

しかも、ただ作るだけではありません。

Stripe決済、Clerk認証、Supabaseデータベースという現場で使われる最新技術を統合し、実際に収益化可能なSaaSアプリを完成させます。

慣れないサービス名が出てきて難しく感じるかもしれませんが、むしろ楽をするためのサービスです。

どれも開発で使うだけなら無料ですので、ご安心ください。

本講座は、環境構築から始まり、ドキュメント整備、開発、そしてデプロイまで、実際の開発フローに沿って進みます。

各セクションには詳細な指示書（コピペ可能）を用意しているので、Claude Codeに指示を出すだけで着実に進められます。

現役フリーランスエンジニアであり、Udemyベストセラー講師、さらに個人開発アプリを何本もリリースしている「とまだ」が、個人開発のアイデアや考え方など、実践的なノウハウも惜しみなくお伝えします。

Claudeのサブスクリプション（ProまたはMax）以外は全て無料ツールを使用するので、講座に沿って学習するだけなら追加費用の心配もありません。

※家計簿アプリを本番リリースするためには独自ドメイン取得などの料金がかかりますが、そちらは任意としています。

さあ、一緒にAI駆動開発で、あなたのサービスを世に送り出しましょう！`,
  features: [
    {
      title: "プログラミング未経験でも安心の徹底サポート",
      description:
        "ターミナル操作から丁寧に解説（Mac/Windows両対応） / VS Codeのインストールから初期設定まで完全ガイド / Node.jsセットアップも分かりやすく説明 / 元プログラミングスクール講師による初心者目線の解説",
    },
    {
      title: "実践的なドキュメント駆動開発",
      description:
        "要件定義書の作成方法 / デザインシステムドキュメントの整備 / 各種ライブラリのドキュメント管理 / 他のアプリ開発にも応用できるノウハウ",
    },
    {
      title: "最新技術スタックで本格SaaS開発",
      description:
        "Next.js 15による高速なWebアプリ開発 / Stripe決済でサブスクリプション機能実装 / Clerk認証で安全なユーザー管理 / Supabaseでリアルタイムデータベース構築 / Apple風の洗練されたUIデザイン",
    },
    {
      title: "収益化を見据えた実践的な内容",
      description:
        "プレミアム機能の設計と実装 / 日次・週次・月次の分析機能 / グラフによる支出の可視化 / 比較分析機能の実装 / 本番環境へのデプロイまで完全網羅",
    },
  ],
  targetAudience: [
    {
      title: "プログラミング完全未経験の方",
      points: [
        "コードを書いたことがないけどアプリを作ってみたい",
        "プログラミングスクールは高額で手が出せない",
        "AIの力を借りて効率的に学びたい",
        "副業や独立に向けてスキルを身につけたい",
      ],
    },
    {
      title: "個人開発で収益化を目指す方",
      points: [
        "サブスクリプション型のアプリを作りたい",
        "ストック収入の仕組みを構築したい",
        "決済機能の実装方法を学びたい",
        "本格的なSaaS開発のノウハウを知りたい",
      ],
    },
    {
      title: "最新の開発手法を学びたい方",
      points: [
        "AI駆動開発の実践的な方法を知りたい",
        "ドキュメント駆動開発を体験したい",
        "効率的な開発フローを身につけたい",
        "Claude Codeの活用法をマスターしたい",
      ],
    },
    {
      title: "フリーランス・起業を目指す方",
      points: [
        "自分のサービスを立ち上げたい",
        "技術力で差別化したい",
        "1人で開発から運営まで完結させたい",
        "実践的なポートフォリオを作りたい",
      ],
    },
  ],
}

export default function ClaudeCodeExpensesAppPage() {
  const coupons = getLatestCoupons()

  // クーポンはMDのコースタイトルで照合（コースIDを明示しない）
  const coupon = coupons.find(
    c => c.courseInfo.title === COURSE_TITLE || c.courseName === COURSE_TITLE
  )

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
