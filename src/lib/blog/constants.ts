/**
 * Blog Configuration Constants
 *
 * Centralized configuration values for blog functionality.
 */

export const BLOG_CONFIG = {
  /** Number of posts per page in listing pages */
  ITEMS_PER_PAGE: 10,

  /** Number of recent posts shown in sidebar */
  RECENT_POSTS_COUNT: 5,

  /** Number of related posts shown on article detail page */
  RELATED_POSTS_COUNT: 3,
} as const
