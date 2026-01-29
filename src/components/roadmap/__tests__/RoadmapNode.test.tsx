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
  const introNode: RoadmapNodeType = {
    id: 'test-intro',
    title: 'Claude Code × Vibe Coding 入門',
    description: 'プログラミング未経験からスタート',
    roadmapDescription:
      'AI駆動開発の第一歩。Claude Codeの使い方とReactの基礎を学びます。',
    difficulty: 'beginner',
    category: 'intro',
    link: { type: 'coupon', url: '/coupons/claude-code-vibe-coding' },
  }

  const externalNode: RoadmapNodeType = {
    id: 'test-external',
    title: '外部リンク講座',
    description: '外部サイトへ',
    roadmapDescription: '外部サイトで学習を進めます。',
    difficulty: 'advanced',
    category: 'advanced',
    link: { type: 'external', url: 'https://www.udemy.com/course/test' },
  }

  const zennNode: RoadmapNodeType = {
    id: 'test-zenn',
    title: 'Zenn記事',
    description: 'Zennで学ぶ',
    roadmapDescription: 'Zenn記事で学習を進めます。',
    difficulty: 'intermediate',
    category: 'basic',
    link: { type: 'zenn', url: 'https://zenn.dev/test/articles/test' },
  }

  const blogNode: RoadmapNodeType = {
    id: 'test-blog',
    title: 'ブログ記事',
    description: 'ブログで学ぶ',
    roadmapDescription: 'ブログ記事で学習を進めます。',
    difficulty: 'beginner',
    category: 'basic',
    link: { type: 'blog', url: '/blog/test-article' },
  }

  const videoNode: RoadmapNodeType = {
    id: 'test-video',
    title: '動画講座',
    description: '動画で学ぶ',
    roadmapDescription: '動画で学習を進めます。',
    difficulty: 'beginner',
    category: 'intro',
    link: { type: 'video', url: '/videos/test-video' },
  }

  beforeEach(() => {
    mockPush.mockClear()
    mockOpen.mockClear()
  })

  describe('rendering', () => {
    it('should display title and roadmapDescription', () => {
      render(<RoadmapNode node={introNode} />)
      expect(screen.getByText(introNode.title)).toBeInTheDocument()
      expect(
        screen.getByText(introNode.roadmapDescription)
      ).toBeInTheDocument()
    })

    it('should display difficulty badge', () => {
      render(<RoadmapNode node={introNode} />)
      expect(screen.getByText('初級')).toBeInTheDocument()
    })

    it('should display CTA text as 学習を開始する', () => {
      render(<RoadmapNode node={introNode} />)
      expect(screen.getByText('学習を開始する')).toBeInTheDocument()
    })

    it('should not display step number', () => {
      render(<RoadmapNode node={introNode} />)
      expect(screen.queryByText('1')).not.toBeInTheDocument()
    })

    it('should not display category badge', () => {
      render(<RoadmapNode node={introNode} />)
      expect(screen.queryByText(/入門講座/)).not.toBeInTheDocument()
      expect(screen.queryByText(/📘/)).not.toBeInTheDocument()
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
        const node = { ...introNode, difficulty }
        render(<RoadmapNode node={node} />)
        const badge = screen.getByText(label)
        expect(badge).toHaveClass(expectedClass)
      }
    )
  })

  describe('navigation', () => {
    it('should navigate to internal URL on click for coupon link', () => {
      render(<RoadmapNode node={introNode} />)
      const article = screen.getByRole('article')
      fireEvent.click(article)
      expect(mockPush).toHaveBeenCalledWith('/coupons/claude-code-vibe-coding')
    })

    it('should open new tab for external link', () => {
      render(<RoadmapNode node={externalNode} />)
      const article = screen.getByRole('article')
      fireEvent.click(article)
      expect(mockOpen).toHaveBeenCalledWith(
        'https://www.udemy.com/course/test',
        '_blank',
        'noopener,noreferrer'
      )
    })

    it('should open new tab for zenn link', () => {
      render(<RoadmapNode node={zennNode} />)
      const article = screen.getByRole('article')
      fireEvent.click(article)
      expect(mockOpen).toHaveBeenCalledWith(
        'https://zenn.dev/test/articles/test',
        '_blank',
        'noopener,noreferrer'
      )
    })

    it('should navigate internally for blog link', () => {
      render(<RoadmapNode node={blogNode} />)
      const article = screen.getByRole('article')
      fireEvent.click(article)
      expect(mockPush).toHaveBeenCalledWith('/blog/test-article')
    })

    it('should navigate internally for video link', () => {
      render(<RoadmapNode node={videoNode} />)
      const article = screen.getByRole('article')
      fireEvent.click(article)
      expect(mockPush).toHaveBeenCalledWith('/videos/test-video')
    })
  })

  describe('keyboard navigation', () => {
    it('should navigate on Enter key for internal link', () => {
      render(<RoadmapNode node={introNode} />)
      const article = screen.getByRole('article')
      fireEvent.keyDown(article, { key: 'Enter' })
      expect(mockPush).toHaveBeenCalledWith('/coupons/claude-code-vibe-coding')
    })

    it('should navigate on Space key for internal link', () => {
      render(<RoadmapNode node={introNode} />)
      const article = screen.getByRole('article')
      fireEvent.keyDown(article, { key: ' ' })
      expect(mockPush).toHaveBeenCalledWith('/coupons/claude-code-vibe-coding')
    })

    it('should open new tab on Enter key for external link', () => {
      render(<RoadmapNode node={externalNode} />)
      const article = screen.getByRole('article')
      fireEvent.keyDown(article, { key: 'Enter' })
      expect(mockOpen).toHaveBeenCalledWith(
        'https://www.udemy.com/course/test',
        '_blank',
        'noopener,noreferrer'
      )
    })

    it('should not navigate on other keys', () => {
      render(<RoadmapNode node={introNode} />)
      const article = screen.getByRole('article')
      fireEvent.keyDown(article, { key: 'Tab' })
      fireEvent.keyDown(article, { key: 'Escape' })
      expect(mockPush).not.toHaveBeenCalled()
      expect(mockOpen).not.toHaveBeenCalled()
    })
  })

  describe('accessibility', () => {
    it('should have role="article" for semantic structure', () => {
      render(<RoadmapNode node={introNode} />)
      expect(screen.getByRole('article')).toBeInTheDocument()
    })

    it('should be focusable', () => {
      render(<RoadmapNode node={introNode} />)
      const article = screen.getByRole('article')
      expect(article).toHaveAttribute('tabIndex', '0')
    })
  })
})
