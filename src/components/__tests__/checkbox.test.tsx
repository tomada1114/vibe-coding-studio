import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import { Checkbox, CheckboxField, CheckboxGroup } from "../checkbox"

describe("Checkbox", () => {
  it("renders a checkbox element", () => {
    render(<Checkbox aria-label="test checkbox" />)
    const checkbox = screen.getByRole("checkbox")
    expect(checkbox).toBeInTheDocument()
  })

  it("has control data-slot", () => {
    render(<Checkbox aria-label="test" />)
    const checkbox = screen.getByRole("checkbox")
    expect(checkbox).toHaveAttribute("data-slot", "control")
  })

  it("applies group and focus classes", () => {
    render(<Checkbox aria-label="styled" />)
    const checkbox = screen.getByRole("checkbox")
    expect(checkbox).toHaveClass("group", "inline-flex")
  })

  it("supports custom className", () => {
    render(<Checkbox aria-label="custom" className="custom-class" />)
    const checkbox = screen.getByRole("checkbox")
    expect(checkbox).toHaveClass("custom-class")
  })

  it("renders with default dark/zinc color", () => {
    const { container } = render(<Checkbox aria-label="default color" />)
    const innerSpan = container.querySelector("span > span")
    expect(innerSpan).toBeInTheDocument()
  })

  it("renders SVG checkmark icon", () => {
    const { container } = render(<Checkbox aria-label="svg" />)
    const svg = container.querySelector("svg")
    expect(svg).toBeInTheDocument()
  })
})

describe("CheckboxGroup", () => {
  it("renders a div with control data-slot", () => {
    render(<CheckboxGroup data-testid="group">Content</CheckboxGroup>)
    const group = screen.getByTestId("group")
    expect(group).toBeInTheDocument()
    expect(group.tagName).toBe("DIV")
    expect(group).toHaveAttribute("data-slot", "control")
  })

  it("applies spacing classes", () => {
    render(<CheckboxGroup data-testid="group">Content</CheckboxGroup>)
    expect(screen.getByTestId("group")).toHaveClass("space-y-3")
  })

  it("supports custom className", () => {
    render(
      <CheckboxGroup data-testid="group" className="custom">
        Content
      </CheckboxGroup>
    )
    expect(screen.getByTestId("group")).toHaveClass("custom", "space-y-3")
  })
})

describe("CheckboxField", () => {
  it("renders with field data-slot", () => {
    render(<CheckboxField data-testid="field">Content</CheckboxField>)
    const field = screen.getByTestId("field")
    expect(field).toBeInTheDocument()
    expect(field).toHaveAttribute("data-slot", "field")
  })

  it("applies grid layout classes", () => {
    render(<CheckboxField data-testid="field">Content</CheckboxField>)
    expect(screen.getByTestId("field")).toHaveClass("grid")
  })

  it("supports custom className", () => {
    render(
      <CheckboxField data-testid="field" className="custom">
        Content
      </CheckboxField>
    )
    expect(screen.getByTestId("field")).toHaveClass("custom")
  })
})
