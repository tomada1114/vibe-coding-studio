/**
 * Category Badge Component
 *
 * Displays a category as a pill-shaped badge with icon.
 */

import { getCategoryInfo, type IconSize } from "@/lib/blog/categories"
import Link from "next/link"
import { CategoryIconComponent } from "./CategoryIcon"

interface CategoryBadgeProps {
  category: string
  clickable?: boolean
  size?: IconSize
}

const sizeClasses = {
  sm: "text-xs px-2 py-0.5",
  md: "text-sm px-2.5 py-1",
  lg: "text-base px-3 py-1.5",
}

export function CategoryBadge({
  category,
  clickable = true,
  size = "md",
}: CategoryBadgeProps) {
  const categoryInfo = getCategoryInfo(category, size)

  const badge = (
    <span
      className={`inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 font-medium text-slate-700 ${sizeClasses[size]} ${clickable ? "cursor-pointer transition-shadow hover:shadow-sm" : ""}`}
    >
      <CategoryIconComponent icon={categoryInfo.icon} />
      <span>{categoryInfo.name}</span>
    </span>
  )

  if (clickable) {
    return (
      <Link href={`/blog/${category}`} className="inline-block">
        {badge}
      </Link>
    )
  }

  return badge
}
