import { CourseList } from "@/components/courses/course-list"
import { getAllUdemyCourses } from "@/data/udemy-courses"
import { render, screen } from "@testing-library/react"

describe("CourseList", () => {
  it("renders every Udemy course as an external link", () => {
    render(<CourseList courses={getAllUdemyCourses()} />)

    expect(screen.getAllByRole("article")).toHaveLength(16)

    for (const link of screen.getAllByRole("link")) {
      expect(link).toHaveAttribute("target", "_blank")
      expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"))
    }

    expect(
      screen.getByAltText(getAllUdemyCourses()[0].title)
    ).toBeInTheDocument()
    expect(screen.getAllByText("Claude Code").length).toBeGreaterThan(0)
    expect(screen.queryByText(/クーポン|割引|円/)).not.toBeInTheDocument()
  })

  it("renders no cards when the data source is empty", () => {
    render(<CourseList courses={[]} />)

    expect(screen.getByTestId("course-list")).toBeInTheDocument()
    expect(screen.queryAllByRole("article")).toHaveLength(0)
  })
})
