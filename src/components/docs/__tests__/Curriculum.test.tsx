import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import React from "react"
import type { CourseContent, ThemeColors } from "../Curriculum"
import { Curriculum } from "../Curriculum"

// Mock next/link
jest.mock("next/link", () => {
  const MockLink = ({
    children,
    href,
    className,
  }: {
    children: React.ReactNode
    href: string
    className?: string
  }) => {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    )
  }
  MockLink.displayName = "MockLink"
  return MockLink
})

// Mock lucide-react
jest.mock("lucide-react", () => ({
  ArrowRight: () => <span data-testid="arrow-right">→</span>,
  List: ({ className }: { className?: string }) => (
    <span data-testid="list-icon" className={className}>
      List
    </span>
  ),
}))

// Mock navigation
jest.mock("@/lib/navigation", () => ({
  navigation: [
    {
      slug: "ruby",
      title: "Ruby入門",
      links: [
        {
          title: "チャプター1: 基礎",
          href: "/docs/ruby/basics",
          children: [{ title: "変数", href: "/docs/ruby/basics/variables" }],
        },
      ],
    },
  ],
}))

// Mock breadcrumb utils
jest.mock("@/lib/seo/breadcrumb-utils", () => ({
  generateDocsBreadcrumb: jest.fn(() => []),
}))

// Mock BreadcrumbWithStructuredData
jest.mock("@/components/common/BreadcrumbWithStructuredData", () => {
  const MockBreadcrumb = () => <nav data-testid="breadcrumb">Breadcrumb</nav>
  MockBreadcrumb.displayName = "MockBreadcrumb"
  return MockBreadcrumb
})

// Mock Devicon
jest.mock("@/components/icons/Devicon", () => ({
  Devicon: ({ slug }: { slug: string }) => (
    <span data-testid={`devicon-${slug}`}>Icon</span>
  ),
}))

// Mock Heading
jest.mock("@/components/catalyst/heading", () => ({
  Heading: ({
    children,
    level,
    className,
  }: {
    children: React.ReactNode
    level: number
    className?: string
  }) => {
    const Tag = `h${level}` as keyof JSX.IntrinsicElements
    return <Tag className={className}>{children}</Tag>
  },
}))

// Create a mock icon component for features/targets
const MockIcon = ({ className }: { className?: string }) => (
  <span data-testid="mock-icon" className={className}>
    Icon
  </span>
)

const mockCourseContent: CourseContent = {
  title: "Ruby入門カリキュラム",
  description: "Rubyの基礎から応用まで学べます",
  shortDescription: "初心者向けのRuby学習カリキュラム",
  tagline: "ゼロからRubyを学ぼう",
  meta: {
    title: "Ruby入門",
    description: "Ruby入門カリキュラム",
  },
  features: [
    {
      icon: MockIcon,
      title: "実践的な学習",
      description: "実際のプロジェクトを通して学びます",
    },
  ],
  targetAudience: [
    {
      icon: MockIcon,
      title: "プログラミング初心者",
      description: "初めてプログラミングを学ぶ方",
    },
  ],
  curriculum: [
    {
      title: "チャプター1: 基礎",
      description: "Rubyの基本的な文法を学びます",
    },
  ],
  cta: {
    title: "今すぐ始めよう",
    description: "無料で学習を開始できます",
    primaryButtonText: "学習開始",
    primaryButtonLink: "/docs/ruby/basics",
  },
  chapterCount: 5,
}

const mockThemeColors: ThemeColors = {
  primary: "text-red-600",
  accent: "text-red-500",
  gradient: {
    from: "from-red-500",
    to: "to-red-600",
  },
  bg: {
    light: "from-red-50",
  },
  border: {
    light: "border-red-200",
  },
  text: {
    accent: "text-red-600",
    hover: "hover:text-red-600",
  },
  button: {
    bg: "bg-red-600",
    bgHover: "hover:bg-red-700",
    outline: "focus-visible:outline-red-600",
  },
}

