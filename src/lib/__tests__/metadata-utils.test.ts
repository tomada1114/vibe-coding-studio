import { generateChapterMetadata } from "../metadata-utils"

jest.mock("@/lib/navigation", () => ({
  navigation: [
    {
      title: "Ruby",
      slug: "ruby",
      links: [
        {
          title: "はじめに",
          href: "/docs/ruby/introduction",
          children: [
            {
              title: "Rubyの概要を学ぼう",
              href: "/docs/ruby/introduction/what_is_ruby",
            },
          ],
        },
        {
          title: "Rubyの文法",
          href: "/docs/ruby/ruby_syntax",
          children: [],
        },
      ],
    },
    {
      title: "Python",
      slug: "python",
      links: [
        {
          title: "はじめに",
          href: "/docs/python/introduction",
          children: [
            {
              title: "Pythonとは",
              href: "/docs/python/introduction/what_is_python",
            },
            {
              title: "Python開発環境",
              href: "/docs/python/introduction/setup",
            },
          ],
        },
      ],
    },
  ],
}))

describe("generateChapterMetadata", () => {
  let warnSpy: jest.SpyInstance

  beforeEach(() => {
    warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {})
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe("when course is found and chapter matches", () => {
    it("returns metadata with chapter title and course title", () => {
      const result = generateChapterMetadata("ruby", "introduction")

      expect(result.title).toBe("はじめに - Ruby")
    })

    it("includes description with lesson count", () => {
      const result = generateChapterMetadata("ruby", "introduction")

      expect(result.description).toContain("Ruby")
      expect(result.description).toContain("はじめに")
      expect(result.description).toContain("1個のレッスン")
    })
  })

  describe("when course is found but chapter has no children", () => {
    it("includes 0 lesson count in description", () => {
      const result = generateChapterMetadata("ruby", "ruby_syntax")

      expect(result.description).toContain("0個のレッスン")
    })
  })

  describe("when course is found but chapter does not match", () => {
    it("returns metadata with only course title", () => {
      const result = generateChapterMetadata("ruby", "nonexistent")

      expect(result.title).toBe("Ruby")
    })

    it("returns generic course description", () => {
      const result = generateChapterMetadata("ruby", "nonexistent")

      expect(result.description).toContain("Ruby")
      expect(result.description).toContain("カリキュラム")
    })
  })

  describe("when course is not found", () => {
    it("returns Not Found title", () => {
      const result = generateChapterMetadata("nonexistent", "chapter")

      expect(result.title).toBe("Not Found")
    })

    it("logs a warning", () => {
      generateChapterMetadata("nonexistent", "chapter")

      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining("[metadata-utils]")
      )
    })
  })

  describe("with multiple children in chapter", () => {
    it("shows correct lesson count", () => {
      const result = generateChapterMetadata("python", "introduction")

      expect(result.description).toContain("2個のレッスン")
    })
  })
})
