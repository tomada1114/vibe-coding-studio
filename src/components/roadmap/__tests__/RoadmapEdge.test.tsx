import { render } from "@testing-library/react"
import { RoadmapEdge } from "../RoadmapEdge"

describe("RoadmapEdge", () => {
  describe("rendering", () => {
    it("should render SVG element", () => {
      const { container } = render(<RoadmapEdge />)
      const svg = container.querySelector("svg")
      expect(svg).toBeInTheDocument()
    })

    it("should render line element inside SVG", () => {
      const { container } = render(<RoadmapEdge />)
      const line = container.querySelector("line")
      expect(line).toBeInTheDocument()
    })

    it("should have correct stroke color", () => {
      const { container } = render(<RoadmapEdge />)
      const line = container.querySelector("line")
      expect(line).toHaveAttribute("stroke", "#e4e4e7")
    })

    it("should have correct stroke width", () => {
      const { container } = render(<RoadmapEdge />)
      const line = container.querySelector("line")
      expect(line).toHaveAttribute("stroke-width", "2")
    })

    it("should have dashed stroke", () => {
      const { container } = render(<RoadmapEdge />)
      const line = container.querySelector("line")
      expect(line).toHaveAttribute("stroke-dasharray", "8,4")
    })
  })

  describe("accessibility", () => {
    it('should have aria-hidden="true" for decorative element', () => {
      const { container } = render(<RoadmapEdge />)
      const svg = container.querySelector("svg")
      expect(svg).toHaveAttribute("aria-hidden", "true")
    })
  })

  describe("sizing", () => {
    it("should have default width class", () => {
      const { container } = render(<RoadmapEdge />)
      const svg = container.querySelector("svg")
      expect(svg).toHaveClass("w-8")
    })

    it("should have default height", () => {
      const { container } = render(<RoadmapEdge />)
      const svg = container.querySelector("svg")
      expect(svg).toHaveAttribute("height", "32")
    })

    it("should accept custom height", () => {
      const { container } = render(<RoadmapEdge height={64} />)
      const svg = container.querySelector("svg")
      expect(svg).toHaveAttribute("height", "64")
    })
  })

  describe("custom className", () => {
    it("should accept custom className", () => {
      const { container } = render(<RoadmapEdge className="custom-class" />)
      const svg = container.querySelector("svg")
      expect(svg).toHaveClass("custom-class")
    })
  })
})
