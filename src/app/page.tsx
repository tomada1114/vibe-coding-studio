import { Button } from "@/components/button"
import { Container } from "@/components/container"
import { DiscordMemberCount } from "@/components/discord-member-count"
import { AsyncErrorBoundary } from "@/components/error-boundary"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { SpectrumBeam } from "@/components/spectrum-beam"
import { Heading, Subheading } from "@/components/text"
import { getLatestCoupons, getMaxDiscountRate } from "@/lib/coupons/coupon-data"
import { navigation } from "@/lib/navigation"
import { getAllVideos } from "@/lib/videos/video-data"
import {
  BookOpenIcon,
  ChatBubbleLeftRightIcon,
  LightBulbIcon,
  MapIcon,
  PlayCircleIcon,
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
      <Container className="relative">
        <Navbar />
        <div className="pt-16 pb-24 sm:pt-24 sm:pb-32 md:pt-32 md:pb-48">
          {/* キャッチコピー */}
          <h1 className="font-display text-4xl/[1.2] font-bold tracking-tight text-balance text-gray-950 sm:text-5xl/[1.15] md:text-6xl/[1.1]">
            AI駆動開発を
            <span className="bg-(image:--gradient-spectrum) box-decoration-clone [background-size:100%_4px] [background-position:0_100%] bg-no-repeat pb-1">
              仲間と
            </span>
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
            <Button variant="secondary" href="/coupons">
              クーポンを見る
            </Button>
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
    <div className="relative border-t border-gray-200 bg-gray-50 py-24 sm:py-32">
      <Container>
        <Subheading>COMMUNITY</Subheading>
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
 * - 最大割引率はクーポンデータから算出
 */
function CouponSection() {
  const maxDiscountRate = getMaxDiscountRate(getLatestCoupons())
  return (
    <div className="relative border-t border-gray-200 bg-gray-50 py-24 sm:py-32">
      <Container className="relative">
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-(image:--gradient-spectrum)">
            <TicketIcon className="h-10 w-10 text-white" aria-hidden="true" />
          </div>
          <Subheading className="mt-8 justify-center">COUPONS</Subheading>
          <Heading as="h2" className="mt-2">
            講座を特別価格で受講
          </Heading>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            運営者である「とまだ」のUdemy講座を
            <br />
            <span className="font-semibold text-gray-950">
              最大{maxDiscountRate}% OFF
            </span>
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
 * Learn セクション
 * - 実在するコンテンツ（学習コース・動画・ロードマップ）への導線
 * - 各カードに mono の実数値を表示
 */
function LearnSection() {
  const courseCount = navigation.length
  const lessonCount = navigation.reduce(
    (sum, course) =>
      sum +
      course.links.reduce((s, link) => s + (link.children?.length ?? 0), 0),
    0
  )
  const videoCount = getAllVideos().length

  const learnContents = [
    {
      icon: BookOpenIcon,
      title: "学習コース",
      description:
        "Ruby・Rails・JavaScript・React など、基礎から実践まで体系的に学べる無料カリキュラム",
      href: "/docs",
      stat: `${courseCount} COURSES / ${lessonCount} LESSONS`,
    },
    {
      icon: PlayCircleIcon,
      title: "動画",
      description:
        "Claude Code や Codex など、最新AIツールの検証・解説動画をメタデータ付きで一覧",
      href: "/videos",
      stat: `${videoCount} VIDEOS`,
    },
    {
      icon: MapIcon,
      title: "ロードマップ",
      description:
        "目的別に最適な学習パスを選べる、AI駆動開発の学習ロードマップ",
      href: "/roadmap",
      stat: "LEARNING PATHS",
    },
  ]

  return (
    <div className="border-t border-gray-200 bg-white py-24 sm:py-32">
      <Container>
        <Subheading>LEARN</Subheading>
        <Heading as="h2" className="mt-2 max-w-3xl">
          学べるコンテンツ
        </Heading>
        <p className="mt-6 max-w-3xl text-lg text-gray-600">
          コミュニティと連携した学習コンテンツを無料で公開しています。
        </p>

        {/* レスポンシブグリッド */}
        <div className="mt-10 grid grid-cols-1 gap-8 sm:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {learnContents.map(content => (
            <a
              key={content.title}
              href={content.href}
              className="group focus-visible:outline-accent relative overflow-hidden rounded-2xl bg-white p-8 ring-1 ring-gray-950/5 transition-shadow hover:ring-gray-950/10 focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <SpectrumBeam className="absolute inset-x-0 top-0 opacity-0 transition-opacity group-hover:opacity-100" />
              <content.icon
                className="h-10 w-10 text-gray-950"
                aria-hidden="true"
              />
              <h3 className="mt-6 text-xl/7 font-semibold text-gray-950">
                {content.title}
              </h3>
              <p className="mt-4 text-base/7 text-gray-600">
                {content.description}
              </p>
              <p className="mt-6 font-mono text-xs/5 font-medium tracking-widest text-gray-500 uppercase">
                {content.stat}
              </p>
            </a>
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
    <div className="relative border-t border-gray-200 bg-white py-24 sm:py-32">
      <Container className="relative">
        <Subheading>ABOUT</Subheading>
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
 * - Learn セクション（実在コンテンツへの導線）
 * - クーポンセクション
 * - プロフィール紹介
 * - AsyncErrorBoundaryによるエラーハンドリング
 */
export default function Home() {
  return (
    <div className="overflow-hidden">
      <main id="main-content">
        <AsyncErrorBoundary>
          <HeroSection />
        </AsyncErrorBoundary>
        <AsyncErrorBoundary>
          <CommunityOverviewSection />
        </AsyncErrorBoundary>
        <AsyncErrorBoundary>
          <LearnSection />
        </AsyncErrorBoundary>
        <AsyncErrorBoundary>
          <CouponSection />
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
