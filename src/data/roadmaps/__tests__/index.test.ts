import {
  courseIds,
  getAllCourses,
  getCourseById,
  getDefaultCourse,
  isValidCourseId,
} from "../index"

describe("Roadmap Data Index", () => {
  describe("courseIds", () => {
    it("should contain 2 course IDs", () => {
      expect(courseIds).toHaveLength(2)
    })

    it("should contain expected course IDs", () => {
      expect(courseIds).toContain("web")
      expect(courseIds).toContain("mobile")
    })
  })

  describe("getAllCourses", () => {
    it("should return an array", () => {
      const courses = getAllCourses()
      expect(Array.isArray(courses)).toBe(true)
    })

    it("should return 2 courses", () => {
      const courses = getAllCourses()
      expect(courses).toHaveLength(2)
    })
  })

  describe("getCourseById", () => {
    it("should return web course", () => {
      const course = getCourseById("web")
      expect(course).toBeDefined()
      expect(course?.id).toBe("web")
    })

    it("should return mobile course", () => {
      const course = getCourseById("mobile")
      expect(course).toBeDefined()
      expect(course?.id).toBe("mobile")
    })
  })

  describe("getDefaultCourse", () => {
    it("should return web course as default", () => {
      const course = getDefaultCourse()
      expect(course).toBeDefined()
      expect(course?.id).toBe("web")
    })
  })

  describe("isValidCourseId", () => {
    it("should return true for valid course IDs", () => {
      expect(isValidCourseId("web")).toBe(true)
      expect(isValidCourseId("mobile")).toBe(true)
    })

    it("should return false for invalid course IDs", () => {
      expect(isValidCourseId("beginner")).toBe(false)
      expect(isValidCourseId("invalid")).toBe(false)
      expect(isValidCourseId("")).toBe(false)
      expect(isValidCourseId("BEGINNER")).toBe(false)
      expect(isValidCourseId("python")).toBe(false)
    })
  })
})
