import { fireEvent, render } from "@testing-library/react"
import { VideoThumbnail } from "../video-thumbnail"

describe("VideoThumbnail", () => {
  it("既定では maxresdefault を参照する", () => {
    const { container } = render(<VideoThumbnail videoId="abc123" />)

    expect(container.querySelector("img")).toHaveAttribute(
      "src",
      "https://i.ytimg.com/vi/abc123/maxresdefault.jpg"
    )
  })

  it("maxresdefault が404の動画では hqdefault にフォールバックする", () => {
    const { container } = render(<VideoThumbnail videoId="abc123" />)
    const img = container.querySelector("img") as HTMLImageElement

    fireEvent.error(img)

    expect(container.querySelector("img")).toHaveAttribute(
      "src",
      "https://i.ytimg.com/vi/abc123/hqdefault.jpg"
    )
  })
})
