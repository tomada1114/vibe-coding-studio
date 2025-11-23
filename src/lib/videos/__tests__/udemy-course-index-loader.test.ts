/**
 * Udemy講座インデックスローダーの単体テスト
 *
 * このファイルでは、udemy-course-index.jsonの読み込み、エラーハンドリング、
 * フォールバック処理をテストします。
 */

import fs from "fs"
import { UdemyCourseIndexError, UdemyCourseIndexErrorCode } from "../errors"
import {
  loadUdemyCourseIndex,
  loadUdemyCourseIndexSafe,
} from "../udemy-course-index-loader"

// fsモジュールのモック
jest.mock("fs")

describe("loadUdemyCourseIndex", () => {
  const mockedFs = fs as jest.Mocked<typeof fs>

  const mockUdemyCourseIndex = {
    version: "1.0.0",
    generatedAt: "2025-01-01T00:00:00Z",
    courses: [
      {
        courseId: "course-1",
        title: "Test Course 1",
        topics: ["topic1", "topic2"],
        promotionUrl: "https://example.com/course-1",
        description: "Test description 1",
      },
      {
        courseId: "course-2",
        title: "Test Course 2",
        topics: ["topic2", "topic3"],
        promotionUrl: "https://example.com/course-2",
        description: "Test description 2",
      },
    ],
    topicMapping: {
      topic1: [{ courseId: "course-1", url: "https://example.com/course-1" }],
      topic2: [
        { courseId: "course-1", url: "https://example.com/course-1" },
        { courseId: "course-2", url: "https://example.com/course-2" },
      ],
      topic3: [{ courseId: "course-2", url: "https://example.com/course-2" }],
    },
  }

  describe("正常系", () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    afterEach(() => {
      jest.restoreAllMocks()
    })

    it("udemy-course-index.jsonが存在する場合、UdemyCourseIndex型のデータを返すこと", () => {
      // 実際のファイルを読み込むためにモックを無効化
      jest.unmock("fs")
      jest.resetModules()
      const { loadUdemyCourseIndex: actualLoadUdemyCourseIndex } =
        jest.requireActual("../udemy-course-index-loader")
      const result = actualLoadUdemyCourseIndex()

      // UdemyCourseIndex型の構造を持つデータが返されること
      expect(result).toHaveProperty("version")
      expect(result).toHaveProperty("generatedAt")
      expect(result).toHaveProperty("courses")
      expect(result).toHaveProperty("topicMapping")
      expect(Array.isArray(result.courses)).toBe(true)
      expect(typeof result.topicMapping).toBe("object")
    })

    it("読み込まれたUdemy講座インデックスが正しい型構造を持つこと", () => {
      // 実際のファイルを読み込むためにモックを無効化
      jest.unmock("fs")
      jest.resetModules()
      const { loadUdemyCourseIndex: actualLoadUdemyCourseIndex } =
        jest.requireActual("../udemy-course-index-loader")
      const result = actualLoadUdemyCourseIndex()

      // バージョンがセマンティックバージョニング形式
      expect(typeof result.version).toBe("string")
      expect(result.version).toMatch(/^\d+\.\d+\.\d+$/)

      // 生成日時がISO 8601形式
      expect(typeof result.generatedAt).toBe("string")
      expect(() => new Date(result.generatedAt)).not.toThrow()

      // courses配列の各要素が正しい構造を持つ
      if (result.courses.length > 0) {
        const course = result.courses[0]
        expect(typeof course.courseId).toBe("string")
        expect(typeof course.title).toBe("string")
        expect(Array.isArray(course.topics)).toBe(true)
        expect(typeof course.promotionUrl).toBe("string")
        expect(typeof course.description).toBe("string")
      }

      // topicMappingが正しい構造を持つ
      const topicKeys = Object.keys(result.topicMapping)
      if (topicKeys.length > 0) {
        const firstTopicKey = topicKeys[0]
        const mapping = result.topicMapping[firstTopicKey]
        expect(Array.isArray(mapping)).toBe(true)
        if (mapping.length > 0) {
          expect(typeof mapping[0].courseId).toBe("string")
          expect(typeof mapping[0].url).toBe("string")
        }
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

      expect(() => loadUdemyCourseIndex()).toThrow(UdemyCourseIndexError)
      expect(() => loadUdemyCourseIndex()).toThrow(
        "Udemy講座インデックスファイルが見つかりません"
      )

      try {
        loadUdemyCourseIndex()
      } catch (error) {
        expect(error).toBeInstanceOf(UdemyCourseIndexError)
        expect((error as UdemyCourseIndexError).code).toBe(
          UdemyCourseIndexErrorCode.INDEX_NOT_FOUND
        )
      }
    })

    it("JSONが不正な形式の場合、INVALID_JSONエラーをスローすること", () => {
      mockedFs.readFileSync.mockReturnValue("invalid json {")

      expect(() => loadUdemyCourseIndex()).toThrow(UdemyCourseIndexError)
      expect(() => loadUdemyCourseIndex()).toThrow(
        "Udemy講座インデックスファイルのJSON形式が不正です"
      )

      try {
        loadUdemyCourseIndex()
      } catch (error) {
        expect(error).toBeInstanceOf(UdemyCourseIndexError)
        expect((error as UdemyCourseIndexError).code).toBe(
          UdemyCourseIndexErrorCode.INVALID_JSON
        )
      }
    })
  })

  describe("異常系 - スキーマ違反（基本構造）", () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    afterEach(() => {
      jest.restoreAllMocks()
    })

    it("versionが欠落している場合、SCHEMA_VIOLATIONエラーをスローすること", () => {
      const invalidData = { ...mockUdemyCourseIndex, version: undefined }
      mockedFs.readFileSync.mockReturnValue(JSON.stringify(invalidData))

      expect(() => loadUdemyCourseIndex()).toThrow(UdemyCourseIndexError)
      expect(() => loadUdemyCourseIndex()).toThrow(
        "インデックスファイルが正しい構造を持っていません"
      )

      try {
        loadUdemyCourseIndex()
      } catch (error) {
        expect(error).toBeInstanceOf(UdemyCourseIndexError)
        expect((error as UdemyCourseIndexError).code).toBe(
          UdemyCourseIndexErrorCode.SCHEMA_VIOLATION
        )
      }
    })

    it("generatedAtが欠落している場合、SCHEMA_VIOLATIONエラーをスローすること", () => {
      const invalidData = { ...mockUdemyCourseIndex, generatedAt: undefined }
      mockedFs.readFileSync.mockReturnValue(JSON.stringify(invalidData))

      expect(() => loadUdemyCourseIndex()).toThrow(UdemyCourseIndexError)
      expect(() => loadUdemyCourseIndex()).toThrow(
        "インデックスファイルが正しい構造を持っていません"
      )
    })

    it("coursesが配列でない場合、SCHEMA_VIOLATIONエラーをスローすること", () => {
      const invalidData = { ...mockUdemyCourseIndex, courses: "not an array" }
      mockedFs.readFileSync.mockReturnValue(JSON.stringify(invalidData))

      expect(() => loadUdemyCourseIndex()).toThrow(UdemyCourseIndexError)
      expect(() => loadUdemyCourseIndex()).toThrow(
        "インデックスファイルが正しい構造を持っていません"
      )
    })

    it("topicMappingがオブジェクトでない場合、SCHEMA_VIOLATIONエラーをスローすること", () => {
      const invalidData = {
        ...mockUdemyCourseIndex,
        topicMapping: "not an object",
      }
      mockedFs.readFileSync.mockReturnValue(JSON.stringify(invalidData))

      expect(() => loadUdemyCourseIndex()).toThrow(UdemyCourseIndexError)
      expect(() => loadUdemyCourseIndex()).toThrow(
        "インデックスファイルが正しい構造を持っていません"
      )
    })
  })

  describe("異常系 - スキーマ違反（講座エントリ）", () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    afterEach(() => {
      jest.restoreAllMocks()
    })

    it("講座エントリのcourseIdが欠落している場合、SCHEMA_VIOLATIONエラーをスローすること", () => {
      const invalidData = {
        ...mockUdemyCourseIndex,
        courses: [
          {
            // courseId is missing
            title: "Test Course",
            topics: ["topic1"],
            promotionUrl: "https://example.com/course",
            description: "Test description",
          },
        ],
      }
      mockedFs.readFileSync.mockReturnValue(JSON.stringify(invalidData))

      expect(() => loadUdemyCourseIndex()).toThrow(UdemyCourseIndexError)
      expect(() => loadUdemyCourseIndex()).toThrow(
        "講座インデックスエントリが正しい構造を持っていません"
      )
    })

    it("講座エントリのtitleが欠落している場合、SCHEMA_VIOLATIONエラーをスローすること", () => {
      const invalidData = {
        ...mockUdemyCourseIndex,
        courses: [
          {
            courseId: "course-1",
            // title is missing
            topics: ["topic1"],
            promotionUrl: "https://example.com/course",
            description: "Test description",
          },
        ],
      }
      mockedFs.readFileSync.mockReturnValue(JSON.stringify(invalidData))

      expect(() => loadUdemyCourseIndex()).toThrow(UdemyCourseIndexError)
      expect(() => loadUdemyCourseIndex()).toThrow(
        "講座インデックスエントリが正しい構造を持っていません"
      )
    })

    it("講座エントリのtopicsが配列でない場合、SCHEMA_VIOLATIONエラーをスローすること", () => {
      const invalidData = {
        ...mockUdemyCourseIndex,
        courses: [
          {
            courseId: "course-1",
            title: "Test Course",
            topics: "not an array",
            promotionUrl: "https://example.com/course",
            description: "Test description",
          },
        ],
      }
      mockedFs.readFileSync.mockReturnValue(JSON.stringify(invalidData))

      expect(() => loadUdemyCourseIndex()).toThrow(UdemyCourseIndexError)
      expect(() => loadUdemyCourseIndex()).toThrow(
        "講座インデックスエントリが正しい構造を持っていません"
      )
    })

    it("講座エントリのpromotionUrlが欠落している場合、SCHEMA_VIOLATIONエラーをスローすること", () => {
      const invalidData = {
        ...mockUdemyCourseIndex,
        courses: [
          {
            courseId: "course-1",
            title: "Test Course",
            topics: ["topic1"],
            // promotionUrl is missing
            description: "Test description",
          },
        ],
      }
      mockedFs.readFileSync.mockReturnValue(JSON.stringify(invalidData))

      expect(() => loadUdemyCourseIndex()).toThrow(UdemyCourseIndexError)
      expect(() => loadUdemyCourseIndex()).toThrow(
        "講座インデックスエントリが正しい構造を持っていません"
      )
    })

    it("講座エントリのdescriptionが欠落している場合、SCHEMA_VIOLATIONエラーをスローすること", () => {
      const invalidData = {
        ...mockUdemyCourseIndex,
        courses: [
          {
            courseId: "course-1",
            title: "Test Course",
            topics: ["topic1"],
            promotionUrl: "https://example.com/course",
            // description is missing
          },
        ],
      }
      mockedFs.readFileSync.mockReturnValue(JSON.stringify(invalidData))

      expect(() => loadUdemyCourseIndex()).toThrow(UdemyCourseIndexError)
      expect(() => loadUdemyCourseIndex()).toThrow(
        "講座インデックスエントリが正しい構造を持っていません"
      )
    })
  })

  describe("異常系 - スキーマ違反（トピックマッピング）", () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    afterEach(() => {
      jest.restoreAllMocks()
    })

    it("トピックマッピングの値が配列でない場合、SCHEMA_VIOLATIONエラーをスローすること", () => {
      const invalidData = {
        ...mockUdemyCourseIndex,
        topicMapping: {
          topic1: "not an array",
        },
      }
      mockedFs.readFileSync.mockReturnValue(JSON.stringify(invalidData))

      expect(() => loadUdemyCourseIndex()).toThrow(UdemyCourseIndexError)
      expect(() => loadUdemyCourseIndex()).toThrow(
        'トピックマッピング "topic1" が配列ではありません'
      )
    })

    it("トピックマッピングエントリのcourseIdが欠落している場合、SCHEMA_VIOLATIONエラーをスローすること", () => {
      const invalidData = {
        ...mockUdemyCourseIndex,
        topicMapping: {
          topic1: [
            {
              // courseId is missing
              url: "https://example.com/course",
            },
          ],
        },
      }
      mockedFs.readFileSync.mockReturnValue(JSON.stringify(invalidData))

      expect(() => loadUdemyCourseIndex()).toThrow(UdemyCourseIndexError)
      expect(() => loadUdemyCourseIndex()).toThrow(
        'トピックマッピング "topic1" のエントリが正しい構造を持っていません'
      )
    })

    it("トピックマッピングエントリのurlが欠落している場合、SCHEMA_VIOLATIONエラーをスローすること", () => {
      const invalidData = {
        ...mockUdemyCourseIndex,
        topicMapping: {
          topic1: [
            {
              courseId: "course-1",
              // url is missing
            },
          ],
        },
      }
      mockedFs.readFileSync.mockReturnValue(JSON.stringify(invalidData))

      expect(() => loadUdemyCourseIndex()).toThrow(UdemyCourseIndexError)
      expect(() => loadUdemyCourseIndex()).toThrow(
        'トピックマッピング "topic1" のエントリが正しい構造を持っていません'
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

    it("予期しないエラーの場合、INVALID_COURSE_DATAエラーをスローすること", () => {
      mockedFs.readFileSync.mockImplementation(() => {
        throw new Error("Unexpected error")
      })

      expect(() => loadUdemyCourseIndex()).toThrow(UdemyCourseIndexError)
      expect(() => loadUdemyCourseIndex()).toThrow(
        "Udemy講座インデックスの読み込み中に予期しないエラーが発生しました"
      )

      try {
        loadUdemyCourseIndex()
      } catch (error) {
        expect(error).toBeInstanceOf(UdemyCourseIndexError)
        expect((error as UdemyCourseIndexError).code).toBe(
          UdemyCourseIndexErrorCode.INVALID_COURSE_DATA
        )
      }
    })

    it("Error以外の例外の場合も、INVALID_COURSE_DATAエラーをスローすること", () => {
      mockedFs.readFileSync.mockImplementation(() => {
        throw "String error"
      })

      expect(() => loadUdemyCourseIndex()).toThrow(UdemyCourseIndexError)
      expect(() => loadUdemyCourseIndex()).toThrow(
        "Udemy講座インデックスの読み込み中に予期しないエラーが発生しました"
      )
    })
  })
})

