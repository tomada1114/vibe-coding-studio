import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import React from "react"
import { Button } from "../button"

// Mock next/link
jest.mock("next/link", () => {
  // eslint-disable-next-line react/display-name
  return ({
    children,
    href,
    className,
  }: {
    children: React.ReactNode
    href: string
    className?: string
  }) => {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    )
  }
})

describe("Button", () => {
  describe("Button as link", () => {
    it("renders as a link when href is provided", () => {
      render(<Button href="/test">Click me</Button>)
      const link = screen.getByRole("link")
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute("href", "/test")
      expect(link).toHaveTextContent("Click me")
    })

    it("applies default variant classes to link", () => {
      render(<Button href="/test">Click me</Button>)
      const link = screen.getByRole("link")
      expect(link).toHaveClass("inline-flex", "items-center", "justify-center")
    })

    it("applies primary variant classes", () => {
      render(
        <Button href="/test" variant="primary">
          Primary
        </Button>
      )
      const link = screen.getByRole("link")
      expect(link).toHaveClass("bg-gray-950", "text-white")
    })

    it("applies secondary variant classes", () => {
      render(
        <Button href="/test" variant="secondary">
          Secondary
        </Button>
      )
      const link = screen.getByRole("link")
      expect(link).toHaveClass("bg-white/15", "text-gray-950")
    })

    it("applies outline variant classes", () => {
      render(
        <Button href="/test" variant="outline">
          Outline
        </Button>
      )
      const link = screen.getByRole("link")
      expect(link).toHaveClass("ring-1", "text-gray-950")
    })

    it("merges custom className with default classes", () => {
      render(
        <Button href="/test" className="custom-class">
          Custom
        </Button>
      )
      const link = screen.getByRole("link")
      expect(link).toHaveClass("custom-class")
      expect(link).toHaveClass("inline-flex") // Also has default classes
    })
  })

  describe("Button as button", () => {
    it("renders as a button when href is not provided", () => {
      render(<Button>Click me</Button>)
      const button = screen.getByRole("button")
      expect(button).toBeInTheDocument()
      expect(button).toHaveTextContent("Click me")
    })

    it("applies default variant classes to button", () => {
      render(<Button>Click me</Button>)
      const button = screen.getByRole("button")
      expect(button).toHaveClass(
        "inline-flex",
        "items-center",
        "justify-center"
      )
    })

    it("handles onClick event", () => {
      const handleClick = jest.fn()
      render(<Button onClick={handleClick}>Click me</Button>)
      const button = screen.getByRole("button")
      button.click()
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it("can be disabled", () => {
      render(<Button disabled>Disabled</Button>)
      const button = screen.getByRole("button")
      expect(button).toBeDisabled()
    })

    it("applies primary variant to button", () => {
      render(<Button variant="primary">Primary Button</Button>)
      const button = screen.getByRole("button")
      expect(button).toHaveClass("bg-gray-950", "text-white")
    })

    it("applies secondary variant to button", () => {
      render(<Button variant="secondary">Secondary Button</Button>)
      const button = screen.getByRole("button")
      expect(button).toHaveClass("bg-white/15", "text-gray-950")
    })

    it("applies outline variant to button", () => {
      render(<Button variant="outline">Outline Button</Button>)
      const button = screen.getByRole("button")
      expect(button).toHaveClass("ring-1", "text-gray-950")
    })
  })

  describe("Common functionality", () => {
    it("renders children correctly", () => {
      render(
        <Button>
          <span>Icon</span>
          <span>Text</span>
        </Button>
      )
      expect(screen.getByText("Icon")).toBeInTheDocument()
      expect(screen.getByText("Text")).toBeInTheDocument()
    })

    it("has transition styles", () => {
      render(<Button>Transition</Button>)
      const button = screen.getByRole("button")
      expect(button).toHaveClass("transition-colors")
    })

    it("has hover styles", () => {
      render(<Button>Hoverable</Button>)
      const button = screen.getByRole("button")
      expect(button).toHaveClass("data-hover:bg-gray-800")
    })

    it("defaults to primary variant", () => {
      render(<Button>Default</Button>)
      const button = screen.getByRole("button")
      expect(button).toHaveClass("bg-gray-950", "text-white")
    })

    it("has consistent padding", () => {
      render(<Button>Padded</Button>)
      const button = screen.getByRole("button")
      expect(button).toHaveClass("px-4", "py-2")
    })

    it("has rounded corners", () => {
      render(<Button>Rounded</Button>)
      const button = screen.getByRole("button")
      expect(button).toHaveClass("rounded-full")
    })

    it("supports size prop", () => {
      render(
        <Button size="lg" data-testid="sized">
          Sized
        </Button>
      )
      const button = screen.getByTestId("sized")
      expect(button).toHaveClass("px-5", "py-3", "text-lg")
    })
  })
})
