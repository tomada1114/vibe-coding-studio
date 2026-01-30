import { render, screen } from "@testing-library/react"
import { vi } from "vitest"
import JavaScriptCurriculumPage from "../page"

interface MockCurriculumProps {
  slug: string
  courseContent: {
    title: string
    description: string
    chapterCount: number
    cta: {
      primaryButtonLink: string
      secondaryButtonLink: string
    }
    features: Array<{ title: string; description: string }>
    targetAudience: Array<{ title: string; description: string }>
    curriculum: Array<{ title: string; description: string }>
  }
  themeColors: {
    primary: string
    accent: string
  }
}

// Mocking the Curriculum component
vi.mock("@/components/docs/Curriculum", () => ({
  Curriculum: ({ slug, courseContent, themeColors }: MockCurriculumProps) => (
    <div data-testid="curriculum-component">
      <div data-testid="slug">{slug}</div>
      <div data-testid="course-title">{courseContent.title}</div>
      <div data-testid="course-description">{courseContent.description}</div>
      <div data-testid="theme-primary">{themeColors.primary}</div>
      <div data-testid="theme-accent">{themeColors.accent}</div>
      <div data-testid="chapter-count">{courseContent.chapterCount}</div>
      <div data-testid="cta-primary-link">
        {courseContent.cta.primaryButtonLink}
      </div>
      <div data-testid="cta-secondary-link">
        {courseContent.cta.secondaryButtonLink}
      </div>

      {/* Feature sections */}
      <div data-testid="features">
        {courseContent.features.map((feature, index: number) => (
          <div key={index} data-testid={`feature-${index}`}>
            <span data-testid={`feature-title-${index}`}>{feature.title}</span>
            <span data-testid={`feature-description-${index}`}>
              {feature.description}
            </span>
          </div>
        ))}
      </div>

      {/* Target audience sections */}
      <div data-testid="target-audience">
        {courseContent.targetAudience.map((audience, index: number) => (
          <div key={index} data-testid={`audience-${index}`}>
            <span data-testid={`audience-title-${index}`}>
              {audience.title}
            </span>
            <span data-testid={`audience-description-${index}`}>
              {audience.description}
            </span>
          </div>
        ))}
      </div>

      {/* Curriculum sections */}
      <div data-testid="curriculum">
        {courseContent.curriculum.map((chapter, index: number) => (
          <div key={index} data-testid={`chapter-${index}`}>
            <span data-testid={`chapter-title-${index}`}>{chapter.title}</span>
            <span data-testid={`chapter-description-${index}`}>
              {chapter.description}
            </span>
          </div>
        ))}
      </div>
    </div>
  ),
}))

