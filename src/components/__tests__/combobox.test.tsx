import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import {
  Combobox,
  ComboboxDescription,
  ComboboxLabel,
  ComboboxOption,
} from "../combobox"

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
})

const options = ["Apple", "Banana", "Cherry"]

describe("Combobox", () => {
  it("renders a combobox input", () => {
    render(
      <Combobox
        aria-label="fruits"
        options={options}
        displayValue={(v: string | null) => v ?? ""}
        value={null}
        onChange={() => {}}
      >
        {(option: string) => (
          <ComboboxOption value={option}>
            <ComboboxLabel>{option}</ComboboxLabel>
          </ComboboxOption>
        )}
      </Combobox>
    )
    const input = screen.getByRole("combobox")
    expect(input).toBeInTheDocument()
  })

  it("renders with placeholder", () => {
    render(
      <Combobox
        aria-label="fruits"
        options={options}
        displayValue={(v: string | null) => v ?? ""}
        value={null}
        onChange={() => {}}
        placeholder="Search fruit"
      >
        {(option: string) => (
          <ComboboxOption value={option}>
            <ComboboxLabel>{option}</ComboboxLabel>
          </ComboboxOption>
        )}
      </Combobox>
    )
    expect(screen.getByPlaceholderText("Search fruit")).toBeInTheDocument()
  })

  it("renders with aria-label", () => {
    render(
      <Combobox
        aria-label="my combobox"
        options={options}
        displayValue={(v: string | null) => v ?? ""}
        value={null}
        onChange={() => {}}
      >
        {(option: string) => (
          <ComboboxOption value={option}>
            <ComboboxLabel>{option}</ComboboxLabel>
          </ComboboxOption>
        )}
      </Combobox>
    )
    const input = screen.getByRole("combobox")
    expect(input).toHaveAttribute("aria-label", "my combobox")
  })

  it("renders expand button", () => {
    const { container } = render(
      <Combobox
        aria-label="fruits"
        options={options}
        displayValue={(v: string | null) => v ?? ""}
        value={null}
        onChange={() => {}}
      >
        {(option: string) => (
          <ComboboxOption value={option}>
            <ComboboxLabel>{option}</ComboboxLabel>
          </ComboboxOption>
        )}
      </Combobox>
    )
    const svg = container.querySelector("svg")
    expect(svg).toBeInTheDocument()
  })
})

describe("ComboboxLabel", () => {
  it("renders a span with truncate class", () => {
    render(<ComboboxLabel data-testid="label">Label text</ComboboxLabel>)
    const label = screen.getByTestId("label")
    expect(label).toBeInTheDocument()
    expect(label.tagName).toBe("SPAN")
    expect(label).toHaveClass("truncate")
  })

  it("supports custom className", () => {
    render(
      <ComboboxLabel data-testid="label" className="custom">
        Label
      </ComboboxLabel>
    )
    expect(screen.getByTestId("label")).toHaveClass("custom")
  })
})

describe("ComboboxDescription", () => {
  it("renders description text", () => {
    render(
      <ComboboxDescription data-testid="desc">Description</ComboboxDescription>
    )
    const desc = screen.getByTestId("desc")
    expect(desc).toBeInTheDocument()
    expect(desc.tagName).toBe("SPAN")
  })

  it("renders children within truncate span", () => {
    render(<ComboboxDescription>Desc text</ComboboxDescription>)
    expect(screen.getByText("Desc text")).toBeInTheDocument()
  })

  it("supports custom className", () => {
    render(
      <ComboboxDescription data-testid="desc" className="custom">
        Description
      </ComboboxDescription>
    )
    expect(screen.getByTestId("desc")).toHaveClass("custom")
  })
})
