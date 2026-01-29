import { render, screen } from "@testing-library/react"
import { RoadmapBanner } from "../RoadmapBanner"

describe("RoadmapBanner", () => {
  describe("rendering", () => {
    it("should display badge with emoji and text", () => {
      render(<RoadmapBanner />)
      expect(screen.getByText("🗺️")).toBeInTheDocument()
      expect(screen.getByText("学習ガイド")).toBeInTheDocument()
    })

    it("should display title", () => {
      render(<RoadmapBanner />)
      expect(screen.getByText("どこから学べばいい？")).toBeInTheDocument()
    })

    it("should display description", () => {
      render(<RoadmapBanner />)
      expect(
        screen.getByText(/目的に応じた学習ロードマップ/)
      ).toBeInTheDocument()
    })

    it("should display CTA button", () => {
      render(<RoadmapBanner />)
      expect(screen.getByText("ロードマップを見る")).toBeInTheDocument()
    })
  })

  describe("navigation", () => {
    it("should have link to /roadmap", () => {
      render(<RoadmapBanner />)
      const link = screen.getByRole("link")
      expect(link).toHaveAttribute("href", "/roadmap")
    })
  })

  describe("styling", () => {
    it("should have rounded container", () => {
      const { container } = render(<RoadmapBanner />)
      const banner = container.firstChild
      expect(banner).toHaveClass("rounded-2xl")
    })

    it("should have border and shadow", () => {
      const { container } = render(<RoadmapBanner />)
      const banner = container.firstChild
      expect(banner).toHaveClass("border")
      expect(banner).toHaveClass("shadow-sm")
    })
  })

  describe("custom className", () => {
    it("should accept custom className", () => {
      const { container } = render(<RoadmapBanner className="custom-class" />)
      const banner = container.firstChild
      expect(banner).toHaveClass("custom-class")
    })
  })

  describe("accessibility", () => {
    it("should have accessible link", () => {
      render(<RoadmapBanner />)
      const link = screen.getByRole("link")
      expect(link).toBeInTheDocument()
    })
  })
})
