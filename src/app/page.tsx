import { Button } from "@/components/button"
import { Container } from "@/components/container"
import { AsyncErrorBoundary } from "@/components/error-boundary"
import { Footer } from "@/components/footer"
import { Gradient } from "@/components/gradient"
import { Logo } from "@/components/logo"
import { Navbar } from "@/components/navbar"
import { Heading, Subheading } from "@/components/text"
import {
  ChatBubbleLeftRightIcon,
  CodeBracketIcon,
  LightBulbIcon,
  UserGroupIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline"
import type { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Vibe Coding Studio - AI駆動開発コミュニティ",
  description:
    "AI駆動開発を学ぶ仲間が集まり、とまだの最新検証を見ながら一緒に成長するDiscordコミュニティ",
}

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
          {/* ロゴ */}
          <div className="mb-8 flex justify-center sm:justify-start">
            <Logo className="h-16 w-auto sm:h-20" />
          </div>

          {/* キャッチコピー */}
          <h1 className="font-display text-6xl/[1.15] font-medium tracking-tight text-balance text-gray-950 sm:text-8xl/[1.1] md:text-9xl/[1.1]">
            AI駆動開発を
            <br />
            一緒に学ぼう
          </h1>

          {/* 説明文 */}
          <p className="mt-8 max-w-lg text-xl/8 font-medium text-gray-950/75 sm:text-2xl/9">
            AI駆動開発を学ぶ仲間が集まり、とまだの最新検証を見ながら一緒に成長するDiscordコミュニティ
          </p>

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
        "とまだの最新AI技術検証をYouTube化前に見られる。失敗も含めた試行錯誤のプロセスが学べます",
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: "気軽に質問・報告",
      description:
        "初心者の質問も大歓迎。ROM参加もOK。自分のペースで関わり方を決められます",
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

        {/* widelogoを薄めの背景で表示 */}
        <div className="mt-10 overflow-hidden rounded-3xl bg-gray-950/5 p-12 sm:mt-16">
          <div className="flex items-center justify-center">
            <Image
              src="/logo-wide-bg-black.png"
              alt="Vibe Coding Studio"
              width={400}
              height={120}
              className="opacity-20"
              priority={false}
            />
          </div>
        </div>

        {/* 3つの価値提案 */}
        <div className="mt-10 grid grid-cols-1 gap-8 sm:mt-16 md:grid-cols-3">
          {communityFeatures.map(feature => (
            <div key={feature.title} className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-950">
                <feature.icon className="h-8 w-8 text-white" />
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
 * 工事中セクション
 * - 準備中コンテンツの告知
 * - レスポンシブグリッド（スマホ: 1カラム、タブレット: 2カラム、PC: 3カラム）
 */
function WorkInProgressSection() {
  const upcomingFeatures = [
    {
      icon: WrenchScrewdriverIcon,
      title: "プロジェクトショーケース",
      description: "コミュニティメンバーのプロジェクトを紹介",
    },
    {
      icon: CodeBracketIcon,
      title: "学習リソース",
      description: "AI駆動開発の学習教材とガイド",
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: "イベント情報",
      description: "勉強会やワークショップの開催情報",
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
          より充実したコミュニティ体験のため、現在以下のコンテンツを準備中です。
        </p>

        {/* レスポンシブグリッド */}
        <div className="mt-10 grid grid-cols-1 gap-8 sm:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {upcomingFeatures.map(feature => (
            <div
              key={feature.title}
              className="relative rounded-3xl bg-white p-8 shadow-sm ring-1 ring-gray-950/5"
            >
              <feature.icon className="h-10 w-10 text-gray-950" />
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
 * - コミュニティ概要セクション（新規追加）
 * - 工事中セクション
 * - プロフィール紹介
 * - AsyncErrorBoundaryによるエラーハンドリング
 */
export default function Home() {
  return (
    <div className="overflow-hidden">
      <AsyncErrorBoundary>
        <HeroSection />
      </AsyncErrorBoundary>
      <main>
        <AsyncErrorBoundary>
          <CommunityOverviewSection />
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
