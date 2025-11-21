/**
 * Discordメンバー数表示コンポーネント（クライアント側）
 *
 * Framer Motionを使用したアニメーション付きの表示コンポーネント。
 * シンプルで視認性の高いデザイン。
 */

"use client"

import { UserGroupIcon } from "@heroicons/react/24/outline"
import { motion } from "framer-motion"

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
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex items-center justify-center gap-4"
    >
      {/* アイコン */}
      <UserGroupIcon className="h-12 w-12 text-gray-950" />

      {/* メンバー数情報 */}
      <div className="flex items-baseline gap-3">
        <span className="font-display text-7xl font-bold tracking-tight text-gray-950">
          {formattedCount}
        </span>
        <span className="text-2xl font-medium text-gray-600">
          名の仲間が参加中
        </span>
      </div>
    </motion.div>
  )
}
