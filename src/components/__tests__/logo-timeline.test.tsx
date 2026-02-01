import { LogoTimeline } from "@/components/logo-timeline"
import { render, screen } from "@testing-library/react"

// Mock logo component
jest.mock("@/components/logo", () => ({
  Mark: (props: Record<string, unknown>) => (
    <svg data-testid="mark" {...props} />
  ),
}))

describe("LogoTimeline", () => {
  it("renders with aria-hidden", () => {
    const { container } = render(<LogoTimeline />)

    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).toHaveAttribute("aria-hidden", "true")
  })

  it("renders logo labels", () => {
    render(<LogoTimeline />)

    expect(screen.getByText("Loom")).toBeInTheDocument()
    expect(screen.getByText("Gmail")).toBeInTheDocument()
    expect(screen.getByText("Slack")).toBeInTheDocument()
    expect(screen.getByText("Discord")).toBeInTheDocument()
  })

  it("renders main mark logo", () => {
    const { container } = render(<LogoTimeline />)

    const mark = container.querySelector("[data-testid='mark']")
    expect(mark).toBeInTheDocument()
  })

  it("renders logo images", () => {
    const { container } = render(<LogoTimeline />)

    const images = container.querySelectorAll("img")
    expect(images.length).toBeGreaterThanOrEqual(10)
  })
})
