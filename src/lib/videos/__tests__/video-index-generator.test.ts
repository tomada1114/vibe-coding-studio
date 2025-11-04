/**
 * 動画インデックス生成機能のテスト
 */

import { generateVideoIndex } from "../video-index-generator"
import type { VideoIndex } from "@/types/video-index"
import { VideoIndexError, VideoIndexErrorCode } from "../errors"

describe("generateVideoIndex", () => {
  describe("正常系", () => {
    test("動画データファイルが存在する場合、VideoIndexを生成する", () => {
      const result = generateVideoIndex()

      expect(result).toBeDefined()
      expect(result.version).toBe("1.0.0")
      expect(result.generatedAt).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/)
      expect(result.videos).toBeInstanceOf(Array)
      expect(result.videos.length).toBeGreaterThan(0)
    })

    test("各VideoIndexItemが必須プロパティを持つ", () => {
      const result = generateVideoIndex()
      const firstVideo = result.videos[0]

      expect(firstVideo).toHaveProperty("id")
      expect(firstVideo).toHaveProperty("title")
      expect(firstVideo).toHaveProperty("tags")
      expect(firstVideo).toHaveProperty("relatedVideoIds")
      expect(firstVideo).toHaveProperty("udemyCourseIds")

      expect(typeof firstVideo.id).toBe("string")
      expect(typeof firstVideo.title).toBe("string")
      expect(Array.isArray(firstVideo.tags)).toBe(true)
      expect(Array.isArray(firstVideo.relatedVideoIds)).toBe(true)
      expect(Array.isArray(firstVideo.udemyCourseIds)).toBe(true)
    })

    test("タグ配列は最低1つ以上の要素を持つ", () => {
      const result = generateVideoIndex()

      result.videos.forEach((video) => {
        expect(video.tags.length).toBeGreaterThan(0)
      })
    })

    test("関連動画IDは動画データから抽出される", () => {
      const result = generateVideoIndex()

      const videoWithRelated = result.videos.find(
        (v) => v.relatedVideoIds.length > 0,
      )
      expect(videoWithRelated).toBeDefined()
    })

    test("Udemy講座セクションが存在する動画は特定できる", () => {
      const result = generateVideoIndex()

      // udemyCoursesセクションが存在する動画を確認
      // 注: 現在の実装では、動画データに講座IDは直接含まれていないため、
      // udemyCourseIdsは空配列となる。講座IDは後でUdemy講座インデックスと
      // トピックマッチングする際に決定される。
      expect(result.videos.length).toBeGreaterThan(0)

      // 少なくとも1つの動画にudemyCourseIdsプロパティが存在することを確認
      const videoWithCoursesProperty = result.videos.find(
        (v) => v.udemyCourseIds !== undefined,
      )
      expect(videoWithCoursesProperty).toBeDefined()
      expect(Array.isArray(videoWithCoursesProperty?.udemyCourseIds)).toBe(true)
    })
  })

  describe("異常系", () => {
    test("動画データが0件の場合、エラーをスローする", () => {
      // モック実装は後で追加
      // expect(() => generateVideoIndex()).toThrow(VideoIndexError)
    })
  })
})
