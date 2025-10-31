/**
 * Command Detail Page Loading State
 *
 * Displays a skeleton loading placeholder while the command detail page
 * is being loaded. Provides visual feedback to users during page transitions.
 *
 * Task 7.3: Refactoring and SEO optimization
 * Requirements: 7.5 (Loading state for user feedback)
 *
 * Features:
 * - Skeleton placeholders for page structure
 * - Consistent with Radiant design system
 * - Animated pulse effect for visual feedback
 * - Accessible loading state
 */

import { Container } from "@/components/container"

/**
 * Loading component for command detail page
 *
 * Shows skeleton placeholders for:
 * 1. Breadcrumb navigation
 * 2. Command title
 * 3. Command description
 * 4. Code block
 *
 * @returns Rendered loading skeleton
 */
export default function Loading() {
  return (
    <Container className="mt-16 mb-32 sm:mt-32">
      {/* Breadcrumb skeleton */}
      <div className="mb-8">
        <div className="h-5 w-32 animate-pulse rounded bg-gray-200" />
      </div>

      {/* Command title skeleton */}
      <div className="mb-6 h-12 w-3/4 animate-pulse rounded bg-gray-200" />

      {/* Command description skeleton */}
      <div className="mb-8 space-y-3">
        <div className="h-6 w-full animate-pulse rounded bg-gray-200" />
        <div className="h-6 w-5/6 animate-pulse rounded bg-gray-200" />
      </div>

      {/* Frontmatter metadata skeleton */}
      <div className="mb-12 space-y-4 border-t border-gray-200 pt-6">
        <div>
          <div className="mb-2 h-4 w-24 animate-pulse rounded bg-gray-200" />
          <div className="flex gap-2">
            <div className="h-6 w-16 animate-pulse rounded-full border border-gray-200 bg-gray-100" />
            <div className="h-6 w-20 animate-pulse rounded-full border border-gray-200 bg-gray-100" />
            <div className="h-6 w-16 animate-pulse rounded-full border border-gray-200 bg-gray-100" />
          </div>
        </div>
      </div>

      {/* Section heading skeleton */}
      <div className="mb-4 h-7 w-48 animate-pulse rounded bg-gray-200" />

      {/* Section description skeleton */}
      <div className="mb-4 h-5 w-full animate-pulse rounded bg-gray-200" />

      {/* Code block skeleton */}
      <div className="h-96 w-full animate-pulse rounded-lg border border-gray-200 bg-gray-50" />
    </Container>
  )
}
