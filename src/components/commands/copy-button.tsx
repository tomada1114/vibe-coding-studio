"use client"

import React, { useEffect, useRef, useState } from "react"

interface CopyButtonProps {
  textToCopy: string
  onCopySuccess?: () => void
  onCopyError?: (error: Error) => void
}

type CopyState = "idle" | "success" | "error"

export function CopyButton({
  textToCopy,
  onCopySuccess,
  onCopyError,
}: CopyButtonProps) {
  const [copyState, setCopyState] = useState<CopyState>("idle")
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // コンポーネントアンマウント時にタイマーをクリーンアップ
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  // Clipboard API が利用できない場合はフォールバック UI を表示
  if (!navigator.clipboard) {
    return (
      <div className="mt-4">
        <p className="mb-2 text-sm text-gray-600">
          手動でテキストを選択してコピーしてください
        </p>
        <textarea
          readOnly
          value={textToCopy}
          className="w-full rounded-lg border border-gray-200 bg-gray-50 p-4 font-mono text-sm"
          rows={10}
        />
      </div>
    )
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy)
      setCopyState("success")

      if (onCopySuccess) {
        onCopySuccess()
      }

      // 既存のタイマーをクリア
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      // 2秒後に初期状態に戻る
      timeoutRef.current = setTimeout(() => {
        setCopyState("idle")
        timeoutRef.current = null
      }, 2000)
    } catch (error) {
      setCopyState("error")

      if (onCopyError) {
        onCopyError(error as Error)
      }
    }
  }

  const getButtonText = () => {
    switch (copyState) {
      case "success":
        return "コピーしました！"
      case "error":
        return "コピー失敗"
      default:
        return "コピー"
    }
  }

  const getButtonStyles = () => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-full px-4 py-2 transition-colors"

    switch (copyState) {
      case "success":
        return `${baseStyles} bg-green-600 text-white hover:bg-green-700`
      case "error":
        return `${baseStyles} bg-red-600 text-white hover:bg-red-700`
      default:
        return `${baseStyles} bg-gray-950 text-white data-hover:bg-gray-800`
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleCopy}
        className={getButtonStyles()}
        aria-live="polite"
        aria-atomic="true"
      >
        {getButtonText()}
      </button>
      {copyState === "success" && (
        <span role="status" className="sr-only">
          コピーしました！
        </span>
      )}
    </div>
  )
}
