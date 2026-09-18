/**
 * Discordメンバー数表示コンポーネント
 *
 * Discord APIからメンバー数を取得して表示します。
 * サーバーコンポーネントとして動作し、24時間キャッシュされます。
 */

import { getDiscordMemberCount } from "@/lib/discord-api"
import { DiscordMemberCountClient } from "./discord-member-count-client"

/**
 * メンバー数をフォーマット
 * 例: 1234 -> "1,230+"
 */
export function formatMemberCount(count: number): string {
  if (count === 0) {
    return ""
  }

  // 10の位を切り捨て
  const roundedCount = Math.floor(count / 10) * 10

  // カンマ区切りでフォーマット
  return roundedCount.toLocaleString("ja-JP") + "+"
}

/**
 * Discordメンバー数表示コンポーネント（サーバー側）
 * データ取得のみを担当し、表示はクライアントコンポーネントに委譲
 */
export async function DiscordMemberCount({
  label = "名の仲間が参加中",
}: {
  label?: string
} = {}) {
  let memberCount: number

  try {
    memberCount = await getDiscordMemberCount()
  } catch (error) {
    // エラーが発生した場合は何も表示しない（ユーザー体験を損なわないため）
    // eslint-disable-next-line no-console
    console.error("Failed to display Discord member count:", error)
    return null
  }

  // メンバー数が0の場合は何も表示しない
  if (memberCount === 0) {
    return null
  }

  const formattedCount = formatMemberCount(memberCount)

  return (
    <DiscordMemberCountClient formattedCount={formattedCount} label={label} />
  )
}
