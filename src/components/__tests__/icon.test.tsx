import { Gradient, Icon, LightMode } from "@/components/Icon"
import { render } from "@testing-library/react"

// Mock icon components
jest.mock("@/components/icons/InstallationIcon", () => ({
  InstallationIcon: ({ id, color }: { id: string; color?: string }) => (
    <g data-testid="installation-icon" data-id={id} data-color={color} />
  ),
}))
jest.mock("@/components/icons/LightbulbIcon", () => ({
  LightbulbIcon: ({ id, color }: { id: string; color?: string }) => (
    <g data-testid="lightbulb-icon" data-id={id} data-color={color} />
  ),
}))
jest.mock("@/components/icons/PluginsIcon", () => ({
  PluginsIcon: ({ id, color }: { id: string; color?: string }) => (
    <g data-testid="plugins-icon" data-id={id} data-color={color} />
  ),
}))
jest.mock("@/components/icons/PresetsIcon", () => ({
  PresetsIcon: ({ id, color }: { id: string; color?: string }) => (
    <g data-testid="presets-icon" data-id={id} data-color={color} />
  ),
}))
jest.mock("@/components/icons/ThemingIcon", () => ({
  ThemingIcon: ({ id, color }: { id: string; color?: string }) => (
    <g data-testid="theming-icon" data-id={id} data-color={color} />
  ),
}))
jest.mock("@/components/icons/WarningIcon", () => ({
  WarningIcon: ({ id, color }: { id: string; color?: string }) => (
    <g data-testid="warning-icon" data-id={id} data-color={color} />
  ),
}))

describe("Icon", () => {
  it("renders installation icon", () => {
    const { container } = render(<Icon icon="installation" />)

    const svg = container.querySelector("svg")
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute("aria-hidden", "true")
    expect(svg).toHaveAttribute("viewBox", "0 0 32 32")
  })

  it("renders with blue color by default", () => {
    const { container } = render(<Icon icon="lightbulb" />)

    const svg = container.querySelector("svg")
    expect(svg?.className.baseVal).toContain("--icon-foreground")
  })

  it("renders with amber color", () => {
    const { container } = render(<Icon icon="warning" color="amber" />)

    const svg = container.querySelector("svg")
    expect(svg?.className.baseVal).toContain("--icon-foreground")
  })

  it("applies custom className", () => {
    const { container } = render(<Icon icon="plugins" className="h-8 w-8" />)

    const svg = container.querySelector("svg")
    expect(svg?.className.baseVal).toContain("h-8")
  })

  it("renders different icon types", () => {
    const icons = [
      "installation",
      "presets",
      "plugins",
      "theming",
      "lightbulb",
      "warning",
    ] as const

    icons.forEach(icon => {
      const { unmount } = render(<Icon icon={icon} />)
      unmount()
    })
  })
})

describe("Gradient", () => {
  it("renders blue gradient stops by default", () => {
    const { container } = render(
      <svg>
        <Gradient id="test-gradient" />
      </svg>
    )

    const stops = container.querySelectorAll("stop")
    expect(stops.length).toBeGreaterThan(0)
  })

  it("renders amber gradient stops", () => {
    const { container } = render(
      <svg>
        <Gradient color="amber" id="test-gradient" />
      </svg>
    )

    const stops = container.querySelectorAll("stop")
    expect(stops.length).toBeGreaterThan(0)
  })
})

describe("LightMode", () => {
  it("renders as a g element", () => {
    const { container } = render(
      <svg>
        <LightMode className="test-class">
          <rect width="10" height="10" />
        </LightMode>
      </svg>
    )

    const g = container.querySelector("g")
    expect(g).toBeInTheDocument()
    expect(g).toHaveClass("test-class")
  })
})
