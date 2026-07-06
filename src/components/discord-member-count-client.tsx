/**
 * Discordメンバー数表示コンポーネント（クライアント側）
 *
 * requestAnimationFrame による軽量なカウントアップ表示。
 * prefers-reduced-motion 時はアニメーションせず即座に最終値を表示する。
 * （アニメーションライブラリ非依存でホーム初期バンドルを削減）
 */

"use client"

import { useEffect, useState } from "react"

interface DiscordMemberCountClientProps {
  formattedCount: string
}

/** カウントアップにかける時間（ms） */
const COUNT_UP_DURATION = 1500

/**
 * Discordメンバー数表示コンポーネント（クライアント側）
 *
 * @param formattedCount - フォーマット済みのメンバー数（例: "1,230+"）
 */
export function DiscordMemberCountClient({
  formattedCount,
}: DiscordMemberCountClientProps) {
  // formattedCountから数値部分を抽出（例: "1,230+" -> 1230）
  const targetNumber = Number.parseInt(
    formattedCount.replace(/[^0-9]/g, ""),
    10
  )
  const [displayNumber, setDisplayNumber] = useState(0)

  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !Number.isFinite(targetNumber)
    ) {
      setDisplayNumber(targetNumber)
      return
    }

    let rafId = 0
    const start = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - start) / COUNT_UP_DURATION, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out
      setDisplayNumber(Math.round(targetNumber * eased))
      if (progress < 1) {
        rafId = requestAnimationFrame(tick)
      }
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [targetNumber])

  return (
    <div className="flex items-center justify-center">
      {/* メンバー数情報 */}
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-7xl font-bold tracking-tight text-gray-950">
          {displayNumber.toLocaleString("ja-JP")}+
        </span>
        <span className="text-2xl font-medium text-gray-600">
          名の仲間が参加中
        </span>
      </div>
    </div>
  )
}
