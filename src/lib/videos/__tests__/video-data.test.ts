import { describe, expect, test } from "@jest/globals"
import {
  getAllVideoIds,
  getAllVideos,
  getLatestVideos,
  getVideoById,
} from "../video-data"

/**
 * タスク3.4: データローダーの単体テスト
 * Requirements: 4.1, 4.2, 10.6
 */
describe("データローダーの単体テスト", () => {
  describe("getAllVideos()", () => {
    test("すべての動画データを返す", () => {
      const videos = getAllVideos()
      expect(videos).toBeDefined()
      expect(Array.isArray(videos)).toBe(true)
      expect(videos.length).toBeGreaterThan(0)
    })

    test("返される配列は同じ参照である(キャッシュ)", () => {
      const videos1 = getAllVideos()
      const videos2 = getAllVideos()
      expect(videos1).toBe(videos2)
    })
  })

  describe("getLatestVideos()", () => {
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

    test("ソート結果がキャッシュされる", () => {
      const videos1 = getLatestVideos()
      const videos2 = getLatestVideos()
      expect(videos1).toBe(videos2) // 同じ参照
    })

    test("getAllVideos()とは異なる配列を返す", () => {
      const allVideos = getAllVideos()
      const latestVideos = getLatestVideos()
      expect(allVideos).not.toBe(latestVideos) // 異なる参照
    })
  })

  describe("getVideoById()", () => {
    test("指定されたIDの動画データを返す", () => {
      const video = getVideoById("video-001")
      expect(video).toBeDefined()
      expect(video?.id).toBe("video-001")
      expect(video?.title).toBeTruthy()
    })

    test("存在しない動画IDでundefinedを返す", () => {
      const video = getVideoById("nonexistent-id")
      expect(video).toBeUndefined()
    })

    test("空文字列でundefinedを返す", () => {
      const video = getVideoById("")
      expect(video).toBeUndefined()
    })

    test("複数の動画を正しく取得できる", () => {
      const video1 = getVideoById("video-001")
      const video2 = getVideoById("video-002")
      expect(video1).toBeDefined()
      expect(video2).toBeDefined()
      expect(video1?.id).not.toBe(video2?.id)
    })
  })

  describe("getAllVideoIds()", () => {
    test("すべての動画IDを返す", () => {
      const ids = getAllVideoIds()
      expect(Array.isArray(ids)).toBe(true)
      expect(ids.length).toBeGreaterThan(0)
    })

    test("既知の動画IDが含まれている", () => {
      const ids = getAllVideoIds()
      expect(ids).toContain("video-001")
      expect(ids).toContain("video-002")
    })

    test("動画IDの数がgetAllVideos()の長さと一致する", () => {
      const ids = getAllVideoIds()
      const videos = getAllVideos()
      expect(ids.length).toBe(videos.length)
    })

    test("重複したIDが含まれていない", () => {
      const ids = getAllVideoIds()
      const uniqueIds = [...new Set(ids)]
      expect(ids.length).toBe(uniqueIds.length)
    })
  })
})

/**
 * タスク3.1: 動画データの型チェックと基本検証テスト
 * Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6
 */
describe("タスク3.1: 動画データの型チェックと基本検証", () => {
  const allVideos = getAllVideos()

  describe("データの存在確認", () => {
    test("動画データが存在する", () => {
      expect(allVideos).toBeDefined()
      expect(allVideos.length).toBeGreaterThan(0)
    })
  })

  allVideos.forEach(video => {
    describe(`動画: ${video.title}`, () => {
      describe("必須項目の検証", () => {
        test("idが存在し、空文字列でない", () => {
          expect(video.id).toBeTruthy()
          expect(typeof video.id).toBe("string")
          expect(video.id.length).toBeGreaterThan(0)
        })

        test("titleが存在し、空文字列でない", () => {
          expect(video.title).toBeTruthy()
          expect(typeof video.title).toBe("string")
          expect(video.title.length).toBeGreaterThan(0)
        })

        test("publishedAtがISO 8601形式である", () => {
          expect(video.publishedAt).toBeTruthy()
          expect(typeof video.publishedAt).toBe("string")
          // ISO 8601形式: YYYY-MM-DDTHH:MM:SS+TZ
          expect(video.publishedAt).toMatch(/^\d{4}-\d{2}-\d{2}T/)

          // 有効な日付としてパースできることを確認
          const date = new Date(video.publishedAt)
          expect(date).toBeInstanceOf(Date)
          expect(isNaN(date.getTime())).toBe(false)
        })

        test("videoUrlが正しいYouTube URLである", () => {
          expect(video.videoUrl).toBeTruthy()
          expect(typeof video.videoUrl).toBe("string")
          // YouTube URLの形式: https://www.youtube.com/watch?v= または https://youtu.be/
          expect(video.videoUrl).toMatch(
            /^https:\/\/(www\.youtube\.com\/watch\?v=|youtu\.be\/)/
          )
        })
      })
    })
  })
})

