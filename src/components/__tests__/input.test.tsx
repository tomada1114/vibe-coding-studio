import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import React from "react"
import { Input, InputGroup } from "../input"

describe("Input", () => {
  it("renders an input element", () => {
    render(<Input aria-label="test input" />)
    const input = screen.getByRole("textbox")
    expect(input).toBeInTheDocument()
  })

  it("renders wrapper span with control data-slot", () => {
    const { container } = render(<Input aria-label="test input" />)
    const wrapper = container.querySelector("[data-slot='control']")
    expect(wrapper).toBeInTheDocument()
    expect(wrapper?.tagName).toBe("SPAN")
  })

  it("supports text type", () => {
    render(<Input type="text" aria-label="text" />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
  })

  it("supports email type", () => {
    render(<Input type="email" aria-label="email" />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
  })

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLInputElement>()
    render(<Input ref={ref} aria-label="ref input" />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  it("supports className on wrapper", () => {
    const { container } = render(
      <Input className="custom" aria-label="custom" />
    )
    const wrapper = container.querySelector("[data-slot='control']")
    expect(wrapper).toHaveClass("custom")
  })

  it("supports placeholder", () => {
    render(<Input placeholder="Enter text" aria-label="placeholder" />)
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument()
  })

  it("supports disabled state", () => {
    render(<Input disabled aria-label="disabled" />)
    const input = screen.getByRole("textbox")
    expect(input).toBeDisabled()
  })
})

describe("InputGroup", () => {
  it("renders a span wrapper with control data-slot", () => {
    const { container } = render(
      <InputGroup>
        <Input aria-label="grouped" />
      </InputGroup>
    )
    const slots = container.querySelectorAll("[data-slot='control']")
    expect(slots.length).toBeGreaterThanOrEqual(1)
  })

  it("renders children", () => {
    render(
      <InputGroup>
        <Input aria-label="grouped input" />
      </InputGroup>
    )
    expect(screen.getByRole("textbox")).toBeInTheDocument()
  })
})
