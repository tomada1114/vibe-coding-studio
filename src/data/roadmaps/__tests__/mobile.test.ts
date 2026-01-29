import { getCourseById } from "../index"
import { mobileCourse } from "../mobile"

describe("Mobile Course Data", () => {
  describe("course metadata", () => {
    it("should have correct id", () => {
      expect(mobileCourse.id).toBe("mobile")
    })

    it("should have correct name", () => {
      expect(mobileCourse.name).toBe("スマホアプリ")
    })

    it("should have correct emoji", () => {
      expect(mobileCourse.emoji).toBe("📱")
    })
  })

  describe("nodes", () => {
    it("should have 4 nodes", () => {
      expect(mobileCourse.nodes).toHaveLength(4)
    })

    it("should have React Native focused content", () => {
      const rnNodes = mobileCourse.nodes.filter(
        n => n.title.includes("React Native") || n.title.includes("Expo")
      )
      expect(rnNodes.length).toBeGreaterThanOrEqual(2)
    })

    it("should have perfect-guide as last node", () => {
      const lastNode = mobileCourse.nodes[mobileCourse.nodes.length - 1]
      expect(lastNode.id).toBe("perfect-guide")
      expect(lastNode.link.url).toBe("/coupons/claude-code-perfect-guide")
    })
  })

  describe("integration with index", () => {
    it("should be retrievable via getCourseById", () => {
      const course = getCourseById("mobile")
      expect(course).toBeDefined()
      expect(course?.id).toBe("mobile")
    })
  })
})
