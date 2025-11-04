/**
 * パフォーマンステスト
 *
 * インデックスシステムのパフォーマンス目標を検証します。
 */

import { findRelatedVideos } from "../find-related-videos"
import { suggestUdemyCourses } from "../suggest-udemy-courses"
import { generateUdemyCourseIndex } from "../udemy-course-index-generator"
import { loadUdemyCourseIndex } from "../udemy-course-index-loader"
import { generateVideoIndex } from "../video-index-generator"
import { loadVideoIndex } from "../video-index-loader"

describe("パフォーマンステスト", () => {
  describe("インデックス読み込み", () => {
    it("動画インデックスの読み込みが10ms以内に完了すること", () => {
      const start = performance.now()
      loadVideoIndex()
      const end = performance.now()

      const duration = end - start
      expect(duration).toBeLessThan(10)
    })

    it("Udemy講座インデックスの読み込みが10ms以内に完了すること", () => {
      const start = performance.now()
      loadUdemyCourseIndex()
      const end = performance.now()

      const duration = end - start
      expect(duration).toBeLessThan(10)
    })
  })

  describe("関連動画検索", () => {
    it("関連動画検索が100ms以内に完了すること（29本の動画）", () => {
      const tags = ["react", "typescript", "nextjs"]

      const start = performance.now()
      const result = findRelatedVideos(tags)
      const end = performance.now()

      const duration = end - start
      expect(result.length).toBeGreaterThan(0)
      expect(duration).toBeLessThan(100)
    })

    it("複数回の検索が安定したパフォーマンスを維持すること", () => {
      const tags = ["react", "typescript", "nextjs"]
      const durations: number[] = []

      // 10回検索を実行
      for (let i = 0; i < 10; i++) {
        const start = performance.now()
        findRelatedVideos(tags)
        const end = performance.now()
        durations.push(end - start)
      }

      // すべての検索が100ms以内
      durations.forEach(duration => {
        expect(duration).toBeLessThan(100)
      })

      // 平均検索時間が50ms以内
      const avgDuration =
        durations.reduce((a, b) => a + b, 0) / durations.length
      expect(avgDuration).toBeLessThan(50)
    })
  })

  describe("Udemy講座選定", () => {
    it("Udemy講座選定が50ms以内に完了すること（14講座）", () => {
      const tags = ["claude-code", "react", "nextjs"]

      const start = performance.now()
      const result = suggestUdemyCourses(tags)
      const end = performance.now()

      const duration = end - start
      expect(result).toBeDefined()
      expect(duration).toBeLessThan(50)
    })

    it("複数回の選定が安定したパフォーマンスを維持すること", () => {
      const tags = ["claude-code", "react", "nextjs"]
      const durations: number[] = []

      // 10回選定を実行
      for (let i = 0; i < 10; i++) {
        const start = performance.now()
        suggestUdemyCourses(tags)
        const end = performance.now()
        durations.push(end - start)
      }

      // すべての選定が50ms以内
      durations.forEach(duration => {
        expect(duration).toBeLessThan(50)
      })

      // 平均選定時間が25ms以内
      const avgDuration =
        durations.reduce((a, b) => a + b, 0) / durations.length
      expect(avgDuration).toBeLessThan(25)
    })
  })

  describe("インデックス生成", () => {
    it("動画インデックス生成が5秒以内に完了すること（29本の動画）", () => {
      const start = performance.now()
      const result = generateVideoIndex()
      const end = performance.now()

      const duration = end - start
      expect(result.videos.length).toBeGreaterThan(0)
      expect(duration).toBeLessThan(5000)
    })

    it("Udemy講座インデックス生成が5秒以内に完了すること（14講座）", () => {
      const start = performance.now()
      const result = generateUdemyCourseIndex()
      const end = performance.now()

      const duration = end - start
      expect(result.courses.length).toBeGreaterThan(0)
      expect(duration).toBeLessThan(5000)
    })
  })

  describe("統合フロー", () => {
    it("インデックス生成 → 読み込み → 検索の全フローが6秒以内に完了すること", () => {
      const start = performance.now()

      // 1. インデックス生成
      generateVideoIndex()
      generateUdemyCourseIndex()

      // 2. インデックス読み込み
      loadVideoIndex()
      loadUdemyCourseIndex()

      // 3. 検索
      findRelatedVideos(["react", "typescript"])
      suggestUdemyCourses(["claude-code", "react"])

      const end = performance.now()
      const duration = end - start

      expect(duration).toBeLessThan(6000)
    })
  })
})
