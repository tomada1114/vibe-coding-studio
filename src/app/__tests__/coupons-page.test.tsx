import CouponsPage, {
  dynamic as pageDynamic,
  revalidate as pageRevalidate,
} from "@/app/coupons/page"
import { render, screen } from "@testing-library/react"

// Mock components
jest.mock("@/components/container", () => ({
  Container: ({
    children,
    className,
  }: {
    children: React.ReactNode
    className?: string
  }) => <div className={className}>{children}</div>,
}))

jest.mock("@/components/coupons/CouponPageLayout", () => ({
  CouponPageLayout: ({ coupons }: { coupons: unknown[] }) => (
    <div data-testid="coupon-layout">Coupons: {coupons.length}</div>
  ),
}))

jest.mock("@/components/error-boundary", () => ({
  AsyncErrorBoundary: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="error-boundary">{children}</div>
  ),
}))

jest.mock("@/components/footer", () => ({
  Footer: () => <footer data-testid="footer" />,
}))

jest.mock("@/components/navbar", () => ({
  Navbar: () => <nav data-testid="navbar" />,
}))

jest.mock("@/lib/coupons/coupon-data", () => ({
  getLatestCoupons: () => [
    {
      courseInfo: {
        title: "React講座",
        slug: "react",
        description: "Reactを学ぶ",
        originalPrice: 12000,
      },
      discountPrice: 1500,
      courseCouponUrl: "https://example.com/coupon",
      endDateTime: new Date("2025-12-31"),
    },
    {
      courseInfo: {
        title: "Rails講座",
        slug: "rails",
        description: "Railsを学ぶ",
        originalPrice: 10000,
      },
      discountPrice: 1200,
      courseCouponUrl: "https://example.com/coupon2",
      endDateTime: new Date("2025-12-31"),
    },
  ],
  calculateDiscountRate: (original: number, discount: number) =>
    Math.round(((original - discount) / original) * 100),
  getMaxDiscountRate: (
    coupons: { courseInfo: { originalPrice: number }; discountPrice: number }[]
  ) =>
    Math.max(
      ...coupons.map(c =>
        Math.round(
          ((c.courseInfo.originalPrice - c.discountPrice) /
            c.courseInfo.originalPrice) *
            100
        )
      )
    ),
}))

jest.mock("lucide-react", () => ({
  ChevronRight: (props: React.SVGProps<SVGSVGElement>) => (
    <svg data-testid="chevron" {...props} />
  ),
}))

describe("CouponsPage", () => {
  it("renders page heading", () => {
    render(<CouponsPage />)

    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument()
    expect(screen.getByText("Udemy講座特別クーポン")).toBeInTheDocument()
  })

  it("renders breadcrumb navigation", () => {
    render(<CouponsPage />)

    expect(
      screen.getByRole("navigation", { name: "Breadcrumb" })
    ).toBeInTheDocument()
    expect(screen.getByText("ホーム")).toBeInTheDocument()
    expect(screen.getByText("クーポン")).toBeInTheDocument()
  })

  it("renders coupon layout with coupons", () => {
    render(<CouponsPage />)

    const layout = screen.getByTestId("coupon-layout")
    expect(layout).toHaveTextContent("Coupons: 2")
  })

  it("renders discount rate information", () => {
    render(<CouponsPage />)

    // 88% OFF should be displayed (max of 87.5% and 88%)
    expect(screen.getAllByText(/88%OFF/).length).toBeGreaterThanOrEqual(1)
  })

  it("renders structured data script", () => {
    const { container } = render(<CouponsPage />)

    const script = container.querySelector('script[type="application/ld+json"]')
    expect(script).toBeInTheDocument()
  })

  it("renders navbar and footer", () => {
    render(<CouponsPage />)

    expect(screen.getByTestId("navbar")).toBeInTheDocument()
    expect(screen.getByTestId("footer")).toBeInTheDocument()
  })

  describe("Static rendering config (SSG + ISR)", () => {
    it("ページを静的生成にするため dynamic = 'force-static' を export していること", () => {
      expect(pageDynamic).toBe("force-static")
    })

    it("1時間ごとに再生成するため revalidate = 3600 を export していること", () => {
      expect(pageRevalidate).toBe(3600)
    })
  })
})
