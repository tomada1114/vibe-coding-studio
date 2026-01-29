import { ChapterTopPage } from '@/components/docs/ChapterTopPage';
import { generateChapterMetadata } from '@/lib/metadata-utils';
import { Metadata } from 'next';

// Next.js 15では params が Promise として扱われる
export async function generateMetadata({
  params
}: {
  params: Promise<{ course: string; chapter: string }>
}): Promise<Metadata> {
  const resolvedParams = await params;
  return generateChapterMetadata(resolvedParams.course, resolvedParams.chapter);
}

// ページコンポーネントも async にして params を await する
export default async function ChapterPage({
  params
}: {
  params: Promise<{ course: string; chapter: string }>
}) {
  const { course, chapter } = await params;
  return <ChapterTopPage courseSlug={course} chapterSlug={chapter} />;
}
