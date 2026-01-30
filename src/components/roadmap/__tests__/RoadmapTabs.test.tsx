import { fireEvent, render, screen } from "@testing-library/react"
import { RoadmapTabs } from "../RoadmapTabs"

// Mock framer-motion
jest.mock("framer-motion", () => {
  const framerMotionKeys = new Set([
    "initial",
    "animate",
    "exit",
    "transition",
    "whileHover",
    "whileTap",
    "layoutId",
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
        children?: React.ReactNode
        [key: string]: unknown
      }) => <div {...filterProps(props)}>{children}</div>,
    },
  }
})

describe("RoadmapTabs", () => {
  const mockOnCourseChange = jest.fn()

  beforeEach(() => {
    mockOnCourseChange.mockClear()
  })

  describe("rendering", () => {
    it("should render 2 tabs", () => {
      render(
        <RoadmapTabs activeCourse="web" onCourseChange={mockOnCourseChange} />
      )

      expect(screen.getByText(/Web開発/)).toBeInTheDocument()
      expect(screen.getByText(/スマホアプリ/)).toBeInTheDocument()
    })

    it('should have role="tablist" on container', () => {
      render(
        <RoadmapTabs activeCourse="web" onCourseChange={mockOnCourseChange} />
      )

      expect(screen.getByRole("tablist")).toBeInTheDocument()
    })

    it('should have role="tab" on each tab', () => {
      render(
        <RoadmapTabs activeCourse="web" onCourseChange={mockOnCourseChange} />
      )

      const tabs = screen.getAllByRole("tab")
      expect(tabs).toHaveLength(2)
    })

    it("should render SVG icons instead of emoji", () => {
      const { container } = render(
        <RoadmapTabs activeCourse="web" onCourseChange={mockOnCourseChange} />
      )

      const svgIcons = container.querySelectorAll("svg")
      expect(svgIcons.length).toBeGreaterThanOrEqual(2)
    })
  })

  describe("segment control style", () => {
    it("should have gray-100 background container", () => {
      render(
        <RoadmapTabs activeCourse="web" onCourseChange={mockOnCourseChange} />
      )

      const tablist = screen.getByRole("tablist")
      expect(tablist).toHaveClass("bg-gray-100")
    })

    it("should render active pill for selected tab", () => {
      const { container } = render(
        <RoadmapTabs activeCourse="web" onCourseChange={mockOnCourseChange} />
      )

      const activePill = container.querySelector(".bg-white.shadow-sm")
      expect(activePill).toBeInTheDocument()
    })
  })

  describe("active state", () => {
    it("should mark web tab as selected when activeCourse is web", () => {
      render(
        <RoadmapTabs activeCourse="web" onCourseChange={mockOnCourseChange} />
      )

      const webTab = screen.getByRole("tab", { name: /Web開発/ })
      expect(webTab).toHaveAttribute("aria-selected", "true")
    })

    it("should mark mobile tab as selected when activeCourse is mobile", () => {
      render(
        <RoadmapTabs
          activeCourse="mobile"
          onCourseChange={mockOnCourseChange}
        />
      )

      const mobileTab = screen.getByRole("tab", { name: /スマホアプリ/ })
      expect(mobileTab).toHaveAttribute("aria-selected", "true")
    })

    it("should apply active text color to selected tab", () => {
      render(
        <RoadmapTabs activeCourse="web" onCourseChange={mockOnCourseChange} />
      )

      const webTab = screen.getByRole("tab", { name: /Web開発/ })
      expect(webTab).toHaveClass("text-gray-950")
    })
  })

  describe("interaction", () => {
    it("should call onCourseChange when tab is clicked", () => {
      render(
        <RoadmapTabs activeCourse="web" onCourseChange={mockOnCourseChange} />
      )

      const mobileTab = screen.getByRole("tab", { name: /スマホアプリ/ })
      fireEvent.click(mobileTab)

      expect(mockOnCourseChange).toHaveBeenCalledWith("mobile")
    })

    it("should call onCourseChange with correct courseId for each tab", () => {
      render(
        <RoadmapTabs
          activeCourse="mobile"
          onCourseChange={mockOnCourseChange}
        />
      )

      fireEvent.click(screen.getByRole("tab", { name: /Web開発/ }))
      expect(mockOnCourseChange).toHaveBeenCalledWith("web")
    })
  })
})
