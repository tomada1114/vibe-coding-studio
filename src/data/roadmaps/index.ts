import { mobileCourse } from "./mobile"
import type { CourseId, RoadmapCourse } from "./types"
import { webCourse } from "./web"

// コースID一覧（定数）
export const courseIds: CourseId[] = ["web", "mobile"]

// コースデータ
const courses: RoadmapCourse[] = [webCourse, mobileCourse]

/**
 * すべてのコースを取得
 */
export function getAllCourses(): readonly RoadmapCourse[] {
  return courses
}

/**
 * IDでコースを取得
 */
export function getCourseById(id: CourseId): RoadmapCourse | undefined {
  return courses.find(course => course.id === id)
}

/**
 * デフォルトコースを取得（web）
 */
export function getDefaultCourse(): RoadmapCourse | undefined {
  return getCourseById("web")
}

/**
 * コースIDが有効かどうかを検証
 */
export function isValidCourseId(id: string): id is CourseId {
  return courseIds.includes(id as CourseId)
}

// 型の再エクスポート
export type {
  CourseId,
  DifficultyLevel,
  NodeCategory,
  NodeLinkType,
  RoadmapCourse,
  RoadmapNode,
  RoadmapNodeLink,
} from "./types"
