import { mobileCourse } from "./mobile"
import type { CourseId, RoadmapCourse } from "./types"
import { webCourse } from "./web"

export const courseIds: CourseId[] = ["web", "mobile"]

const courses: RoadmapCourse[] = [webCourse, mobileCourse]

export function getAllCourses(): readonly RoadmapCourse[] {
  return courses
}

export function getCourseById(id: CourseId): RoadmapCourse | undefined {
  return courses.find(course => course.id === id)
}

export function getDefaultCourse(): RoadmapCourse | undefined {
  return getCourseById("web")
}

export function isValidCourseId(id: string): id is CourseId {
  return courseIds.includes(id as CourseId)
}

export type {
  CourseId,
  DifficultyLevel,
  NodeCategory,
  NodeLinkType,
  RoadmapCourse,
  RoadmapNode,
  RoadmapNodeLink,
} from "./types"
