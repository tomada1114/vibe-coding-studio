import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import React from "react"
import { Select } from "../select"

describe("Select", () => {
  it("renders a select element", () => {
    render(
      <Select aria-label="test select">
        <option value="a">A</option>
        <option value="b">B</option>
      </Select>
    )
    const select = screen.getByRole("combobox")
    expect(select).toBeInTheDocument()
  })

  it("renders wrapper span with control data-slot", () => {
    const { container } = render(
      <Select aria-label="test">
        <option>A</option>
      </Select>
    )
    const wrapper = container.querySelector("[data-slot='control']")
    expect(wrapper).toBeInTheDocument()
    expect(wrapper?.tagName).toBe("SPAN")
  })

  it("renders options", () => {
    render(
      <Select aria-label="options">
        <option value="opt1">Option 1</option>
        <option value="opt2">Option 2</option>
      </Select>
    )
    expect(screen.getByText("Option 1")).toBeInTheDocument()
    expect(screen.getByText("Option 2")).toBeInTheDocument()
  })

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLSelectElement>()
    render(
      <Select ref={ref} aria-label="ref select">
        <option>A</option>
      </Select>
    )
    expect(ref.current).toBeInstanceOf(HTMLSelectElement)
  })

  it("supports className on wrapper", () => {
    const { container } = render(
      <Select className="custom" aria-label="custom">
        <option>A</option>
      </Select>
    )
    const wrapper = container.querySelector("[data-slot='control']")
    expect(wrapper).toHaveClass("custom")
  })

  it("renders chevron icon for single select", () => {
    const { container } = render(
      <Select aria-label="single">
        <option>A</option>
      </Select>
    )
    const svg = container.querySelector("svg")
    expect(svg).toBeInTheDocument()
  })

  it("hides chevron icon for multiple select", () => {
    const { container } = render(
      <Select aria-label="multiple" multiple>
        <option>A</option>
        <option>B</option>
      </Select>
    )
    const svg = container.querySelector("svg")
    expect(svg).not.toBeInTheDocument()
  })

  it("supports disabled state", () => {
    render(
      <Select disabled aria-label="disabled">
        <option>A</option>
      </Select>
    )
    const select = screen.getByRole("combobox")
    expect(select).toBeDisabled()
  })
})
