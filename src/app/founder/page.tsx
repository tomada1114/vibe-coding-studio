import { AsyncErrorBoundary } from "@/components/error-boundary"
import { Footer } from "@/components/footer"
import { getSiteUrl } from "@/lib/seo/site-url"
import { clsx } from "clsx"
import type { Metadata } from "next"
import { JetBrains_Mono, Space_Grotesk } from "next/font/google"
import Image from "next/image"
import NextLink from "next/link"
import { FadeUp, RevealOnScroll } from "./founder-motion"

/**
 * このページだけ「夜の設計室」というダークエディトリアルの世界観で構成している。
 * サイト共通の Navbar / Heading / Subheading は明るい前提の配色のため使わず、
 * ページ内でローカルな見出し・ヘッダーを組み立てている。
 * ダークモード切り替えは行わないため dark: プレフィックスは使わず、色は明示指定する。
 */

const founderTitle = "とまだ - Founder"
const founderOgTitle = "とまだ - Founder | Vibe Coding Studio"
const founderDescription =
  "Vibe Coding Studioの主催者とまだ（増山友司 / Tomoshi Masuyama）のプロフィール。AI駆動開発の実践者・教育者。金融系メディアや運輸系システム、アメリカ企業の英語環境での開発など多様な実務経験をもとに、UdemyベストセラーコースやYouTubeでAI駆動開発の実践知を発信しています。"

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

// このページ限定のタイポグラフィ。グローバルの font 設定には手を入れない。
const spaceGrotesk = Space_Grotesk({
  weight: ["500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
})

const jetBrainsMono = JetBrains_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
})

/**
 * カラートークン（このページ限定）— "Blueprint Night"
 * 背景 #0B1020 / 面 #10182B / 罫線 #22304A
 * 文字 主 #F0F3F9 / 中 #B9C3D6 / 弱 #93A0B8
 * 主アクセント（青）テキスト用 #6FA8E8 / 発光装飾用 #4C8DFF
 * 副アクセント（ティール）#3ECF9B … 数値強調・技術カテゴリ・Mission のルール線のみ
 * 暖色シグナル（琥珀）#E3A857 … 経歴タイムラインの「現在」ノードと HEAD バッジのみ
 *
 * コントラスト比（背景 #0B1020 上、WCAG AA の小さい文字 4.5:1 基準）
 *   #F0F3F9 16.5:1 / #B9C3D6 10.7:1 / #93A0B8 7.2:1 / #6FA8E8 7.6:1 / #3ECF9B 9.6:1
 * 装飾専用の #8593AB（アウトライン文字）は 6.1:1 で、テキストに使っても基準を満たす明るさ。
 */
const mono = "font-[family-name:var(--font-jetbrains-mono)]"
const display = "font-[family-name:var(--font-space-grotesk)]"

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6FA8E8]"

const eyebrow = clsx(
  mono,
  "text-[11px] font-medium tracking-[0.28em] text-[#6FA8E8] uppercase"
)

const bodyText = "text-[15px]/7 text-[#B9C3D6]"

const strongMark =
  "font-semibold text-[#F0F3F9] underline decoration-[#6FA8E8]/60 decoration-1 underline-offset-4"

const textLink = clsx(
  mono,
  focusRing,
  "group inline-flex items-center gap-2 text-[11px] tracking-[0.22em] text-[#B9C3D6] uppercase transition-colors hover:text-[#6FA8E8]"
)

// SVG feTurbulence をそのまま背景に敷いて、紙面に極薄い粒子感を与える。
const noiseTexture =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)'/%3E%3C/svg%3E\")"

const profileLinks = [
  {
    name: "X",
    url: "https://x.com/muscle_coding",
  },
  {
    name: "GitHub",
    url: "https://github.com/tomada1114",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/tomoshi-masuyama-5b4b31199/",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@vibe-coding-studio",
  },
]

// 共通 Navbar と同じリンク構成（src/components/navbar.tsx）
const navLinks = [
  { href: "/", label: "ホーム" },
  { href: "/docs", label: "学習" },
  { href: "/videos", label: "動画" },
  { href: "/community", label: "コミュニティ" },
  { href: "/coupons", label: "クーポン" },
  { href: "/roadmap", label: "ロードマップ" },
  { href: "/founder", label: "運営者" },
]

