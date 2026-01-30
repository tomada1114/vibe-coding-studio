import type { ArticleStructuredDataProps } from '@/types/structured_data'

const DEFAULT_AUTHOR = {
  name: 'とまだ',
  url: '/founder',
}

/**
 * Article構造化データのJSON文字列を生成
 */
export function generateArticleStructuredDataString(
  props: ArticleStructuredDataProps,
): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vibecoding.studio'
  const authorInfo = props.author || DEFAULT_AUTHOR

  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': props.articleType || ['Article'],
    headline: props.headline,
    ...(props.description ? { description: props.description } : {}),
    datePublished: props.datePublished,
    ...(props.dateModified ? { dateModified: props.dateModified } : {}),
    url: props.url,
    isAccessibleForFree: props.isAccessibleForFree,
    author: {
      '@type': 'Person',
      name: authorInfo.name,
      url: authorInfo.url.startsWith('http') ? authorInfo.url : `${siteUrl}${authorInfo.url}`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Vibe Coding Studio',
      url: siteUrl,
    },
  }

  if (props.paywallSelectors && props.paywallSelectors.length > 0) {
    data.hasPart = props.paywallSelectors.map((selector) => ({
      '@type': 'WebPageElement',
      isAccessibleForFree: false,
      cssSelector: selector,
    }))
  }

  return JSON.stringify(data)
}
