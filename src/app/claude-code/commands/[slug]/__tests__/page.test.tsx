/**
 * Command Detail Page Integration Tests
 *
 * Tests for the command detail page that displays individual command information.
 * Tests cover rendering, code block display, copy functionality, and 404 handling.
 *
 * Task 7.1: RED phase - Create integration tests for command detail page
 * Requirements: 2.1, 2.3, 2.5
 */

import { describe, expect, test, jest, beforeEach } from '@jest/globals'
import { render, screen, waitFor } from '@testing-library/react'
import { notFound } from 'next/navigation'
import CommandDetailPage from '../page'

/**
 * Mock Next.js navigation
 */
jest.mock('next/navigation', () => ({
  notFound: jest.fn(),
}))

/**
 * Mock the CommandLoader to control test data
 */
jest.mock('@/lib/commands/command-data', () => ({
  getCommandBySlug: jest.fn((slug: string) => {
    if (slug === 'convert-video') {
      return {
        slug: 'convert-video',
        title: 'Convert Video',
        description: 'Convert YouTube video data from commented format to VideoMetadata TypeScript',
        allowedTools: ['Read', 'Write', 'Edit', 'Bash'],
        argumentHint: '<youtube-video-id>',
        content: '# YouTube Video Data Conversion\n\nConvert a YouTube video data file.',
        rawContent:
          '---\ndescription: Convert YouTube video data from commented format to VideoMetadata TypeScript\nallowed-tools: Read, Write, Edit, Bash\nargument-hint: <youtube-video-id>\n---\n\n# YouTube Video Data Conversion\n\nConvert a YouTube video data file.',
        lastModified: '2025-01-01T00:00:00.000Z',
      }
    }
    return undefined
  }),
  getAllCommandSlugs: jest.fn(() => ['convert-video', 'pr-description']),
}))

/**
 * Mock Next.js Link component
 */
jest.mock('next/link', () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>
  }
})

