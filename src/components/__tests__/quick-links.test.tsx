import { QuickLink, QuickLinks } from "@/components/QuickLinks"
import { render, screen } from "@testing-library/react"

// Mock Icon component
jest.mock("@/components/Icon", () => ({
  Icon: ({ icon, ...props }: { icon: string; className?: string }) => (
    <svg data-testid={`icon-${icon}`} {...props} />
  ),
}))

describe("QuickLinks", () => {
  it("renders children in a grid", () => {
    const { container } = render(
      <QuickLinks>
        <div>Child 1</div>
        <div>Child 2</div>
      </QuickLinks>
    )

    const grid = container.firstChild as HTMLElement
    expect(grid).toHaveClass("grid")
    expect(screen.getByText("Child 1")).toBeInTheDocument()
    expect(screen.getByText("Child 2")).toBeInTheDocument()
  })
})

describe("QuickLink", () => {
  it("renders title, description, icon, and link", () => {
    render(
      <QuickLink
        title="Getting Started"
        description="Learn the basics"
        href="/docs/getting-started"
        icon="installation"
      />
    )

    expect(screen.getByText("Getting Started")).toBeInTheDocument()
    expect(screen.getByText("Learn the basics")).toBeInTheDocument()
    expect(screen.getByTestId("icon-installation")).toBeInTheDocument()

    const link = screen.getByRole("link")
    expect(link).toHaveAttribute("href", "/docs/getting-started")
  })

  it("renders different icons", () => {
    render(
      <QuickLink
        title="Plugins"
        description="Extend functionality"
        href="/docs/plugins"
        icon="plugins"
      />
    )

    expect(screen.getByTestId("icon-plugins")).toBeInTheDocument()
  })
})
