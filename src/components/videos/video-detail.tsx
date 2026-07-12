import { CopyDescriptionButton } from "@/components/videos/copy-description-button"
import { VideoThumbnail } from "@/components/videos/video-thumbnail"
import { timestampToSeconds } from "@/lib/videos/timestamp"
import { getVideoById } from "@/lib/videos/video-data"
import type { CustomSection, VideoMetadata } from "@/types/video"
import Link from "next/link"

/**
 * 動画詳細表示コンポーネント
 *
 * メタデータを構造化 HTML で表示し、末尾に YouTube 概要欄への
 * コピー用プレーンテキストブロック（折りたたみ + コピーボタン）を置く。
 */

interface VideoDetailProps {
  /** 動画データ */
  video: VideoMetadata
}

/**
 * YouTube URL から動画 ID を抽出する（watch?v= / youtu.be 両対応）
 */
function extractYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{6,})/)
  return match ? match[1] : null
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
      // タイトルに中点「・」を付与（絵文字は使用しない）
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
 * セクション見出し
 */
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl/7 font-semibold text-gray-950 sm:text-2xl/8">
      {children}
    </h2>
  )
}

/**
 * 動画詳細コンポーネント（構造化表示 + コピー用ブロック）
 */
export function VideoDetail({ video }: VideoDetailProps) {
  const plainText = formatVideoAsPlainText(video)
  const publishedDate = video.publishedAt.slice(0, 10)

  return (
    <article className="mx-auto max-w-4xl">
      {/* サムネイルヒーロー（YouTube へのリンク。iframe は使わない） */}
      <a
        href={video.videoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group focus-visible:outline-accent relative block overflow-hidden rounded-2xl ring-1 ring-gray-950/5 focus-visible:outline-2 focus-visible:outline-offset-2"
        aria-label={`YouTubeで「${video.title}」を見る`}
      >
        <VideoThumbnail
          videoId={video.id}
          className="aspect-video w-full object-cover"
        />
      </a>

      {/* タイトルと公開日 */}
      <h1 className="font-display mt-8 text-3xl/tight font-bold tracking-tight text-gray-950 sm:text-4xl/tight">
        {video.title}
      </h1>
      <p className="mt-3 font-mono text-sm text-gray-500">{publishedDate}</p>

      {/* 冒頭セクション */}
      <div className="mt-6 space-y-1 text-base/7 text-gray-700">
        {video.opening.lines.map(line => (
          <p key={line}>{line}</p>
        ))}
      </div>

      {/* 学べる内容セクション */}
      <section className="mt-12">
        <SectionHeading>{video.learningPoints.title}</SectionHeading>
        <ul className="mt-4 space-y-2 text-base/7 text-gray-700">
          {video.learningPoints.items.map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      {/* タイムスタンプセクション（該当秒への YouTube リンク） */}
      {video.timestamps && (
        <section className="mt-12">
          <SectionHeading>{video.timestamps.title}</SectionHeading>
          <ul className="mt-4 space-y-2">
            {video.timestamps.items.map(timestamp => (
              <li
                key={`${timestamp.time}-${timestamp.label}`}
                className="flex items-baseline gap-3"
              >
                <a
                  href={`https://www.youtube.com/watch?v=${video.id}&t=${timestampToSeconds(timestamp.time)}s`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent decoration-accent/30 hover:decoration-accent focus-visible:outline-accent shrink-0 font-mono text-sm underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  {timestamp.time}
                </a>
                <span className="text-base/7 text-gray-700">
                  {timestamp.label}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 関連動画セクション（サイト内の動画は内部リンク） */}
      {video.relatedVideos && (
        <section className="mt-12">
          <SectionHeading>{video.relatedVideos.title}</SectionHeading>
          <ul className="mt-4 space-y-3">
            {video.relatedVideos.videos.map(relatedVideo => {
              const relatedId = extractYouTubeId(relatedVideo.url)
              const isInternal = relatedId
                ? Boolean(getVideoById(relatedId))
                : false
              const linkClassName =
                "text-base/7 font-medium text-gray-950 underline decoration-gray-950/20 underline-offset-4 hover:decoration-gray-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              return (
                <li key={relatedVideo.url}>
                  {isInternal && relatedId ? (
                    <Link
                      href={`/videos/${relatedId}`}
                      className={linkClassName}
                    >
                      {relatedVideo.title}
                    </Link>
                  ) : (
                    <a
                      href={relatedVideo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClassName}
                    >
                      {relatedVideo.title}
                    </a>
                  )}
                </li>
              )
            })}
          </ul>
        </section>
      )}

      {/* Udemy講座セクション */}
      {video.udemyCourses && (
        <section className="mt-12">
          <SectionHeading>{video.udemyCourses.title}</SectionHeading>
          {video.udemyCourses.description && (
            <p className="mt-4 text-base/7 text-gray-700">
              {video.udemyCourses.description}
            </p>
          )}
          {video.udemyCourses.courses &&
            video.udemyCourses.courses.length > 0 && (
              <ul className="mt-4 space-y-2 text-base/7 text-gray-700">
                {video.udemyCourses.courses.map(course => (
                  <li key={course}>{course}</li>
                ))}
              </ul>
            )}
          <p className="mt-4">
            <a
              href={video.udemyCourses.cta.url}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-visible:outline-accent text-base/7 font-medium text-gray-950 underline decoration-gray-950/20 underline-offset-4 hover:decoration-gray-950 focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              {video.udemyCourses.cta.text}
            </a>
          </p>
        </section>
      )}

      {/* タグ */}
      {video.tags.length > 0 && (
        <ul className="mt-12 flex flex-wrap gap-2">
          {video.tags.map(tag => (
            <li
              key={tag}
              className="rounded-full bg-gray-50 px-3 py-1 font-mono text-xs text-gray-600 ring-1 ring-gray-950/5"
            >
              #{tag}
            </li>
          ))}
        </ul>
      )}

      {/* YouTube概要欄コピー用ブロック（折りたたみ） */}
      <details className="mt-16 rounded-2xl bg-gray-50 p-6 ring-1 ring-gray-950/5">
        <summary className="cursor-pointer font-medium text-gray-950">
          YouTube概要欄コピー用テキスト
        </summary>
        <p className="mt-4 text-sm text-gray-600">
          この内容はYouTube概要欄へのコピー用プレーンテキストです
        </p>
        <div className="mt-4">
          <CopyDescriptionButton text={plainText} />
        </div>
        <pre className="mt-4 max-w-prose font-sans text-base leading-7 break-words whitespace-pre-wrap text-gray-950">
          {plainText}
        </pre>
      </details>
    </article>
  )
}
