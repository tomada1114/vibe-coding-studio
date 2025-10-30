/**
 * CommandCard Component
 *
 * Displays a single command card in the commands list page.
 * Each card shows the command title, description, and links to the detail page.
 *
 * Design System: Radiant
 * - Background: White
 * - Border: Gray-200
 * - Text: Title (Gray-950, semibold), Description (Gray-600)
 * - Hover: Shadow-md with smooth transition
 * - Responsive: Adapts to mobile, tablet, and desktop layouts
 * - Accessibility: Full keyboard navigation, focus indicators, semantic HTML
 */

import Link from 'next/link'
import type { CommandMetadata } from '@/types/command'

interface CommandCardProps {
  /**
   * The command metadata to display.
   */
  command: CommandMetadata
}

/**
 * CommandCard - Display a single command in list format.
 *
 * This component is used in the commands list page to show each command
 * as a clickable card. The entire card is clickable and navigates to the
 * command detail page.
 *
 * Features:
 * - Responsive grid layout support (used by parent container)
 * - Smooth hover and focus transitions
 * - Full accessibility with keyboard navigation and ARIA support
 * - Semantic HTML with article element
 * - Design system compliant styling from Radiant
 *
 * @param command - The command metadata object
 * @returns A rendered command card element
 */
export default function CommandCard({ command }: CommandCardProps) {
  const href = `/claude-code/commands/${command.slug}`

  return (
    <Link
      href={href}
      className="block h-full focus:outline-none"
      aria-label={`View details for ${command.title}`}
    >
      <article
        className="flex h-full flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 ease-in-out hover:border-gray-300 hover:shadow-md focus-within:outline-none focus-within:ring-2 focus-within:ring-gray-950"
        role="article"
      >
        <div className="flex flex-1 flex-col">
          <h3 className="mb-3 text-base font-semibold text-gray-950 transition-colors duration-200 group-hover:text-gray-700 sm:text-lg">
            {command.title}
          </h3>
          {command.description && (
            <p className="flex-1 text-sm text-gray-600 line-clamp-3">
              {command.description}
            </p>
          )}
        </div>
        <div className="mt-4 flex items-center justify-end opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <span className="text-xs font-medium text-gray-500">View Details →</span>
        </div>
      </article>
    </Link>
  )
}
