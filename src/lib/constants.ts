/**
 * Discord Community Site - 定数管理
 *
 * Discord招待URLとソーシャルメディアリンクを一元管理
 */

/**
 * Discord招待URL
 */
export const DISCORD_INVITE_URL = "https://discord.gg/qZDRagzbVD" as const

/**
 * 拠点のタイムゾーン（IANA）。トップページの現在時刻表示に使う。
 * 拠点を移したらここだけを更新する（表示名は辞書の `hero.localTime.location`）。
 */
export const LOCAL_TIME_ZONE = "America/Denver" as const

/**
 * ソーシャルメディアリンク型定義
 */
export interface SocialLink {
  /** リンク名 */
  name: string
  /** リンク先URL */
  url: string
  /** アイコン種別（例: 'twitter', 'youtube', 'qiita', 'note', 'udemy'） */
  icon: string
}

/**
 * ソーシャルメディアリンク一覧
 */
export const SOCIAL_LINKS: readonly SocialLink[] = [
  {
    name: "X",
    url: "https://x.com/muscle_coding",
    icon: "twitter",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@vibe-coding-studio",
    icon: "youtube",
  },
  {
    name: "Qiita",
    url: "https://qiita.com/tomada",
    icon: "qiita",
  },
  {
    name: "note",
    url: "https://note.com/tomada",
    icon: "note",
  },
  {
    name: "Udemy",
    url: "/courses",
    icon: "udemy",
  },
] as const

/**
 * サイトメタデータ
 */
export const SITE_METADATA = {
  title: "Vibe Coding Studio",
  description:
    "AI駆動開発を学ぶ仲間が集まり、情報を共有し合い、一緒に成長するコミュニティ",
  url: "https://www.vibecodingstudio.dev",
} as const
