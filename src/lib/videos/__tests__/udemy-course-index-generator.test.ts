/**
 * Udemy講座インデックス生成機能のテスト
 */

import { generateUdemyCourseIndex } from "../udemy-course-index-generator"

describe("generateUdemyCourseIndex", () => {
  describe("正常系", () => {
    test("Udemy講座データが存在する場合、UdemyCourseIndexを生成する", () => {
      const result = generateUdemyCourseIndex()

      expect(result).toBeDefined()
      expect(result.version).toBe("1.0.0")
      expect(result.generatedAt).toMatch(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/
      )
      expect(result.courses).toBeInstanceOf(Array)
      expect(result.courses.length).toBeGreaterThan(0)
      expect(result.topicMapping).toBeDefined()
    })

    test("各UdemyCourseIndexItemが必須プロパティを持つ", () => {
      const result = generateUdemyCourseIndex()
      const firstCourse = result.courses[0]

      expect(firstCourse).toHaveProperty("courseId")
      expect(firstCourse).toHaveProperty("title")
      expect(firstCourse).toHaveProperty("topics")
      expect(firstCourse).toHaveProperty("promotionUrl")
      expect(firstCourse).toHaveProperty("description")

      expect(typeof firstCourse.courseId).toBe("string")
      expect(typeof firstCourse.title).toBe("string")
      expect(Array.isArray(firstCourse.topics)).toBe(true)
      expect(typeof firstCourse.promotionUrl).toBe("string")
      expect(typeof firstCourse.description).toBe("string")
    })

    test("トピック配列は最低1つ以上の要素を持つ", () => {
      const result = generateUdemyCourseIndex()

      result.courses.forEach(course => {
        expect(course.topics.length).toBeGreaterThan(0)
      })
    })

    test("トピックマッピングが正しく生成される", () => {
      const result = generateUdemyCourseIndex()

      // topicMappingが存在することを確認
      expect(Object.keys(result.topicMapping).length).toBeGreaterThan(0)

      // 各トピックに対応する講座情報が正しい形式であることを確認
      Object.values(result.topicMapping).forEach(courses => {
        expect(Array.isArray(courses)).toBe(true)
        courses.forEach(course => {
          expect(course).toHaveProperty("courseId")
          expect(course).toHaveProperty("url")
          expect(typeof course.courseId).toBe("string")
          expect(typeof course.url).toBe("string")
        })
      })
    })

    test("トピックマッピングのURLにトピックフィルターが含まれる", () => {
      const result = generateUdemyCourseIndex()

      // トピックマッピングのURLにクエリパラメータが含まれることを確認
      Object.entries(result.topicMapping).forEach(([topic, courses]) => {
        courses.forEach(course => {
          expect(course.url).toContain(`?topic=${topic}`)
        })
      })
    })
  })

  describe("異常系", () => {
    test("COURSE_INFOが空の場合、エラーをスローする", () => {
      // モック実装は後で追加
      // expect(() => generateUdemyCourseIndex()).toThrow(UdemyCourseIndexError)
    })
  })
})
