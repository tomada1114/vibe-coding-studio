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

const COURSE_ID = "6823465"

export const metadata: Metadata = {
  title:
    "【初心者OK】Claude CodeとPythonで学ぶAI駆動開発！アプリ・スクレイピング・ゲーム作成で学ぶ完全ガイド - 特別割引クーポン",
  description:
    "Claude CodeとPythonでプログラミング未経験でも7つの実践アプリを開発！FizzBuzzから始めてWebスクレイピング、GUIアプリ、ゲーム開発まで幅広く学べます。",
  openGraph: {
    title:
      "【初心者OK】Claude CodeとPythonで学ぶAI駆動開発！アプリ・スクレイピング・ゲーム作成で学ぶ完全ガイド",
    description:
      "Claude CodeとPythonでプログラミング未経験でも7つの実践アプリを開発！実践的なPythonスキルを身につける",
    type: "website",
    url: "/coupons/claude-code-python",
    images: [
      {
        url: "/images/udemy/claude-code-python.png",
        width: 1280,
        height: 720,
        alt: "【初心者OK】Claude CodeとPythonで学ぶAI駆動開発！アプリ・スクレイピング・ゲーム作成で学ぶ完全ガイド",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "【初心者OK】Claude CodeとPythonで学ぶAI駆動開発！アプリ・スクレイピング・ゲーム作成で学ぶ完全ガイド",
    description:
      "Claude CodeとPythonでプログラミング未経験でも7つの実践アプリを開発！実践的なPythonスキルを身につける",
    images: ["/images/udemy/claude-code-python.png"],
  },
}

const courseDetails = {
  title:
    "【初心者OK】Claude CodeとPythonで学ぶAI駆動開発！アプリ・スクレイピング・ゲーム作成で学ぶ完全ガイド",
  subtitle:
    "FizzBuzzから始めてブロック崩しゲームまで！BeautifulSoupでスクレイピング、PyQtでGUIアプリ、Pygameでゲーム開発。AI駆動開発で効率10倍、プログラミング未経験でも実践レベルのPythonスキルが身につく完全ガイド",
  description: `「Pythonって人気だけど、何から始めればいいか分からない...」
「スクレイピングもGUIもゲームも、全部やってみたいけど難しそう...」
「AIツールは使えるけど、Pythonでの実践的な開発は未経験...」

そんな悩みを抱えるあなたに、Claude CodeとPythonで実現する万能開発スキルをお届けします！

本講座では、Claude Codeという最新AIエージェントを使った「バイブコーディング」で、プログラミング未経験でもPythonの実践的な7つのプロジェクトを完成させることができます。`,
  projects: [
    {
      title: "FizzBuzz問題",
      tech: "Python基礎",
      description: "プログラミングの基本ロジックとPython文法を学ぶ",
    },
    {
      title: "数当てゲーム",
      tech: "Python基礎",
      description: "対話型プログラムの作成とユーザー入力処理",
    },
    {
      title: "ECサイトスクレイピング",
      tech: "BeautifulSoup",
      description: "Webデータの自動収集とCSV保存",
    },
    {
      title: "GUIメモ帳アプリ",
      tech: "PyQt",
      description: "デスクトップアプリケーションの基礎",
    },
    {
      title: "PDFツール",
      tech: "PyQt + PDF処理",
      description: "実用的なデスクトップツール開発",
    },
    {
      title: "ブロック崩しゲーム",
      tech: "Pygame",
      description: "2Dゲーム開発の基礎と物理演算",
    },
    {
      title: "データ分析ツール",
      tech: "pandas + matplotlib",
      description: "データ処理と可視化の実践",
    },
  ],
  features: [
    {
      title: "プログラミング未経験でも安心",
      description:
        "ターミナル操作から丁寧に解説。Python環境構築から仮想環境管理まで、つまずきポイントは全て解決策を用意。",
    },
    {
      title: "Pythonの多彩な活用方法を一本で習得",
      description:
        "Web スクレイピング、GUI アプリ、ゲーム開発など、Python でできることを幅広く体験。実務で使える技術が満載。",
    },
    {
      title: "バイブコーディングで開発効率10倍",
      description:
        "コードを書かずに AI との対話だけで開発。エラーが出ても AI が即座に修正。「こんな機能追加して」の一言で実装完了。",
    },
    {
      title: "実践的なスキルが身につく構成",
      description:
        "BeautifulSoup でプロ級のスクレイピング技術、PyQt で本格的なデスクトップアプリ開発、Pygame でゲーム開発の基礎を習得。",
    },
  ],
  targetAudience: [
    {
      title: "Python未経験だけど実用的なアプリを作りたい方",
      points: [
        "プログラミングの基礎から学びたい",
        "様々な分野のPython開発を体験したい",
        "一つの講座で幅広いスキルを身につけたい",
        "AIの力を借りて効率的に学習したい",
      ],
    },
    {
      title: "データ収集や自動化に興味がある方",
      points: [
        "Webスクレイピングを習得したい",
        "業務効率化ツールを作りたい",
        "データ分析の前処理を自動化したい",
        "ECサイトの価格調査を自動化したい",
      ],
    },
    {
      title: "デスクトップアプリやゲーム開発に挑戦したい方",
      points: [
        "GUIアプリケーションを作ってみたい",
        "自分用の便利ツールを開発したい",
        "ゲーム開発の基礎を学びたい",
        "趣味でプログラミングを楽しみたい",
      ],
    },
    {
      title: "AI駆動開発を実践したい方",
      points: [
        "Claude Codeの使い方を学びたい",
        "バイブコーディングを習得したい",
        "最新の開発手法を身につけたい",
        "開発効率を劇的に向上させたい",
      ],
    },
  ],
  whatYouLearn: [
    "Claude Codeを使ったバイブコーディングによるPython開発の基礎から実践まで",
    "プログラミング未経験でも7つの実践的なPythonアプリを完成",
    "BeautifulSoupを使ったWebスクレイピングの実装方法",
    "PyQtによるデスクトップGUIアプリケーション開発",
    "Pygameを使った2Dゲーム開発の基礎",
    "Python環境構築から仮想環境管理まで含めた開発環境の整備方法",
    "AIとの対話だけでコードを生成・修正・改善する技術",
    "エラーが出た時のAIへの適切な修正依頼テクニック",
  ],
  requirements: [
    "パソコンの基本的な操作ができること（ファイル作成、フォルダ移動など）",
    "インターネット接続環境があること",
    "Claude サブスクリプション（Pro または Max）の契約",
    "学習意欲と新しいことにチャレンジする好奇心",
    "プログラミング経験は一切不要！",
    "Pythonの知識も不要！",
  ],
}

export default function ClaudeCodePythonPage() {
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
