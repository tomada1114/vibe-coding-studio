/**
 * 関連動画検索機能
 *
 * タグベースのスコアリングアルゴリズムで関連動画を検索します。
 */

import { VideoIndexError, VideoIndexErrorCode } from "./errors"
import { loadVideoIndex } from "./video-index-loader"

/**
 * 関連動画検索結果の型
 */
export interface RelatedVideo {
  id: string
  title: string
  score: number
}

/**
 * タグベースのスコアリングアルゴリズム
 *
 * @param inputTags - 検索対象のタグ配列
 * @param videoTags - 動画のタグ配列
 * @returns スコア（0以上の整数）
 */
export function calculateVideoScore(
  inputTags: string[],
  videoTags: string[]
): number {
  // 空のタグ配列の場合は0を返す
  if (inputTags.length === 0 || videoTags.length === 0) {
    return 0
  }

  let score = 0

  // 大文字小文字を無視するために正規化
  const normalizedInput = inputTags.map(t => t.toLowerCase())
  const normalizedVideo = videoTags.map(t => t.toLowerCase())

  // 完全一致タグ: 10ポイント/タグ
  const exactMatches = normalizedInput.filter(inputTag =>
    normalizedVideo.includes(inputTag)
  )
  score += exactMatches.length * 10

  // 部分一致タグ: 5ポイント/タグ（完全一致を除く）
  const partialMatches = normalizedInput.filter(inputTag => {
    // 完全一致は除外
    if (exactMatches.includes(inputTag)) {
      return false
    }

    // 部分一致を探す
    return normalizedVideo.some(
      videoTag => videoTag.includes(inputTag) || inputTag.includes(videoTag)
    )
  })
  score += partialMatches.length * 5

  // タグ数の類似性ボーナス: ±2以内で+2ポイント
  const tagCountDiff = Math.abs(inputTags.length - videoTags.length)
  if (tagCountDiff <= 2) {
    score += 2
  }

  return score
}

/**
 * 関連動画を検索する
 *
 * @param tags - 検索対象のタグ配列
 * @param currentVideoId - 除外する現在の動画ID（オプション）
 * @returns 関連動画の配列（上位3-5本）
 * @throws VideoIndexError タグ配列が空の場合
 */
export function findRelatedVideos(
  tags: string[],
  currentVideoId?: string
): RelatedVideo[] {
  // タグ配列が空の場合はエラー
  if (tags.length === 0) {
    throw new VideoIndexError(
      VideoIndexErrorCode.EMPTY_TAGS,
      "タグ配列が空です",
      { tags }
    )
  }

  // 動画インデックスを読み込む
  const videoIndex = loadVideoIndex()

  // 自分自身の動画を除外
  const videos = currentVideoId
    ? videoIndex.videos.filter(v => v.id !== currentVideoId)
    : videoIndex.videos

  // 各動画にスコアを計算
  const scoredVideos = videos.map(video => ({
    id: video.id,
    title: video.title,
    score: calculateVideoScore(tags, video.tags),
  }))

  // スコア降順でソート（同一スコアの場合は動画IDの辞書順）
  scoredVideos.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score
    }
    return a.id.localeCompare(b.id)
  })

  // スコアが0より大きい動画を抽出
  const validVideos = scoredVideos.filter(v => v.score > 0)

  // 関連動画が0件の場合、ランダムに5本を返す
  if (validVideos.length === 0) {
    // スコアが0の動画からランダムに5本選ぶ
    const randomVideos = scoredVideos
      .sort(() => Math.random() - 0.5)
      .slice(0, 5)
    return randomVideos
  }

  // 上位3-5本を返す（最低3本、最大5本）
  const count = Math.min(Math.max(validVideos.length, 3), 5)
  return validVideos.slice(0, count)
}
