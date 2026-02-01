import type { ArticleStructuredDataProps } from "@/types/structured_data"
import { generateArticleStructuredDataString } from "../article-structured-data"

jest.mock("@/lib/seo/site-url", () => ({
  getSiteUrl: () => "https://www.vibecodingstudio.dev",
}))

describe("generateArticleStructuredDataString", () => {
  const baseProps: ArticleStructuredDataProps = {
    headline: "Test Article",
    datePublished: "2024-01-01T00:00:00.000Z",
    url: "https://www.vibecodingstudio.dev/docs/test",
    isAccessibleForFree: true,
  }

  it("returns valid JSON string", () => {
    const result = generateArticleStructuredDataString(baseProps)

    expect(() => JSON.parse(result)).not.toThrow()
  })

  it("includes schema.org context", () => {
    const result = JSON.parse(generateArticleStructuredDataString(baseProps))

    expect(result["@context"]).toBe("https://schema.org")
  })

  it("uses Article as default type", () => {
    const result = JSON.parse(generateArticleStructuredDataString(baseProps))

    expect(result["@type"]).toEqual(["Article"])
  })

  it("uses custom articleType when provided", () => {
    const props: ArticleStructuredDataProps = {
      ...baseProps,
      articleType: ["Article", "LearningResource"],
    }

    const result = JSON.parse(generateArticleStructuredDataString(props))

    expect(result["@type"]).toEqual(["Article", "LearningResource"])
  })

  it("sets headline correctly", () => {
    const result = JSON.parse(generateArticleStructuredDataString(baseProps))

    expect(result.headline).toBe("Test Article")
  })

  it("includes description when provided", () => {
    const props: ArticleStructuredDataProps = {
      ...baseProps,
      description: "A test description",
    }

    const result = JSON.parse(generateArticleStructuredDataString(props))

    expect(result.description).toBe("A test description")
  })

  it("omits description when not provided", () => {
    const result = JSON.parse(generateArticleStructuredDataString(baseProps))

    expect(result.description).toBeUndefined()
  })

  it("includes dateModified when provided", () => {
    const props: ArticleStructuredDataProps = {
      ...baseProps,
      dateModified: "2024-06-01T00:00:00.000Z",
    }

    const result = JSON.parse(generateArticleStructuredDataString(props))

    expect(result.dateModified).toBe("2024-06-01T00:00:00.000Z")
  })

  it("omits dateModified when not provided", () => {
    const result = JSON.parse(generateArticleStructuredDataString(baseProps))

    expect(result.dateModified).toBeUndefined()
  })

  describe("author", () => {
    it("uses default author when not provided", () => {
      const result = JSON.parse(generateArticleStructuredDataString(baseProps))

      expect(result.author.name).toBe("とまだ")
      expect(result.author.url).toBe("https://www.vibecodingstudio.dev/founder")
    })

    it("uses custom author when provided", () => {
      const props: ArticleStructuredDataProps = {
        ...baseProps,
        author: {
          name: "Custom Author",
          url: "https://example.com/author",
        },
      }

      const result = JSON.parse(generateArticleStructuredDataString(props))

      expect(result.author.name).toBe("Custom Author")
      expect(result.author.url).toBe("https://example.com/author")
    })

    it("prepends siteUrl to relative author URL", () => {
      const props: ArticleStructuredDataProps = {
        ...baseProps,
        author: {
          name: "Custom Author",
          url: "/about",
        },
      }

      const result = JSON.parse(generateArticleStructuredDataString(props))

      expect(result.author.url).toBe("https://www.vibecodingstudio.dev/about")
    })
  })

  describe("publisher", () => {
    it("sets publisher as Vibe Coding Studio", () => {
      const result = JSON.parse(generateArticleStructuredDataString(baseProps))

      expect(result.publisher["@type"]).toBe("Organization")
      expect(result.publisher.name).toBe("Vibe Coding Studio")
      expect(result.publisher.url).toBe("https://www.vibecodingstudio.dev")
    })
  })

  describe("paywallSelectors", () => {
    it("includes hasPart when paywallSelectors are provided", () => {
      const props: ArticleStructuredDataProps = {
        ...baseProps,
        paywallSelectors: [".premium-content", ".locked-section"],
      }

      const result = JSON.parse(generateArticleStructuredDataString(props))

      expect(result.hasPart).toHaveLength(2)
      expect(result.hasPart[0]).toEqual({
        "@type": "WebPageElement",
        isAccessibleForFree: false,
        cssSelector: ".premium-content",
      })
    })

    it("omits hasPart when paywallSelectors is empty", () => {
      const props: ArticleStructuredDataProps = {
        ...baseProps,
        paywallSelectors: [],
      }

      const result = JSON.parse(generateArticleStructuredDataString(props))

      expect(result.hasPart).toBeUndefined()
    })

    it("omits hasPart when paywallSelectors is not provided", () => {
      const result = JSON.parse(generateArticleStructuredDataString(baseProps))

      expect(result.hasPart).toBeUndefined()
    })
  })
})
