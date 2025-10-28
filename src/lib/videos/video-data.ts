import { video_1LP4ZAsU_UI } from "@/data/videos/1LP4ZAsU_UI"
import { video_UqKd0dxLskU } from "@/data/videos/UqKd0dxLskU"
import { video_Y15kBuMhCO4 } from "@/data/videos/Y15kBuMhCO4"
import { video_SO5qov2qTUE } from "@/data/videos/SO5qov2qTUE"
import { video_TWUpzNGp7fI } from "@/data/videos/TWUpzNGp7fI"
import { video_4MUadOFHy9M } from "@/data/videos/4MUadOFHy9M"
import { video_qrDUjfnlOiI } from "@/data/videos/qrDUjfnlOiI"
import { video_5ACcnosaEdw } from "@/data/videos/5ACcnosaEdw"
import { video_gXwS9dJewrU } from "@/data/videos/gXwS9dJewrU"
import { video_4HJCCAfDGU4 } from "@/data/videos/4HJCCAfDGU4"
import { video_1EQllS_3TJo } from "@/data/videos/1EQllS_3TJo"
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
  video_1LP4ZAsU_UI,
  video_UqKd0dxLskU,
  video_Y15kBuMhCO4,
  video_SO5qov2qTUE,
  video_TWUpzNGp7fI,
  video_4MUadOFHy9M,
  video_qrDUjfnlOiI,
  video_5ACcnosaEdw,
  video_gXwS9dJewrU,
  video_4HJCCAfDGU4,
  video_1EQllS_3TJo,
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
