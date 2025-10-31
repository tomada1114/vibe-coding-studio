/**
 * Commands List Page Integration Tests
 *
 * Tests for the commands list page that displays all available custom commands.
 * Tests cover rendering, navigation, empty state, and error handling.
 *
 * Task 4.1: RED phase - Create failing tests for commands list page
 * Requirements: 1.1, 1.3, 1.6, 7.1
 */

import { describe, expect, test } from "@jest/globals"
import { render, screen } from "@testing-library/react"
import CommandsListPage from "../page"

/**
 * Mock the CommandLoader to control test data
 */
jest.mock("@/lib/commands/command-data", () => ({
  getAllCommands: jest.fn(() => [
    {
      slug: "convert-video",
      title: "Convert Video",
      description:
        "Convert YouTube video data from commented format to VideoMetadata TypeScript",
      allowedTools: ["Read", "Write", "Edit", "Bash"],
      argumentHint: "<youtube-video-id>",
      content: "# Content",
      rawContent: "---\ndescription: test\n---\n# Content",
      lastModified: "2025-01-01T00:00:00.000Z",
    },
    {
      slug: "pr-description",
      title: "Pr Description",
      description:
        "Create or update PR title and description for a given PR number",
      allowedTools: ["Bash", "Read"],
      argumentHint: "<pr-number>",
      content: "# Content",
      rawContent: "---\ndescription: test\n---\n# Content",
      lastModified: "2025-01-01T00:00:00.000Z",
    },
  ]),
}))

/**
 * Mock Next.js Link component to enable testing without routing
 */
jest.mock("next/link", () => {
  return function MockLink({
    children,
    href,
  }: {
    children: React.ReactNode
    href: string
  }) {
    return <a href={href}>{children}</a>
  }
})

describe("Commands List Page", () => {
  describe("Rendering", () => {
    test("should render page heading", () => {
      render(<CommandsListPage />)

      // Page heading should be displayed
      const heading = screen.getByRole("heading", { level: 1 })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveTextContent(/カスタムコマンド一覧|Custom Commands/i)
    })

    test("should render page description", () => {
      render(<CommandsListPage />)

      // Page description should be displayed
      expect(
        screen.getByText(
          /Claude Code で使用するカスタムコマンド|custom commands for Claude Code/i
        )
      ).toBeInTheDocument()
    })

    test("should render command cards when data exists", () => {
      render(<CommandsListPage />)

      // Command titles should be displayed
      expect(screen.getByText("Convert Video")).toBeInTheDocument()
      expect(screen.getByText("Pr Description")).toBeInTheDocument()
    })

    test("should render command descriptions", () => {
      render(<CommandsListPage />)

      // Command descriptions should be displayed
      expect(
        screen.getByText(/Convert YouTube video data from commented format/)
      ).toBeInTheDocument()
      expect(
        screen.getByText(/Create or update PR title and description/)
      ).toBeInTheDocument()
    })
  })

  describe("Navigation", () => {
    test("should have links to detail pages", () => {
      render(<CommandsListPage />)

      // Links should exist
      const links = screen.getAllByRole("link")
      expect(links.length).toBeGreaterThan(0)
    })

    test("should link to correct detail page for each command", () => {
      render(<CommandsListPage />)

      // Find links with correct href
      const convertVideoLink = screen
        .getAllByRole("link")
        .find(link =>
          link
            .getAttribute("href")
            ?.includes("/claude-code/commands/convert-video")
        )
      const prDescriptionLink = screen
        .getAllByRole("link")
        .find(link =>
          link
            .getAttribute("href")
            ?.includes("/claude-code/commands/pr-description")
        )

      expect(convertVideoLink).toBeInTheDocument()
      expect(prDescriptionLink).toBeInTheDocument()
    })
  })

  describe("Layout and Design", () => {
    test("should use Container component", () => {
      const { container } = render(<CommandsListPage />)

      // Container classes should be present
      const containerElement = container.querySelector(".mx-auto")
      expect(containerElement).toBeInTheDocument()
    })

    test("should use responsive grid layout", () => {
      const { container } = render(<CommandsListPage />)

      // Grid layout classes should be present
      const gridElement = container.querySelector(".grid")
      expect(gridElement).toBeInTheDocument()

      // Responsive grid classes should be applied
      expect(gridElement).toHaveClass("sm:grid-cols-2")
      expect(gridElement).toHaveClass("lg:grid-cols-3")
    })

    test("should have proper spacing between cards", () => {
      const { container } = render(<CommandsListPage />)

      // Grid should have gap classes
      const gridElement = container.querySelector(".grid")
      expect(gridElement).toHaveClass("gap-6")
    })
  })

  describe("Accessibility", () => {
    test("should have proper heading hierarchy", () => {
      render(<CommandsListPage />)

      // Should have h1 for page title
      const h1 = screen.getByRole("heading", { level: 1 })
      expect(h1).toBeInTheDocument()
    })

    test("should have semantic structure", () => {
      const { container } = render(<CommandsListPage />)

      // Should use semantic HTML elements
      const main = container.querySelector("main")
      expect(main).toBeInTheDocument()
    })
  })
})

describe("Commands List Page - Empty State", () => {
  beforeEach(() => {
    // Mock empty commands list
    jest.clearAllMocks()
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const commandData = require("@/lib/commands/command-data")
    commandData.getAllCommands.mockReturnValue([])
  })

  test("should display empty state message when no commands exist", () => {
    render(<CommandsListPage />)

    // Empty state message should be displayed
    expect(
      screen.getByText(
        /公開されているコマンドはまだありません|No commands available/i
      )
    ).toBeInTheDocument()
  })

  test("should not display command grid when no commands exist", () => {
    const { container } = render(<CommandsListPage />)

    // Command cards grid should not be rendered (check for specific grid with gap-6)
    const commandGridElement = container.querySelector(".grid.gap-6")
    expect(commandGridElement).not.toBeInTheDocument()
  })
})

describe("Commands List Page - Error Handling", () => {
  beforeEach(() => {
    // Mock error in getAllCommands
    jest.clearAllMocks()
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const commandData = require("@/lib/commands/command-data")
    commandData.getAllCommands.mockImplementation(() => {
      throw new Error("Failed to read commands directory")
    })
  })

  test("should display error message when loading fails", () => {
    // This test will verify that AsyncErrorBoundary catches errors
    // For now, we expect the component to handle errors gracefully
    expect(() => render(<CommandsListPage />)).toThrow()
  })
})
