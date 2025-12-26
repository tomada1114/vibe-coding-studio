// Mock window for test environment
global.window = undefined as unknown as Window & typeof globalThis

import {
  cacheConfig,
  cachedQuery,
  cacheKeys,
  logCacheStats,
  memoryCache,
  staleWhileRevalidate,
} from "@/lib/cache"

describe("MemoryCache", () => {
  beforeEach(() => {
    // Clear cache before each test
    memoryCache.clear()
  })

  describe("basic operations", () => {
    it("should store and retrieve data", () => {
      const data = { test: "value" }
      memoryCache.set("test-key", data)

      const retrieved = memoryCache.get("test-key")
      expect(retrieved).toEqual(data)
    })

    it("should return null for non-existent keys", () => {
      const result = memoryCache.get("non-existent")
      expect(result).toBeNull()
    })

    it("should respect TTL", async () => {
      const data = { test: "value" }
      // Set with 100ms TTL
      memoryCache.set("test-key", data, { ttl: 100 })

      // Should exist immediately
      expect(memoryCache.get("test-key")).toEqual(data)

      // Wait for expiration
      await new Promise(resolve => setTimeout(resolve, 150))

      // Should be expired
      expect(memoryCache.get("test-key")).toBeNull()
    })

    it("should clear specific keys", () => {
      memoryCache.set("key1", "value1")
      memoryCache.set("key2", "value2")

      memoryCache.clear("key1")

      expect(memoryCache.get("key1")).toBeNull()
      expect(memoryCache.get("key2")).toBe("value2")
    })

    it("should clear all keys", () => {
      memoryCache.set("key1", "value1")
      memoryCache.set("key2", "value2")

      memoryCache.clear()

      expect(memoryCache.get("key1")).toBeNull()
      expect(memoryCache.get("key2")).toBeNull()
    })
  })

  describe("statistics", () => {
    it("should track hits and misses", () => {
      memoryCache.set("key1", "value1")

      // Hit
      memoryCache.get("key1")
      memoryCache.get("key1")

      // Miss
      memoryCache.get("non-existent")

      const stats = memoryCache.getStats()
      expect(stats.hits).toBe(2)
      expect(stats.misses).toBe(1)
      expect(stats.hitRate).toBeCloseTo(0.667, 2)
    })

    it("should track cache size", () => {
      memoryCache.set("key1", "value1")
      memoryCache.set("key2", "value2")

      const stats = memoryCache.getStats()
      expect(stats.size).toBe(2)
    })

    it("should track evictions", async () => {
      memoryCache.set("key1", "value1", { ttl: 50 })

      await new Promise(resolve => setTimeout(resolve, 100))

      // This should trigger eviction
      memoryCache.get("key1")

      const stats = memoryCache.getStats()
      expect(stats.evictions).toBe(1)
    })
  })

  describe("cleanup", () => {
    it("should remove expired entries", async () => {
      memoryCache.set("key1", "value1", { ttl: 50 })
      memoryCache.set("key2", "value2", { ttl: 200 })

      await new Promise(resolve => setTimeout(resolve, 100))

      memoryCache.cleanup()

      const stats = memoryCache.getStats()
      expect(stats.size).toBe(1)
      expect(memoryCache.get("key2")).toBe("value2")
    })
  })
})

describe("cachedQuery", () => {
  beforeEach(() => {
    memoryCache.clear()
  })

  it("should cache query results", async () => {
    let fetchCount = 0
    const fetcher = jest.fn(async () => {
      fetchCount++
      return { data: "test" }
    })

    // First call should fetch
    const result1 = await cachedQuery("test-key", fetcher)
    expect(result1).toEqual({ data: "test" })
    expect(fetchCount).toBe(1)

    // Second call should use cache
    const result2 = await cachedQuery("test-key", fetcher)
    expect(result2).toEqual({ data: "test" })
    expect(fetchCount).toBe(1) // No additional fetch
  })

  it("should respect TTL option", async () => {
    let fetchCount = 0
    const fetcher = jest.fn(async () => {
      fetchCount++
      return { data: `test-${fetchCount}` }
    })

    // First call
    const result1 = await cachedQuery("test-key", fetcher, { ttl: 100 })
    expect(result1).toEqual({ data: "test-1" })

    // Wait for cache to expire
    await new Promise(resolve => setTimeout(resolve, 150))

    // Should fetch again
    const result2 = await cachedQuery("test-key", fetcher, { ttl: 100 })
    expect(result2).toEqual({ data: "test-2" })
    expect(fetchCount).toBe(2)
  })

  it("should handle errors", async () => {
    const fetcher = jest.fn(async () => {
      throw new Error("Fetch failed")
    })

    await expect(cachedQuery("test-key", fetcher)).rejects.toThrow(
      "Fetch failed"
    )
  })
})

