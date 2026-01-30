import {
  type BreadcrumbItem,
  generateBreadcrumbStructuredData,
} from "@/lib/seo/breadcrumb-utils"
import Breadcrumb from "./Breadcrumb"

interface BreadcrumbWithStructuredDataProps {
  items: BreadcrumbItem[]
  className?: string
}

export default function BreadcrumbWithStructuredData({
  items,
  className,
}: BreadcrumbWithStructuredDataProps) {
  if (items.length === 0) {
    return null
  }

  const structuredData = generateBreadcrumbStructuredData(items)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Breadcrumb items={items} className={className} />
    </>
  )
}
