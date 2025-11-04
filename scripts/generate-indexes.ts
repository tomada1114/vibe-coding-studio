#!/usr/bin/env tsx
/**
 * インデックス生成スクリプト
 *
 * 動画インデックスとUdemy講座インデックスを生成し、JSONファイルとして保存します。
 */

import { writeFileSync, mkdirSync } from "fs"
import { join } from "path"
import { generateVideoIndex } from "../src/lib/videos/video-index-generator"
import { generateUdemyCourseIndex } from "../src/lib/videos/udemy-course-index-generator"

const INDEXES_DIR = join(process.cwd(), "src/data/indexes")
const VIDEO_INDEX_PATH = join(INDEXES_DIR, "video-index.json")
const UDEMY_COURSE_INDEX_PATH = join(INDEXES_DIR, "udemy-course-index.json")

function main() {
  console.log("📊 インデックスを生成中...")

  try {
    // インデックスディレクトリを作成（存在しない場合）
    mkdirSync(INDEXES_DIR, { recursive: true })

    // 動画インデックスを生成
    console.log("🎬 動画インデックスを生成中...")
    const videoIndex = generateVideoIndex()
    writeFileSync(VIDEO_INDEX_PATH, JSON.stringify(videoIndex, null, 2), "utf-8")
    console.log(`✅ 動画インデックスを生成しました: ${videoIndex.videos.length}本`)

    // Udemy講座インデックスを生成
    console.log("📚 Udemy講座インデックスを生成中...")
    const udemyIndex = generateUdemyCourseIndex()
    writeFileSync(
      UDEMY_COURSE_INDEX_PATH,
      JSON.stringify(udemyIndex, null, 2),
      "utf-8",
    )
    console.log(`✅ Udemy講座インデックスを生成しました: ${udemyIndex.courses.length}講座`)

    console.log("🎉 すべてのインデックスを生成しました！")
    process.exit(0)
  } catch (error) {
    console.error("❌ インデックス生成中にエラーが発生しました:")
    console.error(error)
    process.exit(1)
  }
}

main()
