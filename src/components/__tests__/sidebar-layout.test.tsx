import { SidebarLayout } from "@/components/sidebar-layout"
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

describe("SidebarLayout", () => {
  const defaultProps = {
    navbar: <div data-testid="navbar">Navbar</div>,
    sidebar: <div data-testid="sidebar">Sidebar</div>,
  }

  it("renders navbar, sidebar, and children", () => {
    render(
      <SidebarLayout {...defaultProps}>
        <div data-testid="content">Main content</div>
      </SidebarLayout>
    )

    expect(screen.getByTestId("content")).toBeInTheDocument()
    expect(screen.getByText("Main content")).toBeInTheDocument()
  })

  it("renders sidebar in desktop view", () => {
    render(
      <SidebarLayout {...defaultProps}>
        <p>Content</p>
      </SidebarLayout>
    )

    const sidebars = screen.getAllByTestId("sidebar")
    expect(sidebars.length).toBeGreaterThanOrEqual(1)
  })

  it("renders open navigation button", () => {
    render(
      <SidebarLayout {...defaultProps}>
        <p>Content</p>
      </SidebarLayout>
    )

    const openButton = screen.getByRole("button", { name: "Open navigation" })
    expect(openButton).toBeInTheDocument()
  })
})
