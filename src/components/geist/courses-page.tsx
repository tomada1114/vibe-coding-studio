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
        <header className="gg-container pt-16 pb-10 sm:pt-24 sm:pb-14">
          <p className="gg-label">{dict.courses.label}</p>
          {/* display（40px）まで。display-lg（56px）はトップページの氏名／肩書のみ。 */}
          <h1 className="text-text-primary mt-4 text-[40px] leading-[1.2] font-semibold tracking-[-0.02em]">
            {dict.courses.title}
          </h1>
          <p className="gg-prose-ja text-text-secondary mt-5 max-w-[720px] text-[16px] sm:text-[18px]">
            {dict.courses.lead}
          </p>
        </header>

        {/* グラデーション罫線。このページで唯一の 1 本。ヘッダー直下ではなく、
            見出しブロックと一覧の区切りに置く（sticky header の下線・現在地タブの
            下線と近接して意図が伝わりにくくなるのを避ける）。 */}
        <div className="gg-rule-accent" aria-hidden="true" />

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
