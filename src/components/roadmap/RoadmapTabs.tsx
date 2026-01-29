"use client"

import { getAllCourses, type CourseId } from "@/data/roadmaps"
import { clsx } from "clsx"
import { motion } from "framer-motion"

interface RoadmapTabsProps {
  activeCourse: CourseId
  onCourseChange: (courseId: CourseId) => void
}

function CourseIcon({ icon }: { icon: string }) {
  if (icon === "globe") {
    return (
      <svg
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
        />
      </svg>
    )
  }

  return (
    <svg
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
      />
    </svg>
  )
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
        className="relative inline-flex rounded-lg bg-gray-100 p-1"
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
                "relative z-10 inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors",
                isActive ? "text-gray-950" : "text-gray-600 hover:text-gray-950"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 rounded-md bg-white shadow-sm"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">
                <CourseIcon icon={course.icon} />
              </span>
              <span className="relative z-10">{course.name}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
