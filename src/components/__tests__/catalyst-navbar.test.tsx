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
  CatalystNavbar,
  CatalystNavbarDivider,
  CatalystNavbarItem,
  CatalystNavbarLabel,
  CatalystNavbarSection,
  CatalystNavbarSpacer,
} from "@/components/catalyst-navbar"
import { render, screen } from "@testing-library/react"

// Mock TouchTarget
jest.mock("@/components/catalyst-button", () => ({
  TouchTarget: ({ children }: { children: React.ReactNode }) => (
    <span data-testid="touch-target">{children}</span>
  ),
}))

describe("CatalystNavbar", () => {
  it("renders as nav element", () => {
    const { container } = render(
      <CatalystNavbar>
        <div>Nav content</div>
      </CatalystNavbar>
    )

    const nav = container.querySelector("nav")
    expect(nav).toBeInTheDocument()
    expect(nav).toHaveClass("flex")
  })

  it("applies custom className", () => {
    const { container } = render(
      <CatalystNavbar className="my-nav">Content</CatalystNavbar>
    )

    const nav = container.querySelector("nav")
    expect(nav).toHaveClass("my-nav")
  })
})

describe("CatalystNavbarDivider", () => {
  it("renders with aria-hidden", () => {
    const { container } = render(<CatalystNavbarDivider />)

    const divider = container.firstChild as HTMLElement
    expect(divider).toHaveAttribute("aria-hidden", "true")
    expect(divider).toHaveClass("h-6")
    expect(divider).toHaveClass("w-px")
  })
})

describe("CatalystNavbarSection", () => {
  it("renders with flex items", () => {
    const { container } = render(
      <CatalystNavbarSection>Section</CatalystNavbarSection>
    )

    const section = container.querySelector(".flex")
    expect(section).toBeInTheDocument()
  })
})

describe("CatalystNavbarSpacer", () => {
  it("renders with aria-hidden", () => {
    const { container } = render(<CatalystNavbarSpacer />)

    const spacer = container.firstChild as HTMLElement
    expect(spacer).toHaveAttribute("aria-hidden", "true")
    expect(spacer).toHaveClass("flex-1")
  })
})

describe("CatalystNavbarItem", () => {
  it("renders as button when no href", () => {
    render(<CatalystNavbarItem>Menu</CatalystNavbarItem>)

    const button = screen.getByRole("button")
    expect(button).toBeInTheDocument()
  })

  it("renders as link when href is provided", () => {
    render(<CatalystNavbarItem href="/home">Home</CatalystNavbarItem>)

    const link = screen.getByRole("link")
    expect(link).toHaveAttribute("href", "/home")
  })

  it("shows current indicator when current is true", () => {
    const { container } = render(
      <CatalystNavbarItem current>Active</CatalystNavbarItem>
    )

    const indicator = container.querySelector("[data-current]")
    expect(indicator).toBeInTheDocument()
  })
})

describe("CatalystNavbarLabel", () => {
  it("renders as truncated span", () => {
    render(<CatalystNavbarLabel>Label text</CatalystNavbarLabel>)

    const label = screen.getByText("Label text")
    expect(label.tagName).toBe("SPAN")
    expect(label).toHaveClass("truncate")
  })
})
