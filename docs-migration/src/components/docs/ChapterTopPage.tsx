import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

import BreadcrumbWithStructuredData from "@/components/common/BreadcrumbWithStructuredData"
import { Devicon } from "@/components/icons/Devicon"
import { navigation } from "@/lib/navigation"
import { generateDocsBreadcrumb } from "@/lib/seo/breadcrumb-utils"

type ChapterTopPageProps = {
  courseSlug: string
  chapterSlug: string
}

/**
 * チャプタートップページコンポーネント
 * navigation.tsからデータを読み込み、チャプターの概要と子リンク一覧を表示します
 */
export function ChapterTopPage({
  courseSlug,
  chapterSlug,
}: ChapterTopPageProps) {
  // コースの情報を取得
  const course = navigation.find(course => course.slug === courseSlug)
  if (!course) {
    notFound()
  }

  // チャプターの情報を取得
  const chapter = course.links.find(link =>
    link.href.includes(`/${courseSlug}/${chapterSlug}`)
  )
  if (!chapter) {
    notFound()
  }

  // 共通のカラーテーマ（青系統）を使用
  const iconColor = "text-sky-600"

  // パンくずリストのデータ
  const breadcrumbs = generateDocsBreadcrumb(
    courseSlug,
    course.title,
    chapter.title
  )

  return (
    <div className="container mx-auto px-4 py-12">
      <BreadcrumbWithStructuredData items={breadcrumbs} className="mb-8" />

      <div className="mb-12 text-center">
        <div className="flex items-center justify-center gap-3">
          <Devicon slug={courseSlug} size="xl" className={iconColor} />
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {chapter.title}
          </h1>
        </div>
        <Link
          href={`/docs/${courseSlug}`}
          className="text-muted-foreground mt-2 inline-block text-sm hover:underline"
        >
          {course.title} コースへ戻る
        </Link>
      </div>

      <div className="mx-auto max-w-4xl">
        <h2 className="mb-6 text-xl font-semibold tracking-tight">
          このチャプターで学べる内容
        </h2>
        <div className="space-y-2.5">
          {chapter.children?.map((lesson, index) => (
            <Link
              href={lesson.href}
              key={lesson.href}
              className="group block rounded-xl border border-slate-200 p-3.5 transition-all hover:cursor-pointer hover:bg-slate-50 hover:shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex flex-1 items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-medium text-slate-700">
                    {index + 1}
                  </span>
                  <h3 className="font-medium">{lesson.title}</h3>
                </div>
                <ChevronRight className="h-5 w-5 shrink-0 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-sky-600" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
