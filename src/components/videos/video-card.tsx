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
      className="group block rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 focus:outline-none"
      aria-label={`${video.title}の詳細を見る`}
    >
      <h2 className="mb-2 text-xl font-semibold text-gray-950 transition-colors group-hover:text-gray-700">
        {video.title}
      </h2>
      <p className="text-sm text-gray-600">公開日: {publishedDate}</p>
    </Link>
  )
}
