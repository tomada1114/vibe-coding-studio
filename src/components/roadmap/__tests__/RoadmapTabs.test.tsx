import { fireEvent, render, screen } from "@testing-library/react"
import { RoadmapTabs } from "../RoadmapTabs"

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

    it("should apply active styles to selected tab", () => {
      render(
        <RoadmapTabs activeCourse="web" onCourseChange={mockOnCourseChange} />
      )

      const webTab = screen.getByRole("tab", { name: /Web開発/ })
      expect(webTab).toHaveClass("bg-indigo-50")
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
