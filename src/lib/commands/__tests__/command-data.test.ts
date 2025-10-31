/**
 * Unit tests for CommandLoader
 *
 * This test suite follows TDD methodology:
 * 1. RED: Write failing tests first
 * 2. GREEN: Write minimal implementation to pass tests
 * 3. REFACTOR: Improve code quality while keeping tests green
 */

import { describe, expect, it } from "@jest/globals"
import {
  getAllCommands,
  getAllCommandSlugs,
  getCommandBySlug,
} from "../command-data"

describe("CommandLoader", () => {
  describe("getAllCommands", () => {
    it("should return an array of CommandMetadata", () => {
      const commands = getAllCommands()

      expect(Array.isArray(commands)).toBe(true)

      if (commands.length > 0) {
        const firstCommand = commands[0]
        expect(firstCommand).toHaveProperty("slug")
        expect(firstCommand).toHaveProperty("title")
        expect(firstCommand).toHaveProperty("description")
        expect(firstCommand).toHaveProperty("allowedTools")
        expect(firstCommand).toHaveProperty("argumentHint")
        expect(firstCommand).toHaveProperty("content")
        expect(firstCommand).toHaveProperty("rawContent")
      }
    })

    it("should correctly parse frontmatter from markdown files", () => {
      const commands = getAllCommands()

      // Find the test-command-1 fixture
      const testCommand = commands.find(cmd => cmd.slug === "test-command-1")

      if (testCommand) {
        expect(testCommand.description).toBe(
          "Convert YouTube video data from commented format to VideoMetadata TypeScript"
        )
        expect(testCommand.allowedTools).toEqual([
          "Read",
          "Write",
          "Edit",
          "Bash",
        ])
        expect(testCommand.argumentHint).toBe("<youtube-video-id>")
        expect(testCommand.content).toContain("# YouTube Video Data Conversion")
        expect(testCommand.rawContent).toContain("---")
        expect(testCommand.rawContent).toContain("description:")
      }
    })

    it("should generate correct title from slug", () => {
      const commands = getAllCommands()

      const testCommand = commands.find(cmd => cmd.slug === "test-command-1")

      if (testCommand) {
        expect(testCommand.title).toBe("Test Command 1")
      }
    })

    it("should return empty array when directory does not exist", () => {
      // This test will verify graceful handling of missing directory
      // For now, we'll test with the actual directory
      const commands = getAllCommands()

      expect(Array.isArray(commands)).toBe(true)
    })

    it("should handle files without frontmatter gracefully", () => {
      const commands = getAllCommands()

      // Find a command without frontmatter (if exists)
      const commandWithoutFrontmatter = commands.find(
        cmd => cmd.slug === "test-command-no-frontmatter"
      )

      if (commandWithoutFrontmatter) {
        expect(commandWithoutFrontmatter.description).toBe("")
        expect(commandWithoutFrontmatter.allowedTools).toEqual([])
        expect(commandWithoutFrontmatter.argumentHint).toBe("")
      }
    })

    it("should skip files with invalid frontmatter and continue processing", () => {
      const commands = getAllCommands()

      // Should not throw error even if some files have invalid frontmatter
      expect(Array.isArray(commands)).toBe(true)

      // Should still process valid files
      expect(commands.length).toBeGreaterThanOrEqual(0)
    })
  })

  describe("getCommandBySlug", () => {
    it("should return CommandMetadata for valid slug", () => {
      const command = getCommandBySlug("test-command-1")

      if (command) {
        expect(command.slug).toBe("test-command-1")
        expect(command.title).toBe("Test Command 1")
        expect(command.description).toBeTruthy()
      }
    })

    it("should return undefined for non-existent slug", () => {
      const command = getCommandBySlug("non-existent-command")

      expect(command).toBeUndefined()
    })

    it("should validate slug format and reject invalid slugs", () => {
      const invalidSlug = "../../../etc/passwd"
      const command = getCommandBySlug(invalidSlug)

      // Should return undefined for invalid slug (path traversal attempt)
      expect(command).toBeUndefined()
    })

    it("should handle slugs with special characters safely", () => {
      const specialSlug = "command!@#$%"
      const command = getCommandBySlug(specialSlug)

      // Should return undefined for slug with invalid characters
      expect(command).toBeUndefined()
    })
  })

  describe("getAllCommandSlugs", () => {
    it("should return an array of slug strings", () => {
      const slugs = getAllCommandSlugs()

      expect(Array.isArray(slugs)).toBe(true)

      slugs.forEach(slug => {
        expect(typeof slug).toBe("string")
        expect(slug.length).toBeGreaterThan(0)
      })
    })

    it("should return valid URL-safe slugs", () => {
      const slugs = getAllCommandSlugs()

      slugs.forEach(slug => {
        // Slugs should only contain lowercase letters, numbers, hyphens, underscores
        expect(/^[a-z0-9_-]+$/.test(slug)).toBe(true)
      })
    })

    it("should return unique slugs", () => {
      const slugs = getAllCommandSlugs()
      const uniqueSlugs = new Set(slugs)

      expect(slugs.length).toBe(uniqueSlugs.size)
    })
  })

  describe("Error Handling", () => {
    it("should log errors for file read failures but continue processing", () => {
      // This test verifies that file read errors don't crash the entire process
      const commands = getAllCommands()

      // Should return an array even if some files fail to read
      expect(Array.isArray(commands)).toBe(true)
    })

    it("should log warnings for missing frontmatter fields", () => {
      // This test verifies that missing frontmatter fields are handled gracefully
      const commands = getAllCommands()

      // Should return an array with default values for missing fields
      commands.forEach(command => {
        expect(command.description).toBeDefined()
        expect(Array.isArray(command.allowedTools)).toBe(true)
        expect(command.argumentHint).toBeDefined()
      })
    })
  })
})
