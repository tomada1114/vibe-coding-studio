import "@testing-library/jest-dom"
import { render } from "@testing-library/react"
import { DocsArticleStructuredData } from "../DocsArticleStructuredData"

// Mock next/navigation
const mockUsePathname = jest.fn()
jest.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
}))

// Mock renderDocsArticleJsonLd
const mockRenderJsonLd = jest.fn()
jest.mock("@/lib/constants/structured_data/docs", () => ({
  renderDocsArticleJsonLd: (...args: unknown[]) => mockRenderJsonLd(...args),
}))

describe("DocsArticleStructuredData", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockRenderJsonLd.mockReturnValue('{"@type":"Article","name":"Test"}')
  })

  it("renders script tag with structured data on valid docs path", () => {
    mockUsePathname.mockReturnValue("/docs/ruby/basics")
    const { container } = render(<DocsArticleStructuredData title="Ruby基礎" />)
    const script = container.querySelector('script[type="application/ld+json"]')
    expect(script).toBeInTheDocument()
    expect(script?.innerHTML).toBe('{"@type":"Article","name":"Test"}')
  })

  it("returns null for non-docs paths", () => {
    mockUsePathname.mockReturnValue("/about")
    const { container } = render(<DocsArticleStructuredData title="About" />)
    expect(
      container.querySelector('script[type="application/ld+json"]')
    ).not.toBeInTheDocument()
  })

  it("returns null when courseSlug is missing", () => {
    mockUsePathname.mockReturnValue("/docs")
    const { container } = render(<DocsArticleStructuredData title="Docs" />)
    expect(
      container.querySelector('script[type="application/ld+json"]')
    ).not.toBeInTheDocument()
  })

  it("returns null when renderDocsArticleJsonLd returns empty", () => {
    mockUsePathname.mockReturnValue("/docs/ruby/basics")
    mockRenderJsonLd.mockReturnValue("")
    const { container } = render(<DocsArticleStructuredData title="Ruby" />)
    expect(
      container.querySelector('script[type="application/ld+json"]')
    ).not.toBeInTheDocument()
  })

  it("passes correct parameters to renderDocsArticleJsonLd", () => {
    mockUsePathname.mockReturnValue("/docs/ruby/basics")
    render(
      <DocsArticleStructuredData
        title="Ruby基礎"
        description="Rubyの基礎を学ぶ"
        datePublished="2025-01-01"
        dateModified="2025-06-01"
        author="テスト著者"
      />
    )
    expect(mockRenderJsonLd).toHaveBeenCalledWith(
      "ruby",
      "Ruby基礎",
      expect.stringContaining("/docs/ruby/basics"),
      {
        description: "Rubyの基礎を学ぶ",
        datePublished: "2025-01-01",
        dateModified: "2025-06-01",
        author: "テスト著者",
      }
    )
  })

  it("uses courseSlug from pathname segments", () => {
    mockUsePathname.mockReturnValue("/docs/rails/getting-started")
    render(<DocsArticleStructuredData title="Rails入門" />)
    expect(mockRenderJsonLd).toHaveBeenCalledWith(
      "rails",
      "Rails入門",
      expect.stringContaining("/docs/rails/getting-started"),
      expect.any(Object)
    )
  })
})
