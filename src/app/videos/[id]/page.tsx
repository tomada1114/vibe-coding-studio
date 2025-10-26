import { Container } from "@/components/container"
import { VideoDetail } from "@/components/videos/video-detail"
import { getAllVideoIds, getVideoById } from "@/lib/videos/video-data"
import type { Metadata } from "next"
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
      title: "動画が見つかりません - Vibe Coding Studio",
    }
  }

  return {
    title: `${video.title} - Vibe Coding Studio`,
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
    <Container className="mt-16 sm:mt-32">
      <VideoDetail video={video} />
    </Container>
  )
}
