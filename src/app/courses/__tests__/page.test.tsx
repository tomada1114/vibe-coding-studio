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

  it("グラデーション罫線は 1 ページ 2 本以内", () => {
    const { container } = render(<CoursesPage />)
    expect(
      container.querySelectorAll(".gg-rule-accent").length
    ).toBeLessThanOrEqual(2)
  })
})
