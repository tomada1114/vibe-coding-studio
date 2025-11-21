/**
 * Discordメンバー数表示コンポーネント（クライアント側）
 *
 * Framer Motionを使用したアニメーション付きの表示コンポーネント。
 * シンプルで視認性の高いデザイン。
 * 数字がカウントアップするアニメーション効果付き。
 */

"use client"

import { animate, motion, useMotionValue, useTransform } from "framer-motion"
import { useEffect } from "react"

interface DiscordMemberCountClientProps {
  formattedCount: string
}

/**
 * Discordメンバー数表示コンポーネント（クライアント側）
 *
 * @param formattedCount - フォーマット済みのメンバー数（例: "1,230+"）
 */
export function DiscordMemberCountClient({
  formattedCount,
}: DiscordMemberCountClientProps) {
  // formattedCountから数値部分を抽出（例: "1,230+" -> 1230）
  const targetNumber = parseInt(formattedCount.replace(/[^0-9]/g, ""), 10)

  // Framer Motionのモーション値
  const count = useMotionValue(0)
  const rounded = useTransform(count, Math.round)

  useEffect(() => {
    // カウントアップアニメーション（0から目標値まで）
    const controls = animate(count, targetNumber, {
      duration: 1.5, // 1.5秒かけてカウントアップ
      ease: "easeOut",
    })

    return controls.stop
  }, [count, targetNumber])

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex items-center justify-center"
    >
      {/* メンバー数情報 */}
      <div className="flex items-baseline gap-3">
        <span className="font-display text-7xl font-bold tracking-tight text-gray-950">
          <motion.span>{rounded}</motion.span>+
        </span>
        <span className="text-2xl font-medium text-gray-600">
          名の仲間が参加中
        </span>
      </div>
    </motion.div>
  )
}
