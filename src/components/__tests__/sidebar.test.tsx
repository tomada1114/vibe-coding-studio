// Extend framer-motion mock with LayoutGroup
const motionPropsToOmit = new Set([
  "initial",
  "animate",
  "transition",
  "exit",
  "style",
  "variants",
  "layoutId",
  "whileHover",
  "whileTap",
  "whileInView",
])
const filterMotionProps = (props: Record<string, unknown>) =>
  Object.fromEntries(
    Object.entries(props).filter(([k]) => !motionPropsToOmit.has(k))
  )

jest.mock("framer-motion", () => ({
  ...jest.requireActual("framer-motion"),
  motion: {
    div: ({
      children,
      ...props
    }: React.PropsWithChildren<Record<string, unknown>>) => (
      <div {...filterMotionProps(props)}>{children}</div>
    ),
    span: ({
      children,
      ...props
    }: React.PropsWithChildren<Record<string, unknown>>) => (
      <span {...filterMotionProps(props)}>{children}</span>
    ),
  },
  LayoutGroup: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
}))

import {
  Sidebar,
  SidebarBody,
  SidebarDivider,
  SidebarFooter,
  SidebarHeader,
  SidebarHeading,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
  SidebarSpacer,
} from "@/components/sidebar"
import { render, screen } from "@testing-library/react"

// Mock TouchTarget
jest.mock("@/components/catalyst-button", () => ({
  TouchTarget: ({ children }: { children: React.ReactNode }) => (
    <span data-testid="touch-target">{children}</span>
  ),
}))

describe("Sidebar", () => {
  it("renders as nav element", () => {
    const { container } = render(
      <Sidebar>
        <div>Content</div>
      </Sidebar>
    )

    const nav = container.querySelector("nav")
    expect(nav).toBeInTheDocument()
    expect(nav).toHaveClass("flex")
  })

  it("applies custom className", () => {
    const { container } = render(
      <Sidebar className="w-64">
        <div>Content</div>
      </Sidebar>
    )

    const nav = container.querySelector("nav")
    expect(nav).toHaveClass("w-64")
  })
})

describe("SidebarHeader", () => {
  it("renders with border bottom", () => {
    const { container } = render(<SidebarHeader>Header</SidebarHeader>)

    const header = container.firstChild as HTMLElement
    expect(header).toHaveClass("border-b")
    expect(header).toHaveTextContent("Header")
  })
})

describe("SidebarBody", () => {
  it("renders with overflow-y-auto", () => {
    const { container } = render(<SidebarBody>Body content</SidebarBody>)

    const body = container.firstChild as HTMLElement
    expect(body).toHaveClass("overflow-y-auto")
    expect(body).toHaveClass("flex-1")
  })
})

describe("SidebarFooter", () => {
  it("renders with border top", () => {
    const { container } = render(<SidebarFooter>Footer</SidebarFooter>)

    const footer = container.firstChild as HTMLElement
    expect(footer).toHaveClass("border-t")
  })
})

describe("SidebarSection", () => {
  it("renders with data-slot", () => {
    const { container } = render(<SidebarSection>Section</SidebarSection>)

    const section = container.firstChild as HTMLElement
    expect(section).toHaveAttribute("data-slot", "section")
    expect(section).toHaveClass("flex")
  })
})

describe("SidebarDivider", () => {
  it("renders as hr element", () => {
    const { container } = render(<SidebarDivider />)

    const hr = container.querySelector("hr")
    expect(hr).toBeInTheDocument()
    expect(hr).toHaveClass("border-t")
  })
})

describe("SidebarSpacer", () => {
  it("renders with aria-hidden", () => {
    const { container } = render(<SidebarSpacer />)

    const spacer = container.firstChild as HTMLElement
    expect(spacer).toHaveAttribute("aria-hidden", "true")
    expect(spacer).toHaveClass("flex-1")
  })
})

describe("SidebarHeading", () => {
  it("renders as h3 element", () => {
    render(<SidebarHeading>Menu</SidebarHeading>)

    const heading = screen.getByText("Menu")
    expect(heading.tagName).toBe("H3")
    expect(heading).toHaveClass("text-xs/6")
  })
})

describe("SidebarItem", () => {
  it("renders as button when no href", () => {
    render(<SidebarItem>Item</SidebarItem>)

    const button = screen.getByRole("button")
    expect(button).toBeInTheDocument()
  })

  it("renders as link when href is provided", () => {
    render(<SidebarItem href="/dashboard">Dashboard</SidebarItem>)

    const link = screen.getByRole("link")
    expect(link).toHaveAttribute("href", "/dashboard")
  })

  it("shows current indicator when current is true", () => {
    const { container } = render(<SidebarItem current>Active Item</SidebarItem>)

    const indicator = container.querySelector("[data-current]")
    expect(indicator).toBeInTheDocument()
  })
})

describe("SidebarLabel", () => {
  it("renders as truncated span", () => {
    render(<SidebarLabel>Long label text</SidebarLabel>)

    const label = screen.getByText("Long label text")
    expect(label.tagName).toBe("SPAN")
    expect(label).toHaveClass("truncate")
  })
})
