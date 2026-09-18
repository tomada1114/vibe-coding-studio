"use client"

import { THEME_INIT_SCRIPT } from "@/components/geist/theme-toggle"
import "@/styles/tailwind.css"
import Link from "next/link"
import { useEffect } from "react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.error("[app/global-error]", error)
    }
  }, [error])

  return (
    <html lang="ja" data-theme="dark" suppressHydrationWarning>
      <head>
        {/* root layout が利用できない場合も、初回描画前にテーマを確定させる */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="gg-surface antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-10 focus:rounded-[6px] focus:border focus:border-border focus:bg-bg focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-text-primary"
        >
          メインコンテンツへスキップ
        </a>
        <main
          id="main-content"
          className="gg-container flex min-h-screen items-center justify-center py-24"
        >
          <div className="gg-cell w-full max-w-[560px] border border-border text-center sm:p-10">
            <p className="gg-label">ERROR</p>
            <h1 className="mt-4 text-[28px] leading-[1.3] font-medium tracking-[-0.015em] text-text-primary sm:text-[36px] sm:leading-[1.2]">
              エラーが発生しました
            </h1>
            <p className="mt-5 text-[16px] gg-prose-ja text-text-secondary">
              申し訳ありません。サイトの表示中に問題が発生しました。
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={reset}
                className="gg-btn gg-btn-outline"
              >
                再試行する
              </button>
              <Link href="/" className="gg-btn gg-btn-outline">
                ホームに戻る
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  )
}
