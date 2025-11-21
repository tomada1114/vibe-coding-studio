import { CSPNonceProvider } from "@/components/csp-nonce-provider"
import { ErrorBoundary } from "@/components/error-boundary"
import "@/styles/tailwind.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    template: "%s - Vibe Coding Studio",
    default: "Vibe Coding Studio - AI駆動開発コミュニティ",
  },
  description:
    "AI駆動開発を学ぶ仲間が集まり、情報を共有し合い、一緒に成長するDiscordコミュニティ",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <head></head>
      <body className="text-gray-950 antialiased" suppressHydrationWarning>
        <CSPNonceProvider />
        <ErrorBoundary showDetails={process.env.NODE_ENV === "development"}>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  )
}
