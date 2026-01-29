import { clsx } from "clsx"
import Link from "next/link"

interface RoadmapBannerProps {
  className?: string
}

export function RoadmapBanner({ className }: RoadmapBannerProps) {
  return (
    <div
      className={clsx(
        "rounded-2xl border border-gray-200 bg-white p-8 shadow-sm",
        className
      )}
    >
      <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
        <div className="flex-1">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-700/10">
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              />
            </svg>
            学習ガイド
          </div>
          <h2 className="mb-2 text-xl font-bold text-gray-950">
            どこから学べばいい？
          </h2>
          <p className="text-sm leading-relaxed text-gray-600">
            目的に応じた学習ロードマップで、最適な受講順序をチェック。
            <br className="hidden sm:inline" />
            初心者からプロフェッショナルまで、あなたに合った学習パスを見つけましょう。
          </p>
        </div>
        <Link
          href="/roadmap"
          className="inline-flex items-center gap-2 rounded-xl bg-gray-950 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-gray-800"
        >
          ロードマップを見る
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </div>
  )
}