describe("loadUdemyCourseIndexSafe", () => {
  const mockedFs = fs as jest.Mocked<typeof fs>

  const mockUdemyCourseIndex = {
    version: "1.0.0",
    generatedAt: "2025-01-01T00:00:00Z",
    courses: [
      {
        courseId: "course-1",
        title: "Test Course 1",
        topics: ["topic1", "topic2"],
        promotionUrl: "https://example.com/course-1",
        description: "Test description 1",
      },
    ],
    topicMapping: {
      topic1: [{ courseId: "course-1", url: "https://example.com/course-1" }],
    },
  }

  describe("正常系", () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    afterEach(() => {
      jest.restoreAllMocks()
    })

    it("正常にインデックスを読み込めた場合、UdemyCourseIndexを返すこと", () => {
      // 実際のファイルを読み込むためにモックを無効化
      jest.unmock("fs")
      jest.resetModules()
      const { loadUdemyCourseIndexSafe: actualLoadUdemyCourseIndexSafe } =
        jest.requireActual("../udemy-course-index-loader")
      const result = actualLoadUdemyCourseIndexSafe()

      expect(result).toBeDefined()
      expect(result.version).toBeDefined()
      expect(result.generatedAt).toBeDefined()
      expect(Array.isArray(result.courses)).toBe(true)
      expect(typeof result.topicMapping).toBe("object")
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

      const result = loadUdemyCourseIndexSafe()

      expect(result).toEqual({
        version: "1.0.0",
        generatedAt: expect.any(String),
        courses: [],
        topicMapping: {},
      })
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        "Udemy講座インデックスの読み込みに失敗しました。空のインデックスを返します。"
      )

      consoleWarnSpy.mockRestore()
    })

    it("JSONが不正な場合、空のインデックスを返すこと", () => {
      mockedFs.readFileSync.mockReturnValue("invalid json {")

      const consoleWarnSpy = jest
        .spyOn(console, "warn")
        .mockImplementation(() => {})

      const result = loadUdemyCourseIndexSafe()

      expect(result).toEqual({
        version: "1.0.0",
        generatedAt: expect.any(String),
        courses: [],
        topicMapping: {},
      })

      consoleWarnSpy.mockRestore()
    })

    it("スキーマ違反の場合、空のインデックスを返すこと", () => {
      const invalidData = { ...mockUdemyCourseIndex, version: undefined }
      mockedFs.readFileSync.mockReturnValue(JSON.stringify(invalidData))

      const consoleWarnSpy = jest
        .spyOn(console, "warn")
        .mockImplementation(() => {})

      const result = loadUdemyCourseIndexSafe()

      expect(result).toEqual({
        version: "1.0.0",
        generatedAt: expect.any(String),
        courses: [],
        topicMapping: {},
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

      const result = loadUdemyCourseIndexSafe()

      expect(result).toEqual({
        version: "1.0.0",
        generatedAt: expect.any(String),
        courses: [],
        topicMapping: {},
      })

      consoleWarnSpy.mockRestore()
    })
  })
})
