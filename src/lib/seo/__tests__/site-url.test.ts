/**
 * @jest-environment node
 */
/* eslint-disable no-console */
import { getSiteUrl } from "../site-url"

describe("getSiteUrl", () => {
  const FALLBACK_URL = "https://www.vibecodingstudio.dev"
  const originalEnv = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...originalEnv }
    jest.spyOn(console, "warn").mockImplementation(() => {})
    jest.spyOn(console, "error").mockImplementation(() => {})
  })

  afterEach(() => {
    process.env = originalEnv
    jest.restoreAllMocks()
  })

  describe("when NEXT_PUBLIC_SITE_URL is not set", () => {
    it("returns fallback URL", () => {
      delete process.env.NEXT_PUBLIC_SITE_URL

      const result = getSiteUrl()

      expect(result).toBe(FALLBACK_URL)
    })

    it("logs a warning", () => {
      delete process.env.NEXT_PUBLIC_SITE_URL

      getSiteUrl()

      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining("[SEO:MISSING_SITE_URL]")
      )
    })
  })

  describe("when NEXT_PUBLIC_SITE_URL is empty string", () => {
    it("returns fallback URL", () => {
      process.env.NEXT_PUBLIC_SITE_URL = ""

      const result = getSiteUrl()

      expect(result).toBe(FALLBACK_URL)
    })

    it("logs a warning", () => {
      process.env.NEXT_PUBLIC_SITE_URL = ""

      getSiteUrl()

      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining("[SEO:MISSING_SITE_URL]")
      )
    })
  })

  describe("when NEXT_PUBLIC_SITE_URL is a valid URL", () => {
    it("returns the URL", () => {
      process.env.NEXT_PUBLIC_SITE_URL = "https://example.com"

      const result = getSiteUrl()

      expect(result).toBe("https://example.com")
    })

    it("removes trailing slash", () => {
      process.env.NEXT_PUBLIC_SITE_URL = "https://example.com/"

      const result = getSiteUrl()

      expect(result).toBe("https://example.com")
    })

    it("does not log any warning or error", () => {
      process.env.NEXT_PUBLIC_SITE_URL = "https://example.com"

      getSiteUrl()

      expect(console.warn).not.toHaveBeenCalled()
      expect(console.error).not.toHaveBeenCalled()
    })
  })

  describe("when NEXT_PUBLIC_SITE_URL is an invalid URL", () => {
    it("returns fallback URL", () => {
      process.env.NEXT_PUBLIC_SITE_URL = "not-a-valid-url"

      const result = getSiteUrl()

      expect(result).toBe(FALLBACK_URL)
    })

    it("logs an error with the invalid URL", () => {
      process.env.NEXT_PUBLIC_SITE_URL = "not-a-valid-url"

      getSiteUrl()

      expect(console.error).toHaveBeenCalledWith(
        expect.stringContaining("[SEO:INVALID_SITE_URL]"),
        expect.objectContaining({
          invalidUrl: "not-a-valid-url",
          fallback: FALLBACK_URL,
        })
      )
    })
  })

  describe("edge cases", () => {
    it("handles URL with port", () => {
      process.env.NEXT_PUBLIC_SITE_URL = "https://localhost:3000"

      const result = getSiteUrl()

      expect(result).toBe("https://localhost:3000")
    })

    it("handles URL with path (removes it for base URL)", () => {
      process.env.NEXT_PUBLIC_SITE_URL = "https://example.com/path/"

      const result = getSiteUrl()

      expect(result).toBe("https://example.com/path")
    })
  })
})
