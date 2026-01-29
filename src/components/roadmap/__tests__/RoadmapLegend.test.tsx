import { render, screen } from '@testing-library/react'
import { RoadmapLegend } from '../RoadmapLegend'

describe('RoadmapLegend', () => {
  describe('rendering', () => {
    it('should display "必須講座" text', () => {
      render(<RoadmapLegend />)
      expect(screen.getByText('必須講座')).toBeInTheDocument()
    })

    it('should display "選択講座" text', () => {
      render(<RoadmapLegend />)
      expect(screen.getByText('選択講座')).toBeInTheDocument()
    })

    it('should display step number "1" for required icon', () => {
      render(<RoadmapLegend />)
      expect(screen.getByText('1')).toBeInTheDocument()
    })
  })

  describe('styling', () => {
    it('should have border-t class for top border', () => {
      const { container } = render(<RoadmapLegend />)
      const legend = container.firstChild
      expect(legend).toHaveClass('border-t')
    })

    it('should have centered items with gap', () => {
      const { container } = render(<RoadmapLegend />)
      const legend = container.firstChild
      expect(legend).toHaveClass('justify-center')
      expect(legend).toHaveClass('gap-8')
    })

    it('should have step icon with bg-indigo-600', () => {
      const { container } = render(<RoadmapLegend />)
      const stepIcon = container.querySelector('.bg-indigo-600')
      expect(stepIcon).toBeInTheDocument()
    })

    it('should have dashed border box for optional icon', () => {
      const { container } = render(<RoadmapLegend />)
      const dashedBox = container.querySelector('.border-dashed')
      expect(dashedBox).toBeInTheDocument()
    })
  })

  describe('custom className', () => {
    it('should accept custom className', () => {
      const { container } = render(<RoadmapLegend className="custom-class" />)
      const legend = container.firstChild
      expect(legend).toHaveClass('custom-class')
    })
  })
})
