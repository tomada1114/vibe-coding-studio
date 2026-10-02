/**
 * 経歴ページ（/career・/en/career）のテスト
 *
 * トップページから分割した経歴の全文を載せるページ。
 */

import CareerRoute, { metadata } from "@/app/career/page"
import EnglishCareer, {
  metadata as englishMetadata,
} from "@/app/en/career/page"
import Home from "@/app/page"
import { careerEntryId } from "@/components/geist/career-page"
import { getDictionary } from "@/i18n/dictionaries"
import { render, screen } from "@testing-library/react"

jest.mock("next/navigation", () => ({
  usePathname: () => "/career",
}))

const ja = getDictionary("ja")
const en = getDictionary("en")

describe("経歴ページ（/career）", () => {
  it("見出しが h1 で表示される", () => {
    render(<CareerRoute />)
    expect(
      screen.getByRole("heading", { level: 1, name: ja.career.heading })
    ).toBeInTheDocument()
  })

  it("すべての経歴エントリが見出しと本文つきで表示される", () => {
    render(<CareerRoute />)
    ja.career.entries.forEach(entry => {
      expect(
        screen.getByRole("heading", { level: 2, name: entry.title })
      ).toBeInTheDocument()
      expect(screen.getByText(entry.body)).toBeInTheDocument()
    })
  })

  it("プロフィール（トップ）へ戻る導線がある", () => {
    render(<CareerRoute />)
    expect(
      screen.getByRole("link", { name: ja.career.page.backToProfile })
    ).toHaveAttribute("href", "/")
  })

  it("トップページの経歴リンクはすべてこのページに実在するアンカーを指す", () => {
    const { container: careerPage, unmount } = render(<CareerRoute />)
    const anchors = new Set(
      Array.from(careerPage.querySelectorAll("[id]")).map(el => el.id)
    )
    unmount()

    const { container: home } = render(<Home />)
    const careerLinks = Array.from(
      home.querySelectorAll<HTMLAnchorElement>('a[href^="/career#"]')
    )
    expect(careerLinks.length).toBeGreaterThan(0)
    careerLinks.forEach(link => {
      const hash = link.getAttribute("href")!.split("#")[1]
      expect(anchors).toContain(hash)
    })
  })

  it("URL のハッシュが指すエントリに現在地の印を付ける（App Router の遷移では :target が更新されないため）", () => {
    const [first, second] = ja.career.entries.map(entry =>
      careerEntryId(entry.year)
    )
    window.history.replaceState(null, "", `/career#${first}`)

    render(<CareerRoute />)

    expect(document.getElementById(first)).toHaveAttribute("data-current")
    expect(document.getElementById(second)).not.toHaveAttribute("data-current")
    window.history.replaceState(null, "", "/")
  })

  it("metadata が hreflang の代替 URL と OG 画像を持つ", () => {
    expect(metadata.openGraph?.images).toBeDefined()
    expect(String(metadata.alternates?.canonical)).toMatch(/\/career$/)
    expect(metadata.alternates?.languages).toMatchObject({
      ja: expect.stringMatching(/\/career$/),
      en: expect.stringMatching(/\/en\/career$/),
    })
  })

  describe("Geist Grid の規則", () => {
    it("ページルートに gg-surface を持ち、セルグリッドで罫線を描く", () => {
      const { container } = render(<CareerRoute />)
      expect(
        Array.from(container.children).some(el =>
          el.classList.contains("gg-surface")
        )
      ).toBe(true)
      expect(container.querySelectorAll(".gg-cell").length).toBe(
        ja.career.entries.length
      )
    })

    it("生の hex カラーや gray-* のクラスを使っていない", () => {
      const { container } = render(<CareerRoute />)
      const classNames = Array.from(container.querySelectorAll("*"))
        .map(el => el.getAttribute("class") ?? "")
        .join(" ")

      expect(classNames).not.toMatch(/\b(?:bg|text|border)-gray-\d/)
      expect(classNames).not.toMatch(/dark:(?:bg|text|border)-/)
      expect(classNames).not.toMatch(/\[#[0-9a-fA-F]{3,8}\]/)
    })
  })
})

describe("経歴ページ（/en/career）", () => {
  it("英語の見出しとすべてのエントリを表示する", () => {
    render(<EnglishCareer />)
    expect(
      screen.getByRole("heading", { level: 1, name: en.career.heading })
    ).toBeInTheDocument()
    en.career.entries.forEach(entry => {
      expect(screen.getByText(entry.title)).toBeInTheDocument()
    })
  })

  it("英語トップへ戻る", () => {
    render(<EnglishCareer />)
    expect(
      screen.getByRole("link", { name: en.career.page.backToProfile })
    ).toHaveAttribute("href", "/en")
  })

  it("metadata の canonical が /en/career を指す", () => {
    expect(String(englishMetadata.alternates?.canonical)).toMatch(
      /\/en\/career$/
    )
  })
})
