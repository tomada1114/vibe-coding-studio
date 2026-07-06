import { Container } from "@/components/container"
import { AsyncErrorBoundary } from "@/components/error-boundary"
import { Footer } from "@/components/footer"
import { Gradient } from "@/components/gradient"
import { Navbar } from "@/components/navbar"
import { RoadmapContent } from "@/components/roadmap/RoadmapContent"
import { getAllCourses } from "@/data/roadmaps"
import type { Metadata } from "next"
import { Suspense } from "react"

const title = "ロードマップ"
const ogTitle = "ロードマップ | Vibe Coding Studio"
const description =
  "Claude Codeを使ったAI駆動開発の学習ロードマップ。目的別に最適な学習パスを選び、プログラミング未経験からプロフェッショナルまで効率的にスキルを習得できます。"

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title: ogTitle,
    description,
    type: "website",
    url: "/roadmap",
    images: [
      {
        url: "/vcs-logo-wide-transparent.png",
        width: 1200,
        height: 630,
        alt: ogTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: ogTitle,
    description,
    images: ["/vcs-logo-wide-transparent.png"],
  },
  alternates: {
    canonical: "/roadmap",
  },
}

function RoadmapStructuredData() {
  const courses = getAllCourses()

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "AI駆動開発 学習ロードマップ",
    description,
    itemListElement: courses.map((course, index) => ({
      "@type": "LearningResource",
      position: index + 1,
      name: course.name,
      description: course.description,
      educationalLevel: "Beginner to Advanced",
      learningResourceType: "learning pathway",
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export default function RoadmapPage() {
  return (
    <div className="overflow-hidden">
      <RoadmapStructuredData />
      <AsyncErrorBoundary>
        <div className="relative">
          <Gradient className="absolute inset-2 bottom-0 rounded-4xl ring-1 ring-black/5 ring-inset" />
          <Container className="relative">
            <Navbar />
          </Container>
        </div>
      </AsyncErrorBoundary>

      <main id="main-content">
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
