/**
 * Udemy講座インデックス生成機能
 *
 * COURSE_INFOから検索用のUdemy講座インデックスを生成します。
 */

import { COURSE_INFO } from "@/constants/coupon-courses"
import type {
  TopicMapping,
  UdemyCourseIndex,
  UdemyCourseIndexItem,
} from "@/types/udemy-course-index"
import { UdemyCourseIndexError, UdemyCourseIndexErrorCode } from "./errors"

/**
 * COURSE_INFOからUdemyCourseIndexItemを生成する
 *
 * @param courseId - 講座ID
 * @param courseInfo - 講座情報
 * @returns UdemyCourseIndexItem
 */
function createUdemyCourseIndexItem(
  courseId: string,
  courseInfo: {
    title: string
    topics: string[]
    promotionUrl?: string
    description: string
  }
): UdemyCourseIndexItem {
  return {
    courseId,
    title: courseInfo.title,
    topics: courseInfo.topics,
    promotionUrl: courseInfo.promotionUrl || "",
    description: courseInfo.description,
  }
}

/**
 * トピック別のURLマッピングを生成する
 *
 * @param courses - 講座インデックスエントリ配列
 * @returns TopicMapping
 */
function buildTopicMapping(courses: UdemyCourseIndexItem[]): TopicMapping {
  const topicMapping: TopicMapping = {}

  for (const course of courses) {
    for (const topic of course.topics) {
      if (!topicMapping[topic]) {
        topicMapping[topic] = []
      }

      topicMapping[topic].push({
        courseId: course.courseId,
        url: `/coupons?topic=${topic}`,
      })
    }
  }

  return topicMapping
}

/**
 * Udemy講座インデックスを生成する
 *
 * @returns UdemyCourseIndex
 * @throws UdemyCourseIndexError 講座データが存在しない場合
 */
export function generateUdemyCourseIndex(): UdemyCourseIndex {
  // COURSE_INFOから講座データを取得
  const courseEntries = Object.entries(COURSE_INFO)

  // 講座データが0件の場合はエラーをスローする
  if (courseEntries.length === 0) {
    throw new UdemyCourseIndexError(
      UdemyCourseIndexErrorCode.NO_COURSE_DATA,
      "Udemy講座データが見つかりません",
      { courseCount: 0 }
    )
  }

  // 各講座からUdemyCourseIndexItemを生成
  const courseIndexItems = courseEntries.map(([courseId, courseInfo]) =>
    createUdemyCourseIndexItem(courseId, courseInfo)
  )

  // トピックマッピングを生成
  const topicMapping = buildTopicMapping(courseIndexItems)

  // UdemyCourseIndexを構築
  const udemyCourseIndex: UdemyCourseIndex = {
    version: "1.0.0",
    generatedAt: new Date().toISOString(),
    courses: courseIndexItems,
    topicMapping,
  }

  return udemyCourseIndex
}
