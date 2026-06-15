import NotFound from "@/app/not-found"
import { render, screen } from "@testing-library/react"

// Mock components
jest.mock("@/components/button", () => ({
  Button: ({
    children,
    href,
  }: {
    children: React.ReactNode
    href?: string
  }) => <a href={href}>{children}</a>,
}))

jest.mock("@/components/container", () => ({
  Container: ({
    children,
    className,
  }: {
    children: React.ReactNode
    className?: string
  }) => <div className={className}>{children}</div>,
}))

jest.mock("@/components/footer", () => ({
  Footer: ({ hideCallToAction }: { hideCallToAction?: boolean }) => (
    <footer data-testid="footer" data-hide-cta={hideCallToAction} />
  ),
}))

jest.mock("@/components/gradient", () => ({
  Gradient: ({
    children,
    className,
  }: {
    children?: React.ReactNode
    className?: string
  }) => (
    <div data-testid="gradient" className={className}>
      {children}
    </div>
  ),
}))

jest.mock("@/components/navbar", () => ({
  Navbar: () => <nav data-testid="navbar" />,
}))

describe("NotFound Page", () => {
  it("renders 404 text", () => {
    render(<NotFound />)

    expect(screen.getByText("404")).toBeInTheDocument()
  })

  it("renders page not found heading", () => {
    render(<NotFound />)

    expect(
      screen.getByRole("heading", { name: "迷子になりましたか？" })
    ).toBeInTheDocument()
  })

  it("renders description text", () => {
    render(<NotFound />)

    expect(
      screen.getByText(
        "お探しのページは存在しないか、どこかへ旅立ってしまったようです。"
      )
    ).toBeInTheDocument()
  })

  it("renders home button link", () => {
    render(<NotFound />)

    const homeLink = screen.getByText("ホームに戻る")
    expect(homeLink.closest("a")).toHaveAttribute("href", "/")
  })

  it("renders frequently accessed pages", () => {
    render(<NotFound />)

    expect(screen.getByText("学習コース")).toBeInTheDocument()
    expect(screen.getByText("コミュニティ")).toBeInTheDocument()
    expect(screen.getByText("クーポン")).toBeInTheDocument()
    expect(screen.getByText("動画一覧")).toBeInTheDocument()
    expect(screen.getByText("ロードマップ")).toBeInTheDocument()
  })

  it("renders footer with hideCallToAction", () => {
    render(<NotFound />)

    const footer = screen.getByTestId("footer")
    expect(footer).toHaveAttribute("data-hide-cta", "true")
  })

  it("renders navigation landmark", () => {
    render(<NotFound />)

    expect(
      screen.getByRole("navigation", { name: "主要ページ" })
    ).toBeInTheDocument()
  })
})
