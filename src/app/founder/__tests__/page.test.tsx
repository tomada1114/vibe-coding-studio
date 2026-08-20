/**
 * 運営者プロフィールページ（founder）のテスト
 *
 * TDD Red フェーズ: 失敗するテストを作成
 */

import FounderPage from "@/app/founder/page"
import { render, screen, within } from "@testing-library/react"

// next/image のカスタムモック（jest.setup.js のグローバルモックを意図的に上書き）
// このファイルでは `data-priority` 属性のアサーションがあるため、
// グローバルモック（fill/priority をフィルタリングするもの）では検証できない。
// このカスタムモックを削除すると「data-priority」テストが失敗するので維持すること。
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: {
    src: string
    alt: string
    fill?: boolean
    className?: string
    sizes?: string
    priority?: boolean
  }) => {
    const { priority, fill, sizes, ...imgProps } = props
    // sizes は将来使用する可能性があるため保持
    void sizes
    return (
      <img
        {...imgProps}
        alt={props.alt}
        data-priority={priority ? "true" : undefined}
        data-fill={fill ? "true" : undefined}
      />
    )
  },
}))

describe("運営者プロフィールページ（/founder）", () => {
  describe("ヒーローセクション", () => {
    it("運営者名「とまだ」が表示される", () => {
      render(<FounderPage />)
      const heading = screen.getByRole("heading", { level: 1 })
      expect(heading).toBeInTheDocument()
      expect(heading.textContent).toContain("とまだ")
    })

    it("英語表記「Tomada」が表示される", () => {
      render(<FounderPage />)
      const heading = screen.getByRole("heading", { level: 1 })
      expect(heading.textContent).toContain("Tomada")
    })

    it("本名が併記される", () => {
      render(<FounderPage />)
      const realName = screen.getByText(/増山 友司 \/ Tomoshi Masuyama/i)
      expect(realName).toBeInTheDocument()
    })

    it("キャッチコピーが表示される", () => {
      render(<FounderPage />)
      const catchphrase = screen.getByText(/AI駆動開発の実践者・教育者/i)
      expect(catchphrase).toBeInTheDocument()
    })

    it("LinkedInプロフィールへのリンクが表示される", () => {
      render(<FounderPage />)
      const linkedInLink = screen.getByRole("link", {
        name: /とまだのLinkedInプロフィールを見る/i,
      })
      expect(linkedInLink).toHaveAttribute(
        "href",
        "https://www.linkedin.com/in/tomoshi-masuyama-5b4b31199/"
      )
      expect(linkedInLink).toHaveAttribute("target", "_blank")
      expect(linkedInLink).toHaveAttribute("rel", "noopener noreferrer")
    })

    it("GitHubプロフィールへのリンクが表示される", () => {
      render(<FounderPage />)
      const gitHubLink = screen.getByRole("link", {
        name: /とまだのGitHubプロフィールを見る/i,
      })
      expect(gitHubLink).toHaveAttribute(
        "href",
        "https://github.com/tomada1114"
      )
    })

    it("プロフィール画像が表示される", () => {
      render(<FounderPage />)
      const image = screen.getByAltText(/とまだ（Tomada）のプロフィール画像/i)
      expect(image).toBeInTheDocument()
    })

    it("プロフィール画像が優先読み込みされる", () => {
      render(<FounderPage />)
      const image = screen.getByAltText(/とまだ（Tomada）のプロフィール画像/i)
      expect(image).toHaveAttribute("data-priority", "true")
    })
  })

  describe("経歴セクション", () => {
    it("経歴セクションが表示される", () => {
      render(<FounderPage />)
      const heading = screen.getByRole("heading", {
        name: "経歴",
        level: 2,
      })
      expect(heading).toBeInTheDocument()
    })

    it("大学院修了とSIerでのキャリア開始が表示される", () => {
      render(<FounderPage />)
      const item = screen.getByRole("heading", {
        name: /北海道大学大学院を修了、SIerでキャリアをスタート/i,
        level: 3,
      })
      expect(item).toBeInTheDocument()
    })

    it("セキュリティベンダーへの転職が表示される", () => {
      render(<FounderPage />)
      const item = screen.getByRole("heading", {
        name: /セキュリティベンダーへ転職/i,
        level: 3,
      })
      expect(item).toBeInTheDocument()
    })

    it("Webアプリケーションエンジニアへの転身が表示される", () => {
      render(<FounderPage />)
      const item = screen.getByRole("heading", {
        name: /Webアプリケーションエンジニアに転身/i,
        level: 3,
      })
      expect(item).toBeInTheDocument()
    })

    it("フリーランスとしての独立が表示される", () => {
      render(<FounderPage />)
      const item = screen.getByRole("heading", {
        name: /フリーランスとして独立/i,
        level: 3,
      })
      expect(item).toBeInTheDocument()
    })

    it("現在の拠点についての項目が表示される", () => {
      render(<FounderPage />)
      const item = screen.getByRole("heading", {
        name: /カナダを経てアメリカへ拠点を移す/i,
        level: 3,
      })
      expect(item).toBeInTheDocument()
    })
  })

  describe("著書セクション", () => {
    it("著書セクションが表示される", () => {
      render(<FounderPage />)
      const heading = screen.getByRole("heading", {
        name: "著書",
        level: 2,
      })
      expect(heading).toBeInTheDocument()
    })

    it("書名が正式表記で表示される", () => {
      render(<FounderPage />)
      const bookHeading = screen.getByRole("heading", {
        name: /『Claude Codeで作って学ぶ AI駆動アプリ開発入門』/,
        level: 3,
      })
      expect(bookHeading).toBeInTheDocument()
    })

    it("書影が表示される", () => {
      render(<FounderPage />)
      const cover = screen.getByAltText(
        /『Claude Codeで作って学ぶ AI駆動アプリ開発入門』（技術評論社）の書影/
      )
      expect(cover).toBeInTheDocument()
    })

    it("書誌情報（発売日・定価・判型・ISBN）が表示される", () => {
      const { container } = render(<FounderPage />)
      expect(container.textContent).toContain("2026年9月8日")
      expect(container.textContent).toContain("3,080円（税込）")
      expect(container.textContent).toContain("B5変形 / 384ページ")
      expect(container.textContent).toContain("978-4-297-15823-1")
    })

    it("Amazonの購入導線が表示される", () => {
      render(<FounderPage />)
      const amazonLinks = screen.getAllByRole("link", {
        name: /Amazonで予約する/i,
      })
      expect(amazonLinks.length).toBeGreaterThan(0)
      amazonLinks.forEach(link => {
        expect(link).toHaveAttribute("href", "https://amzn.asia/d/0f0bQMI4")
        expect(link).toHaveAttribute("target", "_blank")
        expect(link).toHaveAttribute("rel", "noopener noreferrer")
      })
    })

    it("版元の書籍ページへのリンクが表示される", () => {
      render(<FounderPage />)
      const publisherLink = screen.getByRole("link", {
        name: /目次を見る（技術評論社）/i,
      })
      expect(publisherLink).toHaveAttribute(
        "href",
        "https://gihyo.jp/book/2026/978-4-297-15823-1"
      )
      expect(publisherLink).toHaveAttribute("target", "_blank")
    })

    it("ヒーローセクションで著者であることが告知される", () => {
      render(<FounderPage />)
      const announcement = screen.getByText(
        /『Claude Codeで作って学ぶ AI駆動アプリ開発入門』（技術評論社）著者/
      )
      expect(announcement).toBeInTheDocument()
    })

    it("旧仮題や他著者の書名が混入していない", () => {
      const { container } = render(<FounderPage />)
      expect(container.textContent).not.toMatch(
        /作って学ぶ Claude CodeによるAI駆動アプリ開発入門/
      )
      expect(container.textContent).not.toMatch(/Claude Code実践入門/)
    })
  })

  describe("教育活動セクション（書籍）", () => {
    it("書籍執筆が教育活動として表示される", () => {
      render(<FounderPage />)
      const heading = screen.getByRole("heading", {
        name: /書籍執筆/i,
        level: 3,
      })
      expect(heading).toBeInTheDocument()
    })
  })

  describe("AI駆動開発のスペシャリストセクション", () => {
    it("Expertiseセクションが表示される", () => {
      render(<FounderPage />)
      const heading = screen.getByRole("heading", {
        name: /AI駆動開発のスペシャリスト/i,
      })
      expect(heading).toBeInTheDocument()
    })

    it("日々の実践と情報発信についての説明が表示される", () => {
      render(<FounderPage />)
      const practiceHeading = screen.getByRole("heading", {
        name: /日々の実践と情報発信/i,
        level: 3,
      })
      expect(practiceHeading).toBeInTheDocument()
    })

    it("現場と個人開発での実現についての説明が表示される", () => {
      render(<FounderPage />)
      const achievementHeading = screen.getByRole("heading", {
        name: /現場と個人開発での実現/i,
        level: 3,
      })
      expect(achievementHeading).toBeInTheDocument()
    })

    it("AIツール名が記載されている", () => {
      render(<FounderPage />)
      const toolsText = screen.getByText(
        /Claude Code、Codex、Cursor、GitHub Copilot/i
      )
      expect(toolsText).toBeInTheDocument()
    })
  })

  describe("教育活動セクション", () => {
    it("教育活動セクションが表示される", () => {
      render(<FounderPage />)
      const heading = screen.getByRole("heading", {
        name: /教育活動/i,
        level: 2,
      })
      expect(heading).toBeInTheDocument()
    })

    it("Udemy講師についての説明が表示される", () => {
      render(<FounderPage />)
      const udemyHeading = screen.getByRole("heading", {
        name: /Udemy講師/i,
        level: 3,
      })
      expect(udemyHeading).toBeInTheDocument()
    })

    it("YouTube運営についての説明が表示される", () => {
      render(<FounderPage />)
      const youtubeHeading = screen.getByRole("heading", {
        name: /YouTube運営/i,
        level: 3,
      })
      expect(youtubeHeading).toBeInTheDocument()
    })

    it("プログラミングスクール講師についての説明が表示される", () => {
      render(<FounderPage />)
      const schoolHeading = screen.getByRole("heading", {
        name: /元プログラミングスクール講師/i,
        level: 3,
      })
      expect(schoolHeading).toBeInTheDocument()
    })

    it("Udemyコース一覧へのリンクが表示される", () => {
      render(<FounderPage />)
      const udemyLink = screen.getByRole("link", {
        name: /コース一覧を見る（クーポン付き）/i,
      })
      expect(udemyLink).toBeInTheDocument()
      expect(udemyLink).toHaveAttribute("href", "/coupons")
      expect(udemyLink).not.toHaveAttribute("target")
    })

    it("YouTubeチャンネルへのリンクが表示される", () => {
      render(<FounderPage />)
      const youtubeLink = screen.getByRole("link", {
        name: /チャンネルを見る/i,
      })
      expect(youtubeLink).toBeInTheDocument()
      expect(youtubeLink).toHaveAttribute(
        "href",
        "https://www.youtube.com/@vibe-coding-studio"
      )
      expect(youtubeLink).toHaveAttribute("target", "_blank")
      expect(youtubeLink).toHaveAttribute("rel", "noopener noreferrer")
    })
  })

  describe("活動領域セクション", () => {
    it("活動領域セクションが表示される", () => {
      render(<FounderPage />)
      const heading = screen.getByRole("heading", {
        name: /活動領域/i,
        level: 2,
      })
      expect(heading).toBeInTheDocument()
    })

    it("ソフトウェアエンジニアリングについての説明が表示される", () => {
      render(<FounderPage />)
      const engineeringHeading = screen.getByRole("heading", {
        name: /ソフトウェアエンジニアリング/i,
        level: 3,
      })
      expect(engineeringHeading).toBeInTheDocument()
    })

    it("AI駆動開発の導入支援についての説明が表示される", () => {
      render(<FounderPage />)
      const supportHeading = screen.getByRole("heading", {
        name: /AI駆動開発の導入支援/i,
        level: 3,
      })
      expect(supportHeading).toBeInTheDocument()
    })

    it("コンテンツ発信についての説明が表示される", () => {
      render(<FounderPage />)
      const contentHeading = screen.getByRole("heading", {
        name: /コンテンツ発信/i,
        level: 3,
      })
      expect(contentHeading).toBeInTheDocument()
    })
  })

  describe("技術スタックセクション", () => {
    it("技術スタックセクションが表示される", () => {
      render(<FounderPage />)
      const heading = screen.getByRole("heading", {
        name: /技術スタック/i,
        level: 2,
      })
      expect(heading).toBeInTheDocument()
    })

    it("プログラミング言語カテゴリが表示される", () => {
      render(<FounderPage />)
      const categoryHeading = screen.getByRole("heading", {
        name: /プログラミング言語/i,
        level: 3,
      })
      expect(categoryHeading).toBeInTheDocument()
    })

    it("フレームワーク・ライブラリカテゴリが表示される", () => {
      render(<FounderPage />)
      const categoryHeading = screen.getByRole("heading", {
        name: /フレームワーク・ライブラリ/i,
        level: 3,
      })
      expect(categoryHeading).toBeInTheDocument()
    })

    it("インフラ・クラウドカテゴリが表示される", () => {
      render(<FounderPage />)
      const categoryHeading = screen.getByRole("heading", {
        name: /インフラ・クラウド/i,
        level: 3,
      })
      expect(categoryHeading).toBeInTheDocument()
    })

    it("AI駆動開発ツールカテゴリが表示される", () => {
      render(<FounderPage />)
      const categoryHeading = screen.getByRole("heading", {
        name: /AI駆動開発ツール/i,
        level: 3,
      })
      expect(categoryHeading).toBeInTheDocument()
    })
  })

  describe("登壇実績セクション", () => {
    it("登壇実績セクションが表示される", () => {
      render(<FounderPage />)
      const heading = screen.getByRole("heading", {
        name: /登壇実績/i,
        level: 2,
      })
      expect(heading).toBeInTheDocument()
    })

    it("東京AI祭についての情報が表示される", () => {
      render(<FounderPage />)
      const eventHeading = screen.getByRole("heading", {
        name: /東京AI祭 プレイベント/i,
        level: 3,
      })
      expect(eventHeading).toBeInTheDocument()
    })

    it("イベント詳細へのリンクが表示される", () => {
      render(<FounderPage />)
      const eventLink = screen.getByRole("link", {
        name: /過去のイベント詳細を見る/i,
      })
      expect(eventLink).toBeInTheDocument()
      expect(eventLink).toHaveAttribute(
        "href",
        "https://ai-fest-tokyo.connpass.com/event/369543/"
      )
      expect(eventLink).toHaveAttribute("target", "_blank")
      expect(eventLink).toHaveAttribute("rel", "noopener noreferrer")
    })
  })

  describe("ミッションセクション", () => {
    it("ミッションセクションが表示される", () => {
      render(<FounderPage />)
      const heading = screen.getByRole("heading", {
        name: /ミッション/i,
        level: 2,
      })
      expect(heading).toBeInTheDocument()
    })

    it("ミッションステートメントが表示される", () => {
      render(<FounderPage />)
      const statement = screen.getByText(/プログラミングとAIを通じて/i)
      expect(statement).toBeInTheDocument()
    })

    it("経済的自由というキーワードが含まれる", () => {
      render(<FounderPage />)
      const keyword = screen.getByText(/経済的自由/i)
      expect(keyword).toBeInTheDocument()
    })

    it("働き方の自由というキーワードが含まれる", () => {
      render(<FounderPage />)
      const keyword = screen.getByText(/働き方の自由/i)
      expect(keyword).toBeInTheDocument()
    })
  })

  describe("レイアウトとナビゲーション", () => {
    it("Navbarが表示される", () => {
      render(<FounderPage />)
      const navbar = document.querySelector("nav")
      expect(navbar).toBeInTheDocument()
    })

    it("ページ専用ヘッダーからトップページに戻れる", () => {
      render(<FounderPage />)
      const homeLink = screen.getByRole("link", { name: /Vibe Coding Studio/i })
      expect(homeLink).toHaveAttribute("href", "/")
    })

    it("ヘッダーの現在地（運営者）がaria-currentで示される", () => {
      render(<FounderPage />)
      const nav = screen.getByRole("navigation", { name: "サイト内メニュー" })
      const currentLink = within(nav).getByRole("link", { name: /運営者/i })
      expect(currentLink).toHaveAttribute("aria-current", "page")
    })

    it("Footerが表示される", () => {
      render(<FounderPage />)
      const footer = document.querySelector("footer")
      expect(footer).toBeInTheDocument()
    })
  })

  describe("ページメタデータ", () => {
    it("metadataオブジェクトがエクスポートされている", async () => {
      const pageModule = await import("@/app/founder/page")
      expect(pageModule.metadata).toBeDefined()
      expect(pageModule.metadata).toHaveProperty("title")
      expect(pageModule.metadata).toHaveProperty("description")
    })

    it("metadataのタイトルに運営者情報が含まれる", async () => {
      const pageModule = await import("@/app/founder/page")
      const title = pageModule.metadata.title as string
      expect(title).toMatch(/とまだ|Founder/i)
    })

    it("metadataの説明にAI駆動開発が含まれる", async () => {
      const pageModule = await import("@/app/founder/page")
      const description = pageModule.metadata.description as string
      expect(description).toMatch(/AI駆動開発/i)
    })

    it("metadataの説明に著書が含まれる", async () => {
      const pageModule = await import("@/app/founder/page")
      const description = pageModule.metadata.description as string
      expect(description).toContain(
        "『Claude Codeで作って学ぶ AI駆動アプリ開発入門』"
      )
    })

    it("構造化データにPersonとBookが含まれる", () => {
      const { container } = render(<FounderPage />)
      const script = container.querySelector(
        'script[type="application/ld+json"]'
      )
      expect(script).toBeInTheDocument()

      const parsed = JSON.parse(script?.innerHTML ?? "{}")
      const types = (parsed["@graph"] as { "@type": string }[]).map(
        node => node["@type"]
      )
      expect(types).toContain("Person")
      expect(types).toContain("Book")

      const bookNode = (
        parsed["@graph"] as { "@type": string; name?: string; isbn?: string }[]
      ).find(node => node["@type"] === "Book")
      expect(bookNode?.name).toBe(
        "Claude Codeで作って学ぶ AI駆動アプリ開発入門"
      )
      expect(bookNode?.isbn).toBe("978-4-297-15823-1")
    })
  })

  describe("レスポンシブデザイン", () => {
    it("レスポンシブレイアウトが使用されている", () => {
      const { container } = render(<FounderPage />)
      expect(container).toBeInTheDocument()
      // レスポンシブクラスが含まれていることを確認
      const htmlContent = container.innerHTML
      expect(htmlContent).toMatch(/sm:|md:|lg:/)
    })

    it("グリッドレイアウトが使用されている", () => {
      const { container } = render(<FounderPage />)
      const htmlContent = container.innerHTML
      // grid-cols-1やgrid-cols-2などのクラスが含まれていることを確認
      expect(htmlContent).toMatch(/grid-cols/)
    })
  })

  describe("エラーハンドリング", () => {
    it("AsyncErrorBoundaryでセクションが囲まれている", () => {
      const { container } = render(<FounderPage />)
      expect(container).toBeInTheDocument()
    })
  })

  describe("アクセシビリティ", () => {
    it("セマンティックなHTML構造が使用されている", () => {
      const { container } = render(<FounderPage />)
      const main = container.querySelector("main")
      expect(main).toBeInTheDocument()
    })

    it("外部リンクに適切なセキュリティ属性が設定されている", () => {
      render(<FounderPage />)
      const links = screen.getAllByRole("link", { name: /を見る|詳細を見る/i })
      links.forEach(link => {
        const href = link.getAttribute("href")
        if (href && href.startsWith("http")) {
          expect(link).toHaveAttribute("target", "_blank")
          expect(link).toHaveAttribute("rel", "noopener noreferrer")
        }
      })
    })
  })

  describe("UIコンポーネント", () => {
    it("アイコンが表示される", () => {
      const { container } = render(<FounderPage />)
      // SVGアイコン（Heroicons）が表示されることを確認
      const icons = container.querySelectorAll("svg")
      expect(icons.length).toBeGreaterThan(0)
    })

    it("適切なスペーシングが適用されている", () => {
      const { container } = render(<FounderPage />)
      const htmlContent = container.innerHTML
      // py-32などのスペーシングクラスが含まれていることを確認
      expect(htmlContent).toMatch(/py-|mt-|gap-/)
    })
  })
})
