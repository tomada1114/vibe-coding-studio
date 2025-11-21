/**
 * Discordメンバー数表示コンポーネント（クライアント側）
 *
 * Framer Motionを使用したアニメーション付きの表示コンポーネント。
 * デザインシステムに従ったリッチなビジュアルデザイン。
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
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative inline-block"
    >
      {/* グラデーション背景カード */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100 p-6 shadow-lg ring-1 ring-gray-950/5">
        {/* 装飾的な背景パターン */}
        <div className="bg-grid-gray-900/[0.02] absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />

        <div className="relative flex items-center gap-4">
          {/* アイコン */}
          <div className="flex-shrink-0 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-gray-950/5">
            <UserGroupIcon className="h-8 w-8 text-gray-950" />
          </div>

          {/* メンバー数情報 */}
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-4xl font-bold tracking-tight text-gray-950">
                {formattedCount}
              </span>
              <span className="text-sm font-medium text-gray-600">名</span>
            </div>
            <p className="mt-1 text-sm font-medium text-gray-600">
              の仲間が参加中
            </p>
          </div>
        </div>

        {/* サブテキスト - コミュニティの活気を表現 */}
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
          className="mt-4 flex items-center gap-2 border-t border-gray-200 pt-4"
        >
          <div className="flex -space-x-1">
            {/* アクティブユーザーの視覚的表現（装飾的なドット） */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 0.2,
                  delay: 0.2 + i * 0.05,
                  ease: "easeOut",
                }}
                className="h-2 w-2 rounded-full bg-green-500 ring-2 ring-white"
              />
            ))}
          </div>
          <span className="text-xs font-medium text-gray-500">
            活発なコミュニティ
          </span>
        </motion.div>
      </div>

      {/* 装飾的な光のエフェクト */}
      <div className="pointer-events-none absolute -inset-px rounded-3xl opacity-50 blur-sm">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-gray-200/50 to-transparent" />
      </div>
    </motion.div>
  )
}
