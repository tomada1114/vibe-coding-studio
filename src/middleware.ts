import { generateNonce, getSecurityHeaders } from "@/lib/csp"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  // Generate nonce for this request
  const nonce = generateNonce()

  // Create response with nonce header for Next.js
  const response = NextResponse.next({
    request: {
      headers: new Headers(request.headers),
    },
  })

  // Add nonce to response for use in app
  response.headers.set("x-nonce", nonce)

  // Add security headers including CSP
  const securityHeaders = getSecurityHeaders(nonce)
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  // No caching headers - let Next.js handle it

  return response
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - robots.txt (robots file)
     * - sitemap.xml (sitemap file)
     * - manifest.json (PWA manifest)
     */
    "/((?!_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.json).*)",
  ],
}
