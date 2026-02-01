import { PrevNextLinks } from "@/components/PrevNextLinks"
import { render, screen } from "@testing-library/react"

const mockUsePathname = jest.fn()
jest.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
}))

jest.mock("@/lib/navigation", () => ({
  navigation: [
    {
      title: "Section 1",
      slug: "section1",
      links: [
        {
          title: "Page A",
          href: "/docs/section1/page-a",
          children: [
            { title: "Page A-1", href: "/docs/section1/page-a/child1" },
          ],
        },
        { title: "Page B", href: "/docs/section1/page-b" },
      ],
    },
    {
      title: "Section 2",
      slug: "section2",
      links: [{ title: "Page C", href: "/docs/section2/page-c" }],
    },
  ],
}))

describe("PrevNextLinks", () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  it("renders both previous and next links when in the middle", () => {
    mockUsePathname.mockReturnValue("/docs/section1/page-a/child1")

    render(<PrevNextLinks />)

    expect(screen.getByText("Previous")).toBeInTheDocument()
    expect(screen.getByText("Next")).toBeInTheDocument()
    expect(screen.getByText("Page A")).toBeInTheDocument()
    expect(screen.getByText("Page B")).toBeInTheDocument()
  })

  it("renders only next link on first page", () => {
    mockUsePathname.mockReturnValue("/docs/section1/page-a")

    render(<PrevNextLinks />)

    expect(screen.queryByText("Previous")).not.toBeInTheDocument()
    expect(screen.getByText("Next")).toBeInTheDocument()
  })

  it("renders only previous link on last page", () => {
    mockUsePathname.mockReturnValue("/docs/section2/page-c")

    render(<PrevNextLinks />)

    expect(screen.getByText("Previous")).toBeInTheDocument()
    expect(screen.queryByText("Next")).not.toBeInTheDocument()
  })

  it("returns null when path does not match any navigation", () => {
    mockUsePathname.mockReturnValue("/unknown-page")

    const { container } = render(<PrevNextLinks />)

    expect(container.innerHTML).toBe("")
  })

  it("includes child links in flattened navigation", () => {
    mockUsePathname.mockReturnValue("/docs/section1/page-b")

    render(<PrevNextLinks />)

    // Previous should be the child link (Page A-1), not Page A
    expect(screen.getByText("Page A-1")).toBeInTheDocument()
  })
})
