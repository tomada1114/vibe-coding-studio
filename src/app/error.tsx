"use client"

import Link from "next/link"
import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.error("[app/error]", error)
    }
  }, [error])

  return (
    <div className="min-h-screen gg-surface">
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
            申し訳ありません。ページの表示中に問題が発生しました。
            <br />
            時間をおいて再度お試しください。
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
    </div>
  )
}
