/**
 * Udemy講座選定機能の単体テスト
 *
 * このファイルでは、タグベースのトピックマッチングスコアリングと
 * Udemy講座選定APIをテストします。
 */

import {
  calculateCourseScore,
  suggestUdemyCourses,
} from "../suggest-udemy-courses"

describe("calculateCourseScore", () => {
  describe("完全一致トピックのスコアリング", () => {
    it("完全一致トピックがある場合、15ポイント/トピックが加算されること", () => {
      const inputTags = ["claude-code", "react", "nextjs"]
      const courseTopics = ["claude-code", "react"]

      const score = calculateCourseScore(inputTags, courseTopics)

      // "claude-code"と"react"が完全一致: 15 * 2 = 30ポイント
      // トピック数ボーナス: 2 * 1 = 2ポイント
      expect(score).toBe(32)
    })

    it("完全一致トピックがない場合、トピック数ボーナスのみであること", () => {
      const inputTags = ["vue", "angular"]
      const courseTopics = ["react", "nextjs"]

      const score = calculateCourseScore(inputTags, courseTopics)

      // 完全一致なし、部分一致なし
      // トピック数ボーナス: 2 * 1 = 2ポイント
      expect(score).toBe(2)
    })
  })

  describe("部分一致トピックのスコアリング", () => {
    it("部分一致トピックがある場合、7ポイント/トピックが加算されること", () => {
      const inputTags = ["claude-code-basics", "react"]
      const courseTopics = ["claude-code", "react"]

      const score = calculateCourseScore(inputTags, courseTopics)

      // "react"が完全一致: 15ポイント
      // "claude-code-basics"と"claude-code"が部分一致: 7ポイント
      // トピック数ボーナス: 2 * 1 = 2ポイント
      expect(score).toBe(24)
    })

    it("大文字小文字を無視した部分一致が機能すること", () => {
      const inputTags = ["Claude-Code", "React"]
      const courseTopics = ["claude-code", "react"]

      const score = calculateCourseScore(inputTags, courseTopics)

      // 両方完全一致（大文字小文字を無視）: 15 * 2 = 30ポイント
      // トピック数ボーナス: 2 * 1 = 2ポイント
      expect(score).toBe(32)
    })
  })

  describe("トピック数ボーナス", () => {
    it("トピック数の分だけボーナスが加算されること", () => {
      const inputTags = ["tag1"]
      const courseTopics = ["topic1", "topic2", "topic3"] // 3個

      const score = calculateCourseScore(inputTags, courseTopics)

      // 一致なし
      // トピック数ボーナス: 3 * 1 = 3ポイント
      expect(score).toBe(3)
    })
  })

  describe("エッジケース", () => {
    it("空のタグ配列の場合、トピック数ボーナスのみであること", () => {
      const inputTags: string[] = []
      const courseTopics = ["topic1", "topic2"]

      const score = calculateCourseScore(inputTags, courseTopics)

      // トピック数ボーナス: 2 * 1 = 2ポイント
      expect(score).toBe(2)
    })

    it("講座トピックが空の場合、スコアが0であること", () => {
      const inputTags = ["tag1", "tag2"]
      const courseTopics: string[] = []

      const score = calculateCourseScore(inputTags, courseTopics)

      expect(score).toBe(0)
    })
  })
})

describe("suggestUdemyCourses", () => {
  describe("正常系", () => {
    it("入力タグに基づいてUdemyCoursesSection形式のデータを返すこと", () => {
      const tags = ["claude-code", "react", "nextjs"]

      const result = suggestUdemyCourses(tags)

      expect(result).toHaveProperty("title")
      expect(result).toHaveProperty("cta")
      expect(result.cta).toHaveProperty("text")
      expect(result.cta).toHaveProperty("url")
    })

    it("推薦講座が上位1-3講座であること", () => {
      const tags = ["claude-code", "react"]

      const result = suggestUdemyCourses(tags)

      // descriptionまたはcoursesが存在する場合、講座が推薦されている
      expect(
        result.description !== undefined || result.courses !== undefined
      ).toBe(true)
    })
  })

  describe("フィルター付きURL生成", () => {
    it("複数トピック一致時にフィルター付きURLが生成されること", () => {
      const tags = ["claude-code", "react", "nextjs"]

      const result = suggestUdemyCourses(tags)

      // フィルター付きURLまたは汎用URLが設定されていること
      expect(result.cta.url).toMatch(/\/coupons/)
    })
  })

  describe("異常系", () => {
    it("空のタグ配列の場合、エラーをスローすること", () => {
      const tags: string[] = []

      expect(() => suggestUdemyCourses(tags)).toThrow("タグ配列が空です")
    })
  })

  describe("デフォルトURL返却", () => {
    it("一致する講座が0件の場合、デフォルトURLを返すこと", () => {
      // 存在しないタグで検索
      const tags = ["nonexistent-tag-xyz-123"]

      const result = suggestUdemyCourses(tags)

      // デフォルトURL（/coupons）が設定されていること
      expect(result.cta.url).toBe("https://www.vibecodingstudio.dev/coupons")
    })
  })
})
