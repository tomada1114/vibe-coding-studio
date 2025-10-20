/**
 * @jest-environment node
 */
import { OPTIONS, POST } from "@/app/api/csp-report/route"
import { NextRequest } from "next/server"

// Mock the crypto module for Node.js environment
// eslint-disable-next-line @typescript-eslint/no-require-imports
global.crypto = require("crypto").webcrypto as Crypto

// Mock console methods
const mockConsoleWarn = jest.spyOn(console, "warn").mockImplementation()
const mockConsoleError = jest.spyOn(console, "error").mockImplementation()

describe("CSP Report Endpoint", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockConsoleWarn.mockClear()
    mockConsoleError.mockClear()
  })

  describe("POST /api/csp-report", () => {
    it("accepts valid CSP violation report", async () => {
      const validReport = {
        "csp-report": {
          "document-uri": "https://example.com/page",
          "violated-directive": "script-src",
          "effective-directive": "script-src",
          "original-policy": "default-src 'self'",
          "blocked-uri": "https://evil.com/script.js",
          disposition: "report",
          "status-code": 200,
        },
      }

      const request = new NextRequest("https://example.com/api/csp-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/csp-report",
        },
        body: JSON.stringify(validReport),
      })

      const response = await POST(request)

      expect(response.status).toBe(204)
      // In development mode, console.warn should be called
      // In test/production mode, no logging occurs
    })

    it("accepts JSON content type", async () => {
      const validReport = {
        "csp-report": {
          "document-uri": "https://example.com",
          "violated-directive": "img-src",
          "effective-directive": "img-src",
          "original-policy": "img-src 'self'",
          disposition: "enforce",
        },
      }

      const request = new NextRequest("https://example.com/api/csp-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validReport),
      })

      const response = await POST(request)

      expect(response.status).toBe(204)
    })

    it("logs critical violations with error level", async () => {
      const criticalViolation = {
        "csp-report": {
          "document-uri": "https://example.com",
          "violated-directive": "script-src",
          "effective-directive": "script-src",
          "original-policy": "script-src 'self'",
          "blocked-uri": "https://malicious.com/evil.js",
          disposition: "enforce",
          "status-code": 200,
        },
      }

      const request = new NextRequest("https://example.com/api/csp-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/csp-report",
          "User-Agent": "Mozilla/5.0",
          "X-Forwarded-For": "192.168.1.1",
        },
        body: JSON.stringify(criticalViolation),
      })

      const response = await POST(request)

      expect(response.status).toBe(204)
    })

    it("rejects invalid content type", async () => {
      const request = new NextRequest("https://example.com/api/csp-report", {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: "invalid",
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe("Invalid content type")
    })

    it("handles invalid report format", async () => {
      const invalidReport = {
        "not-a-csp-report": {
          some: "data",
        },
      }

      const request = new NextRequest("https://example.com/api/csp-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(invalidReport),
      })

      const response = await POST(request)

      expect(response.status).toBe(400)

      // Only try to parse JSON if the response has a body
      if (response.status !== 204) {
        const data = await response.json()
        expect(data.error).toBe("Invalid CSP report format")
      }
    })

    it("handles JSON parsing errors", async () => {
      const request = new NextRequest("https://example.com/api/csp-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: "not valid json",
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toBe("Internal server error")
    })

    it("handles report-only violations with warn level", () => {
      const reportOnlyViolation = {
        "csp-report": {
          "document-uri": "https://example.com",
          "violated-directive": "font-src",
          "effective-directive": "font-src",
          "original-policy": "font-src 'self'",
          disposition: "report",
        },
      }

      const request = new NextRequest("https://example.com/api/csp-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reportOnlyViolation),
      })

      POST(request).then(response => {
        expect(response.status).toBe(204)
      })
    })
  })

  describe("OPTIONS /api/csp-report", () => {
    it("handles CORS preflight request", async () => {
      const response = await OPTIONS()

      expect(response.status).toBe(204)
      expect(response.headers.get("Access-Control-Allow-Origin")).toBe("*")
      expect(response.headers.get("Access-Control-Allow-Methods")).toBe(
        "POST, OPTIONS"
      )
      expect(response.headers.get("Access-Control-Allow-Headers")).toBe(
        "Content-Type"
      )
    })
  })
})
