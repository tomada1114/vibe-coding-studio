import { render, screen } from '@testing-library/react'
import { RoadmapFlow } from '../RoadmapFlow'
import { beginnerCourse } from '@/data/roadmaps/beginner'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({
      children,
      ...props
    }: {
      children: React.ReactNode
      [key: string]: unknown
    }) => {
      // Remove framer-motion specific props
      const {
        initial: _initial,
        animate: _animate,
        exit: _exit,
        transition: _transition,
        ...restProps
      } = props
      return <div {...restProps}>{children}</div>
    },
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}))

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}))

describe('RoadmapFlow', () => {
  describe('rendering', () => {
    it('should render all nodes from course', () => {
      render(<RoadmapFlow course={beginnerCourse} />)

      beginnerCourse.nodes.forEach((node) => {
        expect(screen.getByText(node.title)).toBeInTheDocument()
      })
    })

    it('should not render step numbers', () => {
      render(<RoadmapFlow course={beginnerCourse} />)

      for (let i = 1; i <= beginnerCourse.nodes.length; i++) {
        expect(screen.queryByText(String(i))).not.toBeInTheDocument()
      }
    })
  })

  describe('layout', () => {
    it('should have flex column layout for nodes', () => {
      const { container } = render(<RoadmapFlow course={beginnerCourse} />)
      const nodesContainer = container.querySelector('.flex-col')
      expect(nodesContainer).toBeInTheDocument()
    })

    it('should center nodes horizontally', () => {
      const { container } = render(<RoadmapFlow course={beginnerCourse} />)
      const nodesContainer = container.querySelector('.items-center')
      expect(nodesContainer).toBeInTheDocument()
    })
  })

  describe('edge rendering', () => {
    it('should render edge component', () => {
      const { container } = render(<RoadmapFlow course={beginnerCourse} />)
      const svg = container.querySelector('svg')
      expect(svg).toBeInTheDocument()
    })
  })

  describe('custom className', () => {
    it('should accept custom className', () => {
      const { container } = render(
        <RoadmapFlow course={beginnerCourse} className="custom-class" />
      )
      expect(container.firstChild).toHaveClass('custom-class')
    })
  })
})
