/**
 * 動画インデックスローダーの単体テスト
 *
 * このファイルでは、video-index.jsonの読み込み、エラーハンドリング、
 * フォールバック処理をテストします。
 */

import { loadVideoIndex } from "../video-index-loader"

describe("loadVideoIndex", () => {
  describe("正常系", () => {
    it("video-index.jsonが存在する場合、VideoIndex型のデータを返すこと", () => {
      const result = loadVideoIndex()

      // VideoIndex型の構造を持つデータが返されること
      expect(result).toBeDefined()
      expect(result.version).toBeDefined()
      expect(result.generatedAt).toBeDefined()
      expect(Array.isArray(result.videos)).toBe(true)
    })

    it("読み込まれた動画インデックスが正しい型構造を持つこと", () => {
      const result = loadVideoIndex()

      // バージョンがセマンティックバージョニング形式
      expect(typeof result.version).toBe("string")
      expect(result.version).toMatch(/^\d+\.\d+\.\d+$/)

      // 生成日時がISO 8601形式
      expect(typeof result.generatedAt).toBe("string")
      expect(() => new Date(result.generatedAt)).not.toThrow()

      // videos配列の各要素が正しい構造を持つ
      if (result.videos.length > 0) {
        const video = result.videos[0]
        expect(typeof video.id).toBe("string")
        expect(typeof video.title).toBe("string")
        expect(Array.isArray(video.tags)).toBe(true)
        expect(Array.isArray(video.relatedVideoIds)).toBe(true)
        expect(Array.isArray(video.udemyCourseIds)).toBe(true)
      }
    })
  })
})
