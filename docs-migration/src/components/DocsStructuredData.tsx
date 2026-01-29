'use client'

import { getRequiredPlan } from '@/lib/access-control'
import type { ArticleStructuredDataProps } from '@/types/structured_data'
import { generateArticleStructuredDataString } from '@/utils/article-structured-data'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

interface DocsStructuredDataProps {
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
 * ドキュメントページ用の構造化データコンポーネント
 * ペイウォール情報を含むArticle構造化データを動的に生成
 */
export function DocsStructuredData({
  title,
  description,
  datePublished,
  dateModified,
  author,
}: DocsStructuredDataProps) {
  const pathname = usePathname()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // クライアントサイドでのみ構造化データを生成
  if (!isClient) {
    return null
  }

  const requiredPlan = getRequiredPlan(pathname)

  // 固定の公開日を使用（ハイドレーションエラーを防ぐ）
  const defaultPublishDate = '2024-01-01T00:00:00.000Z'

  // 構造化データのプロパティを構築
  const structuredDataProps: ArticleStructuredDataProps = {
    headline: title,
    description,
    datePublished: datePublished || defaultPublishDate,
    dateModified,
    url: `https://school.learning-next.app${pathname}`,
    isAccessibleForFree: !requiredPlan, // プラン要求がない場合は無料でアクセス可能
    paywallSelectors: requiredPlan ? ['.paywall'] : [], // ペイウォールがある場合のみセレクターを追加
    articleType: ['Article', 'LearningResource'], // 学習コンテンツとして分類
    // カスタムauthor情報がある場合は上書き
    author: author
      ? {
          name: author,
          url: 'https://school.learning-next.app/author',
        }
      : undefined,
  }

  const structuredDataJson = generateArticleStructuredDataString(structuredDataProps)

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: structuredDataJson,
      }}
    />
  )
}
