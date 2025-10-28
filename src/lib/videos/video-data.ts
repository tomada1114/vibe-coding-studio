import { video001 } from "@/data/videos/video-001"
import { video002 } from "@/data/videos/video-002"
import { video003 } from "@/data/videos/video-003"
import { video004 } from "@/data/videos/video-004"
import { video005 } from "@/data/videos/video-005"
import { video006 } from "@/data/videos/video-006"
import { video007 } from "@/data/videos/video-007"
import { video008 } from "@/data/videos/video-008"
import { video009 } from "@/data/videos/video-009"
import { video010 } from "@/data/videos/video-010"
import type { VideoMetadata } from "@/types/video"

/**
 * 動画データローダー
 *
 * すべての動画データを管理し、一覧取得・個別取得のAPIを提供します。
 * ビルド時にすべてのデータが静的にバンドルされます。
 */

/**
 * すべての動画データの配列
 * 新しい動画を追加する場合は、ここにimportとデータを追加してください。
 */
const allVideosData: VideoMetadata[] = [
  video001,
  video002,
  video003,
  video004,
  video005,
  video006,
  video007,
  video008,
  video009,
  video010,
]

/**
 * すべての動画データを取得する
 *
 * @returns すべての動画データの配列
 */
export function getAllVideos(): VideoMetadata[] {
  return allVideosData
}

/**
 * 公開日順(新しい順)でソートされた動画データを取得する
 *
 * @returns 公開日順でソートされた動画データの配列
 */
export function getLatestVideos(): VideoMetadata[] {
  return [...allVideosData].sort((a, b) => {
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  })
}

/**
 * 動画IDから動画データを取得する
 *
 * @param id - 動画ID
 * @returns 動画データ、存在しない場合はundefined
 */
export function getVideoById(id: string): VideoMetadata | undefined {
  return allVideosData.find(video => video.id === id)
}

/**
 * すべての動画IDを取得する(generateStaticParams用)
 *
 * @returns すべての動画IDの配列
 */
export function getAllVideoIds(): string[] {
  return allVideosData.map(video => video.id)
}
