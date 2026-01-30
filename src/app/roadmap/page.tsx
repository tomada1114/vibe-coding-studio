import { Container } from "@/components/container"
import { AsyncErrorBoundary } from "@/components/error-boundary"
import { Footer } from "@/components/footer"
import { Gradient } from "@/components/gradient"
import { Navbar } from "@/components/navbar"
import { RoadmapContent } from "@/components/roadmap/RoadmapContent"
import type { Metadata } from "next"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "ロードマップ | Vibe Coding Studio",
  description:
    "Claude Codeを使ったAI駆動開発の学習ロードマップ。目的別に最適な学習パスを選び、プログラミング未経験からプロフェッショナルまで効率的にスキルを習得できます。",
}

export default function RoadmapPage() {
  return (
    <div className="overflow-hidden">
      <AsyncErrorBoundary>
        <div className="relative">
          <Gradient className="absolute inset-2 bottom-0 rounded-4xl ring-1 ring-black/5 ring-inset" />
          <Container className="relative">
            <Navbar />
          </Container>
        </div>
      </AsyncErrorBoundary>

      <main>
        <Suspense
          fallback={
            <div className="flex min-h-screen items-center justify-center">
              <div className="text-gray-500">読み込み中...</div>
            </div>
          }
        >
          <RoadmapContent />
        </Suspense>
      </main>

      <AsyncErrorBoundary>
        <Footer />
      </AsyncErrorBoundary>
    </div>
  )
}
