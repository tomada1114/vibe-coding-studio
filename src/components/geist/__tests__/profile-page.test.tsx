import { ProfilePage } from "@/components/geist/profile-page"
import { getDictionary } from "@/i18n/dictionaries"
import { render, screen } from "@testing-library/react"

describe("ProfilePage course routing", () => {
  it("講座数と講座導線を新しいコース一覧に合わせる", () => {
    render(<ProfilePage locale="ja" dict={getDictionary("ja")} />)

    expect(screen.getByText("16")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Udemy講座" })).toHaveAttribute(
      "href",
      "/courses"
    )
    expect(
      screen.getByRole("link", { name: "コース一覧を見る" })
    ).toHaveAttribute("href", "/courses")
    expect(screen.getByRole("link", { name: "Udemy" })).toHaveAttribute(
      "href",
      "/courses"
    )
  })
})