function Shell({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={clsx(
        "mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-12",
        className
      )}
    >
      {children}
    </div>
  )
}

/**
 * founderページ専用のダークヘッダー
 * 共通 Navbar は明るい背景前提のため、ここでは使わない
 */
function FounderHeader() {
  return (
    <header className="relative z-10 border-b border-[#22304A]">
      <Shell className="flex flex-col gap-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
        <NextLink
          href="/"
          title="Home"
          className={clsx(focusRing, "self-start")}
        >
          <span
            className={clsx(
              display,
              "text-[13px] font-bold tracking-[0.24em] text-[#F0F3F9] uppercase transition-colors hover:text-[#6FA8E8]"
            )}
          >
            Vibe Coding Studio
          </span>
        </NextLink>

        <nav
          aria-label="サイト内メニュー"
          className="-mx-1 flex items-center gap-x-5 overflow-x-auto px-1 [scrollbar-width:none] sm:gap-x-6 [&::-webkit-scrollbar]:hidden"
        >
          {navLinks.map(({ href, label }) => {
            const active = href === "/founder"
            return (
              <NextLink
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={clsx(
                  focusRing,
                  "shrink-0 text-xs tracking-[0.12em] whitespace-nowrap transition-colors",
                  active
                    ? "text-[#6FA8E8]"
                    : "text-[#B9C3D6] hover:text-[#F0F3F9]"
                )}
              >
                {active && (
                  <span
                    aria-hidden="true"
                    className="mr-2 inline-block size-1 rounded-full bg-[#6FA8E8] align-middle"
                  />
                )}
                {label}
              </NextLink>
            )
          })}
        </nav>
      </Shell>
    </header>
  )
}

/**
 * ヒーロー背景の演出
 * ブループリント調の背景アート + 左からの遮蔽グラデーション
 * + 1px ヘアライングリッド + 粒子ノイズ + 下端フェード
 *
 * 背景アート（hero-bg.png）は右上にオーロラ、右下に回路トレースがあり、
 * 左 1/3 は暗く空いている。見出しはその左側に載る。
 */
function HeroAmbience() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {/* 画像の読み込み前でも背景色が途切れないようにする下地 */}
      <div className="absolute inset-0 bg-[#0B1020]" />
      <Image
        src="/founder/hero-bg.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* 左カラムのテキスト可読性を確保する遮蔽グラデーション（左で不透明・右で透明） */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(100deg, #0B1020 0%, rgba(11,16,32,0.94) 28%, rgba(11,16,32,0.74) 50%, rgba(11,16,32,0.34) 78%, rgba(11,16,32,0.12) 100%)",
        }}
      />
      {/* モバイルは1カラムでテキストが画像全体に重なるため、全面をもう一段落とす */}
      <div className="absolute inset-0 bg-[#0B1020]/55 lg:hidden" />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, #22304A 1px, transparent 1px), linear-gradient(to bottom, #22304A 1px, transparent 1px)",
          backgroundSize: "88px 88px",
          maskImage:
            "radial-gradient(75% 55% at 50% 0%, black 0%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(75% 55% at 50% 0%, black 0%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{ backgroundImage: noiseTexture }}
      />
      {/* 下端を背景色へ落として次セクションと滑らかに繋ぐ */}
      <div
        className="absolute inset-x-0 bottom-0 h-48"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(11,16,32,0) 0%, rgba(11,16,32,0.65) 55%, #0B1020 100%)",
        }}
      />
    </div>
  )
}

/**
 * セクション背景に敷くごく薄い放射グロー。
 * 青（#4C8DFF）とティール（#3ECF9B）を交互に、位置も入れ替えながらセクションごとに
 * 1つ配置して、単色ダークの平坦さを消す。不透明度は 4.5〜6% 程度に留める。
 */
const glowBlueTopLeft =
  "bg-[radial-gradient(55%_60%_at_10%_0%,rgba(76,141,255,0.06),transparent_70%)]"
const glowTealBottomRight =
  "bg-[radial-gradient(55%_60%_at_90%_100%,rgba(62,207,155,0.05),transparent_70%)]"
const glowBlueTopRight =
  "bg-[radial-gradient(55%_60%_at_88%_4%,rgba(76,141,255,0.055),transparent_70%)]"
