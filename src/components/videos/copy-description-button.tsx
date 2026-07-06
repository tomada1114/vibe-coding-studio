"use client"

import { useEffect, useRef, useState } from "react"

/**
 * 概要欄コピーボタン
 *
 * プレーンテキスト全文を navigator.clipboard に書き込み、
 * 成功時は2秒間「コピーしました」を表示する。
 */
export function CopyDescriptionButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        if (timerRef.current) clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => setCopied(false), 2000)
      }}
      className="rounded-full bg-gray-950 px-4 py-2 font-mono text-sm text-white hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      {copied ? "コピーしました" : "概要欄をコピー"}
    </button>
  )
}
