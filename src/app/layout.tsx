import { ErrorBoundary } from "@/components/error-boundary"
import { Footer } from "@/components/geist/footer"
import { Header } from "@/components/geist/header"
import { THEME_INIT_SCRIPT } from "@/components/geist/theme-toggle"
import { getSiteUrl } from "@/lib/seo/site-url"
import "@/styles/tailwind.css"
import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"
import type { Metadata } from "next"

/**
 * 和文グリフ（Noto Sans JP）。
 *
 * `next/font/google` は Noto Sans JP に `japanese` サブセットを公開しておらず
 * （指定できるのは cyrillic / latin / latin-ext / vietnamese のみ）、和文グリフを
 * self-host できない。Google Fonts の CSS2 スタイルシートは同じフォントを
 * unicode-range で約 120 スライスに分けて配信するため、ブラウザはページが実際に
 * 使うスライスだけを取得する。ここではそちらを直接読み込む。
 *
 * weight は本文 400 と見出し 500 のみ。`display=swap` で LCP をブロックしない。
 */
const NOTO_SANS_JP_HREF =
  "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500&display=swap"

const siteUrl = getSiteUrl()

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: "%s - Vibe Coding Studio",
    default: "とまだ（増山友司） - AI駆動開発の実践者・教育者",
  },
  description:
    "アメリカ在住のソフトウェアエンジニア。技術評論社から『Claude Codeで作って学ぶ AI駆動アプリ開発入門』を刊行。Udemy・YouTube でAI駆動開発を教えています。",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: siteUrl,
    siteName: "Vibe Coding Studio",
    title: "とまだ（増山友司） - AI駆動開発の実践者・教育者",
    description:
      "アメリカ在住のソフトウェアエンジニア。技術評論社から『Claude Codeで作って学ぶ AI駆動アプリ開発入門』を刊行。Udemy・YouTube でAI駆動開発を教えています。",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vibe Coding Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@muscle_coding",
    creator: "@muscle_coding",
    title: "とまだ（増山友司） - AI駆動開発の実践者・教育者",
    description:
      "アメリカ在住のソフトウェアエンジニア。技術評論社から『Claude Codeで作って学ぶ AI駆動アプリ開発入門』を刊行。Udemy・YouTube でAI駆動開発を教えています。",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
  // アイコンは app/icon.png・app/apple-icon.png のファイル規約で自動配信
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ja"
      data-theme="dark"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <head>
        {/* ハイドレーション前に data-theme を確定させ、初回描画のフラッシュを防ぐ */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="stylesheet" href={NOTO_SANS_JP_HREF} />
      </head>
      <body className="bg-bg text-text-primary antialiased">
        <Header />
        {/*
          未移行ページ（旧 Radiant デザイン）は自前の背景を持たず、body が白・文字が
          gray-950 である前提で書かれている。Geist Grid のダーク既定をそのまま被せると
          黒地に黒文字になるため、移行が完了するまでここで明るい地を敷いておく。
          Geist Grid へ移行済みのページは、自身のルート要素に `gg-surface` を付けて
          この地を上書きする（トップページ `src/app/page.tsx` が正典）。
        */}
        <div className="bg-white text-gray-950">
          <ErrorBoundary showDetails={process.env.NODE_ENV === "development"}>
            {children}
          </ErrorBoundary>
        </div>
        <Footer />
      </body>
    </html>
  )
}
