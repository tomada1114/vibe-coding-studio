import { Gradient, GradientBackground } from "@/components/gradient"
import { render } from "@testing-library/react"

describe("Gradient", () => {
  it("renders a div element", () => {
    const { container } = render(<Gradient />)

    const div = container.firstChild as HTMLElement
    expect(div.tagName).toBe("DIV")
  })

  it("applies gradient classes", () => {
    const { container } = render(<Gradient />)

    const div = container.firstChild as HTMLElement
    expect(div.className).toContain("bg-linear-115")
  })

  it("merges custom className", () => {
    const { container } = render(<Gradient className="rounded-4xl" />)

    const div = container.firstChild as HTMLElement
    expect(div).toHaveClass("rounded-4xl")
  })

  it("passes through additional props", () => {
    const { container } = render(<Gradient data-testid="gradient" />)

    const div = container.firstChild as HTMLElement
    expect(div).toHaveAttribute("data-testid", "gradient")
  })
})

describe("GradientBackground", () => {
  it("renders with container and blur element", () => {
    const { container } = render(<GradientBackground />)

    const outer = container.firstChild as HTMLElement
    expect(outer).toHaveClass("relative")
    expect(outer).toHaveClass("mx-auto")
    expect(outer).toHaveClass("max-w-7xl")
  })

  it("contains gradient background div", () => {
    const { container } = render(<GradientBackground />)

    const inner = container.querySelector(".bg-linear-115")
    expect(inner).toBeInTheDocument()
    expect(inner).toHaveClass("blur-3xl")
  })
})
