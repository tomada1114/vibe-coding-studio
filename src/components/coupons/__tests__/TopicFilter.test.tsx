import type { Coupon } from "@/types/coupon"
import "@testing-library/jest-dom"
import { fireEvent, render, screen } from "@testing-library/react"
import React from "react"
import { TopicFilter } from "../TopicFilter"

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

const mockCoupons: Coupon[] = [
  {
    courseId: "1",
    couponCode: "CODE1",
    discountPrice: 1500,
    validUntil: new Date("2025-12-31"),
    courseInfo: {
      id: "1",
      slug: "course-1",
      title: "Claude Code Course",
      topics: ["claude-code", "typescript"],
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
      slug: "course-2",
      title: "React Native Course",
      topics: ["react-native", "expo"],
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
      slug: "course-3",
      title: "Next.js Course",
      topics: ["nextjs", "react"],
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

describe("TopicFilter", () => {
  const mockOnTopicToggle = jest.fn()
  const mockOnClearFilter = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe("Rendering", () => {
    it("renders the filter title", () => {
      render(
        <TopicFilter
          coupons={mockCoupons}
          selectedTopics={[]}
          onTopicToggle={mockOnTopicToggle}
          onClearFilter={mockOnClearFilter}
        />
      )
      expect(screen.getByText("技術スタックでフィルタ")).toBeInTheDocument()
    })

    it("renders only topics that are used in coupons", () => {
      render(
        <TopicFilter
          coupons={mockCoupons}
          selectedTopics={[]}
          onTopicToggle={mockOnTopicToggle}
          onClearFilter={mockOnClearFilter}
        />
      )
      // mockCouponsに含まれるトピック
      expect(screen.getByText("Claude Code")).toBeInTheDocument()
      expect(screen.getByText("React Native")).toBeInTheDocument()
      expect(screen.getByText("Expo")).toBeInTheDocument()
      expect(screen.getByText("Next.js")).toBeInTheDocument()
    })

    // アイコンは削除されたため、このテストはスキップ
    it.skip("renders topic icons", () => {
      render(
        <TopicFilter
          coupons={mockCoupons}
          selectedTopics={[]}
          onTopicToggle={mockOnTopicToggle}
          onClearFilter={mockOnClearFilter}
        />
      )
      const images = screen.getAllByRole("img")
      expect(images.length).toBeGreaterThan(0)
    })

    it("does not render clear filter button when no topics selected", () => {
      render(
        <TopicFilter
          coupons={mockCoupons}
          selectedTopics={[]}
          onTopicToggle={mockOnTopicToggle}
          onClearFilter={mockOnClearFilter}
        />
      )
      expect(screen.queryByText("フィルタをクリア")).not.toBeInTheDocument()
    })

    it("renders clear filter button when topics are selected", () => {
      render(
        <TopicFilter
          coupons={mockCoupons}
          selectedTopics={["claude-code"]}
          onTopicToggle={mockOnTopicToggle}
          onClearFilter={mockOnClearFilter}
        />
      )
      expect(screen.getByText("フィルタをクリア")).toBeInTheDocument()
    })
  })

  describe("Topic Selection", () => {
    it("shows selected state for selected topics", () => {
      render(
        <TopicFilter
          coupons={mockCoupons}
          selectedTopics={["claude-code"]}
          onTopicToggle={mockOnTopicToggle}
          onClearFilter={mockOnClearFilter}
        />
      )
      const button = screen.getByLabelText(/Claude Codeでフィルタ（選択中）/)
      expect(button).toHaveAttribute("aria-pressed", "true")
    })

    it("shows unselected state for unselected topics", () => {
      render(
        <TopicFilter
          coupons={mockCoupons}
          selectedTopics={[]}
          onTopicToggle={mockOnTopicToggle}
          onClearFilter={mockOnClearFilter}
        />
      )
      const button = screen.getByLabelText(/Claude Codeでフィルタ/)
      expect(button).toHaveAttribute("aria-pressed", "false")
    })

    it("displays filter status message when topic is selected", () => {
      render(
        <TopicFilter
          coupons={mockCoupons}
          selectedTopics={["claude-code"]}
          onTopicToggle={mockOnTopicToggle}
          onClearFilter={mockOnClearFilter}
        />
      )
      expect(
        screen.getByText(/「Claude Code」でフィルタされています/)
      ).toBeInTheDocument()
    })

    it("does not display filter status message when no topic selected", () => {
      render(
        <TopicFilter
          coupons={mockCoupons}
          selectedTopics={[]}
          onTopicToggle={mockOnTopicToggle}
          onClearFilter={mockOnClearFilter}
        />
      )
      expect(
        screen.queryByText(/でフィルタされています/)
      ).not.toBeInTheDocument()
    })
  })

  describe("User Interactions", () => {
    it("calls onTopicToggle when topic button is clicked", () => {
      render(
        <TopicFilter
          coupons={mockCoupons}
          selectedTopics={[]}
          onTopicToggle={mockOnTopicToggle}
          onClearFilter={mockOnClearFilter}
        />
      )
      const claudeButton = screen.getByLabelText(/Claude Codeでフィルタ/)
      fireEvent.click(claudeButton)
      expect(mockOnTopicToggle).toHaveBeenCalledWith("claude-code")
      expect(mockOnTopicToggle).toHaveBeenCalledTimes(1)
    })

    it("calls onClearFilter when clear button is clicked", () => {
      render(
        <TopicFilter
          coupons={mockCoupons}
          selectedTopics={["claude-code"]}
          onTopicToggle={mockOnTopicToggle}
          onClearFilter={mockOnClearFilter}
        />
      )
      const clearButton = screen.getByText("フィルタをクリア")
      fireEvent.click(clearButton)
      expect(mockOnClearFilter).toHaveBeenCalledTimes(1)
    })

    it("allows toggling different topics", () => {
      render(
        <TopicFilter
          coupons={mockCoupons}
          selectedTopics={[]}
          onTopicToggle={mockOnTopicToggle}
          onClearFilter={mockOnClearFilter}
        />
      )
      const claudeButton = screen.getByLabelText(/Claude Codeでフィルタ/)
      const reactButton = screen.getByLabelText(/React Nativeでフィルタ/)

      fireEvent.click(claudeButton)
      expect(mockOnTopicToggle).toHaveBeenCalledWith("claude-code")

      fireEvent.click(reactButton)
      expect(mockOnTopicToggle).toHaveBeenCalledWith("react-native")
    })
  })

  describe("Accessibility", () => {
    it("has proper aria-label for topic buttons", () => {
      render(
        <TopicFilter
          coupons={mockCoupons}
          selectedTopics={[]}
          onTopicToggle={mockOnTopicToggle}
          onClearFilter={mockOnClearFilter}
        />
      )
      expect(screen.getByLabelText(/Claude Codeでフィルタ/)).toBeInTheDocument()
    })

    it("has proper aria-pressed attribute", () => {
      render(
        <TopicFilter
          coupons={mockCoupons}
          selectedTopics={["claude-code"]}
          onTopicToggle={mockOnTopicToggle}
          onClearFilter={mockOnClearFilter}
        />
      )
      const selectedButton = screen.getByLabelText(
        /Claude Codeでフィルタ（選択中）/
      )
      expect(selectedButton).toHaveAttribute("aria-pressed", "true")

      const unselectedButton = screen.getByLabelText(/React Nativeでフィルタ/)
      expect(unselectedButton).toHaveAttribute("aria-pressed", "false")
    })

    it("topic buttons are keyboard accessible", () => {
      render(
        <TopicFilter
          coupons={mockCoupons}
          selectedTopics={[]}
          onTopicToggle={mockOnTopicToggle}
          onClearFilter={mockOnClearFilter}
        />
      )
      const button = screen.getByLabelText(/Claude Codeでフィルタ/)
      expect(button.tagName).toBe("BUTTON")
    })
  })

  describe("Edge Cases", () => {
    it("handles empty coupons array", () => {
      render(
        <TopicFilter
          coupons={[]}
          selectedTopics={[]}
          onTopicToggle={mockOnTopicToggle}
          onClearFilter={mockOnClearFilter}
        />
      )
      expect(screen.getByText("技術スタックでフィルタ")).toBeInTheDocument()
      // トピックボタンは表示されない
      expect(screen.queryByText("Claude Code")).not.toBeInTheDocument()
    })

    it("handles topics not in TOPIC_INFO", () => {
      const couponsWithUnknownTopic: Coupon[] = [
        {
          ...mockCoupons[0],
          courseInfo: {
            ...mockCoupons[0].courseInfo,
            topics: ["unknown-topic"],
          },
        },
      ]
      render(
        <TopicFilter
          coupons={couponsWithUnknownTopic}
          selectedTopics={[]}
          onTopicToggle={mockOnTopicToggle}
          onClearFilter={mockOnClearFilter}
        />
      )
      // 不明なトピックは表示されない
      expect(screen.queryByText("unknown-topic")).not.toBeInTheDocument()
    })

    it("handles multiple selected topics correctly", () => {
      render(
        <TopicFilter
          coupons={mockCoupons}
          selectedTopics={["claude-code", "react-native"]}
          onTopicToggle={mockOnTopicToggle}
          onClearFilter={mockOnClearFilter}
        />
      )
      // 最初のトピックのみステータスメッセージに表示
      expect(
        screen.getByText(/「Claude Code」でフィルタされています/)
      ).toBeInTheDocument()
    })
  })

  describe("Styling", () => {
    it("applies correct styles to selected topic button", () => {
      render(
        <TopicFilter
          coupons={mockCoupons}
          selectedTopics={["claude-code"]}
          onTopicToggle={mockOnTopicToggle}
          onClearFilter={mockOnClearFilter}
        />
      )
      const button = screen.getByLabelText(/Claude Codeでフィルタ（選択中）/)
      expect(button).toHaveClass("border-blue-500/30", "bg-blue-50/80")
    })

    it("applies correct styles to unselected topic button", () => {
      render(
        <TopicFilter
          coupons={mockCoupons}
          selectedTopics={[]}
          onTopicToggle={mockOnTopicToggle}
          onClearFilter={mockOnClearFilter}
        />
      )
      const button = screen.getByLabelText(/Claude Codeでフィルタ/)
      expect(button).toHaveClass("border-zinc-950/10", "bg-zinc-50")
    })
  })
})
