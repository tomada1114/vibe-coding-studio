import { ChevronRight } from "lucide-react"
import Link from "next/link"

import type { BreadcrumbItem } from "@/lib/seo/breadcrumb-utils"

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export default function Breadcrumb({ items, className }: BreadcrumbProps) {
  if (items.length === 0) {
    return null
  }

  return (
    <nav aria-label="パンくずリスト" className={className}>
      <ol className="flex flex-wrap items-center gap-1 text-sm text-slate-500">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-1">
            {index > 0 && (
              <ChevronRight className="h-3.5 w-3.5 flex-shrink-0 text-slate-400" />
            )}
            {item.href ? (
              <Link
                href={item.href}
                className="transition-colors hover:text-slate-700"
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-slate-700">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
