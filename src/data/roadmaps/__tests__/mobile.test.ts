import { mobileCourse } from '../mobile'
import { getCourseById } from '../index'

describe('Mobile Course Data', () => {
  describe('course metadata', () => {
    it('should have correct id', () => {
      expect(mobileCourse.id).toBe('mobile')
    })

    it('should have correct name', () => {
      expect(mobileCourse.name).toBe('スマホアプリ')
    })

    it('should have correct emoji', () => {
      expect(mobileCourse.emoji).toBe('📱')
    })
  })

  describe('nodes', () => {
    it('should have 3 nodes', () => {
      expect(mobileCourse.nodes).toHaveLength(3)
    })

    it('should have React Native focused content', () => {
      const rnNodes = mobileCourse.nodes.filter(
        (n) => n.title.includes('React Native') || n.title.includes('Expo')
      )
      expect(rnNodes.length).toBeGreaterThanOrEqual(2)
    })
  })

  describe('edges', () => {
    it('should have 2 edges', () => {
      expect(mobileCourse.edges).toHaveLength(2)
    })
  })

  describe('integration with index', () => {
    it('should be retrievable via getCourseById', () => {
      const course = getCourseById('mobile')
      expect(course).toBeDefined()
      expect(course?.id).toBe('mobile')
    })
  })
})
