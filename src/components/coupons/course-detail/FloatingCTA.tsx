"use client"

import { Button } from "@/components/catalyst/button"
import { calculateDiscountRate } from "@/lib/coupons/coupon-data"
import type { Coupon } from "@/types/coupon"
import { Gift, X } from "lucide-react"
import { memo, useCallback, useEffect, useState } from "react"

interface FloatingCTAProps {
  coupon: Coupon
}

export const FloatingCTA = memo(function FloatingCTA({
  coupon,
}: FloatingCTAProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const discountRate = calculateDiscountRate(
    coupon.courseInfo.originalPrice,
    coupon.discountPrice
  )

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    const handleScroll = () => {
      // Show after scrolling down 500px
      if (window.scrollY > 500 && !isDismissed) {
        setIsVisible(true)
      } else if (window.scrollY <= 500) {
        setIsVisible(false)
      }
    }

    // Initial check
    handleScroll()

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isDismissed, isMounted])

  const handleDismiss = useCallback(() => {
    setIsDismissed(true)
    setIsVisible(false)
  }, [])

  // Don't render on server side to avoid hydration mismatch
  if (!isMounted || !isVisible) return null

  return (
    <div className="fixed right-0 bottom-0 left-0 z-50 transform transition-transform duration-300 md:right-6 md:bottom-6 md:left-auto md:max-w-md">
      <div className="relative overflow-hidden rounded-t-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-4 shadow-2xl md:rounded-2xl">
        {/* 背景パターン */}
        <div className="bg-grid-white/[0.1] absolute inset-0" />

        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 rounded-full bg-white/20 p-1 transition-colors hover:bg-white/30"
        >
          <X className="h-4 w-4 text-white" />
        </button>

        <div className="relative space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg font-bold text-white">
                当サイト限定 {discountRate}% OFF
              </div>
              <div className="text-sm text-white/90">
                ¥{coupon.discountPrice.toLocaleString()} (通常 ¥
                {coupon.courseInfo.originalPrice.toLocaleString()})
              </div>
            </div>
            <div className="text-3xl">🎯</div>
          </div>

          <Button
            href={coupon.courseCouponUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-white py-2.5 text-blue-600 hover:bg-zinc-100"
          >
            <Gift className="h-5 w-5" />
            今すぐクーポンを使う
          </Button>
        </div>
      </div>
    </div>
  )
})
