import "@testing-library/jest-dom"

// Mock next/image globally to render a plain img element.
// next/image-specific props (fill, sizes, priority, etc.) are excluded
// because they are not valid HTML img attributes and cause React DOM warnings.
jest.mock("next/image", () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  default: ({
    src,
    alt,
    fill,
    sizes,
    priority,
    quality,
    placeholder,
    blurDataURL,
    unoptimized,
    ...rest
  }) => <img src={src} alt={alt ?? ""} {...rest} />,
}))

// Mock environment variables for testing
process.env.NODE_ENV = "test"

// Mock framer-motion globally
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }) => {
      const { initial, animate, transition, exit, style, ...rest } = props
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
  useSpring: value => ({
    get: () => (typeof value === "object" && value.get ? value.get() : value),
    set: jest.fn(),
  }),
  useTransform: (value, transformer) => ({
    get: () => transformer(value.get ? value.get() : value),
  }),
  useInView: () => true,
  useReducedMotion: () => false,
  useScroll: () => ({
    scrollX: {
      get: () => 0,
      set: jest.fn(),
    },
    scrollY: {
      get: () => 0,
      set: jest.fn(),
    },
  }),
  useMotionValueEvent: jest.fn(),
}))

// Mock react-use-measure
jest.mock("react-use-measure", () => {
  return {
    __esModule: true,
    default: () => [
      ref => {
        // Mock setReferenceWindowRef
      },
      {
        width: 1024,
        height: 768,
        top: 0,
        left: 0,
        bottom: 768,
        right: 1024,
        x: 0,
        y: 0,
      },
    ],
  }
})
