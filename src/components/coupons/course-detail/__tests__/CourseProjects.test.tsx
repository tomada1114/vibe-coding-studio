import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import { CourseProjects } from "../CourseProjects"

// Mock lucide-react
jest.mock("lucide-react", () => ({
  Brain: ({ className }: { className?: string }) => (
    <span data-testid="icon-brain" className={className}>
      Brain
    </span>
  ),
  Code2: ({ className }: { className?: string }) => (
    <span data-testid="icon-code2" className={className}>
      Code2
    </span>
  ),
  Database: ({ className }: { className?: string }) => (
    <span data-testid="icon-database" className={className}>
      Database
    </span>
  ),
  Palette: ({ className }: { className?: string }) => (
    <span data-testid="icon-palette" className={className}>
      Palette
    </span>
  ),
  Rocket: ({ className }: { className?: string }) => (
    <span data-testid="icon-rocket" className={className}>
      Rocket
    </span>
  ),
  StickyNote: ({ className }: { className?: string }) => (
    <span data-testid="icon-stickynote" className={className}>
      StickyNote
    </span>
  ),
  Timer: ({ className }: { className?: string }) => (
    <span data-testid="icon-timer" className={className}>
      Timer
    </span>
  ),
}))

describe("CourseProjects", () => {
  const mockProjects = [
    {
      title: "ToDoアプリ",
      tech: "React",
      description: "基本的なCRUDアプリケーション",
    },
    {
      title: "ブログシステム",
      tech: "Next.js",
      description: "SSGを使ったブログ",
    },
  ]

  it("renders section title with project count", () => {
    render(<CourseProjects projects={mockProjects} />)
    const heading = screen.getByRole("heading", { level: 2 })
    expect(heading).toHaveTextContent("作成する2つのプロジェクト")
  })

  it("omits count for more than 5 projects", () => {
    const manyProjects = Array.from({ length: 6 }, (_, i) => ({
      title: `Project ${i}`,
      tech: `Tech ${i}`,
      description: `Description ${i}`,
    }))
    render(<CourseProjects projects={manyProjects} />)
    const heading = screen.getByRole("heading", { level: 2 })
    expect(heading.textContent).not.toMatch(/\d+つの/)
  })

  it("renders project titles", () => {
    render(<CourseProjects projects={mockProjects} />)
    expect(screen.getByText("ToDoアプリ")).toBeInTheDocument()
    expect(screen.getByText("ブログシステム")).toBeInTheDocument()
  })

  it("renders tech badges", () => {
    render(<CourseProjects projects={mockProjects} />)
    expect(screen.getByText("React")).toBeInTheDocument()
    expect(screen.getByText("Next.js")).toBeInTheDocument()
  })

  it("renders project descriptions", () => {
    render(<CourseProjects projects={mockProjects} />)
    expect(screen.getByText("基本的なCRUDアプリケーション")).toBeInTheDocument()
  })

  it("renders educational note", () => {
    render(<CourseProjects projects={mockProjects} />)
    expect(screen.getByText(/段階的な学習/)).toBeInTheDocument()
  })
})
