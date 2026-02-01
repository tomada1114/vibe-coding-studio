import { NavbarWrapper } from "@/components/navbar-wrapper"
import { render, screen } from "@testing-library/react"

// Mock the Navbar component
jest.mock("@/components/navbar", () => ({
  Navbar: ({ banner }: { banner?: React.ReactNode }) => (
    <nav data-testid="navbar">
      {banner && <div data-testid="banner">{banner}</div>}
    </nav>
  ),
}))

describe("NavbarWrapper", () => {
  it("renders Navbar component", () => {
    render(<NavbarWrapper />)

    expect(screen.getByTestId("navbar")).toBeInTheDocument()
  })

  it("passes banner prop to Navbar", () => {
    render(<NavbarWrapper banner={<span>Banner Text</span>} />)

    expect(screen.getByTestId("banner")).toBeInTheDocument()
    expect(screen.getByText("Banner Text")).toBeInTheDocument()
  })

  it("renders without banner", () => {
    render(<NavbarWrapper />)

    expect(screen.queryByTestId("banner")).not.toBeInTheDocument()
  })
})
