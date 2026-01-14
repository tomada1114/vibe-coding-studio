/**
 * Blog Detail Page (/blog/[category]/[slug])
 *
 * Individual article page with:
 * - Full article content with markdown rendering
 * - Table of Contents (sidebar)
 * - Share buttons
 * - Related posts
 * - JSON-LD structured data for SEO
 *
 * Security Note: dangerouslySetInnerHTML is used safely here because:
 * 1. Content comes from trusted markdown files in the repository (not user input)
 * 2. Content is processed server-side at build time
 * 3. This is the standard pattern for static blog generators
 */

import { ArticleInfo } from "@/components/blog/ArticleInfo"
import {
  BlogBreadcrumb,
  generateBlogBreadcrumb,
} from "@/components/blog/BlogBreadcrumb"
import { BlogSidebar } from "@/components/blog/BlogSidebar"
import { CategoryBadge } from "@/components/blog/CategoryBadge"
import { PostCard } from "@/components/blog/PostCard"
import { ShareButtons } from "@/components/blog/ShareButtons"
import { TableOfContents } from "@/components/blog/TableOfContents"
import { getCategoryInfo } from "@/lib/blog/categories"
import { BLOG_CONFIG } from "@/lib/blog/constants"
import { logBlogError } from "@/lib/blog/logging"
import { markdownToHtml } from "@/lib/blog/markdown"
import {
  getAllCategories,
  getAllPosts,
  getPostBySlug,
  getPostsByCategory,
} from "@/lib/blog/posts"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import Script from "next/script"

export const dynamic = "force-static"

export async function generateStaticParams() {
  try {
    const categories = getAllCategories()
    const params = []

    for (const category of categories) {
      try {
        const posts = getPostsByCategory(category)
        for (const post of posts) {
          params.push({
            category,
            slug: post.slug,
          })
        }
      } catch (error) {
        logBlogError("GET_POSTS_BY_CATEGORY_FAILED", {
          category,
          error: error instanceof Error ? error.message : String(error),
        })
        // Continue with other categories
      }
    }

    return params
  } catch (error) {
    logBlogError("GENERATE_STATIC_PARAMS_FAILED", {
      page: "slug",
      error: error instanceof Error ? error.message : String(error),
    })
    return []
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>
}): Promise<Metadata> {
  const { category, slug } = await params
  const post = getPostBySlug(category, slug)

  if (!post) {
    return {
      title: "Post Not Found | Vibe Coding Studio",
    }
  }

  return {
    title: `${post.title} | Vibe Coding Studio`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | Vibe Coding Studio`,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Vibe Coding Studio`,
      description: post.excerpt,
    },
  }
}

/**
 * Article Content Component
 * Renders HTML from markdown processing.
 * Content is trusted as it comes from internal markdown files, not user input.
 */
function ArticleContent({ html }: { html: string }) {
  return (
    <div className="blog-article" dangerouslySetInnerHTML={{ __html: html }} />
  )
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ category: string; slug: string }>
}) {
  const { category, slug } = await params
  const post = getPostBySlug(category, slug)

  if (!post) {
    notFound()
  }

  let content: string
  try {
    content = await markdownToHtml(post.content)
  } catch (error) {
    logBlogError("MARKDOWN_PROCESSING_FAILED", {
      category,
      slug,
      error: error instanceof Error ? error.message : String(error),
    })
    // Provide fallback content with error message
    content = `<div class="p-4 bg-red-50 border border-red-200 rounded-md">
      <p class="text-red-600">Failed to render article content. Please try again later.</p>
    </div>`
  }

  const relatedPosts = getPostsByCategory(category)
    .filter(p => p.slug !== slug)
    .slice(0, BLOG_CONFIG.RELATED_POSTS_COUNT)

  const categoryInfo = getCategoryInfo(category)
  const allPosts = getAllPosts()
  const categories = getAllCategories()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: "Vibe Coding Studio",
    },
    publisher: {
      "@type": "Organization",
      name: "Vibe Coding Studio",
      logo: {
        "@type": "ImageObject",
        url: `${process.env.NEXT_PUBLIC_SITE_URL || ""}/logo.png`,
      },
    },
  }

  const breadcrumbs = generateBlogBreadcrumb(
    categoryInfo.name,
    category,
    post.title
  )
  const articleUrl = `${process.env.NEXT_PUBLIC_SITE_URL || ""}/blog/${category}/${slug}`

  return (
    <>
      <Script
        id="json-ld"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(jsonLd)}
      </Script>

      <div className="mx-auto max-w-7xl min-w-0 px-4 py-8 sm:px-6 lg:px-8">
        <BlogBreadcrumb items={breadcrumbs} className="mb-6" />

        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="flex-1">
            <article className="max-w-4xl">
              <h1 className="mb-4 text-2xl font-bold">{post.title}</h1>

              <ArticleInfo
                date={post.date}
                category={post.category}
                categoryDisplay={categoryInfo.name}
              />

              <ArticleContent html={content} />

              <div className="mt-8 rounded-lg bg-gray-50 p-6">
                <ShareButtons title={post.title} url={articleUrl} />
              </div>

              <div className="mt-8 border-t border-gray-200 pt-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Category:</span>
                    <CategoryBadge category={post.category} />
                  </div>
                  <Link
                    href="/blog"
                    className="text-sm font-medium text-blue-600 hover:text-blue-700"
                  >
                    ← Back to all posts
                  </Link>
                </div>
              </div>
            </article>
          </div>

          <aside className="hidden lg:block lg:w-64">
            <TableOfContents />
          </aside>
        </div>

        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <div className="mb-6">
              <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
                <span className="text-xl">📚</span>
                Related Posts
              </h2>
              <p className="mt-1 text-gray-600">
                More from {categoryInfo.name}
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map(relatedPost => (
                <PostCard
                  key={relatedPost.slug}
                  post={relatedPost}
                  showCategory={false}
                />
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link
                href={`/blog/${category}`}
                className="inline-flex items-center gap-2 font-medium text-blue-600 hover:text-blue-700"
              >
                <span>View all {categoryInfo.name} posts</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        )}

        <div className="mt-16">
          <BlogSidebar
            categories={categories}
            recentPosts={allPosts}
            currentCategory={category}
          />
        </div>
      </div>
    </>
  )
}
