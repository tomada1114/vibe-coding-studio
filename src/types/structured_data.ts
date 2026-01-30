/**
 * 記事構造化データの型定義
 */
export interface ArticleStructuredDataProps {
  headline: string
  description?: string
  datePublished: string
  dateModified?: string
  url: string
  isAccessibleForFree: boolean
  paywallSelectors?: string[]
  articleType?: string[]
  author?: {
    name: string
    url: string
  }
}
