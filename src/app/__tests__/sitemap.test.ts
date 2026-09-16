import sitemap from "@/app/sitemap"

const removedPaths = [["/", "road", "map"].join(""), ["/", "videos"].join("")]

// Mock dependencies
jest.mock("@/lib/coupons/coupon-data", () => ({
  getLatestCoupons: () => [
    {
      courseInfo: { slug: "react-course" },
    },
    {
      courseInfo: { slug: "rails-course" },
    },
  ],
}))

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
    expect(urls).toContain("https://www.vibecodingstudio.dev/coupons")
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

  it("includes coupon detail pages", () => {
    const result = sitemap()
    const urls = result.map(entry => entry.url)

    expect(urls).toContain(
      "https://www.vibecodingstudio.dev/coupons/react-course"
    )
    expect(urls).toContain(
      "https://www.vibecodingstudio.dev/coupons/rails-course"
    )
  })

  it("sets correct priorities", () => {
    const result = sitemap()

    const home = result.find(e => e.url === "https://www.vibecodingstudio.dev")
    expect(home?.priority).toBe(1.0)

    const community = result.find(e => e.url?.includes("/community"))
    expect(community?.priority).toBe(0.9)

    const coursePages = result.filter(e =>
      e.url?.match(/\/docs\/(ruby|rails|javascript)$/)
    )
    coursePages.forEach(page => {
      expect(page.priority).toBe(0.7)
    })
  })
})

describe("sitemap error handling", () => {
  beforeEach(() => {
    jest.resetModules()
  })

  it("continues generating sitemap when coupon data fails", () => {
    jest.doMock("@/lib/coupons/coupon-data", () => ({
      getLatestCoupons: () => {
        throw new Error("Coupon data unavailable")
      },
    }))
    jest.doMock("@/lib/course-constants", () => ({
      getAllCourses: () => [],
    }))
    jest.doMock("@/lib/seo/site-url", () => ({
      getSiteUrl: () => "https://example.com",
    }))
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { default: sitemapWithError } = require("@/app/sitemap")
    const result = sitemapWithError()

    // Static pages should still be present
    expect(result.length).toBeGreaterThan(0)
    expect(
      result.some((e: { url: string }) => e.url === "https://example.com")
    ).toBe(true)
  })
})
