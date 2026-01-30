import {
  breadcrumbToJsonLd,
  generateBreadcrumbStructuredData,
} from "@/lib/seo/breadcrumb-utils"
import Breadcrumb, { type BreadcrumbItem } from "./Breadcrumb"

interface BreadcrumbWithStructuredDataProps {
  items: BreadcrumbItem[]
  className?: string
}

export default function BreadcrumbWithStructuredData({
  items,
  className,
}: BreadcrumbWithStructuredDataProps) {
  // ホームページや空の場合は何も表示しない
  if (items.length === 0) {
    return null
  }

  const structuredData = generateBreadcrumbStructuredData(items)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbToJsonLd(structuredData) }}
      />
      <Breadcrumb items={items} className={className} />
    </>
  )
}
