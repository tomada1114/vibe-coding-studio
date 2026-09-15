import { render, screen } from "@testing-library/react"
import { CouponExpiredFallback } from "../CouponExpiredFallback"

describe("CouponExpiredFallback", () => {
  it("配布期間外メッセージを表示する", () => {
    render(<CouponExpiredFallback />)
    expect(
      screen.getByText(/このクーポンは現在配布期間外です/)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/最新のクーポンは一覧をご覧ください/)
    ).toBeInTheDocument()
  })

  it("クーポン一覧への導線リンクがある", () => {
    render(<CouponExpiredFallback />)
    const link = screen.getByRole("link", { name: /クーポン一覧を見る/ })
    expect(link).toHaveAttribute("href", "/coupons")
  })
})
