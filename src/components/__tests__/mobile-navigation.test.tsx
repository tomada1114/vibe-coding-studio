import { MobileNavigation } from "@/components/MobileNavigation"
import { render, screen } from "@testing-library/react"

const mockUsePathname = jest.fn()
jest.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
}))

jest.mock("@/components/logo", () => ({
  Logomark: (props: Record<string, unknown>) => (
    <svg data-testid="logomark" {...props} />
  ),
}))

jest.mock("@/components/Navigation", () => ({
  Navigation: () => <nav data-testid="navigation" />,
}))

jest.mock("@/lib/navigation-utils", () => ({
  shouldShowNavigation: (path: string) =>
    path.startsWith("/docs/") && path !== "/docs/",
}))

describe("MobileNavigation", () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  it("renders toggle navigation button", () => {
    mockUsePathname.mockReturnValue("/")

    render(<MobileNavigation />)

    const button = screen.getByRole("button", { name: "Toggle navigation" })
    expect(button).toBeInTheDocument()
  })

  it("renders on non-docs page without curriculum navigation", () => {
    mockUsePathname.mockReturnValue("/")

    render(<MobileNavigation />)

    expect(
      screen.getByRole("button", { name: "Toggle navigation" })
    ).toBeInTheDocument()
  })
})
