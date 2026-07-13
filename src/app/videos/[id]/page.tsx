import { Container } from "@/components/container"
import { AsyncErrorBoundary } from "@/components/error-boundary"
import { Footer } from "@/components/footer"
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

  const canonicalUrl = `/videos/${id}`
  const description = video.opening.lines.join(" ")
  const thumbnailUrl = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`

  return {
    title: video.title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: video.title,
      description,
      type: "video.other",
      url: canonicalUrl,
      images: [
        {
          url: thumbnailUrl,
          width: 1280,
          height: 720,
          alt: video.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: video.title,
      description,
      images: [thumbnailUrl],
    },
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
          <Container className="relative">
            <Navbar />
          </Container>
        </div>
      </AsyncErrorBoundary>

      {/* メインコンテンツ */}
      <main id="main-content">
        <AsyncErrorBoundary>
          <Container className="mt-16 mb-32 sm:mt-32">
            <div className="mb-8 flex items-center justify-between">
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
              <a
                href={video.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-red-700 focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:outline-none"
                aria-label="YouTube動画を見る"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                YouTube動画を見る
              </a>
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
