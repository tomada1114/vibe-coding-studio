'use client'

/**
 * /docs/[course]/[chapter]ページ用の記事構造化データコンポーネント
 * 既存のDocsStructuredDataコンポーネントを拡張・改良
 */

import { renderDocsArticleJsonLd } from '@/lib/constants/structured_data/docs'
import { getRequiredPlan } from '@/lib/access-control'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

interface DocsArticleStructuredDataProps {
  /** 記事のタイトル */
  title: string
  /** 記事の説明（オプション） */
  description?: string
  /** 公開日（ISO 8601形式） */
  datePublished?: string
  /** 更新日（ISO 8601形式） */
  dateModified?: string
  /** 作成者名（オプション、デフォルトは「とまだ」） */
  author?: string
}

/**
 * 記事ページ（/docs/[course]/[chapter]）用の構造化データコンポーネント
 * ペイウォール情報を含むArticle + LearningResource構造化データを生成
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

  // クライアントサイドでのみ構造化データを生成
  if (!isClient) {
    return null
  }

  // URLからコースのスラッグを抽出 (/docs/[course]/... の形式)
  const pathSegments = pathname.split('/')
  const courseSlug = pathSegments[2] // /docs/ruby/... -> 'ruby'

  if (!courseSlug || pathSegments[1] !== 'docs') {
    return null // docsページ以外では何も表示しない
  }

  // アクセス制御チェック
  const requiredPlan = getRequiredPlan(pathname)
  const isAccessibleForFree = !requiredPlan

  // 完全なURLを構築
  const url = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://vibecoding.studio'}${pathname}`

  const options = {
    description,
    datePublished,
    dateModified,
    author,
    isAccessibleForFree,
  }

  const structuredDataJson = renderDocsArticleJsonLd(courseSlug, title, url, options)

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
