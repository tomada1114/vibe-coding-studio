/**
 * Discordメンバー数表示コンポーネント
 *
 * Discord APIからメンバー数を取得して表示します。
 * サーバーコンポーネントとして動作し、1分間キャッシュされます。
 */

import { getDiscordMemberCount } from "@/lib/discord-api"
import { UserGroupIcon } from "@heroicons/react/24/outline"

/**
 * メンバー数をフォーマット
 * 例: 1234 -> "1,200+"
 */
function formatMemberCount(count: number): string {
  if (count === 0) {
    return ""
  }

  // 100の位を切り捨て
  const roundedCount = Math.floor(count / 100) * 100

  // カンマ区切りでフォーマット
  return roundedCount.toLocaleString("ja-JP") + "+"
}

/**
 * Discordメンバー数表示コンポーネント
 */
export async function DiscordMemberCount() {
  try {
    const memberCount = await getDiscordMemberCount()

    // メンバー数が0の場合は何も表示しない
    if (memberCount === 0) {
      return null
    }

    const formattedCount = formatMemberCount(memberCount)

    return (
      <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 ring-1 ring-gray-950/5 backdrop-blur-sm">
        <UserGroupIcon className="h-5 w-5 text-gray-950" />
        <span className="text-sm font-medium text-gray-950">
          <span className="font-semibold text-gray-950">{formattedCount}</span>
          名の仲間が参加中
        </span>
      </div>
    )
  } catch (error) {
    // エラーが発生した場合は何も表示しない（ユーザー体験を損なわないため）
    // eslint-disable-next-line no-console
    console.error("Failed to display Discord member count:", error)
    return null
  }
}
