import type { CustomSection, VideoMetadata } from "@/types/video"

/**
 * 動画詳細表示コンポーネント
 *
 * YouTube概要欄にコピペするためのプレーンテキスト形式で表示します。
 */

interface VideoDetailProps {
  /** 動画データ */
  video: VideoMetadata
}

/**
 * セクション区切り線（プレーンテキスト用）
 * 30文字に短縮して視覚的バランスを改善
 */
const SECTION_DIVIDER = "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

/**
 * カスタムセクションをプレーンテキストに変換
 */
function formatCustomSection(section: CustomSection): string {
  let result = `${section.title}\n\n`

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
      result += `${link.label}: ${link.url}\n`
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
        result += `${link.label}: ${link.url}\n`
      })
    }
  }

  return result
}

/**
 * 動画メタデータをプレーンテキストに変換
 */
function formatVideoAsPlainText(video: VideoMetadata): string {
  const publishedDate = new Date(video.publishedAt).toLocaleDateString(
    "ja-JP",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  )

  let text = ""

  // タイトルと公開日
  text += `${video.title}\n`
  text += `公開日: ${publishedDate}\n\n`
  text += `${SECTION_DIVIDER}\n\n`

  // 冒頭セクション
  video.opening.lines.forEach(line => {
    text += `${line}\n`
  })
  text += `\n${SECTION_DIVIDER}\n\n`

  // 学べる内容セクション
  text += `${video.learningPoints.title}\n\n`
  video.learningPoints.items.forEach(item => {
    text += `${item}\n`
  })
  text += "\n"

  // カスタムセクション
  if (video.customSections && video.customSections.length > 0) {
    video.customSections.forEach(section => {
      text += `${SECTION_DIVIDER}\n\n`
      text += formatCustomSection(section)
      text += "\n"
    })
  }

  // 関連動画セクション
  if (video.relatedVideos) {
    text += `${SECTION_DIVIDER}\n\n`
    text += `${video.relatedVideos.title}\n\n`
    video.relatedVideos.videos.forEach((relatedVideo, index) => {
      // タイトルに中点「・」を付与（絵文字は使用しない）
      text += `・${relatedVideo.title}\n`
      text += `${relatedVideo.url}\n`
      // 最後の動画でない場合は空白行を追加
      if (video.relatedVideos && index < video.relatedVideos.videos.length - 1) {
        text += "\n"
      }
    })
    text += "\n"
  }

  // Udemy講座セクション
  if (video.udemyCourses) {
    text += `${SECTION_DIVIDER}\n\n`
    text += `${video.udemyCourses.title}\n\n`
    if (video.udemyCourses.description) {
      text += `${video.udemyCourses.description}\n\n`
    }
    if (video.udemyCourses.courses && video.udemyCourses.courses.length > 0) {
      video.udemyCourses.courses.forEach(course => {
        text += `${course}\n`
      })
      text += "\n"
    }
    text += `${video.udemyCourses.cta.text}: ${video.udemyCourses.cta.url}\n\n`
  }

  // SNS・コミュニティセクション
  text += `${SECTION_DIVIDER}\n\n`
  text += `${video.social.title}\n\n`
  video.social.accounts.forEach(account => {
    const label = account.label || account.platform
    text += `${account.emoji} ${label}: ${account.url}\n`
  })
  text += "\n"

  // Discordコミュニティセクション
  if (video.discordCommunity) {
    text += `${SECTION_DIVIDER}\n\n`
    text += `${video.discordCommunity.title}\n\n`
    text += `${video.discordCommunity.description}\n\n`
    text += `Discordに参加する: ${video.discordCommunity.url}\n\n`
  }

  // タイムスタンプセクション
  text += `${SECTION_DIVIDER}\n\n`
  text += `${video.timestamps.title}\n\n`
  video.timestamps.items.forEach(timestamp => {
    text += `${timestamp.time} - ${timestamp.label}\n`
  })
  text += "\n"

  // タグ（#記号を自動付与）
  text += "\n"
  text += video.tags.map(tag => `#${tag}`).join(" ") + "\n\n"

  // エンゲージメント促進セクション
  text += `${SECTION_DIVIDER}\n\n`
  if (video.engagement.title) {
    text += `${video.engagement.title}\n\n`
  }
  text += `${video.engagement.message}\n\n`
  text += `${video.engagement.callToAction}\n`

  return text
}

/**
 * 動画詳細コンポーネント（プレーンテキスト表示）
 */
export function VideoDetail({ video }: VideoDetailProps) {
  const plainText = formatVideoAsPlainText(video)

  return (
    <div className="mx-auto max-w-4xl">
      <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
        <pre className="max-w-prose font-sans text-base leading-7 break-words whitespace-pre-wrap text-gray-950">
          {plainText}
        </pre>
      </div>
      <div className="mt-8 text-center text-sm text-gray-600">
        <p>この内容はYouTube概要欄へのコピー用プレーンテキストです</p>
      </div>
    </div>
  )
}
