import { Screenshot } from "@/components/screenshot"
import { render } from "@testing-library/react"

describe("Screenshot", () => {
  it("renders an image with src", () => {
    const { container } = render(
      <Screenshot width={1280} height={720} src="/screenshot.png" />
    )

    const img = container.querySelector("img")
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute("src", "/screenshot.png")
    expect(img).toHaveAttribute("alt", "")
  })

  it("applies custom className", () => {
    const { container } = render(
      <Screenshot
        width={800}
        height={600}
        src="/test.png"
        className="my-custom-class"
      />
    )

    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).toHaveClass("my-custom-class")
  })

  it("renders wrapper with aspect ratio class", () => {
    const { container } = render(
      <Screenshot width={1920} height={1080} src="/test.png" />
    )

    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).toHaveClass("relative")
    expect(wrapper.getAttribute("style")).toContain("--width")
    expect(wrapper.getAttribute("style")).toContain("--height")
  })
})
