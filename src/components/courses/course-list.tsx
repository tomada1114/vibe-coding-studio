import { getAllUdemyCourses } from "@/data/udemy-courses"
import type { UdemyCourse } from "@/types/udemy-course"
import { CourseCard } from "./course-card"

export function CourseList({
  courses = getAllUdemyCourses(),
  topicsLabel,
}: {
  courses?: UdemyCourse[]
  topicsLabel?: string
}) {
  return (
    <div
      data-testid="course-list"
      className="gg-cell-grid grid-cols-1 md:grid-cols-2"
    >
      {courses.map(course => (
        <CourseCard key={course.id} course={course} topicsLabel={topicsLabel} />
      ))}
    </div>
  )
}
