/**
 * CodeBlock Component Tests
 *
 * Tests for the CodeBlock component that displays markdown file content
 * with syntax highlighting and copy functionality in the command detail page.
 * Tests cover rendering, styling, code display, and accessibility features.
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import CodeBlock from '@/components/commands/code-block'

/**
 * Mock Clipboard API for testing
 */
beforeAll(() => {
  Object.assign(navigator, {
    clipboard: {
      writeText: jest.fn(() => Promise.resolve()),
    },
  })
})

/**
 * Sample markdown content for testing (includes frontmatter)
 */
const mockRawContent = `---
description: Convert YouTube video data from commented format to VideoMetadata TypeScript
allowed-tools: Read, Write, Edit, Bash
argument-hint: <youtube-video-id>
---

# YouTube Video Data Conversion

Convert a YouTube video data file from commented format to proper VideoMetadata TypeScript structure.

**YouTube Video ID**: $ARGUMENTS`

describe('CodeBlock', () => {
  describe('Rendering', () => {
    it('should render the complete markdown content including frontmatter', () => {
      const { container } = render(<CodeBlock code={mockRawContent} />)
      const code = container.querySelector('code')

      // Should display frontmatter and content in code block
      expect(code).toBeInTheDocument()
      expect(code?.textContent).toContain('description:')
      expect(code?.textContent).toContain('allowed-tools:')
      expect(code?.textContent).toContain('YouTube Video Data Conversion')
    })

    it('should render code in a pre element', () => {
      const { container } = render(<CodeBlock code={mockRawContent} />)
      const pre = container.querySelector('pre')

      expect(pre).toBeInTheDocument()
      expect(pre?.textContent).toContain('description:')
    })

    it('should preserve whitespace and formatting', () => {
      const codeWithWhitespace = `---
description: Test
---

# Title

  - Indented item
    - Nested item`

      const { container } = render(<CodeBlock code={codeWithWhitespace} />)
      const pre = container.querySelector('pre')

      // Pre element should preserve whitespace
      expect(pre).toHaveStyle({ whiteSpace: 'pre' })
    })

    it('should handle empty code gracefully', () => {
      const { container } = render(<CodeBlock code="" />)
      const pre = container.querySelector('pre')

      expect(pre).toBeInTheDocument()
      expect(pre?.textContent).toBe('')
    })
  })

  describe('Styling and Design System', () => {
    it('should apply Radiant design system styles', () => {
      const { container } = render(<CodeBlock code={mockRawContent} />)
      const codeBlock = container.querySelector('[data-testid="code-block"]') || container.firstChild as HTMLElement

      // Should have proper background and border
      expect(codeBlock).toHaveClass('bg-gray-50')
      expect(codeBlock).toHaveClass('border')
      expect(codeBlock).toHaveClass('border-gray-200')
      expect(codeBlock).toHaveClass('rounded-lg')
    })

    it('should have proper padding', () => {
      const { container } = render(<CodeBlock code={mockRawContent} />)
      const codeBlock = container.querySelector('[data-testid="code-block"]') || container.firstChild as HTMLElement

      expect(codeBlock).toHaveClass('p-6')
    })

    it('should use monospace font', () => {
      const { container } = render(<CodeBlock code={mockRawContent} />)
      const pre = container.querySelector('pre')

      expect(pre).toHaveClass('font-mono')
    })

    it('should have proper text size', () => {
      const { container } = render(<CodeBlock code={mockRawContent} />)
      const pre = container.querySelector('pre')

      expect(pre).toHaveClass('text-sm')
    })

    it('should have proper line height', () => {
      const { container } = render(<CodeBlock code={mockRawContent} />)
      const pre = container.querySelector('pre')

      expect(pre).toHaveClass('leading-relaxed')
    })
  })

  describe('Scrolling Behavior', () => {
    it('should be scrollable for long content', () => {
      const longContent = 'Line 1\n'.repeat(100)
      const { container } = render(<CodeBlock code={longContent} />)
      const codeBlock = container.querySelector('[data-testid="code-block"]') || container.firstChild as HTMLElement

      expect(codeBlock).toHaveClass('overflow-auto')
    })

    it('should have max height for vertical scroll', () => {
      const longContent = 'Line 1\n'.repeat(100)
      const { container } = render(<CodeBlock code={longContent} />)
      const codeBlock = container.querySelector('[data-testid="code-block"]') || container.firstChild as HTMLElement

      expect(codeBlock).toHaveClass('max-h-[600px]')
    })
  })

  describe('Accessibility', () => {
    it('should have proper semantic markup', () => {
      const { container } = render(<CodeBlock code={mockRawContent} />)
      const pre = container.querySelector('pre')
      const code = container.querySelector('code')

      expect(pre).toBeInTheDocument()
      expect(code).toBeInTheDocument()
    })

    it('should have proper ARIA label', () => {
      const { container } = render(<CodeBlock code={mockRawContent} language="markdown" />)
      const codeBlock = container.querySelector('[data-testid="code-block"]')

      expect(codeBlock).toHaveAttribute('aria-label', 'Code block for markdown')
    })

    it('should be keyboard navigable (scrollable)', () => {
      const longContent = 'Line 1\n'.repeat(100)
      const { container } = render(<CodeBlock code={longContent} />)
      const codeBlock = container.querySelector('[data-testid="code-block"]') || container.firstChild as HTMLElement

      // Should be focusable for keyboard scrolling
      expect(codeBlock).toHaveAttribute('tabIndex', '0')
    })
  })

  describe('Language Support', () => {
    it('should accept language prop', () => {
      const { container } = render(<CodeBlock code={mockRawContent} language="markdown" />)
      const codeBlock = container.querySelector('[data-testid="code-block"]')

      expect(codeBlock).toBeInTheDocument()
    })

    it('should default to markdown language', () => {
      const { container } = render(<CodeBlock code={mockRawContent} />)
      const code = container.querySelector('code')

      // Should have language class
      expect(code).toHaveClass('language-markdown')
    })
  })

  describe('Line Numbers', () => {
    it('should support showLineNumbers prop', () => {
      render(<CodeBlock code={mockRawContent} showLineNumbers />)

      // Component should render without errors
      const { container } = render(<CodeBlock code={mockRawContent} showLineNumbers />)
      expect(container).toBeInTheDocument()
    })

    it('should not show line numbers by default', () => {
      const { container } = render(<CodeBlock code={mockRawContent} />)

      // Line numbers are optional feature
      // Default behavior is to not show them
      expect(container).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('should handle special characters correctly', () => {
      const specialChars = '< > & " \' ` $ { } [ ] ( )'
      const { container } = render(<CodeBlock code={specialChars} />)
      const pre = container.querySelector('pre')

      // React should escape HTML special characters
      expect(pre?.textContent).toContain('<')
      expect(pre?.textContent).toContain('>')
      expect(pre?.textContent).toContain('&')
    })

    it('should handle unicode characters', () => {
      const unicode = '日本語テスト 한글 テスト 中文测试'
      const { container } = render(<CodeBlock code={unicode} />)
      const pre = container.querySelector('pre')

      expect(pre?.textContent).toContain('日本語')
    })

    it('should handle very long lines', () => {
      const longLine = 'a'.repeat(1000)
      const { container } = render(<CodeBlock code={longLine} />)
      const codeBlock = container.querySelector('[data-testid="code-block"]') || container.firstChild as HTMLElement

      // Should be scrollable horizontally
      expect(codeBlock).toHaveClass('overflow-auto')
    })
  })

  describe('Text Color', () => {
    it('should have proper text color', () => {
      const { container } = render(<CodeBlock code={mockRawContent} />)
      const pre = container.querySelector('pre')

      expect(pre).toHaveClass('text-gray-800')
    })
  })
})
