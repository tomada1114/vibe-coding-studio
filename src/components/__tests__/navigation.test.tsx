import { Navigation } from "@/components/Navigation"
import { render, screen } from "@testing-library/react"

const mockUsePathname = jest.fn()
jest.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
}))

jest.mock("@/lib/navigation", () => ({
  navigation: [
    {
      title: "Ruby",
      slug: "ruby",
      links: [
        {
          title: "Introduction",
          href: "/docs/ruby/intro",
          children: [{ title: "Basics", href: "/docs/ruby/intro/basics" }],
        },
        { title: "Advanced", href: "/docs/ruby/advanced" },
      ],
    },
    {
      title: "Rails",
      slug: "rails",
      links: [{ title: "Getting Started", href: "/docs/rails/start" }],
    },
  ],
}))

describe("Navigation", () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  it("renders navigation links", () => {
    mockUsePathname.mockReturnValue("/docs")

    render(<Navigation />)

    expect(screen.getByText("Introduction")).toBeInTheDocument()
    expect(screen.getByText("Advanced")).toBeInTheDocument()
    expect(screen.getByText("Getting Started")).toBeInTheDocument()
  })

  it("filters navigation by slug when on a specific course page", () => {
    mockUsePathname.mockReturnValue("/docs/ruby/intro")

    render(<Navigation />)

    expect(screen.getByText("Introduction")).toBeInTheDocument()
    expect(screen.queryByText("Getting Started")).not.toBeInTheDocument()
  })

  it("highlights current page link", () => {
    mockUsePathname.mockReturnValue("/docs/ruby/intro")

    render(<Navigation />)

    const currentLink = screen.getByText("Introduction").closest("a")
    expect(currentLink).toHaveClass("text-sky-500")
  })

  it("renders child navigation items", () => {
    mockUsePathname.mockReturnValue("/docs/ruby/intro/basics")

    render(<Navigation />)

    expect(screen.getByText("Basics")).toBeInTheDocument()
  })

  it("applies custom className", () => {
    mockUsePathname.mockReturnValue("/docs")

    const { container } = render(<Navigation className="custom-nav" />)

    const nav = container.querySelector("nav")
    expect(nav).toHaveClass("custom-nav")
  })

  it("calls onLinkClick when link is clicked", () => {
    mockUsePathname.mockReturnValue("/docs")
    const handleClick = jest.fn()

    render(<Navigation onLinkClick={handleClick} />)

    const link = screen.getByText("Introduction").closest("a")
    link?.click()

    expect(handleClick).toHaveBeenCalled()
  })
})
