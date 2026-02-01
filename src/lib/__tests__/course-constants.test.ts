import type { CourseInfo } from "../course-constants"
import {
  ALL_COURSES,
  getAllCourses,
  getCourseBySlug,
  getCoursesByCategory,
  getCoursesForListPage,
  getCourseTitle,
  getOtherCourses,
} from "../course-constants"

describe("course-constants", () => {
  describe("ALL_COURSES", () => {
    it("is a non-empty array", () => {
      expect(Array.isArray(ALL_COURSES)).toBe(true)
      expect(ALL_COURSES.length).toBeGreaterThan(0)
    })

    it("each course has required fields", () => {
      ALL_COURSES.forEach(course => {
        expect(course.slug).toBeDefined()
        expect(course.slug).not.toBe("")
        expect(course.title).toBeDefined()
        expect(course.title).not.toBe("")
        expect(course.shortDescription).toBeDefined()
        expect(course.topPagePath).toBeDefined()
        expect(course.category).toBeDefined()
        expect(typeof course.order).toBe("number")
        expect(course.level).toBeDefined()
        expect(course.colors).toBeDefined()
      })
    })

    it("each course has valid category", () => {
      const validCategories = ["frontend", "backend", "data-ai"]
      ALL_COURSES.forEach(course => {
        expect(validCategories).toContain(course.category)
      })
    })

    it("each course has valid level", () => {
      const validLevels = ["beginner", "intermediate", "advanced"]
      ALL_COURSES.forEach(course => {
        expect(validLevels).toContain(course.level)
      })
    })

    it("each course has valid color properties", () => {
      ALL_COURSES.forEach(course => {
        expect(course.colors.text).toBeDefined()
        expect(course.colors.text).not.toBe("")
        expect(course.colors.buttonBg).toBeDefined()
        expect(course.colors.buttonBg).not.toBe("")
        expect(course.colors.buttonHover).toBeDefined()
        expect(course.colors.buttonHover).not.toBe("")
      })
    })

    it("each course has topPagePath starting with /docs/", () => {
      ALL_COURSES.forEach(course => {
        expect(course.topPagePath).toMatch(/^\/docs\//)
      })
    })

    it("has unique slugs", () => {
      const slugs = ALL_COURSES.map(c => c.slug)
      expect(new Set(slugs).size).toBe(slugs.length)
    })
  })

  describe("getAllCourses", () => {
    it("returns all courses", () => {
      const result = getAllCourses()
      expect(result).toHaveLength(ALL_COURSES.length)
    })

    it("returns a copy, not a reference", () => {
      const result = getAllCourses()
      expect(result).not.toBe(ALL_COURSES)
      expect(result).toEqual(ALL_COURSES)
    })
  })

  describe("getCoursesByCategory", () => {
    it("returns backend courses", () => {
      const result = getCoursesByCategory("backend")
      expect(result.length).toBeGreaterThan(0)
      result.forEach(course => {
        expect(course.category).toBe("backend")
      })
    })

    it("returns frontend courses", () => {
      const result = getCoursesByCategory("frontend")
      expect(result.length).toBeGreaterThan(0)
      result.forEach(course => {
        expect(course.category).toBe("frontend")
      })
    })

    it("returns data-ai courses", () => {
      const result = getCoursesByCategory("data-ai")
      expect(result.length).toBeGreaterThan(0)
      result.forEach(course => {
        expect(course.category).toBe("data-ai")
      })
    })

    it("returns courses sorted by order", () => {
      const result = getCoursesByCategory("frontend")
      for (let i = 1; i < result.length; i++) {
        expect(result[i].order).toBeGreaterThanOrEqual(result[i - 1].order)
      }
    })
  })

  describe("getCourseBySlug", () => {
    it("returns course for valid slug", () => {
      const result = getCourseBySlug("ruby")
      expect(result).toBeDefined()
      expect(result?.slug).toBe("ruby")
      expect(result?.title).toBe("Ruby")
    })

    it("returns undefined for unknown slug", () => {
      const result = getCourseBySlug("nonexistent")
      expect(result).toBeUndefined()
    })

    it("returns undefined for empty string", () => {
      const result = getCourseBySlug("")
      expect(result).toBeUndefined()
    })
  })

  describe("getCourseTitle", () => {
    it("returns title for valid slug", () => {
      expect(getCourseTitle("ruby")).toBe("Ruby")
      expect(getCourseTitle("python")).toBe("Python")
    })

    it("returns slug as fallback for unknown slug", () => {
      expect(getCourseTitle("unknown")).toBe("unknown")
    })
  })

  describe("getCoursesForListPage", () => {
    it("returns categorized courses", () => {
      const result = getCoursesForListPage()
      expect(result).toHaveProperty("frontendCourses")
      expect(result).toHaveProperty("backendCourses")
      expect(result).toHaveProperty("dataAiCourses")
    })

    it("each category contains only courses of that category", () => {
      const { frontendCourses, backendCourses, dataAiCourses } =
        getCoursesForListPage()
      frontendCourses.forEach((c: CourseInfo) =>
        expect(c.category).toBe("frontend")
      )
      backendCourses.forEach((c: CourseInfo) =>
        expect(c.category).toBe("backend")
      )
      dataAiCourses.forEach((c: CourseInfo) =>
        expect(c.category).toBe("data-ai")
      )
    })

    it("total courses across categories equals ALL_COURSES length", () => {
      const { frontendCourses, backendCourses, dataAiCourses } =
        getCoursesForListPage()
      const total =
        frontendCourses.length + backendCourses.length + dataAiCourses.length
      expect(total).toBe(ALL_COURSES.length)
    })
  })

  describe("getOtherCourses", () => {
    it("excludes course with given slug", () => {
      const result = getOtherCourses("ruby")
      expect(result.find(c => c.slug === "ruby")).toBeUndefined()
    })

    it("returns all other courses", () => {
      const result = getOtherCourses("ruby")
      expect(result).toHaveLength(ALL_COURSES.length - 1)
    })

    it("returns all courses when slug does not match", () => {
      const result = getOtherCourses("nonexistent")
      expect(result).toHaveLength(ALL_COURSES.length)
    })
  })
})
