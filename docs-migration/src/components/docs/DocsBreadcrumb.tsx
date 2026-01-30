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

  // /docs以外は表示しない
  if (!pathname.startsWith("/docs")) {
    return null
  }

  // パスを解析
  const pathSegments = pathname.split("/").filter(Boolean)

  // /docs 配下である必要がある
  if (pathSegments.length < 1 || pathSegments[0] !== "docs") {
    return null
  }

  let courseSlug: string | undefined
  let courseTitle: string | undefined
  let chapterTitle: string | undefined

  // /docs/[course] または /docs/[course]/[chapter]/[lesson] の場合
  if (pathSegments.length >= 2) {
    courseSlug = pathSegments[1]

    // navigation.tsからコース情報を取得
    const course = navigation.find(course => course.slug === courseSlug)
    if (course) {
      courseTitle = course.title

      // 個別レッスンページの場合、titleを使用
      if (pathSegments.length >= 3 && title) {
        chapterTitle = title
      }
    }
  }

  // パンくずデータを生成
  const breadcrumbs = generateDocsBreadcrumb(
    courseSlug,
    courseTitle,
    chapterTitle
  )

  return <BreadcrumbWithStructuredData items={breadcrumbs} className="mb-8" />
}
