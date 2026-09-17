import CoursesPage, { metadata } from "@/app/courses/page"
import { getAllUdemyCourses } from "@/data/udemy-courses"
import { render, screen } from "@testing-library/react"

describe("/courses", () => {
  it("publishes page metadata with a canonical URL", () => {
    expect(metadata.title).toBe("講座一覧")
    expect(metadata.description).toBe("著者が公開しているUdemy講座の一覧です。")
    expect(metadata.alternates?.canonical).toBe(
      "https://www.vibecodingstudio.dev/courses"
    )
  })

  it("renders the complete course listing", () => {
    render(<CoursesPage />)

    const courses = getAllUdemyCourses()
    expect(
      screen.getByRole("heading", { level: 1, name: "講座一覧" })
    ).toBeInTheDocument()
    expect(screen.getAllByRole("article")).toHaveLength(courses.length)
    courses.forEach(course => {
      expect(
        screen.getByRole("heading", { level: 2, name: course.title })
      ).toBeInTheDocument()
    })
  })

  describe("Geist Grid の規則", () => {
    it("ページルートに gg-surface を持つ", () => {
      const { container } = render(<CoursesPage />)
      expect(container.firstElementChild).toHaveClass("gg-surface")
    })

    it("生の hex カラーや gray-* のクラスを使っていない", () => {
      const { container } = render(<CoursesPage />)
      const classNames = Array.from(container.querySelectorAll("*"))
        .map(el => el.getAttribute("class") ?? "")
        .join(" ")

      expect(classNames).not.toMatch(/\b(?:bg|text|border)-gray-\d/)
      // 色の dark: 上書きは禁止。トークンで表現できない構造的な出し分けだけが
      // SKILL.md の定める例外として許される。
      expect(classNames).not.toMatch(/dark:(?:bg|text|border)-/)
      expect(classNames).not.toMatch(/\[#[0-9a-fA-F]{3,8}\]/)
    })

    it("グラデーション罫線は 1 ページ 1〜2 本（このページで 1 本使う）", () => {
      const { container } = render(<CoursesPage />)
      const count = container.querySelectorAll(".gg-rule-accent").length
      expect(count).toBeGreaterThan(0)
      expect(count).toBeLessThanOrEqual(2)
    })
  })
})
