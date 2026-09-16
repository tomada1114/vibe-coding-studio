"use client"

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
      {/* root layout が利用できないため、テーマ初期化なしでも表示を安定させる */}
      <body className="bg-bg text-text-primary antialiased">
        <main
          id="main-content"
          className="mx-auto flex min-h-screen max-w-[1120px] items-center justify-center px-4 py-24 sm:px-6 lg:px-8"
        >
          <div className="gg-cell border-border w-full max-w-[560px] border text-center sm:p-10">
            <p className="gg-label">ERROR</p>
            <h1 className="text-text-primary mt-4 text-[28px] leading-[1.3] font-medium tracking-[-0.015em] sm:text-[36px] sm:leading-[1.2]">
              エラーが発生しました
            </h1>
            <p className="gg-prose-ja text-text-secondary mt-5 text-[16px]">
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
