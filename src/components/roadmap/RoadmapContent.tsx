"use client"

import { Container } from "@/components/container"
import { RoadmapFlow } from "@/components/roadmap/RoadmapFlow"
import { RoadmapTabs } from "@/components/roadmap/RoadmapTabs"
import { getCourseById, isValidCourseId, type CourseId } from "@/data/roadmaps"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export function RoadmapContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const courseParam = searchParams.get("course")

  const [activeCourse, setActiveCourse] = useState<CourseId>(() => {
    if (courseParam && isValidCourseId(courseParam)) {
      return courseParam
    }
    return "web"
  })

  useEffect(() => {
    if (courseParam && isValidCourseId(courseParam)) {
      setActiveCourse(courseParam)
    }
  }, [courseParam])

  const handleCourseChange = (courseId: CourseId) => {
    setActiveCourse(courseId)
    router.push(`/roadmap?course=${courseId}`, { scroll: false })
  }

  const course = getCourseById(activeCourse)

  if (!course) {
    return (
      <Container className="py-24 text-center">
        <p className="text-lg text-gray-600">
          指定されたコースが見つかりませんでした。
        </p>
        <Link
          href="/roadmap"
          className="mt-4 inline-block text-blue-600 hover:text-blue-700"
        >
          ロードマップトップに戻る
        </Link>
      </Container>
    )
  }

  return (
    <Container className="pb-24">
      <nav className="pt-8" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link
              href="/"
              className="text-gray-500 transition-colors hover:text-gray-700"
            >
              ホーム
            </Link>
          </li>
          <li className="flex items-center">
            <svg
              className="mx-2 h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span className="font-medium text-gray-950">ロードマップ</span>
          </li>
        </ol>
      </nav>

      <h1 className="mt-6 text-3xl font-bold text-gray-950">
        学習ロードマップ
      </h1>

      <div className="mt-8 mb-10">
        <RoadmapTabs
          activeCourse={activeCourse}
          onCourseChange={handleCourseChange}
        />
      </div>

      <RoadmapFlow course={course} />
    </Container>
  )
}
