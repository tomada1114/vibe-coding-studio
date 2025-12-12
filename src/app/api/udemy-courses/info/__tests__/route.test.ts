/**
 * @jest-environment node
 */
import { GET } from "../route"

describe("GET /api/udemy-courses/info", () => {
  describe("Happy Path: API情報取得", () => {
    it("should return API info with correct structure", async () => {
      // When: APIを呼び出す
      const response = await GET()
      const data = await response.json()

      // Then: 正常なレスポンスを返す
      expect(response.status).toBe(200)
      expect(data).toHaveProperty("name")
      expect(data).toHaveProperty("description")
      expect(data).toHaveProperty("baseUrl")
      expect(data).toHaveProperty("endpoints")
    })

    it("should include all endpoints information", async () => {
      // When: APIを呼び出す
      const response = await GET()
      const data = await response.json()

      // Then: 全エンドポイント情報が含まれている
      expect(Array.isArray(data.endpoints)).toBe(true)
      expect(data.endpoints.length).toBeGreaterThanOrEqual(3)

      // 各エンドポイントの構造を確認
      data.endpoints.forEach(
        (endpoint: {
          path: string
          method: string
          description: string
          parameters?: { name: string; type: string }[]
        }) => {
          expect(endpoint).toHaveProperty("path")
          expect(endpoint).toHaveProperty("method")
          expect(endpoint).toHaveProperty("description")
        }
      )
    })

    it("should document the main courses endpoint with topic parameter", async () => {
      // When: APIを呼び出す
      const response = await GET()
      const data = await response.json()

      // Then: メインエンドポイントにtopicパラメータの説明がある
      const coursesEndpoint = data.endpoints.find(
        (e: { path: string }) => e.path === "/api/udemy-courses"
      )
      expect(coursesEndpoint).toBeDefined()
      expect(coursesEndpoint.parameters).toBeDefined()
      expect(coursesEndpoint.parameters.length).toBeGreaterThan(0)

      const topicParam = coursesEndpoint.parameters.find(
        (p: { name: string }) => p.name === "topic"
      )
      expect(topicParam).toBeDefined()
      expect(topicParam.type).toBe("string")
      expect(topicParam.required).toBe(false)
    })

    it("should document the topics endpoint", async () => {
      // When: APIを呼び出す
      const response = await GET()
      const data = await response.json()

      // Then: トピック一覧エンドポイントが含まれている
      const topicsEndpoint = data.endpoints.find(
        (e: { path: string }) => e.path === "/api/udemy-courses/topics"
      )
      expect(topicsEndpoint).toBeDefined()
      expect(topicsEndpoint.method).toBe("GET")
    })
  })

  describe("Response Headers", () => {
    it("should include long cache control header", async () => {
      // When: APIを呼び出す
      const response = await GET()

      // Then: 長めのキャッシュヘッダーが設定されている（API説明は変更頻度が低い）
      expect(response.headers.get("Cache-Control")).toBe(
        "public, s-maxage=86400, stale-while-revalidate=604800"
      )
    })
  })
})
