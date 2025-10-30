/**
 * CommandLoader - File-based command data loader
 *
 * This module reads markdown files from src/data/commands/ directory,
 * parses frontmatter, and provides command metadata for the application.
 *
 * Design decisions:
 * - Uses Node.js fs module for file system access (Server Components only)
 * - Uses gray-matter for frontmatter parsing
 * - Implements graceful error handling (continue on errors)
 * - Validates slugs to prevent path traversal attacks
 */

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { CommandMetadata, CommandFrontmatter } from '@/types/command'
import { slugToTitle, parseCommaSeparated, isValidSlug } from '@/types/command'

/**
 * Directory containing published command markdown files.
 */
const COMMANDS_DIR = path.join(process.cwd(), 'src', 'data', 'commands')

/**
 * Log warning messages (development only).
 */
function logWarning(message: string): void {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.warn(message)
  }
}

/**
 * Log error messages.
 */
function logError(message: string, error?: unknown): void {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.error(message, error)
  } else {
    // In production, log to error tracking service (e.g., Sentry)
    // For now, just log to stderr
    // eslint-disable-next-line no-console
    console.error(message)
  }
}

/**
 * Get all command metadata from markdown files.
 *
 * This function:
 * 1. Scans the commands directory for .md files
 * 2. Reads each file and parses frontmatter
 * 3. Returns an array of CommandMetadata objects
 *
 * Error handling:
 * - Returns empty array if directory doesn't exist
 * - Skips files that fail to read (logs error)
 * - Continues processing if frontmatter parsing fails (logs warning)
 *
 * @returns Array of command metadata, sorted by slug
 */
export function getAllCommands(): CommandMetadata[] {
  try {
    // Check if directory exists
    if (!fs.existsSync(COMMANDS_DIR)) {
      logWarning(`Commands directory not found: ${COMMANDS_DIR}`)
      return []
    }

    // Read all files in the directory
    const files = fs.readdirSync(COMMANDS_DIR)

    // Filter for markdown files only
    const markdownFiles = files.filter((file) => file.endsWith('.md'))

    // Parse each file and collect metadata
    const commands: CommandMetadata[] = []

    for (const file of markdownFiles) {
      try {
        const slug = file.replace(/\.md$/, '')

        // Validate slug format
        if (!isValidSlug(slug)) {
          logWarning(`Invalid slug format: ${slug}`)
          continue
        }

        const filePath = path.join(COMMANDS_DIR, file)
        const rawContent = fs.readFileSync(filePath, 'utf-8')

        // Parse frontmatter
        const { data, content } = matter(rawContent)

        // Extract frontmatter fields with defaults
        const frontmatter = data as CommandFrontmatter
        const description = frontmatter.description ?? ''
        const allowedTools = parseCommaSeparated(frontmatter['allowed-tools'])
        const argumentHint = frontmatter['argument-hint'] ?? ''

        // Get file stats for last modified date
        const stats = fs.statSync(filePath)
        const lastModified = stats.mtime.toISOString()

        // Create CommandMetadata object
        const command: CommandMetadata = {
          slug,
          title: slugToTitle(slug),
          description,
          allowedTools,
          argumentHint,
          content: content.trim(),
          rawContent,
          lastModified,
        }

        commands.push(command)
      } catch (error) {
        logError(`Failed to process command file: ${file}`, error)
        // Continue processing other files
        continue
      }
    }

    // Sort by slug for consistent ordering
    return commands.sort((a, b) => a.slug.localeCompare(b.slug))
  } catch (error) {
    logError('Failed to read commands directory:', error)
    return []
  }
}

/**
 * Get command metadata by slug.
 *
 * This function:
 * 1. Validates the slug format
 * 2. Checks if the corresponding file exists
 * 3. Reads and parses the file
 * 4. Returns CommandMetadata or undefined
 *
 * Security:
 * - Validates slug to prevent path traversal attacks
 * - Only reads from the commands directory
 *
 * @param slug - URL-safe slug (e.g., "convert-video")
 * @returns CommandMetadata if found, undefined otherwise
 */
export function getCommandBySlug(slug: string): CommandMetadata | undefined {
  // Validate slug format (prevent path traversal)
  if (!isValidSlug(slug)) {
    logWarning(`Invalid slug format: ${slug}`)
    return undefined
  }

  try {
    const filePath = path.join(COMMANDS_DIR, `${slug}.md`)

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return undefined
    }

    // Read file content
    const rawContent = fs.readFileSync(filePath, 'utf-8')

    // Parse frontmatter
    const { data, content } = matter(rawContent)

    // Extract frontmatter fields with defaults
    const frontmatter = data as CommandFrontmatter
    const description = frontmatter.description ?? ''
    const allowedTools = parseCommaSeparated(frontmatter['allowed-tools'])
    const argumentHint = frontmatter['argument-hint'] ?? ''

    // Get file stats for last modified date
    const stats = fs.statSync(filePath)
    const lastModified = stats.mtime.toISOString()

    // Create CommandMetadata object
    const command: CommandMetadata = {
      slug,
      title: slugToTitle(slug),
      description,
      allowedTools,
      argumentHint,
      content: content.trim(),
      rawContent,
      lastModified,
    }

    return command
  } catch (error) {
    logError(`Failed to read command file: ${slug}`, error)
    return undefined
  }
}

/**
 * Get all command slugs for static page generation.
 *
 * This function is used by Next.js generateStaticParams to create
 * static pages for all commands at build time.
 *
 * @returns Array of command slugs
 */
export function getAllCommandSlugs(): string[] {
  const commands = getAllCommands()
  return commands.map((command) => command.slug)
}
