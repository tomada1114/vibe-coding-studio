"use client"

import { useEffect, useRef, useState } from "react"

type CopyStatus = "idle" | "copied" | "failed"

const LABELS: Record<CopyStatus, string> = {
  idle: "概要欄をコピー",
  copied: "コピーしました",
  failed: "コピーできませんでした",
}

/**
 * 概要欄コピーボタン
 *
 * プレーンテキスト全文を navigator.clipboard に書き込み、
 * 結果（成功/失敗）を2秒間ラベルに表示する。
 * Clipboard API は非セキュアコンテキストや権限拒否時に失敗しうるため、
 * 無言で握りつぶさずユーザーに失敗を伝える。
 */
export function CopyDescriptionButton({ text }: { text: string }) {
  const [status, setStatus] = useState<CopyStatus>("idle")
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const handleClick = async () => {
    let next: CopyStatus = "copied"
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      next = "failed"
    }

    setStatus(next)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setStatus("idle"), 2000)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="focus-visible:outline-accent rounded-full bg-gray-950 px-4 py-2 font-mono text-sm text-white hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      <span aria-live="polite">{LABELS[status]}</span>
    </button>
  )
}
