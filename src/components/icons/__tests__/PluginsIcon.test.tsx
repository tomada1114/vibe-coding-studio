import "@testing-library/jest-dom"
import { render } from "@testing-library/react"
import { PluginsIcon } from "../PluginsIcon"

describe("PluginsIcon", () => {
  it("renders SVG elements with gradient", () => {
    const { container } = render(
      <svg>
        <PluginsIcon id="test" />
      </svg>
    )
    expect(container.querySelector("radialGradient")).toBeInTheDocument()
    expect(container.querySelectorAll("rect").length).toBeGreaterThanOrEqual(1)
  })

  it("uses id for gradient reference", () => {
    const { container } = render(
      <svg>
        <PluginsIcon id="plugin-1" />
      </svg>
    )
    const gradient = container.querySelector("radialGradient")
    expect(gradient).toHaveAttribute("id", "plugin-1-gradient")
  })

  it("applies blue color scheme by default", () => {
    const { container } = render(
      <svg>
        <PluginsIcon id="test" />
      </svg>
    )
    const stops = container.querySelectorAll("stop")
    expect(stops[0]).toHaveAttribute("stop-color", "#0EA5E9")
    expect(stops[1]).toHaveAttribute("stop-color", "#818CF8")
  })
})
