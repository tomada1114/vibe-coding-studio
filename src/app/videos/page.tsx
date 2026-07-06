import { Container } from "@/components/container"
import { AsyncErrorBoundary } from "@/components/error-boundary"
import { Footer } from "@/components/footer"
import { Gradient } from "@/components/gradient"
import { Navbar } from "@/components/navbar"
import { VideoCard } from "@/components/videos/video-card"
import { getLatestVideos } from "@/lib/videos/video-data"
import type { Metadata } from "next"

/**
 * メタデータ生成
 */
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "動画一覧",
    description:
      "YouTube動画の一覧ページです。Next.js、TypeScript、AI駆動開発などの技術について解説しています。",
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
          <Gradient className="absolute inset-2 bottom-0 rounded-4xl ring-1 ring-black/5 ring-inset" />
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
              <h1 className="text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl">
                動画一覧
              </h1>
              <p className="mt-6 text-base text-gray-600">
                YouTube動画のメタデータをご覧いただけます。Next.js、TypeScript、AI駆動開発などの技術について解説しています。
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
