import { ChevronRightIcon, MapIcon } from "@heroicons/react/24/outline"
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
            <MapIcon className="h-3.5 w-3.5" aria-hidden="true" />
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
          <ChevronRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}
