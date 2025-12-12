import {
  COURSE_DISPLAY_ORDER,
  COURSE_INFO,
  TOPIC_INFO,
} from "@/constants/coupon-courses"
import type {
  UdemyTopicApiInfo,
  UdemyTopicsApiResponse,
} from "@/types/udemy-course-api"
import { NextResponse } from "next/server"

/**
 * 利用可能なトピック一覧を取得するAPI
 * /coupons ページのフィルタ種別と連動
 *
 * @example
 * GET /api/udemy-courses/topics
 */
export async function GET() {
  try {
    // 講座で使用されているトピックをカウント
    const topicCounts = new Map<string, number>()

    for (const courseId of COURSE_DISPLAY_ORDER) {
      const courseInfo = COURSE_INFO[courseId]
      if (courseInfo) {
        for (const topic of courseInfo.topics) {
          topicCounts.set(topic, (topicCounts.get(topic) || 0) + 1)
        }
      }
    }

    // TOPIC_INFO に定義されているトピックのみを返す（講座が存在するもの）
    const topics: UdemyTopicApiInfo[] = []

    for (const [slug, count] of topicCounts.entries()) {
      const topicInfo = TOPIC_INFO[slug]
      if (topicInfo) {
        topics.push({
          slug: topicInfo.slug,
          name: topicInfo.name,
          icon: topicInfo.icon,
          courseCount: count,
        })
      }
    }

    // 講座数の多い順にソート
    topics.sort((a, b) => b.courseCount - a.courseCount)

    const response: UdemyTopicsApiResponse = {
      topics,
      totalCount: topics.length,
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
      console.error("Error fetching udemy topics:", error)
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
