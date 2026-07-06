import { Container } from "@/components/container"
import { CourseContent } from "@/components/coupons/course-detail/CourseContent"
import { CourseDetailHero } from "@/components/coupons/course-detail/CourseDetailHero"
import { CourseFeatures } from "@/components/coupons/course-detail/CourseFeatures"
import { CourseProjects } from "@/components/coupons/course-detail/CourseProjects"
import { FloatingCTA } from "@/components/coupons/course-detail/FloatingCTA"
import { PriceSection } from "@/components/coupons/course-detail/PriceSection"
import { TargetAudience } from "@/components/coupons/course-detail/TargetAudience"
import { RelatedCoupons } from "@/components/coupons/RelatedCoupons"
import { AsyncErrorBoundary } from "@/components/error-boundary"
import { Footer } from "@/components/footer"
import { Gradient } from "@/components/gradient"
import { Navbar } from "@/components/navbar"
import { getLatestCoupons, getRelatedCoupons } from "@/lib/coupons/coupon-data"
import type { Metadata } from "next"

// 静的生成を明示的に設定
export const dynamic = "force-static"
export const revalidate = 3600 // 1時間ごとに再生成

const COURSE_ID = "6981353"

export const metadata: Metadata = {
  title:
    "【Claude Code カスタマイズ完全ガイド】6つの拡張機能を使いこなして開発効率アップ！一歩先のAI駆動開発へ - 特別割引クーポン",
  description:
    "CLAUDE.md・rules・カスタムコマンド・サブエージェント・Skills・Hooksの違いと使い分けを完全マスター！コンテキスト節約しながら開発効率を最大化する実践講座",
  openGraph: {
    title:
      "【Claude Code カスタマイズ完全ガイド】6つの拡張機能を使いこなして開発効率アップ！",
    description:
      "CLAUDE.md・rules・カスタムコマンド・サブエージェント・Skills・Hooksを完全マスター",
    type: "website",
    url: "/coupons/claude-code-perfect-guide",
    images: [
      {
        url: "/images/udemy/claude-code-perfect-guide.png",
        width: 1280,
        height: 720,
        alt: "【Claude Code カスタマイズ完全ガイド】6つの拡張機能を使いこなして開発効率アップ！",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "【Claude Code カスタマイズ完全ガイド】6つの拡張機能を使いこなして開発効率アップ！",
    description:
      "CLAUDE.md・rules・カスタムコマンド・サブエージェント・Skills・Hooksを完全マスター",
    images: ["/images/udemy/claude-code-perfect-guide.png"],
  },
}

const courseDetails = {
  title:
    "【Claude Code カスタマイズ完全ガイド】6つの拡張機能を使いこなして開発効率アップ！一歩先のAI駆動開発へ",
  subtitle:
    "CLAUDE.md・rules・カスタムコマンド・サブエージェント・Skills・Hooksの違いと使い分けを完全マスター！コンテキスト節約しながら開発効率を最大化する実践講座",
  description: `「CLAUDE.mdにルールを書きすぎて、コンテキストがパンパンになってしまった...」
「サブエージェントとかSkillsとかHooksとか、結局どれを使えばいいの？」
「公式ドキュメントを読んでもよく分からない...実践的な使い分けを知りたい」

そんなClaude Codeユーザーの悩みを、本講座で一気に解決しましょう！

Claude Codeには「CLAUDE.md」「.claude/rules/」「カスタムコマンド」「サブエージェント」「Skills」「Hooks」という6つのカスタマイズ機能があります。これらを使いこなせば、コンテキストを節約しながら、あなただけの「専用AIアシスタント」を構築できます。

本講座では、シンプルな機能から段階的に学び、各機能の本質的な違いと適切な使い分けを完全にマスターします。`,
  projects: [
    {
      title: "CLAUDE.md作成とメモリ階層の理解",
      tech: "/initコマンド",
      description: "5段階のメモリ階層と配置場所による使い分けを実践",
    },
    {
      title: "rulesによるルール分割",
      tech: ".claude/rules/ + pathsフィールド",
      description: "Globパターンで条件付きルール適用を実現",
    },
    {
      title: "カスタムコマンド作成",
      tech: "YAMLフロントマター + 引数パターン",
      description: "頻繁に使うプロンプトをショートカット化",
    },
    {
      title: "サブエージェント構築",
      tech: "/agentsコマンド",
      description:
        "セキュリティレビューエージェントを作成して独立コンテキストを活用",
    },
    {
      title: "Skillsの段階的読み込み",
      tech: "skill-creatorプラグイン",
      description: "Progressive Disclosureでマテリアルデザインスキルを作成",
    },
    {
      title: "Hooksによる自動化",
      tech: "SessionStart / Stop / PostToolUse",
      description: "ファイル編集後の自動フォーマットと危険コマンドブロック",
    },
  ],
  features: [
    {
      title: "6つの機能を2つの軸で完全理解",
      description:
        "「いつ読み込まれるか」と「誰が動くか」という2つの軸で整理。機能比較マトリクスと判断フローチャートで迷わず選択できます。",
    },
    {
      title: "シンプル→複雑の順番で無理なく学べる",
      description:
        "CLAUDE.md（土台）→ rules（モジュール化）→ コマンド → サブエージェント → Skills → Hooks の順で段階的にステップアップ。",
    },
    {
      title: "コンテキスト節約の観点から徹底解説",
      description:
        "CLAUDE.mdの肥大化問題を解決。rulesによる動的読み込み、Skillsの段階的読み込み、サブエージェントの独立コンテキスト活用法を習得。",
    },
    {
      title: "実践的なデモと豊富な実例",
      description:
        "/agentsコマンドでのサブエージェント作成、skill-creatorプラグインでのSkill作成、Hooksによる自動フォーマット設定など、実際の作成手順をデモで確認。",
    },
  ],
  targetAudience: [
    {
      title: "Claude Codeをもっと効率的に使いこなしたい方",
      points: [
        "基本的なバイブコーディングはできるようになった",
        "コンテキストの圧迫が気になっている",
        "毎回同じプロンプトを入力するのが面倒",
        "最新の拡張機能を習得したい",
      ],
    },
    {
      title: "CLAUDE.mdの管理に困っている方",
      points: [
        "ルールを書きすぎてファイルが肥大化している",
        "関係ないルールまで読み込まれて効率が悪い",
        "ルールの整理・分割方法を知りたい",
        "コンテキスト消費を抑えたい",
      ],
    },
    {
      title: "6つの機能の使い分けが分からない方",
      points: [
        "rulesとCLAUDE.mdの違いが分からない",
        "サブエージェントとSkillsの使い分けが分からない",
        "Hooksをいつ使えばいいか分からない",
        "公式ドキュメントを読んでも理解できなかった",
      ],
    },
    {
      title: "開発効率を上げたい個人開発者・フリーランス",
      points: [
        "繰り返し作業を自動化したい",
        "プロジェクトごとに最適化されたAI環境を作りたい",
        "チームでルールを共有したい",
        "AI駆動開発の生産性を最大化したい",
      ],
    },
  ],
  whatYouLearn: [
    "Claude Codeの6つのカスタマイズ機能（CLAUDE.md、rules、コマンド、サブエージェント、Skills、Hooks）の違いと適切な使い分け",
    "「いつ読み込まれるか」「誰が動くか」という2つの軸で機能を整理する方法",
    "CLAUDE.mdの肥大化を防ぎ、コンテキストを節約するテクニック",
    ".claude/rules/によるルールのモジュール化と動的読み込み",
    "カスタムコマンドによるプロンプトのショートカット化と引数の活用",
    "サブエージェントを使った独立コンテキストでの効率的な作業委譲",
    "Skillsの段階的読み込み（Progressive Disclosure）の仕組みと活用法",
    "Hooksによる決定論的な自動化（確率論的なCLAUDE.mdとの違い）",
  ],
  requirements: [
    "Claude Codeの基本的な使用経験がある（バイブコーディング入門 受講済み推奨）",
    "ターミナル/コマンドラインの基本操作ができる",
    "Claude サブスクリプション（Pro または Max）を契約している",
    "Node.jsがインストールされている環境",
    "YAMLファイルの基本的な理解があると望ましい（講座内でも解説します）",
    "Macユーザー推奨（Windowsユーザー向けの補足もあります）",
  ],
}

export default function ClaudeCodePerfectGuidePage() {
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

  // 関連クーポンを取得（最大4件）
  const relatedCoupons = getRelatedCoupons(coupon, coupons, 4)

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

        {/* 関連クーポンセクション */}
        <RelatedCoupons coupons={relatedCoupons} />

        <FloatingCTA coupon={coupon} />
      </main>

      {/* フッターセクション */}
      <AsyncErrorBoundary>
        <Footer />
      </AsyncErrorBoundary>
    </div>
  )
}
