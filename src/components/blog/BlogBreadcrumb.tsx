/**
 * Blog Breadcrumb Component
 *
 * Breadcrumb navigation with structured data for SEO.
 * Uses schema.org BreadcrumbList for rich search results.
 */

import Link from "next/link"
import Script from "next/script"

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BlogBreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function BlogBreadcrumb({ items, className = "" }: BlogBreadcrumbProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.href
        ? `${process.env.NEXT_PUBLIC_SITE_URL || ""}${item.href}`
        : undefined,
    })),
  }

  return (
    <>
      <Script
        id="breadcrumb-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(structuredData)}
      </Script>

      <nav aria-label="Breadcrumb" className={className}>
        <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              {index > 0 && (
                <span className="text-gray-400" aria-hidden="true">
                  /
                </span>
              )}
              {item.href ? (
                <Link
                  href={item.href}
                  className="hover:text-gray-900 hover:underline"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-900">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}

export function generateBlogBreadcrumb(
  categoryName?: string,
  categorySlug?: string,
  postTitle?: string
): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
  ]

  if (categoryName && categorySlug) {
    items.push({
      label: categoryName,
      href: postTitle ? `/blog/${categorySlug}` : undefined,
    })
  }

  if (postTitle) {
    items.push({ label: postTitle })
  }

  return items
}
