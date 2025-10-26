import { describe, expect, test } from "@jest/globals"
import {
  getAllVideoIds,
  getAllVideos,
  getLatestVideos,
  getVideoById,
} from "../video-data"

describe("動画データローダー", () => {
  describe("getAllVideos", () => {
    test("すべての動画データを返す", () => {
      const videos = getAllVideos()
      expect(videos.length).toBeGreaterThan(0)
      expect(Array.isArray(videos)).toBe(true)
    })
  })

  describe("getLatestVideos", () => {
    test("公開日順(新しい順)でソートされた動画データを返す", () => {
      const videos = getLatestVideos()
      expect(videos.length).toBeGreaterThan(0)

      // 日付が降順であることを確認
      for (let i = 0; i < videos.length - 1; i++) {
        const currentDate = new Date(videos[i].publishedAt)
        const nextDate = new Date(videos[i + 1].publishedAt)
        expect(currentDate.getTime()).toBeGreaterThanOrEqual(nextDate.getTime())
      }
    })
  })

  describe("getVideoById", () => {
    test("指定されたIDの動画データを返す", () => {
      const video = getVideoById("video-001")
      expect(video).toBeDefined()
      expect(video?.id).toBe("video-001")
    })

    test("存在しない動画IDでundefinedを返す", () => {
      const video = getVideoById("nonexistent-id")
      expect(video).toBeUndefined()
    })
  })

  describe("getAllVideoIds", () => {
    test("すべての動画IDを返す", () => {
      const ids = getAllVideoIds()
      expect(ids.length).toBeGreaterThan(0)
      expect(Array.isArray(ids)).toBe(true)
      expect(ids).toContain("video-001")
      expect(ids).toContain("video-002")
    })
  })
})

describe("動画データの検証", () => {
  const allVideos = getAllVideos()

  test("動画データが存在する", () => {
    expect(allVideos.length).toBeGreaterThan(0)
  })

  allVideos.forEach(video => {
    describe(`${video.title}`, () => {
      test("必須項目が存在する", () => {
        expect(video.id).toBeTruthy()
        expect(video.title).toBeTruthy()
        expect(video.publishedAt).toBeTruthy()
        expect(video.videoUrl).toBeTruthy()
      })

      test("日付形式が正しい(ISO 8601)", () => {
        expect(video.publishedAt).toMatch(/^\d{4}-\d{2}-\d{2}T/)
        // 有効な日付かどうかを確認
        const date = new Date(video.publishedAt)
        expect(date.toString()).not.toBe("Invalid Date")
      })

      test("YouTube URLが正しい", () => {
        expect(video.videoUrl).toMatch(
          /^https:\/\/(youtu\.be|www\.youtube\.com)/
        )
      })

      test("必須セクションが存在し、配列が空でない", () => {
        // opening
        expect(Array.isArray(video.opening.lines)).toBe(true)
        expect(video.opening.lines.length).toBeGreaterThan(0)

        // learningPoints
        expect(video.learningPoints.title).toBeTruthy()
        expect(Array.isArray(video.learningPoints.items)).toBe(true)
        expect(video.learningPoints.items.length).toBeGreaterThan(0)

        // timestamps
        expect(video.timestamps.title).toBeTruthy()
        expect(Array.isArray(video.timestamps.items)).toBe(true)
        expect(video.timestamps.items.length).toBeGreaterThan(0)

        // tags
        expect(Array.isArray(video.tags)).toBe(true)
        expect(video.tags.length).toBeGreaterThan(0)
      })

      test('タイムスタンプ形式が正しい("00:00")', () => {
        video.timestamps.items.forEach(ts => {
          expect(ts.time).toMatch(/^\d{2}:\d{2}$/)
          expect(ts.label).toBeTruthy()
        })
      })

      test("共通データが正しく参照されている", () => {
        expect(video.social).toBeDefined()
        expect(video.social.title).toBeTruthy()
        expect(Array.isArray(video.social.accounts)).toBe(true)
        expect(video.social.accounts.length).toBeGreaterThan(0)

        expect(video.engagement).toBeDefined()
        expect(video.engagement.message).toBeTruthy()
        expect(video.engagement.callToAction).toBeTruthy()
      })

      // オプション項目の検証
      if (video.relatedVideos) {
        test("関連動画のURLが正しい", () => {
          expect(Array.isArray(video.relatedVideos.videos)).toBe(true)
          video.relatedVideos.videos.forEach(relatedVideo => {
            expect(relatedVideo.title).toBeTruthy()
            expect(relatedVideo.url).toMatch(/^https:\/\//)
          })
        })
      }

      if (video.udemyCourses) {
        test("Udemy講座のCTA URLが正しい", () => {
          expect(video.udemyCourses.title).toBeTruthy()
          expect(video.udemyCourses.cta.text).toBeTruthy()
          expect(video.udemyCourses.cta.url).toMatch(/^https:\/\//)
        })
      }

      if (video.customSections) {
        test("カスタムセクションの構造が正しい", () => {
          expect(Array.isArray(video.customSections)).toBe(true)
          video.customSections.forEach(section => {
            expect(section.title).toBeTruthy()
            expect(section.type).toMatch(/^(text|list|links|mixed)$/)

            if (section.type === "text") {
              expect(section.content).toBeTruthy()
            } else if (section.type === "list") {
              expect(Array.isArray(section.items)).toBe(true)
            } else if (section.type === "links") {
              expect(Array.isArray(section.links)).toBe(true)
            } else if (section.type === "mixed") {
              // 混合型は少なくとも1つの要素を持つ
              const hasContent = !!section.content
              const hasItems = !!(section.items && section.items.length > 0)
              const hasLinks = !!(section.links && section.links.length > 0)
              expect(hasContent || hasItems || hasLinks).toBe(true)
            }
          })
        })
      }

      if (video.discordCommunity) {
        test("Discordコミュニティ情報が正しい", () => {
          expect(video.discordCommunity.title).toBeTruthy()
          expect(video.discordCommunity.description).toBeTruthy()
          expect(video.discordCommunity.url).toMatch(/^https:\/\//)
        })
      }
    })
  })
})
