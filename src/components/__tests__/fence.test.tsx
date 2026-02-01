import { Fence } from "@/components/Fence"
import { render, screen } from "@testing-library/react"

// Mock prism-react-renderer
jest.mock("prism-react-renderer", () => ({
  Highlight: ({
    code,
    language,
    children,
  }: {
    code: string
    language: string
    theme: unknown
    children: (params: {
      className: string
      style: React.CSSProperties
      tokens: { content: string; types: string[] }[][]
      getLineProps: (opts: { line: unknown; key: number }) => { key: number }
      getTokenProps: (opts: { token: unknown; key: number }) => {
        key: number
        children: string
      }
    }) => React.ReactNode
  }) =>
    children({
      className: `prism-code language-${language}`,
      style: { backgroundColor: "#1e1e1e" },
      tokens: [[{ content: code, types: ["plain"] }]],
      getLineProps: ({ key }: { line: unknown; key: number }) => ({ key }),
      getTokenProps: ({
        token,
        key,
      }: {
        token: { content: string }
        key: number
      }) => ({
        key,
        children: token.content,
      }),
    }),
  Prism: {},
  themes: { vsDark: {} },
}))

// Suppress dynamic require warnings
jest.mock("prismjs/components/prism-python", () => ({}))
jest.mock("prismjs/components/prism-bash", () => ({}))
jest.mock("prismjs/components/prism-typescript", () => ({}))
jest.mock("prismjs/components/prism-jsx", () => ({}))
jest.mock("prismjs/components/prism-tsx", () => ({}))
jest.mock("prismjs/components/prism-css", () => ({}))
jest.mock("prismjs/components/prism-scss", () => ({}))
jest.mock("prismjs/components/prism-json", () => ({}))
jest.mock("prismjs/components/prism-markdown", () => ({}))
jest.mock("prismjs/components/prism-yaml", () => ({}))
jest.mock("prismjs/components/prism-go", () => ({}))
jest.mock("prismjs/components/prism-rust", () => ({}))
jest.mock("prismjs/components/prism-ruby", () => ({}))
jest.mock("prismjs/components/prism-java", () => ({}))
jest.mock("prismjs/components/prism-c", () => ({}))
jest.mock("prismjs/components/prism-csharp", () => ({}))
jest.mock("prismjs/components/prism-dart", () => ({}))
jest.mock("prismjs/components/prism-sql", () => ({}))

describe("Fence", () => {
  it("renders code block with language", () => {
    render(<Fence language="javascript">const x = 1</Fence>)

    const pre = screen.getByText("const x = 1").closest("pre")
    expect(pre).toBeInTheDocument()
  })

  it("renders with plaintext when no language specified", () => {
    render(<Fence language="">hello world</Fence>)

    expect(screen.getByText("hello world")).toBeInTheDocument()
  })

  it("trims trailing whitespace from code", () => {
    render(<Fence language="typescript">const y = 2 </Fence>)

    expect(screen.getByText("const y = 2")).toBeInTheDocument()
  })

  it("renders pre element with styling", () => {
    const { container } = render(
      <Fence language="python">{"print('hello')"}</Fence>
    )

    const pre = container.querySelector("pre")
    expect(pre).toBeInTheDocument()
    expect(pre).toHaveClass("overflow-x-auto")
  })
})
