import type { BreadcrumbItem } from "../breadcrumb-utils"
import {
  breadcrumbToJsonLd,
  generateBreadcrumbStructuredData,
  generateDocsBreadcrumb,
} from "../breadcrumb-utils"

jest.mock("../site-url", () => ({
  getSiteUrl: () => "https://www.vibecodingstudio.dev",
}))

describe("breadcrumb-utils", () => {
  describe("generateDocsBreadcrumb", () => {
    it("returns base breadcrumb with home and docs when no params", () => {
      const result = generateDocsBreadcrumb()

      expect(result).toHaveLength(2)
      expect(result[0]).toEqual({ label: "ホーム", href: "/" })
      expect(result[1]).toEqual({ label: "ドキュメント", href: "/docs" })
    })

    it("includes course when courseSlug and courseTitle are provided", () => {
      const result = generateDocsBreadcrumb("ruby", "Ruby")

      expect(result).toHaveLength(3)
      expect(result[2]).toEqual({ label: "Ruby", href: "/docs/ruby" })
    })

    it("includes chapter when chapterTitle is provided", () => {
      const result = generateDocsBreadcrumb("ruby", "Ruby", "はじめに")

      expect(result).toHaveLength(4)
      expect(result[3]).toEqual({ label: "はじめに" })
      expect(result[3].href).toBeUndefined()
    })

    it("does not include course when only courseSlug is provided without title", () => {
      const result = generateDocsBreadcrumb("ruby", undefined)

      expect(result).toHaveLength(2)
    })

    it("includes chapter without course when only chapterTitle is provided", () => {
      const result = generateDocsBreadcrumb(undefined, undefined, "はじめに")

      expect(result).toHaveLength(3)
      expect(result[2]).toEqual({ label: "はじめに" })
    })
  })

  describe("generateBreadcrumbStructuredData", () => {
    it("returns valid BreadcrumbList JSON-LD structure", () => {
      const items: BreadcrumbItem[] = [
        { label: "ホーム", href: "/" },
        { label: "ドキュメント", href: "/docs" },
      ]

      const result = generateBreadcrumbStructuredData(items)

      expect(result["@context"]).toBe("https://schema.org")
      expect(result["@type"]).toBe("BreadcrumbList")
      expect(result.itemListElement).toHaveLength(2)
    })

    it("sets correct position for each item", () => {
      const items: BreadcrumbItem[] = [
        { label: "ホーム", href: "/" },
        { label: "ドキュメント", href: "/docs" },
        { label: "Ruby" },
      ]

      const result = generateBreadcrumbStructuredData(items)

      expect(result.itemListElement[0].position).toBe(1)
      expect(result.itemListElement[1].position).toBe(2)
      expect(result.itemListElement[2].position).toBe(3)
    })

    it("includes full URL for items with href", () => {
      const items: BreadcrumbItem[] = [
        { label: "ホーム", href: "/" },
        { label: "ドキュメント", href: "/docs" },
      ]

      const result = generateBreadcrumbStructuredData(items)

      expect(result.itemListElement[0].item).toBe(
        "https://www.vibecodingstudio.dev/"
      )
      expect(result.itemListElement[1].item).toBe(
        "https://www.vibecodingstudio.dev/docs"
      )
    })

    it("does not include item URL for items without href", () => {
      const items: BreadcrumbItem[] = [{ label: "Ruby" }]

      const result = generateBreadcrumbStructuredData(items)

      expect(result.itemListElement[0].item).toBeUndefined()
    })

    it("sets correct name for each item", () => {
      const items: BreadcrumbItem[] = [
        { label: "ホーム", href: "/" },
        { label: "Ruby" },
      ]

      const result = generateBreadcrumbStructuredData(items)

      expect(result.itemListElement[0].name).toBe("ホーム")
      expect(result.itemListElement[1].name).toBe("Ruby")
    })

    it("handles empty array", () => {
      const result = generateBreadcrumbStructuredData([])

      expect(result.itemListElement).toHaveLength(0)
    })
  })

  describe("breadcrumbToJsonLd", () => {
    it("returns valid JSON string", () => {
      const data = generateBreadcrumbStructuredData([
        { label: "ホーム", href: "/" },
      ])

      const result = breadcrumbToJsonLd(data)

      expect(() => JSON.parse(result)).not.toThrow()
    })

    it("contains expected data when parsed", () => {
      const data = generateBreadcrumbStructuredData([
        { label: "ホーム", href: "/" },
      ])

      const result = JSON.parse(breadcrumbToJsonLd(data))

      expect(result["@context"]).toBe("https://schema.org")
      expect(result["@type"]).toBe("BreadcrumbList")
    })
  })
})
