import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import React from "react"
import { CatalystButton, TouchTarget } from "../catalyst-button"

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

describe("CatalystButton", () => {
  describe("Button styles", () => {
    it("renders with default dark/zinc color", () => {
      render(<CatalystButton>Default Button</CatalystButton>)
      const button = screen.getByRole("button")
      expect(button).toBeInTheDocument()
      expect(button).toHaveTextContent("Default Button")
    })

    it("applies outline styles", () => {
      render(<CatalystButton outline>Outline Button</CatalystButton>)
      const button = screen.getByRole("button")
      expect(button).toHaveClass("border-zinc-950/10", "text-zinc-950")
    })

    it("applies plain styles", () => {
      render(<CatalystButton plain>Plain Button</CatalystButton>)
      const button = screen.getByRole("button")
      expect(button).toHaveClass("border-transparent", "text-zinc-950")
    })

    it("applies different color variants", () => {
      const colors = ["indigo", "cyan", "red", "green", "blue", "violet"]
      colors.forEach(color => {
        const { unmount } = render(
          <CatalystButton
            color={
              color as
                | "dark"
                | "light"
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
                | "white"
            }
          >
            {color} Button
          </CatalystButton>
        )
        const button = screen.getByRole("button")
        expect(button).toBeInTheDocument()
        unmount()
      })
    })
  })

  describe("Button as link", () => {
    it("renders as a link when href is provided", () => {
      render(<CatalystButton href="/test">Link Button</CatalystButton>)
      const link = screen.getByRole("link")
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute("href", "/test")
    })

    it("applies custom className", () => {
      render(
        <CatalystButton href="/test" className="custom-class">
          Custom Link
        </CatalystButton>
      )
      const link = screen.getByRole("link")
      expect(link).toHaveClass("custom-class")
    })
  })

  describe("Button as button", () => {
    it("handles onClick event", () => {
      const handleClick = jest.fn()
      render(<CatalystButton onClick={handleClick}>Click me</CatalystButton>)
      const button = screen.getByRole("button")
      button.click()
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it("can be disabled", () => {
      render(<CatalystButton disabled>Disabled</CatalystButton>)
      const button = screen.getByRole("button")
      expect(button).toBeDisabled()
    })

    it("has proper focus styles", () => {
      render(<CatalystButton>Focusable</CatalystButton>)
      const button = screen.getByRole("button")
      expect(button).toHaveClass("focus:not-data-focus:outline-hidden")
    })
  })

  describe("TouchTarget", () => {
    it("renders children within TouchTarget", () => {
      render(
        <TouchTarget>
          <span>Touch Area</span>
        </TouchTarget>
      )
      expect(screen.getByText("Touch Area")).toBeInTheDocument()
    })

    it("includes invisible touch expansion element", () => {
      const { container } = render(
        <TouchTarget>
          <span>Content</span>
        </TouchTarget>
      )
      const touchExpander = container.querySelector(".pointer-fine\\:hidden")
      expect(touchExpander).toBeInTheDocument()
      expect(touchExpander).toHaveAttribute("aria-hidden", "true")
    })
  })

  describe("Icon support", () => {
    it("supports icon slot styling", () => {
      render(
        <CatalystButton>
          <span data-slot="icon">Icon</span>
          Button Text
        </CatalystButton>
      )
      const button = screen.getByRole("button")
      expect(button).toHaveClass("*:data-[slot=icon]:size-5")
    })
  })

  describe("Responsive design", () => {
    it("has responsive text size", () => {
      render(<CatalystButton>Responsive</CatalystButton>)
      const button = screen.getByRole("button")
      expect(button).toHaveClass("text-base/6", "sm:text-sm/6")
    })

    it("has responsive padding", () => {
      render(<CatalystButton>Padded</CatalystButton>)
      const button = screen.getByRole("button")
      expect(button.className).toMatch(/px-\[calc/)
      expect(button.className).toMatch(/py-\[calc/)
    })
  })
})
