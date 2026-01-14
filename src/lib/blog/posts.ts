/**
 * Blog Post Utilities
 *
 * File-system based post discovery and parsing using gray-matter.
 * Posts are organized in content/posts/[category]/[slug].md
 */

import fs from "fs"
import matter from "gray-matter"
import path from "path"

const postsDirectory = path.join(process.cwd(), "content/posts")

/**
 * Post interface representing a blog article
 */
export interface Post {
  slug: string
  title: string
  date: string
  category: string
  excerpt: string
  content: string
}

/**
 * Get all posts in a specific category, sorted by date (newest first)
 */
export function getPostsByCategory(category: string): Post[] {
  const categoryPath = path.join(postsDirectory, category)

  if (!fs.existsSync(categoryPath)) {
    return []
  }

  const fileNames = fs.readdirSync(categoryPath)

  const posts = fileNames
    .filter(fileName => fileName.endsWith(".md"))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, "")
      const fullPath = path.join(categoryPath, fileName)
      const fileContents = fs.readFileSync(fullPath, "utf8")
      const { data, content } = matter(fileContents)

      return {
        slug,
        category,
        title: data.title,
        date: data.date,
        excerpt: data.excerpt || "",
        content,
      }
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1))

  return posts
}

/**
 * Get all category folder names
 */
export function getAllCategories(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  return fs
    .readdirSync(postsDirectory)
    .filter(file => fs.statSync(path.join(postsDirectory, file)).isDirectory())
}

/**
 * Get a single post by category and slug
 */
export function getPostBySlug(category: string, slug: string): Post | null {
  const fullPath = path.join(postsDirectory, category, `${slug}.md`)

  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents)

  return {
    slug,
    category,
    title: data.title,
    date: data.date,
    excerpt: data.excerpt || "",
    content,
  }
}

/**
 * Get all posts across all categories, sorted by date (newest first)
 */
export function getAllPosts(): Post[] {
  const categories = getAllCategories()
  const allPosts: Post[] = []

  for (const category of categories) {
    const posts = getPostsByCategory(category)
    allPosts.push(...posts)
  }

  return allPosts.sort((a, b) => (a.date > b.date ? -1 : 1))
}
