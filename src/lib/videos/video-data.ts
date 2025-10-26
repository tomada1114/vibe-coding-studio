import { video001 } from "@/data/videos/video-001"
import { video002 } from "@/data/videos/video-002"
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
const allVideosData: VideoMetadata[] = [video001, video002]

/**
 * ソート済み動画データのキャッシュ
 * パフォーマンス最適化のため、初回呼び出し時にソート結果をキャッシュします。
 */
let cachedLatestVideos: VideoMetadata[] | null = null

/**
 * すべての動画データを取得する
 *
 * @returns すべての動画データの配列(同じ参照)
 */
export function getAllVideos(): VideoMetadata[] {
  return allVideosData
}

/**
 * 公開日順(新しい順)でソートされた動画データを取得する
 * 初回呼び出し時にソート結果をキャッシュし、以降は同じ配列を返します。
 *
 * @returns 公開日順でソートされた動画データの配列(同じ参照)
 */
export function getLatestVideos(): VideoMetadata[] {
  if (cachedLatestVideos === null) {
    cachedLatestVideos = [...allVideosData].sort((a, b) => {
      return (
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      )
    })
  }
  return cachedLatestVideos
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
