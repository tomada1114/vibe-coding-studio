import { Container } from "@/components/container"
import { AsyncErrorBoundary } from "@/components/error-boundary"
import { Footer } from "@/components/footer"
import { Gradient } from "@/components/gradient"
import { Navbar } from "@/components/navbar"
import { Heading, Subheading } from "@/components/text"
import {
  AcademicCapIcon,
  BriefcaseIcon,
  CodeBracketIcon,
  GlobeAltIcon,
  MicrophoneIcon,
  RocketLaunchIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline"
import type { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "とまだ - Founder | Vibe Coding Studio",
  description:
    "Vibe Coding Studioの主催者とまだ（Tomada）のプロフィール。AI駆動開発のスペシャリストとして、コミュニティ運営・教育活動・開発実績をご紹介します。",
}

/**
 * ヒーローセクション
 * - プロフィール写真
 * - 名前とキャッチコピー
 * - 簡潔な自己紹介
 */
function HeroSection() {
  return (
    <div className="relative">
      <Gradient className="absolute inset-0" />
      <Container className="relative">
        <Navbar />
        <div className="pt-16 pb-24 sm:pt-24 sm:pb-32 md:pt-32 md:pb-48">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            {/* 左側: テキストコンテンツ */}
            <div className="flex flex-col justify-center">
              <h1 className="font-display text-6xl/[1.15] font-medium tracking-tight text-balance text-gray-950 sm:text-7xl/[1.1] md:text-8xl/[1.1]">
                とまだ
                <br />
                <span className="text-gray-950/60">Tomada</span>
              </h1>
              <p className="mt-8 text-xl/8 font-medium text-gray-950/75 sm:text-2xl/9">
                カナダ在住のフリーランスエンジニア
                <br />
                AI駆動開発実践者
              </p>
              <p className="mt-6 max-w-2xl text-base/7 text-gray-700">
                プログラミング未経験から独学とスクールを経てWebエンジニアに転身。
                現在は開発案件に従事しつつ、法人向けにAI駆動開発の導入支援、そしてYouTube・Udemy・コミュニティでAI駆動開発の普及に尽力しています。
              </p>
            </div>

            {/* 右側: プロフィール画像 */}
            <div className="flex items-center justify-center">
              <div className="relative aspect-square w-full max-w-md">
                <Image
                  src="/tomada.png"
                  alt="とまだ（Tomada）のプロフィール画像"
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

/**
 * AI駆動開発のスペシャリストセクション
 * - 実践経験と開発実績を文章で表現
 * - 左右レイアウトでビジュアル的な魅力を追加
 */
function ExpertiseSection() {
  return (
    <div className="bg-gradient-to-b from-white from-50% to-gray-100 py-32">
      <Container>
        <Subheading>Expertise</Subheading>
        <Heading as="h2" className="mt-2 max-w-3xl">
          AI駆動開発のスペシャリスト
        </Heading>

        <div className="mt-10 sm:mt-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-center">
              <div className="inline-flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-950">
                  <CodeBracketIcon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl/8 font-semibold text-gray-950">
                  日々の実践と情報発信
                </h3>
              </div>
              <div className="mt-6 space-y-4 text-base/7 text-gray-700">
                <p>
                  <strong className="font-semibold text-gray-950">
                    Claude Code、Codex、Cursor、GitHub Copilot
                  </strong>
                  など最新のAIツールを日常的に使いこなし、実務での活用ノウハウを蓄積。
                  YouTubeやコミュニティで、失敗も含めた検証プロセスをリアルタイムに共有しています。
                </p>
                <p>
                  AI駆動開発は単なるコード補完ではありません。設計から実装、テストまで、
                  <strong className="font-semibold text-gray-950">
                    AIと協働することで開発速度と品質を両立
                  </strong>
                  できる、新しい開発のあり方を実践しています。
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="inline-flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-950">
                  <RocketLaunchIcon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl/8 font-semibold text-gray-950">
                  現場と個人開発での実現
                </h3>
              </div>
              <div className="mt-6 space-y-4 text-base/7 text-gray-700">
                <p>
                  開発案件では、AI駆動開発により
                  <strong className="font-semibold text-gray-950">
                    高速な開発サイクル
                  </strong>
                  を実現。個人開発でも、プログラミング学習プラットフォーム「Learning
                  Next」をはじめ、複数のWebアプリを短期間で構築・運営しています。
                </p>
                <p>
                  未経験の技術領域でも、AIの力を借りることで即座に挑戦可能。
                  実際にスマホアプリ開発の経験がない状態から、アプリを開発してストア公開まで実現しました。
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

/**
 * 教育活動セクション
 * - Udemy講師
 * - YouTube運営
 * - プログラミングスクール講師
 */
function EducationSection() {
  const educationActivities = [
    {
      icon: AcademicCapIcon,
      title: "Udemy講師",
      description:
        "AI駆動開発分野で複数のベストセラーコースを運営。Claude Code、Codex、Cursor など最新AIツールの実践的な使い方を解説しています。プログラミング未経験の方でも分かりやすく解説していますので、AI駆動開発の基礎から実践までを学べます。",
      link: {
        text: "コース一覧を見る（クーポン付き）",
        url: "https://school.learning-next.app/coupons",
      },
    },
    {
      icon: MicrophoneIcon,
      title: "YouTube運営",
      description:
        "最新のAI駆動開発ノウハウを配信。Claude Code や Codex を使った開発方法や、AI駆動開発のベストプラクティスを解説しています。現場での実践ノウハウも含めて紹介していますので、ツールの使い方だけでなく、実際の開発現場での活用方法も学べます。",
      link: {
        text: "チャンネルを見る",
        url: "https://www.youtube.com/@vibe-coding-studio",
      },
    },
    {
      icon: BookOpenIcon,
      title: "元プログラミングスクール講師",
      description:
        "100名以上の未経験者を指導した実績。初心者の挫折ポイントを熟知し、技術的な内容を分かりやすく伝えることを得意としています。常に最新の情報を追いながらも、初心者の方が分かりやすいよう、丁寧すぎるぐらいに解説することを心がけています。",
    },
  ]

  return (
    <div className="relative py-32">
      <Gradient className="absolute inset-0" />
      <Container className="relative">
        <Subheading>Education</Subheading>
        <Heading as="h2" className="mt-2 max-w-3xl">
          教育活動
        </Heading>
        <p className="mt-6 max-w-3xl text-lg text-gray-600">
          プログラミング初心者から経験者まで、幅広い層に向けて
          AI駆動開発の知識を共有しています。
        </p>

        <div className="mt-10 space-y-8 sm:mt-16">
          {educationActivities.map(activity => (
            <div
              key={activity.title}
              className="flex flex-col gap-6 rounded-3xl bg-white/80 p-8 shadow-sm ring-1 ring-gray-950/5 sm:flex-row sm:items-start"
            >
              <div className="flex-shrink-0">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-950">
                  <activity.icon className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="flex-grow">
                <h3 className="text-2xl/8 font-semibold text-gray-950">
                  {activity.title}
                </h3>
                <p className="mt-4 text-base/7 text-gray-700">
                  {activity.description}
                </p>
                {activity.link && (
                  <a
                    href={activity.link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block text-sm font-medium text-gray-950 underline decoration-gray-950/20 underline-offset-4 data-hover:decoration-gray-950"
                  >
                    {activity.link.text} →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

/**
 * 現在の活動セクション
 * - フリーランスエンジニア
 * - AI駆動開発導入支援
 * - コンテンツ発信
 */
function CurrentActivitiesSection() {
  const activities = [
    {
      icon: BriefcaseIcon,
      title: "フリーランスエンジニア",
      description:
        "開発案件に従事。カナダから完全リモートで働く自由なスタイルを実現。フルスタックエンジニアとして主にWebアプリケーションを開発しています。",
    },
    {
      icon: RocketLaunchIcon,
      title: "AI駆動開発の導入支援",
      description:
        "法人向けにAI駆動開発の導入サポートを提供。現場でのAI活用ノウハウを実践的にアドバイス。初心者から経験者まで、レベルに応じた教育が可能。",
    },
    {
      icon: GlobeAltIcon,
      title: "コンテンツ発信",
      description:
        "XやYoutube、QiitaにZennなど、各種メディアでAI駆動開発の情報を発信しています。AI駆動開発やプログラミングがはじめての方にも分かりやすく解説しています。",
    },
  ]

  return (
    <div className="bg-gradient-to-b from-white from-50% to-gray-100 py-32">
      <Container>
        <Subheading>Current Activities</Subheading>
        <Heading as="h2" className="mt-2 max-w-3xl">
          現在の活動
        </Heading>

        <div className="mt-10 grid grid-cols-1 gap-8 sm:mt-16 md:grid-cols-3">
          {activities.map(activity => (
            <div key={activity.title} className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-950">
                <activity.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="mt-6 text-xl/7 font-semibold text-gray-950">
                {activity.title}
              </h3>
              <p className="mt-4 text-base/7 text-gray-600">
                {activity.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

/**
 * 技術スタックセクション
 */
function TechStackSection() {
  const techStacks = [
    {
      category: "プログラミング言語",
      items: ["Ruby", "JavaScript", "TypeScript", "Python", "PHP"],
    },
    {
      category: "フレームワーク・ライブラリ",
      items: ["Ruby on Rails", "React", "Next.js", "Vue.js", "Flask"],
    },
    {
      category: "インフラ・クラウド",
      items: ["AWS", "Docker", "Linux", "Terraform"],
    },
    {
      category: "AI駆動開発ツール",
      items: [
        "Claude Code",
        "Codex",
        "Cursor",
        "GitHub Copilot",
        "Cline",
        "ChatGPT",
        "Gemini",
      ],
    },
  ]

  return (
    <div className="relative py-32">
      <Gradient className="absolute inset-0" />
      <Container className="relative">
        <Subheading>Tech Stack</Subheading>
        <Heading as="h2" className="mt-2 max-w-3xl">
          技術スタック
        </Heading>

        <div className="mt-10 grid grid-cols-1 gap-8 sm:mt-16 md:grid-cols-2">
          {techStacks.map(stack => (
            <div
              key={stack.category}
              className="rounded-3xl bg-white/80 p-8 shadow-sm ring-1 ring-gray-950/5"
            >
              <h3 className="text-xl/7 font-semibold text-gray-950">
                {stack.category}
              </h3>
              <ul className="mt-6 space-y-3">
                {stack.items.map(item => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-base/7 text-gray-700"
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-gray-950" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

/**
 * 登壇実績セクション
 */
function SpeakingSection() {
  return (
    <div className="bg-gradient-to-b from-white from-50% to-gray-100 py-32">
      <Container>
        <Subheading>Speaking</Subheading>
        <Heading as="h2" className="mt-2 max-w-3xl">
          登壇実績
        </Heading>

        <div className="mt-10 sm:mt-16">
          <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-gray-950/5">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-950">
                  <MicrophoneIcon className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="flex-grow">
                <h3 className="text-2xl/8 font-semibold text-gray-950">
                  東京AI祭 プレイベント（2025年）
                </h3>
                <p className="mt-2 text-lg font-medium text-gray-950/75">
                  Claude Code vs Codex CLI 徹底比較（オンライン）
                </p>
                <p className="mt-4 text-base/7 text-gray-700">
                  両ツールを日常的に併用している経験から、カスタムコマンドの柔軟性、サブエージェント機能、IDE拡張対応、コミュニティの充実度など、実務で本当に重要となる機能を徹底比較。100名以上に参加いただき、AI駆動開発のツール選定の参考になる内容を提供しました。現場経験を活かした実践的観点を生かした内容であり、参加者の方からも高い評価をいただきました。
                </p>
                <a
                  href="https://ai-fest-tokyo.connpass.com/event/369543/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-sm font-medium text-gray-950 underline decoration-gray-950/20 underline-offset-4 data-hover:decoration-gray-950"
                >
                  過去のイベント詳細を見る →
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

/**
 * ミッションセクション
 */
function MissionSection() {
  return (
    <div className="relative py-32">
      <Gradient className="absolute inset-0" />
      <Container className="relative">
        <Subheading>Mission</Subheading>
        <Heading as="h2" className="mt-2 max-w-3xl">
          ミッション
        </Heading>

        <div className="mt-10 sm:mt-16">
          <div className="rounded-3xl bg-white/80 p-8 text-center shadow-sm ring-1 ring-gray-950/5 sm:p-12">
            <blockquote className="text-2xl/9 font-medium text-gray-950 sm:text-3xl/10">
              「プログラミングとAIを通じて、
              <br />
              より多くの人が自由な働き方を
              <br />
              実現できる社会を作る」
            </blockquote>
            <p className="mx-auto mt-8 max-w-2xl text-base/7 text-gray-700">
              技術的な挑戦を楽しみながら、AIの力を借りてより創造的な開発を実現。
              <br />
              誰もが
              <strong className="mx-1 font-semibold text-gray-950">
                「経済的自由」
              </strong>
              と
              <strong className="mx-1 font-semibold text-gray-950">
                「働き方の自由」
              </strong>
              を手に入れられる
              <br />
              仕組みづくりに貢献していきます。
            </p>
          </div>
        </div>
      </Container>
    </div>
  )
}

/**
 * Founderページ
 * - ヒーローセクション
 * - AI駆動開発のスペシャリスト
 * - 教育活動
 * - 現在の活動
 * - 技術スタック
 * - 登壇実績
 * - ミッション
 * - フッター
 */
export default function FounderPage() {
  return (
    <div className="overflow-hidden">
      <AsyncErrorBoundary>
        <HeroSection />
      </AsyncErrorBoundary>
      <main>
        <AsyncErrorBoundary>
          <ExpertiseSection />
        </AsyncErrorBoundary>
        <AsyncErrorBoundary>
          <EducationSection />
        </AsyncErrorBoundary>
        <AsyncErrorBoundary>
          <CurrentActivitiesSection />
        </AsyncErrorBoundary>
        <AsyncErrorBoundary>
          <TechStackSection />
        </AsyncErrorBoundary>
        <AsyncErrorBoundary>
          <SpeakingSection />
        </AsyncErrorBoundary>
        <AsyncErrorBoundary>
          <MissionSection />
        </AsyncErrorBoundary>
      </main>
      <AsyncErrorBoundary>
        <Footer />
      </AsyncErrorBoundary>
    </div>
  )
}
