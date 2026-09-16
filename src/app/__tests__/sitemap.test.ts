import sitemap from "@/app/sitemap"

const removedPaths = [["/", "road", "map"].join(""), ["/", "videos"].join("")]

jest.mock("@/lib/course-constants", () => ({
  getAllCourses: () => [
    { slug: "ruby" },
    { slug: "rails" },
    { slug: "javascript" },
  ],
}))

jest.mock("@/lib/seo/site-url", () => ({
  getSiteUrl: () => "https://www.vibecodingstudio.dev",
}))

describe("sitemap", () => {
  it("returns an array of sitemap entries", () => {
    const result = sitemap()

    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBeGreaterThan(0)
  })

  it("includes static pages with correct URLs", () => {
    const result = sitemap()
    const urls = result.map(entry => entry.url)

    expect(urls).toContain("https://www.vibecodingstudio.dev")
    expect(urls).toContain("https://www.vibecodingstudio.dev/community")
    expect(urls).toContain("https://www.vibecodingstudio.dev/docs")
    expect(urls).toContain("https://www.vibecodingstudio.dev/courses")
    expect(urls.some(url => url.includes("/coupons"))).toBe(false)
    expect(
      urls.some(url =>
        removedPaths.some(
          path => url === `https://www.vibecodingstudio.dev${path}`
        )
      )
    ).toBe(false)
  })

  it("includes course pages", () => {
    const result = sitemap()
    const urls = result.map(entry => entry.url)

    expect(urls).toContain("https://www.vibecodingstudio.dev/docs/ruby")
    expect(urls).toContain("https://www.vibecodingstudio.dev/docs/rails")
    expect(urls).toContain("https://www.vibecodingstudio.dev/docs/javascript")
  })

  it("sets correct priorities", () => {
    const result = sitemap()

    const home = result.find(e => e.url === "https://www.vibecodingstudio.dev")
    expect(home?.priority).toBe(1.0)

    const community = result.find(e => e.url?.includes("/community"))
    expect(community?.priority).toBe(0.9)

    const courses = result.find(e => e.url?.endsWith("/courses"))
    expect(courses?.priority).toBe(0.7)

    const coursePages = result.filter(e =>
      e.url?.match(/\/docs\/(ruby|rails|javascript)$/)
    )
    coursePages.forEach(page => {
      expect(page.priority).toBe(0.7)
    })
  })
})
