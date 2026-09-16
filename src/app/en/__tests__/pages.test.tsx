import EnglishCommunity, {
  metadata as communityMetadata,
} from "@/app/en/community/page"
import EnglishCourses, {
  metadata as coursesMetadata,
} from "@/app/en/courses/page"
import { getAllUdemyCourses } from "@/data/udemy-courses"
import { render, screen } from "@testing-library/react"

jest.mock("@/components/discord-member-count", () => ({
  DiscordMemberCount: () => null,
}))

describe("英語ページ", () => {
  it("講座一覧を英語のページシェルで公開する", () => {
    render(<EnglishCourses />)

    expect(
      screen.getByRole("heading", { level: 1, name: "Courses" })
    ).toBeInTheDocument()
    expect(document.querySelector('[data-locale="en"]')).toBeInTheDocument()
    expect(screen.getAllByRole("article")).toHaveLength(
      getAllUdemyCourses().length
    )
    expect(coursesMetadata.alternates).toMatchObject({
      canonical: "https://www.vibecodingstudio.dev/en/courses",
      languages: {
        ja: "https://www.vibecodingstudio.dev/courses",
        en: "https://www.vibecodingstudio.dev/en/courses",
      },
    })
  })

  it("コミュニティを英語の本文と導線で公開する", () => {
    const { container } = render(<EnglishCommunity />)

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Learn AI-driven development with peers who are building alongside you",
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole("heading", { name: "What you can do here" })
    ).toBeInTheDocument()
    expect(
      screen.getByRole("heading", { name: "Channel guide" })
    ).toBeInTheDocument()
    expect(screen.getAllByRole("link", { name: "Join Discord" })).toHaveLength(
      2
    )
    expect(container.textContent).not.toContain("コミュニティ")
    expect(communityMetadata.alternates).toMatchObject({
      canonical: "https://www.vibecodingstudio.dev/en/community",
      languages: {
        ja: "https://www.vibecodingstudio.dev/community",
        en: "https://www.vibecodingstudio.dev/en/community",
      },
    })
  })
})
