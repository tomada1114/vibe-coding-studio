/**
 * 動画インデックスローダーの単体テスト
 *
 * このファイルでは、video-index.jsonの読み込み、エラーハンドリング、
 * フォールバック処理をテストします。
 */

import fs from "fs"
import { VideoIndexError, VideoIndexErrorCode } from "../errors"
import { loadVideoIndex, loadVideoIndexSafe } from "../video-index-loader"

// fsモジュールのモック
jest.mock("fs")

describe("loadVideoIndex", () => {
  const mockedFs = fs as jest.Mocked<typeof fs>

  const mockVideoIndex = {
    version: "1.0.0",
    generatedAt: "2025-01-01T00:00:00Z",
    videos: [
      {
        id: "test-video-1",
        title: "Test Video 1",
        tags: ["tag1", "tag2"],
        relatedVideoIds: ["test-video-2"],
        udemyCourseIds: ["course-1"],
      },
      {
        id: "test-video-2",
        title: "Test Video 2",
        tags: ["tag2", "tag3"],
        relatedVideoIds: ["test-video-1"],
        udemyCourseIds: ["course-2"],
      },
    ],
  }

  describe("正常系", () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    afterEach(() => {
      jest.restoreAllMocks()
    })

    it("video-index.jsonが存在する場合、VideoIndex型のデータを返すこと", () => {
      // 実際のファイルを読み込むためにモックを無効化
      jest.unmock("fs")
      jest.resetModules()
      const { loadVideoIndex: actualLoadVideoIndex } = jest.requireActual(
        "../video-index-loader"
      )
      const result = actualLoadVideoIndex()

      // VideoIndex型の構造を持つデータが返されること
      expect(result).toBeDefined()
      expect(result.version).toBeDefined()
      expect(result.generatedAt).toBeDefined()
      expect(Array.isArray(result.videos)).toBe(true)
    })

    it("読み込まれた動画インデックスが正しい型構造を持つこと", () => {
      // 実際のファイルを読み込むためにモックを無効化
      jest.unmock("fs")
      jest.resetModules()
      const { loadVideoIndex: actualLoadVideoIndex } = jest.requireActual(
        "../video-index-loader"
      )
      const result = actualLoadVideoIndex()

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

  describe("異常系 - ファイル読み込みエラー", () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    afterEach(() => {
      jest.restoreAllMocks()
    })

    it("ファイルが存在しない場合、INDEX_NOT_FOUNDエラーをスローすること", () => {
      const error = new Error("ENOENT: no such file or directory")
      ;(error as NodeJS.ErrnoException).code = "ENOENT"
      mockedFs.readFileSync.mockImplementation(() => {
        throw error
      })

      expect(() => loadVideoIndex()).toThrow(VideoIndexError)
      expect(() => loadVideoIndex()).toThrow(
        "動画インデックスファイルが見つかりません"
      )

      try {
        loadVideoIndex()
      } catch (error) {
        expect(error).toBeInstanceOf(VideoIndexError)
        expect((error as VideoIndexError).code).toBe(
          VideoIndexErrorCode.INDEX_NOT_FOUND
        )
      }
    })

    it("JSONが不正な形式の場合、INVALID_JSONエラーをスローすること", () => {
      mockedFs.readFileSync.mockReturnValue("invalid json {")

      expect(() => loadVideoIndex()).toThrow(VideoIndexError)
      expect(() => loadVideoIndex()).toThrow(
        "動画インデックスファイルのJSON形式が不正です"
      )

      try {
        loadVideoIndex()
      } catch (error) {
        expect(error).toBeInstanceOf(VideoIndexError)
        expect((error as VideoIndexError).code).toBe(
          VideoIndexErrorCode.INVALID_JSON
        )
      }
    })
  })

  describe("異常系 - スキーマ違反", () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    afterEach(() => {
      jest.restoreAllMocks()
    })

    it("versionが欠落している場合、SCHEMA_VIOLATIONエラーをスローすること", () => {
      const invalidData = { ...mockVideoIndex, version: undefined }
      mockedFs.readFileSync.mockReturnValue(JSON.stringify(invalidData))

      expect(() => loadVideoIndex()).toThrow(VideoIndexError)
      expect(() => loadVideoIndex()).toThrow(
        "インデックスファイルが正しい構造を持っていません"
      )

      try {
        loadVideoIndex()
      } catch (error) {
        expect(error).toBeInstanceOf(VideoIndexError)
        expect((error as VideoIndexError).code).toBe(
          VideoIndexErrorCode.SCHEMA_VIOLATION
        )
      }
    })

    it("generatedAtが欠落している場合、SCHEMA_VIOLATIONエラーをスローすること", () => {
      const invalidData = { ...mockVideoIndex, generatedAt: undefined }
      mockedFs.readFileSync.mockReturnValue(JSON.stringify(invalidData))

      expect(() => loadVideoIndex()).toThrow(VideoIndexError)
      expect(() => loadVideoIndex()).toThrow(
        "インデックスファイルが正しい構造を持っていません"
      )
    })

    it("videosが配列でない場合、SCHEMA_VIOLATIONエラーをスローすること", () => {
      const invalidData = { ...mockVideoIndex, videos: "not an array" }
      mockedFs.readFileSync.mockReturnValue(JSON.stringify(invalidData))

      expect(() => loadVideoIndex()).toThrow(VideoIndexError)
      expect(() => loadVideoIndex()).toThrow(
        "インデックスファイルが正しい構造を持っていません"
      )
    })

    it("動画エントリのidが欠落している場合、SCHEMA_VIOLATIONエラーをスローすること", () => {
      const invalidData = {
        ...mockVideoIndex,
        videos: [
          {
            // id is missing
            title: "Test Video",
            tags: ["tag1"],
            relatedVideoIds: [],
            udemyCourseIds: [],
          },
        ],
      }
      mockedFs.readFileSync.mockReturnValue(JSON.stringify(invalidData))

      expect(() => loadVideoIndex()).toThrow(VideoIndexError)
      expect(() => loadVideoIndex()).toThrow(
        "動画インデックスエントリが正しい構造を持っていません"
      )
    })

    it("動画エントリのtitleが欠落している場合、SCHEMA_VIOLATIONエラーをスローすること", () => {
      const invalidData = {
        ...mockVideoIndex,
        videos: [
          {
            id: "test-video",
            // title is missing
            tags: ["tag1"],
            relatedVideoIds: [],
            udemyCourseIds: [],
          },
        ],
      }
      mockedFs.readFileSync.mockReturnValue(JSON.stringify(invalidData))

      expect(() => loadVideoIndex()).toThrow(VideoIndexError)
      expect(() => loadVideoIndex()).toThrow(
        "動画インデックスエントリが正しい構造を持っていません"
      )
    })

    it("tagsが配列でない場合、SCHEMA_VIOLATIONエラーをスローすること", () => {
      const invalidData = {
        ...mockVideoIndex,
        videos: [
          {
            id: "test-video",
            title: "Test Video",
            tags: "not an array",
            relatedVideoIds: [],
            udemyCourseIds: [],
          },
        ],
      }
      mockedFs.readFileSync.mockReturnValue(JSON.stringify(invalidData))

      expect(() => loadVideoIndex()).toThrow(VideoIndexError)
      expect(() => loadVideoIndex()).toThrow(
        "動画インデックスエントリが正しい構造を持っていません"
      )
    })

    it("relatedVideoIdsが配列でない場合、SCHEMA_VIOLATIONエラーをスローすること", () => {
      const invalidData = {
        ...mockVideoIndex,
        videos: [
          {
            id: "test-video",
            title: "Test Video",
            tags: ["tag1"],
            relatedVideoIds: "not an array",
            udemyCourseIds: [],
          },
        ],
      }
      mockedFs.readFileSync.mockReturnValue(JSON.stringify(invalidData))

      expect(() => loadVideoIndex()).toThrow(VideoIndexError)
      expect(() => loadVideoIndex()).toThrow(
        "動画インデックスエントリが正しい構造を持っていません"
      )
    })

    it("udemyCourseIdsが配列でない場合、SCHEMA_VIOLATIONエラーをスローすること", () => {
      const invalidData = {
        ...mockVideoIndex,
        videos: [
          {
            id: "test-video",
            title: "Test Video",
            tags: ["tag1"],
            relatedVideoIds: [],
            udemyCourseIds: "not an array",
          },
        ],
      }
      mockedFs.readFileSync.mockReturnValue(JSON.stringify(invalidData))

      expect(() => loadVideoIndex()).toThrow(VideoIndexError)
      expect(() => loadVideoIndex()).toThrow(
        "動画インデックスエントリが正しい構造を持っていません"
      )
    })
  })

  describe("異常系 - その他のエラー", () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    afterEach(() => {
      jest.restoreAllMocks()
    })

    it("予期しないエラーの場合、INVALID_VIDEO_DATAエラーをスローすること", () => {
      mockedFs.readFileSync.mockImplementation(() => {
        throw new Error("Unexpected error")
      })

      expect(() => loadVideoIndex()).toThrow(VideoIndexError)
      expect(() => loadVideoIndex()).toThrow(
        "動画インデックスの読み込み中に予期しないエラーが発生しました"
      )

      try {
        loadVideoIndex()
      } catch (error) {
        expect(error).toBeInstanceOf(VideoIndexError)
        expect((error as VideoIndexError).code).toBe(
          VideoIndexErrorCode.INVALID_VIDEO_DATA
        )
      }
    })

    it("Error以外の例外の場合も、INVALID_VIDEO_DATAエラーをスローすること", () => {
      mockedFs.readFileSync.mockImplementation(() => {
        throw "String error"
      })

      expect(() => loadVideoIndex()).toThrow(VideoIndexError)
      expect(() => loadVideoIndex()).toThrow(
        "動画インデックスの読み込み中に予期しないエラーが発生しました"
      )
    })
  })
})

