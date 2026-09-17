import RootLayout, { metadata } from "@/app/layout"
import { render, screen } from "@testing-library/react"

const siteUrl = "https://www.vibecodingstudio.dev"

describe("RootLayout", () => {
  it("publishes the site-wide metadata", () => {
    expect(metadata.metadataBase).toEqual(new URL(siteUrl))
    expect(metadata.title).toMatchObject({
      template: "%s - Vibe Coding Studio",
      default: "とまだ（増山友司） - AI駆動開発の実践者・教育者",
    })
    expect(metadata.description).toContain(
      "アメリカ在住のソフトウェアエンジニア"
    )
    expect(metadata.openGraph).toMatchObject({
      type: "website",
      locale: "ja_JP",
      url: siteUrl,
      siteName: "Vibe Coding Studio",
    })
    expect(metadata.twitter).toMatchObject({
      card: "summary_large_image",
      site: "@muscle_coding",
      creator: "@muscle_coding",
    })
    expect(metadata.robots).toEqual({ index: true, follow: true })
    expect(metadata.alternates).toMatchObject({ canonical: siteUrl })
  })

  it("renders the document shell and shared chrome", () => {
    render(
      <RootLayout>
        <main>テストコンテンツ</main>
      </RootLayout>
    )

    const html = document.documentElement
    expect(html).toHaveAttribute("lang", "ja")
    expect(html).toHaveAttribute("data-theme", "dark")

    const head = document.head
    expect(head.querySelector("script")).toHaveTextContent("data-theme")
    expect(
      head.querySelector(
        'link[rel="preconnect"][href="https://fonts.googleapis.com"]'
      )
    ).toBeInTheDocument()
    expect(
      head.querySelector(
        'link[rel="preconnect"][href="https://fonts.gstatic.com"]'
      )
    ).toBeInTheDocument()
    expect(
      head.querySelector('link[rel="stylesheet"][href*="Noto+Sans+JP"]')
    ).toBeInTheDocument()

    const body = document.body
    expect(body).toHaveClass("bg-bg", "text-text-primary", "antialiased")
    expect(screen.getByRole("banner")).toBeInTheDocument()
    expect(screen.getByRole("contentinfo")).toBeInTheDocument()
    expect(screen.getByRole("main")).toHaveTextContent("テストコンテンツ")
  })
})
