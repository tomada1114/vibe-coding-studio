import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import React from "react"
import { AuthorCredit } from "../AuthorCredit"

// Mock next/link
jest.mock("next/link", () => {
  const MockLink = ({
    children,
    href,
    className,
    "aria-label": ariaLabel,
  }: {
    children: React.ReactNode
    href: string
    className?: string
    "aria-label"?: string
  }) => {
    return (
      <a href={href} className={className} aria-label={ariaLabel}>
        {children}
      </a>
    )
  }
  MockLink.displayName = "MockLink"
  return MockLink
})

// Mock lucide-react
jest.mock("lucide-react", () => ({
  UserIcon: () => <span data-testid="user-icon">UserIcon</span>,
}))

describe("AuthorCredit", () => {
  describe("Default rendering", () => {
    it("renders default author name", () => {
      render(<AuthorCredit />)
      expect(screen.getByText("とまだ")).toBeInTheDocument()
    })

    it("renders author link with default href", () => {
      render(<AuthorCredit />)
      const link = screen.getByRole("link")
      expect(link).toHaveAttribute("href", "/founder")
    })

    it("renders user icon", () => {
      render(<AuthorCredit />)
      expect(screen.getByTestId("user-icon")).toBeInTheDocument()
    })

    it("renders author label", () => {
      render(<AuthorCredit />)
      expect(screen.getByText("作成者:")).toBeInTheDocument()
    })
  })

  describe("Custom props", () => {
    it("renders custom author name", () => {
      render(<AuthorCredit authorName="テスト著者" />)
      expect(screen.getByText("テスト著者")).toBeInTheDocument()
    })

    it("renders custom author URL", () => {
      render(<AuthorCredit authorUrl="/about" />)
      const link = screen.getByRole("link")
      expect(link).toHaveAttribute("href", "/about")
    })

    it("applies custom className", () => {
      const { container } = render(<AuthorCredit className="text-center" />)
      const wrapper = container.firstChild as HTMLElement
      expect(wrapper).toHaveClass("text-center")
    })

    it("renders aria-label for accessibility", () => {
      render(<AuthorCredit authorName="テスト著者" />)
      const link = screen.getByRole("link")
      expect(link).toHaveAttribute(
        "aria-label",
        "作成者 テスト著者 のプロフィールページへ"
      )
    })
  })

  describe("Date display", () => {
    it("renders created date when provided", () => {
      render(<AuthorCredit createdAt="2025-01-15T00:00:00Z" />)
      expect(screen.getByText(/作成:/)).toBeInTheDocument()
    })

    it("renders updated date when provided", () => {
      render(<AuthorCredit updatedAt="2025-06-01T00:00:00Z" />)
      expect(screen.getByText(/更新:/)).toBeInTheDocument()
    })

    it("renders both dates when provided", () => {
      render(
        <AuthorCredit
          createdAt="2025-01-15T00:00:00Z"
          updatedAt="2025-06-01T00:00:00Z"
        />
      )
      expect(screen.getByText(/作成:/)).toBeInTheDocument()
      expect(screen.getByText(/更新:/)).toBeInTheDocument()
    })

    it("does not render date section when no dates provided", () => {
      const { container } = render(<AuthorCredit />)
      expect(container.querySelector("time")).not.toBeInTheDocument()
    })

    it("renders time element with dateTime attribute", () => {
      render(<AuthorCredit createdAt="2025-01-15T00:00:00Z" />)
      const timeElement = screen.getByText(/2025/).closest("time")
      expect(timeElement).toHaveAttribute("dateTime", "2025-01-15T00:00:00Z")
    })
  })
})
