/**
 * Footer コンポーネントのテスト
 * Discord Community Site用の拡張機能をテスト
 *
 * TDD Red フェーズ: 失敗するテストを作成
 */

import { Footer } from "@/components/footer"
import { DISCORD_INVITE_URL, SOCIAL_LINKS } from "@/lib/constants"
import { render, screen } from "@testing-library/react"

// モックを設定
jest.mock("@/components/logo", () => ({
  Logo: () => (
    <img alt="Vibe Coding Studio Logo" src="/vcs-logo-square-transparent.png" />
  ),
}))

describe("Footer コンポーネント", () => {
  describe("基本構造", () => {
    it("footer要素が表示される", () => {
      render(<Footer />)
      const footer = screen.getByRole("contentinfo")
      expect(footer).toBeInTheDocument()
    })

    it("ロゴが表示される", () => {
      render(<Footer />)
      // Logoコンポーネントを探す（SVGまたはimg要素）
      const logo =
        document.querySelector("footer svg") ||
        document.querySelector("footer img")
      expect(logo).toBeInTheDocument()
    })
  })

  describe("Discord招待リンク（要件4.2）", () => {
    it("Discord招待リンクが表示される", () => {
      render(<Footer />)
      const discordLinks = screen.getAllByRole("link", {
        name: /Discord|コミュニティ/i,
      })
      expect(discordLinks.length).toBeGreaterThan(0)
      expect(discordLinks[0]).toBeInTheDocument()
    })

    it("Discord招待リンクが正しいURLを持つ", () => {
      render(<Footer />)
      const discordLinks = screen.getAllByRole("link", {
        name: /Discord|コミュニティ/i,
      })
      // 最初のDiscordリンクが正しいURLを持つことを確認
      expect(discordLinks[0]).toHaveAttribute("href", DISCORD_INVITE_URL)
    })

    it("Discord招待リンクが新しいタブで開く（要件4.4）", () => {
      render(<Footer />)
      const discordLinks = screen.getAllByRole("link", {
        name: /Discord|コミュニティ/i,
      })
      // 最初のDiscordリンクが新しいタブで開くことを確認
      expect(discordLinks[0]).toHaveAttribute("target", "_blank")
      expect(discordLinks[0]).toHaveAttribute(
        "rel",
        expect.stringContaining("noopener")
      )
      expect(discordLinks[0]).toHaveAttribute(
        "rel",
        expect.stringContaining("noreferrer")
      )
    })
  })

  describe("ソーシャルメディアリンク（要件4.3）", () => {
    it("定数管理ファイルからSOCIAL_LINKSを使用している", () => {
      render(<Footer />)
      // SOCIAL_LINKSの各リンクが表示されることを確認
      SOCIAL_LINKS.forEach(link => {
        const element = screen.getByRole("link", {
          name: new RegExp(link.name, "i"),
        })
        expect(element).toBeInTheDocument()
      })
    })

    it("各ソーシャルメディアリンクが正しいURLを持つ", () => {
      render(<Footer />)
      SOCIAL_LINKS.forEach(link => {
        const element = screen.getByRole("link", {
          name: new RegExp(link.name, "i"),
        })
        expect(element).toHaveAttribute("href", link.url)
      })
    })

    it("各ソーシャルメディアリンクが新しいタブで開く（要件4.4）", () => {
      render(<Footer />)
      SOCIAL_LINKS.forEach(link => {
        const element = screen.getByRole("link", {
          name: new RegExp(link.name, "i"),
        })
        expect(element).toHaveAttribute("target", "_blank")
      })
    })

    it("Xリンクが表示される", () => {
      render(<Footer />)
      const xLink = screen.getByRole("link", {
        name: /Visit us on X/i,
      })
      expect(xLink).toBeInTheDocument()
    })

    it("YouTubeリンクが表示される", () => {
      render(<Footer />)
      const youtubeLink = screen.getByRole("link", {
        name: /YouTube/i,
      })
      expect(youtubeLink).toBeInTheDocument()
    })

    it("Qiitaリンクが表示される", () => {
      render(<Footer />)
      const qiitaLink = screen.getByRole("link", {
        name: /Qiita/i,
      })
      expect(qiitaLink).toBeInTheDocument()
    })

    it("noteリンクが表示される", () => {
      render(<Footer />)
      const noteLink = screen.getByRole("link", {
        name: /note/i,
      })
      expect(noteLink).toBeInTheDocument()
    })

    it("Udemyリンクが表示される", () => {
      render(<Footer />)
      const udemyLink = screen.getByRole("link", {
        name: /Udemy/i,
      })
      expect(udemyLink).toBeInTheDocument()
    })
  })

  describe("アクセシビリティ", () => {
    it("すべての外部リンクにaria-labelがある", () => {
      render(<Footer />)
      const externalLinks = screen.getAllByRole("link", {
        name: /Twitter|YouTube|Qiita|note|Udemy|Discord|コミュニティ/i,
      })
      externalLinks.forEach(link => {
        // target="_blank"の外部リンクにはaria-labelまたはテキストコンテンツが必要
        const hasAriaLabel = link.hasAttribute("aria-label")
        const hasTextContent =
          link.textContent && link.textContent.trim().length > 0
        expect(hasAriaLabel || hasTextContent).toBe(true)
      })
    })
  })

  describe("コピーライト", () => {
    it("現在の年が表示される", () => {
      render(<Footer />)
      const currentYear = new Date().getFullYear()
      const copyright = screen.getByText(new RegExp(currentYear.toString()))
      expect(copyright).toBeInTheDocument()
    })
  })
})
