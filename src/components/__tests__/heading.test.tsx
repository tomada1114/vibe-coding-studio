import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import React from "react"
import { Heading, Subheading } from "../heading"

describe("Heading", () => {
  it("renders heading element with default level 1", () => {
    render(<Heading>Default Heading</Heading>)
    const heading = screen.getByRole("heading", { level: 1 })
    expect(heading).toBeInTheDocument()
    expect(heading.tagName).toBe("H1")
  })

  it("supports custom heading levels", () => {
    const levels = [1, 2, 3, 4, 5, 6] as const

    levels.forEach(level => {
      const { unmount } = render(<Heading level={level}>Level {level}</Heading>)
      const heading = screen.getByRole("heading", { level })
      expect(heading).toBeInTheDocument()
      expect(heading.tagName).toBe(`H${level}`)
      unmount()
    })
  })

  it("has proper base styling", () => {
    render(<Heading>Styled Heading</Heading>)
    const heading = screen.getByText("Styled Heading")
    expect(heading).toHaveClass(
      "text-2xl/8",
      "font-semibold",
      "text-zinc-950",
      "sm:text-xl/8"
    )
  })

  it("supports custom className", () => {
    render(<Heading className="custom-heading">Custom Heading</Heading>)
    const heading = screen.getByText("Custom Heading")
    expect(heading).toHaveClass("custom-heading")
  })

  it("maintains base classes with custom className", () => {
    render(
      <Heading className="extra-class" level={2}>
        Class Test
      </Heading>
    )
    const heading = screen.getByText("Class Test")
    expect(heading).toHaveClass("extra-class", "text-2xl/8", "font-semibold")
  })

  it("spreads additional props to heading element", () => {
    render(
      <Heading data-testid="heading-props" aria-label="Test heading">
        Props Heading
      </Heading>
    )
    const heading = screen.getByTestId("heading-props")
    expect(heading).toHaveAttribute("aria-label", "Test heading")
  })

  it("supports id attribute", () => {
    render(<Heading id="main-heading">ID Heading</Heading>)
    const heading = screen.getByText("ID Heading")
    expect(heading).toHaveAttribute("id", "main-heading")
  })

  it("has responsive text sizing", () => {
    render(<Heading>Responsive Heading</Heading>)
    const heading = screen.getByText("Responsive Heading")
    expect(heading).toHaveClass("text-2xl/8", "sm:text-xl/8")
  })

  it("maintains semantic heading hierarchy", () => {
    render(
      <div>
        <Heading level={1}>Main Title</Heading>
        <Heading level={2}>Section</Heading>
        <Heading level={3}>Subsection</Heading>
      </div>
    )

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Main Title"
    )
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Section"
    )
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      "Subsection"
    )
  })

  it("supports nested content", () => {
    render(
      <Heading>
        Complex <span>heading</span> with <em>elements</em>
      </Heading>
    )
    expect(screen.getByText(/Complex/)).toBeInTheDocument()
    expect(screen.getByText("heading")).toBeInTheDocument()
    expect(screen.getByText(/with/)).toBeInTheDocument()
    expect(screen.getByText("elements")).toBeInTheDocument()
  })

  it("handles click events", () => {
    const handleClick = jest.fn()
    render(<Heading onClick={handleClick}>Clickable Heading</Heading>)
    const heading = screen.getByText("Clickable Heading")
    heading.click()
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it("supports keyboard navigation", () => {
    render(<Heading tabIndex={0}>Focusable Heading</Heading>)
    const heading = screen.getByText("Focusable Heading")
    heading.focus()
    expect(heading).toHaveFocus()
  })

  it("works with ref forwarding", () => {
    const ref = React.createRef<HTMLHeadingElement>()
    render(<Heading ref={ref}>Ref Heading</Heading>)
    expect(ref.current).toBeInstanceOf(HTMLHeadingElement)
    expect(ref.current?.tagName).toBe("H1")
  })

  it("preserves text content properly", () => {
    const longText =
      "This is a very long heading that should maintain its content properly across different screen sizes and styling contexts"
    render(<Heading>{longText}</Heading>)
    expect(screen.getByText(longText)).toBeInTheDocument()
  })

  it("supports ARIA attributes", () => {
    render(
      <Heading aria-describedby="desc-1" aria-level={1} role="heading">
        ARIA Heading
      </Heading>
    )
    const heading = screen.getByText("ARIA Heading")
    expect(heading).toHaveAttribute("aria-describedby", "desc-1")
    expect(heading).toHaveAttribute("aria-level", "1")
    expect(heading).toHaveAttribute("role", "heading")
  })
})

