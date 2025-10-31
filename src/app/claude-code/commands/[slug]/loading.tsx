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

import { Container } from '@/components/container'

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
        <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
      </div>

      {/* Command title skeleton */}
      <div className="h-12 w-3/4 bg-gray-200 rounded animate-pulse mb-6" />

      {/* Command description skeleton */}
      <div className="space-y-3 mb-8">
        <div className="h-6 w-full bg-gray-200 rounded animate-pulse" />
        <div className="h-6 w-5/6 bg-gray-200 rounded animate-pulse" />
      </div>

      {/* Frontmatter metadata skeleton */}
      <div className="border-t border-gray-200 pt-6 mb-12 space-y-4">
        <div>
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2" />
          <div className="flex gap-2">
            <div className="h-6 w-16 bg-gray-100 border border-gray-200 rounded-full animate-pulse" />
            <div className="h-6 w-20 bg-gray-100 border border-gray-200 rounded-full animate-pulse" />
            <div className="h-6 w-16 bg-gray-100 border border-gray-200 rounded-full animate-pulse" />
          </div>
        </div>
      </div>

      {/* Section heading skeleton */}
      <div className="h-7 w-48 bg-gray-200 rounded animate-pulse mb-4" />

      {/* Section description skeleton */}
      <div className="h-5 w-full bg-gray-200 rounded animate-pulse mb-4" />

      {/* Code block skeleton */}
      <div className="h-96 w-full bg-gray-50 border border-gray-200 rounded-lg animate-pulse" />
    </Container>
  )
}
