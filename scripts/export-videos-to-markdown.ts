import { writeFileSync, mkdirSync } from "fs"
import { join } from "path"
import { getAllVideos } from "../src/lib/videos/video-data"
import type { VideoMetadata, CustomSection } from "../src/types/video"

/**
 * ファイル名として使用できない文字を置き換える
 */
function sanitizeFilename(filename: string): string {
  return filename.replace(/[/\\:*?"<>|]/g, "_")
}

/**
 * セクション区切り線（プレーンテキスト用）
 */
const SECTION_DIVIDER = "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

/**
 * カスタムセクションをプレーンテキストに変換
 */
function formatCustomSection(section: CustomSection): string {
  let result = `${section.title}\n${SECTION_DIVIDER}\n`

  if (section.type === "text") {
    result += `${section.content}\n`
  }

  if (section.type === "list" && section.items) {
    section.items.forEach(item => {
      result += `${item}\n`
    })
  }

  if (section.type === "links" && section.links) {
    section.links.forEach(link => {
      result += `${link.label}\n${link.url}\n`
    })
  }

  if (section.type === "mixed") {
    if (section.content) {
      result += `${section.content}\n\n`
    }
    if (section.items && section.items.length > 0) {
      section.items.forEach(item => {
        result += `${item}\n`
      })
      result += "\n"
    }
    if (section.links && section.links.length > 0) {
      section.links.forEach(link => {
        result += `${link.label}\n${link.url}\n`
      })
    }
  }

  return result
}

/**
 * VideoMetadataをYouTube概要欄用のプレーンテキストに変換
 * （既存のVideoDetailコンポーネントのロジックを使用、公開日を除外）
 */
function formatVideoAsPlainText(video: VideoMetadata): string {
  let text = ""

  // タイトルと動画ID
  text += `${video.title}\n`
  text += `Video ID: ${video.id}\n\n`
  text += `${SECTION_DIVIDER}\n\n`

  // 冒頭セクション
  video.opening.lines.forEach(line => {
    text += `${line}\n`
  })
  text += `\n${SECTION_DIVIDER}\n`

  // 学べる内容セクション
  text += `${video.learningPoints.title}\n${SECTION_DIVIDER}\n`
  video.learningPoints.items.forEach(item => {
    text += `${item}\n`
  })
  text += "\n"

  // カスタムセクション
  if (video.customSections && video.customSections.length > 0) {
    video.customSections.forEach(section => {
      text += `${SECTION_DIVIDER}\n`
      text += formatCustomSection(section)
      text += "\n"
    })
  }

  // 関連動画セクション
  if (video.relatedVideos) {
    text += `${SECTION_DIVIDER}\n`
    text += `${video.relatedVideos.title}\n${SECTION_DIVIDER}\n`
    video.relatedVideos.videos.forEach((relatedVideo, index) => {
      // タイトルに中点「・」を付与
      text += `・${relatedVideo.title}\n`
      text += `${relatedVideo.url}\n`
      // 最後の動画でない場合は空白行を追加
      if (
        video.relatedVideos &&
        index < video.relatedVideos.videos.length - 1
      ) {
        text += "\n"
      }
    })
    text += "\n"
  }

  // Udemy講座セクション
  if (video.udemyCourses) {
    text += `${SECTION_DIVIDER}\n`
    text += `${video.udemyCourses.title}\n${SECTION_DIVIDER}\n`
    if (video.udemyCourses.description) {
      text += `${video.udemyCourses.description}\n\n`
    }
    if (video.udemyCourses.courses && video.udemyCourses.courses.length > 0) {
      video.udemyCourses.courses.forEach(course => {
        text += `・${course}\n`
      })
      text += "\n"
    }
    text += `${video.udemyCourses.cta.text}\n${video.udemyCourses.cta.url}\n\n`
  }

  // SNS・コミュニティセクション
  text += `${SECTION_DIVIDER}\n`
  text += `${video.social.title}\n${SECTION_DIVIDER}\n`
  video.social.accounts.forEach(account => {
    const label = account.label || account.platform
    text += `${account.emoji} ${label}\n${account.url}\n`
  })
  text += "\n"

  // Discordコミュニティセクション
  if (video.discordCommunity) {
    text += `${SECTION_DIVIDER}\n`
    text += `${video.discordCommunity.title}\n${SECTION_DIVIDER}\n`
    text += `${video.discordCommunity.description}\n\n`
    text += `Discordに参加する\n${video.discordCommunity.url}\n\n`
  }

  // タイムスタンプセクション（オプショナル）
  if (video.timestamps) {
    text += `${SECTION_DIVIDER}\n`
    text += `${video.timestamps.title}\n${SECTION_DIVIDER}\n`
    video.timestamps.items.forEach(timestamp => {
      text += `${timestamp.time} ${timestamp.label}\n`
    })
    text += "\n"
  }

  // エンゲージメント促進セクション
  text += `${SECTION_DIVIDER}\n`
  if (video.engagement.title) {
    text += `${video.engagement.title}\n${SECTION_DIVIDER}\n`
  }
  text += `${video.engagement.message}\n\n`
  text += `${video.engagement.callToAction}\n\n`

  // タグ（#記号を自動付与）
  text += "\n"
  text += video.tags.map(tag => `#${tag}`).join(" ") + "\n"

  return text
}

/**
 * メイン処理
 */
function main() {
  const videos = getAllVideos()
  const outputDir = join(process.cwd(), ".output", "videos-plaintext")

  // 出力ディレクトリを作成
  mkdirSync(outputDir, { recursive: true })

  console.log(`📝 ${videos.length}個の動画をプレーンテキストに変換中...`)

  let successCount = 0
  let errorCount = 0

  videos.forEach(video => {
    try {
      const content = formatVideoAsPlainText(video)
      const filename = sanitizeFilename(video.title) + ".txt"
      const filepath = join(outputDir, filename)

      writeFileSync(filepath, content, "utf-8")
      console.log(`✅ ${filename}`)
      successCount++
    } catch (error) {
      console.error(`❌ エラー: ${video.title}`)
      console.error(error)
      errorCount++
    }
  })

  console.log("")
  console.log(`🎉 完了！`)
  console.log(`✅ 成功: ${successCount}個`)
  if (errorCount > 0) {
    console.log(`❌ 失敗: ${errorCount}個`)
  }
  console.log(`📁 出力先: ${outputDir}`)
}

// スクリプト実行
main()