describe("Subheading", () => {
  it("renders subheading element with default level 2", () => {
    render(<Subheading>Default Subheading</Subheading>)
    const subheading = screen.getByRole("heading", { level: 2 })
    expect(subheading).toBeInTheDocument()
    expect(subheading.tagName).toBe("H2")
  })

  it("supports custom heading levels", () => {
    const levels = [1, 2, 3, 4, 5, 6] as const

    levels.forEach(level => {
      const { unmount } = render(
        <Subheading level={level}>Sublevel {level}</Subheading>
      )
      const subheading = screen.getByRole("heading", { level })
      expect(subheading).toBeInTheDocument()
      expect(subheading.tagName).toBe(`H${level}`)
      unmount()
    })
  })

  it("has proper base styling", () => {
    render(<Subheading>Styled Subheading</Subheading>)
    const subheading = screen.getByText("Styled Subheading")
    expect(subheading).toHaveClass(
      "text-base/7",
      "font-semibold",
      "text-zinc-950",
      "sm:text-sm/6"
    )
  })

  it("has different styling from main Heading", () => {
    render(
      <div>
        <Heading>Main Heading</Heading>
        <Subheading>Sub Heading</Subheading>
      </div>
    )

    const mainHeading = screen.getByText("Main Heading")
    const subHeading = screen.getByText("Sub Heading")

    // Different text sizes
    expect(mainHeading).toHaveClass("text-2xl/8")
    expect(subHeading).toHaveClass("text-base/7")

    // Different responsive sizes
    expect(mainHeading).toHaveClass("sm:text-xl/8")
    expect(subHeading).toHaveClass("sm:text-sm/6")
  })

  it("supports custom className", () => {
    render(
      <Subheading className="custom-subheading">Custom Subheading</Subheading>
    )
    const subheading = screen.getByText("Custom Subheading")
    expect(subheading).toHaveClass("custom-subheading")
  })

  it("maintains base classes with custom className", () => {
    render(
      <Subheading className="extra-class" level={3}>
        Class Test
      </Subheading>
    )
    const subheading = screen.getByText("Class Test")
    expect(subheading).toHaveClass(
      "extra-class",
      "text-base/7",
      "font-semibold"
    )
  })

  it("spreads additional props to heading element", () => {
    render(
      <Subheading data-testid="subheading-props" aria-label="Test subheading">
        Props Subheading
      </Subheading>
    )
    const subheading = screen.getByTestId("subheading-props")
    expect(subheading).toHaveAttribute("aria-label", "Test subheading")
  })

  it("has responsive text sizing", () => {
    render(<Subheading>Responsive Subheading</Subheading>)
    const subheading = screen.getByText("Responsive Subheading")
    expect(subheading).toHaveClass("text-base/7", "sm:text-sm/6")
  })

  it("supports nested content", () => {
    render(
      <Subheading>
        Complex <span>subheading</span> with <em>elements</em>
      </Subheading>
    )
    expect(screen.getByText(/Complex/)).toBeInTheDocument()
    expect(screen.getByText("subheading")).toBeInTheDocument()
    expect(screen.getByText(/with/)).toBeInTheDocument()
    expect(screen.getByText("elements")).toBeInTheDocument()
  })

  it("works with ref forwarding", () => {
    const ref = React.createRef<HTMLHeadingElement>()
    render(<Subheading ref={ref}>Ref Subheading</Subheading>)
    expect(ref.current).toBeInstanceOf(HTMLHeadingElement)
    expect(ref.current?.tagName).toBe("H2")
  })

  it("supports ARIA attributes", () => {
    render(
      <Subheading aria-describedby="desc-2" aria-level={2} role="heading">
        ARIA Subheading
      </Subheading>
    )
    const subheading = screen.getByText("ARIA Subheading")
    expect(subheading).toHaveAttribute("aria-describedby", "desc-2")
    expect(subheading).toHaveAttribute("aria-level", "2")
    expect(subheading).toHaveAttribute("role", "heading")
  })
})

// Integration tests for both heading components
describe("Heading and Subheading Integration", () => {
  it("can be used together to create proper hierarchy", () => {
    render(
      <div>
        <Heading level={1}>Page Title</Heading>
        <Subheading level={2}>Section Title</Subheading>
        <Heading level={3}>Subsection</Heading>
        <Subheading level={4}>Minor Section</Subheading>
      </div>
    )

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Page Title"
    )
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Section Title"
    )
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      "Subsection"
    )
    expect(screen.getByRole("heading", { level: 4 })).toHaveTextContent(
      "Minor Section"
    )
  })

  it("supports custom styling on both components", () => {
    render(
      <div>
        <Heading className="mb-4">Spaced Heading</Heading>
        <Subheading className="mt-2">Spaced Subheading</Subheading>
      </div>
    )

    expect(screen.getByText("Spaced Heading")).toHaveClass("mb-4")
    expect(screen.getByText("Spaced Subheading")).toHaveClass("mt-2")
  })

  it("handles semantic nesting correctly", () => {
    render(
      <article>
        <Heading level={1}>Article Title</Heading>
        <section>
          <Subheading level={2}>Section 1</Subheading>
          <Heading level={3}>Subsection A</Heading>
          <Subheading level={4}>Minor Topic</Subheading>
        </section>
      </article>
    )

    const headings = screen.getAllByRole("heading")
    expect(headings).toHaveLength(4)

    expect(headings[0]).toHaveTextContent("Article Title")
    expect(headings[1]).toHaveTextContent("Section 1")
    expect(headings[2]).toHaveTextContent("Subsection A")
    expect(headings[3]).toHaveTextContent("Minor Topic")
  })

  it("supports all combinations of levels", () => {
    render(
      <div>
        <Heading level={1}>H1 via Heading</Heading>
        <Subheading level={1}>H1 via Subheading</Subheading>
        <Heading level={6}>H6 via Heading</Heading>
        <Subheading level={6}>H6 via Subheading</Subheading>
      </div>
    )

    const h1Headings = screen.getAllByRole("heading", { level: 1 })
    const h6Headings = screen.getAllByRole("heading", { level: 6 })

    expect(h1Headings).toHaveLength(2)
    expect(h6Headings).toHaveLength(2)
  })
})
