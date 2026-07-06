import { ErrorBoundary } from "@/components/error-boundary"
import { getSiteUrl } from "@/lib/seo/site-url"
import "@/styles/tailwind.css"
import type { Metadata } from "next"
import { IBM_Plex_Mono, IBM_Plex_Sans_JP } from "next/font/google"

const plexSansJP = IBM_Plex_Sans_JP({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-plex-sans-jp",
})

const plexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-plex-mono",
})

const siteUrl = getSiteUrl()

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: "%s - Vibe Coding Studio",
    default: "Vibe Coding Studio - AI駆動開発コミュニティ",
  },
  description:
    "AI駆動開発を学ぶ仲間が集まり、情報を共有し合い、一緒に成長するDiscordコミュニティ",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: siteUrl,
    siteName: "Vibe Coding Studio",
    title: "Vibe Coding Studio - AI駆動開発コミュニティ",
    description:
      "AI駆動開発を学ぶ仲間が集まり、情報を共有し合い、一緒に成長するDiscordコミュニティ",
    images: [
      {
        url: "/vcs-logo-wide-transparent.png",
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
    title: "Vibe Coding Studio - AI駆動開発コミュニティ",
    description:
      "AI駆動開発を学ぶ仲間が集まり、情報を共有し合い、一緒に成長するDiscordコミュニティ",
    images: ["/vcs-logo-wide-transparent.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: "/vcs-logo-square-transparent.png",
    apple: "/vcs-logo-square-transparent.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" className={`${plexSansJP.variable} ${plexMono.variable}`}>
      <head></head>
      <body className="text-gray-950 antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-gray-950 focus:ring-2 focus:ring-gray-950/20"
        >
          メインコンテンツへスキップ
        </a>
        <ErrorBoundary showDetails={process.env.NODE_ENV === "development"}>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  )
}
