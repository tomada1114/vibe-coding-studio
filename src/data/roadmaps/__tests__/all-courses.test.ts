import { courseIds, getAllCourses, getCourseById } from "../index"

describe("All Courses Integration", () => {
  it("should have 2 courses", () => {
    const courses = getAllCourses()
    expect(courses).toHaveLength(2)
  })

  it("should have all courseIds retrievable", () => {
    courseIds.forEach(id => {
      const course = getCourseById(id)
      expect(course).toBeDefined()
      expect(course?.id).toBe(id)
    })
  })

  it("should have unique course IDs", () => {
    const courses = getAllCourses()
    const ids = courses.map(c => c.id)
    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(ids.length)
  })

  it("should have all courses with valid structure", () => {
    const courses = getAllCourses()
    courses.forEach(course => {
      expect(course.id).toBeTruthy()
      expect(course.name).toBeTruthy()
      expect(course.emoji).toBeTruthy()
      expect(course.nodes.length).toBeGreaterThan(0)
    })
  })

  it("should have all node IDs unique within each course", () => {
    const courses = getAllCourses()
    courses.forEach(course => {
      const nodeIds = course.nodes.map(n => n.id)
      const uniqueNodeIds = new Set(nodeIds)
      expect(uniqueNodeIds.size).toBe(nodeIds.length)
    })
  })

  it("should have roadmapDescription for all nodes", () => {
    const courses = getAllCourses()
    courses.forEach(course => {
      course.nodes.forEach(node => {
        expect(node.roadmapDescription).toBeTruthy()
        expect(typeof node.roadmapDescription).toBe("string")
        expect(node.roadmapDescription.length).toBeGreaterThan(0)
      })
    })
  })
})
