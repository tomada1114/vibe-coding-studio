import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
} from "../description-list"

describe("DescriptionList", () => {
  it("renders a dl element", () => {
    render(<DescriptionList data-testid="dl">Content</DescriptionList>)
    const dl = screen.getByTestId("dl")
    expect(dl).toBeInTheDocument()
    expect(dl.tagName).toBe("DL")
  })

  it("applies grid layout classes", () => {
    render(<DescriptionList data-testid="dl">Content</DescriptionList>)
    const dl = screen.getByTestId("dl")
    expect(dl).toHaveClass("grid", "grid-cols-1")
  })

  it("supports custom className", () => {
    render(
      <DescriptionList data-testid="dl" className="custom">
        Content
      </DescriptionList>
    )
    expect(screen.getByTestId("dl")).toHaveClass("custom", "grid")
  })
})

describe("DescriptionTerm", () => {
  it("renders a dt element", () => {
    render(<DescriptionTerm>Term</DescriptionTerm>)
    const dt = screen.getByText("Term")
    expect(dt).toBeInTheDocument()
    expect(dt.tagName).toBe("DT")
  })

  it("applies styling classes", () => {
    render(<DescriptionTerm>Term</DescriptionTerm>)
    expect(screen.getByText("Term")).toHaveClass("col-start-1", "text-zinc-500")
  })

  it("supports custom className", () => {
    render(<DescriptionTerm className="custom">Term</DescriptionTerm>)
    expect(screen.getByText("Term")).toHaveClass("custom")
  })
})

describe("DescriptionDetails", () => {
  it("renders a dd element", () => {
    render(<DescriptionDetails>Details</DescriptionDetails>)
    const dd = screen.getByText("Details")
    expect(dd).toBeInTheDocument()
    expect(dd.tagName).toBe("DD")
  })

  it("applies styling classes", () => {
    render(<DescriptionDetails>Details</DescriptionDetails>)
    expect(screen.getByText("Details")).toHaveClass("text-zinc-950")
  })

  it("supports custom className", () => {
    render(<DescriptionDetails className="custom">Details</DescriptionDetails>)
    expect(screen.getByText("Details")).toHaveClass("custom")
  })
})

describe("DescriptionList integration", () => {
  it("renders a complete description list", () => {
    render(
      <DescriptionList data-testid="dl">
        <DescriptionTerm>Name</DescriptionTerm>
        <DescriptionDetails>John</DescriptionDetails>
        <DescriptionTerm>Email</DescriptionTerm>
        <DescriptionDetails>john@example.com</DescriptionDetails>
      </DescriptionList>
    )
    expect(screen.getByTestId("dl")).toBeInTheDocument()
    expect(screen.getByText("Name")).toBeInTheDocument()
    expect(screen.getByText("John")).toBeInTheDocument()
    expect(screen.getByText("Email")).toBeInTheDocument()
    expect(screen.getByText("john@example.com")).toBeInTheDocument()
  })
})
