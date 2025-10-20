import { parseCSPViolation } from "@/lib/csp"
import { NextRequest, NextResponse } from "next/server"

/**
 * CSP violation reporting endpoint
 * Receives Content Security Policy violation reports from browsers
 */
export async function POST(request: NextRequest) {
  try {
    // Parse the CSP violation report
    const contentType = request.headers.get("content-type")

    if (
      !contentType?.includes("application/csp-report") &&
      !contentType?.includes("application/json")
    ) {
      return NextResponse.json(
        { error: "Invalid content type" },
        { status: 400 }
      )
    }

    const body = await request.json()
    const violation = parseCSPViolation(body)

    if (!violation) {
      if (process.env.NODE_ENV === "development") {
        // eslint-disable-next-line no-console
        console.warn("Invalid CSP violation report received:", body)
      }
      return NextResponse.json(
        { error: "Invalid CSP report format" },
        { status: 400 }
      )
    }

    // Log the violation for monitoring
    if (process.env.NODE_ENV === "development") {
      const logMethod = violation.disposition === "enforce" ? "error" : "warn"
      // eslint-disable-next-line no-console
      console[logMethod]("CSP Violation:", {
        documentUri: violation.documentUri,
        violatedDirective: violation.violatedDirective,
        effectiveDirective: violation.effectiveDirective,
        blockedUri: violation.blockedUri,
        sourceFile: violation.sourceFile,
        lineNumber: violation.lineNumber,
        columnNumber: violation.columnNumber,
        sample: violation.sample,
        disposition: violation.disposition,
        statusCode: violation.statusCode,
        referrer: violation.referrer,
      })
    }

    // In production, you might want to:
    // 1. Send to an error tracking service (e.g., Sentry)
    // 2. Store in a database for analysis
    // 3. Send alerts for critical violations

    // Check for critical violations that need immediate attention
    const criticalDirectives = ["script-src", "script-src-elem", "default-src"]
    const isCritical = criticalDirectives.includes(violation.effectiveDirective)

    if (isCritical && violation.disposition === "enforce") {
      // Log critical violations with more detail
      if (process.env.NODE_ENV === "development") {
        // eslint-disable-next-line no-console
        console.error("Critical CSP Violation Detected:", {
          violation,
          userAgent: request.headers.get("user-agent"),
          ip:
            request.headers.get("x-forwarded-for") ||
            request.headers.get("x-real-ip"),
        })
      }

      // In production, send immediate alert
      // await sendAlertToTeam(violation)
    }

    // Track violation metrics
    if (
      process.env.NODE_ENV === "production" &&
      process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT
    ) {
      // Send metrics to analytics service
      try {
        await fetch(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event: "csp_violation",
            properties: {
              directive: violation.effectiveDirective,
              blocked_uri: violation.blockedUri,
              disposition: violation.disposition,
              document_uri: violation.documentUri,
              timestamp: Date.now(),
            },
          }),
        })
      } catch {
        // Silently fail in production
      }
    }

    // Return 204 No Content as per CSP reporting spec
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.error("Error processing CSP report:", error)
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// Handle OPTIONS for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  })
}
