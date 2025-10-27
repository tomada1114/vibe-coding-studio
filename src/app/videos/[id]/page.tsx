import { Container } from "@/components/container"
import { AsyncErrorBoundary } from "@/components/error-boundary"
import { Footer } from "@/components/footer"
import { Gradient } from "@/components/gradient"
import { Navbar } from "@/components/navbar"
import { VideoDetail } from "@/components/videos/video-detail"
import { getAllVideoIds, getVideoById } from "@/lib/videos/video-data"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

/**
 * 静的パラメータ生成(すべての動画IDを列挙)
 */
export async function generateStaticParams() {
  const ids = getAllVideoIds()
  return ids.map(id => ({ id }))
}

/**
 * メタデータ生成
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const video = getVideoById(id)

  if (!video) {
    return {
      title: "動画が見つかりません",
    }
  }

  return {
    title: video.title,
    description: video.opening.lines.join(" "),
  }
}

/**
 * 動画詳細ページ
 */
export default async function VideoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const video = getVideoById(id)

  if (!video) {
    notFound()
  }

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
      <main>
        <AsyncErrorBoundary>
          <Container className="mt-16 mb-32 sm:mt-32">
            <div className="mb-8">
              <Link
                href="/videos"
                className="inline-flex items-center text-sm font-medium text-gray-600 transition-colors hover:text-gray-950 focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 focus:outline-none"
                aria-label="動画一覧に戻る"
              >
                <svg
                  className="mr-2 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                動画一覧に戻る
              </Link>
            </div>
            <VideoDetail video={video} />
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
