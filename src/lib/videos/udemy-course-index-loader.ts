/**
 * Udemy講座インデックスローダー
 *
 * udemy-course-index.jsonを読み込み、UdemyCourseIndex型のデータを返します。
 * エラー時にはフォールバックデータを提供します。
 */

import { readFileSync } from "fs"
import { join } from "path"
import type { UdemyCourseIndex } from "@/types/udemy-course-index"
import { UdemyCourseIndexError, UdemyCourseIndexErrorCode } from "./errors"

const UDEMY_COURSE_INDEX_PATH = join(
  process.cwd(),
  "src/data/indexes/udemy-course-index.json",
)

/**
 * Udemy講座インデックスをメモリに読み込む
 *
 * @returns UdemyCourseIndex型のデータ
 * @throws UdemyCourseIndexError インデックスファイルが存在しない、または不正な形式の場合
 */
export function loadUdemyCourseIndex(): UdemyCourseIndex {
  try {
    // インデックスファイルを読み込む
    const fileContent = readFileSync(UDEMY_COURSE_INDEX_PATH, "utf-8")

    // JSONをパースする
    const parsed = JSON.parse(fileContent) as UdemyCourseIndex

    // 基本的なスキーマ検証
    if (
      !parsed.version ||
      !parsed.generatedAt ||
      !Array.isArray(parsed.courses) ||
      !parsed.topicMapping ||
      typeof parsed.topicMapping !== "object"
    ) {
      throw new UdemyCourseIndexError(
        UdemyCourseIndexErrorCode.SCHEMA_VIOLATION,
        "インデックスファイルが正しい構造を持っていません",
        { parsed },
      )
    }

    // courses配列の各要素が正しい構造を持つか検証
    for (const course of parsed.courses) {
      if (
        !course.courseId ||
        !course.title ||
        !Array.isArray(course.topics) ||
        !course.promotionUrl ||
        !course.description
      ) {
        throw new UdemyCourseIndexError(
          UdemyCourseIndexErrorCode.SCHEMA_VIOLATION,
          "講座インデックスエントリが正しい構造を持っていません",
          { course },
        )
      }
    }

    // topicMappingの各エントリが正しい構造を持つか検証
    for (const [topic, mappings] of Object.entries(parsed.topicMapping)) {
      if (!Array.isArray(mappings)) {
        throw new UdemyCourseIndexError(
          UdemyCourseIndexErrorCode.SCHEMA_VIOLATION,
          `トピックマッピング "${topic}" が配列ではありません`,
          { topic, mappings },
        )
      }

      for (const mapping of mappings) {
        if (!mapping.courseId || !mapping.url) {
          throw new UdemyCourseIndexError(
            UdemyCourseIndexErrorCode.SCHEMA_VIOLATION,
            `トピックマッピング "${topic}" のエントリが正しい構造を持っていません`,
            { topic, mapping },
          )
        }
      }
    }

    return parsed
  } catch (error) {
    // ファイルが存在しない場合
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      throw new UdemyCourseIndexError(
        UdemyCourseIndexErrorCode.INDEX_NOT_FOUND,
        "Udemy講座インデックスファイルが見つかりません",
        { path: UDEMY_COURSE_INDEX_PATH },
      )
    }

    // JSONパースエラー
    if (error instanceof SyntaxError) {
      throw new UdemyCourseIndexError(
        UdemyCourseIndexErrorCode.INVALID_JSON,
        "Udemy講座インデックスファイルのJSON形式が不正です",
        { path: UDEMY_COURSE_INDEX_PATH, originalError: error.message },
      )
    }

    // その他のUdemyCourseIndexError（スキーマ違反など）
    if (error instanceof UdemyCourseIndexError) {
      throw error
    }

    // 予期しないエラー
    throw new UdemyCourseIndexError(
      UdemyCourseIndexErrorCode.INVALID_COURSE_DATA,
      "Udemy講座インデックスの読み込み中に予期しないエラーが発生しました",
      { originalError: error instanceof Error ? error.message : String(error) },
    )
  }
}

/**
 * Udemy講座インデックスを読み込み、エラー時にはフォールバックデータを返す
 *
 * @returns UdemyCourseIndex型のデータ、またはエラー時の空のインデックス
 */
export function loadUdemyCourseIndexSafe(): UdemyCourseIndex {
  try {
    return loadUdemyCourseIndex()
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(
      "Udemy講座インデックスの読み込みに失敗しました。空のインデックスを返します。",
    )
    // eslint-disable-next-line no-console
    console.warn(error)

    // フォールバックデータ（空のインデックス）を返す
    return {
      version: "1.0.0",
      generatedAt: new Date().toISOString(),
      courses: [],
      topicMapping: {},
    }
  }
}
