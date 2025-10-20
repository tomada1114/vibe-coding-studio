/**
 * Caching utilities for optimizing API calls and performance
 */

interface CacheEntry<T> {
  data: T
  expires: number
  hits: number
}

interface CacheOptions {
  ttl?: number // Time to live in milliseconds
  staleWhileRevalidate?: number // Additional time to serve stale content while revalidating
}

/**
 * In-memory cache for client-side data
 * Useful for caching API responses in client components
 */
class MemoryCache {
  private cache = new Map<string, CacheEntry<unknown>>()
  private stats = {
    hits: 0,
    misses: 0,
    evictions: 0,
  }

  /**
   * Get item from cache
   */
  get<T>(key: string): T | null {
    const entry = this.cache.get(key) as CacheEntry<T> | undefined

    if (!entry) {
      this.stats.misses++
      return null
    }

    const now = Date.now()

    // Check if expired
    if (entry.expires < now) {
      this.cache.delete(key)
      this.stats.evictions++
      this.stats.misses++
      return null
    }

    // Update hit count
    entry.hits++
    this.stats.hits++

    return entry.data
  }

  /**
   * Set item in cache
   */
  set<T>(key: string, data: T, options: CacheOptions = {}): void {
    const ttl = options.ttl || 5 * 60 * 1000 // Default 5 minutes
    const expires = Date.now() + ttl

    this.cache.set(key, {
      data,
      expires,
      hits: 0,
    })
  }

  /**
   * Clear specific key or entire cache
   */
  clear(key?: string): void {
    if (key) {
      this.cache.delete(key)
    } else {
      this.cache.clear()
      // Reset stats when clearing entire cache
      this.stats = {
        hits: 0,
        misses: 0,
        evictions: 0,
      }
    }
  }

  /**
   * Get cache statistics
   */
  getStats() {
    const entries = Array.from(this.cache.entries())

    return {
      ...this.stats,
      size: this.cache.size,
      hitRate: this.stats.hits / (this.stats.hits + this.stats.misses) || 0,
      entries: entries.map(([key, entry]) => ({
        key,
        hits: entry.hits,
        expires: new Date(entry.expires).toISOString(),
      })),
    }
  }

  /**
   * Clean expired entries
   */
  cleanup(): void {
    const now = Date.now()
    let cleaned = 0

    this.cache.forEach((entry, key) => {
      if (entry.expires < now) {
        this.cache.delete(key)
        cleaned++
      }
    })

    if (cleaned > 0) {
      this.stats.evictions += cleaned
    }
  }
}

// Create singleton instance
export const memoryCache = new MemoryCache()

// Run cleanup every minute in client
if (typeof window !== "undefined") {
  setInterval(() => memoryCache.cleanup(), 60 * 1000)
}

/**
 * Wrapper for cached queries
 * Works with any async function
 */
export async function cachedQuery<T>(
  key: string,
  fetcher: () => Promise<T>,
  options: CacheOptions = {}
): Promise<T> {
  // Check cache first
  const cached = memoryCache.get<T>(key)
  if (cached !== null) {
    return cached
  }

  try {
    // Fetch fresh data
    const data = await fetcher()

    // Store in cache
    memoryCache.set(key, data, options)

    return data
  } catch (error) {
    throw error
  }
}

/**
 * Stale-while-revalidate implementation
 * Returns stale data immediately while fetching fresh data in background
 */
export async function staleWhileRevalidate<T>(
  key: string,
  fetcher: () => Promise<T>,
  options: CacheOptions = {}
): Promise<T> {
  const cached = memoryCache.get<T>(key)

  // If we have cached data, return it immediately
  if (cached !== null) {
    // Fetch fresh data in background
    fetcher()
      .then(data => {
        memoryCache.set(key, data, options)
      })
      .catch(() => {
        // Silently fail - keep serving stale data
      })

    return cached
  }

  // No cached data, fetch synchronously
  const data = await fetcher()
  memoryCache.set(key, data, options)
  return data
}

/**
 * Cache key generators for consistent key formatting
 */
export const cacheKeys = {
  post: (slug: string) => `post:${slug}`,
  posts: (category?: string, page?: number) =>
    category ? `posts:${category}:${page || 1}` : `posts:all:${page || 1}`,
  category: (slug: string) => `category:${slug}`,
  categories: () => "categories:all",
  postsCount: (category?: string) =>
    category ? `posts-count:${category}` : "posts-count:all",
} as const

/**
 * Cache configuration for different data types
 */
export const cacheConfig = {
  // Individual posts cache for 10 minutes
  post: { ttl: 10 * 60 * 1000 },

  // Posts list cache for 5 minutes
  posts: { ttl: 5 * 60 * 1000 },

  // Categories cache for 30 minutes
  categories: { ttl: 30 * 60 * 1000 },

  // Count queries cache for 5 minutes
  count: { ttl: 5 * 60 * 1000 },

  // Static data cache for 1 hour
  static: { ttl: 60 * 60 * 1000 },
} as const

/**
 * Cache monitoring utilities
 */
export function logCacheStats(): void {
  const stats = memoryCache.getStats()

  // Only log in development mode
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.table({
      "Cache Size": stats.size,
      "Total Hits": stats.hits,
      "Total Misses": stats.misses,
      "Hit Rate": `${(stats.hitRate * 100).toFixed(2)}%`,
      Evictions: stats.evictions,
    })

    if (stats.entries.length > 0) {
      // eslint-disable-next-line no-console
      console.log("Top cached entries:")
      // eslint-disable-next-line no-console
      console.table(stats.entries.sort((a, b) => b.hits - a.hits).slice(0, 5))
    }
  }
}

// Export for debugging in browser console
if (typeof window !== "undefined" && typeof window === "object") {
  try {
    const win = window as Window & {
      cacheStats?: typeof logCacheStats
      clearCache?: () => void
    }
    win.cacheStats = logCacheStats
    win.clearCache = () => memoryCache.clear()
  } catch {
    // Silently ignore in test environments
  }
}
