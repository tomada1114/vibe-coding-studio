import { ArrowRight } from "lucide-react"
import Link from "next/link"

import BreadcrumbWithStructuredData from "@/components/common/BreadcrumbWithStructuredData"
import { Devicon } from "@/components/icons/Devicon"
import { type CourseInfo, getCoursesForListPage } from "@/lib/course-constants"
import { generateDocsBreadcrumb } from "@/lib/seo/breadcrumb-utils"

const docsTitle = "学習コース一覧"
const docsDescription =
  "プログラミングの各種スキルを体系的に学べるオンラインコース一覧"

export const metadata = {
  title: docsTitle,
  description: docsDescription,
  openGraph: {
    title: docsTitle,
    description: docsDescription,
    type: "website",
    url: "/docs",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: docsTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: docsTitle,
    description: docsDescription,
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "/docs",
  },
}

function CourseCard({ course }: { course: CourseInfo }) {
  return (
    <div className="rounded-3xl border border-gray-200 p-8 transition-all hover:shadow-lg">
      <div className="flex flex-col items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <Devicon
            slug={course.slug}
            size="lg"
            className={course.colors.text}
          />
          <h3
            id={`course-${course.slug}`}
            className={`text-xl font-semibold ${course.colors.text}`}
          >
            {course.title}
          </h3>
        </div>
      </div>

      <p className="mt-4 text-gray-600">{course.shortDescription}</p>

      <Link
        href={course.topPagePath}
        aria-describedby={`course-${course.slug}`}
        className={`group mt-6 block rounded-md ${course.colors.buttonBg} px-4 py-3 text-center font-semibold text-white shadow-sm ${course.colors.buttonHover} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
      >
        <span className="flex items-center justify-center">
          コースを見る
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </Link>
    </div>
  )
}

function CourseSection({
  title,
  courses,
}: {
  title: string
  courses: CourseInfo[]
}) {
  return (
    <div className="mb-16">
      <div className="mb-8 flex items-center">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="ml-4 h-px flex-grow bg-gray-200"></div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {courses.map(course => (
          <CourseCard key={course.slug} course={course} />
        ))}
      </div>
    </div>
  )
}

/**
 * コース一覧ページ
 *
 * 利用可能な全てのコースを表示し、各コースの詳細ページにリンクします
 */
export default async function DocsPage() {
  const { frontendCourses, backendCourses, dataAiCourses } =
    getCoursesForListPage()

  const breadcrumbs = generateDocsBreadcrumb()

  return (
    <div className="container mx-auto px-4 py-16">
      <BreadcrumbWithStructuredData items={breadcrumbs} className="mb-8" />

      <div className="mb-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          学習コース一覧
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
          スキルアップをサポートする体系的なプログラミング学習コンテンツ
        </p>
      </div>

      <CourseSection title="フロントエンド開発" courses={frontendCourses} />
      <CourseSection title="バックエンド開発" courses={backendCourses} />
      <CourseSection title="データ分析・AI" courses={dataAiCourses} />

      <div className="mt-20 text-center">
        <h2 className="text-2xl font-semibold tracking-tight">
          定期的に新しいコンテンツを追加しています
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-gray-600">
          あなたのスキル向上をサポートする様々なコースをご用意しています。
        </p>
      </div>
    </div>
  )
}
