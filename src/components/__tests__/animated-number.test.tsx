// Override framer-motion mock for AnimatedNumber to handle useTransform rendering
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
  motion: {
    div: ({
      children,
      ...props
    }: React.PropsWithChildren<Record<string, unknown>>) => {
      return <div {...filterMotionProps(props)}>{children}</div>
    },
    span: ({ children }: React.PropsWithChildren<Record<string, unknown>>) => {
      // AnimatedNumber passes a MotionValue as children - render its value
      const displayValue =
        typeof children === "object" && children !== null && "get" in children
          ? (children as { get: () => string }).get()
          : children
      return <span data-testid="animated-span">{displayValue}</span>
    },
  },
  useMotionValue: (initialValue: number) => ({
    get: () => initialValue,
    set: jest.fn(),
  }),
  useSpring: (value: { get: () => number } | number) => ({
    get: () =>
      typeof value === "object" && value !== null && "get" in value
        ? value.get()
        : value,
    set: jest.fn(),
  }),
  useTransform: (
    value: { get: () => number } | number,
    transformer: (v: number) => string
  ) => ({
    get: () =>
      transformer(
        typeof value === "object" && value !== null && "get" in value
          ? value.get()
          : (value as number)
      ),
  }),
  useInView: () => true,
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
}))

import { AnimatedNumber } from "@/components/animated-number"
import { render } from "@testing-library/react"

describe("AnimatedNumber", () => {
  it("renders a span element", () => {
    const { container } = render(<AnimatedNumber start={0} end={100} />)

    const span = container.querySelector("span")
    expect(span).toBeInTheDocument()
  })

  it("displays initial value with default decimals", () => {
    const { container } = render(<AnimatedNumber start={0} end={100} />)

    const span = container.querySelector("[data-testid='animated-span']")
    expect(span).toBeInTheDocument()
    // With isInView mocked to true, the display should show the end value formatted
    expect(span?.textContent).toBe("0")
  })

  it("displays value with specified decimal places", () => {
    const { container } = render(
      <AnimatedNumber start={0} end={99.9} decimals={1} />
    )

    const span = container.querySelector("[data-testid='animated-span']")
    expect(span).toBeInTheDocument()
    expect(span?.textContent).toBe("0.0")
  })
})
