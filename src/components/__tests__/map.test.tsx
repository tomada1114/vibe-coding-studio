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
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
}))

import { Map } from "@/components/map"
import { render } from "@testing-library/react"

describe("Map", () => {
  it("renders with aria-hidden", () => {
    const { container } = render(<Map />)

    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).toHaveAttribute("aria-hidden", "true")
  })

  it("renders marker images", () => {
    const { container } = render(<Map />)

    const images = container.querySelectorAll("img")
    expect(images).toHaveLength(5)
  })

  it("renders marker SVGs", () => {
    const { container } = render(<Map />)

    const svgs = container.querySelectorAll("svg")
    expect(svgs.length).toBeGreaterThanOrEqual(5)
  })
})
