import "@testing-library/jest-dom"
import { render } from "@testing-library/react"
import { LightbulbIcon } from "../LightbulbIcon"

describe("LightbulbIcon", () => {
  it("renders SVG elements", () => {
    const { container } = render(
      <svg>
        <LightbulbIcon id="test" />
      </svg>
    )
    expect(container.querySelector("radialGradient")).toBeInTheDocument()
    expect(container.querySelector("g")).toBeInTheDocument()
  })

  it("uses id for gradient reference", () => {
    const { container } = render(
      <svg>
        <LightbulbIcon id="bulb-1" />
      </svg>
    )
    const gradient = container.querySelector("radialGradient")
    expect(gradient).toHaveAttribute("id", "bulb-1-gradient")
  })

  it("applies blue color scheme by default", () => {
    const { container } = render(
      <svg>
        <LightbulbIcon id="test" />
      </svg>
    )
    const stops = container.querySelectorAll("stop")
    expect(stops[0]).toHaveAttribute("stop-color", "#0EA5E9")
    expect(stops[1]).toHaveAttribute("stop-color", "#818CF8")
  })

  it("applies alternate color scheme for non-blue", () => {
    const { container } = render(
      <svg>
        <LightbulbIcon id="test" color="amber" />
      </svg>
    )
    const stops = container.querySelectorAll("stop")
    expect(stops[0]).toHaveAttribute("stop-color", "#FDE68A")
    expect(stops[1]).toHaveAttribute("stop-color", "#F59E0B")
  })
})
