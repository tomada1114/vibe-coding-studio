import "@testing-library/jest-dom"
import { render } from "@testing-library/react"
import { WarningIcon } from "../WarningIcon"

describe("WarningIcon", () => {
  it("renders SVG elements", () => {
    const { container } = render(
      <svg>
        <WarningIcon id="test" />
      </svg>
    )
    expect(container.querySelector("radialGradient")).toBeInTheDocument()
    expect(container.querySelector("g")).toBeInTheDocument()
  })

  it("uses id for gradient reference", () => {
    const { container } = render(
      <svg>
        <WarningIcon id="warn-1" />
      </svg>
    )
    const gradient = container.querySelector("radialGradient")
    expect(gradient).toHaveAttribute("id", "warn-1-gradient")
  })

  it("defaults to amber color scheme", () => {
    const { container } = render(
      <svg>
        <WarningIcon id="test" />
      </svg>
    )
    const stops = container.querySelectorAll("stop")
    expect(stops[0]).toHaveAttribute("stop-color", "#FDE68A")
    expect(stops[1]).toHaveAttribute("stop-color", "#F59E0B")
  })

  it("applies alternate color scheme for non-amber", () => {
    const { container } = render(
      <svg>
        <WarningIcon id="test" color="blue" />
      </svg>
    )
    const stops = container.querySelectorAll("stop")
    expect(stops[0]).toHaveAttribute("stop-color", "#0EA5E9")
    expect(stops[1]).toHaveAttribute("stop-color", "#818CF8")
  })
})
