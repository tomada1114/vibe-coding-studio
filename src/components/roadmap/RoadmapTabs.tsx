"use client"

import { getAllCourses, type CourseId } from "@/data/roadmaps"
import {
  DevicePhoneMobileIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline"
import { clsx } from "clsx"
import { motion } from "framer-motion"

interface RoadmapTabsProps {
  activeCourse: CourseId
  onCourseChange: (courseId: CourseId) => void
}

const courseIcons: Record<
  string,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  globe: GlobeAltIcon,
  smartphone: DevicePhoneMobileIcon,
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
                {(() => {
                  const Icon = courseIcons[course.icon] ?? GlobeAltIcon
                  return <Icon className="h-4 w-4" aria-hidden="true" />
                })()}
              </span>
              <span className="relative z-10">{course.name}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
