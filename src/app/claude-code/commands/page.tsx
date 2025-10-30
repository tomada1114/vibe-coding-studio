/**
 * Commands List Page
 *
 * Displays a list of all available custom commands for Claude Code.
 * Users can browse commands and navigate to detail pages for more information.
 *
 * Task 4.2 & 4.3: Implementation with ISR and SEO optimization
 * Requirements: 1.1, 4.1, 5.1, 6.2, 7.5
 *
 * Features:
 * - Server-side rendering with ISR (60 second revalidation)
 * - Responsive grid layout (mobile: 1 column, tablet: 2 columns, desktop: 3 columns)
 * - Empty state handling
 * - Error boundary for graceful error handling
 * - SEO optimized with metadata
 * - Accessibility compliant (WCAG 2.1 AA)
 */

import { Container } from '@/components/container'
import { AsyncErrorBoundary } from '@/components/error-boundary'
import { Footer } from '@/components/footer'
import { Gradient } from '@/components/gradient'
import { Navbar } from '@/components/navbar'
import CommandCard from '@/components/commands/command-card'
import { getAllCommands } from '@/lib/commands/command-data'
import type { Metadata } from 'next'

/**
 * ISR (Incremental Static Regeneration) Configuration
 *
 * Revalidate every 60 seconds to automatically detect new or updated commands
 * while maintaining excellent performance through static generation.
 */
export const revalidate = 60

/**
 * Generate metadata for the commands list page
 *
 * Provides SEO-friendly metadata including title, description, and OGP tags.
 *
 * @returns Metadata object for Next.js
 */
export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const pageTitle = 'カスタムコマンド一覧'
  const pageDescription =
    'Claude Code で使用するカスタムコマンドの一覧です。各コマンドの詳細を確認し、自分の環境で利用できます。'

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: `${siteUrl}/claude-code/commands`,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `${siteUrl}/claude-code/commands`,
      type: 'website',
    },
  }
}

/**
 * Commands list page component
 *
 * Displays all custom commands from src/data/commands/ directory.
 * Each command is shown as a clickable card that navigates to its detail page.
 *
 * Layout structure:
 * 1. Header with gradient and navbar
 * 2. Main content with page title, description, and command cards
 * 3. Footer
 *
 * Empty state: Displays a friendly message when no commands are available.
 * Error handling: Wrapped in AsyncErrorBoundary for graceful error recovery.
 *
 * @returns Rendered commands list page
 */
export default function CommandsListPage() {
  // Fetch all commands from src/data/commands/ directory
  const commands = getAllCommands()

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
            {/* Page header */}
            <header className="max-w-2xl">
              <h1 className="text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl">
                カスタムコマンド一覧
              </h1>
              <p className="mt-6 text-base text-gray-600">
                Claude Code で使用するカスタムコマンドをご覧いただけます。各コマンドの詳細ページで、コマンドの内容を確認し、コピーして自分の環境で利用できます。
              </p>
            </header>

            {/* Command cards or empty state */}
            {commands.length === 0 ? (
              // Empty state: No commands available
              <div className="mt-16 text-center">
                <p className="text-gray-600">公開されているコマンドはまだありません</p>
              </div>
            ) : (
              // Command cards grid (responsive: 1 col mobile, 2 cols tablet, 3 cols desktop)
              <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {commands.map((command) => (
                  <CommandCard key={command.slug} command={command} />
                ))}
              </div>
            )}
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
