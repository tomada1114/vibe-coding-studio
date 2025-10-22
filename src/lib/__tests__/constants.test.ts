/**
 * 定数管理ファイル（constants.ts）のユニットテスト
 *
 * TDD Red フェーズ: 最初に失敗するテストを作成
 */

import type { SocialLink } from "../constants"
import { DISCORD_INVITE_URL, SITE_METADATA, SOCIAL_LINKS } from "../constants"

describe("constants.ts", () => {
  describe("DISCORD_INVITE_URL", () => {
    it("Discord招待URLが有効なURL形式である", () => {
      expect(DISCORD_INVITE_URL).toMatch(/^https:\/\/discord\.gg\//)
    })

    it("Discord招待URLが正しいURLである", () => {
      expect(DISCORD_INVITE_URL).toBe("https://discord.gg/qZDRagzbVD")
    })

    it("Discord招待URLが文字列型である", () => {
      expect(typeof DISCORD_INVITE_URL).toBe("string")
    })

    it("Discord招待URLが空文字列ではない", () => {
      expect(DISCORD_INVITE_URL).not.toBe("")
    })
  })

  describe("SOCIAL_LINKS", () => {
    it("SOCIAL_LINKSが配列である", () => {
      expect(Array.isArray(SOCIAL_LINKS)).toBe(true)
    })

    it("SOCIAL_LINKSが5つのリンクを含む", () => {
      expect(SOCIAL_LINKS).toHaveLength(5)
    })

    it("各ソーシャルリンクが必須フィールド（name、url、icon）を持つ", () => {
      SOCIAL_LINKS.forEach(link => {
        expect(link).toHaveProperty("name")
        expect(link).toHaveProperty("url")
        expect(link).toHaveProperty("icon")
      })
    })

    it("各ソーシャルリンクのURLが有効なHTTPS URL形式である", () => {
      SOCIAL_LINKS.forEach(link => {
        expect(link.url).toMatch(/^https:\/\//)
      })
    })

    it("各ソーシャルリンクのnameが空文字列ではない", () => {
      SOCIAL_LINKS.forEach(link => {
        expect(link.name).not.toBe("")
      })
    })

    it("各ソーシャルリンクのiconが空文字列ではない", () => {
      SOCIAL_LINKS.forEach(link => {
        expect(link.icon).not.toBe("")
      })
    })

    it("SOCIAL_LINKSがTwitterリンクを含む", () => {
      const twitterLink = SOCIAL_LINKS.find(link => link.name === "Twitter")
      expect(twitterLink).toBeDefined()
      expect(twitterLink?.url).toMatch(/twitter\.com|x\.com/)
    })

    it("SOCIAL_LINKSがYouTubeリンクを含む", () => {
      const youtubeLink = SOCIAL_LINKS.find(link => link.name === "YouTube")
      expect(youtubeLink).toBeDefined()
      expect(youtubeLink?.url).toMatch(/youtube\.com/)
    })

    it("SOCIAL_LINKSがQiitaリンクを含む", () => {
      const qiitaLink = SOCIAL_LINKS.find(link => link.name === "Qiita")
      expect(qiitaLink).toBeDefined()
      expect(qiitaLink?.url).toMatch(/qiita\.com/)
    })

    it("SOCIAL_LINKSがnoteリンクを含む", () => {
      const noteLink = SOCIAL_LINKS.find(link => link.name === "note")
      expect(noteLink).toBeDefined()
      expect(noteLink?.url).toMatch(/note\.com/)
    })

    it("SOCIAL_LINKSがUdemyリンクを含む", () => {
      const udemyLink = SOCIAL_LINKS.find(link => link.name === "Udemy")
      expect(udemyLink).toBeDefined()
      expect(udemyLink?.url).toMatch(/udemy\.com/)
    })
  })

  describe("SITE_METADATA", () => {
    it("SITE_METADATAがtitleフィールドを持つ", () => {
      expect(SITE_METADATA).toHaveProperty("title")
    })

    it("SITE_METADATAがdescriptionフィールドを持つ", () => {
      expect(SITE_METADATA).toHaveProperty("description")
    })

    it("SITE_METADATAがurlフィールドを持つ", () => {
      expect(SITE_METADATA).toHaveProperty("url")
    })

    it("SITE_METADATAのtitleが空文字列ではない", () => {
      expect(SITE_METADATA.title).not.toBe("")
    })

    it("SITE_METADATAのdescriptionが空文字列ではない", () => {
      expect(SITE_METADATA.description).not.toBe("")
    })

    it("SITE_METADATAのurlが有効なHTTPS URL形式である", () => {
      expect(SITE_METADATA.url).toMatch(/^https:\/\//)
    })
  })

  describe("型安全性", () => {
    it("SOCIAL_LINKSの各要素がSocialLink型に準拠している", () => {
      SOCIAL_LINKS.forEach(link => {
        // TypeScriptの型チェックで検証されるが、ランタイムでも確認
        const socialLink: SocialLink = link
        expect(socialLink.name).toBeDefined()
        expect(socialLink.url).toBeDefined()
        expect(socialLink.icon).toBeDefined()
      })
    })

    it("DISCORD_INVITE_URLが読み取り専用である（as constによる）", () => {
      // TypeScript型システムで検証されるため、ここでは型のみ確認
      const url: string = DISCORD_INVITE_URL
      expect(typeof url).toBe("string")
    })
  })

  describe("インポートパターン", () => {
    it("名前付きエクスポートとして定数をインポートできる", () => {
      // インポートが成功していれば、この時点で定数が使用可能
      expect(DISCORD_INVITE_URL).toBeDefined()
      expect(SOCIAL_LINKS).toBeDefined()
      expect(SITE_METADATA).toBeDefined()
    })

    it("型定義もインポートできる", () => {
      // SocialLink型がインポート可能であることを確認
      const testLink: SocialLink = {
        name: "Test",
        url: "https://example.com",
        icon: "test",
      }
      expect(testLink).toBeDefined()
    })

    it("定数をデストラクチャリングしてインポートできる", () => {
      // すでに実装されているインポート方法が正しいことを確認
      const { title, description, url } = SITE_METADATA
      expect(title).toBe("Vibe Coding Studio")
      expect(description).toContain("AI駆動開発")
      expect(url).toBe("https://vibecoding.studio")
    })
  })
})
