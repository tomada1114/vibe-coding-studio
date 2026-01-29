'use client'

import { clsx } from 'clsx'
import type { CourseId } from '@/data/roadmaps'

interface RoadmapTabsProps {
  activeCourse: CourseId
  onCourseChange: (courseId: CourseId) => void
}

const courses = [
  { id: 'beginner', name: '完全初心者', emoji: '🚀' },
  { id: 'web', name: 'Web開発', emoji: '🌐' },
  { id: 'mobile', name: 'スマホアプリ', emoji: '📱' },
  { id: 'python', name: 'Python開発', emoji: '🐍' },
] as const

export function RoadmapTabs({ activeCourse, onCourseChange }: RoadmapTabsProps) {
  return (
    <div className="flex justify-center">
      <div
        role="tablist"
        className="inline-flex overflow-x-auto rounded-2xl bg-white p-1.5 shadow-sm ring-1 ring-zinc-950/5"
      >
        {courses.map((course) => {
          const isActive = activeCourse === course.id
          return (
            <button
              key={course.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => onCourseChange(course.id)}
              className={clsx(
                'whitespace-nowrap rounded-xl px-5 py-2.5 text-sm font-medium transition-all',
                isActive
                  ? 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-700/10'
                  : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950'
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
