import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import React from "react"
import { Textarea } from "../textarea"

describe("Textarea", () => {
  it("renders a textarea element", () => {
    render(<Textarea aria-label="test textarea" />)
    const textarea = screen.getByRole("textbox")
    expect(textarea).toBeInTheDocument()
    expect(textarea.tagName).toBe("TEXTAREA")
  })

  it("renders wrapper span with control data-slot", () => {
    const { container } = render(<Textarea aria-label="test" />)
    const wrapper = container.querySelector("[data-slot='control']")
    expect(wrapper).toBeInTheDocument()
    expect(wrapper?.tagName).toBe("SPAN")
  })

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLTextAreaElement>()
    render(<Textarea ref={ref} aria-label="ref textarea" />)
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement)
  })

  it("supports className on wrapper", () => {
    const { container } = render(
      <Textarea className="custom" aria-label="custom" />
    )
    const wrapper = container.querySelector("[data-slot='control']")
    expect(wrapper).toHaveClass("custom")
  })

  it("is resizable by default", () => {
    render(<Textarea aria-label="resizable" />)
    const textarea = screen.getByRole("textbox")
    expect(textarea).toHaveClass("resize-y")
  })

  it("can be set to non-resizable", () => {
    render(<Textarea resizable={false} aria-label="non-resizable" />)
    const textarea = screen.getByRole("textbox")
    expect(textarea).toHaveClass("resize-none")
  })

  it("supports placeholder", () => {
    render(<Textarea placeholder="Enter text" aria-label="placeholder" />)
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument()
  })

  it("supports disabled state", () => {
    render(<Textarea disabled aria-label="disabled" />)
    const textarea = screen.getByRole("textbox")
    expect(textarea).toBeDisabled()
  })
})
