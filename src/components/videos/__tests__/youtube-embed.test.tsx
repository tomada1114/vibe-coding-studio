import { describe, expect, test } from "@jest/globals"
import { render, screen } from "@testing-library/react"
import { YouTubeEmbed } from "../youtube-embed"

describe("YouTubeEmbed", () => {
  test("YouTube URL (youtu.be形式)からiframeを生成する", () => {
    render(
      <YouTubeEmbed
        videoUrl="https://youtu.be/dQw4w9WgXcQ"
        title="Test Video"
      />
    )

    const iframe = screen.getByTitle("Test Video")
    expect(iframe).toBeInTheDocument()
    expect(iframe.tagName).toBe("IFRAME")
    expect(iframe.getAttribute("src")).toBe(
      "https://www.youtube.com/embed/dQw4w9WgXcQ"
    )
  })

  test("YouTube URL (youtube.com形式)からiframeを生成する", () => {
    render(
      <YouTubeEmbed
        videoUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        title="Test Video"
      />
    )

    const iframe = screen.getByTitle("Test Video")
    expect(iframe).toBeInTheDocument()
    expect(iframe.getAttribute("src")).toBe(
      "https://www.youtube.com/embed/dQw4w9WgXcQ"
    )
  })

  test("iframeにtitle属性が設定されている", () => {
    render(
      <YouTubeEmbed
        videoUrl="https://youtu.be/dQw4w9WgXcQ"
        title="Test Video Title"
      />
    )

    const iframe = screen.getByTitle("Test Video Title")
    expect(iframe).toBeInTheDocument()
  })

  test("iframeにallow属性が設定されている", () => {
    render(
      <YouTubeEmbed
        videoUrl="https://youtu.be/dQw4w9WgXcQ"
        title="Test Video"
      />
    )

    const iframe = screen.getByTitle("Test Video")
    expect(iframe.getAttribute("allow")).toContain("autoplay")
    expect(iframe.getAttribute("allow")).toContain("picture-in-picture")
  })

  test("iframeにallowFullScreen属性が設定されている", () => {
    render(
      <YouTubeEmbed
        videoUrl="https://youtu.be/dQw4w9WgXcQ"
        title="Test Video"
      />
    )

    const iframe = screen.getByTitle("Test Video")
    expect(iframe.getAttribute("allowfullscreen")).toBe("")
  })

  test("無効なURLの場合、エラーメッセージを表示する", () => {
    render(
      <YouTubeEmbed videoUrl="https://invalid-url.com" title="Test Video" />
    )

    const errorMessage = screen.getByText("動画のURLが無効です")
    expect(errorMessage).toBeInTheDocument()
  })

  test("レスポンシブクラスが適用されている", () => {
    const { container } = render(
      <YouTubeEmbed
        videoUrl="https://youtu.be/dQw4w9WgXcQ"
        title="Test Video"
      />
    )

    const wrapper = container.firstChild
    expect(wrapper).toHaveClass("aspect-video")
  })

  test("タイムスタンプ付きYouTube URL (t= パラメータ) から埋め込みURLを生成する", () => {
    render(
      <YouTubeEmbed
        videoUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=120s"
        title="Test Video"
      />
    )

    const iframe = screen.getByTitle("Test Video")
    expect(iframe).toBeInTheDocument()
    expect(iframe.getAttribute("src")).toBe(
      "https://www.youtube.com/embed/dQw4w9WgXcQ"
    )
  })

  test("プレイリスト付きYouTube URL から埋め込みURLを生成する", () => {
    render(
      <YouTubeEmbed
        videoUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=PLrAXtmErZgOeiKm4sgNOknGvNjby9efdf"
        title="Test Video"
      />
    )

    const iframe = screen.getByTitle("Test Video")
    expect(iframe).toBeInTheDocument()
    expect(iframe.getAttribute("src")).toBe(
      "https://www.youtube.com/embed/dQw4w9WgXcQ"
    )
  })

  test("空文字列のURLの場合、エラーメッセージを表示する", () => {
    render(<YouTubeEmbed videoUrl="" title="Test Video" />)

    const errorMessage = screen.getByText("動画のURLが無効です")
    expect(errorMessage).toBeInTheDocument()
  })

  test("iframeのクラスにh-fullとw-fullが含まれている", () => {
    render(
      <YouTubeEmbed
        videoUrl="https://youtu.be/dQw4w9WgXcQ"
        title="Test Video"
      />
    )

    const iframe = screen.getByTitle("Test Video")
    expect(iframe).toHaveClass("h-full")
    expect(iframe).toHaveClass("w-full")
  })
})
