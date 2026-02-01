import { DocsLayout } from "@/components/DocsLayout"
import { render, screen } from "@testing-library/react"

// Mock child components
jest.mock("@/components/DocsHeader", () => ({
  DocsHeader: ({ title }: { title?: string }) => (
    <div data-testid="docs-header">{title}</div>
  ),
}))

jest.mock("@/components/PrevNextLinks", () => ({
  PrevNextLinks: () => <div data-testid="prev-next-links" />,
}))

jest.mock("@/components/Prose", () => ({
  Prose: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="prose">{children}</div>
  ),
}))

jest.mock("@/components/docs/AuthorCredit", () => ({
  AuthorCredit: ({
    authorName,
  }: {
    authorName?: string
    createdAt?: string
    updatedAt?: string
    className?: string
  }) => <div data-testid="author-credit">{authorName}</div>,
}))

jest.mock("@/components/docs/DocsBreadcrumb", () => ({
  DocsBreadcrumb: ({ title }: { title?: string }) => (
    <div data-testid="docs-breadcrumb">{title}</div>
  ),
}))

jest.mock("@/components/structured-data/DocsArticleStructuredData", () => ({
  DocsArticleStructuredData: () => <script data-testid="structured-data" />,
}))

describe("DocsLayout", () => {
  it("renders all child components", () => {
    render(
      <DocsLayout frontmatter={{ title: "Test Page", author: "Author" }}>
        <p>Page content</p>
      </DocsLayout>
    )

    expect(screen.getByTestId("docs-header")).toBeInTheDocument()
    expect(screen.getByTestId("prev-next-links")).toBeInTheDocument()
    expect(screen.getByTestId("prose")).toBeInTheDocument()
    expect(screen.getByTestId("author-credit")).toBeInTheDocument()
    expect(screen.getByTestId("docs-breadcrumb")).toBeInTheDocument()
  })

  it("passes title to child components", () => {
    render(
      <DocsLayout frontmatter={{ title: "My Title" }}>
        <p>Content</p>
      </DocsLayout>
    )

    expect(screen.getByTestId("docs-header")).toHaveTextContent("My Title")
    expect(screen.getByTestId("docs-breadcrumb")).toHaveTextContent("My Title")
  })

  it("renders structured data when title is provided", () => {
    render(
      <DocsLayout frontmatter={{ title: "With Title" }}>
        <p>Content</p>
      </DocsLayout>
    )

    expect(screen.getByTestId("structured-data")).toBeInTheDocument()
  })

  it("does not render structured data without title", () => {
    render(
      <DocsLayout frontmatter={{}}>
        <p>Content</p>
      </DocsLayout>
    )

    expect(screen.queryByTestId("structured-data")).not.toBeInTheDocument()
  })

  it("renders children inside Prose", () => {
    render(
      <DocsLayout frontmatter={{ title: "Test" }}>
        <p>Prose content here</p>
      </DocsLayout>
    )

    const prose = screen.getByTestId("prose")
    expect(prose).toHaveTextContent("Prose content here")
  })

  it("passes author information", () => {
    render(
      <DocsLayout frontmatter={{ title: "Test", author: "John Doe" }}>
        <p>Content</p>
      </DocsLayout>
    )

    expect(screen.getByTestId("author-credit")).toHaveTextContent("John Doe")
  })
})
