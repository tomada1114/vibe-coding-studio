import type { VideoMetadata } from "@/types/video"
import Link from "next/link"

/**
 * 動画カードコンポーネント
 *
 * 一覧ページで1つの動画情報を表示するカードコンポーネント
 */

interface VideoCardProps {
  /** 動画データ */
  video: VideoMetadata
}

/**
 * 動画カードコンポーネント
 */
export function VideoCard({ video }: VideoCardProps) {
  const publishedDate = new Date(video.publishedAt).toLocaleDateString(
    "ja-JP",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  )

  return (
    <Link
      href={`/videos/${video.id}`}
      className="block rounded-lg border border-zinc-200 bg-white p-6 transition-all hover:border-zinc-300 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
    >
      <h2 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-white">
        {video.title}
      </h2>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        公開日: {publishedDate}
      </p>
    </Link>
  )
}
