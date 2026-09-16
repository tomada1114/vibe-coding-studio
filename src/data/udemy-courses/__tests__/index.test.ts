import fs from "node:fs"
import path from "node:path"

import {
  COURSE_INFO,
  COURSE_DISPLAY_ORDER as LEGACY_COURSE_DISPLAY_ORDER,
} from "@/constants/coupon-courses"
import { COURSE_DISPLAY_ORDER, getAllUdemyCourses } from "@/data/udemy-courses"
import { UDEMY_COURSE_TOPICS } from "@/data/udemy-courses/topics"

describe("Udemy course data", () => {
  const courses = getAllUdemyCourses()
  const topicSlugs = new Set(UDEMY_COURSE_TOPICS.map(topic => topic.slug))

  it("returns all courses in the canonical display order", () => {
    expect(courses).toHaveLength(16)
    expect(courses.map(course => course.id)).toEqual([...COURSE_DISPLAY_ORDER])
    expect(courses.map(course => course.id)).toEqual([
      ...LEGACY_COURSE_DISPLAY_ORDER,
    ])
  })

  it("matches the legacy course source without copying coupon fields", () => {
    for (const course of courses) {
      const legacyCourse = COURSE_INFO[course.id]
      const expectedUrl =
        course.id === "6783611"
          ? "https://www.udemy.com/course/claude-code-react-native-5apps/?referralCode=0FA02DD403E254AE48AE"
          : legacyCourse.promotionUrl

      expect(legacyCourse).toBeDefined()
      expect(course).toMatchObject({
        id: course.id,
        slug: legacyCourse.slug,
        title: legacyCourse.title,
        description: legacyCourse.description,
        topics: legacyCourse.topics,
        url: expectedUrl,
      })
      expect(Object.keys(course).sort()).toEqual([
        "description",
        "id",
        "slug",
        "thumbnail",
        "title",
        "topics",
        "url",
      ])
      expect(course).not.toHaveProperty("originalPrice")
      expect(course.thumbnail).toBe(`/images/udemy/${course.slug}.png`)

      const referralCode = new URL(course.url).searchParams.get("referralCode")
      expect(referralCode).toEqual(expect.stringMatching(/\S+/))
    }
  })

  it("references an existing thumbnail and a defined topic for every course", () => {
    for (const course of courses) {
      expect(
        fs.existsSync(path.join(process.cwd(), "public", course.thumbnail))
      ).toBe(true)

      for (const topic of course.topics) {
        expect(topicSlugs).toContain(topic)
      }
    }

    expect(topicSlugs).toEqual(
      new Set(courses.flatMap(course => course.topics))
    )
  })

  it("keeps the published React Native course on its canonical URL", () => {
    expect(courses.find(course => course.id === "6783611")?.url).toBe(
      "https://www.udemy.com/course/claude-code-react-native-5apps/?referralCode=0FA02DD403E254AE48AE"
    )
  })
})
