import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import { CourseFeatures } from "../CourseFeatures"

// Mock lucide-react
jest.mock("lucide-react", () => ({
  CheckCircle: ({ className }: { className?: string }) => (
    <span data-testid="icon-checkcircle" className={className}>
      CheckCircle
    </span>
  ),
  Sparkles: ({ className }: { className?: string }) => (
    <span data-testid="icon-sparkles" className={className}>
      Sparkles
    </span>
  ),
  Users: ({ className }: { className?: string }) => (
    <span data-testid="icon-users" className={className}>
      Users
    </span>
  ),
  Zap: ({ className }: { className?: string }) => (
    <span data-testid="icon-zap" className={className}>
      Zap
    </span>
  ),
}))

describe("CourseFeatures", () => {
  const mockFeatures = [
    { title: "実践的な内容", description: "ハンズオン形式で学べます" },
    { title: "最新技術", description: "最新のバージョンに対応" },
  ]

  it("renders section title", () => {
    render(<CourseFeatures features={mockFeatures} />)
    expect(screen.getByText("講座の特徴")).toBeInTheDocument()
  })

  it("renders all feature titles", () => {
    render(<CourseFeatures features={mockFeatures} />)
    expect(screen.getByText("実践的な内容")).toBeInTheDocument()
    expect(screen.getByText("最新技術")).toBeInTheDocument()
  })

  it("renders all feature descriptions", () => {
    render(<CourseFeatures features={mockFeatures} />)
    expect(screen.getByText("ハンズオン形式で学べます")).toBeInTheDocument()
    expect(screen.getByText("最新のバージョンに対応")).toBeInTheDocument()
  })

  it("renders correct number of feature cards", () => {
    const { container } = render(<CourseFeatures features={mockFeatures} />)
    const featureCards = container.querySelectorAll(".group")
    expect(featureCards).toHaveLength(2)
  })

  it("cycles through icons", () => {
    const fiveFeatures = [
      { title: "F1", description: "D1" },
      { title: "F2", description: "D2" },
      { title: "F3", description: "D3" },
      { title: "F4", description: "D4" },
      { title: "F5", description: "D5" },
    ]
    render(<CourseFeatures features={fiveFeatures} />)
    // 5th feature should cycle back to first icon (Sparkles)
    const sparklesIcons = screen.getAllByTestId("icon-sparkles")
    expect(sparklesIcons.length).toBe(2) // index 0 and 4
  })

  it("handles empty features array", () => {
    const { container } = render(<CourseFeatures features={[]} />)
    expect(container.querySelector(".group")).not.toBeInTheDocument()
  })
})
