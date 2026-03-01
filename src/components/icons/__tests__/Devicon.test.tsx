import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import { Devicon } from "../Devicon"

describe("Devicon", () => {
  describe("Rendering", () => {
    it("renders icon image for known slug", () => {
      render(<Devicon slug="ruby" />)
      const img = screen.getByAltText("ruby icon")
      expect(img).toBeInTheDocument()
    })

    it("returns null for empty slug", () => {
      const { container } = render(<Devicon slug="" />)
      expect(container.firstChild).toBeNull()
    })

    it("renders fallback for unknown slug", () => {
      render(<Devicon slug="unknown-tech" />)
      expect(screen.getByText("UN")).toBeInTheDocument()
    })

    it("uses custom alt text", () => {
      render(<Devicon slug="ruby" alt="Ruby言語" />)
      expect(screen.getByAltText("Ruby言語")).toBeInTheDocument()
    })
  })

  describe("Size variants", () => {
    it("applies default md size", () => {
      const { container } = render(<Devicon slug="ruby" />)
      const wrapper = container.firstChild as HTMLElement
      expect(wrapper).toHaveClass("w-6", "h-6")
    })

    it("applies xs size", () => {
      const { container } = render(<Devicon slug="ruby" size="xs" />)
      const wrapper = container.firstChild as HTMLElement
      expect(wrapper).toHaveClass("w-4", "h-4")
    })

    it("applies 4xl size", () => {
      const { container } = render(<Devicon slug="ruby" size="4xl" />)
      const wrapper = container.firstChild as HTMLElement
      expect(wrapper).toHaveClass("w-20", "h-20")
    })
  })

  describe("Fallback display", () => {
    it("shows first two letters uppercased for unknown slug", () => {
      render(<Devicon slug="golang" />)
      expect(screen.getByText("GO")).toBeInTheDocument()
    })

    it("applies size classes on fallback", () => {
      const { container } = render(<Devicon slug="unknown" size="lg" />)
      const fallback = container.firstChild as HTMLElement
      expect(fallback).toHaveClass("w-8", "h-8")
    })
  })
})
