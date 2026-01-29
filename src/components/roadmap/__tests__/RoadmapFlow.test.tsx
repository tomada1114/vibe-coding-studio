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
      const framerMotionKeys = new Set([
        'initial',
        'animate',
        'exit',
        'transition',
      ])
      const filteredProps = Object.fromEntries(
        Object.entries(props).filter(([key]) => !framerMotionKeys.has(key))
      )
      return <div {...filteredProps}>{children}</div>
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
    it('should render edge connectors between nodes', () => {
      const { container } = render(<RoadmapFlow course={beginnerCourse} />)
      const edgeSvgs = container.querySelectorAll('svg[aria-hidden="true"]')
      expect(edgeSvgs.length).toBe(beginnerCourse.nodes.length - 1)
    })

    it('should not render edge for single-node course', () => {
      const singleNodeCourse = {
        ...beginnerCourse,
        id: 'beginner' as const,
        nodes: [beginnerCourse.nodes[0]],
      }
      const { container } = render(<RoadmapFlow course={singleNodeCourse} />)
      const edgeSvgs = container.querySelectorAll('svg[aria-hidden="true"]')
      expect(edgeSvgs.length).toBe(0)
    })
  })

  describe('empty course', () => {
    it('should render without error for empty nodes', () => {
      const emptyCourse = {
        ...beginnerCourse,
        id: 'beginner' as const,
        nodes: [],
      }
      const { container } = render(<RoadmapFlow course={emptyCourse} />)
      expect(container.querySelector('svg')).not.toBeInTheDocument()
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
