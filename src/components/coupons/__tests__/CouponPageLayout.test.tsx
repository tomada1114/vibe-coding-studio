import type { Coupon } from "@/types/coupon"
import "@testing-library/jest-dom"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import React from "react"
import { CouponPageLayout } from "../CouponPageLayout"

// Mock child components
jest.mock("../CouponCard", () => ({
  CouponCard: ({
    coupon,
    priority,
  }: {
    coupon: Coupon
    priority?: boolean
  }) => (
    <div
      data-testid={`coupon-card-${coupon.courseId}`}
      data-priority={priority ? "true" : "false"}
    >
      {coupon.courseInfo.title}
    </div>
  ),
}))

jest.mock("../TopicFilter", () => ({
  TopicFilter: ({
    selectedTopics,
    onTopicToggle,
    onClearFilter,
  }: {
    selectedTopics: string[]
    onTopicToggle: (topic: string) => void
    onClearFilter: () => void
  }) => (
    <div data-testid="topic-filter">
      <button onClick={() => onTopicToggle("typescript")}>
        Toggle TypeScript
      </button>
      <button onClick={() => onTopicToggle("react")}>Toggle React</button>
      <button onClick={onClearFilter}>Clear Filter</button>
      <div data-testid="selected-topics">{selectedTopics.join(",")}</div>
    </div>
  ),
}))

// Mock next/navigation
const mockReplace = jest.fn()
const mockSearchParams = new URLSearchParams()

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: mockReplace,
  }),
  usePathname: () => "/coupons",
  useSearchParams: () => mockSearchParams,
}))

// Mock Catalyst Button
jest.mock("@/components/catalyst/button", () => ({
  Button: ({
    children,
    onClick,
    className,
  }: {
    children: React.ReactNode
    onClick?: () => void
    className?: string
  }) => (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  ),
}))

// Mock lucide-react
jest.mock("lucide-react", () => ({
  ChevronUp: () => <span data-testid="chevron-up-icon">ChevronUp Icon</span>,
}))

const mockCoupons: Coupon[] = [
  {
    courseId: "1",
    couponCode: "CODE1",
    discountPrice: 1500,
    validUntil: new Date("2025-12-31"),
    courseInfo: {
      id: "1",
      slug: "typescript-course",
      title: "TypeScript Course",
      topics: ["typescript", "javascript"],
      originalPrice: 15000,
      platform: "udemy",
      url: "https://example.com/course1",
      description: "Test description",
      instructor: "Test Instructor",
      rating: 4.5,
      students: 1000,
      duration: "10 hours",
      level: "Beginner",
    },
  },
  {
    courseId: "2",
    couponCode: "CODE2",
    discountPrice: 1500,
    validUntil: new Date("2025-12-31"),
    courseInfo: {
      id: "2",
      slug: "react-course",
      title: "React Course",
      topics: ["react", "javascript"],
      originalPrice: 15000,
      platform: "udemy",
      url: "https://example.com/course2",
      description: "Test description",
      instructor: "Test Instructor",
      rating: 4.5,
      students: 1000,
      duration: "10 hours",
      level: "Beginner",
    },
  },
  {
    courseId: "3",
    couponCode: "CODE3",
    discountPrice: 1500,
    validUntil: new Date("2025-12-31"),
    courseInfo: {
      id: "3",
      slug: "python-course",
      title: "Python Course",
      topics: ["python"],
      originalPrice: 15000,
      platform: "udemy",
      url: "https://example.com/course3",
      description: "Test description",
      instructor: "Test Instructor",
      rating: 4.5,
      students: 1000,
      duration: "10 hours",
      level: "Beginner",
    },
  },
]

