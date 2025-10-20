import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import { Divider } from "../divider"

describe("Divider", () => {
  it("renders divider element", () => {
    render(<Divider />)
    const divider = screen.getByRole("presentation")
    expect(divider).toBeInTheDocument()
  })

  it("renders as hr element", () => {
    render(<Divider />)
    const divider = screen.getByRole("presentation")
    expect(divider.tagName).toBe("HR")
  })

  it("has role presentation for accessibility", () => {
    render(<Divider />)
    const divider = screen.getByRole("presentation")
    expect(divider).toHaveAttribute("role", "presentation")
  })

  it("has proper base styling", () => {
    render(<Divider />)
    const divider = screen.getByRole("presentation")
    expect(divider).toHaveClass("w-full", "border-t")
  })

  it("applies default hard border styling", () => {
    render(<Divider />)
    const divider = screen.getByRole("presentation")
    expect(divider).toHaveClass("border-zinc-950/10", "dark:border-white/10")
    expect(divider).not.toHaveClass("border-zinc-950/5", "dark:border-white/5")
  })

  it("applies soft border styling when soft prop is true", () => {
    render(<Divider soft />)
    const divider = screen.getByRole("presentation")
    expect(divider).toHaveClass("border-zinc-950/5", "dark:border-white/5")
    expect(divider).not.toHaveClass(
      "border-zinc-950/10",
      "dark:border-white/10"
    )
  })

  it("applies hard border styling when soft prop is false", () => {
    render(<Divider soft={false} />)
    const divider = screen.getByRole("presentation")
    expect(divider).toHaveClass("border-zinc-950/10", "dark:border-white/10")
    expect(divider).not.toHaveClass("border-zinc-950/5", "dark:border-white/5")
  })

  it("supports custom className", () => {
    render(<Divider className="custom-divider" />)
    const divider = screen.getByRole("presentation")
    expect(divider).toHaveClass("custom-divider")
  })

  it("maintains base classes with custom className", () => {
    render(<Divider className="custom-class" />)
    const divider = screen.getByRole("presentation")
    expect(divider).toHaveClass("custom-class", "w-full", "border-t")
  })

  it("has dark mode support for default styling", () => {
    render(<Divider />)
    const divider = screen.getByRole("presentation")
    expect(divider).toHaveClass("dark:border-white/10")
  })

  it("has dark mode support for soft styling", () => {
    render(<Divider soft />)
    const divider = screen.getByRole("presentation")
    expect(divider).toHaveClass("dark:border-white/5")
  })

  it("spreads additional props to hr element", () => {
    render(<Divider data-testid="divider-test" aria-hidden="true" />)
    const divider = screen.getByTestId("divider-test")
    expect(divider).toHaveAttribute("aria-hidden", "true")
  })

  it("supports id attribute", () => {
    render(<Divider id="section-divider" />)
    const divider = screen.getByRole("presentation")
    expect(divider).toHaveAttribute("id", "section-divider")
  })

  it("supports style attribute", () => {
    render(<Divider style={{ marginTop: "20px" }} />)
    const divider = screen.getByRole("presentation")
    expect(divider).toHaveStyle({ marginTop: "20px" })
  })

  it("can be used with data attributes", () => {
    render(
      <Divider
        data-section="content"
        data-type="separator"
        data-testid="section-separator"
      />
    )
    const divider = screen.getByTestId("section-separator")
    expect(divider).toHaveAttribute("data-section", "content")
    expect(divider).toHaveAttribute("data-type", "separator")
  })

  it("maintains consistent width across different contexts", () => {
    const { rerender } = render(<Divider />)
    let divider = screen.getByRole("presentation")
    expect(divider).toHaveClass("w-full")

    rerender(<Divider soft />)
    divider = screen.getByRole("presentation")
    expect(divider).toHaveClass("w-full")

    rerender(<Divider className="custom-width" />)
    divider = screen.getByRole("presentation")
    expect(divider).toHaveClass("w-full", "custom-width")
  })

  it("handles border contrast correctly", () => {
    const { rerender } = render(<Divider />)
    let divider = screen.getByRole("presentation")
    // Hard border has higher opacity (more visible)
    expect(divider).toHaveClass("border-zinc-950/10")

    rerender(<Divider soft />)
    divider = screen.getByRole("presentation")
    // Soft border has lower opacity (less visible)
    expect(divider).toHaveClass("border-zinc-950/5")
  })

  it("maintains semantic meaning as separator", () => {
    render(
      <div>
        <section>Content Above</section>
        <Divider />
        <section>Content Below</section>
      </div>
    )
    const divider = screen.getByRole("presentation")
    expect(divider).toBeInTheDocument()
    // Should be between the two sections
    const sections = screen.getAllByText(/Content/)
    expect(sections).toHaveLength(2)
  })

  it("works correctly in flex layouts", () => {
    render(
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>Item 1</div>
        <Divider />
        <div>Item 2</div>
      </div>
    )
    const divider = screen.getByRole("presentation")
    expect(divider).toHaveClass("w-full")
  })

  it("can be styled with additional border properties", () => {
    render(<Divider className="border-2 border-dashed" />)
    const divider = screen.getByRole("presentation")
    expect(divider).toHaveClass("border-dashed", "border-2", "border-t")
  })

  it("supports custom margin classes", () => {
    render(<Divider className="my-8" />)
    const divider = screen.getByRole("presentation")
    expect(divider).toHaveClass("my-8")
  })

  it("maintains accessibility with screen readers", () => {
    render(<Divider />)
    const divider = screen.getByRole("presentation")
    // Should have role="presentation" to indicate it's decorative
    expect(divider).toHaveAttribute("role", "presentation")
  })

  it("can be conditionally rendered", () => {
    const { rerender } = render(<Divider soft={false} />)
    expect(screen.getByRole("presentation")).toBeInTheDocument()

    // Simulate conditional rendering
    rerender(<div data-testid="empty" />)
    expect(screen.queryByRole("presentation")).not.toBeInTheDocument()
    expect(screen.getByTestId("empty")).toBeInTheDocument()
  })

  it("handles multiple dividers in sequence", () => {
    render(
      <div>
        <Divider />
        <Divider soft />
        <Divider className="custom" />
      </div>
    )
    const dividers = screen.getAllByRole("presentation")
    expect(dividers).toHaveLength(3)

    expect(dividers[0]).toHaveClass("border-zinc-950/10")
    expect(dividers[1]).toHaveClass("border-zinc-950/5")
    expect(dividers[2]).toHaveClass("custom")
  })

  it("preserves all props when spreading", () => {
    const customProps = {
      "data-component": "divider",
      "data-version": "1.0",
      className: "test-class",
      id: "test-divider",
    }

    render(<Divider {...customProps} />)
    const divider = screen.getByRole("presentation")

    expect(divider).toHaveAttribute("data-component", "divider")
    expect(divider).toHaveAttribute("data-version", "1.0")
    expect(divider).toHaveClass("test-class")
    expect(divider).toHaveAttribute("id", "test-divider")
  })
})
