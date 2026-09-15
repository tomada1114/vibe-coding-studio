/**
 * Dynamic Sitemap Generation
 *
 * Generates sitemap.xml with all site pages including:
 * - Static pages (varying priorities: 1.0 for home, 0.9-0.7 for others)
 * - Doc course pages (priority 0.7)
 * - Coupon detail pages (priority 0.6)
 * - Video pages (priority 0.6, lastModified from publishedAt)
 *
 * Error handling: Dynamic data sources (videos, coupons) are
 * wrapped in try-catch. If one fails, the sitemap continues with available data.
 */
import { getLatestCoupons } from "@/lib/coupons/coupon-data"
import { getAllCourses } from "@/lib/course-constants"
import { getSiteUrl } from "@/lib/seo/site-url"
import { getAllVideos } from "@/lib/videos/video-data"
import type { MetadataRoute } from "next"

/**
 * Safely parse a date string, returning current date as fallback for invalid dates.
 * Logs an error when fallback is triggered for debugging purposes.
 */
function safeParseDate(
  dateStr: string,
  context: { type: string; id: string }
): Date {
  const date = new Date(dateStr)
  if (isNaN(date.getTime())) {
    // eslint-disable-next-line no-console
    console.error(`[Sitemap:INVALID_DATE]`, {
      ...context,
      dateStr,
      reason:
        "Date string could not be parsed - using current date as fallback",
    })
    return new Date()
  }
  return date
}

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
      url: `${baseUrl}/videos`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/roadmap`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
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

  // 動画詳細ページ
  let videoPages: MetadataRoute.Sitemap = []
  try {
    const videos = getAllVideos()
    videoPages = videos.map(video => ({
      url: `${baseUrl}/videos/${video.id}`,
      lastModified: safeParseDate(video.publishedAt, {
        type: "video",
        id: video.id,
      }),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("[Sitemap:VIDEO_DATA_FAILED]", {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    })
  }

  return [...staticPages, ...coursePages, ...couponPages, ...videoPages]
}
