"use client"

import { motion, useInView, useReducedMotion } from "framer-motion"
import { useRef } from "react"

/**
 * founderページ専用のモーションヘルパー。
 *
 * 設計方針:
 * - 演出は「読み込み時のヒーロー」と「経歴タイムライン」の2箇所のみに限定する
 * - prefers-reduced-motion 指定時は transition を 0 にして動きを消す。
 *   initial の値は変えないため、SSR と hydration で DOM が一致する。
 */

const EASE = [0.22, 1, 0.36, 1] as const

export function FadeUp({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { duration: 0.55, delay, ease: EASE }
      }
    >
      {children}
    </motion.div>
  )
}

export function RevealOnScroll({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={
        shouldReduceMotion ? { duration: 0 } : { duration: 0.5, ease: EASE }
      }
    >
      {children}
    </motion.div>
  )
}
