import { fireEvent, render, screen } from "@testing-library/react"
import { RoadmapContent } from "../RoadmapContent"

const mockPush = jest.fn()
let mockSearchParams = new URLSearchParams()

jest.mock("next/navigation", () => ({
  useSearchParams: () => mockSearchParams,
  useRouter: () => ({ push: mockPush }),
}))

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

describe("RoadmapContent", () => {
  beforeEach(() => {
    mockPush.mockClear()
    mockSearchParams = new URLSearchParams()
  })

  describe("default rendering", () => {
    it("should render page heading", () => {
      render(<RoadmapContent />)
      expect(screen.getByText("学習ロードマップ")).toBeInTheDocument()
    })

    it("should render breadcrumb with home link", () => {
      render(<RoadmapContent />)
      const breadcrumb = screen.getByLabelText("Breadcrumb")
      expect(breadcrumb).toBeInTheDocument()
      expect(screen.getByText("ホーム")).toBeInTheDocument()
    })

    it("should render course tabs", () => {
      render(<RoadmapContent />)
      expect(screen.getByRole("tablist")).toBeInTheDocument()
    })

    it("should default to web course when no query param", () => {
      render(<RoadmapContent />)
      const webTab = screen.getByRole("tab", { name: /Web開発/ })
      expect(webTab).toHaveAttribute("aria-selected", "true")
    })
  })

  describe("URL query parameter handling", () => {
    it("should select web course when ?course=web", () => {
      mockSearchParams = new URLSearchParams("course=web")
      render(<RoadmapContent />)
      const webTab = screen.getByRole("tab", { name: /Web開発/ })
      expect(webTab).toHaveAttribute("aria-selected", "true")
    })

    it("should select mobile course when ?course=mobile", () => {
      mockSearchParams = new URLSearchParams("course=mobile")
      render(<RoadmapContent />)
      const mobileTab = screen.getByRole("tab", { name: /スマホアプリ/ })
      expect(mobileTab).toHaveAttribute("aria-selected", "true")
    })

    it("should fall back to web for invalid course param", () => {
      mockSearchParams = new URLSearchParams("course=invalid")
      render(<RoadmapContent />)
      const webTab = screen.getByRole("tab", { name: /Web開発/ })
      expect(webTab).toHaveAttribute("aria-selected", "true")
    })
  })

  describe("course switching", () => {
    it("should update URL when tab is clicked", () => {
      render(<RoadmapContent />)
      const mobileTab = screen.getByRole("tab", { name: /スマホアプリ/ })
      fireEvent.click(mobileTab)
      expect(mockPush).toHaveBeenCalledWith("/roadmap?course=mobile", {
        scroll: false,
      })
    })
  })

  describe("page structure", () => {
    it("should render description text", () => {
      render(<RoadmapContent />)
      expect(screen.getByText(/最適な学習パス/)).toBeInTheDocument()
    })

    it("should render roadmap nodes for default course", () => {
      render(<RoadmapContent />)
      expect(
        screen.getByText("Claude Code × Vibe Coding 入門")
      ).toBeInTheDocument()
    })
  })
})
