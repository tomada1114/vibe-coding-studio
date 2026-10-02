"use client"

/**
 * 罫線スポットライト（Geist Grid）
 *
 * ページ内の `[data-spotlight]` 要素に、ポインタ位置を CSS 変数
 * `--spot-x` / `--spot-y`（要素内の座標）と `--spot-o`（点灯 0 / 1）で渡す。
 * 光らせ方は CSS 側（`gg-spotlight` / `gg-grid-spot`）が持ち、ここは座標を
 * 運ぶだけ。React の再描画は起こさない。
 *
 * ホバーできる精密なポインタがあり、視差効果を減らす設定がオフのときだけ動く。
 * 表示中に設定が変わったら追従をやめて消灯する。タッチ端末では何もしない
 * （内容は最初からすべて見えている）。CSS 側も同じ条件で光を描かない。
 */

import { useEffect } from "react"
import { FINE_POINTER, REDUCED_MOTION, useMediaQuery } from "./use-media-query"

/** 要素の外でも、この距離までは光を残す（外周の罫線も照らすため） */
const REACH = 48

export function GridSpotlight() {
  const finePointer = useMediaQuery(FINE_POINTER)
  const reducedMotion = useMediaQuery(REDUCED_MOTION)

  useEffect(() => {
    if (!finePointer || reducedMotion) return

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-spotlight]")
    )
    if (targets.length === 0) return

    /** 前回書いた点灯状態。変わったときだけ書く */
    const lit = new Map<HTMLElement, boolean>()
    let pointer: { x: number; y: number } | null = null
    let frame = 0

    const setLit = (target: HTMLElement, on: boolean) => {
      if (lit.get(target) === on) return
      lit.set(target, on)
      target.style.setProperty("--spot-o", on ? "1" : "0")
    }

    const update = () => {
      frame = 0
      // 読み取りを先に済ませてから書き込む（レイアウトの強制再計算を毎要素で起こさない）
      const rects = targets.map(target => target.getBoundingClientRect())
      targets.forEach((target, index) => {
        const rect = rects[index]
        const near =
          pointer !== null &&
          pointer.x >= rect.left - REACH &&
          pointer.x <= rect.right + REACH &&
          pointer.y >= rect.top - REACH &&
          pointer.y <= rect.bottom + REACH

        setLit(target, near)
        if (near && pointer) {
          target.style.setProperty("--spot-x", `${pointer.x - rect.left}px`)
          target.style.setProperty("--spot-y", `${pointer.y - rect.top}px`)
        }
      })
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    const onMove = (event: PointerEvent) => {
      pointer = { x: event.clientX, y: event.clientY }
      schedule()
    }
    const onLeave = () => {
      pointer = null
      schedule()
    }

    const root = document.documentElement
    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("scroll", schedule, { passive: true })
    root.addEventListener("pointerleave", onLeave)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("scroll", schedule)
      root.removeEventListener("pointerleave", onLeave)
      targets.forEach(target => setLit(target, false))
    }
  }, [finePointer, reducedMotion])

  return null
}
