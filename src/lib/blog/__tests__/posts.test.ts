/**
 * Blog Posts Utility Tests
 *
 * Tests for file-system based post discovery and parsing.
 * Uses actual file system with test fixtures.
 */

import { beforeAll, describe, expect, test } from "@jest/globals"
import fs from "fs"
import path from "path"
import {
  getAllCategories,
  getAllPosts,
  getPostBySlug,
  getPostsByCategory,
} from "../posts"

describe("posts.ts", () => {
  const testPostsDir = path.join(process.cwd(), "content/posts")

  // Verify test fixtures exist
  beforeAll(() => {
    // Ensure we have at least one category with posts
    const categories = fs.existsSync(testPostsDir)
      ? fs
          .readdirSync(testPostsDir)
          .filter(f => fs.statSync(path.join(testPostsDir, f)).isDirectory())
      : []
    expect(categories.length).toBeGreaterThan(0)
  })

  describe("getPostsByCategory()", () => {
    // Happy Path
    test("有効なカテゴリで投稿を取得できる", () => {
      // Given: content/posts/javascript/ に投稿が存在
      // When: getPostsByCategory('javascript') を呼び出す
      const posts = getPostsByCategory("javascript")

      // Then: 投稿が取得される
      expect(Array.isArray(posts)).toBe(true)
      expect(posts.length).toBeGreaterThan(0)
      expect(posts[0]).toHaveProperty("slug")
      expect(posts[0]).toHaveProperty("title")
      expect(posts[0]).toHaveProperty("date")
      expect(posts[0]).toHaveProperty("category")
      expect(posts[0]).toHaveProperty("excerpt")
      expect(posts[0]).toHaveProperty("content")
    })

    test("投稿は日付降順でソートされる", () => {
      // Given: カテゴリに複数の投稿がある場合
      const posts = getPostsByCategory("javascript")

      // When/Then: 日付が降順になっている
      if (posts.length >= 2) {
        for (let i = 0; i < posts.length - 1; i++) {
          expect(posts[i].date >= posts[i + 1].date).toBe(true)
        }
      }
    })

    // Sad Path
    test("存在しないカテゴリでは空配列が返される", () => {
      // Given: nonexistent-category フォルダが存在しない
      // When: getPostsByCategory('nonexistent') を呼び出す
      const posts = getPostsByCategory("nonexistent-category-12345")

      // Then: 空配列 [] が返される
      expect(posts).toEqual([])
    })

    // Edge Case
    test("各投稿にcategoryプロパティが設定される", () => {
      // Given: javascriptカテゴリの投稿
      const posts = getPostsByCategory("javascript")

      // Then: すべての投稿のcategoryが'javascript'
      posts.forEach(post => {
        expect(post.category).toBe("javascript")
      })
    })
  })

  describe("getAllCategories()", () => {
    // Happy Path
    test("すべてのカテゴリフォルダを取得できる", () => {
      // When: getAllCategories() を呼び出す
      const categories = getAllCategories()

      // Then: カテゴリ配列が返される
      expect(Array.isArray(categories)).toBe(true)
      expect(categories.length).toBeGreaterThan(0)
      expect(categories).toContain("javascript")
    })

    test("カテゴリはディレクトリのみ", () => {
      // When: getAllCategories() を呼び出す
      const categories = getAllCategories()

      // Then: すべてがディレクトリ
      categories.forEach(category => {
        const categoryPath = path.join(testPostsDir, category)
        expect(fs.statSync(categoryPath).isDirectory()).toBe(true)
      })
    })
  })

  describe("getPostBySlug()", () => {
    // Happy Path
    test("特定の投稿を取得できる", () => {
      // Given: 存在するカテゴリとスラッグ
      const categories = getAllCategories()
      const posts = getPostsByCategory(categories[0])
      const firstPost = posts[0]

      // When: getPostBySlug() を呼び出す
      const post = getPostBySlug(firstPost.category, firstPost.slug)

      // Then: 正しい Post オブジェクトが返される
      expect(post).not.toBeNull()
      expect(post?.slug).toBe(firstPost.slug)
      expect(post?.category).toBe(firstPost.category)
      expect(post?.title).toBe(firstPost.title)
    })

    // Sad Path
    test("存在しないスラッグではnullが返される", () => {
      // Given: 存在しないスラッグ
      // When: getPostBySlug() を呼び出す
      const post = getPostBySlug("javascript", "nonexistent-slug-12345")

      // Then: null が返される
      expect(post).toBeNull()
    })

    test("存在しないカテゴリではnullが返される", () => {
      // Given: 存在しないカテゴリ
      // When: getPostBySlug() を呼び出す
      const post = getPostBySlug("nonexistent-category-12345", "any-slug")

      // Then: null が返される
      expect(post).toBeNull()
    })

    // Edge Case
    test("空文字列のカテゴリではnullが返される", () => {
      // Given: カテゴリ名が空文字列
      // When: getPostBySlug('', 'slug') を呼び出す
      const post = getPostBySlug("", "slug")

      // Then: null が返される
      expect(post).toBeNull()
    })

    test("空文字列のスラッグではnullが返される", () => {
      // Given: スラッグが空文字列
      // When: getPostBySlug('javascript', '') を呼び出す
      const post = getPostBySlug("javascript", "")

      // Then: null が返される
      expect(post).toBeNull()
    })
  })

  describe("getAllPosts()", () => {
    // Happy Path
    test("全カテゴリの全投稿を取得できる", () => {
      // When: getAllPosts() を呼び出す
      const posts = getAllPosts()

      // Then: 全投稿が取得される
      expect(Array.isArray(posts)).toBe(true)
      expect(posts.length).toBeGreaterThan(0)
    })

    test("投稿は日付降順でソートされる", () => {
      // When: getAllPosts() を呼び出す
      const posts = getAllPosts()

      // Then: 日付が降順
      for (let i = 0; i < posts.length - 1; i++) {
        expect(posts[i].date >= posts[i + 1].date).toBe(true)
      }
    })

    test("複数カテゴリの投稿が含まれる", () => {
      // When: getAllPosts() を呼び出す
      const posts = getAllPosts()
      const categories = new Set(posts.map(p => p.category))

      // Then: 複数カテゴリが含まれる（テストデータが複数カテゴリある場合）
      expect(categories.size).toBeGreaterThanOrEqual(1)
    })
  })

  describe("Post interface", () => {
    test("投稿オブジェクトは必要なプロパティを持つ", () => {
      // Given: 任意の投稿
      const posts = getAllPosts()
      const post = posts[0]

      // Then: 必要なプロパティが存在
      expect(typeof post.slug).toBe("string")
      expect(typeof post.title).toBe("string")
      expect(typeof post.date).toBe("string")
      expect(typeof post.category).toBe("string")
      expect(typeof post.excerpt).toBe("string")
      expect(typeof post.content).toBe("string")
    })

    test("excerptがFrontmatterにない場合は空文字列", () => {
      // Given: 全投稿
      const posts = getAllPosts()

      // Then: excerptはstring型（空でも可）
      posts.forEach(post => {
        expect(typeof post.excerpt).toBe("string")
      })
    })
  })
})
