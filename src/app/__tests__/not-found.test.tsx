import NotFound from "@/app/not-found"
import { render, screen } from "@testing-library/react"

describe("NotFound Page", () => {
  it("renders 404 text", () => {
    render(<NotFound />)

    expect(screen.getByText("404")).toBeInTheDocument()
  })

  it("renders the page not found heading", () => {
    render(<NotFound />)

    expect(
      screen.getByRole("heading", { name: "ページが見つかりません" })
    ).toBeInTheDocument()
  })

  it("renders description text", () => {
    render(<NotFound />)

    expect(
      screen.getByText(
        "お探しのページは存在しないか、移動した可能性があります。"
      )
    ).toBeInTheDocument()
  })

  it("renders home button link", () => {
    render(<NotFound />)

    const homeLink = screen.getByText("ホームに戻る")
    expect(homeLink.closest("a")).toHaveAttribute("href", "/")
  })

  it("renders one Geist cell with a home link", () => {
    const { container } = render(<NotFound />)

    expect(container.querySelectorAll(".gg-cell")).toHaveLength(1)
    expect(container.querySelectorAll(".gg-cell-grid")).toHaveLength(0)

    const homeLink = screen.getByRole("link", { name: "ホームに戻る" })
    expect(homeLink).toHaveAttribute("href", "/")
  })

  it("does not expose removed navigation paths", () => {
    render(<NotFound />)

    expect(screen.getAllByRole("link")).toHaveLength(1)
  })
})
