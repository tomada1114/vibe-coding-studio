"use client"

import { usePathname } from "next/navigation"

import { AuthorCredit } from "@/components/docs/AuthorCredit"
import { navigation } from "@/lib/navigation"

export interface DocsHeaderProps {
  title?: string
  /**
   * 作成者情報を表示するかどうか
   * @default false
   */
  showAuthor?: boolean
  /**
   * 作成日時（ISO形式またはDate文字列）
   */
  createdAt?: string
  /**
   * 更新日時（ISO形式またはDate文字列）
   */
  updatedAt?: string
}

export function DocsHeader({
  title,
  showAuthor = false,
  createdAt,
  updatedAt,
}: DocsHeaderProps) {
  const pathname = usePathname()
  const section = navigation.find(section =>
    section.links.find(link => link.href === pathname)
  )

  if (!title && !section) {
    return null
  }

  return (
    <header className="mb-9 space-y-1">
      {section && (
        <p className="font-display text-sm font-medium text-sky-500">
          {section.title}
        </p>
      )}
      {title && (
        <h1 className="font-display text-3xl tracking-tight text-slate-900 dark:text-white">
          {title}
        </h1>
      )}

      {/* 作成者情報の表示（学習コンテンツページのみ） */}
      {showAuthor && (
        <AuthorCredit
          createdAt={createdAt}
          updatedAt={updatedAt}
          className="mt-4 text-left"
        />
      )}
    </header>
  )
}
