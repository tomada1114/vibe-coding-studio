import { webCourse } from '../web'
import { getCourseById } from '../index'

describe('Web Course Data', () => {
  describe('course metadata', () => {
    it('should have correct id', () => {
      expect(webCourse.id).toBe('web')
    })

    it('should have correct name', () => {
      expect(webCourse.name).toBe('Web開発')
    })

    it('should have correct emoji', () => {
      expect(webCourse.emoji).toBe('🌐')
    })
  })

  describe('nodes', () => {
    it('should have 4 nodes', () => {
      expect(webCourse.nodes).toHaveLength(4)
    })

    it('should have all required nodes', () => {
      const requiredNodes = webCourse.nodes.filter((n) => n.isRequired)
      expect(requiredNodes).toHaveLength(4)
    })

    it('should have unique node IDs', () => {
      const ids = webCourse.nodes.map((n) => n.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(ids.length)
    })
  })

  describe('edges', () => {
    it('should have 3 edges', () => {
      expect(webCourse.edges).toHaveLength(3)
    })
  })

  describe('integration with index', () => {
    it('should be retrievable via getCourseById', () => {
      const course = getCourseById('web')
      expect(course).toBeDefined()
      expect(course?.id).toBe('web')
    })
  })
})
