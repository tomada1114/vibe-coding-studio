import type { Coupon } from "@/types/coupon"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import React from "react"
import { RelatedCoupons } from "../RelatedCoupons"

// Mock Heading
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

// Mock CouponCard
jest.mock("../CouponCard", () => ({
  CouponCard: ({ coupon }: { coupon: Coupon }) => (
    <div data-testid={`coupon-card-${coupon.courseId}`}>
      {coupon.courseName}
    </div>
  ),
}))

const createMockCoupon = (id: string, name: string): Coupon => ({
  courseId: id,
  courseName: name,
  couponType: "custom_price",
  maximumRedemptions: "unlimited",
  couponCode: "TEST2025",
  startDateTime: new Date("2025-01-01"),
  endDateTime: new Date("2025-12-31"),
  currency: "JPY",
  discountPrice: 1500,
  courseCouponUrl: `https://www.udemy.com/course/test-${id}/?couponCode=TEST2025`,
  courseInfo: {
    originalPrice: 15000,
    description: "Test",
    slug: `test-${id}`,
    title: name,
    topics: ["typescript"],
  },
})

describe("RelatedCoupons", () => {
  it("renders default title", () => {
    const coupons = [createMockCoupon("1", "Course 1")]
    render(<RelatedCoupons coupons={coupons} />)
    expect(
      screen.getByRole("heading", { name: "他のおすすめ講座" })
    ).toBeInTheDocument()
  })

  it("renders custom title", () => {
    const coupons = [createMockCoupon("1", "Course 1")]
    render(<RelatedCoupons coupons={coupons} title="関連講座" />)
    expect(
      screen.getByRole("heading", { name: "関連講座" })
    ).toBeInTheDocument()
  })

  it("renders all coupon cards", () => {
    const coupons = [
      createMockCoupon("1", "Course 1"),
      createMockCoupon("2", "Course 2"),
      createMockCoupon("3", "Course 3"),
    ]
    render(<RelatedCoupons coupons={coupons} />)
    expect(screen.getByTestId("coupon-card-1")).toBeInTheDocument()
    expect(screen.getByTestId("coupon-card-2")).toBeInTheDocument()
    expect(screen.getByTestId("coupon-card-3")).toBeInTheDocument()
  })

  it("returns null for empty coupons array", () => {
    const { container } = render(<RelatedCoupons coupons={[]} />)
    expect(container.firstChild).toBeNull()
  })

  it("renders as section element", () => {
    const coupons = [createMockCoupon("1", "Course 1")]
    const { container } = render(<RelatedCoupons coupons={coupons} />)
    expect(container.querySelector("section")).toBeInTheDocument()
  })
})
