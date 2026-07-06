import { Container } from "@/components/container"
import { AsyncErrorBoundary } from "@/components/error-boundary"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { VideoCard } from "@/components/videos/video-card"
import { getLatestVideos } from "@/lib/videos/video-data"
import type { Metadata } from "next"

/**
 * メタデータ生成
 */
export async function generateMetadata(): Promise<Metadata> {
  const title = "動画一覧"
  const description =
    "Claude Code・Codex など最新AIツールの検証・解説動画を、学べる内容やタイムスタンプ付きで一覧できます。"

  return {
    title,
    description,
    openGraph: {
      title: `${title} - Vibe Coding Studio`,
      description,
      type: "website",
      url: "/videos",
      images: [
        {
          url: "/vcs-logo-wide-transparent.png",
          width: 1200,
          height: 630,
          alt: `${title} - Vibe Coding Studio`,
        },
      ],
    },
    alternates: {
      canonical: "/videos",
    },
  }
}

/**
 * 動画一覧ページ
 */
export default function VideosPage() {
  const videos = getLatestVideos()

  return (
    <div className="overflow-hidden">
      {/* ヘッダー */}
      <AsyncErrorBoundary>
        <div className="relative">
          <Container className="relative">
            <Navbar />
          </Container>
        </div>
      </AsyncErrorBoundary>

      {/* メインコンテンツ */}
      <main id="main-content">
        <AsyncErrorBoundary>
          <Container className="mt-16 mb-32 sm:mt-32">
            <header className="max-w-2xl">
              <h1 className="font-display text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl">
                動画一覧
              </h1>
              <p className="mt-6 text-base text-gray-600">
                Claude Code・Codex
                など最新AIツールの検証・解説動画を、学べる内容やタイムスタンプ付きでご覧いただけます。
              </p>
            </header>

            {videos.length === 0 ? (
              <div className="mt-16 text-center">
                <p className="text-gray-600">動画データがありません</p>
              </div>
            ) : (
              <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {videos.map(video => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            )}
          </Container>
        </AsyncErrorBoundary>
      </main>

      {/* フッター */}
      <AsyncErrorBoundary>
        <Footer />
      </AsyncErrorBoundary>
    </div>
  )
}
