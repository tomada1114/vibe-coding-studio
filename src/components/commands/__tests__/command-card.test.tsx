/**
 * CommandCard Component Tests
 *
 * Tests for the CommandCard component that displays individual commands
 * in the commands list page. Tests cover rendering, styling, navigation,
 * and accessibility features.
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import CommandCard from '@/components/commands/command-card'
import type { CommandMetadata } from '@/types/command'

/**
 * Mock Next.js Link component to enable testing without routing
 */
jest.mock('next/link', () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>
  }
})

/**
 * Sample command metadata for testing
 */
const mockCommand: CommandMetadata = {
  slug: 'convert-video',
  title: 'Convert Video',
  description: 'Convert YouTube video data from commented format to VideoMetadata TypeScript',
  allowedTools: ['Read', 'Write', 'Edit', 'Bash'],
  argumentHint: '<youtube-video-id>',
  content: '# Content',
  rawContent: '---\ndescription: test\n---\n# Content',
}

describe('CommandCard', () => {
  describe('Rendering', () => {
    it('should render command title', () => {
      render(<CommandCard command={mockCommand} />)
      expect(screen.getByText('Convert Video')).toBeInTheDocument()
    })

    it('should render command description', () => {
      render(<CommandCard command={mockCommand} />)
      expect(
        screen.getByText('Convert YouTube video data from commented format to VideoMetadata TypeScript')
      ).toBeInTheDocument()
    })

    it('should render as a clickable card element', () => {
      render(<CommandCard command={mockCommand} />)
      const link = screen.getByRole('link')
      expect(link).toBeInTheDocument()
    })
  })

  describe('Navigation', () => {
    it('should link to the correct detail page', () => {
      render(<CommandCard command={mockCommand} />)
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', '/claude-code/commands/convert-video')
    })

    it('should generate correct link for different slugs', () => {
      const anotherCommand: CommandMetadata = {
        ...mockCommand,
        slug: 'pr-description',
        title: 'Pr Description',
      }
      render(<CommandCard command={anotherCommand} />)
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', '/claude-code/commands/pr-description')
    })
  })

  describe('Styling and Design System', () => {
    it('should apply Radiant design system card styles', () => {
      const { container: dom } = render(<CommandCard command={mockCommand} />)
      const card = dom.querySelector('article')

      expect(card).toHaveClass('bg-white')
      expect(card).toHaveClass('border')
      expect(card).toHaveClass('border-gray-200')
      expect(card).toHaveClass('rounded-lg')
    })

    it('should have proper padding and spacing', () => {
      const { container } = render(<CommandCard command={mockCommand} />)
      const card = container.querySelector('article')

      expect(card).toHaveClass('p-6')
    })

    it('should have hover state styling', () => {
      const { container } = render(<CommandCard command={mockCommand} />)
      const card = container.querySelector('article')

      expect(card).toHaveClass('hover:shadow-md')
      expect(card).toHaveClass('transition-all')
    })
  })

  describe('Typography', () => {
    it('should render title with proper heading styles', () => {
      render(<CommandCard command={mockCommand} />)
      const title = screen.getByText('Convert Video')

      expect(title.tagName).toBe('H3')
      expect(title).toHaveClass('font-semibold')
      expect(title).toHaveClass('text-gray-950')
    })

    it('should render description with body text styles', () => {
      render(<CommandCard command={mockCommand} />)
      const description = screen.getByText(/Convert YouTube video data/)

      expect(description).toHaveClass('text-gray-600')
    })
  })

  describe('Accessibility', () => {
    it('should be keyboard accessible', () => {
      render(<CommandCard command={mockCommand} />)
      const link = screen.getByRole('link')

      // Link should be focusable
      expect(link).toBeVisible()
      link.focus()
      expect(link).toHaveFocus()
    })

    it('should have proper focus ring styling', () => {
      const { container } = render(<CommandCard command={mockCommand} />)
      const article = container.querySelector('article')

      expect(article).toHaveClass('focus-within:outline-none')
      expect(article).toHaveClass('focus-within:ring-2')
      expect(article).toHaveClass('focus-within:ring-gray-950')
    })

    it('should be semantic (article or similar)', () => {
      const { container } = render(<CommandCard command={mockCommand} />)
      // Card should use semantic HTML
      const semantic = container.querySelector('article')
      expect(semantic).toBeInTheDocument()
      expect(semantic).toHaveAttribute('role', 'article')
    })

    it('should have descriptive link with proper semantics', () => {
      render(<CommandCard command={mockCommand} />)
      const link = screen.getByRole('link')

      // Link is semantic and contains descriptive text
      expect(link).toBeInTheDocument()
      expect(screen.getByText('Convert Video')).toBeInTheDocument()
    })
  })

  describe('Empty or Missing Data', () => {
    it('should handle empty description gracefully', () => {
      const commandWithoutDescription: CommandMetadata = {
        ...mockCommand,
        description: '',
      }
      render(<CommandCard command={commandWithoutDescription} />)
      expect(screen.getByText('Convert Video')).toBeInTheDocument()
    })

    it('should still be clickable with empty description', () => {
      const commandWithoutDescription: CommandMetadata = {
        ...mockCommand,
        description: '',
      }
      render(<CommandCard command={commandWithoutDescription} />)
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', '/claude-code/commands/convert-video')
    })
  })

  describe('Responsive Design', () => {
    it('should have responsive text sizing', () => {
      const { container } = render(<CommandCard command={mockCommand} />)
      const title = container.querySelector('h3')

      expect(title).toHaveClass('text-base')
      expect(title).toHaveClass('sm:text-lg')
    })

    it('should use flexbox for responsive layout', () => {
      const { container } = render(<CommandCard command={mockCommand} />)
      const article = container.querySelector('article')

      expect(article).toHaveClass('flex')
      expect(article).toHaveClass('flex-col')
    })

    it('should handle touch interaction on mobile', () => {
      render(<CommandCard command={mockCommand} />)
      const link = screen.getByRole('link')

      // Link should be large enough for touch interaction
      expect(link).toBeVisible()
    })
  })

  describe('Visual Feedback', () => {
    it('should show transition effects', () => {
      const { container } = render(<CommandCard command={mockCommand} />)
      const article = container.querySelector('article')

      expect(article).toHaveClass('transition-all')
      expect(article).toHaveClass('duration-200')
    })

    it('should have smooth hover transitions', () => {
      const { container } = render(<CommandCard command={mockCommand} />)
      const article = container.querySelector('article')

      expect(article).toHaveClass('hover:border-gray-300')
      expect(article).toHaveClass('hover:shadow-md')
    })
  })
})
