/**
 * Dynamic Sitemap Generation
 *
 * Generates sitemap.xml with all site pages including:
 * - Static pages (priority 1.0-0.7)
 * - Blog category pages (priority 0.7)
 * - Blog posts (priority 0.6, lastModified from post date)
 * - Video pages (priority 0.6, lastModified from publishedAt)
 *
 * Error handling: Each data source is wrapped in try-catch.
 * If one fails, the sitemap continues with available data.
 */
import { logBlogError } from "@/lib/blog/logging"
import { getAllCategories, getAllPosts } from "@/lib/blog/posts"
import { getAllVideos } from "@/lib/videos/video-data"
import type { MetadataRoute } from "next"

/**
 * Safely parse a date string, returning current date as fallback for invalid dates.
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
  const baseUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://vibe-coding-studio.com"
  ).replace(/\/$/, "")

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
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/videos`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/coupons`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ]

  // ブログカテゴリページ
  let categoryPages: MetadataRoute.Sitemap = []
  try {
    const categories = getAllCategories()
    categoryPages = categories.map(category => ({
      url: `${baseUrl}/blog/${category}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }))
  } catch (error) {
    logBlogError("SITEMAP_CATEGORIES_FAILED", {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    })
  }

  // ブログ記事ページ
  let blogPages: MetadataRoute.Sitemap = []
  try {
    const posts = getAllPosts()
    blogPages = posts.map(post => ({
      url: `${baseUrl}/blog/${post.category}/${post.slug}`,
      lastModified: safeParseDate(post.date, {
        type: "blog",
        id: `${post.category}/${post.slug}`,
      }),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  } catch (error) {
    logBlogError("SITEMAP_BLOG_POSTS_FAILED", {
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
    })
  }

  return [...staticPages, ...categoryPages, ...blogPages, ...videoPages]
}
