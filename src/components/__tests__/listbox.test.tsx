import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import {
  Listbox,
  ListboxDescription,
  ListboxLabel,
  ListboxOption,
} from "../listbox"

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
})

describe("Listbox", () => {
  it("renders a listbox button", () => {
    render(
      <Listbox aria-label="test listbox" value="a" onChange={() => {}}>
        <ListboxOption value="a">
          <ListboxLabel>Option A</ListboxLabel>
        </ListboxOption>
        <ListboxOption value="b">
          <ListboxLabel>Option B</ListboxLabel>
        </ListboxOption>
      </Listbox>
    )
    const button = screen.getByRole("button")
    expect(button).toBeInTheDocument()
  })

  it("renders with placeholder when no value", () => {
    render(
      <Listbox
        aria-label="placeholder test"
        value={null}
        onChange={() => {}}
        placeholder="Select an option"
      >
        <ListboxOption value="a">
          <ListboxLabel>Option A</ListboxLabel>
        </ListboxOption>
      </Listbox>
    )
    expect(screen.getByText("Select an option")).toBeInTheDocument()
  })

  it("renders with aria-label", () => {
    render(
      <Listbox aria-label="my listbox" value="a" onChange={() => {}}>
        <ListboxOption value="a">
          <ListboxLabel>A</ListboxLabel>
        </ListboxOption>
      </Listbox>
    )
    const button = screen.getByRole("button")
    expect(button).toHaveAttribute("aria-label", "my listbox")
  })
})

describe("ListboxLabel", () => {
  it("renders a span with truncate class", () => {
    render(<ListboxLabel data-testid="label">Label text</ListboxLabel>)
    const label = screen.getByTestId("label")
    expect(label).toBeInTheDocument()
    expect(label.tagName).toBe("SPAN")
    expect(label).toHaveClass("truncate")
  })

  it("supports custom className", () => {
    render(
      <ListboxLabel data-testid="label" className="custom">
        Label
      </ListboxLabel>
    )
    expect(screen.getByTestId("label")).toHaveClass("custom")
  })
})

describe("ListboxDescription", () => {
  it("renders description text", () => {
    render(
      <ListboxDescription data-testid="desc">Description</ListboxDescription>
    )
    const desc = screen.getByTestId("desc")
    expect(desc).toBeInTheDocument()
    expect(desc.tagName).toBe("SPAN")
  })

  it("renders children within truncate span", () => {
    render(<ListboxDescription>Desc text</ListboxDescription>)
    expect(screen.getByText("Desc text")).toBeInTheDocument()
  })

  it("supports custom className", () => {
    render(
      <ListboxDescription data-testid="desc" className="custom">
        Description
      </ListboxDescription>
    )
    expect(screen.getByTestId("desc")).toHaveClass("custom")
  })
})