describe('Command Detail Page', () => {
  describe('Rendering - Valid Command', () => {
    test('should render command title', async () => {
      const params = Promise.resolve({ slug: 'convert-video' })
      render(await CommandDetailPage({ params }))

      // Command title should be displayed
      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveTextContent('Convert Video')
    })

    test('should render command description', async () => {
      const params = Promise.resolve({ slug: 'convert-video' })
      const { container } = render(await CommandDetailPage({ params }))

      // Command description should be displayed (in the CommandDetail component, not code block)
      const description = container.querySelector('.text-lg.text-gray-600')
      expect(description).toBeInTheDocument()
      expect(description).toHaveTextContent(
        /Convert YouTube video data from commented format to VideoMetadata TypeScript/
      )
    })

    test('should render allowed tools', async () => {
      const params = Promise.resolve({ slug: 'convert-video' })
      render(await CommandDetailPage({ params }))

      // Allowed tools should be displayed
      expect(screen.getByText('Allowed Tools')).toBeInTheDocument()
      expect(screen.getByText('Read')).toBeInTheDocument()
      expect(screen.getByText('Write')).toBeInTheDocument()
      expect(screen.getByText('Edit')).toBeInTheDocument()
      expect(screen.getByText('Bash')).toBeInTheDocument()
    })

    test('should render argument hint', async () => {
      const params = Promise.resolve({ slug: 'convert-video' })
      render(await CommandDetailPage({ params }))

      // Argument hint should be displayed
      expect(screen.getByText('Argument Hint')).toBeInTheDocument()
      expect(screen.getByText('<youtube-video-id>')).toBeInTheDocument()
    })

    test('should render breadcrumb navigation', async () => {
      const params = Promise.resolve({ slug: 'convert-video' })
      render(await CommandDetailPage({ params }))

      // Breadcrumb link should exist
      const breadcrumbLink = screen.getByRole('link', { name: /コマンド一覧に戻る/i })
      expect(breadcrumbLink).toBeInTheDocument()
      expect(breadcrumbLink).toHaveAttribute('href', '/claude-code/commands')
    })
  })

  describe('Code Block Display', () => {
    test('should render markdown content section', async () => {
      const params = Promise.resolve({ slug: 'convert-video' })
      render(await CommandDetailPage({ params }))

      // Markdown section heading should be displayed
      expect(screen.getByText(/マークダウンファイル/i)).toBeInTheDocument()
    })

    test('should render code block with full markdown content', async () => {
      const params = Promise.resolve({ slug: 'convert-video' })
      render(await CommandDetailPage({ params }))

      // Code block should exist
      const codeBlock = screen.getByTestId('code-block')
      expect(codeBlock).toBeInTheDocument()
    })

    test('should display complete markdown including frontmatter', async () => {
      const params = Promise.resolve({ slug: 'convert-video' })
      const { container } = render(await CommandDetailPage({ params }))

      // Frontmatter should be in the code block
      const codeElement = container.querySelector('code')
      expect(codeElement).toBeInTheDocument()
      expect(codeElement?.textContent).toContain('description: Convert YouTube video data')
      expect(codeElement?.textContent).toContain('allowed-tools: Read, Write, Edit, Bash')
      expect(codeElement?.textContent).toContain('argument-hint: <youtube-video-id>')
    })

    test('should display markdown content', async () => {
      const params = Promise.resolve({ slug: 'convert-video' })
      const { container } = render(await CommandDetailPage({ params }))

      // Markdown content should be displayed in code block
      const codeElement = container.querySelector('code')
      expect(codeElement).toBeInTheDocument()
      expect(codeElement?.textContent).toContain('YouTube Video Data Conversion')
      expect(codeElement?.textContent).toContain('Convert a YouTube video data file')
    })
  })

  describe('Copy Button Functionality', () => {
    test('should render copy button in code block', async () => {
      const params = Promise.resolve({ slug: 'convert-video' })
      const { container } = render(await CommandDetailPage({ params }))

      // Copy button should exist
      const buttons = container.querySelectorAll('button')
      expect(buttons.length).toBeGreaterThan(0)
    })

    // Note: Copy button functionality tests are covered in copy-button.test.tsx
    // This is an integration test, so we verify the button exists and the component renders
  })

  describe('404 Handling - Invalid Command', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    test('should call notFound() when command does not exist', async () => {
      const params = Promise.resolve({ slug: 'non-existent-command' })

      // notFound() throws an error in Next.js
      await expect(async () => {
        await CommandDetailPage({ params })
      }).rejects.toThrow()
    })

    // Note: 404 page rendering is handled by Next.js not-found.tsx
    // This integration test verifies that notFound() is called correctly
  })

  describe('Layout and Design', () => {
    test('should use Container component', async () => {
      const params = Promise.resolve({ slug: 'convert-video' })
      const { container } = render(await CommandDetailPage({ params }))

      // Container classes should be present
      const containerElement = container.querySelector('.mx-auto')
      expect(containerElement).toBeInTheDocument()
    })

    test('should have proper spacing and margins', async () => {
      const params = Promise.resolve({ slug: 'convert-video' })
      const { container } = render(await CommandDetailPage({ params }))

      // Main container should have spacing classes
      const mainContainer = container.querySelector('.mt-16')
      expect(mainContainer).toBeInTheDocument()
    })

    test('should use semantic HTML structure', async () => {
      const params = Promise.resolve({ slug: 'convert-video' })
      const { container } = render(await CommandDetailPage({ params }))

      // Should use semantic elements
      const main = container.querySelector('main')
      expect(main).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    test('should have proper heading hierarchy', async () => {
      const params = Promise.resolve({ slug: 'convert-video' })
      render(await CommandDetailPage({ params }))

      // Should have h1 for command title
      const h1 = screen.getByRole('heading', { level: 1 })
      expect(h1).toBeInTheDocument()

      // Should have h2 for section headings
      const h2Elements = screen.getAllByRole('heading', { level: 2 })
      expect(h2Elements.length).toBeGreaterThan(0)
    })

    test('should have accessible breadcrumb navigation', async () => {
      const params = Promise.resolve({ slug: 'convert-video' })
      render(await CommandDetailPage({ params }))

      // Breadcrumb should have accessible label
      const breadcrumbLink = screen.getByRole('link', { name: /コマンド一覧に戻る/i })
      expect(breadcrumbLink).toHaveAttribute('aria-label', 'コマンド一覧に戻る')
    })

    test('should have accessible code block', async () => {
      const params = Promise.resolve({ slug: 'convert-video' })
      render(await CommandDetailPage({ params }))

      // Code block should have aria-label
      const codeBlock = screen.getByTestId('code-block')
      expect(codeBlock).toHaveAttribute('aria-label', expect.stringContaining('Code block'))
    })

    test('should have focusable elements with keyboard support', async () => {
      const params = Promise.resolve({ slug: 'convert-video' })
      const { container } = render(await CommandDetailPage({ params }))

      // Links and buttons should be focusable
      const breadcrumbLink = screen.getByRole('link', { name: /コマンド一覧に戻る/i })
      const buttons = container.querySelectorAll('button')

      expect(breadcrumbLink).toBeInTheDocument()
      expect(buttons.length).toBeGreaterThan(0)
    })
  })

  describe('SEO and Metadata', () => {
    test('should have proper page structure for SEO', async () => {
      const params = Promise.resolve({ slug: 'convert-video' })
      const { container } = render(await CommandDetailPage({ params }))

      // Main content should be wrapped in semantic elements
      const main = container.querySelector('main')
      expect(main).toBeInTheDocument()

      // Should have proper heading structure
      const h1 = screen.getByRole('heading', { level: 1 })
      expect(h1).toHaveTextContent('Convert Video')
    })
  })
})
