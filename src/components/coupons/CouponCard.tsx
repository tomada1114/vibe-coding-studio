'use client'

import { calculateDiscountRate } from '@/lib/coupons/coupon-data'
import type { Coupon } from '@/types/coupon'
import { Gift } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { memo } from 'react'

interface CouponCardProps {
  coupon: Coupon
}

export const CouponCard = memo(function CouponCard({ coupon }: CouponCardProps) {
  const { courseInfo } = coupon
  const discountRate = calculateDiscountRate(courseInfo.originalPrice, coupon.discountPrice)
  const savings = courseInfo.originalPrice - coupon.discountPrice

  return (
    <Link
      href={`/coupons/${courseInfo.slug}`}
      id={`course-${courseInfo.slug}`}
      className="group block cursor-pointer scroll-mt-20 overflow-hidden rounded-2xl border border-zinc-950/5 bg-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-zinc-950/10"
    >
      {/* コースサムネイル画像 */}
      <div className="relative aspect-video w-full overflow-hidden bg-zinc-100">
        <Image
          src={`/images/udemy/${courseInfo.slug}.png`}
          alt={courseInfo.title}
          width={640}
          height={360}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        />
      </div>

      <div className="p-6 sm:p-8">
        {/* 講座タイトル */}
        <h3 className="mb-3 text-center text-base leading-tight font-semibold text-zinc-950 transition-colors duration-200 group-hover:text-blue-600 sm:mb-4 sm:text-lg">
          {courseInfo.title}
        </h3>

        {/* 割引率バッジ */}
        <div className="mb-3 text-center sm:mb-4">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-sm font-medium text-red-700 ring-1 ring-red-700/10">
            <span className="text-xs">🎯</span>
            {discountRate}% OFF
          </div>
        </div>

        {/* 価格情報（通常価格 + クーポン適用後価格） */}
        <div className="mb-4 space-y-1 text-center sm:mb-6">
          <div className="text-xs text-zinc-500 line-through">
            通常価格 ¥{courseInfo.originalPrice.toLocaleString()}
          </div>
          <div className="text-xl font-bold text-zinc-950">
            ¥{coupon.discountPrice.toLocaleString()}{' '}
            <span className="text-xs font-medium text-green-700">
              (¥{savings.toLocaleString()}お得)
            </span>
          </div>
        </div>

        {/* クーポン詳細ボタン風のUI要素 */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 group-hover:scale-105 group-hover:bg-blue-700 sm:px-6 sm:py-3">
            <Gift className="h-4 w-4" />
            クーポン詳細を見る
          </div>
        </div>
      </div>
    </Link>
  )
})
