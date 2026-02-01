import { Prose } from "@/components/Prose"
import { render, screen } from "@testing-library/react"

describe("Prose", () => {
  it("renders children in a div by default", () => {
    render(
      <Prose>
        <p>Test content</p>
      </Prose>
    )

    expect(screen.getByText("Test content")).toBeInTheDocument()
  })

  it("applies prose classes", () => {
    const { container } = render(
      <Prose>
        <p>Content</p>
      </Prose>
    )

    const wrapper = container.firstChild as HTMLElement
    expect(wrapper.tagName).toBe("DIV")
    expect(wrapper).toHaveClass("prose")
    expect(wrapper).toHaveClass("prose-zinc")
    expect(wrapper).toHaveClass("max-w-none")
  })

  it("renders as custom element via as prop", () => {
    const { container } = render(
      <Prose as="article">
        <p>Article content</p>
      </Prose>
    )

    const wrapper = container.firstChild as HTMLElement
    expect(wrapper.tagName).toBe("ARTICLE")
  })

  it("merges custom className", () => {
    const { container } = render(
      <Prose className="custom-class">
        <p>Content</p>
      </Prose>
    )

    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).toHaveClass("custom-class")
    expect(wrapper).toHaveClass("prose")
  })
})
