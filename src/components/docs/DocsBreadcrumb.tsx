"use client"

import BreadcrumbWithStructuredData from "@/components/common/BreadcrumbWithStructuredData"
import { navigation } from "@/lib/navigation"
import { generateDocsBreadcrumb } from "@/lib/seo/breadcrumb-utils"
import { usePathname } from "next/navigation"

interface DocsBreadcrumbProps {
  title?: string
}

/**
 * Markdownページ用のパンくずコンポーネント
 * 現在のパスから階層情報を自動的に取得してパンくずを生成
 */
export function DocsBreadcrumb({ title }: DocsBreadcrumbProps) {
  const pathname = usePathname()

  if (!pathname.startsWith("/docs")) {
    return null
  }

  const pathSegments = pathname.split("/").filter(Boolean)

  let courseSlug: string | undefined
  let courseTitle: string | undefined
  let chapterTitle: string | undefined

  if (pathSegments.length >= 2) {
    courseSlug = pathSegments[1]
    const course = navigation.find(course => course.slug === courseSlug)
    if (course) {
      courseTitle = course.title
      if (pathSegments.length >= 3 && title) {
        chapterTitle = title
      }
    }
  }

  const breadcrumbs = generateDocsBreadcrumb(
    courseSlug,
    courseTitle,
    chapterTitle
  )

  return <BreadcrumbWithStructuredData items={breadcrumbs} className="mb-8" />
}
