"use client"

import { Badge } from "@/components/catalyst/badge"
import { Button } from "@/components/catalyst/button"
import { Heading } from "@/components/catalyst/heading"
import { Text } from "@/components/catalyst/text"
import { TechStackBadges } from "@/components/coupons/TechStackBadges"
import { calculateDiscountRate } from "@/lib/coupons/coupon-data"
import type { Coupon } from "@/types/coupon"
import { ArrowLeft, CheckCircle, Gift, Tag } from "lucide-react"
import Link from "next/link"

interface CouponDetailProps {
  coupon: Coupon
}

export function CouponDetail({ coupon }: CouponDetailProps) {
  const { courseInfo } = coupon
  const discountRate = calculateDiscountRate(
    courseInfo.originalPrice,
    coupon.discountPrice
  )
  const savings = courseInfo.originalPrice - coupon.discountPrice

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6">
      {/* 戻るリンク */}
      <Link
        href="/coupons"
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-950"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>クーポン一覧</span>
      </Link>

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        {/* ヘッダーセクション */}
        <div className="bg-zinc-50 p-6">
          <div>
            <Heading
              level={1}
              className="mb-4 text-xl font-semibold text-zinc-950 sm:text-2xl"
            >
              {courseInfo.title}
            </Heading>

            {/* ステータスバッジ */}
            <div className="flex flex-wrap items-center gap-3">
              <Badge
                color="red"
                className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium"
              >
                <Tag className="h-3 w-3" />
                <span>{discountRate}% OFF</span>
              </Badge>
            </div>
          </div>
        </div>

        {/* メインコンテンツ */}
        <div className="space-y-6 p-6">
          {/* 技術スタック */}
          <div>
            <Text className="mb-3 text-base font-semibold text-zinc-950">
              技術スタック
            </Text>
            <TechStackBadges topics={courseInfo.topics} />
          </div>

          {/* 講座説明 */}
          <div>
            <Heading
              level={2}
              className="mb-3 text-base font-semibold text-zinc-950"
            >
              この講座で学べること
            </Heading>
            <div className="rounded-lg bg-zinc-50 p-4">
              <Text className="text-sm leading-relaxed text-zinc-700">
                {courseInfo.description}
              </Text>
            </div>
          </div>

          {/* 価格情報 */}
          <div className="grid gap-4 sm:grid-cols-2">
            {/* 価格カード */}
            <div className="rounded-lg border border-zinc-950/10 bg-white p-6">
              <div className="space-y-4">
                <div>
                  <div className="mb-1 flex items-center gap-2 text-sm text-zinc-600">
                    <span>通常価格</span>
                    <span className="text-lg font-medium text-zinc-500 line-through">
                      ¥{courseInfo.originalPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-sm font-medium text-zinc-950">
                      特別価格
                    </span>
                    <span className="text-3xl font-bold text-zinc-950">
                      ¥{coupon.discountPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="border-t border-zinc-950/5 pt-4">
                  <div className="inline-flex items-center gap-2 rounded-md bg-green-50 px-3 py-1.5 text-sm">
                    <span className="text-green-700">節約額:</span>
                    <span className="font-semibold text-green-800">
                      ¥{savings.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* クーポンコードカード */}
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
              <div className="text-center">
                <Text className="mb-3 text-sm font-medium text-blue-700">
                  クーポンコード
                </Text>
                <div className="rounded-lg border border-blue-200 bg-white p-4">
                  <Text className="font-mono text-xl font-bold tracking-wider text-blue-900">
                    {coupon.couponCode}
                  </Text>
                </div>
                <Text className="mt-3 text-xs text-blue-600">
                  コードをコピーしてUdemyで使用
                </Text>
              </div>
            </div>
          </div>

          {/* CTAセクション */}
          <div className="rounded-lg bg-zinc-50 p-6 text-center">
            <div className="mb-4">
              <div className="flex items-center justify-center gap-2 text-sm text-zinc-700">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>30日間の返金保証付き</span>
              </div>
            </div>

            <Button
              href={coupon.courseCouponUrl}
              target="_blank"
              rel="noopener noreferrer"
              color="blue"
              className="inline-flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-medium shadow-md transition-colors hover:bg-blue-700"
            >
              <Gift className="h-5 w-5" />
              <span>クーポン適用済みページへ</span>
            </Button>

            <Text className="mt-4 text-xs text-zinc-500">
              Udemyの講座ページに移動します（クーポン適用済み）
            </Text>
          </div>
        </div>
      </div>
    </div>
  )
}
