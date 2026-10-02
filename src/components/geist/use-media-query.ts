"use client"

/**
 * メディアクエリの一致状態を購読する（Geist Grid の動き用）
 *
 * 表示中に OS の「視差効果を減らす」を切り替えたり、マウントを接続したりしても
 * 追従できるよう、`change` を購読する。サーバー描画と matchMedia の無い環境では
 * `false`（＝動きを出さない側）を返す。
 */

import { useCallback, useSyncExternalStore } from "react"

export const FINE_POINTER = "(hover: hover) and (pointer: fine)"
export const REDUCED_MOTION = "(prefers-reduced-motion: reduce)"

function supportsMatchMedia() {
  return (
    typeof window !== "undefined" && typeof window.matchMedia === "function"
  )
}

export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      if (!supportsMatchMedia()) return () => {}
      const list = window.matchMedia(query)
      list.addEventListener("change", onChange)
      return () => list.removeEventListener("change", onChange)
    },
    [query]
  )

  return useSyncExternalStore(
    subscribe,
    () => supportsMatchMedia() && window.matchMedia(query).matches,
    () => false
  )
}
