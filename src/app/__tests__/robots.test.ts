import robots from "@/app/robots"

jest.mock("@/lib/seo/site-url", () => ({
  getSiteUrl: () => "https://www.vibecodingstudio.dev",
}))

describe("robots", () => {
  it("returns the public crawl rules and sitemap URL", () => {
    expect(robots()).toEqual({
      rules: [
        {
          userAgent: "*",
          allow: "/",
          disallow: ["/api/", "/_next/"],
        },
      ],
      sitemap: "https://www.vibecodingstudio.dev/sitemap.xml",
    })
  })
})
