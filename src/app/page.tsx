import { Button } from "@/components/button"
import { Container } from "@/components/container"
import { AsyncErrorBoundary } from "@/components/error-boundary"
import { Footer } from "@/components/footer"
import { Gradient } from "@/components/gradient"
import { Navbar } from "@/components/navbar"
import { Logo } from "@/components/logo"
import { Heading, Subheading } from "@/components/text"
import {
  WrenchScrewdriverIcon,
  CodeBracketIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline"
import type { Metadata } from "next"

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
          <h1 className="font-display text-6xl/[0.9] font-medium tracking-tight text-balance text-gray-950 sm:text-8xl/[0.8] md:text-9xl/[0.8]">
            AI駆動開発を
            <br />
            一緒に学ぼう
          </h1>

          {/* 説明文 */}
          <p className="mt-8 max-w-lg text-xl/7 font-medium text-gray-950/75 sm:text-2xl/8">
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
          {upcomingFeatures.map((feature) => (
            <div
              key={feature.title}
              className="relative rounded-3xl bg-white p-8 shadow-sm ring-1 ring-gray-950/5"
            >
              <feature.icon className="h-10 w-10 text-gray-950" />
              <h3 className="mt-6 text-xl font-semibold text-gray-950">
                {feature.title}
              </h3>
              <p className="mt-4 text-base text-gray-600">
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
              <h3 className="text-2xl font-semibold text-gray-950">
                主催者: とまだ（Tomada）
              </h3>
              <p className="mt-6 text-lg text-gray-600">
                AI駆動開発の実践者として、最新の技術検証とコミュニティ活動を行っています。
              </p>
              <p className="mt-4 text-lg text-gray-600">
                Discordコミュニティでは、AI駆動開発の最新トレンドや実践的なノウハウを共有し、
                メンバーと共に成長する場を提供しています。
              </p>
            </div>

            {/* プレースホルダー（将来的に画像や追加情報を配置） */}
            <div className="flex items-center justify-center rounded-3xl bg-gray-100 p-12">
              <div className="text-center">
                <p className="text-gray-500">
                  プロフィール画像またはビジュアル要素
                </p>
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
