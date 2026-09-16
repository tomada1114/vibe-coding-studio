import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen gg-surface">
      <main
        id="main-content"
        className="gg-container flex min-h-screen items-center justify-center py-24"
      >
        <div className="gg-cell w-full max-w-[560px] border border-border text-center sm:p-10">
          <p className="gg-label">404</p>
          <h1 className="mt-4 text-[28px] leading-[1.3] font-medium tracking-[-0.015em] text-text-primary sm:text-[36px] sm:leading-[1.2]">
            ページが見つかりません
          </h1>
          <p className="mt-5 text-[16px] gg-prose-ja text-text-secondary">
            お探しのページは存在しないか、移動した可能性があります。
          </p>
          <Link href="/" className="mt-8 gg-btn gg-btn-outline">
            ホームに戻る
          </Link>
        </div>
      </main>
    </div>
  )
}
