import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import React from "react"
import { ChapterTopPage } from "../ChapterTopPage"

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

// Mock next/navigation
const mockNotFound = jest.fn()
jest.mock("next/navigation", () => ({
  notFound: () => {
    mockNotFound()
    throw new Error("NEXT_NOT_FOUND")
  },
}))

// Mock lucide-react
jest.mock("lucide-react", () => ({
  ChevronRight: () => <span data-testid="chevron-icon">→</span>,
}))

// Mock navigation data
jest.mock("@/lib/navigation", () => ({
  navigation: [
    {
      slug: "ruby",
      title: "Ruby入門",
      links: [
        {
          slug: "basics",
          title: "基礎",
          href: "/docs/ruby/basics",
          children: [
            { title: "変数", href: "/docs/ruby/basics/variables" },
            { title: "メソッド", href: "/docs/ruby/basics/methods" },
          ],
        },
        {
          slug: "advanced",
          title: "応用",
          href: "/docs/ruby/advanced",
          children: [{ title: "クラス", href: "/docs/ruby/advanced/classes" }],
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

describe("ChapterTopPage", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders chapter title", () => {
    render(<ChapterTopPage courseSlug="ruby" chapterSlug="basics" />)
    expect(screen.getByText("基礎")).toBeInTheDocument()
  })

  it("renders child lessons as links", () => {
    render(<ChapterTopPage courseSlug="ruby" chapterSlug="basics" />)
    expect(screen.getByText("変数")).toBeInTheDocument()
    expect(screen.getByText("メソッド")).toBeInTheDocument()
  })

  it("renders lesson links with correct href", () => {
    render(<ChapterTopPage courseSlug="ruby" chapterSlug="basics" />)
    const links = screen.getAllByRole("link")
    const variablesLink = links.find(l => l.textContent?.includes("変数"))
    expect(variablesLink).toHaveAttribute("href", "/docs/ruby/basics/variables")
  })

  it("renders Devicon with course slug", () => {
    render(<ChapterTopPage courseSlug="ruby" chapterSlug="basics" />)
    expect(screen.getByTestId("devicon-ruby")).toBeInTheDocument()
  })

  it("renders breadcrumb", () => {
    render(<ChapterTopPage courseSlug="ruby" chapterSlug="basics" />)
    expect(screen.getByTestId("breadcrumb")).toBeInTheDocument()
  })

  it("calls notFound for invalid course slug", () => {
    expect(() => {
      render(<ChapterTopPage courseSlug="nonexistent" chapterSlug="basics" />)
    }).toThrow("NEXT_NOT_FOUND")
    expect(mockNotFound).toHaveBeenCalled()
  })

  it("calls notFound for invalid chapter slug", () => {
    expect(() => {
      render(<ChapterTopPage courseSlug="ruby" chapterSlug="nonexistent" />)
    }).toThrow("NEXT_NOT_FOUND")
    expect(mockNotFound).toHaveBeenCalled()
  })
})
