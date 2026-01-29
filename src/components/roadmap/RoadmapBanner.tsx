import { clsx } from 'clsx'
import Link from 'next/link'

interface RoadmapBannerProps {
  className?: string
}

export function RoadmapBanner({ className }: RoadmapBannerProps) {
  return (
    <div
      className={clsx(
        'relative overflow-hidden rounded-2xl border border-zinc-950/5 bg-white p-8 shadow-sm',
        className
      )}
    >
      {/* Decorative gradient blobs */}
      <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 opacity-50 blur-3xl"></div>
      <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 opacity-50 blur-3xl"></div>

      <div className="relative flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
        <div className="flex-1">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-700/10">
            <span>🗺️</span> 学習ガイド
          </div>
          <h2 className="mb-2 text-xl font-bold text-zinc-950">
            どこから学べばいい？
          </h2>
          <p className="text-sm leading-relaxed text-zinc-600">
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
