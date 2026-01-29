import { pythonCourse } from '../python'
import { getCourseById, getAllCourses } from '../index'

describe('Python Course Data', () => {
  describe('course metadata', () => {
    it('should have correct id', () => {
      expect(pythonCourse.id).toBe('python')
    })

    it('should have correct name', () => {
      expect(pythonCourse.name).toBe('Python開発')
    })

    it('should have correct emoji', () => {
      expect(pythonCourse.emoji).toBe('🐍')
    })
  })

  describe('nodes', () => {
    it('should have 4 nodes', () => {
      expect(pythonCourse.nodes).toHaveLength(4)
    })

    it('should have 3 required nodes', () => {
      const requiredNodes = pythonCourse.nodes.filter((n) => n.isRequired)
      expect(requiredNodes).toHaveLength(3)
    })

    it('should have 1 optional node', () => {
      const optionalNodes = pythonCourse.nodes.filter((n) => !n.isRequired)
      expect(optionalNodes).toHaveLength(1)
    })

    it('should have Python focused content', () => {
      const pyNodes = pythonCourse.nodes.filter(
        (n) =>
          n.title.includes('Python') ||
          n.title.includes('Flask') ||
          n.title.includes('FastAPI')
      )
      expect(pyNodes.length).toBeGreaterThanOrEqual(3)
    })
  })

  describe('edges', () => {
    it('should have 3 edges', () => {
      expect(pythonCourse.edges).toHaveLength(3)
    })
  })

  describe('integration with index', () => {
    it('should be retrievable via getCourseById', () => {
      const course = getCourseById('python')
      expect(course).toBeDefined()
      expect(course?.id).toBe('python')
    })

    it('should be included in getAllCourses', () => {
      const courses = getAllCourses()
      expect(courses).toHaveLength(4)
      expect(courses.map((c) => c.id)).toContain('python')
    })
  })
})