const glowTealBottomLeft =
  "bg-[radial-gradient(55%_60%_at_12%_100%,rgba(62,207,155,0.045),transparent_70%)]"

/**
 * 装飾専用のグローレイヤー。
 * 親に isolate を置き、-z-10 で本文の下・ページ背景の上に敷く。
 */
function SectionGlow({ tone }: { tone: string }) {
  return (
    <div
      aria-hidden="true"
      className={clsx("pointer-events-none absolute inset-0 -z-10", tone)}
    />
  )
}

/**
 * セクションの共通レイアウト
 * 左に等幅ラベル + 見出し、右に本文という非対称2カラム
 */
function Section({
  label,
  title,
  intro,
  glow,
  children,
}: {
  label: string
  title: string
  intro?: string
  glow: string
  children: React.ReactNode
}) {
  return (
    <section className="relative isolate border-t border-[#22304A] py-20 sm:py-24 lg:py-28">
      <SectionGlow tone={glow} />
      <Shell>
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:sticky lg:top-12 lg:col-span-4">
            <p className={clsx(eyebrow, "flex items-center gap-3")}>
              <span aria-hidden="true" className="h-px w-6 bg-[#6FA8E8]" />
              {label}
            </p>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-[#F0F3F9] sm:text-4xl">
              {title}
            </h2>
            {intro && (
              <p className="mt-5 max-w-md text-sm/7 text-[#B9C3D6]">{intro}</p>
            )}
          </div>
          <div className="lg:col-span-8">{children}</div>
        </div>
      </Shell>
    </section>
  )
}

function ArrowLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  const isExternal = href.startsWith("http")
  const className = clsx(textLink, "mt-6")
  const content = (
    <>
      <span className="border-b border-transparent pb-0.5 transition-colors group-hover:border-[#6FA8E8]">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="text-[#93A0B8] transition-all group-hover:translate-x-0.5 group-hover:text-[#6FA8E8]"
      >
        →
      </span>
    </>
  )

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {content}
      </a>
    )
  }

  return (
    <NextLink href={href} className={className}>
      {content}
    </NextLink>
  )
}

/**
 * ヒーローセクション
 * - 等幅のアイブロウ
 * - 和文の巨大表示 + アウトラインの欧文表示
 * - 肩書き・紹介文・等幅のSNSリンク
 * - ヘアライン枠に載せたプロフィール写真
 */