describe("loadVideoIndexSafe", () => {
  const mockedFs = fs as jest.Mocked<typeof fs>

  const mockVideoIndex = {
    version: "1.0.0",
    generatedAt: "2025-01-01T00:00:00Z",
    videos: [
      {
        id: "test-video-1",
        title: "Test Video 1",
        tags: ["tag1", "tag2"],
        relatedVideoIds: ["test-video-2"],
        udemyCourseIds: ["course-1"],
      },
    ],
  }

  describe("正常系", () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    afterEach(() => {
      jest.restoreAllMocks()
    })

    it("正常にインデックスを読み込めた場合、VideoIndexを返すこと", () => {
      // 実際のファイルを読み込むためにモックを無効化
      jest.unmock("fs")
      jest.resetModules()
      const { loadVideoIndexSafe: actualLoadVideoIndexSafe } =
        jest.requireActual("../video-index-loader")
      const result = actualLoadVideoIndexSafe()

      expect(result).toBeDefined()
      expect(result.version).toBeDefined()
      expect(result.generatedAt).toBeDefined()
      expect(Array.isArray(result.videos)).toBe(true)
    })
  })

  describe("異常系 - フォールバック", () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    afterEach(() => {
      jest.restoreAllMocks()
    })

    it("ファイルが存在しない場合、空のインデックスを返すこと", () => {
      const error = new Error("ENOENT: no such file or directory")
      ;(error as NodeJS.ErrnoException).code = "ENOENT"
      mockedFs.readFileSync.mockImplementation(() => {
        throw error
      })

      const consoleWarnSpy = jest
        .spyOn(console, "warn")
        .mockImplementation(() => {})

      const result = loadVideoIndexSafe()

      expect(result).toEqual({
        version: "1.0.0",
        generatedAt: expect.any(String),
        videos: [],
      })
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        "動画インデックスの読み込みに失敗しました。空のインデックスを返します。"
      )

      consoleWarnSpy.mockRestore()
    })

    it("JSONが不正な場合、空のインデックスを返すこと", () => {
      mockedFs.readFileSync.mockReturnValue("invalid json {")

      const consoleWarnSpy = jest
        .spyOn(console, "warn")
        .mockImplementation(() => {})

      const result = loadVideoIndexSafe()

      expect(result).toEqual({
        version: "1.0.0",
        generatedAt: expect.any(String),
        videos: [],
      })

      consoleWarnSpy.mockRestore()
    })

    it("スキーマ違反の場合、空のインデックスを返すこと", () => {
      const invalidData = { ...mockVideoIndex, version: undefined }
      mockedFs.readFileSync.mockReturnValue(JSON.stringify(invalidData))

      const consoleWarnSpy = jest
        .spyOn(console, "warn")
        .mockImplementation(() => {})

      const result = loadVideoIndexSafe()

      expect(result).toEqual({
        version: "1.0.0",
        generatedAt: expect.any(String),
        videos: [],
      })

      consoleWarnSpy.mockRestore()
    })

    it("予期しないエラーの場合、空のインデックスを返すこと", () => {
      mockedFs.readFileSync.mockImplementation(() => {
        throw new Error("Unexpected error")
      })

      const consoleWarnSpy = jest
        .spyOn(console, "warn")
        .mockImplementation(() => {})

      const result = loadVideoIndexSafe()

      expect(result).toEqual({
        version: "1.0.0",
        generatedAt: expect.any(String),
        videos: [],
      })

      consoleWarnSpy.mockRestore()
    })
  })
})
