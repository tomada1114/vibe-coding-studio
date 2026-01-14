/**
 * Category Configuration Tests
 *
 * Tests for category display names and icons.
 */

import { describe, expect, test } from "@jest/globals"
import {
  getCategoryIcon,
  getCategoryInfo,
  getDeviconSlug,
  isDeviconCategory,
} from "../categories"

describe("categories.ts", () => {
  describe("isDeviconCategory()", () => {
    // Happy Path
    test("プログラミングカテゴリ（JavaScript）はtrueを返す", () => {
      // Given: カテゴリが 'javascript'
      // When: isDeviconCategory('javascript') を呼び出す
      const result = isDeviconCategory("javascript")

      // Then: true が返される
      expect(result).toBe(true)
    })

    test("プログラミングカテゴリ（TypeScript）はtrueを返す", () => {
      expect(isDeviconCategory("typescript")).toBe(true)
    })

    test("プログラミングカテゴリ（React）はtrueを返す", () => {
      expect(isDeviconCategory("react")).toBe(true)
    })

    // Sad Path
    test("非プログラミングカテゴリ（news）はfalseを返す", () => {
      // Given: カテゴリが 'news'
      // When: isDeviconCategory('news') を呼び出す
      const result = isDeviconCategory("news")

      // Then: false が返される
      expect(result).toBe(false)
    })

    test("未定義カテゴリはfalseを返す", () => {
      // Given: カテゴリが 'unknown-category'
      // When: isDeviconCategory('unknown-category') を呼び出す
      const result = isDeviconCategory("unknown-category")

      // Then: false が返される
      expect(result).toBe(false)
    })

    // Edge Case
    test("大文字のカテゴリ名はfalseを返す（厳密マッチング）", () => {
      // Given: カテゴリが 'JAVASCRIPT'
      // When: isDeviconCategory('JAVASCRIPT') を呼び出す
      const result = isDeviconCategory("JAVASCRIPT")

      // Then: false が返される（大文字小文字の厳密マッチング）
      expect(result).toBe(false)
    })

    test("空文字列はfalseを返す", () => {
      expect(isDeviconCategory("")).toBe(false)
    })
  })

  describe("getDeviconSlug()", () => {
    // Happy Path
    test("有効なカテゴリ（TypeScript）で正しいスラッグが返される", () => {
      // Given: カテゴリが 'typescript'
      // When: getDeviconSlug('typescript') を呼び出す
      const result = getDeviconSlug("typescript")

      // Then: 'typescript' が返される
      expect(result).toBe("typescript")
    })

    test("マッピングが異なるカテゴリ（Vue）で正しいスラッグが返される", () => {
      // Given: カテゴリが 'vue'
      // When: getDeviconSlug('vue') を呼び出す
      const result = getDeviconSlug("vue")

      // Then: 'vuejs' が返される（マッピング変換）
      expect(result).toBe("vuejs")
    })

    test("HTML5マッピング", () => {
      expect(getDeviconSlug("html")).toBe("html5")
    })

    test("CSS3マッピング", () => {
      expect(getDeviconSlug("css")).toBe("css3")
    })

    // Sad Path
    test("未定義カテゴリではundefinedが返される", () => {
      // Given: カテゴリが 'nonexistent'
      // When: getDeviconSlug('nonexistent') を呼び出す
      const result = getDeviconSlug("nonexistent")

      // Then: undefined が返される
      expect(result).toBeUndefined()
    })
  })

  describe("getCategoryIcon()", () => {
    // Happy Path - Devicon
    test("Deviconカテゴリ（React）で正しいアイコンが返される", () => {
      // Given: カテゴリが 'react'、サイズが 'md'
      // When: getCategoryIcon('react', 'md') を呼び出す
      const result = getCategoryIcon("react", "md")

      // Then: Deviconアイコンオブジェクトが返される
      expect(result).toEqual({
        type: "devicon",
        value: "react",
        size: "md",
      })
    })

    // Happy Path - Emoji
    test("絵文字カテゴリ（Tutorial）で正しいアイコンが返される", () => {
      // Given: カテゴリが 'tutorial'、サイズが 'sm'
      // When: getCategoryIcon('tutorial', 'sm') を呼び出す
      const result = getCategoryIcon("tutorial", "sm")

      // Then: 絵文字アイコンオブジェクトが返される
      expect(result).toEqual({
        type: "emoji",
        value: "📚",
        size: "sm",
      })
    })

    test("Newsカテゴリで📰絵文字が返される", () => {
      const result = getCategoryIcon("news")
      expect(result.type).toBe("emoji")
      expect(result.value).toBe("📰")
    })

    // Sad Path
    test("未定義カテゴリでデフォルト絵文字📌が返される", () => {
      // Given: カテゴリが 'unknown'
      // When: getCategoryIcon('unknown') を呼び出す
      const result = getCategoryIcon("unknown")

      // Then: フォールバック絵文字が返される
      expect(result).toEqual({
        type: "emoji",
        value: "📌",
        size: "sm",
      })
    })

    // Edge Case
    test("サイズ指定なしでデフォルト'sm'が適用される", () => {
      // Given: サイズ引数を省略
      // When: getCategoryIcon('javascript') を呼び出す
      const result = getCategoryIcon("javascript")

      // Then: size: 'sm' がデフォルト適用される
      expect(result.size).toBe("sm")
    })

    test("サイズ'lg'が正しく適用される", () => {
      // Given: サイズが 'lg'
      // When: getCategoryIcon('react', 'lg') を呼び出す
      const result = getCategoryIcon("react", "lg")

      // Then: size: 'lg' が適用される
      expect(result.size).toBe("lg")
    })
  })

  describe("getCategoryInfo()", () => {
    // Happy Path - Programming
    test("プログラミングカテゴリ（Python）で正しい情報が返される", () => {
      // Given: カテゴリが 'python'
      // When: getCategoryInfo('python') を呼び出す
      const result = getCategoryInfo("python")

      // Then: 正しい名前とDeviconアイコンが返される
      expect(result).toEqual({
        name: "Python",
        icon: {
          type: "devicon",
          value: "python",
          size: "sm",
        },
      })
    })

    test("Next.jsカテゴリで正しい情報が返される", () => {
      const result = getCategoryInfo("nextjs")
      expect(result.name).toBe("Next.js")
      expect(result.icon.type).toBe("devicon")
      expect(result.icon.value).toBe("nextjs")
    })

    // Happy Path - Non-programming
    test("非プログラミングカテゴリ（Career）で正しい情報が返される", () => {
      // Given: カテゴリが 'career'
      // When: getCategoryInfo('career') を呼び出す
      const result = getCategoryInfo("career")

      // Then: 正しい名前と絵文字アイコンが返される
      expect(result).toEqual({
        name: "Career",
        icon: {
          type: "emoji",
          value: "👔",
          size: "sm",
        },
      })
    })

    test("Tipsカテゴリで💡絵文字が返される", () => {
      const result = getCategoryInfo("tips")
      expect(result.name).toBe("Tips")
      expect(result.icon.value).toBe("💡")
    })

    // Sad Path
    test("未定義カテゴリでカテゴリ名がそのまま返される", () => {
      // Given: カテゴリが 'custom-category'
      // When: getCategoryInfo('custom-category') を呼び出す
      const result = getCategoryInfo("custom-category")

      // Then: name がカテゴリ名そのまま、フォールバックアイコン
      expect(result).toEqual({
        name: "custom-category",
        icon: {
          type: "emoji",
          value: "📌",
          size: "sm",
        },
      })
    })

    // Edge Case
    test("サイズ指定なしでデフォルト'sm'が適用される", () => {
      // Given: サイズ引数を省略
      // When: getCategoryInfo('python') を呼び出す
      const result = getCategoryInfo("python")

      // Then: icon.size: 'sm' がデフォルト適用される
      expect(result.icon.size).toBe("sm")
    })

    test("サイズ'lg'が正しく適用される", () => {
      const result = getCategoryInfo("react", "lg")
      expect(result.icon.size).toBe("lg")
    })

    test("空文字列カテゴリでフォールバック動作", () => {
      // Given: カテゴリが ''
      // When: getCategoryInfo('') を呼び出す
      const result = getCategoryInfo("")

      // Then: name が空文字列、フォールバックアイコン
      expect(result.name).toBe("")
      expect(result.icon.type).toBe("emoji")
      expect(result.icon.value).toBe("📌")
    })
  })

  describe("全プログラミングカテゴリの網羅テスト", () => {
    const programmingCategories = [
      { key: "javascript", name: "JavaScript", devicon: "javascript" },
      { key: "typescript", name: "TypeScript", devicon: "typescript" },
      { key: "react", name: "React", devicon: "react" },
      { key: "vue", name: "Vue.js", devicon: "vuejs" },
      { key: "angular", name: "Angular", devicon: "angularjs" },
      { key: "svelte", name: "Svelte", devicon: "svelte" },
      { key: "nextjs", name: "Next.js", devicon: "nextjs" },
      { key: "python", name: "Python", devicon: "python" },
      { key: "java", name: "Java", devicon: "java" },
      { key: "ruby", name: "Ruby", devicon: "ruby" },
      { key: "rails", name: "Ruby on Rails", devicon: "rails" },
      { key: "php", name: "PHP", devicon: "php" },
      { key: "csharp", name: "C#", devicon: "csharp" },
      { key: "html", name: "HTML", devicon: "html5" },
      { key: "css", name: "CSS", devicon: "css3" },
      { key: "nodejs", name: "Node.js", devicon: "nodejs" },
      { key: "git", name: "Git", devicon: "git" },
      { key: "docker", name: "Docker", devicon: "docker" },
    ]

    test.each(programmingCategories)(
      "$key カテゴリで正しい情報が返される",
      ({ key, name, devicon }) => {
        const result = getCategoryInfo(key)
        expect(result.name).toBe(name)
        expect(result.icon.type).toBe("devicon")
        expect(result.icon.value).toBe(devicon)
      }
    )
  })

  describe("全非プログラミングカテゴリの網羅テスト", () => {
    const nonProgrammingCategories = [
      { key: "programming", name: "Programming", emoji: "💻" },
      { key: "tutorial", name: "Tutorial", emoji: "📚" },
      { key: "news", name: "News", emoji: "📰" },
      { key: "tips", name: "Tips", emoji: "💡" },
      { key: "career", name: "Career", emoji: "👔" },
      { key: "design", name: "Design", emoji: "🎨" },
      { key: "tools", name: "Tools", emoji: "🔧" },
      { key: "webdev", name: "Web Dev", emoji: "🌐" },
      { key: "database", name: "Database", emoji: "🗄️" },
      { key: "security", name: "Security", emoji: "🔒" },
      { key: "general", name: "General", emoji: "💻" },
    ]

    test.each(nonProgrammingCategories)(
      "$key カテゴリで正しい情報が返される",
      ({ key, name, emoji }) => {
        const result = getCategoryInfo(key)
        expect(result.name).toBe(name)
        expect(result.icon.type).toBe("emoji")
        expect(result.icon.value).toBe(emoji)
      }
    )
  })
})
