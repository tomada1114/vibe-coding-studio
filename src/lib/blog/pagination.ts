/**
 * Blog Pagination Utilities
 *
 * Shared pagination logic for blog pages.
 */

import { logBlogWarning } from "./logging"

/**
 * Parse and validate page parameter from URL query string.
 *
 * @param pageStr - Raw page parameter from URL (may be undefined or invalid)
 * @param maxPage - Maximum valid page number based on total items
 * @returns Valid page number (1-indexed), clamped to valid range
 *
 * @example
 * parsePageParam(undefined, 5)  // returns 1
 * parsePageParam("3", 5)        // returns 3
 * parsePageParam("abc", 5)      // returns 1 (with warning)
 * parsePageParam("10", 5)       // returns 5 (clamped, with warning)
 */
export function parsePageParam(
  pageStr: string | undefined,
  maxPage: number
): number {
  if (!pageStr) return 1

  const parsed = parseInt(pageStr, 10)

  // Handle NaN, negative numbers, zero
  if (isNaN(parsed) || parsed < 1) {
    logBlogWarning("INVALID_PAGE_PARAM", {
      pageStr,
      reason: "Invalid page parameter, defaulting to 1",
    })
    return 1
  }

  // Handle exceeding max page
  if (parsed > maxPage && maxPage > 0) {
    logBlogWarning("PAGE_EXCEEDS_MAX", {
      requested: parsed,
      maxPage,
      reason: "Clamping to max page",
    })
    return maxPage
  }

  return parsed
}
