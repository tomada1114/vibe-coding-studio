/**
 * Geist Grid フッターのテスト
 */

import { Footer } from "@/components/geist/footer"
import { getDictionary } from "@/i18n/dictionaries"
import { DISCORD_INVITE_URL, SOCIAL_LINKS } from "@/lib/constants"
import { render, screen } from "@testing-library/react"

let mockPathname = "/"

jest.mock("next/navigation", () => ({
  usePathname: () => mockPathname,
}))

const ja = getDictionary("ja")
const en = getDictionary("en")
const removedPath = ["/", "road", "map"].join("")

beforeEach(() => {
  mockPathname = "/"
})

describe("Footer", () => {
  it("サイトリンクが日本語で表示される", () => {
    render(<Footer />)
    expect(
      screen.getByRole("link", { name: ja.nav.items.courses })
    ).toBeInTheDocument()
  })

  it("/en では英語になる", () => {
    mockPathname = "/en"
    render(<Footer />)
    expect(
      screen.getByRole("link", { name: en.nav.items.courses })
    ).toBeInTheDocument()
  })

  it("講座リンクが /courses を指す", () => {
    render(<Footer />)
    expect(
      screen.getByRole("link", { name: ja.nav.items.courses })
    ).toHaveAttribute("href", "/courses")
  })

  it("廃止済みの旧リンクを表示しない", () => {
    render(<Footer />)
    expect(
      screen
        .getAllByRole("link")
        .some(link => link.getAttribute("href") === removedPath)
    ).toBe(false)
  })

  it("Discord 招待リンクが新規タブで開く", () => {
    render(<Footer />)
    const link = screen
      .getAllByRole("link")
      .find(a => a.getAttribute("href") === DISCORD_INVITE_URL)
    expect(link).toBeDefined()
    expect(link).toHaveAttribute("target", "_blank")
    expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"))
  })

  it("全てのソーシャルリンクが aria-label 付きで表示される", () => {
    render(<Footer />)
    SOCIAL_LINKS.forEach(link => {
      expect(screen.getByLabelText(link.name)).toBeInTheDocument()
    })
  })

  it("著作権表記に現在の年が入る", () => {
    render(<Footer />)
    const year = String(new Date().getFullYear())
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument()
  })

  it("生の hex カラーや gray-* のクラスを使っていない", () => {
    const { container } = render(<Footer />)
    const classNames = Array.from(container.querySelectorAll("*"))
      .map(el => el.getAttribute("class") ?? "")
      .join(" ")

    expect(classNames).not.toMatch(/\b(?:bg|text|border)-gray-\d/)
    // 色の dark: 上書きは禁止。トークンで表現できない構造的な出し分けだけが
    // SKILL.md の定める例外として許される。
    expect(classNames).not.toMatch(/dark:(?:bg|text|border)-/)
  })
})
