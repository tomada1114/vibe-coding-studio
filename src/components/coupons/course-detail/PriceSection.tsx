'use client'

import { useState } from 'react'
import { Gift, Clock, Copy, Check, ExternalLink, AlertCircle } from 'lucide-react'
import type { Coupon } from '@/types/coupon'
import { calculateDiscountRate, formatDateToJST } from '@/lib/coupons/coupon-data'
import { Button } from '@/components/catalyst/button'

interface PriceSectionProps {
  coupon: Coupon
}

export function PriceSection({ coupon }: PriceSectionProps) {
  const [copied, setCopied] = useState(false)
  const { courseInfo } = coupon
  const discountRate = calculateDiscountRate(courseInfo.originalPrice, coupon.discountPrice)
  const savings = courseInfo.originalPrice - coupon.discountPrice
  const formattedEndDate = formatDateToJST(coupon.endDateTime)

  // Calculate days remaining and check if expired
  const now = new Date()
  const endDate = new Date(coupon.endDateTime)
  const daysRemaining = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  const isExpired = daysRemaining < 0

  const handleCopyCode = async () => {
    if (!isExpired) {
      await navigator.clipboard.writeText(coupon.couponCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // 期限切れの場合の表示
  if (isExpired) {
    return (
      <div className="overflow-hidden bg-white shadow-lg sm:rounded-2xl sm:ring-1 sm:ring-zinc-950/5">
        {/* 期限切れヘッダー */}
        <div className="bg-gradient-to-r from-zinc-400 to-zinc-500 p-4 text-center">
          <div className="text-2xl font-bold text-white">クーポン期限切れ</div>
          <div className="mt-1 text-sm text-white/90">現在このクーポンはご利用いただけません</div>
        </div>

        <div className="space-y-4 p-4 sm:space-y-6 sm:p-6">
          {/* 期限切れメッセージ */}
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 sm:p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-amber-900">
                  クーポンの有効期限が終了しました
                </p>
                <p className="text-xs text-amber-700">終了日: {formattedEndDate}</p>
              </div>
            </div>
          </div>

          {/* 通常価格の表示 */}
          <div className="rounded-lg bg-zinc-50 p-3 sm:p-4">
            <div className="text-center">
              <div className="text-sm text-zinc-600">通常価格</div>
              <div className="mt-1 text-2xl font-bold text-zinc-950">
                ¥{courseInfo.originalPrice.toLocaleString()}
              </div>
            </div>
          </div>

          {/* 通常購入ボタン */}
          <Button
            href={courseInfo.promotionUrl || `https://www.udemy.com/course/${courseInfo.slug}/`}
            target="_blank"
            rel="noopener noreferrer"
            color="zinc"
            className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-base font-medium shadow-lg transition-all hover:scale-105"
          >
            講座ページを見る
            <ExternalLink className="h-4 w-4" />
          </Button>

          <p className="text-center text-xs text-zinc-500">通常価格での購入ページへ移動します</p>
        </div>
      </div>
    )
  }

  // 通常のクーポン表示
  return (
    <div className="overflow-hidden bg-white shadow-lg sm:rounded-2xl sm:ring-1 sm:ring-zinc-950/5">
      {/* 割引率ヘッダー */}
      <div className="bg-gradient-to-r from-red-500 to-pink-500 p-4 text-center">
        <div className="text-3xl font-bold text-white">{discountRate}% OFF</div>
        <div className="mt-1 text-sm font-bold text-white">サイト限定特別価格</div>
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
            <span className="text-sm font-semibold text-zinc-950">特別価格</span>
            <span className="text-3xl font-bold text-zinc-950">
              ¥{coupon.discountPrice.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center justify-between rounded-lg bg-green-50 px-3 py-2">
            <span className="text-sm text-green-700">節約額</span>
            <span className="font-semibold text-green-800">¥{savings.toLocaleString()}お得！</span>
          </div>
        </div>

        {/* 残り時間 */}
        <div className="rounded-lg border border-orange-200 bg-orange-50 p-3 sm:p-4">
          <div className="flex items-center gap-2 text-orange-800">
            <Clock className="h-4 w-4" />
            <span className="text-sm font-medium">残り{daysRemaining}日で終了</span>
          </div>
          <div className="mt-1 text-xs text-orange-600">{formattedEndDate} まで</div>
        </div>

        {/* クーポンコード */}
        <div className="space-y-3">
          <div className="text-sm font-medium text-zinc-700">クーポンコード</div>
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
          {copied && <div className="text-center text-xs text-green-600">コピーしました！</div>}
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
