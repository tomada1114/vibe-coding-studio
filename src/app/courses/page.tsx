import { CourseList } from "@/components/courses/course-list"
import { getAllUdemyCourses } from "@/data/udemy-courses"
import { getSiteUrl } from "@/lib/seo/site-url"
import type { Metadata } from "next"

const siteUrl = getSiteUrl()

export const metadata: Metadata = {
  title: "講座一覧",
  description: "著者が公開しているUdemy講座の一覧です。",
  alternates: {
    canonical: `${siteUrl}/courses`,
  },
}

export default function CoursesPage() {
  const courses = getAllUdemyCourses()

  return (
    <div className="gg-surface">
      <main id="main-content">
        <div className="gg-rule-accent" aria-hidden="true" />
        <header className="mx-auto max-w-[1120px] px-4 pt-16 pb-10 sm:px-6 sm:pt-24 sm:pb-14 lg:px-8">
          <p className="gg-label">Courses</p>
          <h1 className="text-text-primary mt-4 text-[40px] leading-[1.15] font-semibold tracking-[-0.02em] sm:text-[56px] sm:leading-[1.1]">
            講座一覧
          </h1>
          <p className="gg-prose-ja text-text-secondary mt-5 max-w-[720px] text-[16px] sm:text-[18px]">
            著者が公開しているUdemy講座を、公開順に紹介しています。
          </p>
        </header>

        <div className="mx-auto max-w-[1120px] px-4 pb-24 sm:px-6 sm:pb-32 lg:px-8">
          <CourseList courses={courses} />
        </div>
      </main>
    </div>
  )
}
