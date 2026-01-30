import { UserIcon } from "lucide-react"
import Link from "next/link"

export interface AuthorCreditProps {
  /**
   * 作成者名
   * @default "とまだ"
   */
  authorName?: string
  /**
   * 作成者ページのURL
   * @default "/author"
   */
  authorUrl?: string
  /**
   * 表示位置のクラス名
   * @default "text-right" - 右寄せ表示
   */
  className?: string
  /**
   * 作成日時（ISO形式またはDate文字列）
   */
  createdAt?: string
  /**
   * 更新日時（ISO形式またはDate文字列）
   */
  updatedAt?: string
}

/**
 * 学習コンテンツページ用の控えめな作成者リンクコンポーネント
 *
 * 要件:
 * - 目立ちすぎない参考情報程度の表示
 * - 右下などの控えめな位置に配置
 * - SEO・信頼性向上を目的とした作成者情報表示
 */
export function AuthorCredit({
  authorName = "とまだ",
  authorUrl = "/founder",
  className = "text-right",
  createdAt,
  updatedAt,
}: AuthorCreditProps) {
  return (
    <div className={`mt-8 pt-4 text-xs text-slate-500 ${className}`}>
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        {/* 作成者情報 */}
        <div className="flex items-center gap-1.5">
          <UserIcon className="h-3 w-3 shrink-0" />
          <span>作成者:</span>
          <Link
            href={authorUrl}
            className="font-medium text-slate-600 transition-colors hover:text-sky-600 hover:underline"
            aria-label={`作成者 ${authorName} のプロフィールページへ`}
          >
            {authorName}
          </Link>
        </div>

        {/* 日時情報（作成日・更新日） */}
        {(createdAt || updatedAt) && (
          <div className="flex flex-col gap-0.5 text-slate-400">
            {createdAt && (
              <div>
                作成: <time dateTime={createdAt}>{formatDate(createdAt)}</time>
              </div>
            )}
            {updatedAt && (
              <div>
                更新: <time dateTime={updatedAt}>{formatDate(updatedAt)}</time>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * 日付を読みやすい形式にフォーマット
 */
function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString)
    // タイムゾーンに依存しないようにUTCで処理
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "Asia/Tokyo", // 明示的にタイムゾーンを指定
    })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("[AuthorCredit] Failed to format date:", dateString, error)
    return dateString
  }
}
