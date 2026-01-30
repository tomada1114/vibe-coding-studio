import { render } from "@testing-library/react"
import { RoadmapEdge } from "../RoadmapEdge"

describe("RoadmapEdge", () => {
  describe("rendering", () => {
    it("should render a div element", () => {
      const { container } = render(<RoadmapEdge />)
      const edge = container.firstChild as HTMLElement
      expect(edge).toBeInTheDocument()
      expect(edge.tagName).toBe("DIV")
    })

    it("should have vertical line styles", () => {
      const { container } = render(<RoadmapEdge />)
      const edge = container.firstChild
      expect(edge).toHaveClass("w-px")
      expect(edge).toHaveClass("bg-gray-200")
      expect(edge).toHaveClass("h-8")
    })
  })

  describe("accessibility", () => {
    it('should have aria-hidden="true" for decorative element', () => {
      const { container } = render(<RoadmapEdge />)
      const edge = container.firstChild
      expect(edge).toHaveAttribute("aria-hidden", "true")
    })
  })

  describe("custom className", () => {
    it("should accept custom className", () => {
      const { container } = render(<RoadmapEdge className="custom-class" />)
      const edge = container.firstChild
      expect(edge).toHaveClass("custom-class")
    })
  })
})