describe("staleWhileRevalidate", () => {
  beforeEach(() => {
    memoryCache.clear()
  })

  it("should return stale data while revalidating", async () => {
    let fetchCount = 0
    const fetcher = jest.fn(async () => {
      fetchCount++
      await new Promise(resolve => setTimeout(resolve, 50)) // Simulate network delay
      return { data: `test-${fetchCount}` }
    })

    // First call - no cache, should wait for fetch
    const result1 = await staleWhileRevalidate("test-key", fetcher)
    expect(result1).toEqual({ data: "test-1" })
    expect(fetchCount).toBe(1)

    // Second call - should return cached data immediately
    const result2 = await staleWhileRevalidate("test-key", fetcher)
    expect(result2).toEqual({ data: "test-1" }) // Still the old data

    // Wait for background revalidation
    await new Promise(resolve => setTimeout(resolve, 100))

    // Third call - should have updated data
    const result3 = await staleWhileRevalidate("test-key", fetcher)
    expect(result3).toEqual({ data: "test-2" })
  })

  it("should fetch synchronously when no cached data", async () => {
    const fetcher = jest.fn(async () => ({ data: "test" }))

    const result = await staleWhileRevalidate("test-key", fetcher)
    expect(result).toEqual({ data: "test" })
    expect(fetcher).toHaveBeenCalledTimes(1)
  })
})

describe("cacheKeys", () => {
  it("should generate consistent keys", () => {
    expect(cacheKeys.post("test-slug")).toBe("post:test-slug")
    expect(cacheKeys.posts()).toBe("posts:all:1")
    expect(cacheKeys.posts("tech")).toBe("posts:tech:1")
    expect(cacheKeys.posts("tech", 2)).toBe("posts:tech:2")
    expect(cacheKeys.category("design")).toBe("category:design")
    expect(cacheKeys.categories()).toBe("categories:all")
    expect(cacheKeys.postsCount()).toBe("posts-count:all")
    expect(cacheKeys.postsCount("tech")).toBe("posts-count:tech")
  })
})

describe("cacheConfig", () => {
  it("should have appropriate TTL values", () => {
    expect(cacheConfig.post.ttl).toBe(10 * 60 * 1000) // 10 minutes
    expect(cacheConfig.posts.ttl).toBe(5 * 60 * 1000) // 5 minutes
    expect(cacheConfig.categories.ttl).toBe(30 * 60 * 1000) // 30 minutes
    expect(cacheConfig.count.ttl).toBe(5 * 60 * 1000) // 5 minutes
    expect(cacheConfig.static.ttl).toBe(60 * 60 * 1000) // 1 hour
  })
})

describe("logCacheStats", () => {
  beforeEach(() => {
    memoryCache.clear()
  })

  it("should log cache stats in development mode", () => {
    const originalEnv = process.env.NODE_ENV
    process.env.NODE_ENV = "development"

    // Add some test data
    memoryCache.set("key1", "value1")
    memoryCache.set("key2", "value2")
    memoryCache.get("key1")
    memoryCache.get("key1")
    memoryCache.get("non-existent")

    const consoleTableSpy = jest
      .spyOn(console, "table")
      .mockImplementation(() => {})
    const consoleLogSpy = jest
      .spyOn(console, "log")
      .mockImplementation(() => {})

    logCacheStats()

    expect(consoleTableSpy).toHaveBeenCalled()
    expect(consoleLogSpy).toHaveBeenCalled()

    consoleTableSpy.mockRestore()
    consoleLogSpy.mockRestore()
    process.env.NODE_ENV = originalEnv
  })

  it("should not log in production mode", () => {
    const originalEnv = process.env.NODE_ENV
    process.env.NODE_ENV = "production"

    memoryCache.set("key1", "value1")

    const consoleTableSpy = jest
      .spyOn(console, "table")
      .mockImplementation(() => {})
    const consoleLogSpy = jest
      .spyOn(console, "log")
      .mockImplementation(() => {})

    logCacheStats()

    expect(consoleTableSpy).not.toHaveBeenCalled()
    expect(consoleLogSpy).not.toHaveBeenCalled()

    consoleTableSpy.mockRestore()
    consoleLogSpy.mockRestore()
    process.env.NODE_ENV = originalEnv
  })

  it("should show top cached entries when entries exist", () => {
    const originalEnv = process.env.NODE_ENV
    process.env.NODE_ENV = "development"

    // Add multiple entries with different hit counts
    memoryCache.set("popular", "value1")
    memoryCache.set("medium", "value2")
    memoryCache.set("rare", "value3")

    // Create different hit counts
    memoryCache.get("popular")
    memoryCache.get("popular")
    memoryCache.get("popular")
    memoryCache.get("medium")
    memoryCache.get("medium")
    memoryCache.get("rare")

    const consoleTableSpy = jest
      .spyOn(console, "table")
      .mockImplementation(() => {})
    const consoleLogSpy = jest
      .spyOn(console, "log")
      .mockImplementation(() => {})

    logCacheStats()

    // Should call console.table twice (once for stats, once for entries)
    expect(consoleTableSpy).toHaveBeenCalled()
    expect(consoleLogSpy).toHaveBeenCalledWith("Top cached entries:")

    consoleTableSpy.mockRestore()
    consoleLogSpy.mockRestore()
    process.env.NODE_ENV = originalEnv
  })
})
