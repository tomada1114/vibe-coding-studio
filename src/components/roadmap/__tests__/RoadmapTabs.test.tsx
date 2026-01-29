import { render, screen, fireEvent } from '@testing-library/react'
import { RoadmapTabs } from '../RoadmapTabs'

describe('RoadmapTabs', () => {
  const mockOnCourseChange = jest.fn()

  beforeEach(() => {
    mockOnCourseChange.mockClear()
  })

  describe('rendering', () => {
    it('should render 3 tabs', () => {
      render(
        <RoadmapTabs
          activeCourse="beginner"
          onCourseChange={mockOnCourseChange}
        />
      )

      expect(screen.getByText(/完全初心者/)).toBeInTheDocument()
      expect(screen.getByText(/Web開発/)).toBeInTheDocument()
      expect(screen.getByText(/スマホアプリ/)).toBeInTheDocument()
    })

    it('should have role="tablist" on container', () => {
      render(
        <RoadmapTabs
          activeCourse="beginner"
          onCourseChange={mockOnCourseChange}
        />
      )

      expect(screen.getByRole('tablist')).toBeInTheDocument()
    })

    it('should have role="tab" on each tab', () => {
      render(
        <RoadmapTabs
          activeCourse="beginner"
          onCourseChange={mockOnCourseChange}
        />
      )

      const tabs = screen.getAllByRole('tab')
      expect(tabs).toHaveLength(3)
    })
  })

  describe('active state', () => {
    it('should mark beginner tab as selected when activeCourse is beginner', () => {
      render(
        <RoadmapTabs
          activeCourse="beginner"
          onCourseChange={mockOnCourseChange}
        />
      )

      const beginnerTab = screen.getByRole('tab', { name: /完全初心者/ })
      expect(beginnerTab).toHaveAttribute('aria-selected', 'true')
    })

    it('should mark web tab as selected when activeCourse is web', () => {
      render(
        <RoadmapTabs activeCourse="web" onCourseChange={mockOnCourseChange} />
      )

      const webTab = screen.getByRole('tab', { name: /Web開発/ })
      expect(webTab).toHaveAttribute('aria-selected', 'true')
    })

    it('should apply active styles to selected tab', () => {
      render(
        <RoadmapTabs
          activeCourse="beginner"
          onCourseChange={mockOnCourseChange}
        />
      )

      const beginnerTab = screen.getByRole('tab', { name: /完全初心者/ })
      expect(beginnerTab).toHaveClass('bg-indigo-50')
    })
  })

  describe('interaction', () => {
    it('should call onCourseChange when tab is clicked', () => {
      render(
        <RoadmapTabs
          activeCourse="beginner"
          onCourseChange={mockOnCourseChange}
        />
      )

      const webTab = screen.getByRole('tab', { name: /Web開発/ })
      fireEvent.click(webTab)

      expect(mockOnCourseChange).toHaveBeenCalledWith('web')
    })

    it('should call onCourseChange with correct courseId for each tab', () => {
      render(
        <RoadmapTabs
          activeCourse="beginner"
          onCourseChange={mockOnCourseChange}
        />
      )

      fireEvent.click(screen.getByRole('tab', { name: /スマホアプリ/ }))
      expect(mockOnCourseChange).toHaveBeenCalledWith('mobile')
    })
  })
})
