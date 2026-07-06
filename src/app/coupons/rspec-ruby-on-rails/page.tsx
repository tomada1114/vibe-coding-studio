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
const COURSE_ID = "6327241"

// udemy-course-info-temp.md に記載の正式タイトル・サブタイトル（表示用）
const COURSE_TITLE =
  "【RSpec 実践入門】Ruby on Rails 開発者のためのテスト自動化 - 完全ガイド"
const COURSE_SUBTITLE =
  "テスト未経験でもOK！Ruby/Railsの基礎を確認しながらRSpecの書き方を徹底解説。シンプルな例から実践的なテストまで、現場で使えるテストコーディングスキルが身につきます。"

export const metadata: Metadata = {
  title: COURSE_TITLE,
  description: COURSE_SUBTITLE,
  openGraph: {
    title: COURSE_TITLE,
    description: COURSE_SUBTITLE,
    type: "website",
    url: "/coupons/rspec-ruby-on-rails",
    images: [
      {
        url: "/images/udemy/rspec-ruby-on-rails.png",
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
    images: ["/images/udemy/rspec-ruby-on-rails.png"],
  },
  alternates: {
    canonical: "/coupons/rspec-ruby-on-rails",
  },
}

// udemy-course-info-temp.md の内容をもとに、ユーザーに見える情報のみを定義（新規情報の創作は禁止）
const courseDetails = {
  title: COURSE_TITLE,
  subtitle: COURSE_SUBTITLE,
  description: `「テストを書いた方がいいのは分かるけど、どう始めたらいいか分からない...」

多くのRailsエンジニアが感じるこの悩み、本講座で解決しましょう！

RSpecは、Rubyコミュニティで最も利用されているテストフレームワークです。
しかし、その多機能さに圧倒されて、なかなか一歩を踏み出せない方も多いのではないでしょうか？

本講座では、Ruby/Railsの基礎知識を確認しながら、RSpecによるテスト自動化を段階的に学んでいきます。

[講座の特徴]

  1. テスト未経験でも安心の丁寧な解説
    - Ruby/Railsの基礎知識も都度確認しながら進めます
    - 全動画に詳細なテキスト版を用意し、自分のペースで学習できます
    - 現場レベルのコードの書き方もカバーしています
    - プログラミングスクール講師としての経験を活かした、初心者でも分かりやすい解説

  2. 実践的な例題で学ぶテストの基礎から応用まで
    - バリデーションやアソシエーションなど、モデルの振る舞いをテストする方法
    - APIのリクエスト/レスポンスを検証する方法
    - Capybaraを使ったブラウザ操作の自動化（システムスペック）
    - 実際の開発現場で使われているテスト手法とベストプラクティス

  3. テストの設計・実装ノウハウ
    - beforeやletを使ったテストデータの効率的な準備方法
    - テストコードの重複を避ける設計テクニック
    - モック/スタブを使った外部処理の置き換え
    - テストの実行速度を意識した実装方法
    - テストコードのリファクタリング手法

  4. 段階的に理解を深める構成
    - 環境構築から丁寧に解説
    - 基本的な構文からスタート
    - 実践的なテストケースへ段階的に移行
    - 最終的にはブラウザ操作の自動化まで到達

[こんな方におすすめ]

  ■ Railsでテストを書いたことがない方
    - テストの必要性は感じているが、始め方が分からない
    - テストの基礎から体系的に学びたい
    - 実践的なテストの書き方を身につけたい

  ■ 就職・転職を考えている方
    - ポートフォリオにテストを導入したい
    - 面接で技術的な優位性をアピールしたい
    - 実務レベルのテストスキルを身につけたい

  ■ 現場でRSpecを使う必要がある方
    - 新規プロジェクトでテスト導入を任されている
    - レガシーコードにテストを追加したい
    - チーム開発でのテストの書き方を学びたい

  ■ テストの品質を上げたい方
    - より良いテストの書き方を知りたい
    - テストの保守性を高めたい
    - テストの実行速度を改善したい

[本講座で学べる内容]

  1. テストの基礎とRSpecの概要
    - テストを書く意義とメリット
    - RSpecの基本的な構文と概念
    - テストケースの設計方法

  2. RSpecの導入と基本
    - 開発環境のセットアップ
    - 基本的なテストの書き方
    - テストの実行方法

  3. モデルのテスト
    - バリデーションのテスト
    - アソシエーションのテスト
    - スコープのテスト
    - カスタムメソッドのテスト

  4. コントローラのテスト
    - リクエストスペックの基本
    - パラメータのテスト
    - レスポンスの検証
    - セッション・認証のテスト

  5. システムスペック
    - Capybaraの基本
    - ブラウザ操作の自動化
    - JavaScriptを含む動的な振る舞いのテスト
    - 実践的なテストシナリオの作成

  6. テストの設計とリファクタリング
    - テストデータの共有
    - テストの分離と結合
    - テストの保守性向上
    - 実行速度の最適化`,
  features: [
    {
      title: "テスト未経験でも安心の丁寧な解説",
      description:
        "Ruby/Railsの基礎知識も都度確認しながら進めます / 全動画に詳細なテキスト版を用意し、自分のペースで学習できます / 現場レベルのコードの書き方もカバーしています / プログラミングスクール講師としての経験を活かした、初心者でも分かりやすい解説",
    },
    {
      title: "実践的な例題で学ぶテストの基礎から応用まで",
      description:
        "バリデーションやアソシエーションなど、モデルの振る舞いをテストする方法 / APIのリクエスト/レスポンスを検証する方法 / Capybaraを使ったブラウザ操作の自動化（システムスペック） / 実際の開発現場で使われているテスト手法とベストプラクティス",
    },
    {
      title: "テストの設計・実装ノウハウ",
      description:
        "beforeやletを使ったテストデータの効率的な準備方法 / テストコードの重複を避ける設計テクニック / モック/スタブを使った外部処理の置き換え / テストの実行速度を意識した実装方法 / テストコードのリファクタリング手法",
    },
    {
      title: "段階的に理解を深める構成",
      description:
        "環境構築から丁寧に解説 / 基本的な構文からスタート / 実践的なテストケースへ段階的に移行 / 最終的にはブラウザ操作の自動化まで到達",
    },
  ],
  projects: [
    {
      title: "モデルのテスト",
      tech: "RSpec",
      description:
        "バリデーション・アソシエーション・スコープ・メソッドのテストを実装。",
    },
    {
      title: "コントローラ/リクエストのテスト",
      tech: "RSpec",
      description: "リクエストスペックでパラメータとレスポンスの検証を実践。",
    },
    {
      title: "システムスペック（E2E）",
      tech: "RSpec / Capybara",
      description: "ブラウザ操作の自動化と実践的なシナリオテストを実装。",
    },
  ],
  targetAudience: [
    {
      title: "Railsでテストを書いたことがない方",
      points: [
        "テストの必要性は感じているが、始め方が分からない",
        "テストの基礎から体系的に学びたい",
        "実践的なテストの書き方を身につけたい",
      ],
    },
    {
      title: "就職・転職を考えている方",
      points: [
        "ポートフォリオにテストを導入したい",
        "面接で技術的な優位性をアピールしたい",
        "実務レベルのテストスキルを身につけたい",
      ],
    },
    {
      title: "現場でRSpecを使う必要がある方",
      points: [
        "新規プロジェクトでテスト導入を任されている",
        "レガシーコードにテストを追加したい",
        "チーム開発でのテストの書き方を学びたい",
      ],
    },
    {
      title: "テストの品質を上げたい方",
      points: [
        "より良いテストの書き方を知りたい",
        "テストの保守性を高めたい",
        "テストの実行速度を改善したい",
      ],
    },
  ],
}

export default function RSpecRailsCoursePage() {
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
