import { ChapterTopPage } from "@/components/docs/ChapterTopPage"
import { generateChapterMetadata } from "@/lib/metadata-utils"
import { navigation } from "@/lib/navigation"
import type { Metadata } from "next"

// 全チャプターをビルド時に静的生成する（オンデマンドレンダリング回避）
export function generateStaticParams() {
  return navigation.flatMap(course =>
    course.links.map(link => ({
      course: course.slug,
      chapter: link.href.split("/").pop() as string,
    }))
  )
}

// Next.js 15では params が Promise として扱われる
export async function generateMetadata({
  params,
}: {
  params: Promise<{ course: string; chapter: string }>
}): Promise<Metadata> {
  const resolvedParams = await params
  return generateChapterMetadata(resolvedParams.course, resolvedParams.chapter)
}

// ページコンポーネントも async にして params を await する
export default async function ChapterPage({
  params,
}: {
  params: Promise<{ course: string; chapter: string }>
}) {
  const { course, chapter } = await params
  return <ChapterTopPage courseSlug={course} chapterSlug={chapter} />
}
