import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import {
  Pagination,
  PaginationGap,
  PaginationList,
  PaginationNext,
  PaginationPage,
  PaginationPrevious,
} from "../pagination"

describe("Pagination", () => {
  it("renders a nav element", () => {
    render(<Pagination data-testid="nav">Content</Pagination>)
    const nav = screen.getByTestId("nav")
    expect(nav).toBeInTheDocument()
    expect(nav.tagName).toBe("NAV")
  })

  it("has default aria-label", () => {
    render(<Pagination data-testid="nav">Content</Pagination>)
    expect(screen.getByTestId("nav")).toHaveAttribute(
      "aria-label",
      "Page navigation"
    )
  })

  it("supports custom aria-label", () => {
    render(
      <Pagination data-testid="nav" aria-label="Custom nav">
        Content
      </Pagination>
    )
    expect(screen.getByTestId("nav")).toHaveAttribute(
      "aria-label",
      "Custom nav"
    )
  })

  it("applies flex layout classes", () => {
    render(<Pagination data-testid="nav">Content</Pagination>)
    expect(screen.getByTestId("nav")).toHaveClass("flex", "gap-x-2")
  })

  it("supports custom className", () => {
    render(
      <Pagination data-testid="nav" className="custom">
        Content
      </Pagination>
    )
    expect(screen.getByTestId("nav")).toHaveClass("custom", "flex")
  })
})

describe("PaginationPrevious", () => {
  it("renders with disabled button when no href", () => {
    render(<PaginationPrevious />)
    const button = screen.getByRole("button", { name: "Previous page" })
    expect(button).toBeInTheDocument()
    expect(button).toBeDisabled()
  })

  it("renders as link when href is provided", () => {
    render(<PaginationPrevious href="/page/1" />)
    const link = screen.getByRole("link", { name: "Previous page" })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute("href", "/page/1")
  })

  it("renders default children text", () => {
    render(<PaginationPrevious />)
    expect(screen.getByText("Previous")).toBeInTheDocument()
  })

  it("renders custom children", () => {
    render(<PaginationPrevious>Back</PaginationPrevious>)
    expect(screen.getByText("Back")).toBeInTheDocument()
  })
})

describe("PaginationNext", () => {
  it("renders with disabled button when no href", () => {
    render(<PaginationNext />)
    const button = screen.getByRole("button", { name: "Next page" })
    expect(button).toBeInTheDocument()
    expect(button).toBeDisabled()
  })

  it("renders as link when href is provided", () => {
    render(<PaginationNext href="/page/3" />)
    const link = screen.getByRole("link", { name: "Next page" })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute("href", "/page/3")
  })

  it("renders default children text", () => {
    render(<PaginationNext />)
    expect(screen.getByText("Next")).toBeInTheDocument()
  })
})

describe("PaginationList", () => {
  it("renders a span element", () => {
    render(<PaginationList data-testid="list">Content</PaginationList>)
    const list = screen.getByTestId("list")
    expect(list).toBeInTheDocument()
    expect(list.tagName).toBe("SPAN")
  })

  it("applies layout classes", () => {
    render(<PaginationList data-testid="list">Content</PaginationList>)
    expect(screen.getByTestId("list")).toHaveClass("hidden", "sm:flex")
  })
})

describe("PaginationPage", () => {
  it("renders a link with page number", () => {
    render(<PaginationPage href="/page/2">2</PaginationPage>)
    const link = screen.getByRole("link", { name: "Page 2" })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute("href", "/page/2")
  })

  it("marks current page with aria-current", () => {
    render(
      <PaginationPage href="/page/1" current>
        1
      </PaginationPage>
    )
    const link = screen.getByRole("link", { name: "Page 1" })
    expect(link).toHaveAttribute("aria-current", "page")
  })

  it("does not mark non-current page with aria-current", () => {
    render(<PaginationPage href="/page/2">2</PaginationPage>)
    const link = screen.getByRole("link", { name: "Page 2" })
    expect(link).not.toHaveAttribute("aria-current")
  })
})

describe("PaginationGap", () => {
  it("renders an ellipsis by default", () => {
    render(<PaginationGap data-testid="gap" />)
    const gap = screen.getByTestId("gap")
    expect(gap).toBeInTheDocument()
    expect(gap).toHaveAttribute("aria-hidden", "true")
  })

  it("applies styling classes", () => {
    render(<PaginationGap data-testid="gap" />)
    expect(screen.getByTestId("gap")).toHaveClass(
      "w-9",
      "text-center",
      "font-semibold"
    )
  })

  it("supports custom className", () => {
    render(<PaginationGap data-testid="gap" className="custom" />)
    expect(screen.getByTestId("gap")).toHaveClass("custom")
  })
})
