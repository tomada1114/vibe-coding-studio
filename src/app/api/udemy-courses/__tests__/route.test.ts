/**
 * @jest-environment node
 */
import { COURSE_DISPLAY_ORDER, COURSE_INFO } from "@/constants/coupon-courses"
import { NextRequest } from "next/server"

import { GET } from "../route"

describe("GET /api/udemy-courses", () => {
  // Given: テスト用の基本URLを定義
  const BASE_URL = "https://www.vibecodingstudio.dev"

  describe("Happy Path: 全講座取得", () => {
    it("should return all courses with correct structure", async () => {
      // Given: クエリパラメータなしのリクエスト
      const request = new NextRequest(`${BASE_URL}/api/udemy-courses`)

      // When: APIを呼び出す
      const response = await GET(request)
      const data = await response.json()

      // Then: 正常なレスポンスを返す
      expect(response.status).toBe(200)
      expect(Array.isArray(data.courses)).toBe(true)
      expect(data.totalCount).toBe(COURSE_DISPLAY_ORDER.length)
      expect(data.filter).toBeUndefined()
    })

    it("should return courses in COURSE_DISPLAY_ORDER sequence", async () => {
      // Given: 全講座取得リクエスト
      const request = new NextRequest(`${BASE_URL}/api/udemy-courses`)

      // When: APIを呼び出す
      const response = await GET(request)
      const data = await response.json()

      // Then: COURSE_DISPLAY_ORDER の順序で返される
      const courseIds = data.courses.map((course: { id: string }) => course.id)
      expect(courseIds).toEqual(COURSE_DISPLAY_ORDER)
    })

    it("should include all required fields for each course", async () => {
      // Given: 全講座取得リクエスト
      const request = new NextRequest(`${BASE_URL}/api/udemy-courses`)

      // When: APIを呼び出す
      const response = await GET(request)
      const data = await response.json()

      // Then: 各講座に必須フィールドが含まれている
      data.courses.forEach(
        (course: {
          id: string
          title: string
          slug: string
          description: string
          topics: string[]
          url: string
        }) => {
          expect(course).toHaveProperty("id")
          expect(course).toHaveProperty("title")
          expect(course).toHaveProperty("slug")
          expect(course).toHaveProperty("description")
          expect(course).toHaveProperty("topics")
          expect(course).toHaveProperty("url")
          expect(course.url).toMatch(
            /^https:\/\/www\.vibecodingstudio\.dev\/coupons\/.+$/
          )
        }
      )
    })

    it("should return correct URL format for each course", async () => {
      // Given: 全講座取得リクエスト
      const request = new NextRequest(`${BASE_URL}/api/udemy-courses`)

      // When: APIを呼び出す
      const response = await GET(request)
      const data = await response.json()

      // Then: URLがスラッグから正しく生成されている
      data.courses.forEach((course: { slug: string; url: string }) => {
        expect(course.url).toBe(
          `https://www.vibecodingstudio.dev/coupons/${course.slug}`
        )
      })
    })
  })

  describe("Happy Path: トピックでフィルタリング", () => {
    it("should filter courses by topic", async () => {
      // Given: claude-codeトピックでフィルタリング
      const request = new NextRequest(
        `${BASE_URL}/api/udemy-courses?topic=claude-code`
      )

      // When: APIを呼び出す
      const response = await GET(request)
      const data = await response.json()

      // Then: claude-codeトピックを含む講座のみ返される
      expect(response.status).toBe(200)
      expect(data.courses.length).toBeGreaterThan(0)
      expect(data.filter).toEqual({ topic: "claude-code" })

      data.courses.forEach((course: { topics: string[] }) => {
        expect(course.topics).toContain("claude-code")
      })
    })

    it("should return correct count for filtered results", async () => {
      // Given: reactトピックでフィルタリング
      const request = new NextRequest(
        `${BASE_URL}/api/udemy-courses?topic=react`
      )

      // When: APIを呼び出す
      const response = await GET(request)
      const data = await response.json()

      // Then: totalCountがフィルタリング後の件数と一致
      expect(data.totalCount).toBe(data.courses.length)
    })

    it("should filter by codex topic", async () => {
      // Given: codexトピックでフィルタリング
      const request = new NextRequest(
        `${BASE_URL}/api/udemy-courses?topic=codex`
      )

      // When: APIを呼び出す
      const response = await GET(request)
      const data = await response.json()

      // Then: codexトピックを含む講座のみ返される
      expect(response.status).toBe(200)
      expect(data.courses.length).toBeGreaterThan(0)
      data.courses.forEach((course: { topics: string[] }) => {
        expect(course.topics).toContain("codex")
      })
    })
  })

  describe("Edge Cases", () => {
    it("should return empty array for non-existent topic", async () => {
      // Given: 存在しないトピックでフィルタリング
      const request = new NextRequest(
        `${BASE_URL}/api/udemy-courses?topic=non-existent-topic`
      )

      // When: APIを呼び出す
      const response = await GET(request)
      const data = await response.json()

      // Then: 空配列とフィルター情報を返す
      expect(response.status).toBe(200)
      expect(data.courses).toEqual([])
      expect(data.totalCount).toBe(0)
      expect(data.filter).toEqual({ topic: "non-existent-topic" })
    })

    it("should treat empty topic parameter as no filter", async () => {
      // Given: 空のトピックパラメータ（falsyな値）
      const request = new NextRequest(`${BASE_URL}/api/udemy-courses?topic=`)

      // When: APIを呼び出す
      const response = await GET(request)
      const data = await response.json()

      // Then: 空文字列はフィルターなしとして扱われ、全講座が返される
      expect(response.status).toBe(200)
      expect(data.courses.length).toBe(COURSE_DISPLAY_ORDER.length)
      expect(data.filter).toBeUndefined()
    })
  })

  describe("Data Integrity", () => {
    it("should return data matching COURSE_INFO", async () => {
      // Given: 全講座取得リクエスト
      const request = new NextRequest(`${BASE_URL}/api/udemy-courses`)

      // When: APIを呼び出す
      const response = await GET(request)
      const data = await response.json()

      // Then: COURSE_INFOのデータと一致する
      data.courses.forEach(
        (course: {
          id: string
          title: string
          slug: string
          description: string
          topics: string[]
        }) => {
          const originalInfo = COURSE_INFO[course.id]
          expect(course.title).toBe(originalInfo.title)
          expect(course.slug).toBe(originalInfo.slug)
          expect(course.description).toBe(originalInfo.description)
          expect(course.topics).toEqual(originalInfo.topics)
        }
      )
    })
  })

  describe("Response Headers", () => {
    it("should include cache control header", async () => {
      // Given: 全講座取得リクエスト
      const request = new NextRequest(`${BASE_URL}/api/udemy-courses`)

      // When: APIを呼び出す
      const response = await GET(request)

      // Then: キャッシュヘッダーが設定されている
      expect(response.headers.get("Cache-Control")).toBe(
        "public, s-maxage=3600, stale-while-revalidate=86400"
      )
    })
  })
})
