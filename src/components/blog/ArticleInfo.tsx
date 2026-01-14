/**
 * Article Info Component
 *
 * Displays article metadata: publication date and category.
 */

import { getCategoryInfo } from "@/lib/blog/categories"
import { CategoryIconComponent } from "./CategoryIcon"

interface ArticleInfoProps {
  date: string
  category: string
  categoryDisplay: string
}

function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  } catch {
    return dateString
  }
}

export function ArticleInfo({
  date,
  category,
  categoryDisplay,
}: ArticleInfoProps) {
  const categoryInfo = getCategoryInfo(category, "sm")

  return (
    <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-gray-600">
      <div className="flex items-center gap-1">
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <time dateTime={date}>{formatDate(date)}</time>
      </div>

      <span className="text-gray-400">•</span>

      <div className="flex items-center gap-1">
        <CategoryIconComponent icon={categoryInfo.icon} />
        <span>{categoryDisplay}</span>
      </div>
    </div>
  )
}
