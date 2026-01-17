/**
 * Shared utility for getting the validated site URL.
 *
 * Used by layout.tsx, sitemap.ts, and robots.ts for consistent URL handling.
 * - Validates URL format
 * - Removes trailing slashes
 * - Logs warnings/errors for missing or invalid URLs
 */

const FALLBACK_URL = "https://vibe-coding-studio.com"

/**
 * Get validated site URL from environment variable.
 *
 * @returns Validated site URL without trailing slash.
 *          Falls back to default URL if env var is missing or invalid.
 *          Logs a warning when env var is missing.
 *          Logs an error when env var contains an invalid URL.
 */
export function getSiteUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL

  if (!envUrl) {
    // eslint-disable-next-line no-console
    console.warn(
      `[SEO:MISSING_SITE_URL] NEXT_PUBLIC_SITE_URL is not set. Using fallback: "${FALLBACK_URL}". ` +
        `Set NEXT_PUBLIC_SITE_URL in your environment for correct SEO URLs.`
    )
    return FALLBACK_URL
  }

  try {
    new URL(envUrl)
    // Remove trailing slash for consistency
    return envUrl.replace(/\/$/, "")
  } catch {
    // eslint-disable-next-line no-console
    console.error(
      `[SEO:INVALID_SITE_URL] NEXT_PUBLIC_SITE_URL is not a valid URL.`,
      {
        invalidUrl: envUrl,
        fallback: FALLBACK_URL,
      }
    )
    return FALLBACK_URL
  }
}
