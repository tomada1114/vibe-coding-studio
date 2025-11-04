/**
 * 動画インデックス生成機能
 *
 * 既存の動画データファイルから検索用のインデックスを生成します。
 */

import type { VideoMetadata } from "@/types/video"
import type { VideoIndex, VideoIndexItem } from "@/types/video-index"
import { VideoIndexError, VideoIndexErrorCode } from "./errors"
import { getAllVideos } from "./video-data"

/**
 * 動画データからVideoIndexItemを生成する
 *
 * @param video - 動画メタデータ
 * @returns VideoIndexItem
 */
function createVideoIndexItem(video: VideoMetadata): VideoIndexItem {
  // 関連動画IDを抽出（relatedVideosセクションが存在する場合）
  const relatedVideoIds: string[] = []
  if (video.relatedVideos?.videos) {
    for (const relatedVideo of video.relatedVideos.videos) {
      // URLから動画IDを抽出（例: "https://www.youtube.com/watch?v=VIDEO_ID"）
      const match = relatedVideo.url.match(/[?&]v=([^&]+)/)
      if (match?.[1]) {
        relatedVideoIds.push(match[1])
      }
    }
  }

  // Udemy講座IDを抽出（udemyCoursesセクションが存在する場合）
  const udemyCourseIds: string[] = []
  if (video.udemyCourses) {
    // cta.url から講座IDを抽出（例: "/coupons?topic=claude-code" または "/coupons"）
    // 現時点では、直接的な講座IDは動画データには含まれていないため、空配列を返す
    // 将来的に講座IDが動画データに追加された場合は、ここで抽出する
  }

  return {
    id: video.id,
    title: video.title,
    tags: video.tags,
    relatedVideoIds,
    udemyCourseIds,
  }
}

/**
 * 動画インデックスを生成する
 *
 * @returns VideoIndex
 * @throws VideoIndexError 動画データが存在しない場合
 */
export function generateVideoIndex(): VideoIndex {
  // すべての動画データを取得
  const allVideos = getAllVideos()

  // 動画データが0件の場合はエラーをスローする
  if (allVideos.length === 0) {
    throw new VideoIndexError(
      VideoIndexErrorCode.NO_VIDEO_FILES,
      "動画データファイルが見つかりません",
      { videoCount: 0 }
    )
  }

  // 各動画からVideoIndexItemを生成
  const videoIndexItems = allVideos.map(video => createVideoIndexItem(video))

  // VideoIndexを構築
  const videoIndex: VideoIndex = {
    version: "1.0.0",
    generatedAt: new Date().toISOString(),
    videos: videoIndexItems,
  }

  return videoIndex
}
