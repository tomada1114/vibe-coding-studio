import { getCourseById } from "../index"
import { webCourse } from "../web"

describe("Web Course Data", () => {
  describe("course metadata", () => {
    it("should have correct id", () => {
      expect(webCourse.id).toBe("web")
    })

    it("should have correct name", () => {
      expect(webCourse.name).toBe("Web開発")
    })

    it("should have correct icon", () => {
      expect(webCourse.icon).toBe("globe")
    })
  })

  describe("nodes", () => {
    it("should have 5 nodes", () => {
      expect(webCourse.nodes).toHaveLength(5)
    })

    it("should have unique node IDs", () => {
      const ids = webCourse.nodes.map(n => n.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(ids.length)
    })

    it("should have perfect-guide as last node", () => {
      const lastNode = webCourse.nodes[webCourse.nodes.length - 1]
      expect(lastNode.id).toBe("perfect-guide")
      expect(lastNode.link.url).toBe("/coupons/claude-code-perfect-guide")
    })
  })

  describe("integration with index", () => {
    it("should be retrievable via getCourseById", () => {
      const course = getCourseById("web")
      expect(course).toBeDefined()
      expect(course?.id).toBe("web")
    })
  })
})
