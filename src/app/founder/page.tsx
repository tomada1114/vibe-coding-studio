import { Container } from "@/components/container"
import { AsyncErrorBoundary } from "@/components/error-boundary"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { Heading, Subheading } from "@/components/text"
import { getSiteUrl } from "@/lib/seo/site-url"
import {
  AcademicCapIcon,
  BookOpenIcon,
  BriefcaseIcon,
  CodeBracketIcon,
  GlobeAltIcon,
  MicrophoneIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline"
import type { Metadata } from "next"
import Image from "next/image"

const founderTitle = "とまだ - Founder"
const founderOgTitle = "とまだ - Founder | Vibe Coding Studio"
const founderDescription =
  "Vibe Coding Studioの主催者とまだ（増山友司 / Tomoshi Masuyama）のプロフィール。AI駆動開発の実践者・教育者。金融系メディアや運輸系システムなど多様な開発現場での実務経験をもとに、UdemyベストセラーコースやYouTubeでAI駆動開発の実践知を発信しています。"

export const metadata: Metadata = {
  title: founderTitle,
  description: founderDescription,
  openGraph: {
    title: founderOgTitle,
    description: founderDescription,
    type: "profile",
    url: "/founder",
    images: [
      {
        url: "/tomada.png",
        width: 800,
        height: 800,
        alt: "とまだ（Tomada）のプロフィール画像",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: founderOgTitle,
    description: founderDescription,
    images: ["/tomada.png"],
  },
  alternates: {
    canonical: "/founder",
  },
}

function ProfileIconX(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12.6 0h2.454l-5.36 6.778L16 16h-4.937l-3.867-5.594L2.771 16H.316l5.733-7.25L0 0h5.063l3.495 5.114L12.6 0zm-.86 14.376h1.36L4.323 1.539H2.865l8.875 12.837z" />
    </svg>
  )
}

function ProfileIconGitHub(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
    </svg>
  )
}

function ProfileIconLinkedIn(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M14.82 0H1.18A1.169 1.169 0 000 1.154v13.694A1.168 1.168 0 001.18 16h13.64A1.17 1.17 0 0016 14.845V1.15A1.171 1.171 0 0014.82 0zM4.744 13.64H2.369V5.996h2.375v7.644zm-1.18-8.684a1.377 1.377 0 11.52-.106 1.377 1.377 0 01-.527.103l.007.003zm10.075 8.683h-2.375V9.921c0-.885-.015-2.025-1.234-2.025-1.218 0-1.425.966-1.425 1.968v3.775H6.233V5.997H8.51v1.05h.032c.317-.601 1.09-1.235 2.246-1.235 2.405-.005 2.851 1.578 2.851 3.63v4.197z" />
    </svg>
  )
}

function ProfileIconYouTube(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M15.841 4.8s-.156-1.103-.636-1.587c-.608-.636-1.29-.638-1.602-.676-2.237-.162-5.594-.162-5.594-.162h-.007s-3.357 0-5.594.162c-.311.038-.994.04-1.602.676C.327 3.697.171 4.8.171 4.8S.015 6.09.015 7.382v1.216c0 1.291.156 2.582.156 2.582s.156 1.103.635 1.587c.608.636 1.407.616 1.762.683 1.279.123 5.436.161 5.436.161s3.362-.005 5.599-.167c.312-.039.994-.041 1.602-.677.48-.484.636-1.587.636-1.587s.156-1.291.156-2.582V7.382c0-1.292-.156-2.582-.156-2.582zM6.352 10.059V4.993l4.322 2.539-4.322 2.527z" />
    </svg>
  )
}

const profileLinks = [
  {
    name: "X",
    url: "https://x.com/muscle_coding",
    icon: ProfileIconX,
  },
  {
    name: "GitHub",
    url: "https://github.com/tomada1114",
    icon: ProfileIconGitHub,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/tomoshi-masuyama-5b4b31199/",
    icon: ProfileIconLinkedIn,
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@vibe-coding-studio",
    icon: ProfileIconYouTube,
  },
]

/**
 * ヒーローセクション
 * - プロフィール写真
 * - 名前（ハンドルネーム + 本名併記）とキャッチコピー
 * - 簡潔な自己紹介
 * - SNS・外部プロフィールへのリンク
 */
