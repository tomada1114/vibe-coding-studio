/**
 * Dynamic Sitemap Generation
 *
 * Generates sitemap.xml with all site pages including:
 * - Static pages (varying priorities: 1.0 for home, 0.9-0.7 for others)
 * - Courses (priority 0.7)
 */
import { getSiteUrl } from "@/lib/seo/site-url"
import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl()

  // 静的ページ
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/community`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/courses`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ]

  return staticPages
}
