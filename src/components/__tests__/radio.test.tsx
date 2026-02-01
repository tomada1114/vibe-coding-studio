import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import { Radio, RadioField, RadioGroup } from "../radio"

describe("Radio", () => {
  it("renders a radio element", () => {
    render(
      <RadioGroup aria-label="test group">
        <Radio value="a" aria-label="option a" />
      </RadioGroup>
    )
    const radio = screen.getByRole("radio")
    expect(radio).toBeInTheDocument()
  })

  it("has control data-slot", () => {
    render(
      <RadioGroup aria-label="test group">
        <Radio value="a" aria-label="option a" />
      </RadioGroup>
    )
    const radio = screen.getByRole("radio")
    expect(radio).toHaveAttribute("data-slot", "control")
  })

  it("applies group and focus classes", () => {
    render(
      <RadioGroup aria-label="test group">
        <Radio value="a" aria-label="option a" />
      </RadioGroup>
    )
    const radio = screen.getByRole("radio")
    expect(radio).toHaveClass("group", "inline-flex")
  })

  it("supports custom className", () => {
    render(
      <RadioGroup aria-label="test group">
        <Radio value="a" aria-label="option a" className="custom" />
      </RadioGroup>
    )
    const radio = screen.getByRole("radio")
    expect(radio).toHaveClass("custom")
  })
})

describe("RadioGroup", () => {
  it("renders a radiogroup element", () => {
    render(
      <RadioGroup aria-label="test group">
        <Radio value="a" aria-label="a" />
      </RadioGroup>
    )
    const group = screen.getByRole("radiogroup")
    expect(group).toBeInTheDocument()
  })

  it("has control data-slot", () => {
    render(
      <RadioGroup aria-label="test group">
        <Radio value="a" aria-label="a" />
      </RadioGroup>
    )
    const group = screen.getByRole("radiogroup")
    expect(group).toHaveAttribute("data-slot", "control")
  })

  it("applies spacing classes", () => {
    render(
      <RadioGroup aria-label="test group">
        <Radio value="a" aria-label="a" />
      </RadioGroup>
    )
    const group = screen.getByRole("radiogroup")
    expect(group).toHaveClass("space-y-3")
  })

  it("supports custom className", () => {
    render(
      <RadioGroup aria-label="test group" className="custom">
        <Radio value="a" aria-label="a" />
      </RadioGroup>
    )
    const group = screen.getByRole("radiogroup")
    expect(group).toHaveClass("custom")
  })
})

describe("RadioField", () => {
  it("renders with field data-slot", () => {
    render(<RadioField data-testid="field">Content</RadioField>)
    const field = screen.getByTestId("field")
    expect(field).toBeInTheDocument()
    expect(field).toHaveAttribute("data-slot", "field")
  })

  it("applies grid layout classes", () => {
    render(<RadioField data-testid="field">Content</RadioField>)
    expect(screen.getByTestId("field")).toHaveClass("grid")
  })

  it("supports custom className", () => {
    render(
      <RadioField data-testid="field" className="custom">
        Content
      </RadioField>
    )
    expect(screen.getByTestId("field")).toHaveClass("custom")
  })
})

describe("Radio integration", () => {
  it("renders multiple radio options", () => {
    render(
      <RadioGroup aria-label="options">
        <Radio value="a" aria-label="option a" />
        <Radio value="b" aria-label="option b" />
        <Radio value="c" aria-label="option c" />
      </RadioGroup>
    )
    const radios = screen.getAllByRole("radio")
    expect(radios).toHaveLength(3)
  })
})
