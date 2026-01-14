/**
 * Markdown to HTML Processor
 *
 * Converts markdown content to HTML with:
 * - GitHub Flavored Markdown (tables, strikethrough, etc.)
 * - Auto-generated heading IDs for TOC
 * - Syntax highlighting with line numbers (Prism)
 * - Image optimization (lazy loading)
 */

import { rehype } from "rehype"
import rehypePrismPlus from "rehype-prism-plus"
import rehypeSlug from "rehype-slug"
import { remark } from "remark"
import gfm from "remark-gfm"
import html from "remark-html"

/**
 * Convert markdown string to HTML with syntax highlighting and heading IDs
 */
export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(gfm).use(html).process(markdown)

  let htmlContent = result.toString()

  const highlightedResult = await rehype()
    .use(rehypeSlug)
    .use(rehypePrismPlus, {
      defaultLanguage: "plaintext",
      showLineNumbers: true,
    })
    .process(htmlContent)

  htmlContent = highlightedResult.toString()

  htmlContent = htmlContent.replace(
    /<img\s+src="([^"]+)"\s+alt="([^"]*)"\s*\/?>/g,
    (_match, src, alt) => {
      return `<img src="${src}" alt="${alt}" loading="lazy" decoding="async" style="max-width: 100%; height: auto; display: block; margin: 2rem auto; border-radius: 0.5rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">`
    }
  )

  return htmlContent
}
