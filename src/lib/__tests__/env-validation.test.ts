import {
  getSafeEnvSummary,
  isDevelopment,
  isProduction,
  requireEnv,
  validateEnv,
} from "../env-validation"

describe("Environment Validation", () => {
  // Store original env
  const originalEnv = process.env

  beforeEach(() => {
    // Reset env before each test
    jest.resetModules()
    process.env = { ...originalEnv }
  })

  afterEach(() => {
    // Restore original env
    process.env = originalEnv
  })

  describe("validateEnv", () => {
    it("should return valid config with no required variables", () => {
      const config = validateEnv()

      expect(config.isValid).toBe(true)
      expect(config.errors).toHaveLength(0)
    })

    it("should include optional site URL when present", () => {
      process.env.NEXT_PUBLIC_SITE_URL = "https://example.com"

      const config = validateEnv()

      expect(config.siteUrl).toBe("https://example.com")
      expect(config.isValid).toBe(true)
    })

    it("should warn if site URL is not an absolute URL", () => {
      process.env.NEXT_PUBLIC_SITE_URL = "not-a-url"

      const config = validateEnv()

      expect(config.isValid).toBe(true) // Still valid, just a warning
      expect(config.warnings).toContain(
        "NEXT_PUBLIC_SITE_URL is set but is not an absolute http(s) URL."
      )
    })
  })

  describe("requireEnv", () => {
    it("should return config without throwing", () => {
      const config = requireEnv()
      expect(config.isValid).toBe(true)
    })
  })

  describe("helper functions", () => {
    it("should correctly identify development environment", () => {
      process.env.NODE_ENV = "development"
      expect(isDevelopment()).toBe(true)
      expect(isProduction()).toBe(false)
    })

    it("should correctly identify production environment", () => {
      process.env.NODE_ENV = "production"
      expect(isProduction()).toBe(true)
      expect(isDevelopment()).toBe(false)
    })
  })

  describe("getSafeEnvSummary", () => {
    it("should include site URL when set", () => {
      process.env.NEXT_PUBLIC_SITE_URL = "https://example.com"

      const summary = getSafeEnvSummary()

      expect(summary.SITE_URL).toBe("https://example.com")
    })

    it("should indicate when site URL is not set", () => {
      delete process.env.NEXT_PUBLIC_SITE_URL

      const summary = getSafeEnvSummary()

      expect(summary.SITE_URL).toBe("NOT_SET")
    })
  })
})
