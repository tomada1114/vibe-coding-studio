import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import { Switch, SwitchField, SwitchGroup } from "../switch"

describe("Switch", () => {
  it("renders a switch element", () => {
    render(<Switch aria-label="test switch" />)
    const switchEl = screen.getByRole("switch")
    expect(switchEl).toBeInTheDocument()
  })

  it("has control data-slot", () => {
    render(<Switch aria-label="test" />)
    const switchEl = screen.getByRole("switch")
    expect(switchEl).toHaveAttribute("data-slot", "control")
  })

  it("applies base styling classes", () => {
    render(<Switch aria-label="styled" />)
    const switchEl = screen.getByRole("switch")
    expect(switchEl).toHaveClass("group", "relative", "inline-flex")
  })

  it("supports custom className", () => {
    render(<Switch aria-label="custom" className="custom-class" />)
    const switchEl = screen.getByRole("switch")
    expect(switchEl).toHaveClass("custom-class")
  })

  it("renders toggle indicator span", () => {
    const { container } = render(<Switch aria-label="toggle" />)
    const indicator = container.querySelector("[aria-hidden='true']")
    expect(indicator).toBeInTheDocument()
  })
})

describe("SwitchGroup", () => {
  it("renders a div with control data-slot", () => {
    render(<SwitchGroup data-testid="group">Content</SwitchGroup>)
    const group = screen.getByTestId("group")
    expect(group).toBeInTheDocument()
    expect(group.tagName).toBe("DIV")
    expect(group).toHaveAttribute("data-slot", "control")
  })

  it("applies spacing classes", () => {
    render(<SwitchGroup data-testid="group">Content</SwitchGroup>)
    expect(screen.getByTestId("group")).toHaveClass("space-y-3")
  })

  it("supports custom className", () => {
    render(
      <SwitchGroup data-testid="group" className="custom">
        Content
      </SwitchGroup>
    )
    expect(screen.getByTestId("group")).toHaveClass("custom", "space-y-3")
  })
})

describe("SwitchField", () => {
  it("renders with field data-slot", () => {
    render(<SwitchField data-testid="field">Content</SwitchField>)
    const field = screen.getByTestId("field")
    expect(field).toBeInTheDocument()
    expect(field).toHaveAttribute("data-slot", "field")
  })

  it("applies grid layout classes", () => {
    render(<SwitchField data-testid="field">Content</SwitchField>)
    expect(screen.getByTestId("field")).toHaveClass("grid")
  })

  it("supports custom className", () => {
    render(
      <SwitchField data-testid="field" className="custom">
        Content
      </SwitchField>
    )
    expect(screen.getByTestId("field")).toHaveClass("custom")
  })
})
