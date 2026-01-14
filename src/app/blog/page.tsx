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
import { Pagination } from "@/components/blog/Pagination"
import { PostCard } from "@/components/blog/PostCard"
import { BLOG_CONFIG } from "@/lib/blog/constants"
import { parsePageParam } from "@/lib/blog/pagination"
import { getAllCategories, getAllPosts } from "@/lib/blog/posts"
import type { Metadata } from "next"

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

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const params = await searchParams
  const allPosts = getAllPosts()
  const categories = getAllCategories()
  const totalPages = Math.ceil(allPosts.length / BLOG_CONFIG.ITEMS_PER_PAGE)
  const currentPage = parsePageParam(params.page, totalPages)
  const startIndex = (currentPage - 1) * BLOG_CONFIG.ITEMS_PER_PAGE
  const posts = allPosts.slice(
    startIndex,
    startIndex + BLOG_CONFIG.ITEMS_PER_PAGE
  )

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

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            baseUrl="/blog"
          />
        </main>

        <div className="hidden lg:block lg:w-64">
          <BlogSidebar categories={categories} recentPosts={allPosts} />
        </div>
      </div>
    </div>
  )
}
