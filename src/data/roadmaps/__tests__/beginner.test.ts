import { beginnerCourse } from '../beginner'
import { getCourseById } from '../index'

describe('Beginner Course Data', () => {
  describe('course metadata', () => {
    it('should have correct id', () => {
      expect(beginnerCourse.id).toBe('beginner')
    })

    it('should have correct name', () => {
      expect(beginnerCourse.name).toBe('完全初心者')
    })

    it('should have correct emoji', () => {
      expect(beginnerCourse.emoji).toBe('🚀')
    })

    it('should have description', () => {
      expect(beginnerCourse.description).toBeTruthy()
    })
  })

  describe('nodes', () => {
    it('should have 4 nodes', () => {
      expect(beginnerCourse.nodes).toHaveLength(4)
    })

    it('should have first node as vibe-coding-intro', () => {
      expect(beginnerCourse.nodes[0].id).toBe('vibe-coding-intro')
    })

    it('should have all nodes with valid link URLs', () => {
      beginnerCourse.nodes.forEach((node) => {
        expect(node.link.url).toMatch(/^\/coupons\//)
      })
    })

    it('should have unique node IDs', () => {
      const ids = beginnerCourse.nodes.map((n) => n.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(ids.length)
    })
  })

  describe('edges', () => {
    it('should have 3 edges', () => {
      expect(beginnerCourse.edges).toHaveLength(3)
    })

    it('should have edges referencing valid node IDs', () => {
      const nodeIds = beginnerCourse.nodes.map((n) => n.id)
      beginnerCourse.edges.forEach((edge) => {
        expect(nodeIds).toContain(edge.from)
        expect(nodeIds).toContain(edge.to)
      })
    })

    it('should start from vibe-coding-intro', () => {
      const firstEdge = beginnerCourse.edges[0]
      expect(firstEdge.from).toBe('vibe-coding-intro')
    })
  })

  describe('integration with index', () => {
    it('should be retrievable via getCourseById', () => {
      const course = getCourseById('beginner')
      expect(course).toBeDefined()
      expect(course?.id).toBe('beginner')
    })
  })
})
