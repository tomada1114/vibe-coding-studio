"use client"

import { renderDocsArticleJsonLd } from "@/lib/constants/structured_data/docs"
import { getSiteUrl } from "@/lib/seo/site-url"
import { usePathname } from "next/navigation"

interface DocsArticleStructuredDataProps {
  title: string
  description?: string
  datePublished?: string
  dateModified?: string
  author?: string
}

/**
 * Docsページ用のArticle + LearningResource構造化データコンポーネント
 *
 * page.md は @markdoc/next.js のローダーが直接ページ化するため、courseSlug 等の
 * ルート情報を props で渡す経路が存在せず、client component + usePathname で解決する。
 * isClient ゲートは置かない（client componentもSSR自体はされるため、外すことで
 * JSON-LD が静的HTMLに含まれる）。
 */
export function DocsArticleStructuredData({
  title,
  description,
  datePublished,
  dateModified,
  author,
}: DocsArticleStructuredDataProps) {
  const pathname = usePathname()

  const pathSegments = pathname.split("/")
  const courseSlug = pathSegments[2]

  if (!courseSlug || pathSegments[1] !== "docs") {
    return null
  }

  const url = `${getSiteUrl()}${pathname}`

  const structuredDataJson = renderDocsArticleJsonLd(courseSlug, title, url, {
    description,
    datePublished,
    dateModified,
    author,
  })

  if (!structuredDataJson) {
    return null
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: structuredDataJson,
      }}
    />
  )
}
