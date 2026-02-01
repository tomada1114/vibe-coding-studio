import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import { TargetAudience } from "../TargetAudience"

// Mock lucide-react
jest.mock("lucide-react", () => ({
  Briefcase: ({ className }: { className?: string }) => (
    <span data-testid="icon-briefcase" className={className}>
      Briefcase
    </span>
  ),
  Rocket: ({ className }: { className?: string }) => (
    <span data-testid="icon-rocket" className={className}>
      Rocket
    </span>
  ),
  Target: ({ className }: { className?: string }) => (
    <span data-testid="icon-target" className={className}>
      Target
    </span>
  ),
  User: ({ className }: { className?: string }) => (
    <span data-testid="icon-user" className={className}>
      User
    </span>
  ),
}))

describe("TargetAudience", () => {
  const mockAudiences = [
    {
      title: "プログラミング初心者",
      points: ["Rubyを初めて学ぶ方", "他の言語からの移行者"],
    },
    {
      title: "Web開発者",
      points: ["Rails開発に興味がある方"],
    },
  ]

  it("renders section title", () => {
    render(<TargetAudience audiences={mockAudiences} />)
    expect(screen.getByText("こんな方におすすめ")).toBeInTheDocument()
  })

  it("renders audience titles", () => {
    render(<TargetAudience audiences={mockAudiences} />)
    expect(screen.getByText("プログラミング初心者")).toBeInTheDocument()
    expect(screen.getByText("Web開発者")).toBeInTheDocument()
  })

  it("renders audience points", () => {
    render(<TargetAudience audiences={mockAudiences} />)
    expect(screen.getByText("Rubyを初めて学ぶ方")).toBeInTheDocument()
    expect(screen.getByText("他の言語からの移行者")).toBeInTheDocument()
    expect(screen.getByText("Rails開発に興味がある方")).toBeInTheDocument()
  })

  it("renders correct number of audience cards", () => {
    const { container } = render(<TargetAudience audiences={mockAudiences} />)
    const cards = container.querySelectorAll(".rounded-xl")
    expect(cards).toHaveLength(2)
  })

  it("renders bullet points as list items", () => {
    const { container } = render(<TargetAudience audiences={mockAudiences} />)
    const listItems = container.querySelectorAll("li")
    expect(listItems).toHaveLength(3)
  })
})
