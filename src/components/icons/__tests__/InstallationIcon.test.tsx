import "@testing-library/jest-dom"
import { render } from "@testing-library/react"
import { InstallationIcon } from "../InstallationIcon"

describe("InstallationIcon", () => {
  it("renders SVG elements", () => {
    const { container } = render(
      <svg>
        <InstallationIcon id="test" />
      </svg>
    )
    expect(container.querySelector("radialGradient")).toBeInTheDocument()
    expect(container.querySelector("circle")).toBeInTheDocument()
    expect(container.querySelectorAll("path").length).toBeGreaterThanOrEqual(1)
  })

  it("uses id for gradient reference", () => {
    const { container } = render(
      <svg>
        <InstallationIcon id="install-1" />
      </svg>
    )
    const gradient = container.querySelector("radialGradient")
    expect(gradient).toHaveAttribute("id", "install-1-gradient")
    const circle = container.querySelector("circle")
    expect(circle).toHaveAttribute("fill", "url(#install-1-gradient)")
  })

  it("applies blue color scheme by default", () => {
    const { container } = render(
      <svg>
        <InstallationIcon id="test-blue" />
      </svg>
    )
    const stops = container.querySelectorAll("stop")
    expect(stops[0]).toHaveAttribute("stop-color", "#0EA5E9")
    expect(stops[1]).toHaveAttribute("stop-color", "#818CF8")
  })

  it("applies alternate color scheme for non-blue", () => {
    const { container } = render(
      <svg>
        <InstallationIcon id="test-amber" color="amber" />
      </svg>
    )
    const stops = container.querySelectorAll("stop")
    expect(stops[0]).toHaveAttribute("stop-color", "#FDE68A")
    expect(stops[1]).toHaveAttribute("stop-color", "#F59E0B")
  })
})
