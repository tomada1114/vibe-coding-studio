// Extend framer-motion mock with motion.circle
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
    circle: (props: Record<string, unknown>) => (
      <circle {...filterMotionProps(props)} />
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
}))

import { LinkedAvatars } from "@/components/linked-avatars"
import { render } from "@testing-library/react"

// Mock @heroicons/react
jest.mock("@heroicons/react/16/solid", () => ({
  CheckIcon: (props: React.SVGProps<SVGSVGElement>) => (
    <svg data-testid="check-icon" {...props} />
  ),
}))

describe("LinkedAvatars", () => {
  it("renders with aria-hidden", () => {
    const { container } = render(<LinkedAvatars />)

    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).toHaveAttribute("aria-hidden", "true")
  })

  it("renders avatar images", () => {
    const { container } = render(<LinkedAvatars />)

    const images = container.querySelectorAll("img")
    expect(images).toHaveLength(2)
    expect(images[0]).toHaveAttribute("src", "/linked-avatars/customer.jpg")
    expect(images[1]).toHaveAttribute("src", "/linked-avatars/manager.jpg")
  })

  it("renders rings animation (SVG circles)", () => {
    const { container } = render(<LinkedAvatars />)

    const svg = container.querySelector("svg")
    expect(svg).toBeInTheDocument()
  })
})
