/**
 * YouTube埋め込みプレーヤーコンポーネント
 *
 * レスポンシブ対応で、16:9のアスペクト比を保持します。
 * アクセシビリティのためにtitle属性を設定します。
 */

interface YouTubeEmbedProps {
  /** YouTube動画URL */
  videoUrl: string
  /** 動画タイトル(アクセシビリティ用) */
  title: string
}

/**
 * YouTube URLからビデオIDを抽出する
 *
 * @param url - YouTube動画URL
 * @returns ビデオID、抽出に失敗した場合はnull
 */
function extractVideoId(url: string): string | null {
  // youtu.be形式: https://youtu.be/VIDEO_ID
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/)
  if (shortMatch) {
    return shortMatch[1]
  }

  // youtube.com形式: https://www.youtube.com/watch?v=VIDEO_ID
  const longMatch = url.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/)
  if (longMatch) {
    return longMatch[1]
  }

  return null
}

/**
 * ビデオIDからEmbed URLを生成する
 *
 * @param videoId - YouTubeビデオID
 * @returns Embed URL
 */
function getEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}`
}

/**
 * YouTube埋め込みプレーヤーコンポーネント
 */
export function YouTubeEmbed({ videoUrl, title }: YouTubeEmbedProps) {
  const videoId = extractVideoId(videoUrl)

  if (!videoId) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-lg bg-zinc-900 text-white">
        <p>動画のURLが無効です</p>
      </div>
    )
  }

  const embedUrl = getEmbedUrl(videoId)

  return (
    <div className="aspect-video overflow-hidden rounded-lg">
      <iframe
        src={embedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="h-full w-full"
      />
    </div>
  )
}
