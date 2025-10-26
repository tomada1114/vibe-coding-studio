import type { CustomSection, VideoMetadata } from "@/types/video"
import { YouTubeEmbed } from "./youtube-embed"

/**
 * 動画詳細表示コンポーネント
 *
 * 概要欄の各セクションを整形して表示します。
 */

interface VideoDetailProps {
  /** 動画データ */
  video: VideoMetadata
}

/**
 * セクション区切り線コンポーネント
 */
function SectionDivider() {
  return <div className="my-8 border-t border-zinc-200 dark:border-zinc-800" />
}

/**
 * セクションタイトルコンポーネント
 */
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-white">
      {children}
    </h2>
  )
}

/**
 * リンクコンポーネント
 */
function ExternalLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
    >
      {children}
    </a>
  )
}

/**
 * カスタムセクション表示コンポーネント
 */
function CustomSectionDisplay({ section }: { section: CustomSection }) {
  return (
    <div>
      <SectionTitle>{section.title}</SectionTitle>

      {section.type === "text" && (
        <p className="text-zinc-700 dark:text-zinc-300">{section.content}</p>
      )}

      {section.type === "list" && (
        <ul className="list-disc space-y-2 pl-6 text-zinc-700 dark:text-zinc-300">
          {section.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}

      {section.type === "links" && (
        <ul className="space-y-2">
          {section.links.map((link, index) => (
            <li key={index}>
              <ExternalLink href={link.url}>{link.label}</ExternalLink>
            </li>
          ))}
        </ul>
      )}

      {section.type === "mixed" && (
        <div className="space-y-4">
          {section.content && (
            <p className="text-zinc-700 dark:text-zinc-300">
              {section.content}
            </p>
          )}
          {section.items && section.items.length > 0 && (
            <ul className="list-disc space-y-2 pl-6 text-zinc-700 dark:text-zinc-300">
              {section.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
          {section.links && section.links.length > 0 && (
            <ul className="space-y-2">
              {section.links.map((link, index) => (
                <li key={index}>
                  <ExternalLink href={link.url}>{link.label}</ExternalLink>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

/**
 * 動画詳細コンポーネント
 */
export function VideoDetail({ video }: VideoDetailProps) {
  const publishedDate = new Date(video.publishedAt).toLocaleDateString(
    "ja-JP",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  )

  return (
    <div className="mx-auto max-w-4xl">
      {/* 動画タイトルと公開日 */}
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-zinc-900 dark:text-white">
          {video.title}
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          公開日: {publishedDate}
        </p>
      </div>

      {/* YouTube埋め込みプレーヤー */}
      <div className="mb-8">
        <YouTubeEmbed videoUrl={video.videoUrl} title={video.title} />
      </div>

      <SectionDivider />

      {/* 冒頭セクション */}
      <div className="mb-8">
        {video.opening.lines.map((line, index) => (
          <p key={index} className="mb-2 text-zinc-700 dark:text-zinc-300">
            {line}
          </p>
        ))}
      </div>

      <SectionDivider />

      {/* 学べる内容セクション */}
      <div className="mb-8">
        <SectionTitle>{video.learningPoints.title}</SectionTitle>
        <ul className="space-y-2 text-zinc-700 dark:text-zinc-300">
          {video.learningPoints.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* カスタムセクション */}
      {video.customSections && video.customSections.length > 0 && (
        <>
          {video.customSections.map((section, index) => (
            <div key={index}>
              <SectionDivider />
              <div className="mb-8">
                <CustomSectionDisplay section={section} />
              </div>
            </div>
          ))}
        </>
      )}

      {/* 関連動画セクション */}
      {video.relatedVideos && (
        <>
          <SectionDivider />
          <div className="mb-8">
            <SectionTitle>{video.relatedVideos.title}</SectionTitle>
            <ul className="space-y-2">
              {video.relatedVideos.videos.map((relatedVideo, index) => (
                <li key={index}>
                  {relatedVideo.emoji && (
                    <span className="mr-2">{relatedVideo.emoji}</span>
                  )}
                  <ExternalLink href={relatedVideo.url}>
                    {relatedVideo.title}
                  </ExternalLink>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      {/* Udemy講座セクション */}
      {video.udemyCourses && (
        <>
          <SectionDivider />
          <div className="mb-8">
            <SectionTitle>{video.udemyCourses.title}</SectionTitle>
            {video.udemyCourses.description && (
              <p className="mb-4 text-zinc-700 dark:text-zinc-300">
                {video.udemyCourses.description}
              </p>
            )}
            {video.udemyCourses.courses &&
              video.udemyCourses.courses.length > 0 && (
                <ul className="mb-4 list-disc space-y-2 pl-6 text-zinc-700 dark:text-zinc-300">
                  {video.udemyCourses.courses.map((course, index) => (
                    <li key={index}>{course}</li>
                  ))}
                </ul>
              )}
            <div className="mt-4">
              <ExternalLink href={video.udemyCourses.cta.url}>
                {video.udemyCourses.cta.text}
              </ExternalLink>
            </div>
          </div>
        </>
      )}

      {/* SNS・コミュニティセクション */}
      <SectionDivider />
      <div className="mb-8">
        <SectionTitle>{video.social.title}</SectionTitle>
        <ul className="space-y-2">
          {video.social.accounts.map((account, index) => (
            <li key={index}>
              <span className="mr-2">{account.emoji}</span>
              <ExternalLink href={account.url}>
                {account.label || account.platform}
              </ExternalLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Discordコミュニティセクション */}
      {video.discordCommunity && (
        <>
          <SectionDivider />
          <div className="mb-8">
            <SectionTitle>{video.discordCommunity.title}</SectionTitle>
            <p className="mb-4 text-zinc-700 dark:text-zinc-300">
              {video.discordCommunity.description}
            </p>
            <ExternalLink href={video.discordCommunity.url}>
              Discordに参加する
            </ExternalLink>
          </div>
        </>
      )}

      {/* タイムスタンプセクション */}
      <SectionDivider />
      <div className="mb-8">
        <SectionTitle>{video.timestamps.title}</SectionTitle>
        <ul className="space-y-2 text-zinc-700 dark:text-zinc-300">
          {video.timestamps.items.map((timestamp, index) => (
            <li key={index}>
              <span className="font-mono text-sm font-semibold">
                {timestamp.time}
              </span>{" "}
              - {timestamp.label}
            </li>
          ))}
        </ul>
      </div>

      {/* タグ */}
      <SectionDivider />
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {video.tags.map((tag, index) => (
            <span
              key={index}
              className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* エンゲージメント促進セクション */}
      <SectionDivider />
      <div className="mb-8">
        {video.engagement.title && (
          <SectionTitle>{video.engagement.title}</SectionTitle>
        )}
        <p className="mb-4 whitespace-pre-line text-zinc-700 dark:text-zinc-300">
          {video.engagement.message}
        </p>
        <p className="text-zinc-700 dark:text-zinc-300">
          {video.engagement.callToAction}
        </p>
      </div>
    </div>
  )
}
