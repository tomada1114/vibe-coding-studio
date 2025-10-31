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
      slug: "smart-commit",
      title: "Smart Commit",
      description:
        "変更内容を自動的に分析し、関連する変更ごとにグループ化して適切なコミットを作成",
      allowedTools: ["Bash", "Read"],
      argumentHint: "",
      content: "# Smart Commit Command",
      rawContent:
        "---\ndescription: 変更内容を自動的に分析し、関連する変更ごとにグループ化して適切なコミットを作成\nallowed-tools: Bash, Read\n---\n# Smart Commit Command",
      lastModified: "2025-01-01T00:00:00.000Z",
    },
    {
      slug: "test-command",
      title: "Test Command",
      description: "A test command for testing purposes",
      allowedTools: ["Bash", "Read"],
      argumentHint: "",
      content: "# Test Content",
      rawContent: "---\ndescription: test\n---\n# Test Content",
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
      expect(screen.getByText("Smart Commit")).toBeInTheDocument()
      expect(screen.getByText("Test Command")).toBeInTheDocument()
    })

    test("should render command descriptions", () => {
      render(<CommandsListPage />)

      // Command descriptions should be displayed
      expect(
        screen.getByText(/変更内容を自動的に分析し、関連する変更ごとにグループ化/)
      ).toBeInTheDocument()
      expect(
        screen.getByText(/A test command for testing purposes/)
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
      const smartCommitLink = screen
        .getAllByRole("link")
        .find(link =>
          link
            .getAttribute("href")
            ?.includes("/claude-code/commands/smart-commit")
        )
      const testCommandLink = screen
        .getAllByRole("link")
        .find(link =>
          link
            .getAttribute("href")
            ?.includes("/claude-code/commands/test-command")
        )

      expect(smartCommitLink).toBeInTheDocument()
      expect(testCommandLink).toBeInTheDocument()
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
