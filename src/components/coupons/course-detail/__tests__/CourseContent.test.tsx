import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import { CourseContent } from "../CourseContent"

describe("CourseContent", () => {
  it("renders section title", () => {
    render(<CourseContent description="テスト説明文" />)
    expect(screen.getByText("このような悩みを解決します")).toBeInTheDocument()
  })

  it("renders description paragraphs", () => {
    const description = "一行目の説明文\n二行目の説明文\n三行目の説明文"
    render(<CourseContent description={description} />)
    expect(screen.getByText("一行目の説明文")).toBeInTheDocument()
    expect(screen.getByText("二行目の説明文")).toBeInTheDocument()
    expect(screen.getByText("三行目の説明文")).toBeInTheDocument()
  })

  it("filters out empty lines", () => {
    const description = "一行目\n\n\n二行目"
    const { container } = render(<CourseContent description={description} />)
    const paragraphs = container.querySelectorAll("p")
    expect(paragraphs).toHaveLength(2)
  })

  it("renders single paragraph for single-line description", () => {
    const { container } = render(<CourseContent description="単一行の説明文" />)
    const paragraphs = container.querySelectorAll("p")
    expect(paragraphs).toHaveLength(1)
  })

  it("renders as h2 heading", () => {
    render(<CourseContent description="テスト" />)
    const heading = screen.getByRole("heading", { level: 2 })
    expect(heading).toHaveTextContent("このような悩みを解決します")
  })
})
