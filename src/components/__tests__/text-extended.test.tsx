import {
  Code,
  Heading,
  Lead,
  Strong,
  Subheading,
  Text,
  TextLink,
} from "@/components/text"
import { render, screen } from "@testing-library/react"

describe("Heading", () => {
  it("renders as h2 by default", () => {
    render(<Heading>Test Heading</Heading>)

    const heading = screen.getByText("Test Heading")
    expect(heading.tagName).toBe("H2")
  })

  it("renders as custom element", () => {
    render(<Heading as="h1">H1 Heading</Heading>)

    const heading = screen.getByText("H1 Heading")
    expect(heading.tagName).toBe("H1")
  })

  it("applies dark mode data attribute", () => {
    render(<Heading dark>Dark Heading</Heading>)

    const heading = screen.getByText("Dark Heading")
    expect(heading).toHaveAttribute("data-dark", "true")
  })

  it("does not set data-dark when dark is false", () => {
    render(<Heading>Light Heading</Heading>)

    const heading = screen.getByText("Light Heading")
    expect(heading).not.toHaveAttribute("data-dark")
  })

  it("merges custom className", () => {
    render(<Heading className="mt-4">Styled</Heading>)

    const heading = screen.getByText("Styled")
    expect(heading).toHaveClass("mt-4")
    expect(heading).toHaveClass("text-4xl")
  })
})

describe("Subheading", () => {
  it("renders as h2 by default", () => {
    render(<Subheading>Sub</Subheading>)

    const sub = screen.getByText("Sub")
    expect(sub.tagName).toBe("H2")
  })

  it("renders as custom element", () => {
    render(<Subheading as="h3">H3 Sub</Subheading>)

    const sub = screen.getByText("H3 Sub")
    expect(sub.tagName).toBe("H3")
  })

  it("スペクトラム短線マーカーを前置する", () => {
    render(<Subheading>Marked Sub</Subheading>)

    const sub = screen.getByText("Marked Sub")
    const marker = sub.querySelector("span[aria-hidden='true']")
    expect(marker).toBeInTheDocument()
    expect(marker?.className).toContain("bg-(image:--gradient-spectrum)")
  })

  it("data-dark 属性を付与しない（ダークモード非対応）", () => {
    render(<Subheading>Light Sub</Subheading>)

    const sub = screen.getByText("Light Sub")
    expect(sub).not.toHaveAttribute("data-dark")
  })

  it("applies mono font styling", () => {
    render(<Subheading>Mono Sub</Subheading>)

    const sub = screen.getByText("Mono Sub")
    expect(sub).toHaveClass("font-mono")
    expect(sub).toHaveClass("uppercase")
  })
})

describe("Lead", () => {
  it("renders as p element", () => {
    render(<Lead>Lead text</Lead>)

    const lead = screen.getByText("Lead text")
    expect(lead.tagName).toBe("P")
    expect(lead).toHaveClass("text-2xl")
  })

  it("merges custom className", () => {
    render(<Lead className="mt-8">Custom lead</Lead>)

    const lead = screen.getByText("Custom lead")
    expect(lead).toHaveClass("mt-8")
  })
})

describe("Text", () => {
  it("renders as p element with data-slot", () => {
    render(<Text>Text content</Text>)

    const text = screen.getByText("Text content")
    expect(text.tagName).toBe("P")
    expect(text).toHaveAttribute("data-slot", "text")
  })

  it("applies base text styles", () => {
    render(<Text>Styled text</Text>)

    const text = screen.getByText("Styled text")
    expect(text).toHaveClass("text-base/6")
  })
})

describe("TextLink", () => {
  it("renders as a link", () => {
    render(<TextLink href="/test">Link text</TextLink>)

    const link = screen.getByRole("link")
    expect(link).toHaveAttribute("href", "/test")
    expect(link).toHaveTextContent("Link text")
  })

  it("applies underline decoration", () => {
    render(<TextLink href="/test">Decorated link</TextLink>)

    const link = screen.getByRole("link")
    expect(link).toHaveClass("underline")
  })
})

describe("Strong", () => {
  it("renders as strong element", () => {
    render(<Strong>Bold text</Strong>)

    const strong = screen.getByText("Bold text")
    expect(strong.tagName).toBe("STRONG")
    expect(strong).toHaveClass("font-medium")
  })
})

describe("Code", () => {
  it("renders as code element", () => {
    render(<Code>const x = 1</Code>)

    const code = screen.getByText("const x = 1")
    expect(code.tagName).toBe("CODE")
    expect(code).toHaveClass("rounded-sm")
  })

  it("merges custom className", () => {
    render(<Code className="my-code">snippet</Code>)

    const code = screen.getByText("snippet")
    expect(code).toHaveClass("my-code")
  })
})
