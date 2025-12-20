import { Button } from "@/components/button"
import { Container } from "@/components/container"
import { DiscordMemberCount } from "@/components/discord-member-count"
import { AsyncErrorBoundary } from "@/components/error-boundary"
import { Footer } from "@/components/footer"
import { Gradient } from "@/components/gradient"
import { Navbar } from "@/components/navbar"
import { Heading, Subheading } from "@/components/text"
import {
  BookOpenIcon,
  ChatBubbleLeftRightIcon,
  CodeBracketIcon,
  LightBulbIcon,
  QuestionMarkCircleIcon,
  TicketIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline"
import type { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "ホーム",
}

// 1時間ごとに再検証
export const revalidate = 3600

/**
 * ファーストビューセクション
 * - キャッチコピー
 * - ロゴ
 * - コミュニティ参加ボタン
 */
function HeroSection() {
  return (
    <div className="relative">
      <Gradient className="absolute inset-2 bottom-0 rounded-4xl ring-1 ring-black/5 ring-inset" />
      <Container className="relative">
        <Navbar />
        <div className="pt-16 pb-24 sm:pt-24 sm:pb-32 md:pt-32 md:pb-48">
          {/* キャッチコピー */}
          <h1 className="font-display text-4xl/[1.2] font-medium tracking-tight text-balance text-gray-950 sm:text-5xl/[1.15] md:text-6xl/[1.1]">
            AI駆動開発を仲間と
            <br />
            一緒に学ぼう
          </h1>

          {/* 説明文 */}
          <p className="mt-8 max-w-2xl text-xl/8 font-medium text-gray-950/75 sm:text-2xl/9">
            AI駆動開発を学ぶ仲間が集まり、情報を共有し合い、
            <br />
            一緒に成長するDiscordコミュニティです
          </p>

          {/* Discordメンバー数 */}
          <div className="mt-12">
            <DiscordMemberCount />
          </div>

          {/* コミュニティ参加ボタン */}
          <div className="mt-12 flex flex-col gap-x-6 gap-y-4 sm:flex-row">
            <Button href="/community">コミュニティに参加</Button>
          </div>
        </div>
      </Container>
    </div>
  )
}

/**
 * コミュニティについて知るセクション
 * - 3つの価値提案をシンプルに提示
 * - widelogoを薄めの背景で活用
 * - コミュニティページへの導線
 */
function CommunityOverviewSection() {
  const communityFeatures = [
    {
      icon: UserGroupIcon,
      title: "仲間と繋がる",
      description:
        "AI駆動開発を学ぶ仲間と交流し、一緒に成長できる温かいコミュニティ",
    },
    {
      icon: LightBulbIcon,
      title: "最新検証をリアルタイムで",
      description:
        "とまだの最新AI技術検証をYouTube公開前の段階から共有。失敗も含めた試行錯誤のプロセスを一緒に追えます",
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: "気軽に質問・相談",
      description:
        "初心者の質問も大歓迎。見るだけもOK。自分のペースで関わり方を決められます",
    },
  ]

  return (
    <div className="relative bg-linear-to-b from-white from-50% to-gray-100 py-32">
      <Container>
        <Subheading>Community</Subheading>
        <Heading as="h2" className="mt-2 max-w-3xl">
          コミュニティについて
        </Heading>
        <p className="mt-6 max-w-3xl text-lg text-gray-600">
          初心者大歓迎 | 見るだけでもOK | 温かい雰囲気
        </p>

        {/* widelogo表示 */}
        <div className="mt-10 sm:mt-16">
          <div className="flex items-center justify-center">
            <div className="overflow-hidden rounded-2xl">
              <Image
                src="/vcs-logo-wide-transparent.png"
                alt="Vibe Coding Studio"
                width={300}
                height={100}
                sizes="(max-width: 640px) 240px, 300px"
              />
            </div>
          </div>
        </div>

        {/* 3つの価値提案 */}
        <div className="mt-10 grid grid-cols-1 gap-8 sm:mt-16 md:grid-cols-3">
          {communityFeatures.map(feature => (
            <div key={feature.title} className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-950">
                <feature.icon
                  className="h-8 w-8 text-white"
                  aria-hidden="true"
                />
              </div>
              <h3 className="mt-6 text-xl/7 font-semibold text-gray-950">
                {feature.title}
              </h3>
              <p className="mt-4 text-base/7 text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* コミュニティページへのリンク */}
        <div className="mt-12 text-center">
          <Button href="/community">もっと詳しく</Button>
        </div>
      </Container>
    </div>
  )
}

/**
 * クーポンセクション
 * - Udemyクーポンの案内
 * - 最大90% OFFの訴求
 */
function CouponSection() {
  return (
    <div className="relative py-32">
      <Gradient className="absolute inset-2 rounded-4xl ring-1 ring-black/5 ring-inset" />
      <Container className="relative">
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-purple-500 to-pink-500">
            <TicketIcon className="h-10 w-10 text-white" aria-hidden="true" />
          </div>
          <Subheading className="mt-8">Udemy Coupons</Subheading>
          <Heading as="h2" className="mt-2">
            講座を特別価格で受講
          </Heading>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            運営者である「とまだ」のUdemy講座を
            <br />
            <span className="font-semibold text-gray-950">最大90% OFF</span>
            で受講できるクーポンを配布中。
            <br />
            AI駆動開発を実践的に学べる講座を特別価格でお届けします。
          </p>
          <div className="mt-10 flex justify-center">
            <Button href="/coupons">クーポンを確認する</Button>
          </div>
        </div>
      </Container>
    </div>
  )
}

/**
 * 工事中セクション
 * - 準備中コンテンツの告知
 * - レスポンシブグリッド（スマホ: 1カラム、タブレット: 2カラム、PC: 3カラム）
 */
function WorkInProgressSection() {
  const upcomingFeatures = [
    {
      icon: CodeBracketIcon,
      title: "学習リソース",
      description: "コピペで使える設定ファイルやテンプレートを提供",
    },
    {
      icon: QuestionMarkCircleIcon,
      title: "FAQ・トラブルシューティング",
      description: "コミュニティで出た質問やトラブルをまとめて解説",
    },
    {
      icon: BookOpenIcon,
      title: "コンテンツ一覧",
      description: "AI駆動開発に役立つ動画や記事を探しやすく",
    },
  ]

  return (
    <div className="bg-linear-to-b from-white from-50% to-gray-100 py-32">
      <Container>
        <Subheading>Coming Soon</Subheading>
        <Heading as="h2" className="mt-2 max-w-3xl">
          準備中のコンテンツ
        </Heading>
        <p className="mt-6 max-w-3xl text-lg text-gray-600">
          当サイトでは、コミュニティと連携したコンテンツを準備中です。
        </p>

        {/* レスポンシブグリッド */}
        <div className="mt-10 grid grid-cols-1 gap-8 sm:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {upcomingFeatures.map(feature => (
            <div
              key={feature.title}
              className="relative rounded-3xl bg-white p-8 shadow-sm ring-1 ring-gray-950/5"
            >
              <feature.icon
                className="h-10 w-10 text-gray-950"
                aria-hidden="true"
              />
              <h3 className="mt-6 text-xl/7 font-semibold text-gray-950">
                {feature.title}
              </h3>
              <p className="mt-4 text-base/7 text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

/**
 * とまだプロフィール紹介セクション
 * - 主催者の紹介
 * - プロフィール情報
 */
function ProfileSection() {
  return (
    <div className="relative py-32">
      <Gradient className="absolute inset-2 rounded-4xl ring-1 ring-black/5 ring-inset" />
      <Container className="relative">
        <Subheading>About</Subheading>
        <Heading as="h2" className="mt-2 max-w-3xl">
          とまだについて
        </Heading>

        <div className="mt-10 sm:mt-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
            {/* プロフィール情報 */}
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl/8 font-semibold text-gray-950">
                主催者: とまだ（Tomada）
              </h3>
              <p className="mt-6 text-base/7 text-gray-700">
                AI駆動開発の実践者として、最新の技術検証とコミュニティ活動を行っています。
              </p>
              <p className="mt-4 text-base/7 text-gray-700">
                Discordコミュニティでは、AI駆動開発の最新トレンドや実践的なノウハウを共有し、
                メンバーと共に成長する場を提供しています。
              </p>
            </div>

            {/* プロフィール画像 */}
            <div className="flex items-center justify-center">
              <div className="relative aspect-square w-full max-w-md">
                <Image
                  src="/tomada.png"
                  alt="とまだ（Tomada）のプロフィール画像"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

/**
 * トップページ
 * - ファーストビュー
 * - コミュニティ概要セクション
 * - クーポンセクション（新規追加）
 * - 工事中セクション
 * - プロフィール紹介
 * - AsyncErrorBoundaryによるエラーハンドリング
 */
export default function Home() {
  return (
    <div className="overflow-hidden">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-gray-950 focus:ring-2 focus:ring-gray-950/20"
      >
        メインコンテンツへスキップ
      </a>
      <main id="main-content">
        <AsyncErrorBoundary>
          <HeroSection />
        </AsyncErrorBoundary>
        <AsyncErrorBoundary>
          <CommunityOverviewSection />
        </AsyncErrorBoundary>
        <AsyncErrorBoundary>
          <CouponSection />
        </AsyncErrorBoundary>
        <AsyncErrorBoundary>
          <WorkInProgressSection />
        </AsyncErrorBoundary>
        <AsyncErrorBoundary>
          <ProfileSection />
        </AsyncErrorBoundary>
      </main>
      <AsyncErrorBoundary>
        <Footer />
      </AsyncErrorBoundary>
    </div>
  )
}
