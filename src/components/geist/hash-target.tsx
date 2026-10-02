"use client"

/**
 * URL のハッシュが指す要素に `data-current` を付ける（Geist Grid）
 *
 * CSS の `:target` は、直接読み込んだときには効くが、App Router の遷移
 * （pushState + scrollIntoView）では更新されない。トップの経歴行から
 * `/career#…` へ移ったときにも該当エントリを示せるよう、属性で代用する。
 */

import { useEffect } from "react"

export function HashTarget() {
  useEffect(() => {
    let current: Element | null = null

    const apply = () => {
      current?.removeAttribute("data-current")
      const id = decodeURIComponent(window.location.hash.slice(1))
      current = id ? document.getElementById(id) : null
      current?.setAttribute("data-current", "")
    }

    apply()
    window.addEventListener("hashchange", apply)
    return () => {
      window.removeEventListener("hashchange", apply)
      current?.removeAttribute("data-current")
    }
  }, [])

  return null
}
