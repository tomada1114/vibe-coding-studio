// Edge runtime compatible - no Node.js crypto imports

export type CSPDirective =
  | "default-src"
  | "script-src"
  | "script-src-elem"
  | "script-src-attr"
  | "style-src"
  | "style-src-elem"
  | "style-src-attr"
  | "img-src"
  | "font-src"
  | "connect-src"
  | "media-src"
  | "object-src"
  | "frame-src"
  | "frame-ancestors"
  | "base-uri"
  | "form-action"
  | "manifest-src"
  | "worker-src"
  | "child-src"
  | "report-uri"
  | "report-to"
  | "upgrade-insecure-requests"
  | "block-all-mixed-content"

export type CSPDirectives = Partial<Record<CSPDirective, string[]>>

export interface CSPConfig {
  directives: CSPDirectives
  reportOnly?: boolean
  reportUri?: string
  nonce?: string
}

/**
 * Generate a cryptographically secure nonce for inline scripts
 * Uses Web Crypto API for edge runtime compatibility
 */
export function generateNonce(): string {
  // Use Web Crypto API for edge runtime compatibility
  const array = new Uint8Array(16)
  crypto.getRandomValues(array)
  // Convert to base64 without using Buffer (not available in edge runtime)
  const base64 = btoa(String.fromCharCode.apply(null, Array.from(array)))
  return base64
}

/**
 * Get Content Security Policy configuration
 */
export function getCSPConfig(nonce?: string): CSPConfig {
  const isDevelopment = process.env.NODE_ENV === "development"

  const directives: CSPDirectives = {
    "default-src": ["'self'"],
    "script-src": [
      "'self'",
      nonce ? `'nonce-${nonce}'` : "'unsafe-inline'", // Use nonce when available, unsafe-inline as fallback
      "https://cdn.sanity.io",
      ...(isDevelopment ? ["'unsafe-eval'"] : []), // Only allow unsafe-eval in development
    ].filter(Boolean),
    "script-src-elem": [
      "'self'",
      nonce ? `'nonce-${nonce}'` : "'unsafe-inline'",
      "https://cdn.sanity.io",
    ],
    "style-src": [
      "'self'",
      "'unsafe-inline'", // Required for Tailwind CSS and inline styles
    ],
    "style-src-elem": ["'self'", "'unsafe-inline'"],
    "img-src": [
      "'self'",
      "data:",
      "blob:",
      "https://cdn.sanity.io",
      "https://*.sanity.io",
      isDevelopment ? "http://localhost:*" : "",
    ].filter(Boolean),
    "font-src": [
      "'self'",
      "data:", // Allow data URLs for font fallbacks
    ],
    "connect-src": [
      "'self'",
      "https://cdn.sanity.io",
      "https://*.sanity.io",
      "wss://*.sanity.io", // WebSocket for Sanity Live
      isDevelopment ? "http://localhost:* ws://localhost:*" : "",
      process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT || "",
    ].filter(Boolean),
    "media-src": ["'self'", "https://cdn.sanity.io"],
    "object-src": ["'none'"],
    "frame-src": [
      "'self'",
      "https://www.youtube.com",
      "https://player.vimeo.com",
    ],
    "frame-ancestors": ["'self'"],
    "base-uri": ["'self'"],
    "form-action": ["'self'"],
    "manifest-src": ["'self'"],
    "worker-src": ["'self'", "blob:"],
    "child-src": ["'self'", "blob:"],
    "upgrade-insecure-requests": isDevelopment ? [] : [""],
  }

  // Add report-uri if configured
  if (process.env.NEXT_PUBLIC_CSP_REPORT_URI) {
    directives["report-uri"] = [process.env.NEXT_PUBLIC_CSP_REPORT_URI]
  }

  return {
    directives,
    reportOnly: isDevelopment || process.env.CSP_REPORT_ONLY === "true",
    reportUri: process.env.NEXT_PUBLIC_CSP_REPORT_URI,
    nonce,
  }
}

