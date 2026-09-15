/**
 * Docs記事構造化データの生成
 */

import { getSiteUrl } from "@/lib/seo/site-url"

const DEFAULT_AUTHOR = {
  name: "とまだ",
  url: "/",
}

interface DocsArticleJsonLdOptions {
  description?: string
  datePublished?: string
  dateModified?: string
  author?: string
  isAccessibleForFree?: boolean
}

/**
 * Docs記事のJSON-LD構造化データを生成
 */
export function renderDocsArticleJsonLd(
  courseSlug: string,
  title: string,
  url: string,
  options: DocsArticleJsonLdOptions = {}
): string | null {
  if (!courseSlug || !title) {
    return null
  }

  const siteUrl = getSiteUrl()
  const authorUrl = options.author
    ? `${siteUrl}/`
    : `${siteUrl}${DEFAULT_AUTHOR.url}`

  const data = {
    "@context": "https://schema.org",
    "@type": ["Article", "LearningResource"],
    headline: title,
    ...(options.description ? { description: options.description } : {}),
    datePublished: options.datePublished || "2024-01-01T00:00:00.000Z",
    ...(options.dateModified ? { dateModified: options.dateModified } : {}),
    url,
    isAccessibleForFree: options.isAccessibleForFree ?? true,
    author: {
      "@type": "Person",
      name: options.author || DEFAULT_AUTHOR.name,
      url: authorUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Vibe Coding Studio",
      url: siteUrl,
    },
  }

  return JSON.stringify(data)
}
