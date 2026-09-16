import { CourseList } from "@/components/courses/course-list"
import { getAllUdemyCourses } from "@/data/udemy-courses"
import type { Dictionary } from "@/i18n/dictionaries"
import type { Locale } from "@/i18n/locale"

export function CoursesPage({
  locale,
  dict,
}: {
  locale: Locale
  dict: Dictionary
}) {
  const courses = getAllUdemyCourses()

  return (
    <div className="gg-surface" data-locale={locale}>
      <main id="main-content" aria-label={dict.courses.title}>
        <div className="gg-rule-accent" aria-hidden="true" />
        <header className="gg-container pt-16 pb-10 sm:pt-24 sm:pb-14">
          <p className="gg-label">{dict.courses.label}</p>
          <h1 className="text-text-primary mt-4 text-[40px] leading-[1.15] font-semibold tracking-[-0.02em] sm:text-[56px] sm:leading-[1.1]">
            {dict.courses.title}
          </h1>
          <p className="gg-prose-ja text-text-secondary mt-5 max-w-[720px] text-[16px] sm:text-[18px]">
            {dict.courses.lead}
          </p>
        </header>

        <div className="gg-container pb-24 sm:pb-32">
          <CourseList
            courses={courses}
            topicsLabel={dict.courses.topicsLabel}
          />
        </div>
      </main>
    </div>
  )
}
