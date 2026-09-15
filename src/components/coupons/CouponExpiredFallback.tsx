import { Button } from "@/components/button"

/**
 * クーポン期限切れ時の共通フォールバック
 *
 * 月次バッチ更新の谷間でクーポンが存在しない場合でも、
 * ナビゲーション・フッター・一覧への導線を保ったページを表示する。
 */
export function CouponExpiredFallback() {
  return (
    <div className="overflow-hidden">
      <main className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-24 text-center">
        <h1 className="text-2xl font-semibold text-gray-950 sm:text-3xl">
          このクーポンは現在配布期間外です
        </h1>
        <p className="mt-4 text-base/7 text-gray-600">
          最新のクーポンは一覧をご覧ください。
        </p>
        <div className="mt-8">
          <Button href="/coupons">クーポン一覧を見る</Button>
        </div>
      </main>
    </div>
  )
}
