import {
  directivesToString,
  generateCSPHeader,
  generateNonce,
  getCSPConfig,
  getSecurityHeaders,
  isCSPEnabled,
  parseCSPViolation,
} from "@/lib/csp"

describe("CSP Utilities", () => {
  const originalEnv = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...originalEnv }
  })

  afterEach(() => {
    process.env = originalEnv
  })

  describe("generateNonce", () => {
    it("generates a base64 encoded nonce", () => {
      const nonce = generateNonce()
      expect(nonce).toMatch(/^[A-Za-z0-9+/=]+$/)
      expect(nonce.length).toBeGreaterThan(0)
    })

    it("generates unique nonces", () => {
      const nonce1 = generateNonce()
      const nonce2 = generateNonce()
      expect(nonce1).not.toBe(nonce2)
    })
  })

  describe("getCSPConfig", () => {
    it("returns CSP configuration with default directives", () => {
      const config = getCSPConfig()

      expect(config.directives["default-src"]).toContain("'self'")
      expect(config.directives["object-src"]).toContain("'none'")
      expect(config.directives["base-uri"]).toContain("'self'")
    })

    it("includes nonce in script-src when provided", () => {
      const nonce = "test-nonce-123"
      const config = getCSPConfig(nonce)

      expect(config.directives["script-src"]).toContain(`'nonce-${nonce}'`)
      expect(config.directives["script-src-elem"]).toContain(`'nonce-${nonce}'`)
    })

    it("uses unsafe-inline for scripts when no nonce provided", () => {
      const config = getCSPConfig()

      expect(config.directives["script-src"]).toContain("'unsafe-inline'")
      expect(config.directives["script-src-elem"]).toContain("'unsafe-inline'")
    })

    it("includes Sanity domains in appropriate directives", () => {
      const config = getCSPConfig()

      expect(config.directives["script-src"]).toContain("https://cdn.sanity.io")
      expect(config.directives["img-src"]).toContain("https://cdn.sanity.io")
      expect(config.directives["connect-src"]).toContain(
        "https://cdn.sanity.io"
      )
      expect(config.directives["connect-src"]).toContain("wss://*.sanity.io")
    })

    it("includes YouTube in frame-src for video embeds", () => {
      const config = getCSPConfig()

      expect(config.directives["frame-src"]).toContain(
        "https://www.youtube.com"
      )
      expect(config.directives["frame-src"]).toContain("'self'")
    })

    it("excludes external font sources for self-hosted fonts", () => {
      const config = getCSPConfig()

      // Should only allow self and data URLs for fonts
      expect(config.directives["font-src"]).toContain("'self'")
      expect(config.directives["font-src"]).toContain("data:")
      expect(config.directives["font-src"]).not.toContain(
        "https://api.fontshare.com"
      )
      expect(config.directives["font-src"]).not.toContain(
        "https://fonts.gstatic.com"
      )

      // Style sources should not include external font providers
      expect(config.directives["style-src"]).not.toContain(
        "https://api.fontshare.com"
      )
      expect(config.directives["style-src"]).not.toContain(
        "https://fonts.googleapis.com"
      )
    })

    it("sets report-only mode in development", () => {
      process.env.NODE_ENV = "development"
      const config = getCSPConfig()
      expect(config.reportOnly).toBe(true)
    })

    it("enforces CSP in production by default", () => {
      process.env.NODE_ENV = "production"
      const config = getCSPConfig()
      expect(config.reportOnly).toBe(false)
    })

    it("respects CSP_REPORT_ONLY environment variable", () => {
      process.env.NODE_ENV = "production"
      process.env.CSP_REPORT_ONLY = "true"
      const config = getCSPConfig()
      expect(config.reportOnly).toBe(true)
    })

    it("includes report-uri when configured", () => {
      process.env.NEXT_PUBLIC_CSP_REPORT_URI = "/api/csp-report"
      const config = getCSPConfig()
      expect(config.directives["report-uri"]).toContain("/api/csp-report")
      expect(config.reportUri).toBe("/api/csp-report")
    })
  })

  describe("directivesToString", () => {
    it("converts directives object to CSP string", () => {
      const directives = {
        "default-src": ["'self'"],
        "script-src": ["'self'", "'unsafe-inline'"],
        "img-src": ["'self'", "data:", "https:"],
      }

      const result = directivesToString(directives)

      expect(result).toBe(
        "default-src 'self'; script-src 'self' 'unsafe-inline'; img-src 'self' data: https:"
      )
    })

    it("handles upgrade-insecure-requests directive", () => {
      const directives = {
        "upgrade-insecure-requests": [""],
      }

      const result = directivesToString(directives)
      expect(result).toBe("upgrade-insecure-requests")
    })

    it("filters out empty directive arrays", () => {
      const directives = {
        "default-src": ["'self'"],
        "script-src": [],
        "img-src": ["'self'"],
      }

      const result = directivesToString(directives)
      expect(result).toBe("default-src 'self'; img-src 'self'")
    })
  })

  describe("generateCSPHeader", () => {
    it("generates Content-Security-Policy header in enforce mode", () => {
      const config = {
        directives: {
          "default-src": ["'self'"],
        },
        reportOnly: false,
      }

      const header = generateCSPHeader(config)

      expect(header.name).toBe("Content-Security-Policy")
      expect(header.value).toBe("default-src 'self'")
    })

    it("generates Content-Security-Policy-Report-Only header in report-only mode", () => {
      const config = {
        directives: {
          "default-src": ["'self'"],
        },
        reportOnly: true,
      }

      const header = generateCSPHeader(config)

      expect(header.name).toBe("Content-Security-Policy-Report-Only")
      expect(header.value).toBe("default-src 'self'")
    })
  })

  describe("parseCSPViolation", () => {
    it("parses valid CSP violation report", () => {
      const report = {
        "csp-report": {
          "document-uri": "https://example.com/page",
          "violated-directive": "script-src",
          "effective-directive": "script-src",
          "original-policy": "default-src 'self'",
          "blocked-uri": "https://evil.com/script.js",
          "source-file": "https://example.com/page",
          "line-number": 10,
          "column-number": 5,
          disposition: "enforce",
          "status-code": 200,
        },
      }

      const violation = parseCSPViolation(report)

      expect(violation).not.toBeNull()
      expect(violation?.documentUri).toBe("https://example.com/page")
      expect(violation?.violatedDirective).toBe("script-src")
      expect(violation?.blockedUri).toBe("https://evil.com/script.js")
      expect(violation?.lineNumber).toBe(10)
      expect(violation?.disposition).toBe("enforce")
    })

    it("handles report without csp-report wrapper", () => {
      const report = {
        "document-uri": "https://example.com/page",
        "violated-directive": "img-src",
        "effective-directive": "img-src",
        "original-policy": "img-src 'self'",
      }

      const violation = parseCSPViolation(report)

      expect(violation).not.toBeNull()
      expect(violation?.documentUri).toBe("https://example.com/page")
      expect(violation?.violatedDirective).toBe("img-src")
    })

    it("returns null for invalid report", () => {
      expect(parseCSPViolation(null)).toBeNull()
      expect(parseCSPViolation(undefined)).toBeNull()
      expect(parseCSPViolation("string")).toBeNull()
      expect(parseCSPViolation(123)).toBeNull()
      expect(parseCSPViolation({})).toBeNull() // Empty object is invalid without required fields
    })

    it("handles missing optional fields", () => {
      const report = {
        "document-uri": "https://example.com",
        "violated-directive": "default-src",
        "effective-directive": "default-src",
        "original-policy": "default-src 'self'",
      }

      const violation = parseCSPViolation(report)

      expect(violation).not.toBeNull()
      expect(violation?.blockedUri).toBeUndefined()
      expect(violation?.lineNumber).toBeUndefined()
      expect(violation?.columnNumber).toBeUndefined()
    })
  })

  describe("isCSPEnabled", () => {
    it("returns true by default", () => {
      expect(isCSPEnabled()).toBe(true)
    })

    it("returns false when DISABLE_CSP is true", () => {
      process.env.DISABLE_CSP = "true"
      expect(isCSPEnabled()).toBe(false)
    })

    it("returns true when DISABLE_CSP is any other value", () => {
      process.env.DISABLE_CSP = "false"
      expect(isCSPEnabled()).toBe(true)

      process.env.DISABLE_CSP = "0"
      expect(isCSPEnabled()).toBe(true)
    })
  })

  describe("getSecurityHeaders", () => {
    it("returns all security headers", () => {
      const headers = getSecurityHeaders()

      expect(headers["X-DNS-Prefetch-Control"]).toBe("on")
      expect(headers["Strict-Transport-Security"]).toBe(
        "max-age=63072000; includeSubDomains; preload"
      )
      expect(headers["X-Frame-Options"]).toBe("SAMEORIGIN")
      expect(headers["X-Content-Type-Options"]).toBe("nosniff")
      expect(headers["Referrer-Policy"]).toBe("strict-origin-when-cross-origin")
      expect(headers["Permissions-Policy"]).toBe(
        "camera=(), microphone=(), geolocation=()"
      )
    })

    it("includes CSP header when enabled", () => {
      const headers = getSecurityHeaders()

      const cspHeaderName =
        process.env.NODE_ENV === "development"
          ? "Content-Security-Policy-Report-Only"
          : "Content-Security-Policy"

      expect(headers[cspHeaderName]).toBeDefined()
      expect(headers[cspHeaderName]).toContain("default-src 'self'")
    })

    it("includes nonce in CSP when provided", () => {
      const nonce = "test-nonce-456"
      const headers = getSecurityHeaders(nonce)

      const cspHeaderName =
        process.env.NODE_ENV === "development"
          ? "Content-Security-Policy-Report-Only"
          : "Content-Security-Policy"

      expect(headers[cspHeaderName]).toContain(`'nonce-${nonce}'`)
    })

    it("excludes CSP header when disabled", () => {
      process.env.DISABLE_CSP = "true"
      const headers = getSecurityHeaders()

      expect(headers["Content-Security-Policy"]).toBeUndefined()
      expect(headers["Content-Security-Policy-Report-Only"]).toBeUndefined()

      // Other headers should still be present
      expect(headers["X-Frame-Options"]).toBe("SAMEORIGIN")
      expect(headers["X-Content-Type-Options"]).toBe("nosniff")
    })
  })
})
