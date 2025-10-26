import { Container } from "@/components/container"
import { VideoCard } from "@/components/videos/video-card"
import { getLatestVideos } from "@/lib/videos/video-data"
import type { Metadata } from "next"

/**
 * メタデータ生成
 */
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "動画一覧 - Vibe Coding Studio",
    description:
      "YouTube動画の一覧ページです。Next.js、TypeScript、AI駆動開発などの技術について解説しています。",
  }
}

/**
 * 動画一覧ページ
 */
export default function VideosPage() {
  const videos = getLatestVideos()

  return (
    <Container className="mt-16 sm:mt-32">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
          動画一覧
        </h1>
        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          YouTube動画のメタデータをご覧いただけます。Next.js、TypeScript、AI駆動開発などの技術について解説しています。
        </p>
      </header>

      {videos.length === 0 ? (
        <div className="mt-16 text-center">
          <p className="text-zinc-600 dark:text-zinc-400">
            動画データがありません
          </p>
        </div>
      ) : (
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </Container>
  )
}
