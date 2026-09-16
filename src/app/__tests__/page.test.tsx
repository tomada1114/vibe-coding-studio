/**
 * トップページ（個人プロフィール / Geist Grid）のテスト
 *
 * ヘッダー・フッターはルートレイアウトが描画するため、ここでは検証しない。
 * それぞれ src/components/geist/__tests__/ を参照。
 */

import EnglishHome from "@/app/en/page"
import Home from "@/app/page"
import { book } from "@/data/book"
import { getDictionary } from "@/i18n/dictionaries"
import { render, screen, within } from "@testing-library/react"

jest.mock("next/navigation", () => ({
  usePathname: () => "/",
}))

const ja = getDictionary("ja")
const en = getDictionary("en")

describe("トップページ（/）", () => {
  describe("ヒーロー", () => {
    it("氏名が h1 で表示される", () => {
      render(<Home />)
      expect(
        screen.getByRole("heading", { level: 1, name: ja.hero.name })
      ).toBeInTheDocument()
    })

    it("戸籍名・ローマ字表記が表示される", () => {
      render(<Home />)
      expect(screen.getByText(ja.hero.legalName)).toBeInTheDocument()
    })

    it("肩書が表示される", () => {
      render(<Home />)
      expect(screen.getByText(ja.hero.role)).toBeInTheDocument()
    })

    it("プロフィール画像が alt 付きで表示される", () => {
      render(<Home />)
      expect(screen.getByAltText(ja.hero.photoAlt)).toBeInTheDocument()
    })
  })

  describe("著書セクション", () => {
    it("書名が正式表記で表示される", () => {
      render(<Home />)
      expect(screen.getByText(book.title)).toBeInTheDocument()
    })

    it("書影が alt 付きで表示される", () => {
      render(<Home />)
      expect(screen.getByAltText(book.cover.alt)).toBeInTheDocument()
    })

    it("Amazon の購入導線が新規タブで開く", () => {
      render(<Home />)
      const links = screen
        .getAllByRole("link")
        .filter(link => link.getAttribute("href") === book.amazonUrl)
      expect(links.length).toBeGreaterThan(0)
      links.forEach(link => {
        expect(link).toHaveAttribute("target", "_blank")
        expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"))
      })
    })

    it("ISBN・価格・発売日が表示される", () => {
      render(<Home />)
      expect(screen.getByText(book.isbn)).toBeInTheDocument()
      expect(screen.getByText(book.price)).toBeInTheDocument()
      expect(screen.getByText(book.releaseDateLabel)).toBeInTheDocument()
    })
  })

  describe("経歴セクション", () => {
    it("全ての経歴エントリが表示される", () => {
      render(<Home />)
      ja.career.entries.forEach(entry => {
        expect(screen.getByText(entry.title)).toBeInTheDocument()
      })
    })
  })

  describe("資格・登壇セクション", () => {
    it("全ての取得資格が表示される", () => {
      render(<Home />)
      ja.credentials.certifications.forEach(item => {
        expect(screen.getByText(item)).toBeInTheDocument()
      })
    })

    it("登壇実績が表示される", () => {
      render(<Home />)
      expect(screen.getByText(ja.credentials.speakingTitle)).toBeInTheDocument()
    })
  })

  describe("数値セル", () => {
    it("開始年が表示される", () => {
      render(<Home />)
      // 同じ年は経歴セクションにも出るため、少なくとも 1 箇所あればよい
      expect(screen.getAllByText(ja.stats.sinceValue).length).toBeGreaterThan(0)
    })

    it("Udemy 受講者数が表示される", () => {
      render(<Home />)
      expect(screen.getByText(ja.stats.studentsValue)).toBeInTheDocument()
    })
  })

  describe("構造化データ", () => {
    it("Person と Book の JSON-LD が出力される", () => {
      const { container } = render(<Home />)
      const script = container.querySelector(
        'script[type="application/ld+json"]'
      )
      expect(script).toBeInTheDocument()

      const data = JSON.parse(script?.innerHTML ?? "{}")
      const types = data["@graph"].map(
        (node: { "@type": string }) => node["@type"]
      )
      expect(types).toContain("Person")
      expect(types).toContain("Book")
    })
  })

  describe("ページメタデータ", () => {
    it("metadata がエクスポートされ、hreflang の代替 URL を持つ", async () => {
      const pageModule = await import("@/app/page")
      expect(pageModule.metadata).toBeDefined()
      expect(pageModule.metadata.alternates?.languages).toMatchObject({
        ja: expect.any(String),
        en: expect.any(String),
      })
    })
  })

  describe("メインコンテンツ", () => {
    it("スキップリンクの着地点となる main がある", () => {
      const { container } = render(<Home />)
      const main = container.querySelector("main#main-content")
      expect(main).toBeInTheDocument()
    })
  })

  describe("Geist Grid の規則", () => {
    it("生の hex カラーや gray-* のクラスを使っていない", () => {
      const { container } = render(<Home />)
      const classNames = Array.from(container.querySelectorAll("*"))
        .map(el => el.getAttribute("class") ?? "")
        .join(" ")

      expect(classNames).not.toMatch(/\b(?:bg|text|border)-gray-\d/)
      // 色の dark: 上書きは禁止。トークンで表現できない構造的な出し分け（アイコンの
      // 表示切替など）だけが SKILL.md の定める例外として許される。
      expect(classNames).not.toMatch(/dark:(?:bg|text|border)-/)
      expect(classNames).not.toMatch(/\[#[0-9a-fA-F]{3,8}\]/)
    })

    it("セルグリッドで罫線を描いている", () => {
      const { container } = render(<Home />)
      expect(
        container.querySelectorAll(".gg-cell-grid").length
      ).toBeGreaterThan(0)
      expect(container.querySelectorAll(".gg-cell").length).toBeGreaterThan(0)
    })

    it("グローは 1 ページ 2 個以内", () => {
      const { container } = render(<Home />)
      expect(container.querySelectorAll(".gg-glow").length).toBeLessThanOrEqual(
        2
      )
    })

    it("グラデーション罫線は 1 ページ 2 本以内", () => {
      const { container } = render(<Home />)
      expect(
        container.querySelectorAll(".gg-rule-accent").length
      ).toBeLessThanOrEqual(2)
    })
  })
})

describe("トップページ（/en）", () => {
  it("英語の氏名が h1 で表示される", () => {
    render(<EnglishHome />)
    expect(
      screen.getByRole("heading", { level: 1, name: en.hero.name })
    ).toBeInTheDocument()
  })

  it("経歴が英語で表示される", () => {
    const { container } = render(<EnglishHome />)
    en.career.entries.forEach(entry => {
      expect(within(container).getByText(entry.title)).toBeInTheDocument()
    })
  })

  it("書誌情報は言語によらず同じ値を出す", () => {
    render(<EnglishHome />)
    expect(screen.getByText(book.isbn)).toBeInTheDocument()
    expect(screen.getByText(book.title)).toBeInTheDocument()
  })

  it("metadata の canonical が /en を指す", async () => {
    const pageModule = await import("@/app/en/page")
    expect(String(pageModule.metadata.alternates?.canonical)).toMatch(/\/en$/)
  })
})
