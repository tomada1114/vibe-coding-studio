import "@testing-library/jest-dom"

// Mock next/image globally to render a plain img element.
// next/image-specific props (fill, sizes, priority, etc.) are excluded
// because they are not valid HTML img attributes and cause React DOM warnings.
jest.mock("next/image", () => ({
  __esModule: true,
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
  }) => {
    void fill
    void sizes
    void priority
    void quality
    void placeholder
    void blurDataURL
    void unoptimized

    return <img src={src} alt={alt ?? ""} {...rest} />
  },
}))

// Mock environment variables for testing
process.env.NODE_ENV = "test"
