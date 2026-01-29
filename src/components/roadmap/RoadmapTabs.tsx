"use client"

import { getAllCourses, type CourseId } from "@/data/roadmaps"
import { clsx } from "clsx"

interface RoadmapTabsProps {
  activeCourse: CourseId
  onCourseChange: (courseId: CourseId) => void
}

export function RoadmapTabs({
  activeCourse,
  onCourseChange,
}: RoadmapTabsProps) {
  const courses = getAllCourses()

  return (
    <div className="flex justify-center">
      <div
        role="tablist"
        className="inline-flex overflow-x-auto rounded-2xl bg-white p-1.5 shadow-sm ring-1 ring-zinc-950/5"
      >
        {courses.map(course => {
          const isActive = activeCourse === course.id
          return (
            <button
              key={course.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => onCourseChange(course.id)}
              className={clsx(
                "rounded-xl px-5 py-2.5 text-sm font-medium whitespace-nowrap transition-all",
                isActive
                  ? "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-700/10"
                  : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950"
              )}
            >
              <span className="mr-1.5">{course.emoji}</span>
              {course.name}
            </button>
          )
        })}
      </div>
    </div>
  )
}
