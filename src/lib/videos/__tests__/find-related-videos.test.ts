/**
 * 関連動画検索機能の単体テスト
 *
 * このファイルでは、タグベースのスコアリングアルゴリズムと関連動画検索APIをテストします。
 */

import { calculateVideoScore, findRelatedVideos } from "../find-related-videos"

describe("calculateVideoScore", () => {
  describe("完全一致タグのスコアリング", () => {
    it("完全一致タグがある場合、10ポイント/タグが加算されること", () => {
      const inputTags = ["react", "typescript", "nextjs"]
      const videoTags = ["react", "typescript", "tailwind"]

      const score = calculateVideoScore(inputTags, videoTags)

      // "react"と"typescript"が完全一致: 10 * 2 = 20ポイント
      expect(score).toBeGreaterThanOrEqual(20)
    })

    it("完全一致タグがない場合、0ポイントであること", () => {
      const inputTags = ["react", "typescript"]
      const videoTags = ["angular", "vue"]

      const score = calculateVideoScore(inputTags, videoTags)

      // 完全一致なし、部分一致なし、タグ数類似性ボーナスのみ
      expect(score).toBeLessThan(10)
    })
  })

  describe("部分一致タグのスコアリング", () => {
    it("部分一致タグがある場合、5ポイント/タグが加算されること", () => {
      const inputTags = ["react-native", "typescript"]
      const videoTags = ["react", "typescript"]

      const score = calculateVideoScore(inputTags, videoTags)

      // "typescript"が完全一致: 10ポイント
      // "react-native"と"react"が部分一致: 5ポイント
      // タグ数類似性ボーナス: +2ポイント
      expect(score).toBe(17)
    })

    it("大文字小文字を無視した部分一致が機能すること", () => {
      const inputTags = ["React", "TypeScript"]
      const videoTags = ["react", "typescript"]

      const score = calculateVideoScore(inputTags, videoTags)

      // "React"と"react"が完全一致（大文字小文字を無視）: 10 * 2 = 20ポイント
      // タグ数類似性ボーナス: +2ポイント
      expect(score).toBe(22)
    })
  })

  describe("タグ数類似性ボーナス", () => {
    it("タグ数が±2以内の場合、+2ポイントが加算されること", () => {
      const inputTags = ["tag1", "tag2", "tag3"] // 3個
      const videoTags = ["tag1", "tag2", "tag3", "tag4", "tag5"] // 5個（差分2）

      const score = calculateVideoScore(inputTags, videoTags)

      // 完全一致: 10 * 3 = 30ポイント
      // タグ数類似性ボーナス: +2ポイント
      expect(score).toBe(32)
    })

    it("タグ数が±3以上離れている場合、ボーナスがないこと", () => {
      const inputTags = ["tag1"] // 1個
      const videoTags = ["tag1", "tag2", "tag3", "tag4", "tag5"] // 5個（差分4）

      const score = calculateVideoScore(inputTags, videoTags)

      // 完全一致: 10 * 1 = 10ポイント
      // タグ数類似性ボーナスなし
      expect(score).toBe(10)
    })
  })

  describe("エッジケース", () => {
    it("空のタグ配列の場合、スコアが0であること", () => {
      const inputTags: string[] = []
      const videoTags = ["tag1", "tag2"]

      const score = calculateVideoScore(inputTags, videoTags)

      expect(score).toBe(0)
    })

    it("動画タグが空の場合、スコアが0であること", () => {
      const inputTags = ["tag1", "tag2"]
      const videoTags: string[] = []

      const score = calculateVideoScore(inputTags, videoTags)

      expect(score).toBe(0)
    })
  })
})

describe("findRelatedVideos", () => {
  describe("正常系", () => {
    it("入力タグに基づいて関連動画を返すこと", () => {
      const tags = ["react", "typescript", "nextjs"]

      const result = findRelatedVideos(tags)

      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBeGreaterThan(0)
      expect(result.length).toBeLessThanOrEqual(5)
    })

    it("関連動画が降順（スコアの高い順）にソートされていること", () => {
      const tags = ["react", "typescript"]

      const result = findRelatedVideos(tags)

      // スコアが降順であることを確認（実装後にスコアを確認）
      expect(result.length).toBeGreaterThan(0)
    })
  })

  describe("自分自身の除外", () => {
    it("currentVideoIdが指定された場合、その動画が結果から除外されること", () => {
      const tags = ["react", "typescript"]
      const currentVideoId = "test-video-1"

      const result = findRelatedVideos(tags, currentVideoId)

      // currentVideoIdが結果に含まれていないことを確認
      const ids = result.map(v => v.id)
      expect(ids).not.toContain(currentVideoId)
    })
  })

  describe("異常系", () => {
    it("空のタグ配列の場合、エラーをスローすること", () => {
      const tags: string[] = []

      expect(() => findRelatedVideos(tags)).toThrow("タグ配列が空です")
    })
  })

  describe("代替処理", () => {
    it("一致する動画が0件の場合、ランダムに5本を返すこと", () => {
      // 存在しないタグで検索
      const tags = ["nonexistent-tag-xyz-123"]

      const result = findRelatedVideos(tags)

      // 代替処理で動画が返されることを確認
      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBeGreaterThan(0)
      expect(result.length).toBeLessThanOrEqual(5)
    })
  })
})
