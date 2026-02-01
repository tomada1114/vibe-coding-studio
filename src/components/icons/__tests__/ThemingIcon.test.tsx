import "@testing-library/jest-dom"
import { render } from "@testing-library/react"
import { ThemingIcon } from "../ThemingIcon"

describe("ThemingIcon", () => {
  it("renders SVG elements", () => {
    const { container } = render(
      <svg>
        <ThemingIcon id="test" />
      </svg>
    )
    expect(container.querySelector("radialGradient")).toBeInTheDocument()
    expect(container.querySelector("g")).toBeInTheDocument()
  })

  it("uses id for gradient reference", () => {
    const { container } = render(
      <svg>
        <ThemingIcon id="theme-1" />
      </svg>
    )
    const gradient = container.querySelector("radialGradient")
    expect(gradient).toHaveAttribute("id", "theme-1-gradient")
  })

  it("applies blue color scheme by default", () => {
    const { container } = render(
      <svg>
        <ThemingIcon id="test" />
      </svg>
    )
    const stops = container.querySelectorAll("stop")
    expect(stops[0]).toHaveAttribute("stop-color", "#0EA5E9")
    expect(stops[1]).toHaveAttribute("stop-color", "#818CF8")
  })
})
