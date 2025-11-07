import { writeFileSync, mkdirSync } from "fs"
import { join } from "path"
import { getAllVideos } from "../src/lib/videos/video-data"
import type {
  VideoMetadata,
  CustomSection,
  TimestampItem,
  RelatedVideo,
} from "../src/types/video"

/**
 * ファイル名として使用できない文字を置き換える
 */
function sanitizeFilename(filename: string): string {
  return filename.replace(/[/\\:*?"<>|]/g, "_")
}

/**
 * VideoMetadataからマークダウンコンテンツを生成
 */
function generateMarkdownContent(video: VideoMetadata): string {
  const lines: string[] = []

  // タイトル
  lines.push(`# ${video.title}`)
  lines.push("")

  // 動画ID
  lines.push(`**Video ID:** ${video.id}`)
  lines.push("")

  // 区切り線
  lines.push("---")
  lines.push("")

  // 冒頭セクション
  if (video.opening?.lines && video.opening.lines.length > 0) {
    video.opening.lines.forEach(line => {
      lines.push(line)
    })
    lines.push("")
  }

  // 学べる内容セクション
  if (video.learningPoints) {
    lines.push(`## ${video.learningPoints.title}`)
    lines.push("")
    video.learningPoints.items.forEach(item => {
      lines.push(item)
    })
    lines.push("")
  }

  // タイムスタンプセクション
  if (video.timestamps && video.timestamps.items.length > 0) {
    lines.push(`## ${video.timestamps.title}`)
    lines.push("")
    video.timestamps.items.forEach((item: TimestampItem) => {
      lines.push(`${item.time} ${item.label}`)
    })
    lines.push("")
  }

  // 関連動画セクション
  if (video.relatedVideos && video.relatedVideos.videos.length > 0) {
    lines.push(`## ${video.relatedVideos.title}`)
    lines.push("")
    video.relatedVideos.videos.forEach((relatedVideo: RelatedVideo) => {
      const emoji = relatedVideo.emoji ? `${relatedVideo.emoji} ` : ""
      lines.push(`${emoji}[${relatedVideo.title}](${relatedVideo.url})`)
    })
    lines.push("")
  }

  // Udemy講座セクション
  if (video.udemyCourses) {
    lines.push(`## ${video.udemyCourses.title}`)
    lines.push("")

    if (video.udemyCourses.description) {
      lines.push(video.udemyCourses.description)
      lines.push("")
    }

    if (video.udemyCourses.courses && video.udemyCourses.courses.length > 0) {
      video.udemyCourses.courses.forEach(course => {
        lines.push(`- ${course}`)
      })
      lines.push("")
    }

    lines.push(`[${video.udemyCourses.cta.text}](${video.udemyCourses.cta.url})`)
    lines.push("")
  }

  // カスタムセクション
  if (video.customSections && video.customSections.length > 0) {
    video.customSections.forEach((section: CustomSection) => {
      lines.push(`## ${section.title}`)
      lines.push("")

      switch (section.type) {
        case "text":
          lines.push(section.content)
          break
        case "list":
          section.items.forEach(item => {
            lines.push(`- ${item}`)
          })
          break
        case "links":
          section.links.forEach(link => {
            lines.push(`[${link.label}](${link.url})`)
          })
          break
        case "mixed":
          if (section.content) {
            lines.push(section.content)
            lines.push("")
          }
          if (section.items) {
            section.items.forEach(item => {
              lines.push(`- ${item}`)
            })
            lines.push("")
          }
          if (section.links) {
            section.links.forEach(link => {
              lines.push(`[${link.label}](${link.url})`)
            })
          }
          break
      }

      lines.push("")
    })
  }

  // SNS・コミュニティセクション
  if (video.social) {
    lines.push(`## ${video.social.title}`)
    lines.push("")
    video.social.accounts.forEach(account => {
      const label = account.label || account.platform
      lines.push(`${account.emoji} [${label}](${account.url})`)
    })
    lines.push("")
  }

  // Discordコミュニティセクション
  if (video.discordCommunity) {
    lines.push(`## ${video.discordCommunity.title}`)
    lines.push("")
    lines.push(video.discordCommunity.description)
    lines.push("")
    lines.push(`[Discordに参加する](${video.discordCommunity.url})`)
    lines.push("")
  }

  // エンゲージメントセクション
  if (video.engagement) {
    if (video.engagement.title) {
      lines.push(`## ${video.engagement.title}`)
      lines.push("")
    }
    lines.push(video.engagement.message)
    lines.push("")
    lines.push(video.engagement.callToAction)
    lines.push("")
  }

  return lines.join("\n")
}

/**
 * メイン処理
 */
function main() {
  const videos = getAllVideos()
  const outputDir = join(process.cwd(), ".output", "videos-markdown")

  // 出力ディレクトリを作成
  mkdirSync(outputDir, { recursive: true })

  console.log(`📝 ${videos.length}個の動画をマークダウンに変換中...`)

  let successCount = 0
  let errorCount = 0

  videos.forEach(video => {
    try {
      const content = generateMarkdownContent(video)
      const filename = sanitizeFilename(video.title) + ".md"
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
