/**
 * Blog Post Utilities
 *
 * File-system based post discovery and parsing using gray-matter.
 * Posts are organized in content/posts/[category]/[slug].md
 */

import fs from "fs"
import matter from "gray-matter"
import path from "path"
import { logBlogError } from "./logging"

const postsDirectory = path.join(process.cwd(), "content/posts")

/**
 * Custom error class for blog post operations
 */
export class BlogPostError extends Error {
  constructor(
    message: string,
    public readonly filePath?: string,
    public readonly category?: string
  ) {
    super(message)
    this.name = "BlogPostError"
  }
}

/**
 * Validate required frontmatter fields
 * @throws BlogPostError if validation fails
 */
function validateFrontmatter(
  data: Record<string, unknown>,
  filePath: string
): { title: string; date: string; excerpt: string } {
  if (!data.title || typeof data.title !== "string") {
    throw new BlogPostError(
      `Missing or invalid 'title' in frontmatter`,
      filePath
    )
  }
  if (!data.date || typeof data.date !== "string") {
    throw new BlogPostError(
      `Missing or invalid 'date' in frontmatter`,
      filePath
    )
  }

  return {
    title: data.title,
    date: data.date,
    excerpt: typeof data.excerpt === "string" ? data.excerpt : "",
  }
}

/**
 * Read and parse a markdown post file
 * @throws BlogPostError if file operations or parsing fails
 */
function parsePostFile(
  filePath: string,
  category: string
): { data: Record<string, unknown>; content: string } {
  let fileContents: string
  try {
    fileContents = fs.readFileSync(filePath, "utf8")
  } catch (error) {
    throw new BlogPostError(
      `Failed to read file: ${error instanceof Error ? error.message : String(error)}`,
      filePath,
      category
    )
  }

  try {
    const parsed = matter(fileContents)
    return { data: parsed.data, content: parsed.content }
  } catch (error) {
    throw new BlogPostError(
      `Failed to parse frontmatter: ${error instanceof Error ? error.message : String(error)}`,
      filePath,
      category
    )
  }
}

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
 * @throws BlogPostError if file operations or parsing fails
 */
export function getPostsByCategory(category: string): Post[] {
  const categoryPath = path.join(postsDirectory, category)

  if (!fs.existsSync(categoryPath)) {
    logBlogError("CATEGORY_DIRECTORY_NOT_FOUND", {
      category,
      path: categoryPath,
      reason:
        "Category directory does not exist - check deployment or configuration",
    })
    return []
  }

  let fileNames: string[]
  try {
    fileNames = fs.readdirSync(categoryPath)
  } catch (error) {
    throw new BlogPostError(
      `Failed to read category directory: ${error instanceof Error ? error.message : String(error)}`,
      categoryPath,
      category
    )
  }

  const posts = fileNames
    .filter(fileName => fileName.endsWith(".md"))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, "")
      const fullPath = path.join(categoryPath, fileName)
      const { data, content } = parsePostFile(fullPath, category)
      const validated = validateFrontmatter(data, fullPath)

      return {
        slug,
        category,
        title: validated.title,
        date: validated.date,
        excerpt: validated.excerpt,
        content,
      }
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1))

  return posts
}

/**
 * Get all category folder names
 * @throws BlogPostError if directory operations fail
 */
export function getAllCategories(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    logBlogError("POSTS_DIRECTORY_NOT_FOUND", {
      path: postsDirectory,
      reason:
        "Posts directory does not exist - check deployment or configuration",
    })
    return []
  }

  try {
    return fs
      .readdirSync(postsDirectory)
      .filter(file =>
        fs.statSync(path.join(postsDirectory, file)).isDirectory()
      )
  } catch (error) {
    throw new BlogPostError(
      `Failed to read posts directory: ${error instanceof Error ? error.message : String(error)}`,
      postsDirectory
    )
  }
}

/**
 * Get a single post by category and slug
 * @throws BlogPostError if file operations or parsing fails
 */
export function getPostBySlug(category: string, slug: string): Post | null {
  const fullPath = path.join(postsDirectory, category, `${slug}.md`)

  if (!fs.existsSync(fullPath)) {
    return null
  }

  const { data, content } = parsePostFile(fullPath, category)
  const validated = validateFrontmatter(data, fullPath)

  return {
    slug,
    category,
    title: validated.title,
    date: validated.date,
    excerpt: validated.excerpt,
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
