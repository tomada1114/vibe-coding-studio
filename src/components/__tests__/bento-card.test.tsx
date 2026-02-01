import { BentoCard } from "@/components/bento-card"
import { render, screen } from "@testing-library/react"

describe("BentoCard", () => {
  const defaultProps = {
    eyebrow: "Category",
    title: "Card Title",
    description: "Card description text",
    graphic: <div data-testid="graphic">Graphic</div>,
  }

  it("renders eyebrow, title, and description", () => {
    render(<BentoCard {...defaultProps} />)

    expect(screen.getByText("Category")).toBeInTheDocument()
    expect(screen.getByText("Card Title")).toBeInTheDocument()
    expect(screen.getByText("Card description text")).toBeInTheDocument()
  })

  it("renders graphic content", () => {
    render(<BentoCard {...defaultProps} />)

    expect(screen.getByTestId("graphic")).toBeInTheDocument()
  })

  it("applies dark mode data attribute", () => {
    const { container } = render(<BentoCard {...defaultProps} dark />)

    const card = container.firstChild as HTMLElement
    expect(card).toHaveAttribute("data-dark", "true")
  })

  it("does not set data-dark when dark is false", () => {
    const { container } = render(<BentoCard {...defaultProps} />)

    const card = container.firstChild as HTMLElement
    expect(card).not.toHaveAttribute("data-dark")
  })

  it("renders top fade overlay", () => {
    const { container } = render(<BentoCard {...defaultProps} fade={["top"]} />)

    const fadeElement = container.querySelector(".bg-linear-to-b")
    expect(fadeElement).toBeInTheDocument()
  })

  it("renders bottom fade overlay", () => {
    const { container } = render(
      <BentoCard {...defaultProps} fade={["bottom"]} />
    )

    const fadeElement = container.querySelector(".bg-linear-to-t")
    expect(fadeElement).toBeInTheDocument()
  })

  it("renders both fade overlays", () => {
    const { container } = render(
      <BentoCard {...defaultProps} fade={["top", "bottom"]} />
    )

    expect(container.querySelector(".bg-linear-to-b")).toBeInTheDocument()
    expect(container.querySelector(".bg-linear-to-t")).toBeInTheDocument()
  })

  it("applies custom className", () => {
    const { container } = render(
      <BentoCard {...defaultProps} className="col-span-2" />
    )

    const card = container.firstChild as HTMLElement
    expect(card).toHaveClass("col-span-2")
  })
})
