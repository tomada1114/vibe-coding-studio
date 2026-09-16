/**
 * Dynamic Sitemap Generation
 *
 * Generates sitemap.xml with all site pages including:
 * - Static pages (varying priorities: 1.0 for home, 0.9-0.7 for others)
 * - Doc course pages (priority 0.7)
 * - Coupon detail pages (priority 0.6)
 *
 * Error handling: Dynamic coupon data is wrapped in try-catch so the sitemap
 * continues with the remaining pages when it is unavailable.
 */
import { getLatestCoupons } from "@/lib/coupons/coupon-data"
import { getAllCourses } from "@/lib/course-constants"
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
      url: `${baseUrl}/docs`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/coupons`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ]

  // 学習コースページ
  const coursePages: MetadataRoute.Sitemap = getAllCourses().map(course => ({
    url: `${baseUrl}/docs/${course.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  // クーポン詳細ページ
  let couponPages: MetadataRoute.Sitemap = []
  try {
    const coupons = getLatestCoupons()
    couponPages = coupons.map(coupon => ({
      url: `${baseUrl}/coupons/${coupon.courseInfo.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }))
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("[Sitemap:COUPON_DATA_FAILED]", {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    })
  }

  return [...staticPages, ...coursePages, ...couponPages]
}
