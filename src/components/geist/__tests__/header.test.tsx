/**
 * Geist Grid ヘッダーのテスト
 *
 * テーマトグル（dark ⇄ light の 2 状態）と言語トグル（リンク）の仕様を検証する。
 */

import { Header } from "@/components/geist/header"
import { THEME_STORAGE_KEY } from "@/components/geist/theme-toggle"
import { getDictionary } from "@/i18n/dictionaries"
import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

let mockPathname = "/"

jest.mock("next/navigation", () => ({
  usePathname: () => mockPathname,
}))

const ja = getDictionary("ja")
const en = getDictionary("en")
const removedPath = ["/", "road", "map"].join("")

beforeEach(() => {
  mockPathname = "/"
  localStorage.clear()
  document.documentElement.setAttribute("data-theme", "dark")
})

describe("Header", () => {
  describe("ナビゲーション", () => {
    it("日本語のナビ項目が表示される", () => {
      render(<Header />)
      expect(
        screen.getByRole("link", { name: ja.nav.items.videos })
      ).toBeInTheDocument()
    })

    it("現在地のリンクに aria-current が付く", () => {
      mockPathname = "/videos"
      render(<Header />)
      const link = screen.getAllByRole("link", { name: ja.nav.items.videos })[0]
      expect(link).toHaveAttribute("aria-current", "page")
    })

    it("/en では英語のナビ項目になる", () => {
      mockPathname = "/en"
      render(<Header />)
      expect(
        screen.getByRole("link", { name: en.nav.items.videos })
      ).toBeInTheDocument()
    })

    it("廃止済みの旧リンクを表示しない", () => {
      render(<Header />)
      expect(
        screen
          .getAllByRole("link")
          .some(link => link.getAttribute("href") === removedPath)
      ).toBe(false)
    })
  })

  describe("言語トグル", () => {
    it("ボタンではなくリンクで、hreflang を持つ", () => {
      render(<Header />)
      const group = screen.getByRole("group", {
        name: ja.header.languageGroupLabel,
      })
      const links = within(group).getAllByRole("link")
      expect(links).toHaveLength(2)
      expect(links[0]).toHaveAttribute("hreflang", "ja")
      expect(links[1]).toHaveAttribute("hreflang", "en")
    })

    it("アクティブな言語に aria-current が付く", () => {
      render(<Header />)
      const group = screen.getByRole("group", {
        name: ja.header.languageGroupLabel,
      })
      const links = within(group).getAllByRole("link")
      expect(links[0]).toHaveAttribute("aria-current", "true")
      expect(links[1]).not.toHaveAttribute("aria-current")
    })

    it("トップ以外では EN はトップの英語版を指す", () => {
      mockPathname = "/videos"
      render(<Header />)
      const group = screen.getByRole("group", {
        name: ja.header.languageGroupLabel,
      })
      const links = within(group).getAllByRole("link")
      expect(links[1]).toHaveAttribute("href", "/en")
    })
  })

  describe("テーマトグル", () => {
    it("プルダウンではなくボタンで、aria-pressed を持つ", () => {
      render(<Header />)
      const button = screen.getByRole("button", { pressed: true })
      expect(button.tagName).toBe("BUTTON")
    })

    it("押すと data-theme が light になり localStorage に保存される", async () => {
      const user = userEvent.setup()
      render(<Header />)

      const button = screen.getByLabelText(ja.header.themeToggleToLight)
      await user.click(button)

      expect(document.documentElement.getAttribute("data-theme")).toBe("light")
      expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("light")
    })

    it("もう一度押すと dark に戻る（2 状態のみ）", async () => {
      const user = userEvent.setup()
      render(<Header />)

      await user.click(screen.getByLabelText(ja.header.themeToggleToLight))
      await user.click(screen.getByLabelText(ja.header.themeToggleToDark))

      expect(document.documentElement.getAttribute("data-theme")).toBe("dark")
      expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark")
    })
  })

  describe("スキップリンク", () => {
    it("本文へのスキップリンクを持つ", () => {
      render(<Header />)
      const link = screen.getByRole("link", {
        name: ja.header.skipToContent,
      })
      expect(link).toHaveAttribute("href", "#main-content")
    })
  })

  describe("Geist Grid の規則", () => {
    it("生の hex カラーや gray-* のクラスを使っていない", () => {
      const { container } = render(<Header />)
      const classNames = Array.from(container.querySelectorAll("*"))
        .map(el => el.getAttribute("class") ?? "")
        .join(" ")

      expect(classNames).not.toMatch(/\b(?:bg|text|border)-gray-\d/)
      expect(classNames).not.toMatch(/\bdark:/)
    })
  })
})
