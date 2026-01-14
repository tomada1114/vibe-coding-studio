/**
 * Blog Category Page (/blog/[category])
 *
 * Category-filtered blog listing with:
 * - Category header with icon
 * - Pagination
 * - Static generation for all categories
 */

import {
  BlogBreadcrumb,
  generateBlogBreadcrumb,
} from "@/components/blog/BlogBreadcrumb"
import { BlogSidebar } from "@/components/blog/BlogSidebar"
import { CategoryBadge } from "@/components/blog/CategoryBadge"
import { CategoryIconComponent } from "@/components/blog/CategoryIcon"
import { Pagination } from "@/components/blog/Pagination"
import { PostCard } from "@/components/blog/PostCard"
import { getCategoryInfo } from "@/lib/blog/categories"
import { BLOG_CONFIG } from "@/lib/blog/constants"
import { logBlogError } from "@/lib/blog/logging"
import { parsePageParam } from "@/lib/blog/pagination"
import {
  getAllCategories,
  getAllPosts,
  getPostsByCategory,
} from "@/lib/blog/posts"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

export const dynamic = "force-static"

export async function generateStaticParams() {
  try {
    const categories = getAllCategories()
    return categories.map(category => ({ category }))
  } catch (error) {
    logBlogError("GENERATE_STATIC_PARAMS_FAILED", {
      page: "category",
      error: error instanceof Error ? error.message : String(error),
    })
    return []
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>
}): Promise<Metadata> {
  const { category } = await params
  const categoryInfo = getCategoryInfo(category)

  return {
    title: `${categoryInfo.name} | Blog | Vibe Coding Studio`,
    description: `Browse ${categoryInfo.name} articles and tutorials.`,
    openGraph: {
      title: `${categoryInfo.name} | Blog | Vibe Coding Studio`,
      description: `Browse ${categoryInfo.name} articles and tutorials.`,
    },
  }
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>
  searchParams: Promise<{ page?: string }>
}) {
  const { category } = await params
  const { page } = await searchParams

  const allCategoryPosts = getPostsByCategory(category)
  const allPosts = getAllPosts()
  const categories = getAllCategories()

  if (allCategoryPosts.length === 0) {
    notFound()
  }

  const categoryInfo = getCategoryInfo(category, "lg")
  const totalPages = Math.ceil(
    allCategoryPosts.length / BLOG_CONFIG.ITEMS_PER_PAGE
  )
  const currentPage = parsePageParam(page, totalPages)
  const startIndex = (currentPage - 1) * BLOG_CONFIG.ITEMS_PER_PAGE
  const posts = allCategoryPosts.slice(
    startIndex,
    startIndex + BLOG_CONFIG.ITEMS_PER_PAGE
  )

  const breadcrumbs = generateBlogBreadcrumb(categoryInfo.name, category)

  return (
    <div className="mx-auto max-w-7xl min-w-0 px-4 py-8 sm:px-6 lg:px-8">
      <BlogBreadcrumb items={breadcrumbs} className="mb-6" />

      <div className="mb-8">
        <div className="mb-4 flex items-center gap-3">
          <div className="text-4xl">
            <CategoryIconComponent
              icon={{ ...categoryInfo.icon, size: "lg" }}
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {categoryInfo.name}
            </h1>
            <p className="mt-1 text-gray-600">
              {allCategoryPosts.length} posts
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <main className="flex-1">
          <div className="mb-6 flex flex-wrap gap-2 lg:hidden">
            {categories.map(cat => (
              <CategoryBadge
                key={cat}
                category={cat}
                size={cat === category ? "md" : "sm"}
              />
            ))}
          </div>

          <div className="grid gap-6">
            {posts.map(post => (
              <PostCard key={post.slug} post={post} showCategory={false} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            baseUrl={`/blog/${category}`}
          />
        </main>

        <div className="hidden lg:block lg:w-64">
          <BlogSidebar
            categories={categories}
            recentPosts={allPosts}
            currentCategory={category}
          />
        </div>
      </div>
    </div>
  )
}
