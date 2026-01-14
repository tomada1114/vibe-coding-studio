/**
 * Blog Index Page (/blog)
 *
 * Main blog listing page with:
 * - Paginated post list
 * - Category filter badges (mobile)
 * - Sidebar with categories and recent posts
 */

import {
  BlogBreadcrumb,
  generateBlogBreadcrumb,
} from "@/components/blog/BlogBreadcrumb"
import { BlogSidebar } from "@/components/blog/BlogSidebar"
import { CategoryBadge } from "@/components/blog/CategoryBadge"
import { PostCard } from "@/components/blog/PostCard"
import { getAllCategories, getAllPosts } from "@/lib/blog/posts"
import type { Metadata } from "next"
import Link from "next/link"

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "Blog | Vibe Coding Studio",
  description:
    "Read our latest articles and tutorials about AI-driven development.",
  openGraph: {
    title: "Blog | Vibe Coding Studio",
    description:
      "Read our latest articles and tutorials about AI-driven development.",
  },
}

const ITEMS_PER_PAGE = 10

/**
 * Parse and validate page parameter
 * Returns a valid positive integer, defaulting to 1 for invalid input
 */
function parsePageParam(pageStr: string | undefined, maxPage: number): number {
  if (!pageStr) return 1

  const parsed = parseInt(pageStr, 10)

  // Handle NaN, negative numbers, zero, and numbers exceeding max
  if (isNaN(parsed) || parsed < 1) {
    // eslint-disable-next-line no-console
    console.warn(`[Blog] Invalid page parameter: "${pageStr}". Defaulting to 1.`)
    return 1
  }

  if (parsed > maxPage && maxPage > 0) {
    // eslint-disable-next-line no-console
    console.warn(`[Blog] Page ${parsed} exceeds max ${maxPage}.`)
    return maxPage
  }

  return parsed
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const params = await searchParams
  const allPosts = getAllPosts()
  const categories = getAllCategories()
  const totalPages = Math.ceil(allPosts.length / ITEMS_PER_PAGE)
  const currentPage = parsePageParam(params.page, totalPages)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const posts = allPosts.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const breadcrumbs = generateBlogBreadcrumb()

  return (
    <div className="mx-auto max-w-7xl min-w-0 px-4 py-8 sm:px-6 lg:px-8">
      <BlogBreadcrumb items={breadcrumbs} className="mb-6" />

      <div className="mb-8">
        <h1 className="mb-4 text-3xl font-bold text-gray-900">Blog</h1>
        <p className="text-gray-600">Read our latest articles and tutorials</p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <main className="flex-1">
          <div className="mb-6 flex flex-wrap gap-2 lg:hidden">
            {categories.map(category => (
              <CategoryBadge key={category} category={category} />
            ))}
          </div>

          <div className="grid gap-6">
            {posts.map(post => (
              <PostCard
                key={`${post.category}-${post.slug}`}
                post={post}
                showCategory={true}
              />
            ))}
          </div>

          {posts.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-gray-500">No posts yet</p>
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              {currentPage > 1 ? (
                <Link
                  href={`/blog?page=${currentPage - 1}`}
                  className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-gray-50"
                >
                  Previous
                </Link>
              ) : (
                <span className="rounded-md border px-4 py-2 text-sm font-medium text-gray-400">
                  Previous
                </span>
              )}

              <span className="px-4 py-2 text-sm">
                Page {currentPage} of {totalPages}
              </span>

              {currentPage < totalPages ? (
                <Link
                  href={`/blog?page=${currentPage + 1}`}
                  className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-gray-50"
                >
                  Next
                </Link>
              ) : (
                <span className="rounded-md border px-4 py-2 text-sm font-medium text-gray-400">
                  Next
                </span>
              )}
            </div>
          )}
        </main>

        <div className="hidden lg:block lg:w-64">
          <BlogSidebar categories={categories} recentPosts={allPosts} />
        </div>
      </div>
    </div>
  )
}
