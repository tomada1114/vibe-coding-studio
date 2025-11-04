/**
 * Udemy講座選定機能
 *
 * タグベースのトピックマッチングスコアリングでUdemy講座を推薦します。
 */

import type { UdemyCoursesSection } from "@/types/video"
import { UdemyCourseIndexError, UdemyCourseIndexErrorCode } from "./errors"
import { loadUdemyCourseIndex } from "./udemy-course-index-loader"

/**
 * トピックマッチングのスコアリングアルゴリズム
 *
 * @param inputTags - 検索対象のタグ配列
 * @param courseTopics - 講座のトピック配列
 * @returns スコア（0以上の整数）
 */
export function calculateCourseScore(
  inputTags: string[],
  courseTopics: string[]
): number {
  // 講座トピックが空の場合は0を返す
  if (courseTopics.length === 0) {
    return 0
  }

  let score = 0

  // 大文字小文字を無視するために正規化
  const normalizedInput = inputTags.map(t => t.toLowerCase())
  const normalizedTopics = courseTopics.map(t => t.toLowerCase())

  // 完全一致トピック: 15ポイント/トピック
  const exactMatches = normalizedInput.filter(inputTag =>
    normalizedTopics.includes(inputTag)
  )
  score += exactMatches.length * 15

  // 部分一致トピック: 7ポイント/トピック（完全一致を除く）
  const partialMatches = normalizedInput.filter(inputTag => {
    // 完全一致は除外
    if (exactMatches.includes(inputTag)) {
      return false
    }

    // 部分一致を探す
    return normalizedTopics.some(
      topic => topic.includes(inputTag) || inputTag.includes(topic)
    )
  })
  score += partialMatches.length * 7

  // トピック数ボーナス: トピック数 × 1ポイント
  score += courseTopics.length * 1

  return score
}

/**
 * Udemy講座を推薦する
 *
 * @param tags - 検索対象のタグ配列
 * @returns UdemyCoursesSection形式のデータ
 * @throws UdemyCourseIndexError タグ配列が空の場合
 */
export function suggestUdemyCourses(tags: string[]): UdemyCoursesSection {
  // タグ配列が空の場合はエラー
  if (tags.length === 0) {
    throw new UdemyCourseIndexError(
      UdemyCourseIndexErrorCode.EMPTY_TAGS,
      "タグ配列が空です",
      { tags }
    )
  }

  // Udemy講座インデックスを読み込む
  const courseIndex = loadUdemyCourseIndex()

  // 各講座にスコアを計算
  const scoredCourses = courseIndex.courses.map(course => ({
    courseId: course.courseId,
    title: course.title,
    topics: course.topics,
    promotionUrl: course.promotionUrl,
    description: course.description,
    score: calculateCourseScore(tags, course.topics),
  }))

  // スコア降順でソート（同一スコアの場合は講座IDの辞書順）
  scoredCourses.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score
    }
    return a.courseId.localeCompare(b.courseId)
  })

  // トピック数ボーナスを除外した実質スコアが0より大きい講座を抽出
  const validCourses = scoredCourses.filter(c => c.score > c.topics.length)

  // 一致する講座が0件の場合、デフォルトURLを返す
  if (validCourses.length === 0) {
    return {
      title: "🚀 体系的に学びたい方へ",
      description:
        "プログラミング初心者からベテランまで、あなたのレベルに合わせたUdemy講座を多数ご用意しています。",
      cta: {
        text: "Udemy講座を見る",
        url: "https://www.vibecodingstudio.dev/coupons",
      },
    }
  }

  // 上位1-3講座を抽出
  const topCourses = validCourses.slice(0, 3)

  // 最も一致度の高い講座のトピックを抽出
  const topTopics = Array.from(new Set(topCourses.flatMap(c => c.topics)))

  // トピックが複数ある場合、フィルター付きURLを生成
  let url = "https://www.vibecodingstudio.dev/coupons"
  if (topTopics.length > 0) {
    // 最初のトピックでフィルター
    url = `https://www.vibecodingstudio.dev/coupons?topic=${topTopics[0]}`
  }

  // 推薦講座が1件のみの場合、学習内容リストを生成
  if (topCourses.length === 1) {
    const course = topCourses[0]
    return {
      title: "🚀 体系的に学びたい方へ",
      description: course.description,
      cta: {
        text: `「${course.title}」を見る`,
        url: course.promotionUrl,
      },
    }
  }

  // 推薦講座が複数の場合
  const courseNames = topCourses.map(c => `・${c.title}`)
  return {
    title: "🚀 体系的に学びたい方へ",
    description: `この動画に関連するUdemy講座をご用意しています：`,
    courses: courseNames,
    cta: {
      text: "Udemy講座を見る",
      url,
    },
  }
}