/**
 * タスク3.2: 配列とセクション構造の検証テスト
 * Requirements: 4.3, 4.5
 */
describe("タスク3.2: 配列とセクション構造の検証", () => {
  const allVideos = getAllVideos()

  allVideos.forEach(video => {
    describe(`動画: ${video.title}`, () => {
      describe("必須セクションの配列検証", () => {
        test("openingが存在し、linesが配列で空でない", () => {
          expect(video.opening).toBeDefined()
          expect(Array.isArray(video.opening.lines)).toBe(true)
          expect(video.opening.lines.length).toBeGreaterThan(0)

          // 各行が文字列であることを確認
          video.opening.lines.forEach(line => {
            expect(typeof line).toBe("string")
            expect(line.length).toBeGreaterThan(0)
          })
        })

        test("learningPointsが存在し、必須項目を持つ", () => {
          expect(video.learningPoints).toBeDefined()
          expect(video.learningPoints.title).toBeTruthy()
          expect(typeof video.learningPoints.title).toBe("string")

          expect(Array.isArray(video.learningPoints.items)).toBe(true)
          expect(video.learningPoints.items.length).toBeGreaterThan(0)

          // 各項目が文字列であることを確認
          video.learningPoints.items.forEach(item => {
            expect(typeof item).toBe("string")
            expect(item.length).toBeGreaterThan(0)
          })
        })

        test("timestampsが存在し、必須項目を持つ", () => {
          expect(video.timestamps).toBeDefined()
          expect(video.timestamps.title).toBeTruthy()
          expect(typeof video.timestamps.title).toBe("string")

          expect(Array.isArray(video.timestamps.items)).toBe(true)
          expect(video.timestamps.items.length).toBeGreaterThan(0)
        })

        test('タイムスタンプ形式が正しい("00:00"形式)', () => {
          video.timestamps.items.forEach(ts => {
            expect(ts.time).toMatch(/^\d{2}:\d{2}$/)
            expect(ts.label).toBeTruthy()
            expect(typeof ts.label).toBe("string")
            expect(ts.label.length).toBeGreaterThan(0)
          })
        })

        test("tagsが配列で空でない", () => {
          expect(Array.isArray(video.tags)).toBe(true)
          expect(video.tags.length).toBeGreaterThan(0)

          // 各タグが文字列であることを確認
          video.tags.forEach(tag => {
            expect(typeof tag).toBe("string")
            expect(tag.length).toBeGreaterThan(0)
          })
        })
      })

      describe("共通データの参照検証", () => {
        test("socialセクションが正しく参照されている", () => {
          expect(video.social).toBeDefined()
          expect(video.social.title).toBeTruthy()
          expect(typeof video.social.title).toBe("string")

          expect(Array.isArray(video.social.accounts)).toBe(true)
          expect(video.social.accounts.length).toBeGreaterThan(0)

          // 各アカウントの構造を検証
          video.social.accounts.forEach(account => {
            expect(account.platform).toBeTruthy()
            expect(account.emoji).toBeTruthy()
            expect(account.url).toMatch(/^https:\/\//)
          })
        })

        test("engagementセクションが正しく参照されている", () => {
          expect(video.engagement).toBeDefined()
          expect(video.engagement.message).toBeTruthy()
          expect(typeof video.engagement.message).toBe("string")
          expect(video.engagement.callToAction).toBeTruthy()
          expect(typeof video.engagement.callToAction).toBe("string")
        })
      })
    })
  })
})

/**
 * タスク3.3: オプション項目とカスタムセクションの検証テスト
 * Requirements: 4.3, 4.6, 7.1, 7.2, 7.3
 */
describe("タスク3.3: オプション項目とカスタムセクションの検証", () => {
  const allVideos = getAllVideos()

  allVideos.forEach(video => {
    describe(`動画: ${video.title}`, () => {
      if (video.relatedVideos) {
        describe("関連動画セクションの検証", () => {
          test("関連動画の構造が正しい", () => {
            expect(video.relatedVideos.title).toBeTruthy()
            expect(Array.isArray(video.relatedVideos.videos)).toBe(true)
          })

          test("関連動画のURLが正しい", () => {
            video.relatedVideos.videos.forEach(relatedVideo => {
              expect(relatedVideo.title).toBeTruthy()
              expect(typeof relatedVideo.title).toBe("string")
              expect(relatedVideo.url).toMatch(/^https:\/\//)

              if (relatedVideo.emoji) {
                expect(typeof relatedVideo.emoji).toBe("string")
              }
            })
          })
        })
      }

      if (video.udemyCourses) {
        describe("Udemy講座セクションの検証", () => {
          test("Udemy講座の構造が正しい", () => {
            expect(video.udemyCourses.title).toBeTruthy()
            expect(video.udemyCourses.cta).toBeDefined()
            expect(video.udemyCourses.cta.text).toBeTruthy()
            expect(video.udemyCourses.cta.url).toMatch(/^https:\/\//)
          })

          test("Udemy講座の説明が存在する場合は文字列である", () => {
            if (video.udemyCourses.description) {
              expect(typeof video.udemyCourses.description).toBe("string")
            }
          })

          test("Udemy講座リストが存在する場合は配列である", () => {
            if (video.udemyCourses.courses) {
              expect(Array.isArray(video.udemyCourses.courses)).toBe(true)
              video.udemyCourses.courses.forEach(course => {
                expect(typeof course).toBe("string")
                expect(course.length).toBeGreaterThan(0)
              })
            }
          })
        })
      }

      if (video.customSections) {
        describe("カスタムセクションの検証", () => {
          test("カスタムセクションが配列である", () => {
            expect(Array.isArray(video.customSections)).toBe(true)
          })

          test("各カスタムセクションの構造が正しい", () => {
            video.customSections.forEach(section => {
              expect(section.title).toBeTruthy()
              expect(typeof section.title).toBe("string")
              expect(section.type).toMatch(/^(text|list|links|mixed)$/)

              if (section.type === "text") {
                expect(section.content).toBeTruthy()
                expect(typeof section.content).toBe("string")
              } else if (section.type === "list") {
                expect(Array.isArray(section.items)).toBe(true)
                expect(section.items.length).toBeGreaterThan(0)
                section.items.forEach(item => {
                  expect(typeof item).toBe("string")
                })
              } else if (section.type === "links") {
                expect(Array.isArray(section.links)).toBe(true)
                expect(section.links.length).toBeGreaterThan(0)
                section.links.forEach(link => {
                  expect(link.label).toBeTruthy()
                  expect(link.url).toMatch(/^https:\/\//)
                })
              } else if (section.type === "mixed") {
                // 混合型は少なくとも1つの要素を持つ
                const hasContent = !!section.content
                const hasItems = !!(section.items && section.items.length > 0)
                const hasLinks = !!(section.links && section.links.length > 0)
                expect(hasContent || hasItems || hasLinks).toBe(true)
              }
            })
          })
        })
      }

      if (video.discordCommunity) {
        describe("Discordコミュニティセクションの検証", () => {
          test("Discordコミュニティ情報が正しい", () => {
            expect(video.discordCommunity.title).toBeTruthy()
            expect(typeof video.discordCommunity.title).toBe("string")
            expect(video.discordCommunity.description).toBeTruthy()
            expect(typeof video.discordCommunity.description).toBe("string")
            expect(video.discordCommunity.url).toMatch(/^https:\/\//)
          })

          test("isFreeフラグが存在する場合はbooleanである", () => {
            if (
              video.discordCommunity.isFree !== null &&
              video.discordCommunity.isFree !== undefined
            ) {
              expect(typeof video.discordCommunity.isFree).toBe("boolean")
            }
          })
        })
      }
    })
  })
})
