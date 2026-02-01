import "@testing-library/jest-dom"
import { render } from "@testing-library/react"
import { CouponDetailSkeleton } from "../CouponDetailSkeleton"

describe("CouponDetailSkeleton", () => {
  it("renders without crashing", () => {
    const { container } = render(<CouponDetailSkeleton />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it("renders skeleton elements with animate-pulse", () => {
    const { container } = render(<CouponDetailSkeleton />)
    const pulsingElements = container.querySelectorAll(".animate-pulse")
    expect(pulsingElements.length).toBeGreaterThan(0)
  })

  it("renders back link skeleton", () => {
    const { container } = render(<CouponDetailSkeleton />)
    // First skeleton element is the back link
    const backLinkSkeleton = container.querySelector(".mb-8.h-5.w-32")
    expect(backLinkSkeleton).toBeInTheDocument()
    expect(backLinkSkeleton).toHaveClass("animate-pulse")
  })

  it("renders tech stack grid skeleton", () => {
    const { container } = render(<CouponDetailSkeleton />)
    const grid = container.querySelector(".grid-cols-2")
    expect(grid).toBeInTheDocument()
    // 6 placeholder items
    const gridItems = grid?.querySelectorAll(".animate-pulse")
    expect(gridItems?.length).toBe(6)
  })

  it("renders description skeleton with multiple lines", () => {
    const { container } = render(<CouponDetailSkeleton />)
    const descriptionSection = container.querySelector(
      ".rounded-2xl.bg-zinc-50\\/50"
    )
    expect(descriptionSection).toBeInTheDocument()
  })

  it("renders price card skeleton", () => {
    const { container } = render(<CouponDetailSkeleton />)
    const priceCard = container.querySelector(".h-64")
    expect(priceCard).toBeInTheDocument()
    expect(priceCard).toHaveClass("animate-pulse")
  })

  it("renders CTA button skeleton", () => {
    const { container } = render(<CouponDetailSkeleton />)
    const ctaButton = container.querySelector(".h-14.w-64")
    expect(ctaButton).toBeInTheDocument()
    expect(ctaButton).toHaveClass("animate-pulse")
  })
})
