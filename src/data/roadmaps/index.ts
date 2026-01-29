import type { CourseId, RoadmapCourse } from './types'
import { beginnerCourse } from './beginner'
import { webCourse } from './web'
import { mobileCourse } from './mobile'

// コースID一覧（定数）
export const courseIds: CourseId[] = ['beginner', 'web', 'mobile']

// コースデータ
const courses: RoadmapCourse[] = [beginnerCourse, webCourse, mobileCourse]

/**
 * すべてのコースを取得
 */
export function getAllCourses(): RoadmapCourse[] {
  return courses
}

/**
 * IDでコースを取得
 */
export function getCourseById(id: CourseId): RoadmapCourse | undefined {
  return courses.find((course) => course.id === id)
}

/**
 * デフォルトコースを取得（beginner）
 */
export function getDefaultCourse(): RoadmapCourse | undefined {
  return getCourseById('beginner')
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
  NodeLinkType,
  DifficultyLevel,
  NodeCategory,
  RoadmapNodeLink,
  RoadmapNode,
  RoadmapEdge,
  RoadmapCourse,
} from './types'