function HeroSection() {
  return (
    <div className="relative">
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
              <p className="mt-4 text-sm font-medium tracking-wide text-gray-500">
                増山 友司 / Tomoshi Masuyama
              </p>
              <p className="mt-8 text-xl/8 font-medium text-gray-950/75 sm:text-2xl/9">
                AI駆動開発の実践者・教育者
                <br />
                カナダ在住のソフトウェアエンジニア
              </p>
              <p className="mt-6 max-w-2xl text-base/7 text-gray-700">
                SIerでのネットワーク・サーバ基盤構築を経てWebアプリケーション開発に転身後、フリーランスのソフトウェアエンジニアとして独立。
                月間数百万ユーザー規模の金融系メディアや運輸系システムの開発、大規模システムのリプレイスなど、インフラからアプリケーションまで幅広い開発を最前線で担ってきました。
                Claude
                Codeをはじめとする最新のAIツールを開発の主力に据え、現場で磨いた実践知をYouTube・Udemy・コミュニティを通じて共有しています。
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {profileLinks.map(link => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`とまだの${link.name}プロフィールを見る`}
                    className="inline-flex items-center gap-2 rounded-full border border-gray-950/15 px-4 py-1.5 text-sm font-medium text-gray-950 transition-colors hover:bg-gray-950 hover:text-white"
                  >
                    <link.icon className="size-3.5" />
                    {link.name}
                  </a>
                ))}
              </div>
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
    <div className="border-t border-gray-200 bg-gray-50 py-24 sm:py-32">
      <Container>
        <Subheading>EXPERTISE</Subheading>
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
                  大規模な金融系メディアや運輸系システムなど、
                  <strong className="font-semibold text-gray-950">
                    多様な開発現場でAI駆動開発を実践
                  </strong>
                  。個人開発でも、プログラミング学習プラットフォーム「Learning
                  Next」をはじめ、複数のWebアプリを短期間で構築・運営してきました。
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
 * 経歴セクション
 * - 大学院修了からフリーランス独立までのタイムライン
 * - 会社名は出さず「SIer」「セキュリティベンダー」等の業種表現を使用
 */
