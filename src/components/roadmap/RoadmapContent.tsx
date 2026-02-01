"use client"

import BreadcrumbWithStructuredData from "@/components/common/BreadcrumbWithStructuredData"
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
      <BreadcrumbWithStructuredData
        items={[{ label: "ホーム", href: "/" }, { label: "ロードマップ" }]}
        className="pt-8"
      />

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
