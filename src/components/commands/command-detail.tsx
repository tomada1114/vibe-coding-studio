/**
 * CommandDetail Component
 *
 * Displays detailed information about a custom command, including title,
 * description, and frontmatter metadata (allowed tools, argument hint).
 * This component is used in the command detail page.
 */

import React from 'react'
import clsx from 'clsx'
import type { CommandMetadata } from '@/types/command'

export interface CommandDetailProps {
  /**
   * The command metadata to display
   */
  command: CommandMetadata
}

/**
 * CommandDetail Component
 *
 * Renders a command's detailed information following the Radiant design system.
 * Uses semantic HTML and proper heading hierarchy for accessibility.
 *
 * @example
 * ```tsx
 * <CommandDetail command={commandMetadata} />
 * ```
 */
export default function CommandDetail({ command }: CommandDetailProps) {
  const { title, description, allowedTools, argumentHint } = command

  // Generate unique ID for ARIA labelledby
  const headingId = `command-title-${command.slug}`

  return (
    <section className="space-y-6" aria-labelledby={headingId}>
      {/* Command Title */}
      <h1
        id={headingId}
        className={clsx(
          // Typography (Radiant design system: 36px/24px for headings)
          'text-3xl sm:text-4xl',
          'font-bold',
          'text-gray-950',
          // Spacing
          'mb-4',
        )}
      >
        {title}
      </h1>

      {/* Command Description */}
      {description && (
        <p
          className={clsx(
            // Typography (Radiant design system: 16px for body text)
            'text-lg',
            'text-gray-600',
            'leading-relaxed',
          )}
        >
          {description}
        </p>
      )}

      {/* Frontmatter Metadata */}
      {(allowedTools.length > 0 || argumentHint) && (
        <dl className="space-y-4 border-t border-gray-200 pt-6">
          {/* Allowed Tools */}
          {allowedTools.length > 0 && (
            <div>
              <dt
                className={clsx(
                  'text-sm font-semibold text-gray-950',
                  'mb-2',
                )}
              >
                Allowed Tools
              </dt>
              <dd>
                <ul className="flex flex-wrap gap-2">
                  {allowedTools.map((tool) => (
                    <li
                      key={tool}
                      className={clsx(
                        'inline-flex items-center',
                        'px-3 py-1',
                        'bg-gray-100',
                        'border border-gray-200',
                        'rounded-full',
                        'text-sm text-gray-700',
                      )}
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          )}

          {/* Argument Hint */}
          {argumentHint && (
            <div>
              <dt
                className={clsx(
                  'text-sm font-semibold text-gray-950',
                  'mb-2',
                )}
              >
                Argument Hint
              </dt>
              <dd
                className={clsx(
                  'font-mono text-sm text-gray-700',
                  'bg-gray-100',
                  'border border-gray-200',
                  'rounded px-3 py-2',
                  'inline-block',
                )}
              >
                {argumentHint}
              </dd>
            </div>
          )}
        </dl>
      )}
    </section>
  )
}
