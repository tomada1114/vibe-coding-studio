import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import { DocsSidebar } from "../DocsSidebar"

// Mock next/navigation
const mockUsePathname = jest.fn()
jest.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
}))

// Mock shouldShowNavigation
jest.mock("@/lib/navigation-utils", () => ({
  shouldShowNavigation: (path: string) =>
    path.startsWith("/docs/") && path !== "/docs/" && !path.startsWith("/blog"),
}))

// Mock Navigation
jest.mock("@/components/Navigation", () => ({
  Navigation: () => <nav data-testid="sidebar-navigation">Navigation</nav>,
}))

describe("DocsSidebar", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders Navigation on docs subpages", () => {
    mockUsePathname.mockReturnValue("/docs/ruby/intro")
    render(<DocsSidebar />)
    expect(screen.getByTestId("sidebar-navigation")).toBeInTheDocument()
  })

  it("returns null on non-docs pages", () => {
    mockUsePathname.mockReturnValue("/about")
    const { container } = render(<DocsSidebar />)
    expect(container.firstChild).toBeNull()
  })

  it("returns null on /docs/ root", () => {
    mockUsePathname.mockReturnValue("/docs/")
    const { container } = render(<DocsSidebar />)
    expect(container.firstChild).toBeNull()
  })

  it("has hidden class for small screens", () => {
    mockUsePathname.mockReturnValue("/docs/ruby/intro")
    const { container } = render(<DocsSidebar />)
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).toHaveClass("hidden")
  })

  it("has lg:block class for large screens", () => {
    mockUsePathname.mockReturnValue("/docs/ruby/intro")
    const { container } = render(<DocsSidebar />)
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).toHaveClass("lg:block")
  })
})
