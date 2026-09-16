import sitemap from "@/app/sitemap"

const removedPaths = [["/", "road", "map"].join(""), ["/", "videos"].join("")]
const retiredCoursePrefix = ["/", "cou", "pons"].join("")
const removedDocsPrefix = ["/", "docs"].join("")

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
    expect(urls).toContain("https://www.vibecodingstudio.dev/en")
    expect(urls).toContain("https://www.vibecodingstudio.dev/community")
    expect(urls).toContain("https://www.vibecodingstudio.dev/en/community")
    expect(urls).toContain("https://www.vibecodingstudio.dev/courses")
    expect(urls).toContain("https://www.vibecodingstudio.dev/en/courses")
    expect(urls.some(url => url.includes(removedDocsPrefix))).toBe(false)
    expect(urls.some(url => url.includes(retiredCoursePrefix))).toBe(false)
    expect(
      urls.some(url =>
        removedPaths.some(
          path => url === `https://www.vibecodingstudio.dev${path}`
        )
      )
    ).toBe(false)
  })

  it("sets correct priorities", () => {
    const result = sitemap()

    const home = result.find(e => e.url === "https://www.vibecodingstudio.dev")
    expect(home?.priority).toBe(1.0)
    const englishHome = result.find(
      e => e.url === "https://www.vibecodingstudio.dev/en"
    )
    expect(englishHome?.priority).toBe(1.0)

    const community = result.find(e => e.url?.includes("/community"))
    expect(community?.priority).toBe(0.9)

    const courses = result.find(e => e.url?.endsWith("/courses"))
    expect(courses?.priority).toBe(0.7)

    const englishCommunity = result.find(
      e => e.url === "https://www.vibecodingstudio.dev/en/community"
    )
    expect(englishCommunity?.priority).toBe(0.9)
    const englishCourses = result.find(
      e => e.url === "https://www.vibecodingstudio.dev/en/courses"
    )
    expect(englishCourses?.priority).toBe(0.7)
  })
})