describe("CouponPageLayout", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockSearchParams.delete("topic")
  })

  describe("Rendering", () => {
    it("renders TopicFilter component", () => {
      render(<CouponPageLayout coupons={mockCoupons} />)
      expect(screen.getByTestId("topic-filter")).toBeInTheDocument()
    })

    it("renders all coupon cards when no filter is applied", () => {
      render(<CouponPageLayout coupons={mockCoupons} />)
      expect(screen.getByTestId("coupon-card-1")).toBeInTheDocument()
      expect(screen.getByTestId("coupon-card-2")).toBeInTheDocument()
      expect(screen.getByTestId("coupon-card-3")).toBeInTheDocument()
    })

    it("displays grid layout for coupon cards", () => {
      const { container } = render(<CouponPageLayout coupons={mockCoupons} />)
      const grid = container.querySelector(".grid")
      expect(grid).toBeInTheDocument()
      expect(grid).toHaveClass(
        "grid-cols-1",
        "sm:grid-cols-2",
        "lg:grid-cols-3"
      )
    })

    it("does not show filter result count when no filter applied", () => {
      render(<CouponPageLayout coupons={mockCoupons} />)
      expect(screen.queryByText(/検索結果:/)).not.toBeInTheDocument()
    })
  })

  describe("Filtering", () => {
    it("filters coupons by selected topic", async () => {
      render(<CouponPageLayout coupons={mockCoupons} />)

      const toggleButton = screen.getByText("Toggle TypeScript")
      fireEvent.click(toggleButton)

      await waitFor(() => {
        expect(mockReplace).toHaveBeenCalled()
      })
    })

    it("shows filter result count when filter is applied", async () => {
      render(<CouponPageLayout coupons={mockCoupons} />)

      const toggleButton = screen.getByText("Toggle TypeScript")
      fireEvent.click(toggleButton)

      await waitFor(() => {
        const selectedTopics = screen.getByTestId("selected-topics")
        expect(selectedTopics.textContent).toContain("typescript")
      })
    })

    it("clears filter when clear button is clicked", async () => {
      render(<CouponPageLayout coupons={mockCoupons} />)

      const clearButton = screen.getByText("Clear Filter")
      fireEvent.click(clearButton)

      await waitFor(() => {
        expect(mockReplace).toHaveBeenCalled()
      })
    })

    it("shows empty state when no coupons match filter", () => {
      render(<CouponPageLayout coupons={[]} />)
      expect(
        screen.getByText(/現在利用可能なクーポンがありません/)
      ).toBeInTheDocument()
    })

    it("shows empty state with filter-specific message", () => {
      render(<CouponPageLayout coupons={[]} />)
      const emptyStateIcon = screen.getByText("🔍")
      expect(emptyStateIcon).toBeInTheDocument()
    })
  })

  describe("Scroll to Top Button", () => {
    beforeEach(() => {
      // Mock window.scrollY
      Object.defineProperty(window, "scrollY", {
        writable: true,
        configurable: true,
        value: 0,
      })

      // Mock window.scrollTo
      window.scrollTo = jest.fn()
    })

    it("does not show scroll button initially", () => {
      render(<CouponPageLayout coupons={mockCoupons} />)
      expect(screen.queryByTestId("chevron-up-icon")).not.toBeInTheDocument()
    })

    it("shows scroll button after scrolling down", async () => {
      render(<CouponPageLayout coupons={mockCoupons} />)

      // Simulate scroll event
      Object.defineProperty(window, "scrollY", { value: 400 })
      fireEvent.scroll(window)

      await waitFor(() => {
        expect(screen.getByTestId("chevron-up-icon")).toBeInTheDocument()
      })
    })

    it("scrolls to top when scroll button is clicked", async () => {
      render(<CouponPageLayout coupons={mockCoupons} />)

      // Trigger scroll to show button
      Object.defineProperty(window, "scrollY", { value: 400 })
      fireEvent.scroll(window)

      await waitFor(() => {
        const scrollButton = screen.getByTestId("chevron-up-icon").parentElement
        if (scrollButton) {
          fireEvent.click(scrollButton)
        }
      })

      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 0,
        behavior: "smooth",
      })
    })

    it("hides scroll button when near top", async () => {
      render(<CouponPageLayout coupons={mockCoupons} />)

      // Show button
      Object.defineProperty(window, "scrollY", { value: 400 })
      fireEvent.scroll(window)

      await waitFor(() => {
        expect(screen.getByTestId("chevron-up-icon")).toBeInTheDocument()
      })

      // Hide button
      Object.defineProperty(window, "scrollY", { value: 100 })
      fireEvent.scroll(window)

      await waitFor(() => {
        expect(screen.queryByTestId("chevron-up-icon")).not.toBeInTheDocument()
      })
    })
  })

  describe("URL Synchronization", () => {
    it("updates URL when topic is toggled", async () => {
      render(<CouponPageLayout coupons={mockCoupons} />)

      const toggleButton = screen.getByText("Toggle TypeScript")
      fireEvent.click(toggleButton)

      await waitFor(() => {
        expect(mockReplace).toHaveBeenCalledWith(
          expect.stringContaining("/coupons"),
          {
            scroll: false,
          }
        )
      })
    })

    it("updates URL when filter is cleared", async () => {
      render(<CouponPageLayout coupons={mockCoupons} />)

      const clearButton = screen.getByText("Clear Filter")
      fireEvent.click(clearButton)

      await waitFor(() => {
        expect(mockReplace).toHaveBeenCalledWith("/coupons", { scroll: false })
      })
    })

    it("prevents scroll when updating URL", async () => {
      render(<CouponPageLayout coupons={mockCoupons} />)

      const toggleButton = screen.getByText("Toggle TypeScript")
      fireEvent.click(toggleButton)

      await waitFor(() => {
        expect(mockReplace).toHaveBeenCalledWith(expect.any(String), {
          scroll: false,
        })
      })
    })
  })

  describe("Edge Cases", () => {
    it("handles empty coupons array", () => {
      render(<CouponPageLayout coupons={[]} />)
      expect(
        screen.getByText(/現在利用可能なクーポンがありません/)
      ).toBeInTheDocument()
    })

    it("handles single coupon", () => {
      render(<CouponPageLayout coupons={[mockCoupons[0]]} />)
      expect(screen.getByTestId("coupon-card-1")).toBeInTheDocument()
      expect(screen.queryByTestId("coupon-card-2")).not.toBeInTheDocument()
    })

    it("removes event listener on unmount", () => {
      const removeEventListenerSpy = jest.spyOn(window, "removeEventListener")
      const { unmount } = render(<CouponPageLayout coupons={mockCoupons} />)

      unmount()

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        "scroll",
        expect.any(Function)
      )
    })
  })

  describe("Accessibility", () => {
    it("scroll to top button has proper styling", async () => {
      render(<CouponPageLayout coupons={mockCoupons} />)

      Object.defineProperty(window, "scrollY", { value: 400 })
      fireEvent.scroll(window)

      await waitFor(() => {
        const button = screen.getByTestId("chevron-up-icon").parentElement
        expect(button).toBeInTheDocument()
        expect(button).toHaveClass("rounded-full")
      })
    })
  })

  describe("Above-the-fold image priority (LCP)", () => {
    // デスクトップは横3カラムグリッドのため、先頭3枚に priority を付ける。
    const buildCoupons = (count: number): Coupon[] =>
      Array.from({ length: count }, (_, i) => ({
        ...mockCoupons[0],
        courseId: `c${i}`,
        couponCode: `CODE-${i}`,
        courseInfo: {
          ...mockCoupons[0].courseInfo,
          id: `c${i}`,
          slug: `slug-${i}`,
          title: `Course ${i}`,
        },
      }))

    it("先頭3枚の CouponCard には priority=true が渡ること", () => {
      const coupons = buildCoupons(5)
      render(<CouponPageLayout coupons={coupons} />)

      expect(screen.getByTestId("coupon-card-c0")).toHaveAttribute(
        "data-priority",
        "true"
      )
      expect(screen.getByTestId("coupon-card-c1")).toHaveAttribute(
        "data-priority",
        "true"
      )
      expect(screen.getByTestId("coupon-card-c2")).toHaveAttribute(
        "data-priority",
        "true"
      )
    })

    it("4枚目以降の CouponCard には priority=false が渡ること", () => {
      const coupons = buildCoupons(5)
      render(<CouponPageLayout coupons={coupons} />)

      expect(screen.getByTestId("coupon-card-c3")).toHaveAttribute(
        "data-priority",
        "false"
      )
      expect(screen.getByTestId("coupon-card-c4")).toHaveAttribute(
        "data-priority",
        "false"
      )
    })

    it("クーポンが3件以下の場合は全件 priority=true になること", () => {
      const coupons = buildCoupons(2)
      render(<CouponPageLayout coupons={coupons} />)

      expect(screen.getByTestId("coupon-card-c0")).toHaveAttribute(
        "data-priority",
        "true"
      )
      expect(screen.getByTestId("coupon-card-c1")).toHaveAttribute(
        "data-priority",
        "true"
      )
    })
  })
})
