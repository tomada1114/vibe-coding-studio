import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import {
  Dropdown,
  DropdownButton,
  DropdownHeader,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
  DropdownShortcut,
} from "../dropdown"

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
})

describe("Dropdown", () => {
  it("renders dropdown container", () => {
    render(
      <Dropdown>
        <DropdownButton data-testid="btn">Open</DropdownButton>
        <DropdownMenu>
          <DropdownItem>Item 1</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    )
    expect(screen.getByTestId("btn")).toBeInTheDocument()
  })
})

describe("DropdownButton", () => {
  it("renders a button element", () => {
    render(
      <Dropdown>
        <DropdownButton>Toggle</DropdownButton>
        <DropdownMenu>
          <DropdownItem>Item</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    )
    const button = screen.getByRole("button")
    expect(button).toBeInTheDocument()
  })
})

describe("DropdownHeader", () => {
  it("renders a div with styling", () => {
    render(<DropdownHeader data-testid="header">Header</DropdownHeader>)
    const header = screen.getByTestId("header")
    expect(header).toBeInTheDocument()
    expect(header.tagName).toBe("DIV")
    expect(header).toHaveClass("col-span-5")
  })

  it("supports custom className", () => {
    render(
      <DropdownHeader data-testid="header" className="custom">
        Header
      </DropdownHeader>
    )
    expect(screen.getByTestId("header")).toHaveClass("custom")
  })
})

describe("DropdownLabel", () => {
  it("renders a div with label data-slot", () => {
    render(<DropdownLabel data-testid="label">Label</DropdownLabel>)
    const label = screen.getByTestId("label")
    expect(label).toBeInTheDocument()
    expect(label).toHaveAttribute("data-slot", "label")
  })

  it("applies column positioning classes", () => {
    render(<DropdownLabel data-testid="label">Label</DropdownLabel>)
    expect(screen.getByTestId("label")).toHaveClass(
      "col-start-2",
      "row-start-1"
    )
  })

  it("supports custom className", () => {
    render(
      <DropdownLabel data-testid="label" className="custom">
        Label
      </DropdownLabel>
    )
    expect(screen.getByTestId("label")).toHaveClass("custom")
  })
})

describe("DropdownShortcut", () => {
  it("renders keyboard shortcut from string", async () => {
    render(
      <Dropdown>
        <DropdownButton>Open</DropdownButton>
        <DropdownMenu static>
          <DropdownItem>
            <DropdownShortcut keys="⌘K" data-testid="shortcut" />
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    )
    expect(screen.getByText("⌘")).toBeInTheDocument()
    expect(screen.getByText("K")).toBeInTheDocument()
  })

  it("renders keyboard shortcut from array", async () => {
    render(
      <Dropdown>
        <DropdownButton>Open</DropdownButton>
        <DropdownMenu static>
          <DropdownItem>
            <DropdownShortcut keys={["Ctrl", "S"]} data-testid="shortcut" />
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    )
    expect(screen.getByText("Ctrl")).toBeInTheDocument()
    expect(screen.getByText("S")).toBeInTheDocument()
  })
})
