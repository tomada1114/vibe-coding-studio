/**
 * CommandDetail Component Tests
 *
 * Tests for the CommandDetail component that displays detailed information
 * about a custom command, including title, description, and frontmatter metadata.
 * Tests cover rendering, styling, typography, and accessibility features.
 */

import CommandDetail from "@/components/commands/command-detail"
import type { CommandMetadata } from "@/types/command"
import { render, screen } from "@testing-library/react"

/**
 * Sample command metadata for testing
 */
const mockCommand: CommandMetadata = {
  slug: "smart-commit",
  title: "Smart Commit",
  description:
    "変更内容を自動的に分析し、関連する変更ごとにグループ化して適切なコミットを作成",
  allowedTools: ["Bash", "Read"],
  argumentHint: "",
  content: "# Smart Commit Command",
  rawContent:
    "---\ndescription: 変更内容を自動的に分析し、関連する変更ごとにグループ化して適切なコミットを作成\nallowed-tools: Bash, Read\n---\n# Smart Commit Command",
}

describe("CommandDetail", () => {
  describe("Rendering", () => {
    it("should render command title", () => {
      render(<CommandDetail command={mockCommand} />)
      expect(screen.getByText("Smart Commit")).toBeInTheDocument()
    })

    it("should render command description", () => {
      render(<CommandDetail command={mockCommand} />)
      expect(
        screen.getByText(
          "変更内容を自動的に分析し、関連する変更ごとにグループ化して適切なコミットを作成"
        )
      ).toBeInTheDocument()
    })

    it("should render as a section element", () => {
      const { container } = render(<CommandDetail command={mockCommand} />)
      const section = container.querySelector("section")

      expect(section).toBeInTheDocument()
    })
  })

  describe("Frontmatter Display", () => {
    it("should display allowed tools when present", () => {
      render(<CommandDetail command={mockCommand} />)

      expect(screen.getByText(/Allowed Tools/i)).toBeInTheDocument()
      expect(screen.getByText(/Bash/)).toBeInTheDocument()
      expect(screen.getByText(/Read/)).toBeInTheDocument()
    })

    it("should display argument hint when present", () => {
      const commandWithHint: CommandMetadata = {
        ...mockCommand,
        argumentHint: "<test-arg>",
      }
      render(<CommandDetail command={commandWithHint} />)

      expect(screen.getByText(/Argument Hint/i)).toBeInTheDocument()
      expect(screen.getByText("<test-arg>")).toBeInTheDocument()
    })

    it("should not display allowed tools section when empty", () => {
      const commandWithoutTools: CommandMetadata = {
        ...mockCommand,
        allowedTools: [],
      }
      render(<CommandDetail command={commandWithoutTools} />)

      expect(screen.queryByText(/Allowed Tools/i)).not.toBeInTheDocument()
    })

    it("should not display argument hint section when empty", () => {
      const commandWithoutHint: CommandMetadata = {
        ...mockCommand,
        argumentHint: "",
      }
      render(<CommandDetail command={commandWithoutHint} />)

      expect(screen.queryByText(/Argument Hint/i)).not.toBeInTheDocument()
    })

    it("should display multiple allowed tools as a list", () => {
      const { container } = render(<CommandDetail command={mockCommand} />)

      // Should use list structure for multiple tools
      const list = container.querySelector("ul")
      expect(list).toBeInTheDocument()

      const listItems = container.querySelectorAll("li")
      expect(listItems.length).toBeGreaterThanOrEqual(2) // At least 2 tools
    })
  })

  describe("Typography and Styling", () => {
    it("should render title as H1 with proper styling", () => {
      render(<CommandDetail command={mockCommand} />)
      const title = screen.getByText("Smart Commit")

      expect(title.tagName).toBe("H1")
      expect(title).toHaveClass("text-gray-950")
      expect(title).toHaveClass("font-bold")
    })

    it("should have proper title size", () => {
      render(<CommandDetail command={mockCommand} />)
      const title = screen.getByText("Smart Commit")

      expect(title).toHaveClass("text-3xl")
      expect(title).toHaveClass("sm:text-4xl")
    })

    it("should render description with body text styling", () => {
      render(<CommandDetail command={mockCommand} />)
      const description = screen.getByText(/変更内容を自動的に分析し/)

      expect(description).toHaveClass("text-gray-600")
      expect(description).toHaveClass("text-lg")
    })

    it("should apply Radiant design system spacing", () => {
      const { container } = render(<CommandDetail command={mockCommand} />)
      const section = container.querySelector("section")

      // Should use 8px grid system (Tailwind's spacing scale)
      expect(section).toHaveClass("space-y-6")
    })
  })

  describe("Semantic Structure", () => {
    it("should use semantic HTML for frontmatter info", () => {
      const { container } = render(<CommandDetail command={mockCommand} />)

      // Allowed tools should be a list
      const list = container.querySelector("ul")
      expect(list).toBeInTheDocument()

      // Argument hint should be in a definition list or similar
      const dt = container.querySelector("dt")
      expect(dt).toBeInTheDocument()
    })

    it("should have proper heading hierarchy", () => {
      const { container } = render(<CommandDetail command={mockCommand} />)

      // Main title should be H1
      const h1 = container.querySelector("h1")
      expect(h1).toBeInTheDocument()
      expect(h1).toHaveTextContent("Smart Commit")
    })
  })

  describe("Accessibility", () => {
    it("should have proper ARIA attributes", () => {
      const { container } = render(<CommandDetail command={mockCommand} />)
      const section = container.querySelector("section")

      expect(section).toHaveAttribute("aria-labelledby", expect.any(String))
    })

    it("should be screen reader friendly", () => {
      render(<CommandDetail command={mockCommand} />)

      // Title should be accessible
      const title = screen.getByRole("heading", { level: 1 })
      expect(title).toHaveTextContent("Smart Commit")
    })

    it("should have proper color contrast", () => {
      render(<CommandDetail command={mockCommand} />)
      const title = screen.getByText("Smart Commit")
      const description = screen.getByText(/変更内容を自動的に分析し/)

      // Gray-950 on white background meets WCAG AA
      expect(title).toHaveClass("text-gray-950")
      // Gray-600 on white background meets WCAG AA
      expect(description).toHaveClass("text-gray-600")
    })
  })

  describe("Responsive Design", () => {
    it("should have responsive title sizing", () => {
      render(<CommandDetail command={mockCommand} />)
      const title = screen.getByText("Smart Commit")

      expect(title).toHaveClass("text-3xl")
      expect(title).toHaveClass("sm:text-4xl")
    })

    it("should have responsive spacing", () => {
      const { container } = render(<CommandDetail command={mockCommand} />)
      const section = container.querySelector("section")

      expect(section).toHaveClass("space-y-6")
    })
  })

  describe("Edge Cases", () => {
    it("should handle missing description gracefully", () => {
      const commandWithoutDescription: CommandMetadata = {
        ...mockCommand,
        description: "",
      }
      render(<CommandDetail command={commandWithoutDescription} />)

      expect(screen.getByText("Smart Commit")).toBeInTheDocument()
      // Should still render other elements
    })

    it("should handle all optional frontmatter fields missing", () => {
      const minimalCommand: CommandMetadata = {
        slug: "test",
        title: "Test Command",
        description: "",
        allowedTools: [],
        argumentHint: "",
        content: "",
        rawContent: "",
      }
      render(<CommandDetail command={minimalCommand} />)

      expect(screen.getByText("Test Command")).toBeInTheDocument()
    })

    it("should handle single allowed tool", () => {
      const commandWithOneTool: CommandMetadata = {
        ...mockCommand,
        allowedTools: ["Read"],
      }
      render(<CommandDetail command={commandWithOneTool} />)

      expect(screen.getByText("Read")).toBeInTheDocument()
    })

    it("should handle very long description", () => {
      const longDescription = "A".repeat(500)
      const commandWithLongDesc: CommandMetadata = {
        ...mockCommand,
        description: longDescription,
      }
      render(<CommandDetail command={commandWithLongDesc} />)

      expect(screen.getByText(longDescription)).toBeInTheDocument()
    })
  })

  describe("Frontmatter Labels", () => {
    it("should have clear labels for frontmatter fields", () => {
      const commandWithHint: CommandMetadata = {
        ...mockCommand,
        argumentHint: "<test-arg>",
      }
      render(<CommandDetail command={commandWithHint} />)

      // Labels should be descriptive
      expect(screen.getByText(/Allowed Tools/i)).toBeInTheDocument()
      expect(screen.getByText(/Argument Hint/i)).toBeInTheDocument()
    })

    it("should style labels consistently", () => {
      const { container } = render(<CommandDetail command={mockCommand} />)

      // Labels should use semibold weight
      const labels = container.querySelectorAll("dt, .font-semibold")
      expect(labels.length).toBeGreaterThan(0)
    })
  })
})
