import { ErrorBoundary } from "@/components/error-boundary"
import { getSiteUrl } from "@/lib/seo/site-url"
import "@/styles/tailwind.css"
import type { Metadata } from "next"

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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <head></head>
      <body className="text-gray-950 antialiased">
        <ErrorBoundary showDetails={process.env.NODE_ENV === "development"}>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  )
}
