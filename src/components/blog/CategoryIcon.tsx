/**
 * Category Icon Component
 *
 * Renders either a Devicon or emoji based on icon type.
 */

import type { CategoryIcon } from "@/lib/blog/categories"

interface CategoryIconProps {
  icon: CategoryIcon
  className?: string
}

function Devicon({
  slug,
  size,
  className = "",
}: {
  slug: string
  size: "sm" | "md" | "lg"
  className?: string
}) {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-xl",
  }

  return (
    <i
      className={`devicon-${slug}-plain colored ${sizeClasses[size]} ${className}`}
      aria-label={`${slug} icon`}
    />
  )
}

export function CategoryIconComponent({
  icon,
  className = "",
}: CategoryIconProps) {
  if (icon.type === "devicon") {
    return <Devicon slug={icon.value} size={icon.size} className={className} />
  }

  return (
    <span
      className={`inline-block ${className}`}
      role="img"
      aria-label={`${icon.value} icon`}
    >
      {icon.value}
    </span>
  )
}
