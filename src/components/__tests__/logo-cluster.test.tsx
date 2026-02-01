// Extend framer-motion mock with motion.img
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
    img: (props: Record<string, unknown>) => (
      <img alt="" {...filterMotionProps(props)} />
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
}))

import { LogoCluster } from "@/components/logo-cluster"
import { render } from "@testing-library/react"

// Mock logo component
jest.mock("@/components/logo", () => ({
  Mark: (props: Record<string, unknown>) => (
    <svg data-testid="mark" {...props} />
  ),
}))

describe("LogoCluster", () => {
  it("renders with aria-hidden", () => {
    const { container } = render(<LogoCluster />)

    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).toHaveAttribute("aria-hidden", "true")
  })

  it("renders main logo", () => {
    const { container } = render(<LogoCluster />)

    const marks = container.querySelectorAll("[data-testid='mark']")
    expect(marks.length).toBeGreaterThanOrEqual(1)
  })

  it("renders partner logos", () => {
    const { container } = render(<LogoCluster />)

    const images = container.querySelectorAll("img")
    expect(images.length).toBeGreaterThanOrEqual(6)
  })
})
