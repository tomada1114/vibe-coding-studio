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

    it("should not render step numbers", () => {
      render(<RoadmapFlow course={webCourse} />)

      for (let i = 1; i <= webCourse.nodes.length; i++) {
        expect(screen.queryByText(String(i))).not.toBeInTheDocument()
      }
    })
  })

  describe("layout", () => {
    it("should have flex column layout for nodes", () => {
      const { container } = render(<RoadmapFlow course={webCourse} />)
      const nodesContainer = container.querySelector(".flex-col")
      expect(nodesContainer).toBeInTheDocument()
    })

    it("should center nodes horizontally", () => {
      const { container } = render(<RoadmapFlow course={webCourse} />)
      const nodesContainer = container.querySelector(".items-center")
      expect(nodesContainer).toBeInTheDocument()
    })
  })

  describe("edge rendering", () => {
    it("should render edge connectors between nodes plus goal edge", () => {
      const { container } = render(<RoadmapFlow course={webCourse} />)
      const edgeSvgs = container.querySelectorAll('svg.w-8[aria-hidden="true"]')
      // between-node edges (nodes.length - 1) + goal edge (1)
      expect(edgeSvgs.length).toBe(webCourse.nodes.length)
    })

    it("should render goal edge for single-node course", () => {
      const singleNodeCourse = {
        ...webCourse,
        id: "web" as const,
        nodes: [webCourse.nodes[0]],
      }
      const { container } = render(<RoadmapFlow course={singleNodeCourse} />)
      const edgeSvgs = container.querySelectorAll('svg.w-8[aria-hidden="true"]')
      // no between-node edges, but 1 goal edge
      expect(edgeSvgs.length).toBe(1)
    })
  })

  describe("journey markers", () => {
    it("should render start marker", () => {
      render(<RoadmapFlow course={webCourse} />)
      expect(screen.getByText("スタート")).toBeInTheDocument()
    })

    it("should render goal marker", () => {
      render(<RoadmapFlow course={webCourse} />)
      expect(screen.getByText("目標達成！")).toBeInTheDocument()
    })

    it("should not render goal marker for empty course", () => {
      const emptyCourse = {
        ...webCourse,
        id: "web" as const,
        nodes: [],
      }
      render(<RoadmapFlow course={emptyCourse} />)
      expect(screen.getByText("スタート")).toBeInTheDocument()
      expect(screen.queryByText("目標達成！")).not.toBeInTheDocument()
    })
  })

  describe("empty course", () => {
    it("should render start marker but no edge connectors", () => {
      const emptyCourse = {
        ...webCourse,
        id: "web" as const,
        nodes: [],
      }
      const { container } = render(<RoadmapFlow course={emptyCourse} />)
      const edgeSvgs = container.querySelectorAll('svg.w-8[aria-hidden="true"]')
      expect(edgeSvgs.length).toBe(0)
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
