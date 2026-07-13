import { COURSE_DISPLAY_ORDER, COURSE_INFO } from "@/constants/coupon-courses"
import { getSiteUrl } from "@/lib/seo/site-url"
import type {
  UdemyCourseApiInfo,
  UdemyCoursesApiResponse,
} from "@/types/udemy-course-api"
import { NextRequest, NextResponse } from "next/server"

const BASE_URL = getSiteUrl()

/**
 * COURSE_INFO から API用の講座情報を生成
 */
function buildCourseApiInfo(courseId: string): UdemyCourseApiInfo | null {
  const courseInfo = COURSE_INFO[courseId]
  if (!courseInfo) return null

  return {
    id: courseId,
    title: courseInfo.title,
    slug: courseInfo.slug,
    description: courseInfo.description,
    topics: courseInfo.topics,
    url: `${BASE_URL}/coupons/${courseInfo.slug}`,
  }
}

/**
 * Udemy講座一覧を取得するAPI
 *
 * @example
 * // 全講座取得
 * GET /api/udemy-courses
 *
 * @example
 * // トピックでフィルタリング
 * GET /api/udemy-courses?topic=claude-code
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const topic = searchParams.get("topic")

    // COURSE_DISPLAY_ORDER の順序で講座情報を取得
    let courses: UdemyCourseApiInfo[] = []

    for (const courseId of COURSE_DISPLAY_ORDER) {
      const courseApiInfo = buildCourseApiInfo(courseId)
      if (courseApiInfo) {
        courses.push(courseApiInfo)
      }
    }

    // トピックでフィルタリング
    if (topic) {
      courses = courses.filter(course => course.topics.includes(topic))
    }

    const response: UdemyCoursesApiResponse = {
      courses,
      totalCount: courses.length,
      ...(topic && { filter: { topic } }),
    }

    return NextResponse.json(response, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    })
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.error("Error fetching udemy courses:", error)
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
