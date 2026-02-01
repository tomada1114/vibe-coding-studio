import { LogoCloud } from "@/components/logo-cloud"
import { render, screen } from "@testing-library/react"

describe("LogoCloud", () => {
  it("renders all logo images", () => {
    render(<LogoCloud />)

    const images = screen.getAllByRole("img")
    expect(images).toHaveLength(5)
  })

  it("renders logos with correct alt text", () => {
    render(<LogoCloud />)

    expect(screen.getByAltText("SavvyCal")).toBeInTheDocument()
    expect(screen.getByAltText("Laravel")).toBeInTheDocument()
    expect(screen.getByAltText("Tuple")).toBeInTheDocument()
    expect(screen.getByAltText("Transistor")).toBeInTheDocument()
    expect(screen.getByAltText("Statamic")).toBeInTheDocument()
  })

  it("applies custom className", () => {
    const { container } = render(<LogoCloud className="mt-8" />)

    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).toHaveClass("mt-8")
    expect(wrapper).toHaveClass("flex")
  })
})
