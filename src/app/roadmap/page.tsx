'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { RoadmapTabs } from '@/components/roadmap/RoadmapTabs'
import { RoadmapFlow } from '@/components/roadmap/RoadmapFlow'
import { getCourseById, isValidCourseId, type CourseId } from '@/data/roadmaps'
import { Container } from '@/components/container'
import { Gradient } from '@/components/gradient'

function RoadmapContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const courseParam = searchParams.get('course')

  const [activeCourse, setActiveCourse] = useState<CourseId>(() => {
    if (courseParam && isValidCourseId(courseParam)) {
      return courseParam
    }
    return 'beginner'
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

  if (!course) return null

  return (
    <>
      {/* Header with Gradient */}
      <div className="relative">
        <Gradient className="absolute inset-2 bottom-0 rounded-4xl ring-1 ring-black/5 ring-inset" />
        <Container className="relative">
          {/* Breadcrumb */}
          <nav className="mb-10 pt-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-zinc-500 transition-colors duration-200 hover:text-zinc-700"
                >
                  ホーム
                </Link>
              </li>
              <li className="flex items-center">
                <svg
                  className="mx-2 h-4 w-4 text-zinc-400"
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
                <span className="font-medium text-zinc-950">ロードマップ</span>
              </li>
            </ol>
          </nav>

          {/* Header Section */}
          <div className="mb-16">
            <div className="mb-8 text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2 text-sm font-medium text-blue-700 ring-1 ring-blue-700/10">
                <span className="text-xs">🗺️</span>
                目的別学習ガイド
              </div>
              <h1 className="mb-6 text-4xl font-bold leading-tight text-zinc-950 sm:text-5xl lg:text-6xl">
                Claude Code
                <br className="sm:hidden" />
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {' '}
                  学習ロードマップ
                </span>
              </h1>
            </div>

            <div className="mx-auto max-w-4xl text-center">
              <p className="text-lg leading-relaxed text-zinc-600 sm:text-xl">
                あなたの目的に合わせた
                <span className="mx-1 inline-flex items-center gap-1 rounded-lg bg-blue-50 px-2 py-1 text-base font-semibold text-blue-700">
                  最適な学習パス
                </span>
                を選んでください
              </p>
              <p className="mt-6 text-base leading-relaxed text-zinc-600 sm:text-lg">
                プログラミング未経験からプロフェッショナルまで
                <br className="hidden sm:inline" />
                効率的にスキルを習得できます
              </p>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Content */}
      <Container className="pb-24">
        {/* Course Selector Tabs */}
        <div className="mb-12">
          <RoadmapTabs
            activeCourse={activeCourse}
            onCourseChange={handleCourseChange}
          />
        </div>

        {/* Roadmap Flow */}
        <RoadmapFlow course={course} />
      </Container>
    </>
  )
}

export default function RoadmapPage() {
  return (
    <main className="overflow-hidden">
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center">
            <div className="text-zinc-500">読み込み中...</div>
          </div>
        }
      >
        <RoadmapContent />
      </Suspense>
    </main>
  )
}
