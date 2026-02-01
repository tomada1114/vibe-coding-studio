import type { Coupon } from "@/types/coupon"
import "@testing-library/jest-dom"
import { act, render, screen } from "@testing-library/react"
import React from "react"
import { FloatingCTA } from "../FloatingCTA"

// Mock catalyst button
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

// Mock coupon-data
jest.mock("@/lib/coupons/coupon-data", () => ({
  calculateDiscountRate: (original: number, discount: number) =>
    Math.round(((original - discount) / original) * 100),
}))

// Mock lucide-react
jest.mock("lucide-react", () => ({
  Gift: () => <span data-testid="gift-icon">Gift</span>,
  X: () => <span data-testid="x-icon">X</span>,
}))

const mockCoupon: Coupon = {
  courseId: "123",
  courseName: "Test Course",
  couponType: "custom_price",
  maximumRedemptions: "unlimited",
  couponCode: "TEST2025",
  startDateTime: new Date("2025-01-01"),
  endDateTime: new Date("2025-12-31"),
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
}

describe("FloatingCTA", () => {
  beforeEach(() => {
    // Reset scroll position
    Object.defineProperty(window, "scrollY", { value: 0, writable: true })
  })

  it("does not render initially (before scroll)", () => {
    const { container } = render(<FloatingCTA coupon={mockCoupon} />)
    // The component returns null when not mounted or not visible
    expect(container.firstChild).toBeNull()
  })

  it("renders after scroll and mount", () => {
    render(<FloatingCTA coupon={mockCoupon} />)

    // Simulate mount + scroll
    act(() => {
      Object.defineProperty(window, "scrollY", {
        value: 600,
        writable: true,
      })
      window.dispatchEvent(new Event("scroll"))
    })

    expect(screen.getByText(/90% OFF/)).toBeInTheDocument()
  })

  it("renders discount rate correctly", () => {
    render(<FloatingCTA coupon={mockCoupon} />)

    act(() => {
      Object.defineProperty(window, "scrollY", {
        value: 600,
        writable: true,
      })
      window.dispatchEvent(new Event("scroll"))
    })

    expect(screen.getByText(/当サイト限定 90% OFF/)).toBeInTheDocument()
  })

  it("renders CTA button", () => {
    render(<FloatingCTA coupon={mockCoupon} />)

    act(() => {
      Object.defineProperty(window, "scrollY", {
        value: 600,
        writable: true,
      })
      window.dispatchEvent(new Event("scroll"))
    })

    expect(screen.getByText("今すぐクーポンを使う")).toBeInTheDocument()
  })

  it("hides when dismiss button is clicked", () => {
    render(<FloatingCTA coupon={mockCoupon} />)

    act(() => {
      Object.defineProperty(window, "scrollY", {
        value: 600,
        writable: true,
      })
      window.dispatchEvent(new Event("scroll"))
    })

    const dismissButton = screen.getByRole("button")
    act(() => {
      dismissButton.click()
    })

    expect(screen.queryByText(/90% OFF/)).not.toBeInTheDocument()
  })
})