function HeroSection() {
  return (
    <div className="relative isolate overflow-hidden">
      <HeroAmbience />
      <FounderHeader />
      <Shell className="relative pt-16 pb-20 sm:pt-20 sm:pb-28 lg:pt-24 lg:pb-36">
        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-12 lg:gap-16">
          {/* 左: テキスト */}
          <div className="lg:col-span-7">
            <FadeUp>
              <p className={clsx(eyebrow, "flex items-center gap-3")}>
                <span aria-hidden="true" className="h-px w-8 bg-[#6FA8E8]" />
                Founder — Vibe Coding Studio
              </p>
            </FadeUp>

            <FadeUp delay={0.06}>
              <h1 className="mt-8">
                <span className="block text-6xl leading-[1.05] font-bold tracking-tight text-[#F0F3F9] sm:text-7xl lg:text-8xl">
                  とまだ
                </span>
                <span
                  className={clsx(
                    display,
                    "mt-4 block text-3xl font-bold tracking-[0.22em] text-transparent uppercase sm:text-4xl lg:text-5xl"
                  )}
                  style={{ WebkitTextStroke: "1px #8593AB" }}
                >
                  Tomada
                </span>
              </h1>
            </FadeUp>

            <FadeUp delay={0.1}>
              <p
                className={clsx(
                  mono,
                  "mt-7 text-xs tracking-[0.2em] text-[#93A0B8]"
                )}
              >
                増山 友司 / Tomoshi Masuyama
              </p>
            </FadeUp>

            <FadeUp delay={0.14}>
              <p className="mt-9 text-lg/8 font-medium text-[#F0F3F9] sm:text-xl/9">
                AI駆動開発の実践者・教育者
                <br />
                アメリカ在住のソフトウェアエンジニア
              </p>
            </FadeUp>
            {/* TODO: 書籍発売の告知解禁後に有効化
            <p className="mt-4 text-base/7 font-medium text-gray-950/75">
              『作って学ぶ Claude CodeによるAI駆動アプリ開発入門』（技術評論社）著者
            </p>
            */}

            <FadeUp delay={0.18}>
              <p className={clsx(bodyText, "mt-7 max-w-2xl")}>
                SIerでのネットワーク・サーバ基盤構築を経てWebアプリケーション開発に転身後、フリーランスのソフトウェアエンジニアとして独立。
                月間数百万ユーザー規模の金融系メディアや運輸系システムの開発、アメリカ企業の開発プロジェクト、法人向けのAI駆動開発導入支援など、インフラからアプリケーションまで幅広い開発を最前線で担ってきました。
                現在はアメリカを拠点に、Claude
                Codeをはじめとする最新のAIツールを開発の主力に据え、OSS・個人開発での実践と、YouTube・Udemy・コミュニティを通じた教育・発信に注力しています。
              </p>
            </FadeUp>

            <FadeUp delay={0.22}>
              <ul className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
                {profileLinks.map(link => (
                  <li key={link.name}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`とまだの${link.name}プロフィールを見る`}
                      className={textLink}
                    >
                      <span className="border-b border-transparent pb-0.5 transition-colors group-hover:border-[#6FA8E8]">
                        {link.name}
                      </span>
                      <span
                        aria-hidden="true"
                        className="text-[#93A0B8] transition-colors group-hover:text-[#6FA8E8]"
                      >
                        ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </FadeUp>
          </div>

          {/* 右: プロフィール写真 */}
          <FadeUp delay={0.12} className="lg:col-span-5">
            <figure className="group mx-auto w-full max-w-sm lg:mr-0 lg:ml-auto">
              <div className="relative aspect-square overflow-hidden border border-[#22304A] bg-[#10182B]">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[radial-gradient(65%_60%_at_50%_30%,rgba(76,141,255,0.12),transparent_70%)]"
                />
                <Image
                  src="/tomada.png"
                  alt="とまだ（Tomada）のプロフィール画像"
                  fill
                  className="object-contain p-5 brightness-[0.92] contrast-[1.08] grayscale transition duration-700 ease-out group-hover:brightness-100 group-hover:grayscale-0"
                  sizes="(max-width: 1024px) 80vw, 32vw"
                  priority
                />
              </div>
              <figcaption
                className={clsx(
                  mono,
                  "mt-4 flex items-center justify-between gap-4 text-[10px] tracking-[0.2em] text-[#93A0B8] uppercase"
                )}
              >
                <span>とまだ / Tomada</span>
                <span>Based in the U.S.</span>
              </figcaption>
            </figure>
          </FadeUp>
        </div>
      </Shell>
    </div>
  )
}

/**
 * AI駆動開発のスペシャリストセクション
 * アイコンは置かず、ヘアラインで区切った非対称2カラムのテキストブロックで構成
 */
function ExpertiseSection() {
  const expertiseBlocks = [
    {
      title: "日々の実践と情報発信",
      body: (
        <>
          <p>
            <strong className={strongMark}>
              Claude Code、Codex、Cursor、GitHub Copilot
            </strong>
            など最新のAIツールを日常的に使いこなし、実務での活用ノウハウを蓄積。
            YouTubeやコミュニティで、失敗も含めた検証プロセスをリアルタイムに共有しています。
          </p>
          <p>
            AI駆動開発は単なるコード補完ではありません。設計から実装、テストまで、
            <strong className={strongMark}>
              AIと協働することで開発速度と品質を両立
            </strong>
            できる、新しい開発のあり方を実践しています。
          </p>
        </>
      ),
    },
    {
      title: "現場と個人開発での実現",
      body: (
        <>
          <p>
            大規模な金融系メディアや運輸系システムなど、
            <strong className={strongMark}>
              多様な開発現場でAI駆動開発を実践
            </strong>
            。個人開発でも、プログラミング学習プラットフォーム「Learning
            Next」をはじめ、複数のWebアプリを短期間で構築・運営してきました。
          </p>
          <p>
            未経験の技術領域でも、AIの力を借りることで即座に挑戦可能。
            実際にスマホアプリ開発の経験がない状態から、アプリを開発してストア公開まで実現しました。
          </p>
        </>
      ),
    },
    {
      title: "アメリカ企業・英語環境での開発経験",
      body: (
        <>
          <p>
            カナダ在住時には、
            <strong className={strongMark}>
              アメリカに本社を置く企業の開発プロジェクトに参画
            </strong>
            。開発に関わるコミュニケーションがすべて英語という環境で、フルリモートの開発を担いました。
          </p>
          <p>
            経験のなかった技術スタックの案件でしたが、
            <strong className={strongMark}>
              AI駆動開発を武器に短期間でキャッチアップし、半年間のプロジェクトを完遂
            </strong>
            。言語や技術スタックが変わっても、AIを活用して素早く適応できることを実証した経験です。
          </p>
        </>
      ),
    },
  ]

  return (
    <Section
      label="Expertise"
      title="AI駆動開発のスペシャリスト"
      glow={glowBlueTopLeft}
    >
      <div className="divide-y divide-[#22304A] border-y border-[#22304A]">
        {expertiseBlocks.map((block, index) => (
          <article
            key={block.title}
            className="grid grid-cols-1 gap-5 py-10 sm:grid-cols-5 sm:gap-10"
          >
            <div className="sm:col-span-2">
              <span className={clsx(eyebrow, "block")}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-xl font-bold tracking-tight text-[#F0F3F9]">
                {block.title}
              </h3>
            </div>
            <div className={clsx(bodyText, "space-y-5 sm:col-span-3")}>
              {block.body}
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}

/**
 * 年とタイトルから決定論的に commit hash 風の16進トークンを作る（FNV-1a）
 * 見た目のためのトークンなので暗号強度は不要。SSR と CSR で必ず同じ値になることだけが要件。
 */
function commitToken(seed: string) {
  let hash = 0x811c9dc5
  for (let index = 0; index < seed.length; index += 1) {
    hash ^= seed.charCodeAt(index)
    hash = Math.imul(hash, 0x01000193)
  }
  return (hash >>> 0).toString(16).padStart(8, "0").slice(0, 7)
}

/**
 * タイムラインのレールは全体で上（青 #4C8DFF）→ 下（ティール #3ECF9B）の
 * 1本のグラデーションに見せたい。実装上は項目ごとに分割された線なので、
 * 2色を等間隔で補間した中間色を持っておき、各区間で隣り合う2色を繋ぐ。
 */
const railStops = [
  "#4C8DFF",
  "#499AEB",
  "#46A7D7",
  "#44B5C3",
  "#41C2AF",
  "#3ECF9B",
]

/**
 * 経歴セクション
 * - git log 風のタイムライン（縦レール + commit hash 風トークン）
 * - 「現在」のノードだけ琥珀色で発光させる（ページ内で唯一の暖色シグナル）
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
      title: "フリーランスとして独立",
      description:
        "金融系メディアや運輸系システムの開発、大規模システムのリプレイスなど、多様な開発を経験。法人向けのAI駆動開発導入支援・コンサルティングも手がけた。",
    },
    {
      year: "2025",
      title: "アメリカ企業の開発プロジェクトに参画",
      description:
        "カナダからの応募をきっかけに、アメリカに本社を置く企業と業務委託契約を締結。英語でのコミュニケーションのもと、未経験の技術スタックにもAI駆動開発で対応し、半年間のプロジェクトを完遂した。",
    },
    {
      year: "現在",
      title: "カナダを経てアメリカへ拠点を移す",
      description:
        "カナダ在住時は日本・北米の開発プロジェクトにフルリモートで参画。現在はアメリカを拠点に、OSS・個人開発での実践と、Udemy・YouTube・コミュニティを通じたAI駆動開発の教育・発信に注力している。",
    },
  ]

  return (
    <Section label="Career" title="経歴" glow={glowTealBottomRight}>
      <ol>
        {careerTimeline.map((item, index) => {
          const isCurrent = item.year === "現在"
          return (
            <li key={item.year} className="flex gap-5 sm:gap-8">
              <div className="w-11 shrink-0 pt-px text-right sm:w-14">
                <span
                  className={clsx(
                    mono,
                    "text-sm tracking-[0.1em]",
                    isCurrent ? "text-[#E3A857]" : "text-[#F0F3F9]"
                  )}
                >
                  {item.year}
                </span>
              </div>

              <div
                aria-hidden="true"
                className="relative flex w-2 shrink-0 flex-col items-center"
              >
                <span
                  className={clsx(
                    "mt-1.5 size-2 shrink-0 rounded-full",
                    isCurrent
                      ? "bg-[#E3A857] shadow-[0_0_0_4px_rgba(227,168,87,0.14),0_0_16px_rgba(227,168,87,0.55)]"
                      : "bg-[#6FA8E8]"
                  )}
                />
                {!isCurrent && (
                  <span
                    className="mt-2 w-px flex-1 opacity-60"
                    style={{
                      backgroundImage: `linear-gradient(to bottom, ${railStops[index]}, ${railStops[index + 1] ?? railStops[railStops.length - 1]})`,
                    }}
                  />
                )}
              </div>

              <RevealOnScroll className={isCurrent ? undefined : "pb-12"}>
                <p
                  className={clsx(
                    mono,
                    "flex items-center gap-3 text-[11px] tracking-[0.18em]"
                  )}
                >
                  <span
                    className={isCurrent ? "text-[#6FA8E8]" : "text-[#93A0B8]"}
                  >
                    {commitToken(`${item.year}${item.title}`)}
                  </span>
                  {isCurrent && (
                    <span className="border border-[#E3A857]/40 px-1.5 py-0.5 text-[10px] text-[#E3A857] uppercase">
                      Head
                    </span>
                  )}
                </p>
                <h3 className="mt-3 text-lg font-bold tracking-tight text-[#F0F3F9] sm:text-xl">
                  {item.title}
                </h3>
                <p className={clsx(bodyText, "mt-3 max-w-2xl")}>
                  {item.description}
                </p>
              </RevealOnScroll>
            </li>
          )
        })}
      </ol>
    </Section>
  )
}

/**
 * 教育活動セクション
 * カードをやめ、ヘアラインで区切った行リストで構成
 */
function EducationSection() {
  const educationActivities = [
    // TODO: 書籍発売の告知解禁後に有効化（発売情報ページへのリンクも追加する）
    // {
    //   title: "書籍執筆",
    //   description:
    //     "技術評論社より『作って学ぶ Claude CodeによるAI駆動アプリ開発入門』を出版。Claude Codeを使ったAI駆動開発の進め方を、実際にアプリを作りながら体系的に学べる一冊です。開発現場とコンテンツ制作で培った実践知を凝縮しています。",
    // },
    {
      title: "Udemy講師",
      description: (
        <>
          AI駆動開発分野で複数のベストセラーコースを運営し、受講生は
          <span className={clsx(mono, "text-[#3ECF9B]")}>累計1万人</span>
          を超えます。Claude Code、Codex、Cursor
          など最新AIツールの実践的な使い方を解説しています。プログラミング未経験の方でも分かりやすく解説していますので、AI駆動開発の基礎から実践までを学べます。
        </>
      ),
      link: {
        text: "コース一覧を見る（クーポン付き）",
        url: "/coupons",
      },
    },
    {
      title: "YouTube運営",
      description:
        "最新のAI駆動開発ノウハウを配信。Claude Code や Codex を使った開発方法や、AI駆動開発のベストプラクティスを解説しています。現場での実践ノウハウも含めて紹介していますので、ツールの使い方だけでなく、実際の開発現場での活用方法も学べます。",
      link: {
        text: "チャンネルを見る",
        url: "https://www.youtube.com/@vibe-coding-studio",
      },
    },
    {
      title: "元プログラミングスクール講師",
      description:
        "メンターとして数多くの未経験者を指導し、カリキュラム執筆も担当。初心者の挫折ポイントを熟知し、技術的な内容を分かりやすく伝えることを得意としています。常に最新の情報を追いながらも、初心者の方が分かりやすいよう、丁寧すぎるぐらいに解説することを心がけています。",
    },
  ]

  return (
    <Section
      label="Education"
      title="教育活動"
      glow={glowBlueTopRight}
      intro="プログラミング初心者から経験者まで、幅広い層に向けて AI駆動開発の知識を共有しています。"
    >
      <div className="divide-y divide-[#22304A] border-y border-[#22304A]">
        {educationActivities.map((activity, index) => (
          <article
            key={activity.title}
            className="grid grid-cols-1 gap-5 py-10 sm:grid-cols-12 sm:gap-10"
          >
            <div className="sm:col-span-4">
              <span className={clsx(eyebrow, "block")}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-xl font-bold tracking-tight text-[#F0F3F9]">
                {activity.title}
              </h3>
            </div>
            <div className="sm:col-span-8">
              <p className={bodyText}>{activity.description}</p>
              {activity.link && (
                <ArrowLink href={activity.link.url}>
                  {activity.link.text}
                </ArrowLink>
              )}
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}

/**
 * 活動領域セクション
 * アイコンを使わず、等幅ラベル付きの3カラムテキストで構成
 */
function ActivitiesSection() {
  const activities = [
    {
      label: "Engineering",
      title: "ソフトウェアエンジニアリング",
      description:
        "フリーランスのソフトウェアエンジニアとして、日本・北米の開発プロジェクトにフルリモートで参画してきました。インフラからアプリケーション開発まで、多様な開発実績を持ちます。現在はOSS・個人開発を中心に、AI駆動開発の実践を続けています。",
    },
    {
      label: "Enablement",
      title: "AI駆動開発の導入支援",
      description:
        "法人向けにAI駆動開発の導入支援・コンサルティングを手がけてきました。開発環境の整備からチームへの定着支援まで、現場での実践ノウハウをもとにサポートした実績があります。初心者から経験者まで、レベルに応じた教育を得意としています。",
    },
    {
      label: "Publishing",
      title: "コンテンツ発信",
      description:
        "YouTube・Udemy・X・Zenn・Qiitaなど、各種メディアでAI駆動開発の情報を発信しています。AI駆動開発やプログラミングがはじめての方にも分かりやすく解説しています。",
    },
  ]

  return (
    <Section label="Activities" title="活動領域" glow={glowTealBottomLeft}>
      <div className="grid grid-cols-1 gap-px bg-[#22304A] sm:grid-cols-3">
        {activities.map((activity, index) => (
          <div
            key={activity.title}
            className="bg-[#0B1020] py-8 sm:px-7 sm:py-0 sm:first:pl-0 sm:last:pr-0"
          >
            <p className={clsx(eyebrow, "flex items-center gap-2")}>
              <span className="text-[#6FA8E8]">
                {String(index + 1).padStart(2, "0")}
              </span>
              {activity.label}
            </p>
            <h3 className="mt-4 text-lg font-bold tracking-tight text-[#F0F3F9]">
              {activity.title}
            </h3>
            <p className={clsx(bodyText, "mt-4")}>{activity.description}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}

/**
 * 技術スタックセクション
 * カテゴリごとに等幅のトークンチップを並べる
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
    <Section label="Tech Stack" title="技術スタック" glow={glowBlueTopLeft}>
      <div className="divide-y divide-[#22304A] border-y border-[#22304A]">
        {techStacks.map(stack => (
          <div
            key={stack.category}
            className="grid grid-cols-1 gap-4 py-8 sm:grid-cols-4 sm:gap-10"
          >
            <h3 className="text-sm font-semibold tracking-wide text-[#3ECF9B] sm:col-span-1">
              {stack.category}
            </h3>
            <ul className="flex flex-wrap gap-2 sm:col-span-3">
              {stack.items.map(item => (
                <li
                  key={item}
                  className={clsx(
                    mono,
                    "border border-[#22304A] bg-[#10182B] px-2.5 py-1 text-[11px] tracking-[0.08em] text-[#B9C3D6] transition-colors hover:border-[#6FA8E8]"
                  )}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}

/**
 * 取得資格セクション
 */
function CertificationsSection() {
  const certifications = [
    "AWS認定ソリューションアーキテクト - プロフェッショナル",
    "AWS認定DevOpsエンジニア - プロフェッショナル",
    "AWS認定セキュリティ - 専門知識",
    "CCNP Routing and Switching",
    "情報処理安全確保支援士試験 合格",
    "応用情報技術者",
    "TOEIC 910点",
  ]

  return (
    <Section
      label="Certifications"
      title="取得資格"
      glow={glowTealBottomRight}
      intro="インフラ・セキュリティ領域を中心に、これまでに取得してきた資格・認定です。"
    >
      <ul className="grid grid-cols-1 gap-x-10 border-t border-[#22304A] sm:grid-cols-2">
        {certifications.map(item => (
          <li
            key={item}
            className="flex gap-3 border-b border-[#22304A] py-3.5 text-sm/6 text-[#B9C3D6]"
          >
            <span aria-hidden="true" className={clsx(mono, "text-[#93A0B8]")}>
              —
            </span>
            {item}
          </li>
        ))}
      </ul>
    </Section>
  )
}

/**
 * 登壇実績セクション
 */
function SpeakingSection() {
  return (
    <Section label="Speaking" title="登壇実績" glow={glowBlueTopRight}>
      <article className="border-y border-[#22304A] py-10">
        <p className={eyebrow}>2025 · Online</p>
        <h3 className="mt-4 text-2xl font-bold tracking-tight text-[#F0F3F9]">
          東京AI祭 プレイベント（2025年）
        </h3>
        <p className="mt-3 text-base font-medium text-[#F0F3F9]/80">
          Claude Code vs Codex CLI 徹底比較（オンライン）
        </p>
        <p className={clsx(bodyText, "mt-6 max-w-2xl")}>
          両ツールを日常的に併用している経験から、カスタムコマンドの柔軟性、サブエージェント機能、IDE拡張対応、コミュニティの充実度など、実務で本当に重要となる機能を徹底比較。多くのエンジニアの方に参加いただき、AI駆動開発のツール選定の参考になる内容を提供しました。現場経験を活かした実践的な観点が、参加者の方からも高い評価をいただきました。
        </p>
        <ArrowLink href="https://ai-fest-tokyo.connpass.com/event/369543/">
          過去のイベント詳細を見る
        </ArrowLink>
      </article>
    </Section>
  )
}

/**
 * ミッションセクション
 * 中央寄せの静かな結び
 */
function MissionSection() {
  return (
    <section className="relative isolate border-t border-[#22304A] py-24 sm:py-32">
      <SectionGlow tone={glowTealBottomLeft} />
      <Shell className="text-center">
        <p className={clsx(eyebrow, "flex items-center justify-center gap-3")}>
          <span aria-hidden="true" className="h-px w-6 bg-[#3ECF9B]" />
          Mission
        </p>
        <h2 className="mt-5 text-3xl font-bold tracking-tight text-[#F0F3F9] sm:text-4xl">
          ミッション
        </h2>

        <span
          aria-hidden="true"
          className="mx-auto mt-14 block h-px w-12 bg-[#3ECF9B]"
        />
        <blockquote className="mx-auto mt-8 max-w-2xl text-2xl/10 font-medium text-balance text-[#F0F3F9] sm:text-3xl/12">
          「プログラミングとAIを通じて、
          <br />
          より多くの人が自由な働き方を
          <br />
          実現できる社会を作る」
        </blockquote>
        <p className={clsx(bodyText, "mx-auto mt-10 max-w-2xl")}>
          技術的な挑戦を楽しみながら、AIの力を借りてより創造的な開発を実現。
          <br />
          誰もが
          <strong className={clsx(strongMark, "mx-1")}>「経済的自由」</strong>と
          <strong className={clsx(strongMark, "mx-1")}>「働き方の自由」</strong>
          を手に入れられる
          <br />
          仕組みづくりに貢献していきます。
        </p>
      </Shell>
    </section>
  )
}

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
      "https://note.com/muscle_coding",
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

/**
 * Founderページ
 * - ヒーローセクション
 * - AI駆動開発のスペシャリスト
 * - 経歴
 * - 教育活動
 * - 活動領域
 * - 技術スタック / 取得資格
 * - 登壇実績
 * - ミッション
 * - フッター
 */
export default function FounderPage() {
  return (
    <div
      className={clsx(
        spaceGrotesk.variable,
        jetBrainsMono.variable,
        "bg-[#0B1020] text-[#F0F3F9] selection:bg-[#6FA8E8]/25 selection:text-[#F0F3F9]"
      )}
    >
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
          <CertificationsSection />
        </AsyncErrorBoundary>
        <AsyncErrorBoundary>
          <SpeakingSection />
        </AsyncErrorBoundary>
        <AsyncErrorBoundary>
          <MissionSection />
        </AsyncErrorBoundary>
      </main>
      {/* Footer 内の w-screen 装飾がスクロールバー幅ぶんはみ出すため、ここだけ clip する
          （ルートに overflow-hidden を置くと本文セクションの sticky が無効化される） */}
      <div className="overflow-hidden">
        <AsyncErrorBoundary>
          <Footer />
        </AsyncErrorBoundary>
      </div>
    </div>
  )
}