describe("Curriculum", () => {
  describe("Basic rendering", () => {
    it("renders course title", () => {
      render(
        <Curriculum
          slug="ruby"
          courseContent={mockCourseContent}
          themeColors={mockThemeColors}
        />
      )
      expect(screen.getByText("Ruby入門カリキュラム")).toBeInTheDocument()
    })

    it("renders tagline", () => {
      render(
        <Curriculum
          slug="ruby"
          courseContent={mockCourseContent}
          themeColors={mockThemeColors}
        />
      )
      expect(screen.getByText("ゼロからRubyを学ぼう")).toBeInTheDocument()
    })

    it("renders short description", () => {
      render(
        <Curriculum
          slug="ruby"
          courseContent={mockCourseContent}
          themeColors={mockThemeColors}
        />
      )
      expect(
        screen.getByText("初心者向けのRuby学習カリキュラム")
      ).toBeInTheDocument()
    })

    it("renders breadcrumb", () => {
      render(
        <Curriculum
          slug="ruby"
          courseContent={mockCourseContent}
          themeColors={mockThemeColors}
        />
      )
      expect(screen.getByTestId("breadcrumb")).toBeInTheDocument()
    })

    it("renders Devicon", () => {
      render(
        <Curriculum
          slug="ruby"
          courseContent={mockCourseContent}
          themeColors={mockThemeColors}
        />
      )
      expect(screen.getByTestId("devicon-ruby")).toBeInTheDocument()
    })
  })

  describe("Features section", () => {
    it("renders feature title", () => {
      render(
        <Curriculum
          slug="ruby"
          courseContent={mockCourseContent}
          themeColors={mockThemeColors}
        />
      )
      expect(screen.getByText("実践的な学習")).toBeInTheDocument()
    })

    it("renders feature description", () => {
      render(
        <Curriculum
          slug="ruby"
          courseContent={mockCourseContent}
          themeColors={mockThemeColors}
        />
      )
      expect(
        screen.getByText("実際のプロジェクトを通して学びます")
      ).toBeInTheDocument()
    })
  })

  describe("Target audience section", () => {
    it("renders target audience title", () => {
      render(
        <Curriculum
          slug="ruby"
          courseContent={mockCourseContent}
          themeColors={mockThemeColors}
        />
      )
      expect(screen.getByText("プログラミング初心者")).toBeInTheDocument()
    })
  })

  describe("Curriculum chapters", () => {
    it("renders chapter title", () => {
      render(
        <Curriculum
          slug="ruby"
          courseContent={mockCourseContent}
          themeColors={mockThemeColors}
        />
      )
      // Chapter title appears in both quick nav and curriculum section
      const titles = screen.getAllByText("チャプター1: 基礎")
      expect(titles.length).toBeGreaterThanOrEqual(1)
    })

    it("renders chapter count", () => {
      render(
        <Curriculum
          slug="ruby"
          courseContent={mockCourseContent}
          themeColors={mockThemeColors}
        />
      )
      expect(screen.getByText(/5つのチャプター/)).toBeInTheDocument()
    })
  })

  describe("CTA section", () => {
    it("renders CTA title", () => {
      render(
        <Curriculum
          slug="ruby"
          courseContent={mockCourseContent}
          themeColors={mockThemeColors}
        />
      )
      expect(screen.getByText("今すぐ始めよう")).toBeInTheDocument()
    })

    it("renders primary button", () => {
      render(
        <Curriculum
          slug="ruby"
          courseContent={mockCourseContent}
          themeColors={mockThemeColors}
        />
      )
      const primaryLink = screen.getByText("学習開始")
      expect(primaryLink.closest("a")).toHaveAttribute(
        "href",
        "/docs/ruby/basics"
      )
    })

    it("does not render a secondary button", () => {
      render(
        <Curriculum
          slug="ruby"
          courseContent={mockCourseContent}
          themeColors={mockThemeColors}
        />
      )
      expect(screen.queryByText(/詳しく見る/)).not.toBeInTheDocument()
    })
  })

  describe("Quick navigation", () => {
    it("renders chapter list section title", () => {
      render(
        <Curriculum
          slug="ruby"
          courseContent={mockCourseContent}
          themeColors={mockThemeColors}
        />
      )
      expect(screen.getByText("チャプター一覧")).toBeInTheDocument()
    })

    it("renders lesson count for chapters", () => {
      render(
        <Curriculum
          slug="ruby"
          courseContent={mockCourseContent}
          themeColors={mockThemeColors}
        />
      )
      const lessonCounts = screen.getAllByText("1個のレッスン")
      expect(lessonCounts.length).toBeGreaterThanOrEqual(1)
    })
  })
})
