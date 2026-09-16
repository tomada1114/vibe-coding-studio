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
const removedPaths = [["/", "road", "map"].join(""), ["/", "videos"].join("")]

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
        screen.getByRole("link", { name: ja.nav.items.community })
      ).toBeInTheDocument()
      expect(
        screen.getByRole("link", { name: ja.nav.items.courses })
      ).toBeInTheDocument()
    })

    it("講座リンクが /courses を指す", () => {
      render(<Header />)
      expect(
        screen.getByRole("link", { name: ja.nav.items.courses })
      ).toHaveAttribute("href", "/courses")
    })

    it("現在地のリンクに aria-current が付く", () => {
      mockPathname = "/courses"
      render(<Header />)
      const link = screen.getByRole("link", { name: ja.nav.items.courses })
      expect(link).toHaveAttribute("aria-current", "page")
    })

    it("/en では英語のナビ項目になる", () => {
      mockPathname = "/en"
      render(<Header />)
      expect(
        screen.getByRole("link", { name: en.nav.items.community })
      ).toBeInTheDocument()
    })

    it("/en/courses では英語の講座リンクが現在地になる", () => {
      mockPathname = "/en/courses"
      render(<Header />)
      const link = screen.getByRole("link", { name: en.nav.items.courses })
      expect(link).toHaveAttribute("href", "/en/courses")
      expect(link).toHaveAttribute("aria-current", "page")
    })

    it("廃止済みの旧リンクを表示しない", () => {
      render(<Header />)
      expect(
        screen
          .getAllByRole("link")
          .some(link => removedPaths.includes(link.getAttribute("href") ?? ""))
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
      mockPathname = "/legacy"
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

    it("<head> の同期スクリプトが light を確定させていれば aria-pressed が false で描画される", () => {
      // <head> の THEME_INIT_SCRIPT がハイドレーション前に data-theme を確定させる状況を再現する。
      document.documentElement.setAttribute("data-theme", "light")
      render(<Header />)

      expect(screen.getByRole("button", { pressed: false })).toBeInTheDocument()
    })

    it("アイコンは state ではなく dark: バリアントで出し分けている（初回ペイントのチラつき防止）", () => {
      render(<Header />)
      const button = screen.getByRole("button", { pressed: true })
      const icons = Array.from(button.querySelectorAll("span[aria-hidden]"))

      expect(icons).toHaveLength(2)
      // 両方のアイコンが state による条件レンダリングなしで常に DOM に存在し、
      // <html data-theme> にひもづく CSS だけで表示が切り替わる。
      expect(icons[0]).toHaveClass("dark:hidden")
      expect(icons[1]).toHaveClass("hidden", "dark:inline")
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
      // 色の dark: 上書きは禁止。トークンで表現できない構造的な出し分け（テーマトグルの
      // アイコン表示切替など）だけが SKILL.md の定める例外として許される。
      expect(classNames).not.toMatch(/dark:(?:bg|text|border)-/)
    })
  })
})
