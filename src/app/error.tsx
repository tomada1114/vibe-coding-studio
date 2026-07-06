"use client"

import Link from "next/link"

/**
 * ルートエラー境界
 *
 * ページレンダリング中の未処理エラーを捕捉し、
 * 再試行とホームへの導線を提供する（ライトテーマ・日本語）。
 */
export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-6 py-24 text-center">
      <h1 className="text-3xl font-semibold tracking-tight text-gray-950 sm:text-4xl">
        エラーが発生しました
      </h1>
      <p className="mt-4 text-base/7 text-gray-600">
        申し訳ありません。ページの表示中に問題が発生しました。
        <br />
        時間をおいて再度お試しください。
      </p>
      <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-gray-950 px-6 py-2.5 text-sm font-medium text-white hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-950"
        >
          再試行する
        </button>
        <Link
          href="/"
          className="rounded-full bg-white px-6 py-2.5 text-sm font-medium text-gray-950 ring-1 ring-gray-300 hover:ring-gray-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-950"
        >
          ホームに戻る
        </Link>
      </div>
    </main>
  )
}
