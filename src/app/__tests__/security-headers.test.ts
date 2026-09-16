import { execFileSync } from "node:child_process"
import { fileURLToPath, pathToFileURL } from "node:url"

const configUrl = pathToFileURL(
  fileURLToPath(new URL("../../../next.config.mjs", import.meta.url))
).href

type HeaderRule = {
  source: string
  headers: Array<{ key: string; value: string }>
}

function loadHeaderRules(nodeEnv: string): HeaderRule[] {
  const output = execFileSync(
    process.execPath,
    [
      "--input-type=module",
      "-e",
      `import config from ${JSON.stringify(configUrl)}; process.stdout.write(JSON.stringify(await config.headers()))`,
    ],
    { encoding: "utf8", env: { ...process.env, NODE_ENV: nodeEnv } }
  )
  return JSON.parse(output) as HeaderRule[]
}

function globalHeaders(nodeEnv: string): Map<string, string> {
  const rule = loadHeaderRules(nodeEnv).find(r => r.source === "/:path*")
  return new Map((rule?.headers ?? []).map(h => [h.key, h.value]))
}

function cspDirectives(nodeEnv: string): string[] {
  const csp = globalHeaders(nodeEnv).get("Content-Security-Policy") ?? ""
  return csp
    .split(";")
    .map(d => d.trim().replace(/\s+/g, " "))
    .filter(Boolean)
}

// 期待値は Issue #85 の設計コメント（静的 CSP・nonce なし）から持ってくる
describe("security headers on every route", () => {
  it.each([
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: blob:",
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'self'",
  ])("sets the production CSP directive %s", directive => {
    expect(cspDirectives("production")).toContain(directive)
  })

  it("does not allow eval in production", () => {
    expect(cspDirectives("production").join("; ")).not.toContain(
      "'unsafe-eval'"
    )
  })

  it("allows eval in development for React's dev build", () => {
    expect(cspDirectives("development")).toContain(
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
    )
  })

  it("does not use nonces or report endpoints", () => {
    const csp = cspDirectives("production").join("; ")
    expect(csp).not.toContain("nonce-")
    expect(csp).not.toContain("report-uri")
    expect(csp).not.toContain("report-to")
  })

  it("keeps the existing security headers", () => {
    const headers = globalHeaders("production")
    expect(headers.get("X-Frame-Options")).toBe("SAMEORIGIN")
    expect(headers.get("X-Content-Type-Options")).toBe("nosniff")
    expect(headers.get("Referrer-Policy")).toBe("origin-when-cross-origin")
  })
})
