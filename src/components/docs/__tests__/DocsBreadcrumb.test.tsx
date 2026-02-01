import "@testing-library/jest-dom"
import { render } from "@testing-library/react"
import { DocsBreadcrumb } from "../DocsBreadcrumb"

// Mock next/navigation
const mockUsePathname = jest.fn()
jest.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
}))

// Mock navigation data
jest.mock("@/lib/navigation", () => ({
  navigation: [
    {
      slug: "ruby",
      title: "Ruby入門",
      links: [],
    },
  ],
}))

// Mock breadcrumb utils
jest.mock("@/lib/seo/breadcrumb-utils", () => ({
  generateDocsBreadcrumb: jest.fn(() => [
    { label: "ドキュメント", href: "/docs" },
    { label: "Ruby入門", href: "/docs/ruby" },
  ]),
}))

// Mock BreadcrumbWithStructuredData
jest.mock("@/components/common/BreadcrumbWithStructuredData", () => {
  const MockBreadcrumb = ({
    items,
    className,
  }: {
    items: { label: string; href: string }[]
    className?: string
  }) => (
    <nav data-testid="breadcrumb" className={className}>
      {items.map((item, i) => (
        <span key={i}>{item.label}</span>
      ))}
    </nav>
  )
  MockBreadcrumb.displayName = "MockBreadcrumb"
  return MockBreadcrumb
})

describe("DocsBreadcrumb", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders breadcrumb on /docs path", () => {
    mockUsePathname.mockReturnValue("/docs/ruby")
    const { getByTestId } = render(<DocsBreadcrumb />)
    expect(getByTestId("breadcrumb")).toBeInTheDocument()
  })

  it("returns null for non-docs paths", () => {
    mockUsePathname.mockReturnValue("/about")
    const { container } = render(<DocsBreadcrumb />)
    expect(container.firstChild).toBeNull()
  })

  it("renders breadcrumb with mb-8 class", () => {
    mockUsePathname.mockReturnValue("/docs/ruby")
    const { getByTestId } = render(<DocsBreadcrumb />)
    expect(getByTestId("breadcrumb")).toHaveClass("mb-8")
  })

  it("renders breadcrumb items from navigation", () => {
    mockUsePathname.mockReturnValue("/docs/ruby/chapter-1")
    const { getByText } = render(<DocsBreadcrumb title="チャプター1" />)
    expect(getByText("ドキュメント")).toBeInTheDocument()
    expect(getByText("Ruby入門")).toBeInTheDocument()
  })
})
