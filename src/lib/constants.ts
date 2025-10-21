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
    name: "Twitter",
    url: "https://twitter.com/tomadatech",
    icon: "twitter",
  },
  {
    name: "YouTube",
    url: "https://youtube.com/@tomadatech",
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
    url: "https://udemy.com/user/tomada",
    icon: "udemy",
  },
] as const

/**
 * サイトメタデータ
 */
export const SITE_METADATA = {
  title: "Vibe Coding Studio",
  description:
    "AI駆動開発を学ぶ仲間が集まり、とまだの最新検証を見ながら一緒に成長するコミュニティ",
  url: "https://vibecoding.studio",
} as const
