#!/usr/bin/env node

/**
 * インデックスファイル検証スクリプト
 *
 * 動画インデックスとUdemy講座インデックスの存在と形式を検証します。
 */

import fs from "fs"
import path from "path"
import type { UdemyCourseIndex } from "../src/types/udemy-course-index"
import type { VideoIndex } from "../src/types/video-index"

// ANSI色コード
const COLORS = {
  RESET: "\x1b[0m",
  CYAN: "\x1b[36m",
  GREEN: "\x1b[32m",
  RED: "\x1b[31m",
  YELLOW: "\x1b[33m",
}

function log(message: string, color: string = COLORS.RESET) {
  console.log(`${color}${message}${COLORS.RESET}`)
}

/**
 * インデックスファイルを検証する
 */
function validateIndexes(): boolean {
  log("🔍 インデックスファイルを検証中...", COLORS.CYAN)

  const indexesDir = path.join(process.cwd(), "src", "data", "indexes")
  const videoIndexPath = path.join(indexesDir, "video-index.json")
  const udemyCourseIndexPath = path.join(indexesDir, "udemy-course-index.json")

  let hasErrors = false

  // 動画インデックスの検証
  log("\n📹 動画インデックスを検証中...", COLORS.CYAN)

  if (!fs.existsSync(videoIndexPath)) {
    log("❌ video-index.json が見つかりません。", COLORS.RED)
    log(
      "💡 npm run generate:indexes を実行してインデックスを生成してください。",
      COLORS.YELLOW
    )
    hasErrors = true
  } else {
    try {
      const videoIndexContent = fs.readFileSync(videoIndexPath, "utf-8")
      const videoIndex: VideoIndex = JSON.parse(videoIndexContent)

      // 必須フィールドの存在チェック
      if (!videoIndex.version) {
        log(
          "❌ video-index.json に version フィールドがありません。",
          COLORS.RED
        )
        hasErrors = true
      }

      if (!videoIndex.generatedAt) {
        log(
          "❌ video-index.json に generatedAt フィールドがありません。",
          COLORS.RED
        )
        hasErrors = true
      }

      if (!Array.isArray(videoIndex.videos)) {
        log(
          "❌ video-index.json の videos フィールドが配列ではありません。",
          COLORS.RED
        )
        hasErrors = true
      } else {
        log(
          `✅ 動画インデックス: ${videoIndex.videos.length} 件の動画が登録されています。`,
          COLORS.GREEN
        )

        // 各動画エントリの検証
        videoIndex.videos.forEach((video, index) => {
          if (!video.id) {
            log(`❌ 動画 [${index}] に id フィールドがありません。`, COLORS.RED)
            hasErrors = true
          }

          if (!video.title) {
            log(
              `❌ 動画 [${index}] に title フィールドがありません。`,
              COLORS.RED
            )
            hasErrors = true
          }

          if (!Array.isArray(video.tags)) {
            log(
              `❌ 動画 [${index}] の tags フィールドが配列ではありません。`,
              COLORS.RED
            )
            hasErrors = true
          }
        })
      }

      if (!hasErrors) {
        log("✅ video-index.json は有効です。", COLORS.GREEN)
      }
    } catch (error) {
      log(
        "❌ video-index.json の解析に失敗しました。不正なJSON形式です。",
        COLORS.RED
      )
      console.error(error)
      hasErrors = true
    }
  }

  // Udemy講座インデックスの検証
  log("\n🎓 Udemy講座インデックスを検証中...", COLORS.CYAN)

  if (!fs.existsSync(udemyCourseIndexPath)) {
    log("❌ udemy-course-index.json が見つかりません。", COLORS.RED)
    log(
      "💡 npm run generate:indexes を実行してインデックスを生成してください。",
      COLORS.YELLOW
    )
    hasErrors = true
  } else {
    try {
      const udemyCourseIndexContent = fs.readFileSync(
        udemyCourseIndexPath,
        "utf-8"
      )
      const udemyCourseIndex: UdemyCourseIndex = JSON.parse(
        udemyCourseIndexContent
      )

      // 必須フィールドの存在チェック
      if (!udemyCourseIndex.version) {
        log(
          "❌ udemy-course-index.json に version フィールドがありません。",
          COLORS.RED
        )
        hasErrors = true
      }

      if (!udemyCourseIndex.generatedAt) {
        log(
          "❌ udemy-course-index.json に generatedAt フィールドがありません。",
          COLORS.RED
        )
        hasErrors = true
      }

      if (!Array.isArray(udemyCourseIndex.courses)) {
        log(
          "❌ udemy-course-index.json の courses フィールドが配列ではありません。",
          COLORS.RED
        )
        hasErrors = true
      } else {
        log(
          `✅ Udemy講座インデックス: ${udemyCourseIndex.courses.length} 件の講座が登録されています。`,
          COLORS.GREEN
        )

        // 各講座エントリの検証
        udemyCourseIndex.courses.forEach((course, index) => {
          if (!course.courseId) {
            log(
              `❌ 講座 [${index}] に courseId フィールドがありません。`,
              COLORS.RED
            )
            hasErrors = true
          }

          if (!course.title) {
            log(
              `❌ 講座 [${index}] に title フィールドがありません。`,
              COLORS.RED
            )
            hasErrors = true
          }

          if (!Array.isArray(course.topics)) {
            log(
              `❌ 講座 [${index}] の topics フィールドが配列ではありません。`,
              COLORS.RED
            )
            hasErrors = true
          }
        })
      }

      if (!udemyCourseIndex.topicMapping) {
        log(
          "⚠️  udemy-course-index.json に topicMapping フィールドがありません。",
          COLORS.YELLOW
        )
      }

      if (!hasErrors) {
        log("✅ udemy-course-index.json は有効です。", COLORS.GREEN)
      }
    } catch (error) {
      log(
        "❌ udemy-course-index.json の解析に失敗しました。不正なJSON形式です。",
        COLORS.RED
      )
      console.error(error)
      hasErrors = true
    }
  }

  // 最終結果
  log("", COLORS.RESET)

  if (hasErrors) {
    log("❌ インデックスファイルの検証に失敗しました。", COLORS.RED)
    log("💡 上記のエラーを修正してから再度検証してください。", COLORS.YELLOW)
    return false
  } else {
    log("✅ すべてのインデックスファイルが有効です！", COLORS.GREEN)
    return true
  }
}

/**
 * メイン処理
 */
function main() {
  const isValid = validateIndexes()

  if (!isValid) {
    process.exit(1)
  }
}

main()
