import type { Coupon } from "@/types/coupon"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import React from "react"
import { CouponDetail } from "../CouponDetail"

// Mock next/link
jest.mock("next/link", () => {
  const MockLink = ({
    children,
    href,
    className,
  }: {
    children: React.ReactNode
    href: string
    className?: string
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  )
  MockLink.displayName = "MockLink"
  return MockLink
})

// Mock catalyst components
jest.mock("@/components/catalyst/badge", () => ({
  Badge: ({
    children,
    className,
  }: {
    children: React.ReactNode
    className?: string
    color?: string
  }) => <span className={className}>{children}</span>,
}))

jest.mock("@/components/catalyst/button", () => ({
  Button: ({
    children,
    href,
    className,
  }: {
    children: React.ReactNode
    href?: string
    className?: string
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}))

jest.mock("@/components/catalyst/heading", () => ({
  Heading: ({
    children,
    level,
    className,
  }: {
    children: React.ReactNode
    level: number
    className?: string
  }) => {
    const Tag = `h${level}` as keyof JSX.IntrinsicElements
    return <Tag className={className}>{children}</Tag>
  },
}))

jest.mock("@/components/catalyst/text", () => ({
  Text: ({
    children,
    className,
  }: {
    children: React.ReactNode
    className?: string
  }) => <span className={className}>{children}</span>,
}))

// Mock TechStackBadges
jest.mock("@/components/coupons/TechStackBadges", () => ({
  TechStackBadges: ({ topics }: { topics: string[] }) => (
    <div data-testid="tech-stack-badges">
      {topics.map(t => (
        <span key={t}>{t}</span>
      ))}
    </div>
  ),
}))

// Mock coupon-data
jest.mock("@/lib/coupons/coupon-data", () => ({
  calculateDiscountRate: (original: number, discount: number) =>
    Math.round(((original - discount) / original) * 100),
}))

// Mock lucide-react
jest.mock("lucide-react", () => ({
  ArrowLeft: () => <span data-testid="arrow-left">←</span>,
  CheckCircle: () => <span data-testid="check-circle">Check</span>,
  Gift: () => <span data-testid="gift">Gift</span>,
  Tag: () => <span data-testid="tag">Tag</span>,
}))

const mockCoupon: Coupon = {
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
    description: "テスト講座の説明文",
    slug: "test-course",
    title: "テスト講座タイトル",
    topics: ["typescript", "react"],
  },
}

describe("CouponDetail", () => {
  describe("Header section", () => {
    it("renders course title", () => {
      render(<CouponDetail coupon={mockCoupon} />)
      expect(screen.getByText("テスト講座タイトル")).toBeInTheDocument()
    })

    it("renders discount rate badge", () => {
      render(<CouponDetail coupon={mockCoupon} />)
      expect(screen.getByText("90% OFF")).toBeInTheDocument()
    })

    it("renders back link to coupons page", () => {
      render(<CouponDetail coupon={mockCoupon} />)
      const backLink = screen.getByText("クーポン一覧").closest("a")
      expect(backLink).toHaveAttribute("href", "/coupons")
    })
  })

  describe("Content section", () => {
    it("renders tech stack badges", () => {
      render(<CouponDetail coupon={mockCoupon} />)
      expect(screen.getByTestId("tech-stack-badges")).toBeInTheDocument()
    })

    it("renders course description", () => {
      render(<CouponDetail coupon={mockCoupon} />)
      expect(screen.getByText("テスト講座の説明文")).toBeInTheDocument()
    })

    it("renders section heading for description", () => {
      render(<CouponDetail coupon={mockCoupon} />)
      expect(screen.getByText("この講座で学べること")).toBeInTheDocument()
    })
  })

  describe("Price section", () => {
    it("renders original price", () => {
      render(<CouponDetail coupon={mockCoupon} />)
      expect(screen.getByText("¥15,000")).toBeInTheDocument()
    })

    it("renders discount price", () => {
      render(<CouponDetail coupon={mockCoupon} />)
      expect(screen.getByText("¥1,500")).toBeInTheDocument()
    })

    it("renders savings", () => {
      render(<CouponDetail coupon={mockCoupon} />)
      expect(screen.getByText("¥13,500")).toBeInTheDocument()
    })

    it("renders coupon code", () => {
      render(<CouponDetail coupon={mockCoupon} />)
      expect(screen.getByText("TEST2025")).toBeInTheDocument()
    })
  })

  describe("CTA section", () => {
    it("renders CTA button", () => {
      render(<CouponDetail coupon={mockCoupon} />)
      expect(screen.getByText("クーポン適用済みページへ")).toBeInTheDocument()
    })

    it("renders refund guarantee", () => {
      render(<CouponDetail coupon={mockCoupon} />)
      expect(screen.getByText("30日間の返金保証付き")).toBeInTheDocument()
    })
  })
})
