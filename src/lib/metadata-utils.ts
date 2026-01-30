import type { Metadata } from 'next'

import { navigation } from '@/lib/navigation'

/**
 * チャプタートップページ用のメタデータ生成
 */
export function generateChapterMetadata(courseSlug: string, chapterSlug: string): Metadata {
  const course = navigation.find((c) => c.slug === courseSlug)
  if (!course) {
    // eslint-disable-next-line no-console
    console.warn(`[metadata-utils] Course not found for slug: ${courseSlug}`)
    return { title: 'Not Found' }
  }

  const chapter = course.links.find((link) =>
    link.href.includes(`/${courseSlug}/${chapterSlug}`),
  )

  const title = chapter
    ? `${chapter.title} - ${course.title}`
    : `${course.title}`

  const description = chapter
    ? `${course.title}コースの「${chapter.title}」チャプター。${chapter.children?.length ?? 0}個のレッスンで学べます。`
    : `${course.title}コースのカリキュラム`

  return {
    title,
    description,
  }
}
