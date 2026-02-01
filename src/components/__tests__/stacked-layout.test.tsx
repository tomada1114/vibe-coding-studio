import { StackedLayout } from "@/components/stacked-layout"
import { render, screen } from "@testing-library/react"

// Mock CatalystNavbarItem
jest.mock("@/components/catalyst-navbar", () => ({
  CatalystNavbarItem: ({
    children,
    onClick,
    ...props
  }: {
    children: React.ReactNode
    onClick?: () => void
    "aria-label"?: string
  }) => (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  ),
}))

describe("StackedLayout", () => {
  const defaultProps = {
    navbar: <div data-testid="navbar">Navbar</div>,
    sidebar: <div data-testid="sidebar">Sidebar</div>,
  }

  it("renders navbar, sidebar, and children", () => {
    render(
      <StackedLayout {...defaultProps}>
        <div data-testid="content">Main content</div>
      </StackedLayout>
    )

    expect(screen.getByTestId("content")).toBeInTheDocument()
    expect(screen.getByText("Main content")).toBeInTheDocument()
  })

  it("renders navbar in header", () => {
    render(
      <StackedLayout {...defaultProps}>
        <p>Content</p>
      </StackedLayout>
    )

    expect(screen.getByTestId("navbar")).toBeInTheDocument()
  })

  it("renders open navigation button for mobile", () => {
    render(
      <StackedLayout {...defaultProps}>
        <p>Content</p>
      </StackedLayout>
    )

    const openButton = screen.getByRole("button", { name: "Open navigation" })
    expect(openButton).toBeInTheDocument()
  })
})
