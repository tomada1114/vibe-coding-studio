import { Container } from "@/components/container"
import { CourseContent } from "@/components/coupons/course-detail/CourseContent"
import { CourseDetailHero } from "@/components/coupons/course-detail/CourseDetailHero"
import { CourseFeatures } from "@/components/coupons/course-detail/CourseFeatures"
import { CourseProjects } from "@/components/coupons/course-detail/CourseProjects"
import { FloatingCTA } from "@/components/coupons/course-detail/FloatingCTA"
import { PriceSection } from "@/components/coupons/course-detail/PriceSection"
import { TargetAudience } from "@/components/coupons/course-detail/TargetAudience"
import { AsyncErrorBoundary } from "@/components/error-boundary"
import { Footer } from "@/components/footer"
import { Gradient } from "@/components/gradient"
import { Navbar } from "@/components/navbar"
import { getLatestCoupons } from "@/lib/coupons/coupon-data"
import type { Metadata } from "next"

// 静的生成を明示的に設定
export const dynamic = "force-static"
export const revalidate = 3600 // 1時間ごとに再生成

const COURSE_ID = "6782117"

export const metadata: Metadata = {
  title:
    "Claude Codeでスマホアプリ開発！React Native（Expo）爆速バイブコーディングテンプレートを作ろう - 特別割引クーポン",
  description:
    "バイブコーディング専用のReact Native/Expo開発テンプレートを構築。一度作れば使い回せる環境でAIと一緒にスマホアプリを量産。E2E自動テストやMCP連携で開発効率を極限まで高めます。",
  openGraph: {
    title:
      "Claude Codeでスマホアプリ開発！React Native（Expo）爆速バイブコーディングテンプレートを作ろう",
    description:
      "バイブコーディング専用の開発環境を構築。E2E自動テストやMCP連携でアプリ開発を爆速化。",
    type: "website",
    url: "https://school.learning-next.app/coupons/claude-code-expo-template",
    images: [
      {
        url: "/images/udemy/claude-code-expo-template.png",
        width: 1280,
        height: 720,
        alt: "Claude Codeでスマホアプリ開発！React Native（Expo）爆速バイブコーディングテンプレート",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Claude Codeでスマホアプリ開発！React Native（Expo）爆速バイブコーディングテンプレートを作ろう",
    description:
      "バイブコーディング専用の開発環境を構築。E2E自動テストやMCP連携でアプリ開発を爆速化。",
    images: ["/images/udemy/claude-code-expo-template.png"],
  },
}

const courseDetails = {
  title:
    "Claude Codeでスマホアプリ開発！React Native（Expo）爆速バイブコーディングテンプレートを作ろう",
  subtitle:
    "バイブコーディングにおける環境構築の悩みを完全解決！一度作れば使い回せるReact Native/Expo開発環境。シミュレータ操作からE2E自動テストまで、AIと一緒にスマホアプリを大量生産できる仕組みを構築する実践講座",
  description: `「Claude Codeでスマホアプリも作れたらいいのに...」
「バイブコーディングは便利だけど、毎回同じセットアップが面倒...」
「AIに指示するだけでアプリを量産できる環境が欲しい...」
「手動テストに時間を取られて、開発に集中できない...」

そんなAI駆動開発の悩みを、完全に解決します！

本講座では、Claude Codeを使ったバイブコーディング専用のスマホアプリ開発テンプレートを構築します。一度この環境を作れば、あとは「○○なアプリ作って」とClaude Codeに指示するだけで、React Native/Expoアプリが次々と完成していきます。

しかも、E2Eテストまで自動化されているので、品質チェックもAIにお任せ。まさにバイブコーディングでアプリを量産するための究極の環境です。`,
  projects: [
    {
      title: "カウンターアプリ",
      tech: "React Native + Expo",
      description: "バイブコーディングの基本フローを確認",
    },
    {
      title: "開発テンプレート構築",
      tech: "Claude Code + MCP",
      description: "AIが最高のパフォーマンスを発揮する環境設定",
    },
    {
      title: "品質管理システム",
      tech: "ESLint + Prettier + Husky",
      description: "コード品質の自動チェック環境",
    },
    {
      title: "E2Eテスト環境",
      tech: "Maestro",
      description: "画面操作の自動テストシステム",
    },
    {
      title: "ポモドーロタイマー",
      tech: "テンプレート活用",
      description: "TDD実践で高品質アプリを爆速開発",
    },
  ],
  features: [
    {
      title: "バイブコーディング専用の開発環境",
      description:
        "Claude Codeが最高のパフォーマンスを発揮する設定。プロジェクト記憶機能（CLAUDE.md）で継続的な開発。Context 7 MCPで常に最新技術をキャッチ。",
    },
    {
      title: "一度作れば永久に使い回せる",
      description:
        "新しいアプリが「5分 + AIへの指示」で開発開始。品質管理、テスト、UIライブラリすべて設定済み。GitHubテンプレートで簡単コピー。",
    },
    {
      title: "スマホアプリ開発の不安もAI解決",
      description:
        "「シミュレータって何？」もClaude Codeが教えてくれる。React Native/Expoの知識不要でアプリ作成。エラーが出てもAIが即座に修正。",
    },
    {
      title: "E2Eテストで品質保証も自動化",
      description:
        "「ちゃんと動くかな？」の確認が不要に。AIが生成したコードを自動でテスト。Maestroで実際の画面操作を再現。プロレベルの品質管理を実現。",
    },
  ],
  targetAudience: [
    {
      title: "Claude Codeでバイブコーディングを極めたい方",
      points: [
        "Webサイトは作れたけどアプリも作りたい",
        "AIとの対話でアプリを量産したい",
        "もっと効率的なバイブコーディング環境が欲しい",
        "最新のMCP機能を活用したい",
      ],
    },
    {
      title: "スマホアプリをAIで作りたい方",
      points: [
        "React Native/Expoの知識はないけど作りたい",
        "環境構築はAIに任せたい",
        "シミュレータの使い方もAIに教えてもらいたい",
        "とにかくアイデアを形にしたい",
      ],
    },
    {
      title: "開発効率を極限まで上げたい方",
      points: [
        "同じセットアップの繰り返しにうんざり",
        "テンプレート化で時間を節約したい",
        "手動テストから解放されたい",
        "アプリ開発を副業にしたい",
      ],
    },
    {
      title: "AI駆動開発の最前線を体験したい方",
      points: [
        "最新のAI開発手法を学びたい",
        "Claude Code × MCPの可能性を探りたい",
        "TDDもAIでやってみたい",
        "次世代の開発スタイルを身につけたい",
      ],
    },
  ],
  whatYouLearn: [
    "Claude Codeを使ったバイブコーディングでのスマホアプリ開発手法",
    "AI駆動開発に特化したReact Native/Expo環境の構築",
    "一度作ればずっと使い回せるテンプレートの作成方法",
    "CLAUDE.mdとContext 7 MCPを活用した効率的なAI開発",
    "E2Eテストを含む品質保証の完全自動化",
    "ESLint/Prettier/Huskyによる品質管理のAI設定",
    "TamaguiなどのUIライブラリをAIで活用する方法",
    "TDD（テスト駆動開発）をAIと実践する手法",
  ],
  requirements: [
    "Claude Codeの基本的な使用経験",
    "ターミナルの基本操作（コマンドのコピペができればOK）",
    "Mac推奨（iOSシミュレータ使用のため）",
    "React Native/Expoの知識は一切不要！",
    "スマホアプリ開発がはじめての方でも大丈夫です",
  ],
}

export default function ClaudeCodeExpoTemplatePage() {
  const coupons = getLatestCoupons()
  const coupon = coupons.find(c => c.courseId === COURSE_ID)

  if (!coupon) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-zinc-600">
          クーポン情報が見つかりませんでした
        </p>
      </div>
    )
  }

  return (
    <div className="overflow-hidden">
      {/* ヘッダーセクション */}
      <AsyncErrorBoundary>
        <div className="relative">
          <Gradient className="absolute inset-2 bottom-0 rounded-4xl ring-1 ring-black/5 ring-inset" />
          <Container className="relative">
            <Navbar />
          </Container>
        </div>
      </AsyncErrorBoundary>

      {/* メインコンテンツ */}
      <main className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/30">
        <CourseDetailHero
          title={courseDetails.title}
          subtitle={courseDetails.subtitle}
          topics={coupon.courseInfo.topics}
          slug={coupon.courseInfo.slug}
        />

        <div className="mx-auto max-w-7xl py-8 sm:px-4 sm:py-12 lg:px-8">
          <div className="grid gap-6 sm:gap-8 lg:grid-cols-3">
            <div className="space-y-6 sm:space-y-8 lg:col-span-2">
              <CourseContent description={courseDetails.description} />
              <CourseFeatures features={courseDetails.features} />
              <CourseProjects projects={courseDetails.projects} />
              <TargetAudience audiences={courseDetails.targetAudience} />
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <PriceSection coupon={coupon} />
              </div>
            </div>
          </div>
        </div>

        <FloatingCTA coupon={coupon} />
      </main>

      {/* フッターセクション */}
      <AsyncErrorBoundary>
        <Footer />
      </AsyncErrorBoundary>
    </div>
  )
}
