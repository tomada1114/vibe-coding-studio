"use client"

import { Button } from "@/components/catalyst/button"
import {
  calculateDiscountRate,
  formatDateToJST,
} from "@/lib/coupons/coupon-data"
import type { Coupon } from "@/types/coupon"
import { Check, Copy, ExternalLink, Gift } from "lucide-react"
import { useState } from "react"

interface PriceSectionProps {
  coupon: Coupon
}

export function PriceSection({ coupon }: PriceSectionProps) {
  const [copied, setCopied] = useState(false)

  const { courseInfo } = coupon
  const discountRate = calculateDiscountRate(
    courseInfo.originalPrice,
    coupon.discountPrice
  )
  const savings = courseInfo.originalPrice - coupon.discountPrice
  const formattedEndDate = formatDateToJST(coupon.endDateTime)

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(coupon.couponCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="overflow-hidden bg-white shadow-lg sm:rounded-2xl sm:ring-1 sm:ring-zinc-950/5">
      {/* 割引率ヘッダー */}
      <div className="bg-gradient-to-r from-red-500 to-pink-500 p-4 text-center">
        <div className="text-3xl font-bold text-white">{discountRate}% OFF</div>
        <div className="mt-1 text-sm font-bold text-white">
          サイト限定特別価格
        </div>
      </div>

      <div className="space-y-4 p-4 sm:space-y-6 sm:p-6">
        {/* 価格情報 */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-600">通常価格</span>
            <span className="text-lg text-zinc-500 line-through">
              ¥{courseInfo.originalPrice.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-zinc-950">
              特別価格
            </span>
            <span className="text-3xl font-bold text-zinc-950">
              ¥{coupon.discountPrice.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center justify-between rounded-lg bg-green-50 px-3 py-2">
            <span className="text-sm text-green-700">節約額</span>
            <span className="font-semibold text-green-800">
              ¥{savings.toLocaleString()}お得！
            </span>
          </div>
        </div>

        {/* 有効期限 */}
        <div className="text-center text-sm text-zinc-500">
          有効期限: {formattedEndDate}
        </div>

        {/* クーポンコード */}
        <div className="space-y-3">
          <div className="text-sm font-medium text-zinc-700">
            クーポンコード
          </div>
          <div className="relative">
            <div className="rounded-lg border-2 border-dashed border-blue-300 bg-blue-50 p-4 text-center">
              <div className="font-mono text-xl font-bold tracking-wider text-blue-900">
                {coupon.couponCode}
              </div>
            </div>
            <button
              onClick={handleCopyCode}
              className="absolute top-1/2 right-2 -translate-y-1/2 rounded-md bg-white p-2 shadow-sm transition-all hover:shadow-md"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4 text-zinc-600" />
              )}
            </button>
          </div>
          {copied && (
            <div className="text-center text-xs text-green-600">
              コピーしました！
            </div>
          )}
        </div>

        {/* CTAボタン */}
        <Button
          href={coupon.courseCouponUrl}
          target="_blank"
          rel="noopener noreferrer"
          color="blue"
          className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-base font-medium shadow-lg transition-all hover:scale-105"
        >
          <Gift className="h-5 w-5" />
          クーポン適用済みページへ
          <ExternalLink className="h-4 w-4" />
        </Button>

        {/* 保証情報 */}
        <div className="space-y-2 rounded-lg bg-zinc-50 p-3 sm:p-4">
          <div className="flex items-center gap-2 text-sm text-zinc-700">
            <Check className="h-4 w-4 text-green-600" />
            30日間の返金保証付き
          </div>
          <div className="flex items-center gap-2 text-sm text-zinc-700">
            <Check className="h-4 w-4 text-green-600" />
            永続的なアクセス権
          </div>
          <div className="flex items-center gap-2 text-sm text-zinc-700">
            <Check className="h-4 w-4 text-green-600" />
            修了証明書の発行
          </div>
        </div>
      </div>
    </div>
  )
}
