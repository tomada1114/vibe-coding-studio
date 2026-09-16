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

    expect(
      screen.getByRole("heading", { level: 1, name: "講座一覧" })
    ).toBeInTheDocument()
    expect(screen.getAllByRole("article")).toHaveLength(
      getAllUdemyCourses().length
    )
    expect(screen.getByText(getAllUdemyCourses()[0].title)).toBeInTheDocument()
  })
})
