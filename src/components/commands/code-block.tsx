/**
 * CodeBlock Component
 *
 * Displays markdown file content in a code block with proper styling
 * and scrolling behavior. This component is used in the command detail
 * page to show the complete markdown content including frontmatter.
 */

import React from 'react'
import clsx from 'clsx'
import { CopyButton } from './copy-button'

export interface CodeBlockProps {
  /**
   * The code content to display.
   * Should include frontmatter if present in the original markdown file.
   */
  code: string

  /**
   * Programming language for syntax highlighting (optional).
   * Defaults to "markdown".
   */
  language?: string

  /**
   * Whether to show line numbers (optional).
   * Defaults to false.
   *
   * Note: Line numbers functionality is reserved for future enhancement.
   * Currently, this parameter is accepted but not implemented.
   */
  showLineNumbers?: boolean
}

/**
 * CodeBlock Component
 *
 * Renders code content with proper styling, scrolling, and accessibility.
 * Follows the Radiant design system with Gray-50 background and monospace font.
 *
 * @example
 * ```tsx
 * <CodeBlock
 *   code={rawContent}
 *   language="markdown"
 * />
 * ```
 */
export default function CodeBlock({ code, language = 'markdown', showLineNumbers = false }: CodeBlockProps) {
  return (
    <div
      data-testid="code-block"
      className={clsx(
        // Layout
        'relative',
        // Background and border (Radiant design system)
        'bg-gray-50',
        'border border-gray-200',
        'rounded-lg',
        // Spacing (24px padding from design system)
        'p-6',
        // Scrolling for long content
        'overflow-auto',
        'max-h-[600px]',
      )}
      aria-label={`Code block for ${language}`}
      tabIndex={0}
    >
      {/* Copy button in top-right corner */}
      <div className="absolute top-4 right-4">
        <CopyButton textToCopy={code} />
      </div>

      {/* Code content */}
      <pre
        className={clsx(
          // Typography
          'font-mono',
          'text-sm',
          'leading-relaxed',
          'text-gray-800',
          // Whitespace preservation
          'whitespace-pre',
          // Remove default margin
          'm-0',
          // Padding right to avoid overlap with copy button
          'pr-20',
        )}
      >
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  )
}
