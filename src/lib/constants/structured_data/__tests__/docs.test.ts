import { renderDocsArticleJsonLd } from "../docs"

jest.mock("@/lib/seo/site-url", () => ({
  getSiteUrl: () => "https://www.vibecodingstudio.dev",
}))

describe("renderDocsArticleJsonLd", () => {
  const courseSlug = "ruby"
  const title = "Rubyの概要を学ぼう"
  const url = "https://www.vibecodingstudio.dev/docs/ruby/introduction"

  describe("with valid required params", () => {
    it("returns valid JSON string", () => {
      const result = renderDocsArticleJsonLd(courseSlug, title, url)

      expect(result).not.toBeNull()
      expect(() => JSON.parse(result!)).not.toThrow()
    })

    it("includes schema.org context", () => {
      const result = JSON.parse(
        renderDocsArticleJsonLd(courseSlug, title, url)!
      )

      expect(result["@context"]).toBe("https://schema.org")
    })

    it("sets type as Article and LearningResource", () => {
      const result = JSON.parse(
        renderDocsArticleJsonLd(courseSlug, title, url)!
      )

      expect(result["@type"]).toEqual(["Article", "LearningResource"])
    })

    it("sets headline correctly", () => {
      const result = JSON.parse(
        renderDocsArticleJsonLd(courseSlug, title, url)!
      )

      expect(result.headline).toBe("Rubyの概要を学ぼう")
    })

    it("sets default datePublished", () => {
      const result = JSON.parse(
        renderDocsArticleJsonLd(courseSlug, title, url)!
      )

      expect(result.datePublished).toBe("2024-01-01T00:00:00.000Z")
    })

    it("sets isAccessibleForFree to true by default", () => {
      const result = JSON.parse(
        renderDocsArticleJsonLd(courseSlug, title, url)!
      )

      expect(result.isAccessibleForFree).toBe(true)
    })

    it("uses default author", () => {
      const result = JSON.parse(
        renderDocsArticleJsonLd(courseSlug, title, url)!
      )

      expect(result.author.name).toBe("とまだ")
      expect(result.author.url).toBe("https://www.vibecodingstudio.dev/")
    })

    it("sets publisher as Vibe Coding Studio", () => {
      const result = JSON.parse(
        renderDocsArticleJsonLd(courseSlug, title, url)!
      )

      expect(result.publisher.name).toBe("Vibe Coding Studio")
      expect(result.publisher.url).toBe("https://www.vibecodingstudio.dev")
    })
  })

  describe("with options", () => {
    it("includes description when provided", () => {
      const result = JSON.parse(
        renderDocsArticleJsonLd(courseSlug, title, url, {
          description: "Ruby basics",
        })!
      )

      expect(result.description).toBe("Ruby basics")
    })

    it("omits description when not provided", () => {
      const result = JSON.parse(
        renderDocsArticleJsonLd(courseSlug, title, url)!
      )

      expect(result.description).toBeUndefined()
    })

    it("uses provided datePublished", () => {
      const result = JSON.parse(
        renderDocsArticleJsonLd(courseSlug, title, url, {
          datePublished: "2025-06-01T00:00:00.000Z",
        })!
      )

      expect(result.datePublished).toBe("2025-06-01T00:00:00.000Z")
    })

    it("includes dateModified when provided", () => {
      const result = JSON.parse(
        renderDocsArticleJsonLd(courseSlug, title, url, {
          dateModified: "2025-06-01T00:00:00.000Z",
        })!
      )

      expect(result.dateModified).toBe("2025-06-01T00:00:00.000Z")
    })

    it("omits dateModified when not provided", () => {
      const result = JSON.parse(
        renderDocsArticleJsonLd(courseSlug, title, url)!
      )

      expect(result.dateModified).toBeUndefined()
    })

    it("uses custom author name", () => {
      const result = JSON.parse(
        renderDocsArticleJsonLd(courseSlug, title, url, {
          author: "Custom Author",
        })!
      )

      expect(result.author.name).toBe("Custom Author")
    })

    it("sets isAccessibleForFree to false when specified", () => {
      const result = JSON.parse(
        renderDocsArticleJsonLd(courseSlug, title, url, {
          isAccessibleForFree: false,
        })!
      )

      expect(result.isAccessibleForFree).toBe(false)
    })
  })

  describe("returns null for invalid input", () => {
    it("returns null when courseSlug is empty", () => {
      const result = renderDocsArticleJsonLd("", title, url)

      expect(result).toBeNull()
    })

    it("returns null when title is empty", () => {
      const result = renderDocsArticleJsonLd(courseSlug, "", url)

      expect(result).toBeNull()
    })
  })
})
