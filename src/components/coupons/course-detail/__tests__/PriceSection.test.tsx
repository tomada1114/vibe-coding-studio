import type { Coupon } from "@/types/coupon"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import React from "react"
import { PriceSection } from "../PriceSection"

// Mock catalyst button
jest.mock("@/components/catalyst/button", () => ({
  Button: ({
    children,
    href,
    className,
    color,
  }: {
    children: React.ReactNode
    href?: string
    className?: string
    color?: string
  }) => (
    <a href={href} className={className} data-color={color}>
      {children}
    </a>
  ),
}))

// Mock coupon-data
jest.mock("@/lib/coupons/coupon-data", () => ({
  calculateDiscountRate: (original: number, discount: number) =>
    Math.round(((original - discount) / original) * 100),
  formatDateToJST: () => "2025年12月31日",
}))

// Mock lucide-react
jest.mock("lucide-react", () => ({
  AlertCircle: ({ className }: { className?: string }) => (
    <span data-testid="alert-icon" className={className}>
      Alert
    </span>
  ),
  Check: ({ className }: { className?: string }) => (
    <span data-testid="check-icon" className={className}>
      Check
    </span>
  ),
  Clock: ({ className }: { className?: string }) => (
    <span data-testid="clock-icon" className={className}>
      Clock
    </span>
  ),
  Copy: ({ className }: { className?: string }) => (
    <span data-testid="copy-icon" className={className}>
      Copy
    </span>
  ),
  ExternalLink: ({ className }: { className?: string }) => (
    <span data-testid="external-icon" className={className}>
      External
    </span>
  ),
  Gift: ({ className }: { className?: string }) => (
    <span data-testid="gift-icon" className={className}>
      Gift
    </span>
  ),
}))

const createMockCoupon = (overrides?: Partial<Coupon>): Coupon => ({
  courseId: "123",
  courseName: "Test Course",
  couponType: "custom_price",
  maximumRedemptions: "unlimited",
  couponCode: "TEST2025",
  startDateTime: new Date("2025-01-01"),
  endDateTime: new Date("2026-12-31"),
  currency: "JPY",
  discountPrice: 1500,
  courseCouponUrl: "https://www.udemy.com/course/test/?couponCode=TEST2025",
  courseInfo: {
    originalPrice: 15000,
    description: "Test description",
    slug: "test-course",
    title: "Test Course",
    topics: ["typescript"],
  },
  ...overrides,
})

describe("PriceSection", () => {
  describe("Active coupon", () => {
    it("renders discount rate header", () => {
      render(<PriceSection coupon={createMockCoupon()} />)
      expect(screen.getByText("90% OFF")).toBeInTheDocument()
    })

    it("renders original price", () => {
      render(<PriceSection coupon={createMockCoupon()} />)
      expect(screen.getByText("¥15,000")).toBeInTheDocument()
    })

    it("renders discount price", () => {
      render(<PriceSection coupon={createMockCoupon()} />)
      expect(screen.getByText("¥1,500")).toBeInTheDocument()
    })

    it("renders savings amount", () => {
      render(<PriceSection coupon={createMockCoupon()} />)
      expect(screen.getByText("¥13,500お得！")).toBeInTheDocument()
    })

    it("renders coupon code", () => {
      render(<PriceSection coupon={createMockCoupon()} />)
      expect(screen.getByText("TEST2025")).toBeInTheDocument()
    })

    it("renders end date", () => {
      render(<PriceSection coupon={createMockCoupon()} />)
      expect(screen.getByText(/2025年12月31日 まで/)).toBeInTheDocument()
    })

    it("renders benefits list", () => {
      render(<PriceSection coupon={createMockCoupon()} />)
      expect(screen.getByText("30日間の返金保証付き")).toBeInTheDocument()
      expect(screen.getByText("永続的なアクセス権")).toBeInTheDocument()
      expect(screen.getByText("修了証明書の発行")).toBeInTheDocument()
    })

    it("renders CTA button with link", () => {
      render(<PriceSection coupon={createMockCoupon()} />)
      expect(screen.getByText("クーポン適用済みページへ")).toBeInTheDocument()
    })

    it("renders coupon code label", () => {
      render(<PriceSection coupon={createMockCoupon()} />)
      expect(screen.getByText("クーポンコード")).toBeInTheDocument()
    })
  })

  describe("Expired coupon", () => {
    it("renders expired header", () => {
      const expiredCoupon = createMockCoupon({
        endDateTime: new Date("2020-01-01"),
      })
      render(<PriceSection coupon={expiredCoupon} />)
      expect(screen.getByText("クーポン期限切れ")).toBeInTheDocument()
    })

    it("shows original price for expired coupon", () => {
      const expiredCoupon = createMockCoupon({
        endDateTime: new Date("2020-01-01"),
      })
      render(<PriceSection coupon={expiredCoupon} />)
      expect(screen.getByText("¥15,000")).toBeInTheDocument()
    })

    it("shows expired message", () => {
      const expiredCoupon = createMockCoupon({
        endDateTime: new Date("2020-01-01"),
      })
      render(<PriceSection coupon={expiredCoupon} />)
      expect(
        screen.getByText("クーポンの有効期限が終了しました")
      ).toBeInTheDocument()
    })

    it("shows course page link instead of coupon link", () => {
      const expiredCoupon = createMockCoupon({
        endDateTime: new Date("2020-01-01"),
      })
      render(<PriceSection coupon={expiredCoupon} />)
      expect(screen.getByText("講座ページを見る")).toBeInTheDocument()
    })
  })
})
