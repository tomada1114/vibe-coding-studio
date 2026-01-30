/**
 * パンくずリスト関連ユーティリティ
 */

export interface BreadcrumbItem {
  label: string
  href?: string
}

/**
 * Docsページ用のパンくずアイテム配列を生成
 */
export function generateDocsBreadcrumb(
  courseSlug?: string,
  courseTitle?: string,
  chapterTitle?: string
): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [
    { label: "ホーム", href: "/" },
    { label: "ドキュメント", href: "/docs" },
  ]

  if (courseSlug && courseTitle) {
    items.push({ label: courseTitle, href: `/docs/${courseSlug}` })
  }

  if (chapterTitle) {
    items.push({ label: chapterTitle })
  }

  return items
}

/**
 * BreadcrumbList JSON-LD構造化データを生成
 */
export function generateBreadcrumbStructuredData(items: BreadcrumbItem[]) {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://vibecoding.studio"

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${siteUrl}${item.href}` } : {}),
    })),
  }
}

/**
 * 構造化データをJSON文字列に変換
 */
export function breadcrumbToJsonLd(
  data: ReturnType<typeof generateBreadcrumbStructuredData>
): string {
  return JSON.stringify(data)
}
