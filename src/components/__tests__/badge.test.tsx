import "@testing-library/jest-dom"
import { fireEvent, render, screen } from "@testing-library/react"
import React from "react"
import { Badge, BadgeButton } from "../badge"

describe("Badge", () => {
  it("renders a badge element", () => {
    render(<Badge>Test Badge</Badge>)
    const badge = screen.getByText("Test Badge")
    expect(badge).toBeInTheDocument()
  })

  it("applies default zinc color", () => {
    render(<Badge>Default Badge</Badge>)
    const badge = screen.getByText("Default Badge")
    expect(badge).toHaveClass("bg-zinc-600/10", "text-zinc-700")
  })

  it("applies custom color classes", () => {
    render(<Badge color="red">Red Badge</Badge>)
    const badge = screen.getByText("Red Badge")
    expect(badge).toHaveClass("bg-red-500/15", "text-red-700")
  })

  it("applies blue color classes", () => {
    render(<Badge color="blue">Blue Badge</Badge>)
    const badge = screen.getByText("Blue Badge")
    expect(badge).toHaveClass("bg-blue-500/15", "text-blue-700")
  })

  it("applies green color classes", () => {
    render(<Badge color="green">Green Badge</Badge>)
    const badge = screen.getByText("Green Badge")
    expect(badge).toHaveClass("bg-green-500/15", "text-green-700")
  })

  it("applies yellow color classes", () => {
    render(<Badge color="yellow">Yellow Badge</Badge>)
    const badge = screen.getByText("Yellow Badge")
    expect(badge).toHaveClass("bg-yellow-400/20", "text-yellow-700")
  })

  it("applies custom className alongside color classes", () => {
    render(
      <Badge color="red" className="custom-class">
        Custom Badge
      </Badge>
    )
    const badge = screen.getByText("Custom Badge")
    expect(badge).toHaveClass("custom-class", "bg-red-500/15", "text-red-700")
  })

  it("has proper base styling classes", () => {
    render(<Badge>Base Badge</Badge>)
    const badge = screen.getByText("Base Badge")
    expect(badge).toHaveClass(
      "inline-flex",
      "items-center",
      "gap-x-1.5",
      "rounded-md",
      "px-1.5",
      "py-0.5",
      "text-sm/5",
      "font-medium"
    )
  })

  it("supports dark mode classes", () => {
    render(<Badge color="red">Dark Badge</Badge>)
    const badge = screen.getByText("Dark Badge")
    expect(badge).toHaveClass("dark:bg-red-500/10", "dark:text-red-400")
  })

  it("supports hover state classes", () => {
    render(<Badge color="blue">Hover Badge</Badge>)
    const badge = screen.getByText("Hover Badge")
    expect(badge).toHaveClass("group-data-hover:bg-blue-500/25")
  })

  it("supports all available colors", () => {
    const colors = [
      "red",
      "orange",
      "amber",
      "yellow",
      "lime",
      "green",
      "emerald",
      "teal",
      "cyan",
      "sky",
      "blue",
      "indigo",
      "violet",
      "purple",
      "fuchsia",
      "pink",
      "rose",
      "zinc",
    ]

    colors.forEach(color => {
      const { unmount } = render(
        <Badge
          color={
            color as
              | "zinc"
              | "red"
              | "orange"
              | "amber"
              | "yellow"
              | "lime"
              | "green"
              | "emerald"
              | "teal"
              | "cyan"
              | "sky"
              | "blue"
              | "indigo"
              | "violet"
              | "purple"
              | "fuchsia"
              | "pink"
              | "rose"
          }
        >
          Color Badge
        </Badge>
      )
      const badge = screen.getByText("Color Badge")
      expect(badge).toBeInTheDocument()
      unmount()
    })
  })

  it("spreads additional props to span element", () => {
    render(
      <Badge data-testid="badge-test" aria-label="Test badge">
        Prop Badge
      </Badge>
    )
    const badge = screen.getByTestId("badge-test")
    expect(badge).toHaveAttribute("aria-label", "Test badge")
  })

  it("renders children correctly", () => {
    render(
      <Badge>
        <span>Complex</span> Badge Content
      </Badge>
    )
    expect(screen.getByText("Complex")).toBeInTheDocument()
    expect(screen.getByText("Badge Content")).toBeInTheDocument()
  })

  it("has responsive text sizing", () => {
    render(<Badge>Responsive Badge</Badge>)
    const badge = screen.getByText("Responsive Badge")
    expect(badge).toHaveClass("text-sm/5", "sm:text-xs/5")
  })

  it("has forced-colors outline for accessibility", () => {
    render(<Badge>Accessible Badge</Badge>)
    const badge = screen.getByText("Accessible Badge")
    expect(badge).toHaveClass("forced-colors:outline")
  })

  it("applies dark mode hover states correctly", () => {
    render(<Badge color="green">Dark Hover Badge</Badge>)
    const badge = screen.getByText("Dark Hover Badge")
    expect(badge).toHaveClass("dark:group-data-hover:bg-green-500/20")
  })

  it("maintains color consistency across light and dark modes", () => {
    render(<Badge color="purple">Purple Badge</Badge>)
    const badge = screen.getByText("Purple Badge")
    expect(badge).toHaveClass(
      "bg-purple-500/15",
      "text-purple-700",
      "dark:text-purple-400"
    )
  })

  it("supports gap spacing for icons", () => {
    render(<Badge>Icon Badge</Badge>)
    const badge = screen.getByText("Icon Badge")
    expect(badge).toHaveClass("gap-x-1.5")
  })

  it("renders as span element by default", () => {
    render(<Badge>Span Badge</Badge>)
    const badge = screen.getByText("Span Badge")
    expect(badge.tagName).toBe("SPAN")
  })
})

