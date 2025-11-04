/**
 * 動画インデックスローダー
 *
 * video-index.jsonを読み込み、VideoIndex型のデータを返します。
 * エラー時にはフォールバックデータを提供します。
 */

import type { VideoIndex } from "@/types/video-index"
import { readFileSync } from "fs"
import { join } from "path"
import { VideoIndexError, VideoIndexErrorCode } from "./errors"

const VIDEO_INDEX_PATH = join(
  process.cwd(),
  "src/data/indexes/video-index.json"
)

/**
 * 動画インデックスをメモリに読み込む
 *
 * @returns VideoIndex型のデータ
 * @throws VideoIndexError インデックスファイルが存在しない、または不正な形式の場合
 */
export function loadVideoIndex(): VideoIndex {
  try {
    // インデックスファイルを読み込む
    const fileContent = readFileSync(VIDEO_INDEX_PATH, "utf-8")

    // JSONをパースする
    const parsed = JSON.parse(fileContent) as VideoIndex

    // 基本的なスキーマ検証
    if (
      !parsed.version ||
      !parsed.generatedAt ||
      !Array.isArray(parsed.videos)
    ) {
      throw new VideoIndexError(
        VideoIndexErrorCode.SCHEMA_VIOLATION,
        "インデックスファイルが正しい構造を持っていません",
        { parsed }
      )
    }

    // videos配列の各要素が正しい構造を持つか検証
    for (const video of parsed.videos) {
      if (
        !video.id ||
        !video.title ||
        !Array.isArray(video.tags) ||
        !Array.isArray(video.relatedVideoIds) ||
        !Array.isArray(video.udemyCourseIds)
      ) {
        throw new VideoIndexError(
          VideoIndexErrorCode.SCHEMA_VIOLATION,
          "動画インデックスエントリが正しい構造を持っていません",
          { video }
        )
      }
    }

    return parsed
  } catch (error) {
    // ファイルが存在しない場合
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      throw new VideoIndexError(
        VideoIndexErrorCode.INDEX_NOT_FOUND,
        "動画インデックスファイルが見つかりません",
        { path: VIDEO_INDEX_PATH }
      )
    }

    // JSONパースエラー
    if (error instanceof SyntaxError) {
      throw new VideoIndexError(
        VideoIndexErrorCode.INVALID_JSON,
        "動画インデックスファイルのJSON形式が不正です",
        { path: VIDEO_INDEX_PATH, originalError: error.message }
      )
    }

    // その他のVideoIndexError（スキーマ違反など）
    if (error instanceof VideoIndexError) {
      throw error
    }

    // 予期しないエラー
    throw new VideoIndexError(
      VideoIndexErrorCode.INVALID_VIDEO_DATA,
      "動画インデックスの読み込み中に予期しないエラーが発生しました",
      { originalError: error instanceof Error ? error.message : String(error) }
    )
  }
}

/**
 * 動画インデックスを読み込み、エラー時にはフォールバックデータを返す
 *
 * @returns VideoIndex型のデータ、またはエラー時の空のインデックス
 */
export function loadVideoIndexSafe(): VideoIndex {
  try {
    return loadVideoIndex()
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(
      "動画インデックスの読み込みに失敗しました。空のインデックスを返します。"
    )
    // eslint-disable-next-line no-console
    console.warn(error)

    // フォールバックデータ（空のインデックス）を返す
    return {
      version: "1.0.0",
      generatedAt: new Date().toISOString(),
      videos: [],
    }
  }
}