describe("JavaScriptCurriculumPage", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe("基本的なプロパティの確認", () => {
    it("正しいslugがCurriculumコンポーネントに渡される", () => {
      render(<JavaScriptCurriculumPage />)
      expect(screen.getByTestId("slug")).toHaveTextContent("javascript")
    })

    it("コースタイトルと説明が正しく設定される", () => {
      render(<JavaScriptCurriculumPage />)
      expect(screen.getByTestId("course-title")).toHaveTextContent(
        "JavaScript 基礎"
      )
      expect(screen.getByTestId("course-description")).toHaveTextContent(
        "Webページに動きを与える、フロントエンド開発の必須言語を基礎から実践まで体系的に学ぶ"
      )
    })

    it("テーマカラーが正しく設定される", () => {
      render(<JavaScriptCurriculumPage />)
      expect(screen.getByTestId("theme-primary")).toHaveTextContent("yellow")
      expect(screen.getByTestId("theme-accent")).toHaveTextContent("yellow-600")
    })

    it("チャプター数が正しく設定される", () => {
      render(<JavaScriptCurriculumPage />)
      expect(screen.getByTestId("chapter-count")).toHaveTextContent("10")
    })
  })

  describe("コース特徴セクション", () => {
    it("4つの特徴が正しく表示される", () => {
      render(<JavaScriptCurriculumPage />)

      // 特徴1
      expect(screen.getByTestId("feature-title-0")).toHaveTextContent(
        "インタラクティブなWebページ制作"
      )
      expect(screen.getByTestId("feature-description-0")).toHaveTextContent(
        "クリック、スクロール、フォーム入力など、ユーザーの操作に反応するWebページを作れるようになります"
      )

      // 特徴2
      expect(screen.getByTestId("feature-title-1")).toHaveTextContent(
        "DOM操作によるリアルタイム更新"
      )
      expect(screen.getByTestId("feature-description-1")).toHaveTextContent(
        "ページを再読み込みせずに、コンテンツを動的に変更する技術を習得できます"
      )

      // 特徴3
      expect(screen.getByTestId("feature-title-2")).toHaveTextContent(
        "非同期処理とAPI通信"
      )
      expect(screen.getByTestId("feature-description-2")).toHaveTextContent(
        "サーバーとの通信やデータ取得など、現代的なWeb開発に必須の非同期処理を学べます"
      )

      // 特徴4
      expect(screen.getByTestId("feature-title-3")).toHaveTextContent(
        "実践的なアプリケーション開発"
      )
      expect(screen.getByTestId("feature-description-3")).toHaveTextContent(
        "ToDoリストやおみくじアプリなど、実際に使える小さなアプリケーションを作れます"
      )
    })
  })

  describe("対象者セクション", () => {
    it("4つの対象者が正しく表示される", () => {
      render(<JavaScriptCurriculumPage />)

      // 対象者1
      expect(screen.getByTestId("audience-title-0")).toHaveTextContent(
        "HTML/CSSを学んで、さらに動的なサイトを作りたい方"
      )
      expect(screen.getByTestId("audience-description-0")).toHaveTextContent(
        "静的なWebページから一歩進んで、ユーザーと対話できるWebサイトを制作できるようになります"
      )

      // 対象者2
      expect(screen.getByTestId("audience-title-1")).toHaveTextContent(
        "プログラミング初心者でWebエンジニアを目指す方"
      )

      // 対象者3
      expect(screen.getByTestId("audience-title-2")).toHaveTextContent(
        "Webページにアニメーションや機能を追加したい方"
      )

      // 対象者4
      expect(screen.getByTestId("audience-title-3")).toHaveTextContent(
        "React や Vue.js などのフレームワーク学習の準備をしたい方"
      )
    })
  })

  describe("カリキュラムセクション", () => {
    it("10章すべてが正しく表示される", () => {
      render(<JavaScriptCurriculumPage />)

      const expectedChapters = [
        "【Chapter 1】JavaScriptの世界へようこそ",
        "【Chapter 2】開発環境を整えて最初のコードを書こう",
        "【Chapter 3】JavaScriptの基本文法をマスター",
        "【Chapter 4】条件分岐と繰り返しで処理を制御する",
        "【Chapter 5】関数で処理をまとめて再利用しよう",
        "【Chapter 6】エラーに立ち向かう力を身につけよう",
        "【Chapter 7】DOM操作でWebページを動的に変更しよう",
        "【Chapter 8】非同期処理でサーバーと通信しよう",
        "【Chapter 9】APIと連携して実用的な機能を実装しよう",
        "【Chapter 10】実践！アプリケーション開発にチャレンジ",
      ]

      expectedChapters.forEach((chapterTitle, index) => {
        expect(screen.getByTestId(`chapter-title-${index}`)).toHaveTextContent(
          chapterTitle
        )
      })
    })

    it("各章の説明にHTMLタグが含まれている", () => {
      render(<JavaScriptCurriculumPage />)

      // Chapter 1の説明にstrongタグが含まれることを確認
      const chapter1Description = screen.getByTestId(
        "chapter-description-0"
      ).textContent
      expect(chapter1Description).toContain(
        "<strong>プログラミングの基本概念</strong>"
      )

      // Chapter 3の説明にstrongタグが含まれることを確認
      const chapter3Description = screen.getByTestId(
        "chapter-description-2"
      ).textContent
      expect(chapter3Description).toContain(
        "<strong>変数宣言（let、const）</strong>"
      )

      // Chapter 7の説明にstrongタグが含まれることを確認
      const chapter7Description = screen.getByTestId(
        "chapter-description-6"
      ).textContent
      expect(chapter7Description).toContain(
        "<strong>DOM（Document Object Model）</strong>"
      )
    })
  })

  describe("CTAセクション", () => {
    it("CTAリンクが正しく設定される", () => {
      render(<JavaScriptCurriculumPage />)

      // プライマリボタンのリンク（料金ページ）
      expect(screen.getByTestId("cta-primary-link")).toHaveTextContent(
        "/pricing"
      )

      // セカンダリボタンのリンク（最初のチャプター）
      expect(screen.getByTestId("cta-secondary-link")).toHaveTextContent(
        "/docs/javascript/introduction/what_is_javascript"
      )
    })
  })

  describe("メタデータ", () => {
    it("メタデータが正しくエクスポートされる", async () => {
      const { metadata } = await import("../page")

      expect(metadata).toEqual({
        title: "JavaScript 基礎カリキュラム",
        description:
          "Webページに動きを与える、フロントエンド開発の必須言語を基礎から実践まで体系的に学ぶ",
      })
    })
  })
})
