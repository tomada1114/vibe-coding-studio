import type { Metadata } from "next"
import type { CourseMetadataConfig } from "@/types/course-details"

/**
 * コース固有の設定情報
 */
export const COURSE_CONFIG = {
  CODEX_PYTHON_FAST_API: {
    COURSE_ID: "6826831",
    SLUG: "codex-python-fast-api",
    IMAGE_PATH: "/images/udemy/codex-python-fast-api.png",
    BASE_URL: "https://school.learning-next.app",
  },
} as const

/**
 * メタデータを生成するヘルパー関数
 */
export function generateCourseMetadata(
  config: CourseMetadataConfig,
): Metadata {
  const baseUrl = config.baseUrl || COURSE_CONFIG.CODEX_PYTHON_FAST_API.BASE_URL
  const url = `${baseUrl}/coupons/${config.slug}`

  return {
    title: `${config.courseDetails.title} - 特別割引クーポン`,
    description: config.courseDetails.subtitle,
    openGraph: {
      title: config.courseDetails.title,
      description: config.courseDetails.subtitle,
      type: "website",
      url,
      images: [
        {
          url: config.imagePath,
          width: 1280,
          height: 720,
          alt: config.courseDetails.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: config.courseDetails.title,
      description: config.courseDetails.subtitle,
      images: [config.imagePath],
    },
  }
}
