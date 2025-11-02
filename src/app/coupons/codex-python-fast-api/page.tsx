import { Container } from "@/components/container"
import { CourseContent } from "@/components/coupons/course-detail/CourseContent"
import { CourseDetailHero } from "@/components/coupons/course-detail/CourseDetailHero"
import { CourseFeatures } from "@/components/coupons/course-detail/CourseFeatures"
import { CourseProjects } from "@/components/coupons/course-detail/CourseProjects"
import { FloatingCTA } from "@/components/coupons/course-detail/FloatingCTA"
import { PriceSection } from "@/components/coupons/course-detail/PriceSection"
import { TargetAudience } from "@/components/coupons/course-detail/TargetAudience"
import { AsyncErrorBoundary } from "@/components/error-boundary"
import { Footer } from "@/components/footer"
import { Gradient } from "@/components/gradient"
import { Navbar } from "@/components/navbar"
import { codexPythonFastApiCourseDetails } from "@/data/coupons/courses/codex-python-fast-api"
import { getLatestCoupons } from "@/lib/coupons/coupon-data"
import {
  COURSE_CONFIG,
  generateCourseMetadata,
} from "@/lib/coupons/course-config"
import type { Metadata } from "next"

// 静的生成を明示的に設定
export const dynamic = "force-static"
export const revalidate = 3600 // 1時間ごとに再生成

const COURSE_ID = COURSE_CONFIG.CODEX_PYTHON_FAST_API.COURSE_ID

export const metadata: Metadata = generateCourseMetadata({
  courseId: COURSE_ID,
  slug: COURSE_CONFIG.CODEX_PYTHON_FAST_API.SLUG,
  imagePath: COURSE_CONFIG.CODEX_PYTHON_FAST_API.IMAGE_PATH,
  baseUrl: COURSE_CONFIG.CODEX_PYTHON_FAST_API.BASE_URL,
  courseDetails: codexPythonFastApiCourseDetails,
})

export default function CodexPythonFastApiPage() {
  const coupons = getLatestCoupons()
  const coupon = coupons.find(c => c.courseId === COURSE_ID)

  if (!coupon) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-semibold text-zinc-950">
            クーポン情報が見つかりませんでした
          </p>
          <p className="mt-2 text-sm text-zinc-600">
            コースID: {COURSE_ID}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-hidden">
      {/* ヘッダーセクション */}
      <AsyncErrorBoundary>
        <div className="relative">
          <Gradient className="absolute inset-2 bottom-0 rounded-4xl ring-1 ring-black/5 ring-inset" />
          <Container className="relative">
            <Navbar />
          </Container>
        </div>
      </AsyncErrorBoundary>

      {/* メインコンテンツ */}
      <main className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/30">
        <CourseDetailHero
          title={codexPythonFastApiCourseDetails.title}
          subtitle={codexPythonFastApiCourseDetails.subtitle}
          topics={coupon.courseInfo.topics}
          slug={coupon.courseInfo.slug}
        />

        <div className="mx-auto max-w-7xl py-8 sm:px-4 sm:py-12 lg:px-8">
          <div className="grid gap-6 sm:gap-8 lg:grid-cols-3">
            <div className="space-y-6 sm:space-y-8 lg:col-span-2">
              <CourseContent
                description={codexPythonFastApiCourseDetails.description}
              />
              <CourseFeatures
                features={codexPythonFastApiCourseDetails.features}
              />
              <CourseProjects
                projects={codexPythonFastApiCourseDetails.projects}
              />
              <TargetAudience
                audiences={codexPythonFastApiCourseDetails.targetAudience}
              />
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <PriceSection coupon={coupon} />
              </div>
            </div>
          </div>
        </div>

        <FloatingCTA coupon={coupon} />
      </main>

      {/* フッターセクション */}
      <AsyncErrorBoundary>
        <Footer />
      </AsyncErrorBoundary>
    </div>
  )
}
