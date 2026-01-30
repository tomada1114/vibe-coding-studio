'use client'

import { renderDocsArticleJsonLd } from '@/lib/constants/structured_data/docs'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

interface DocsArticleStructuredDataProps {
  title: string
  description?: string
  datePublished?: string
  dateModified?: string
  author?: string
}

/**
 * Docsページ用のArticle + LearningResource構造化データコンポーネント
 */
export function DocsArticleStructuredData({
  title,
  description,
  datePublished,
  dateModified,
  author,
}: DocsArticleStructuredDataProps) {
  const pathname = usePathname()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  const pathSegments = pathname.split('/')
  const courseSlug = pathSegments[2]

  if (!courseSlug || pathSegments[1] !== 'docs') {
    return null
  }

  const url = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://vibecoding.studio'}${pathname}`

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
