import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import { DocsMobileMenu } from "../DocsMobileMenu"

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

// Mock MobileNavigation
jest.mock("@/components/MobileNavigation", () => ({
  MobileNavigation: () => (
    <div data-testid="mobile-navigation">MobileNavigation</div>
  ),
}))

describe("DocsMobileMenu", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders MobileNavigation on docs subpages", () => {
    mockUsePathname.mockReturnValue("/docs/ruby/intro")
    render(<DocsMobileMenu />)
    expect(screen.getByTestId("mobile-navigation")).toBeInTheDocument()
  })

  it("returns null on non-docs pages", () => {
    mockUsePathname.mockReturnValue("/about")
    const { container } = render(<DocsMobileMenu />)
    expect(container.firstChild).toBeNull()
  })

  it("returns null on /docs/ root page", () => {
    mockUsePathname.mockReturnValue("/docs/")
    const { container } = render(<DocsMobileMenu />)
    expect(container.firstChild).toBeNull()
  })

  it("applies lg:hidden class for responsive hiding", () => {
    mockUsePathname.mockReturnValue("/docs/ruby/intro")
    const { container } = render(<DocsMobileMenu />)
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).toHaveClass("lg:hidden")
  })
})
