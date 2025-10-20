import "@testing-library/jest-dom"

// Mock environment variables for testing
process.env.NODE_ENV = "test"

// Mock framer-motion globally
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }) => {
      const { initial, animate, transition, exit, ...rest } = props
      return <div {...rest}>{children}</div>
    },
    span: ({ children, ...props }) => {
      const { initial, animate, transition, exit, ...rest } = props
      return <span {...rest}>{children}</span>
    },
  },
  AnimatePresence: ({ children }) => children,
  useMotionValue: initialValue => ({
    get: () => initialValue,
    set: jest.fn(),
  }),
  useSpring: value => value,
  useTransform: (value, transformer) => ({
    get: () => transformer(value.get ? value.get() : value),
  }),
  useInView: () => true,
}))
