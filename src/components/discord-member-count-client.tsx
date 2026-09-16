/**
 * Discordメンバー数表示コンポーネント（クライアント側）。
 *
 * サーバーで取得・整形した値をそのまま表示する。Geist Grid の静的な
 * 表現方針に合わせ、表示時のカウントアップは行わない。
 */

"use client"

interface DiscordMemberCountClientProps {
  formattedCount: string
  label?: string
}

/**
 * Discordメンバー数表示コンポーネント（クライアント側）
 *
 * @param formattedCount - フォーマット済みのメンバー数（例: "1,230+"）
 */
export function DiscordMemberCountClient({
  formattedCount,
  label = "名の仲間が参加中",
}: DiscordMemberCountClientProps) {
  return (
    <div className="flex flex-wrap items-baseline justify-center gap-3">
      <span className="gg-meta text-text-primary text-[32px] leading-none font-medium sm:text-[40px]">
        {formattedCount}
      </span>
      <span className="text-text-secondary text-[14px] font-medium sm:text-[16px]">
        {label}
      </span>
    </div>
  )
}
