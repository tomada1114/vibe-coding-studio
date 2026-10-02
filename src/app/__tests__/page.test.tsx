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

  describe("ヒーローの現地時刻", () => {
    it("拠点の場所ラベルを表示する", () => {
      render(<Home />)
      expect(screen.getByText(ja.hero.localTime.location)).toBeInTheDocument()
    })
  })

  describe("経歴セクション", () => {
    // 全文は /career に分割した。トップには直近 3 件だけを置く。
    const recent = ja.career.entries.slice(-3)
    const older = ja.career.entries.slice(0, -3)

    it("直近 3 件の経歴だけを表示する", () => {
      render(<Home />)
      recent.forEach(entry => {
        expect(screen.getByText(entry.title)).toBeInTheDocument()
      })
      older.forEach(entry => {
        expect(screen.queryByText(entry.title)).not.toBeInTheDocument()
      })
    })

    it("経歴ページ全体へのリンクがある", () => {
      render(<Home />)
      expect(
        screen.getByRole("link", { name: ja.career.viewAll })
      ).toHaveAttribute("href", "/career")
    })
  })

  describe("ページ内目次", () => {
    it("目次の各リンクがページ内に実在するセクションを指す", () => {
      const { container } = render(<Home />)
      const nav = screen.getByRole("navigation", { name: ja.toc.label })
      const links = within(nav).getAllByRole("link")

      expect(links.length).toBeGreaterThan(0)
      links.forEach(link => {
        const id = link.getAttribute("href")!.replace(/^#/, "")
        expect(container.querySelector(`section#${id}`)).toBeInTheDocument()
      })
    })
  })

  describe("技術スタックセクション", () => {
    it("全てのグループの見出しとタグが表示される", () => {
      render(<Home />)
      const section = screen
        .getByRole("heading", { level: 2, name: ja.stack.heading })
        .closest("section")
      expect(section).not.toBeNull()

      ja.stack.groups.forEach(group => {
        expect(within(section!).getByText(group.title)).toBeInTheDocument()
        group.items.forEach(item => {
          expect(within(section!).getByText(item)).toBeInTheDocument()
        })
      })
    })

    it("すべてのタグにアイコン（ロゴかモノグラム）が付く", () => {
      render(<Home />)
      const section = screen
        .getByRole("heading", { level: 2, name: ja.stack.heading })
        .closest("section")!

      const tags = within(section).getAllByRole("listitem")
      expect(tags.length).toBe(
        ja.stack.groups.reduce((sum, group) => sum + group.items.length, 0)
      )
      tags.forEach(tag => {
        expect(tag.querySelector('[aria-hidden="true"]')).not.toBeNull()
      })
    })

    it("グループのラベルは Mono ラベルに載せるため英数字のみで書かれている", () => {
      ja.stack.groups.forEach(group => {
        expect(group.label).toMatch(/^[\x20-\x7e]+$/)
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
    it("ページルートに gg-surface を持つ", () => {
      const { container } = render(<Home />)
      const pageRoot = Array.from(container.children).find(element =>
        element.classList.contains("gg-surface")
      )
      expect(pageRoot).toBeDefined()
    })

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

    it("すべてのセルグリッドが罫線スポットライトに参加している", () => {
      const { container } = render(<Home />)
      const grids = Array.from(container.querySelectorAll(".gg-cell-grid"))

      expect(grids.length).toBeGreaterThan(0)
      grids.forEach(grid => {
        expect(grid).toHaveClass("gg-spotlight")
        expect(grid).toHaveAttribute("data-spotlight")
      })
    })

    it("動きで内容を隠さない（初期状態で透明・非表示のクラスを持たない）", () => {
      const { container } = render(<Home />)
      const classNames = Array.from(container.querySelectorAll("*"))
        .map(el => el.getAttribute("class") ?? "")
        .join(" ")

      expect(classNames).not.toMatch(/(?:^|\s)(?:opacity-0|invisible)(?:\s|$)/)
    })

    it("グローは 1 ページ 2 個以内", () => {
      const { container } = render(<Home />)
      expect(container.querySelectorAll(".gg-glow").length).toBeLessThanOrEqual(
        2
      )
    })

    it("方眼の浮かび上がりはヒーローの faint grid に重ねる 1 箇所だけ", () => {
      const { container } = render(<Home />)
      const spots = container.querySelectorAll(".gg-grid-spot")

      expect(spots.length).toBe(1)
      expect(
        spots[0].parentElement?.querySelector(".gg-grid-field")
      ).not.toBeNull()
    })

    it("グラデーション罫線は 1 ページ 2 本以内", () => {
      const { container } = render(<Home />)
      expect(
        container.querySelectorAll(".gg-rule-accent").length
      ).toBeLessThanOrEqual(2)
    })

    it("外部リンクの ↗ が AA を満たす text-secondary を使っている", () => {
      const { container } = render(<Home />)
      const arrows = Array.from(
        container.querySelectorAll('[aria-hidden="true"]')
      ).filter(el => el.textContent === "↗")

      expect(arrows.length).toBeGreaterThan(0)
      arrows.forEach(arrow => {
        // text-muted は light テーマで 4.12:1 しか出ず AA (4.5:1) を満たさない。
        expect(arrow).toHaveClass("text-text-secondary")
        expect(arrow).not.toHaveClass("text-text-muted")
      })
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

  it("直近の経歴が英語で表示され、英語の経歴ページへリンクする", () => {
    const { container } = render(<EnglishHome />)
    en.career.entries.slice(-3).forEach(entry => {
      expect(within(container).getByText(entry.title)).toBeInTheDocument()
    })
    expect(
      screen.getByRole("link", { name: en.career.viewAll })
    ).toHaveAttribute("href", "/en/career")
  })

  it("技術スタックが英語で表示される", () => {
    render(<EnglishHome />)
    const section = screen
      .getByRole("heading", { level: 2, name: en.stack.heading })
      .closest("section")
    expect(section).not.toBeNull()

    en.stack.groups.forEach(group => {
      expect(within(section!).getByText(group.title)).toBeInTheDocument()
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