/**
 * Convert CSP directives object to string
 */
export function directivesToString(directives: CSPDirectives): string {
  return Object.entries(directives)
    .filter(([, values]) => values && values.length > 0)
    .map(([directive, values]) => {
      if (directive === "upgrade-insecure-requests" && values.includes("")) {
        return directive
      }
      return `${directive} ${values.join(" ")}`
    })
    .join("; ")
}

/**
 * Generate CSP header string
 */
export function generateCSPHeader(config: CSPConfig): {
  name: string
  value: string
} {
  const headerName = config.reportOnly
    ? "Content-Security-Policy-Report-Only"
    : "Content-Security-Policy"

  const headerValue = directivesToString(config.directives)

  return {
    name: headerName,
    value: headerValue,
  }
}

/**
 * Parse CSP violation report
 */
export interface CSPViolation {
  documentUri: string
  violatedDirective: string
  effectiveDirective: string
  originalPolicy: string
  blockedUri?: string
  sourceFile?: string
  lineNumber?: number
  columnNumber?: number
  sample?: string
  disposition: "enforce" | "report"
  statusCode: number
  scriptSample?: string
  referrer?: string
}

export function parseCSPViolation(report: unknown): CSPViolation | null {
  try {
    if (typeof report !== "object" || report === null) {
      return null
    }

    const cspReport =
      "csp-report" in report
        ? (report as { "csp-report": unknown })["csp-report"]
        : report

    if (typeof cspReport !== "object" || cspReport === null) {
      return null
    }

    const violation = cspReport as Record<string, unknown>

    // Validate required fields
    if (
      !violation["document-uri"] ||
      !violation["violated-directive"] ||
      !violation["effective-directive"] ||
      !violation["original-policy"]
    ) {
      return null
    }

    return {
      documentUri: String(violation["document-uri"]),
      violatedDirective: String(violation["violated-directive"]),
      effectiveDirective: String(violation["effective-directive"]),
      originalPolicy: String(violation["original-policy"]),
      blockedUri: violation["blocked-uri"]
        ? String(violation["blocked-uri"])
        : undefined,
      sourceFile: violation["source-file"]
        ? String(violation["source-file"])
        : undefined,
      lineNumber:
        typeof violation["line-number"] === "number"
          ? violation["line-number"]
          : undefined,
      columnNumber:
        typeof violation["column-number"] === "number"
          ? violation["column-number"]
          : undefined,
      sample: violation["sample"] ? String(violation["sample"]) : undefined,
      disposition: String(violation["disposition"] || "report") as
        | "enforce"
        | "report",
      statusCode:
        typeof violation["status-code"] === "number"
          ? violation["status-code"]
          : 0,
      scriptSample: violation["script-sample"]
        ? String(violation["script-sample"])
        : undefined,
      referrer: violation["referrer"]
        ? String(violation["referrer"])
        : undefined,
    }
  } catch {
    return null
  }
}

/**
 * Check if CSP is enabled
 */
export function isCSPEnabled(): boolean {
  return process.env.DISABLE_CSP !== "true"
}

/**
 * Get security headers configuration
 */
export function getSecurityHeaders(nonce?: string): Record<string, string> {
  const headers: Record<string, string> = {
    "X-DNS-Prefetch-Control": "on",
    "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
    "X-Frame-Options": "SAMEORIGIN",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
    "Cross-Origin-Embedder-Policy": "require-corp",
    "Cross-Origin-Opener-Policy": "same-origin",
    "Cross-Origin-Resource-Policy": "same-origin",
  }

  // Add CSP header if enabled
  if (isCSPEnabled()) {
    const cspConfig = getCSPConfig(nonce)
    const cspHeader = generateCSPHeader(cspConfig)
    headers[cspHeader.name] = cspHeader.value
  }

  return headers
}
