"use client"

import { Button } from "@/components/catalyst/button"
import type { Coupon } from "@/types/coupon"
import { ChevronUp } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { memo, useCallback, useEffect, useMemo, useState } from "react"
import { CouponCard } from "./CouponCard"
import { TopicFilter } from "./TopicFilter"

interface CouponPageLayoutProps {
  coupons: Coupon[]
}

const normalizeTopics = (topics: string[]) => {
  return Array.from(new Set(topics.filter(topic => topic.trim().length > 0)))
}

const areArraysEqual = (a: string[], b: string[]) => {
  if (a.length !== b.length) return false
  return a.every((value, index) => value === b[index])
}

export const CouponPageLayout = memo(function CouponPageLayout({
  coupons,
}: CouponPageLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [showScrollButton, setShowScrollButton] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Hydration Error防止: 初期状態は空配列、クライアント側でマウント後に設定
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])

  // クライアント側マウント検知
  useEffect(() => {
    setIsMounted(true)
    const topicsFromParams = normalizeTopics(searchParams.getAll("topic"))
    setSelectedTopics(topicsFromParams)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // フィルタリングされたクーポン（メモ化）
  // ソート済みのデータを受け取っているため、フィルタのみ実施
  const filteredCoupons = useMemo(() => {
    if (selectedTopics.length === 0) return coupons

    return coupons.filter(coupon =>
      coupon.courseInfo.topics.some(topic => selectedTopics.includes(topic))
    )
  }, [coupons, selectedTopics])

  // getLatestCoupons()で既にソート済みのため、ここでは不要
  // フィルタリング後も元の順序を維持
  const sortedCoupons = filteredCoupons

  const updateTopicQuery = useCallback(
    (topics: string[]) => {
      const normalizedTopics = normalizeTopics(topics)
      setSelectedTopics(normalizedTopics)

      const params = new URLSearchParams(searchParams.toString())
      params.delete("topic")
      normalizedTopics.forEach(topic => params.append("topic", topic))

      const queryString = params.toString()
      const nextUrl = queryString ? `${pathname}?${queryString}` : pathname
      router.replace(nextUrl, { scroll: false })
    },
    [pathname, router, searchParams]
  )

  const handleTopicToggle = useCallback(
    (topic: string) => {
      const nextTopics = selectedTopics.includes(topic) ? [] : [topic]
      updateTopicQuery(nextTopics)
    },
    [selectedTopics, updateTopicQuery]
  )

  const handleClearFilter = useCallback(() => {
    updateTopicQuery([])
  }, [updateTopicQuery])

  // URLパラメータが変更された時の同期（マウント後のみ）
  useEffect(() => {
    if (!isMounted) return

    const topicsFromParams = normalizeTopics(searchParams.getAll("topic"))
    setSelectedTopics(prev =>
      areArraysEqual(prev, topicsFromParams) ? prev : topicsFromParams
    )
  }, [searchParams, isMounted])

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  return (
    <div>
      {/* フィルタセクション */}
      <TopicFilter
        coupons={coupons}
        selectedTopics={selectedTopics}
        onTopicToggle={handleTopicToggle}
        onClearFilter={handleClearFilter}
      />

      {/* フィルタリング結果 */}
      {selectedTopics.length > 0 && (
        <div className="mb-4 text-sm text-zinc-600">
          検索結果: {filteredCoupons.length}件 / 全{coupons.length}件
        </div>
      )}

      {/* メインコンテンツ */}
      {sortedCoupons.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
          {sortedCoupons.map(coupon => (
            <CouponCard
              key={`${coupon.courseId}-${coupon.couponCode}`}
              coupon={coupon}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-4 text-4xl text-zinc-400">🔍</div>
          <p className="text-lg font-medium text-zinc-600">
            {selectedTopics.length > 0
              ? "選択した技術スタックに該当するクーポンがありません"
              : "現在利用可能なクーポンがありません"}
          </p>
          <p className="mt-2 text-sm text-zinc-500">
            フィルタを調整していただくか、後でもう一度お試しください
          </p>
        </div>
      )}

      {/* フローティングボタン（モバイル） */}
      {showScrollButton && (
        <div className="fixed right-6 bottom-6 z-10">
          <Button
            onClick={scrollToTop}
            color="blue"
            className="rounded-full p-4 shadow-2xl shadow-blue-500/20 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/30"
            aria-label="ページの先頭へ戻る"
          >
            <ChevronUp className="h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  )
})
