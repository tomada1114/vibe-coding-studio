import { render, screen, fireEvent } from '@testing-library/react'
import { RoadmapNode } from '../RoadmapNode'
import type { RoadmapNode as RoadmapNodeType } from '@/data/roadmaps'

// Mock next/navigation
const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}))

// Mock window.open
const mockOpen = jest.fn()
Object.defineProperty(window, 'open', {
  value: mockOpen,
  writable: true,
})

describe('RoadmapNode', () => {
  const requiredNode: RoadmapNodeType = {
    id: 'test-required',
    title: 'Claude Code × Vibe Coding 入門',
    description: 'プログラミング未経験からスタート',
    difficulty: 'beginner',
    category: 'intro',
    link: { type: 'coupon', url: '/coupons/claude-code-vibe-coding' },
    isRequired: true,
  }

  const optionalNode: RoadmapNodeType = {
    id: 'test-optional',
    title: 'MCP完全攻略',
    description: '5つの最新MCPツール',
    difficulty: 'intermediate',
    category: 'optional',
    link: { type: 'coupon', url: '/coupons/claude-code-mcp-nextjs' },
    isRequired: false,
  }

  const externalNode: RoadmapNodeType = {
    id: 'test-external',
    title: '外部リンク講座',
    description: '外部サイトへ',
    difficulty: 'advanced',
    category: 'advanced',
    link: { type: 'external', url: 'https://www.udemy.com/course/test' },
    isRequired: true,
  }

  beforeEach(() => {
    mockPush.mockClear()
    mockOpen.mockClear()
  })

  describe('rendering - required node', () => {
    it('should display step number when stepNumber is provided', () => {
      render(<RoadmapNode node={requiredNode} stepNumber={1} />)
      expect(screen.getByText('1')).toBeInTheDocument()
    })

    it('should display title and description', () => {
      render(<RoadmapNode node={requiredNode} stepNumber={1} />)
      expect(screen.getByText(requiredNode.title)).toBeInTheDocument()
      expect(screen.getByText(requiredNode.description)).toBeInTheDocument()
    })

    it('should display category badge with correct emoji', () => {
      render(<RoadmapNode node={requiredNode} stepNumber={1} />)
      expect(screen.getByText(/📘/)).toBeInTheDocument()
      expect(screen.getByText(/入門講座/)).toBeInTheDocument()
    })

    it('should display difficulty badge', () => {
      render(<RoadmapNode node={requiredNode} stepNumber={1} />)
      expect(screen.getByText('初級')).toBeInTheDocument()
    })
  })

  describe('rendering - optional node', () => {
    it('should display "選択" badge', () => {
      render(<RoadmapNode node={optionalNode} />)
      expect(screen.getByText('選択')).toBeInTheDocument()
    })

    it('should not display step number', () => {
      render(<RoadmapNode node={optionalNode} />)
      // Step number should not be rendered for optional nodes
      expect(screen.queryByText(/^[0-9]$/)).not.toBeInTheDocument()
    })

    it('should have dashed border class', () => {
      const { container } = render(<RoadmapNode node={optionalNode} />)
      const article = container.querySelector('article')
      expect(article).toHaveClass('border-dashed')
    })
  })

  describe('difficulty badges', () => {
    it.each([
      ['beginner', '初級', 'bg-green-50'],
      ['intermediate', '中級', 'bg-yellow-50'],
      ['intermediate-advanced', '中〜上級', 'bg-orange-50'],
      ['advanced', '上級', 'bg-red-50'],
    ] as const)(
      'should display %s as %s with correct style',
      (difficulty, label, expectedClass) => {
        const node = { ...requiredNode, difficulty }
        render(<RoadmapNode node={node} stepNumber={1} />)
        const badge = screen.getByText(label)
        expect(badge).toHaveClass(expectedClass)
      }
    )
  })

  describe('navigation', () => {
    it('should navigate to internal URL on click for coupon link', () => {
      render(<RoadmapNode node={requiredNode} stepNumber={1} />)
      const article = screen.getByRole('article')
      fireEvent.click(article)
      expect(mockPush).toHaveBeenCalledWith('/coupons/claude-code-vibe-coding')
    })

    it('should open new tab for external link', () => {
      render(<RoadmapNode node={externalNode} stepNumber={1} />)
      const article = screen.getByRole('article')
      fireEvent.click(article)
      expect(mockOpen).toHaveBeenCalledWith(
        'https://www.udemy.com/course/test',
        '_blank'
      )
    })
  })

  describe('accessibility', () => {
    it('should have role="article" for semantic structure', () => {
      render(<RoadmapNode node={requiredNode} stepNumber={1} />)
      expect(screen.getByRole('article')).toBeInTheDocument()
    })

    it('should be focusable', () => {
      render(<RoadmapNode node={requiredNode} stepNumber={1} />)
      const article = screen.getByRole('article')
      expect(article).toHaveAttribute('tabIndex', '0')
    })
  })
})
