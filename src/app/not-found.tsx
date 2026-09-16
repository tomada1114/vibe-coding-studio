import { Button } from "@/components/button"
import { Container } from "@/components/container"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="overflow-hidden">
      <main id="main-content">
        <Container className="py-24 sm:py-32">
          <div className="mx-auto max-w-lg text-center">
            <p className="text-8xl font-bold text-gray-200">404</p>
            <h1 className="mt-6 text-3xl font-bold text-gray-950 sm:text-4xl">
              迷子になりましたか？
            </h1>
            <p className="mt-4 text-base/7 text-gray-600">
              お探しのページは存在しないか、どこかへ旅立ってしまったようです。
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button href="/">ホームに戻る</Button>
            </div>
            <nav className="mt-12" aria-label="主要ページ">
              <p className="mb-4 text-sm font-medium text-gray-500">
                よくアクセスされるページ
              </p>
              <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
                <li>
                  <Link
                    href="/docs"
                    className="text-gray-700 hover:text-gray-950"
                  >
                    学習コース
                  </Link>
                </li>
                <li>
                  <Link
                    href="/community"
                    className="text-gray-700 hover:text-gray-950"
                  >
                    コミュニティ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/coupons"
                    className="text-gray-700 hover:text-gray-950"
                  >
                    クーポン
                  </Link>
                </li>
                <li>
                  <Link
                    href="/videos"
                    className="text-gray-700 hover:text-gray-950"
                  >
                    動画一覧
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </Container>
      </main>
    </div>
  )
}
