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

const COURSE_ID = "6387599"

// udemy-course-info-temp.md に記載の正式タイトル・サブタイトルのみを使用
const COURSE_TITLE =
  "未経験からはじめる Ruby on Rails！Ruby / RSpec も学びながらポートフォリオ公開まで一本で完結"
const COURSE_SUBTITLE =
  "RubyとRails、さらにRSpecやDeviseも学びながらSNSアプリ開発とデプロイまでこれ一本！Tailwind CSS でデザインも抜群。初心者からエンジニアとしてのキャリアを目指す第一歩をスタートできる完全ガイド"

export const metadata: Metadata = {
  title: COURSE_TITLE,
  description: COURSE_SUBTITLE,
  openGraph: {
    title: COURSE_TITLE,
    description: COURSE_SUBTITLE,
    type: "website",
    url: "/coupons/ruby-on-rails-rspec",
    images: [
      {
        url: "/images/udemy/ruby-on-rails-rspec.png",
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
    images: ["/images/udemy/ruby-on-rails-rspec.png"],
  },
}

// udemy-course-info-temp.md の内容をもとに、ユーザーに見える情報のみを定義（新規情報の創作は禁止）
const courseDetails = {
  title: COURSE_TITLE,
  subtitle: COURSE_SUBTITLE,
  description: `RubyとRailsの基礎から、実践的なSNSアプリ「TechLog」の開発、そしてRenderによるデプロイまでを一気通貫で学べる初心者向けコースです。

前半はRubyの文法やオブジェクト指向を丁寧に解説し、つまずきやすいポイントを確実に克服。後半はRailsで投稿・編集・削除、Deviseによる認証、RSpec/Capybaraによる自動テストを実装し、Tailwind CSSで見栄えよく仕上げます。

最終的にポートフォリオをインターネット上に公開できる状態まで到達できるので、就職・転職活動での強力なアピール材料になります。`,
  features: [
    {
      title: "未経験でも安心の基礎固め",
      description:
        "Rubyの基礎からオブジェクト指向、クラス設計まで段階的に学習。つまずきやすいCLI操作も丁寧にフォロー。",
    },
    {
      title: "RailsでSNS実装 + 認証/テスト",
      description:
        "RailsでCRUDの基本を習得し、Deviseで認証、RSpec/Capybaraで自動テストを実装して現場に近い開発体験。",
    },
    {
      title: "デザインとデプロイまで網羅",
      description:
        "Tailwind CSSでモダンなUIを実装し、Renderへのデプロイ手順までカバー。ポートフォリオとして公開可能。",
    },
    {
      title: "学習を継続できる構成",
      description:
        "章立てで段階的に理解を深め、演習とクイズで定着。継続しやすいカリキュラム設計。",
    },
  ],
  projects: [
    {
      title: "Ruby基礎とオブジェクト指向",
      tech: "Ruby",
      description: "文法・オブジェクト指向・クラス設計を演習で確認。",
    },
    {
      title: "学習記録SNS「TechLog」",
      tech: "Rails / Devise / RSpec / Tailwind",
      description: "CRUD・認証・自動テスト・UIデザインまで実装。",
    },
    {
      title: "Renderでのデプロイ",
      tech: "Render / GitHub",
      description: "PaaSでの公開手順を学び、ポートフォリオとして公開。",
    },
  ],
  targetAudience: [
    {
      title: "完全未経験から始めたい方",
      points: [
        "Ruby/Railsの基礎をゼロから学びたい",
        "コマンドライン操作に不安がある",
        "段階的なカリキュラムで進めたい",
      ],
    },
    {
      title: "ポートフォリオを作りたい方",
      points: [
        "就職・転職でアピールできる作品が欲しい",
        "デプロイしてURLを共有できる状態にしたい",
        "見た目にも配慮したWebアプリを作りたい",
      ],
    },
    {
      title: "Rails開発を実践したい方",
      points: [
        "CRUDや認証を実装して実務に近い体験を積みたい",
        "RSpec/Capybaraでテスト自動化を学びたい",
        "TailwindでモダンなUIを取り入れたい",
      ],
    },
    {
      title: "学習を継続しやすい講座を求める方",
      points: [
        "演習やクイズで理解を定着させたい",
        "躓きやすい箇所を丁寧にフォローしてほしい",
        "章立てで目標を区切って取り組みたい",
      ],
    },
  ],
}

export default function RailsCoursePage() {
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
