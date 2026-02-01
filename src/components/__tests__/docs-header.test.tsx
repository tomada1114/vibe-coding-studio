import { DocsHeader } from "@/components/DocsHeader"
import { render, screen } from "@testing-library/react"

const mockUsePathname = jest.fn()
jest.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
}))

jest.mock("@/lib/navigation", () => ({
  navigation: [
    {
      title: "Getting Started",
      slug: "getting-started",
      links: [
        { title: "Introduction", href: "/docs/getting-started/intro" },
        { title: "Installation", href: "/docs/getting-started/install" },
      ],
    },
    {
      title: "Advanced",
      slug: "advanced",
      links: [{ title: "Plugins", href: "/docs/advanced/plugins" }],
    },
  ],
}))

describe("DocsHeader", () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  it("renders title", () => {
    mockUsePathname.mockReturnValue("/docs/some-page")

    render(<DocsHeader title="My Page" />)

    expect(screen.getByRole("heading", { name: "My Page" })).toBeInTheDocument()
  })

  it("renders section title when path matches navigation", () => {
    mockUsePathname.mockReturnValue("/docs/getting-started/intro")

    render(<DocsHeader title="Introduction" />)

    expect(screen.getByText("Getting Started")).toBeInTheDocument()
    expect(
      screen.getByRole("heading", { name: "Introduction" })
    ).toBeInTheDocument()
  })

  it("returns null when no title and no matching section", () => {
    mockUsePathname.mockReturnValue("/unknown-path")

    const { container } = render(<DocsHeader />)

    expect(container.innerHTML).toBe("")
  })

  it("renders title without section when path does not match", () => {
    mockUsePathname.mockReturnValue("/docs/other-page")

    render(<DocsHeader title="Other Page" />)

    expect(
      screen.getByRole("heading", { name: "Other Page" })
    ).toBeInTheDocument()
    expect(screen.queryByText("Getting Started")).not.toBeInTheDocument()
  })
})
