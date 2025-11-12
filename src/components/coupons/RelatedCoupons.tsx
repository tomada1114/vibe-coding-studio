"use client"

import { Heading } from "@/components/catalyst/heading"
import type { Coupon } from "@/types/coupon"
import { memo } from "react"
import { CouponCard } from "./CouponCard"

interface RelatedCouponsProps {
  coupons: Coupon[]
  title?: string
}

/**
 * 関連クーポンセクション
 * 詳細ページの一番下に表示する他のクーポンへの誘導カード
 * 一覧ページと同じ CouponCard コンポーネントを使用
 */
export const RelatedCoupons = memo(function RelatedCoupons({
  coupons,
  title = "他のおすすめクーポン",
}: RelatedCouponsProps) {
  if (coupons.length === 0) {
    return null
  }

  return (
    <section className="mt-16 border-t border-zinc-950/5 pt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Heading
          level={2}
          className="mb-8 text-center text-2xl font-bold text-zinc-950 sm:text-3xl"
        >
          {title}
        </Heading>

        {/* グリッドレイアウト（一覧ページと同じスタイル） */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-10">
          {coupons.map(coupon => (
            <CouponCard
              key={`${coupon.courseId}-${coupon.couponCode}`}
              coupon={coupon}
            />
          ))}
        </div>
      </div>
    </section>
  )
})
