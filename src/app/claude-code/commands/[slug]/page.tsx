/**
 * Command Detail Page
 *
 * Displays detailed information about a single custom command.
 * Users can view the complete markdown content with frontmatter
 * and copy it to use in their own environment.
 *
 * Task 7.2: Implementation (Green phase)
 * Requirements: 2.1, 3.1, 3.2, 4.1
 *
 * Features:
 * - Static site generation with generateStaticParams
 * - Dynamic metadata generation based on command
 * - Displays command details (title, description, frontmatter)
 * - Shows complete markdown content in a code block with copy functionality
 * - Error handling with notFound() for invalid slugs
 * - Navigation back to commands list
 * - Accessibility compliant (WCAG 2.1 AA)
 */

import CodeBlock from "@/components/commands/code-block"
import CommandDetail from "@/components/commands/command-detail"
import { Container } from "@/components/container"
import { AsyncErrorBoundary } from "@/components/error-boundary"
import { Footer } from "@/components/footer"
import { Gradient } from "@/components/gradient"
import { Navbar } from "@/components/navbar"
import {
  getAllCommandSlugs,
  getCommandBySlug,
} from "@/lib/commands/command-data"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

/**
 * ISR (Incremental Static Regeneration) Configuration
 *
 * Revalidate every 60 seconds to automatically detect command file updates
 * while maintaining excellent performance through static generation.
 */
export const revalidate = 60

/**
 * Generate static parameters for all commands at build time
 *
 * This function is called during the build process to pre-render
 * all command detail pages as static HTML.
 *
 * @returns Array of params objects with slug field
 */
export async function generateStaticParams() {
  const slugs = getAllCommandSlugs()
  return slugs.map(slug => ({ slug }))
}

/**
 * Generate metadata for the command detail page
 *
 * Creates dynamic metadata based on the command's information,
 * including title, description, and OGP tags for SEO.
 *
 * @param params - Route parameters containing the command slug
 * @returns Metadata object for Next.js
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const command = getCommandBySlug(slug)

  if (!command) {
    return {
      title: "コマンドが見つかりません",
    }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  const pageTitle = `${command.title} - カスタムコマンド`
  const pageDescription =
    command.description || `${command.title}のカスタムコマンド詳細`

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: `${siteUrl}/claude-code/commands/${slug}`,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `${siteUrl}/claude-code/commands/${slug}`,
      type: "article",
    },
  }
}

/**
 * Command detail page component
 *
 * Displays complete information about a custom command, including:
 * 1. Navigation breadcrumb to return to commands list
 * 2. Command details (title, description, frontmatter metadata)
 * 3. Complete markdown content with copy functionality
 *
 * If the command doesn't exist (invalid slug), shows 404 page.
 *
 * @param params - Route parameters containing the command slug
 * @returns Rendered command detail page
 */
export default async function CommandDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const command = getCommandBySlug(slug)

  // Show 404 page if command not found
  if (!command) {
    notFound()
  }

  return (
    <div className="overflow-hidden">
      {/* Header with gradient background and navigation */}
      <AsyncErrorBoundary>
        <div className="relative">
          <Gradient className="absolute inset-2 bottom-0 rounded-4xl ring-1 ring-black/5 ring-inset" />
          <Container className="relative">
            <Navbar />
          </Container>
        </div>
      </AsyncErrorBoundary>

      {/* Main content area */}
      <main>
        <AsyncErrorBoundary>
          <Container className="mt-16 mb-32 sm:mt-32">
            {/* Navigation breadcrumb */}
            <div className="mb-8">
              <Link
                href="/claude-code/commands"
                className="inline-flex items-center text-sm font-medium text-gray-600 transition-colors hover:text-gray-950 focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 focus:outline-none"
                aria-label="コマンド一覧に戻る"
              >
                <svg
                  className="mr-2 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                コマンド一覧に戻る
              </Link>
            </div>

            {/* Command details section */}
            <CommandDetail command={command} />

            {/* Markdown content section */}
            <section
              className="mt-12"
              aria-label="コマンドのマークダウンコード"
            >
              <h2 className="mb-4 text-xl font-semibold text-gray-950">
                マークダウンファイル
              </h2>
              <p className="mb-4 text-sm text-gray-600">
                以下のコードをコピーして、.claude/commands/
                ディレクトリに配置してください。
              </p>
              <CodeBlock code={command.rawContent} language="markdown" />
            </section>
          </Container>
        </AsyncErrorBoundary>
      </main>

      {/* Footer */}
      <AsyncErrorBoundary>
        <Footer />
      </AsyncErrorBoundary>
    </div>
  )
}
