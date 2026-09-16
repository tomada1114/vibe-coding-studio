import Link from "next/link"

export default function NotFound() {
  return (
    <div className="gg-surface min-h-screen">
      <main
        id="main-content"
        className="mx-auto flex min-h-screen max-w-[1120px] items-center justify-center px-4 py-24 sm:px-6 lg:px-8"
      >
        <div className="gg-cell border-border w-full max-w-[560px] border text-center sm:p-10">
          <p className="gg-label">404</p>
          <h1 className="text-text-primary mt-4 text-[28px] leading-[1.3] font-medium tracking-[-0.015em] sm:text-[36px] sm:leading-[1.2]">
            ページが見つかりません
          </h1>
          <p className="gg-prose-ja text-text-secondary mt-5 text-[16px]">
            お探しのページは存在しないか、移動した可能性があります。
          </p>
          <Link href="/" className="gg-btn gg-btn-outline mt-8">
            ホームに戻る
          </Link>
        </div>
      </main>
    </div>
  )
}
