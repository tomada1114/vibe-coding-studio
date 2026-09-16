import { CourseList } from "@/components/courses/course-list"
import { getAllUdemyCourses } from "@/data/udemy-courses"
import { UDEMY_COURSE_TOPICS } from "@/data/udemy-courses/topics"
import { render, screen, within } from "@testing-library/react"

describe("CourseList", () => {
  it("renders every Udemy course as an external link", () => {
    const courses = getAllUdemyCourses()
    const topicNames = new Map(
      UDEMY_COURSE_TOPICS.map(topic => [topic.slug, topic.name])
    )

    render(<CourseList courses={courses} />)

    const list = screen.getByTestId("course-list")
    const cards = screen.getAllByRole("article")
    expect(cards).toHaveLength(courses.length)
    expect(list).toHaveClass("gg-cell-grid")

    cards.forEach((card, index) => {
      const course = courses[index]
      const link = within(card).getByRole("link")

      expect(card).toHaveClass("gg-cell")
      expect(link).toHaveAttribute("href", course.url)
      expect(link).toHaveAttribute("target", "_blank")
      expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"))
      expect(link).toHaveAttribute("rel", expect.stringContaining("noreferrer"))
      expect(within(card).getByRole("img")).toHaveAttribute("alt", course.title)
      expect(
        within(card).getByRole("heading", { level: 2, name: course.title })
      ).toBeInTheDocument()
      expect(within(card).getByText(course.description)).toBeInTheDocument()
      expect(within(card).getByText("↗")).toHaveAttribute(
        "aria-hidden",
        "true"
      )

      course.topics.forEach(topic => {
        expect(
          within(card).getByText(topicNames.get(topic) ?? topic)
        ).toBeInTheDocument()
      })
    })

    expect(screen.queryByText(/割引|円/)).not.toBeInTheDocument()
  })

  it("renders no cards when the data source is empty", () => {
    render(<CourseList courses={[]} />)

    expect(screen.getByTestId("course-list")).toBeInTheDocument()
    expect(screen.queryAllByRole("article")).toHaveLength(0)
  })
})
