import type { Coupon } from "@/types/coupon"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import React from "react"
import { CouponCard } from "../CouponCard"

// Mock next/link
jest.mock("next/link", () => {
  const MockLink = ({
    children,
    href,
    className,
    id,
  }: {
    children: React.ReactNode
    href: string
    className?: string
    id?: string
  }) => {
    return (
      <a href={href} className={className} id={id}>
        {children}
      </a>
    )
  }
  MockLink.displayName = "MockLink"
  return MockLink
})

// Mock lucide-react
jest.mock("lucide-react", () => ({
  Gift: () => <span data-testid="gift-icon">Gift Icon</span>,
}))

const mockCoupon: Coupon = {
  courseId: "123",
  couponCode: "TEST2025",
  discountPrice: 1500,
  validUntil: new Date("2025-12-31"),
  courseInfo: {
    id: "123",
    slug: "test-course",
    title: "Test Course Title",
    topics: ["typescript", "react"],
    originalPrice: 15000,
    platform: "udemy",
    url: "https://example.com/course",
    description: "Test course description",
    instructor: "Test Instructor",
    rating: 4.5,
    students: 1000,
    duration: "10 hours",
    level: "Beginner",
  },
}

describe("CouponCard", () => {
  describe("Rendering", () => {
    it("renders course title correctly", () => {
      render(<CouponCard coupon={mockCoupon} />)
      expect(screen.getByText("Test Course Title")).toBeInTheDocument()
    })

    it("renders course image with correct src and alt", () => {
      render(<CouponCard coupon={mockCoupon} />)
      const image = screen.getByAltText("Test Course Title")
      expect(image).toBeInTheDocument()
      expect(image).toHaveAttribute("src", "/images/udemy/test-course.png")
    })

    it("renders as a link to course detail page", () => {
      render(<CouponCard coupon={mockCoupon} />)
      const link = screen.getByRole("link")
      expect(link).toHaveAttribute("href", "/coupons/test-course")
      expect(link).toHaveAttribute("id", "course-test-course")
    })

    it("renders gift icon", () => {
      render(<CouponCard coupon={mockCoupon} />)
      expect(screen.getByTestId("gift-icon")).toBeInTheDocument()
    })

    it("renders CTA button text", () => {
      render(<CouponCard coupon={mockCoupon} />)
      expect(screen.getByText("クーポン詳細を見る")).toBeInTheDocument()
    })
  })

  describe("Price Display", () => {
    it("displays original price with strikethrough", () => {
      render(<CouponCard coupon={mockCoupon} />)
      expect(screen.getByText(/通常価格 ¥15,000/)).toBeInTheDocument()
    })

    it("displays discounted price", () => {
      render(<CouponCard coupon={mockCoupon} />)
      expect(screen.getByText(/¥1,500/)).toBeInTheDocument()
    })

    it("displays savings amount", () => {
      render(<CouponCard coupon={mockCoupon} />)
      expect(screen.getByText(/¥13,500お得/)).toBeInTheDocument()
    })

    it("formats price with thousand separators", () => {
      const highPriceCoupon: Coupon = {
        ...mockCoupon,
        discountPrice: 12800,
        courseInfo: {
          ...mockCoupon.courseInfo,
          originalPrice: 128000,
        },
      }
      render(<CouponCard coupon={highPriceCoupon} />)
      expect(screen.getByText(/通常価格 ¥128,000/)).toBeInTheDocument()
      expect(screen.getByText(/¥12,800/)).toBeInTheDocument()
    })
  })

  describe("Discount Badge", () => {
    it("displays correct discount rate", () => {
      render(<CouponCard coupon={mockCoupon} />)
      expect(screen.getByText("90% OFF")).toBeInTheDocument()
    })

    it("calculates discount rate correctly for different prices", () => {
      const customCoupon: Coupon = {
        ...mockCoupon,
        discountPrice: 5000,
        courseInfo: {
          ...mockCoupon.courseInfo,
          originalPrice: 10000,
        },
      }
      render(<CouponCard coupon={customCoupon} />)
      expect(screen.getByText("50% OFF")).toBeInTheDocument()
    })

    it("displays discount badge with emoji", () => {
      render(<CouponCard coupon={mockCoupon} />)
      const badgeText = screen.getByText("90% OFF")
      expect(badgeText.parentElement).toHaveTextContent("🎯")
    })
  })

  describe("Styling", () => {
    it("applies card styling classes", () => {
      render(<CouponCard coupon={mockCoupon} />)
      const link = screen.getByRole("link")
      expect(link).toHaveClass("group", "block", "cursor-pointer")
    })

    it("has hover transition classes", () => {
      render(<CouponCard coupon={mockCoupon} />)
      const link = screen.getByRole("link")
      expect(link).toHaveClass("transition-all", "duration-300")
    })

    it("applies shadow and border styling", () => {
      render(<CouponCard coupon={mockCoupon} />)
      const link = screen.getByRole("link")
      expect(link).toHaveClass("shadow-sm", "border")
    })
  })

  describe("Edge Cases", () => {
    it("handles zero discount correctly", () => {
      const noDiscountCoupon: Coupon = {
        ...mockCoupon,
        discountPrice: 15000,
        courseInfo: {
          ...mockCoupon.courseInfo,
          originalPrice: 15000,
        },
      }
      render(<CouponCard coupon={noDiscountCoupon} />)
      expect(screen.getByText("0% OFF")).toBeInTheDocument()
      expect(screen.getByText(/¥0お得/)).toBeInTheDocument()
    })

    it("handles very long course titles", () => {
      const longTitleCoupon: Coupon = {
        ...mockCoupon,
        courseInfo: {
          ...mockCoupon.courseInfo,
          title:
            "This is a very long course title that might wrap to multiple lines and needs proper handling",
        },
      }
      render(<CouponCard coupon={longTitleCoupon} />)
      expect(
        screen.getByText(
          "This is a very long course title that might wrap to multiple lines and needs proper handling"
        )
      ).toBeInTheDocument()
    })

    it("handles small discount amounts", () => {
      const smallDiscountCoupon: Coupon = {
        ...mockCoupon,
        discountPrice: 14500,
        courseInfo: {
          ...mockCoupon.courseInfo,
          originalPrice: 15000,
        },
      }
      render(<CouponCard coupon={smallDiscountCoupon} />)
      expect(screen.getByText("3% OFF")).toBeInTheDocument()
    })
  })
})
