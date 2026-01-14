/**
 * Markdown to HTML Processor
 *
 * Converts markdown content to HTML with:
 * - GitHub Flavored Markdown (tables, strikethrough, etc.)
 * - Auto-generated heading IDs for TOC
 * - Syntax highlighting with line numbers (Prism)
 * - Image optimization (lazy loading, styling)
 */

import { rehype } from "rehype"
import rehypePrismPlus from "rehype-prism-plus"
import rehypeSlug from "rehype-slug"
import { remark } from "remark"
import gfm from "remark-gfm"
import html from "remark-html"

/**
 * Custom error class for markdown processing operations
 */
export class MarkdownProcessingError extends Error {
  constructor(
    message: string,
    public readonly stage: "remark" | "rehype" | "postprocess"
  ) {
    super(message)
    this.name = "MarkdownProcessingError"
  }
}

/**
 * Convert markdown string to HTML with:
 * - GitHub Flavored Markdown support
 * - Syntax highlighting with Prism (line numbers enabled)
 * - Auto-generated heading IDs for TOC linking
 * - Image optimization (lazy loading, styling)
 *
 * @param markdown - Raw markdown content
 * @returns Processed HTML string with all transformations applied
 * @throws MarkdownProcessingError if any processing stage fails
 */
export async function markdownToHtml(markdown: string): Promise<string> {
  let htmlContent: string

  try {
    const result = await remark().use(gfm).use(html).process(markdown)
    htmlContent = result.toString()
  } catch (error) {
    throw new MarkdownProcessingError(
      `Failed to convert markdown to HTML: ${error instanceof Error ? error.message : String(error)}`,
      "remark"
    )
  }

  try {
    const highlightedResult = await rehype()
      .use(rehypeSlug)
      .use(rehypePrismPlus, {
        defaultLanguage: "plaintext",
        showLineNumbers: true,
      })
      .process(htmlContent)

    htmlContent = highlightedResult.toString()
  } catch (error) {
    throw new MarkdownProcessingError(
      `Failed to apply syntax highlighting: ${error instanceof Error ? error.message : String(error)}`,
      "rehype"
    )
  }

  try {
    htmlContent = htmlContent.replace(
      /<img\s+src="([^"]+)"\s+alt="([^"]*)"\s*\/?>/g,
      (_match, src, alt) => {
        return `<img src="${src}" alt="${alt}" loading="lazy" decoding="async" style="max-width: 100%; height: auto; display: block; margin: 2rem auto; border-radius: 0.5rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">`
      }
    )
  } catch (error) {
    throw new MarkdownProcessingError(
      `Failed to process images: ${error instanceof Error ? error.message : String(error)}`,
      "postprocess"
    )
  }

  return htmlContent
}
