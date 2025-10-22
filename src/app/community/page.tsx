import { Button } from "@/components/button"
import { Container } from "@/components/container"
import { AsyncErrorBoundary } from "@/components/error-boundary"
import { Footer } from "@/components/footer"
import { Gradient } from "@/components/gradient"
import { Navbar } from "@/components/navbar"
import { DISCORD_INVITE_URL } from "@/lib/constants"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "コミュニティ - Vibe Coding Studio",
  description:
    "AI駆動開発を学ぶ仲間と繋がり、最新検証を見ながら一緒に成長するDiscordコミュニティに参加しよう",
}

/**
 * コミュニティページのヒーローセクション
 * - Discord参加への強いCTA
 * - レスポンシブデザイン対応
 */
function CommunityHeroSection() {
  return (
    <div className="relative">
      <Gradient className="absolute inset-2 bottom-0 rounded-4xl ring-1 ring-black/5 ring-inset" />
      <Container className="relative">
        <Navbar />
        <div className="pt-16 pb-24 sm:pt-24 sm:pb-32 md:pt-32 md:pb-48">
          {/* メインメッセージ */}
          <h1 className="font-display text-6xl/[0.9] font-medium tracking-tight text-balance text-gray-950 sm:text-8xl/[0.8] md:text-9xl/[0.8]">
            AI駆動開発を
            <br />
            共に学ぶ場へ
          </h1>

          {/* CTAメッセージ */}
          <p className="mt-8 max-w-lg text-xl/7 font-medium text-gray-950/75 sm:text-2xl/8">
            今すぐDiscordコミュニティに参加して、AI駆動開発の最新検証とノウハウを共有しましょう
          </p>

          {/* Discord参加ボタン */}
          <div className="mt-12 flex flex-col gap-x-6 gap-y-4 sm:flex-row">
            <Button
              href={DISCORD_INVITE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Discordに参加する
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}

/**
 * コミュニティページ
 * - ヒーローセクション
 * - AsyncErrorBoundaryによるエラーハンドリング
 */
export default function CommunityPage() {
  return (
    <div className="overflow-hidden">
      <AsyncErrorBoundary>
        <CommunityHeroSection />
      </AsyncErrorBoundary>
      <AsyncErrorBoundary>
        <Footer />
      </AsyncErrorBoundary>
    </div>
  )
}