describe("BadgeButton", () => {
  it("renders as button by default", () => {
    render(<BadgeButton>Button Badge</BadgeButton>)
    const button = screen.getByRole("button")
    expect(button).toBeInTheDocument()
    expect(screen.getByText("Button Badge")).toBeInTheDocument()
  })

  it("renders as link when href prop is provided", () => {
    render(<BadgeButton href="/test">Link Badge</BadgeButton>)
    const link = screen.getByRole("link")
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute("href", "/test")
  })

  it("applies default zinc color to button", () => {
    render(<BadgeButton>Default Button Badge</BadgeButton>)
    const badge = screen.getByText("Default Button Badge")
    expect(badge).toHaveClass("bg-zinc-600/10", "text-zinc-700")
  })

  it("applies custom color to button", () => {
    render(<BadgeButton color="red">Red Button Badge</BadgeButton>)
    const badge = screen.getByText("Red Button Badge")
    expect(badge).toHaveClass("bg-red-500/15", "text-red-700")
  })

  it("handles button click events", () => {
    const handleClick = jest.fn()
    render(<BadgeButton onClick={handleClick}>Clickable Badge</BadgeButton>)
    const button = screen.getByRole("button")
    fireEvent.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it("has proper focus styling", () => {
    render(<BadgeButton>Focus Badge</BadgeButton>)
    const button = screen.getByRole("button")
    expect(button).toHaveClass(
      "focus:not-data-focus:outline-hidden",
      "data-focus:outline-2",
      "data-focus:outline-offset-2",
      "data-focus:outline-blue-500"
    )
  })

  it("includes TouchTarget component", () => {
    render(<BadgeButton>Touch Badge</BadgeButton>)
    const button = screen.getByRole("button")
    expect(button).toBeInTheDocument()
    // TouchTarget should be rendered but is typically invisible
  })

  it("supports custom className", () => {
    render(
      <BadgeButton className="custom-button-class">
        Custom Button Badge
      </BadgeButton>
    )
    const button = screen.getByRole("button")
    expect(button).toHaveClass("custom-button-class")
  })

  it("supports disabled state for buttons", () => {
    render(<BadgeButton disabled>Disabled Badge</BadgeButton>)
    const button = screen.getByRole("button")
    expect(button).toBeDisabled()
  })

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLElement>()
    render(<BadgeButton ref={ref}>Ref Badge</BadgeButton>)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })

  it("has group styling for hover states", () => {
    render(<BadgeButton color="blue">Group Badge</BadgeButton>)
    const button = screen.getByRole("button")
    expect(button).toHaveClass("group", "relative", "inline-flex")
  })

  it("maintains consistent styling between button and link variants", () => {
    const { rerender } = render(<BadgeButton color="green">Button</BadgeButton>)
    const buttonElement = screen.getByRole("button")
    // Check button has expected classes
    expect(buttonElement).toHaveClass("group", "relative", "inline-flex")

    rerender(
      <BadgeButton href="/test" color="green">
        Link
      </BadgeButton>
    )
    const linkElement = screen.getByRole("link")

    // Both should have similar base classes
    expect(buttonElement).toHaveClass(
      "group",
      "relative",
      "inline-flex",
      "rounded-md"
    )
    expect(linkElement).toHaveClass(
      "group",
      "relative",
      "inline-flex",
      "rounded-md"
    )
  })

  it("renders badge with correct color inside button", () => {
    render(<BadgeButton color="purple">Purple Button</BadgeButton>)
    const badge = screen.getByText("Purple Button")
    expect(badge).toHaveClass("bg-purple-500/15", "text-purple-700")
  })

  it("supports all button props when not a link", () => {
    render(
      <BadgeButton
        type="submit"
        form="test-form"
        data-testid="badge-button"
        aria-label="Submit badge"
      >
        Submit Badge
      </BadgeButton>
    )
    const button = screen.getByTestId("badge-button")
    expect(button).toHaveAttribute("type", "submit")
    expect(button).toHaveAttribute("form", "test-form")
    expect(button).toHaveAttribute("aria-label", "Submit badge")
  })
})
