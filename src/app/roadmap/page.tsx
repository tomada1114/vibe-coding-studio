import { Suspense } from 'react'
import type { Metadata } from 'next'
import { RoadmapContent } from '@/components/roadmap/RoadmapContent'

export const metadata: Metadata = {
  title: 'ロードマップ | Vibe Coding Studio',
  description:
    'Claude Codeを使ったAI駆動開発の学習ロードマップ。目的別に最適な学習パスを選び、プログラミング未経験からプロフェッショナルまで効率的にスキルを習得できます。',
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
