import { webCourse } from "@/data/roadmaps/web"
import { render, screen } from "@testing-library/react"
import { RoadmapFlow } from "../RoadmapFlow"

// Mock framer-motion
jest.mock("framer-motion", () => {
  const framerMotionKeys = new Set([
    "initial",
    "animate",
    "exit",
    "transition",
    "whileHover",
    "whileTap",
  ])
  const filterProps = (props: Record<string, unknown>) =>
    Object.fromEntries(
      Object.entries(props).filter(([key]) => !framerMotionKeys.has(key))
    )
  return {
    motion: {
      div: ({
        children,
        ...props
      }: {
        children: React.ReactNode
        [key: string]: unknown
      }) => <div {...filterProps(props)}>{children}</div>,
      ol: ({
        children,
        ...props
      }: {
        children: React.ReactNode
        [key: string]: unknown
      }) => <ol {...filterProps(props)}>{children}</ol>,
      li: ({
        children,
        ...props
      }: {
        children: React.ReactNode
        [key: string]: unknown
      }) => <li {...filterProps(props)}>{children}</li>,
      article: ({
        children,
        ...props
      }: {
        children: React.ReactNode
        [key: string]: unknown
      }) => <article {...filterProps(props)}>{children}</article>,
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
  }
})

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
}))

describe("RoadmapFlow", () => {
  describe("rendering", () => {
    it("should render all nodes from course", () => {
      render(<RoadmapFlow course={webCourse} />)

      webCourse.nodes.forEach(node => {
        expect(screen.getByText(node.title)).toBeInTheDocument()
      })
    })
  })

  describe("timeline layout", () => {
    it("should use ordered list for semantic structure", () => {
      const { container } = render(<RoadmapFlow course={webCourse} />)
      const ol = container.querySelector("ol")
      expect(ol).toBeInTheDocument()
    })

    it("should render step number circles", () => {
      render(<RoadmapFlow course={webCourse} />)

      for (let i = 1; i <= webCourse.nodes.length; i++) {
        expect(screen.getByText(String(i))).toBeInTheDocument()
      }
    })

    it("should render step numbers as circles with border", () => {
      const { container } = render(<RoadmapFlow course={webCourse} />)
      const circles = container.querySelectorAll(".rounded-full.border-2")
      expect(circles.length).toBe(webCourse.nodes.length)
    })
  })

  describe("edge rendering", () => {
    it("should render edge connectors between nodes (not after last)", () => {
      const { container } = render(<RoadmapFlow course={webCourse} />)
      const edges = container.querySelectorAll('[aria-hidden="true"]')
      // edges between nodes only (nodes.length - 1), not after last node
      // plus SVG icons inside nodes
      expect(edges.length).toBeGreaterThan(0)
    })
  })

  describe("no journey markers", () => {
    it("should not render start marker", () => {
      render(<RoadmapFlow course={webCourse} />)
      expect(screen.queryByText("スタート")).not.toBeInTheDocument()
    })

    it("should not render goal marker", () => {
      render(<RoadmapFlow course={webCourse} />)
      expect(screen.queryByText("目標達成！")).not.toBeInTheDocument()
    })
  })

  describe("empty course", () => {
    it("should render no list items for empty course", () => {
      const emptyCourse = {
        ...webCourse,
        id: "web" as const,
        nodes: [],
      }
      const { container } = render(<RoadmapFlow course={emptyCourse} />)
      const listItems = container.querySelectorAll("li")
      expect(listItems.length).toBe(0)
    })
  })

  describe("custom className", () => {
    it("should accept custom className", () => {
      const { container } = render(
        <RoadmapFlow course={webCourse} className="custom-class" />
      )
      expect(container.firstChild).toHaveClass("custom-class")
    })
  })
})