function CareerSection() {
  const careerTimeline = [
    {
      year: "2016",
      title: "北海道大学大学院を修了、SIerでキャリアをスタート",
      description:
        "理学院 物性物理学専攻を修了後、SIerでネットワーク・サーバ基盤構築のシステムエンジニアに。提案から要件定義・設計・構築・保守運用までを一貫して担当し、チームを率いるプロジェクトマネジメントも経験。",
    },
    {
      year: "2019",
      title: "セキュリティベンダーへ転職",
      description:
        "法人向けセキュリティ製品のテクニカルサポートエンジニアとして、ログ解析や高度なトラブルシューティングに従事。Pythonによる業務自動化をきっかけに、プログラミングの面白さに目覚める。",
    },
    {
      year: "2021",
      title: "Webアプリケーションエンジニアに転身",
      description:
        "独学とスクールでの学習を経て、大規模な金融系メディアの開発へ。開発チームリーダー・スクラムマスターとして、新規機能開発とチーム運営をリード。",
    },
    {
      year: "2024",
      title: "フリーランスとして独立、カナダへ移住",
      description:
        "金融系メディアや運輸系システムの開発、大規模システムのリプレイス、海外企業の案件など、多様な開発を経験。法人向けのAI駆動開発導入支援・コンサルティングも手がける。",
    },
  ]

  return (
    <div className="relative py-32">
      <Container className="relative">
        <Subheading>CAREER</Subheading>
        <Heading as="h2" className="mt-2 max-w-3xl">
          経歴
        </Heading>

        <ol className="mt-10 sm:mt-16">
          {careerTimeline.map((item, index) => (
            <li key={item.year} className="relative flex gap-6 sm:gap-10">
              {/* 年ラベル */}
              <div className="w-14 flex-shrink-0 pt-0.5 text-right sm:w-16">
                <span className="font-display text-lg font-medium tracking-tight text-gray-950">
                  {item.year}
                </span>
              </div>

              {/* タイムラインレール */}
              <div className="relative flex flex-col items-center">
                <div className="mt-2 h-3 w-3 flex-shrink-0 rounded-full bg-gray-950" />
                {index < careerTimeline.length - 1 && (
                  <div className="w-px flex-grow bg-gray-300" />
                )}
              </div>

              {/* 内容 */}
              <div
                className={
                  index < careerTimeline.length - 1 ? "pb-12" : undefined
                }
              >
                <h3 className="text-xl/7 font-semibold text-gray-950">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-2xl text-base/7 text-gray-700">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
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
        "AI駆動開発分野で複数のベストセラーコースを運営し、受講生は累計1万人を超えます。Claude Code、Codex、Cursor など最新AIツールの実践的な使い方を解説しています。プログラミング未経験の方でも分かりやすく解説していますので、AI駆動開発の基礎から実践までを学べます。",
      link: {
        text: "コース一覧を見る（クーポン付き）",
        url: "/coupons",
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
        "メンターとして数多くの未経験者を指導し、カリキュラム執筆も担当。初心者の挫折ポイントを熟知し、技術的な内容を分かりやすく伝えることを得意としています。常に最新の情報を追いながらも、初心者の方が分かりやすいよう、丁寧すぎるぐらいに解説することを心がけています。",
    },
  ]

  return (
    <div className="border-t border-gray-200 bg-gray-50 py-24 sm:py-32">
      <Container>
        <Subheading>EDUCATION</Subheading>
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
                    {...(activity.link.url.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
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
 * 活動領域セクション
 * - ソフトウェアエンジニアリング
 * - AI駆動開発の導入支援
 * - コンテンツ発信
 */
function ActivitiesSection() {
  const activities = [
    {
      icon: BriefcaseIcon,
      title: "ソフトウェアエンジニアリング",
      description:
        "フリーランスのソフトウェアエンジニアとして独立し、カナダから日本・北米の開発プロジェクトにフルリモートで参画してきました。インフラからアプリケーション開発まで、多様な開発実績を持ちます。",
    },
    {
      icon: RocketLaunchIcon,
      title: "AI駆動開発の導入支援",
      description:
        "法人向けにAI駆動開発の導入支援・コンサルティングを手がけます。開発環境の整備からチームへの定着支援まで、現場での実践ノウハウをもとにサポート。初心者から経験者まで、レベルに応じた教育が可能です。",
    },
    {
      icon: GlobeAltIcon,
      title: "コンテンツ発信",
      description:
        "YouTube・Udemy・X・Zenn・Qiitaなど、各種メディアでAI駆動開発の情報を発信しています。AI駆動開発やプログラミングがはじめての方にも分かりやすく解説しています。",
    },
  ]

  return (
    <div className="relative py-32">
      <Container className="relative">
        <Subheading>ACTIVITIES</Subheading>
        <Heading as="h2" className="mt-2 max-w-3xl">
          活動領域
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
      items: ["Ruby on Rails", "React", "Next.js", "Vue.js", "Laravel"],
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
    <div className="border-t border-gray-200 bg-gray-50 py-24 sm:py-32">
      <Container>
        <Subheading>TECH STACK</Subheading>
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
    <div className="relative py-32">
      <Container className="relative">
        <Subheading>SPEAKING</Subheading>
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
                  両ツールを日常的に併用している経験から、カスタムコマンドの柔軟性、サブエージェント機能、IDE拡張対応、コミュニティの充実度など、実務で本当に重要となる機能を徹底比較。多くのエンジニアの方に参加いただき、AI駆動開発のツール選定の参考になる内容を提供しました。現場経験を活かした実践的な観点が、参加者の方からも高い評価をいただきました。
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
    <div className="border-t border-gray-200 bg-gray-50 py-24 sm:py-32">
      <Container>
        <Subheading>MISSION</Subheading>
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
 * - 経歴
 * - 教育活動
 * - 活動領域
 * - 技術スタック
 * - 登壇実績
 * - ミッション
 * - フッター
 */
function FounderStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "とまだ（Tomada）",
    alternateName: ["増山友司", "Tomoshi Masuyama"],
    jobTitle: "ソフトウェアエンジニア / AI駆動開発の実践者・教育者",
    url: `${getSiteUrl()}/founder`,
    sameAs: [
      "https://x.com/muscle_coding",
      "https://www.youtube.com/@vibe-coding-studio",
      "https://github.com/tomada1114",
      "https://www.linkedin.com/in/tomoshi-masuyama-5b4b31199/",
      "https://qiita.com/tomada",
      "https://zenn.dev/tmasuyama1114",
      "https://note.com/tomada",
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "北海道大学大学院",
    },
    worksFor: {
      "@type": "Organization",
      name: "Vibe Coding Studio",
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export default function FounderPage() {
  return (
    <div className="overflow-hidden">
      <FounderStructuredData />
      <AsyncErrorBoundary>
        <HeroSection />
      </AsyncErrorBoundary>
      <main id="main-content">
        <AsyncErrorBoundary>
          <ExpertiseSection />
        </AsyncErrorBoundary>
        <AsyncErrorBoundary>
          <CareerSection />
        </AsyncErrorBoundary>
        <AsyncErrorBoundary>
          <EducationSection />
        </AsyncErrorBoundary>
        <AsyncErrorBoundary>
          <ActivitiesSection />
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
