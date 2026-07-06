import { SpectrumBeam } from "@/components/spectrum-beam"
import type { VideoMetadata } from "@/types/video"
import Link from "next/link"

/**
 * 動画カードコンポーネント
 *
 * 一覧ページで1つの動画情報をサムネイル付きカードとして表示する。
 * サムネイルは i.ytimg.com を生 <img> で参照する（next/image は
 * リモート変換クォータ消費のため使用しない）。
 */

interface VideoCardProps {
  /** 動画データ */
  video: VideoMetadata
}

/**
 * 動画カードコンポーネント
 */
export function VideoCard({ video }: VideoCardProps) {
  const publishedDate = video.publishedAt.slice(0, 10)
  const topTags = video.tags.slice(0, 3)

  return (
    <Link
      href={`/videos/${video.id}`}
      className="group relative block overflow-hidden rounded-2xl bg-white ring-1 ring-gray-950/5 transition-shadow hover:ring-gray-950/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      aria-label={`${video.title}の詳細を見る`}
    >
      <SpectrumBeam className="absolute inset-x-0 top-0 z-10 opacity-0 transition-opacity group-hover:opacity-100" />
      {/* hqdefault は 480×360 (4:3) のため 16:9 にクロップして表示 */}
      <img
        src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
        alt=""
        width={480}
        height={360}
        loading="lazy"
        decoding="async"
        className="aspect-video w-full object-cover"
      />
      <div className="p-4">
        <h2 className="font-display text-base/6 font-medium text-gray-950">
          {video.title}
        </h2>
        <p className="mt-2 font-mono text-xs text-gray-500">{publishedDate}</p>
        {topTags.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-2">
            {topTags.map(tag => (
              <li
                key={tag}
                className="rounded-full bg-gray-50 px-2 py-0.5 font-mono text-xs text-gray-600 ring-1 ring-gray-950/5"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Link>
  )
}
