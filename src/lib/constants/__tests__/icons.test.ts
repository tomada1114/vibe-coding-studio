import { DEVICON_COLORS, DEVICON_MAPPING, getDeviconUrl } from "../icons"

describe("icons", () => {
  describe("DEVICON_COLORS", () => {
    it("contains entries for all expected slugs", () => {
      const expectedSlugs = [
        "ruby",
        "rails",
        "rspec",
        "python",
        "javascript",
        "typescript",
        "react",
      ]
      expectedSlugs.forEach(slug => {
        expect(DEVICON_COLORS[slug]).toBeDefined()
      })
    })

    it("each entry has text, bg, and hover properties", () => {
      Object.values(DEVICON_COLORS).forEach(colors => {
        expect(colors.text).toBeDefined()
        expect(colors.text).not.toBe("")
        expect(colors.bg).toBeDefined()
        expect(colors.bg).not.toBe("")
        expect(colors.hover).toBeDefined()
        expect(colors.hover).not.toBe("")
      })
    })

    it("text values follow Tailwind text-* pattern", () => {
      Object.values(DEVICON_COLORS).forEach(colors => {
        expect(colors.text).toMatch(/^text-/)
      })
    })

    it("bg values follow Tailwind bg-* pattern", () => {
      Object.values(DEVICON_COLORS).forEach(colors => {
        expect(colors.bg).toMatch(/^bg-/)
      })
    })

    it("hover values follow Tailwind hover:bg-* pattern", () => {
      Object.values(DEVICON_COLORS).forEach(colors => {
        expect(colors.hover).toMatch(/^hover:bg-/)
      })
    })
  })

  describe("DEVICON_MAPPING", () => {
    it("contains entries for all expected slugs", () => {
      const expectedSlugs = [
        "ruby",
        "rails",
        "rspec",
        "python",
        "javascript",
        "typescript",
        "react",
      ]
      expectedSlugs.forEach(slug => {
        expect(DEVICON_MAPPING[slug]).toBeDefined()
      })
    })

    it("each mapping value is a non-empty string", () => {
      Object.values(DEVICON_MAPPING).forEach(value => {
        expect(typeof value).toBe("string")
        expect(value).not.toBe("")
      })
    })

    it("each mapping value contains a hyphen (name-variant format)", () => {
      Object.values(DEVICON_MAPPING).forEach(value => {
        expect(value).toContain("-")
      })
    })
  })

  describe("getDeviconUrl", () => {
    it("returns valid CDN URL for known slug", () => {
      const result = getDeviconUrl("ruby")

      expect(result).toContain("cdn.jsdelivr.net")
      expect(result).toContain("devicon")
      expect(result).toContain("ruby")
      expect(result).toMatch(/\.svg$/)
    })

    it("returns correct URL structure for python", () => {
      const result = getDeviconUrl("python")

      expect(result).toBe(
        "https://cdn.jsdelivr.net/gh/devicons/devicon@2.16.0/icons/python/python-original.svg"
      )
    })

    it("returns empty string for unknown slug", () => {
      const result = getDeviconUrl("unknown")

      expect(result).toBe("")
    })

    it("returns empty string for empty string slug", () => {
      const result = getDeviconUrl("")

      expect(result).toBe("")
    })

    it("constructs URL with icon folder name from mapping", () => {
      const result = getDeviconUrl("rails")

      expect(result).toContain("/rails/rails-plain.svg")
    })
  })
})
