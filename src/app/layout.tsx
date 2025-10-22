import { CSPNonceProvider } from "@/components/csp-nonce-provider"
import { ErrorBoundary } from "@/components/error-boundary"
import "@/styles/tailwind.css"
import type { Metadata } from "next"
import localFont from "next/font/local"

// Configure Switzer font with local files
const switzer = localFont({
  src: [
    {
      path: "../../public/fonts/switzer-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/switzer-500.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/switzer-600.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/switzer-700.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-switzer",
  preload: true,
})

export const metadata: Metadata = {
  title: {
    template: "%s - Vibe Coding Studio",
    default: "Vibe Coding Studio - AI駆動開発コミュニティ",
  },
  description:
    "AI駆動開発を学ぶ仲間が集まり、とまだの最新検証を見ながら一緒に成長するDiscordコミュニティ",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" className={switzer.variable}>
      <head></head>
      <body className={`${switzer.className} text-gray-950 antialiased`}>
        <CSPNonceProvider />
        <ErrorBoundary showDetails={process.env.NODE_ENV === "development"}>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  )
}
