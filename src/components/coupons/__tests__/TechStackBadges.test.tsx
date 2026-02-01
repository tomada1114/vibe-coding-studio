import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import { TechStackBadges } from "../TechStackBadges"

// Mock TOPIC_INFO
jest.mock("@/constants/coupon-courses", () => ({
  TOPIC_INFO: {
    typescript: {
      slug: "typescript",
      name: "TypeScript",
      icon: "/images/topics/typescript.svg",
    },
    react: {
      slug: "react",
      name: "React",
      icon: "/images/topics/react.svg",
    },
    nextjs: {
      slug: "nextjs",
      name: "Next.js",
      icon: "/images/topics/nextjs.svg",
    },
  } as Record<string, { slug: string; name: string; icon: string }>,
}))

describe("TechStackBadges", () => {
  it("renders topic names from TOPIC_INFO", () => {
    render(<TechStackBadges topics={["typescript", "react"]} />)
    expect(screen.getByText("TypeScript")).toBeInTheDocument()
    expect(screen.getByText("React")).toBeInTheDocument()
  })

  it("renders correct number of badges", () => {
    const { container } = render(
      <TechStackBadges topics={["typescript", "react", "nextjs"]} />
    )
    const badges = container.querySelectorAll(".flex.items-center.gap-2")
    expect(badges).toHaveLength(3)
  })

  it("renders grid layout", () => {
    const { container } = render(<TechStackBadges topics={["typescript"]} />)
    const grid = container.firstChild as HTMLElement
    expect(grid).toHaveClass("grid", "grid-cols-2")
  })

  it("renders empty grid for empty topics", () => {
    const { container } = render(<TechStackBadges topics={[]} />)
    const grid = container.firstChild as HTMLElement
    expect(grid.children).toHaveLength(0)
  })

  it("applies hover styles to badges", () => {
    const { container } = render(<TechStackBadges topics={["typescript"]} />)
    const badge = container.querySelector(".flex.items-center.gap-2")
    expect(badge).toHaveClass("hover:border-zinc-950/20")
    expect(badge).toHaveClass("hover:bg-zinc-100")
  })
})
