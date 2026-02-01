import { Callout } from "@/components/Callout"
import { render, screen } from "@testing-library/react"

// Mock Icon component
jest.mock("@/components/Icon", () => ({
  Icon: ({ icon, ...props }: { icon: string; className?: string }) => (
    <svg data-testid={`icon-${icon}`} {...props} />
  ),
}))

describe("Callout", () => {
  it("renders with title and children", () => {
    render(
      <Callout title="Test Title">
        <p>Test content</p>
      </Callout>
    )

    expect(screen.getByText("Test Title")).toBeInTheDocument()
    expect(screen.getByText("Test content")).toBeInTheDocument()
  })

  it("renders note type by default", () => {
    render(
      <Callout title="Note">
        <p>Note content</p>
      </Callout>
    )

    expect(screen.getByTestId("icon-lightbulb")).toBeInTheDocument()
    const container = screen.getByText("Note").closest(".my-8")
    expect(container).toHaveClass("bg-sky-50")
  })

  it("renders warning type with correct styles", () => {
    render(
      <Callout title="Warning" type="warning">
        <p>Warning content</p>
      </Callout>
    )

    expect(screen.getByTestId("icon-warning")).toBeInTheDocument()
    const container = screen.getByText("Warning").closest(".my-8")
    expect(container).toHaveClass("bg-amber-50")
  })

  it("renders children as ReactNode", () => {
    render(
      <Callout title="Complex">
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
        </ul>
      </Callout>
    )

    expect(screen.getByText("Item 1")).toBeInTheDocument()
    expect(screen.getByText("Item 2")).toBeInTheDocument()
  })
})
