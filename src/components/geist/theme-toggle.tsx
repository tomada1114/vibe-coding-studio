"use client"

import { useEffect, useState } from "react"

export type Theme = "dark" | "light"

export const THEME_STORAGE_KEY = "theme"

/**
 * テーマ初期化スクリプト。
 *
 * `<head>` で同期実行し、React のハイドレーション前に `data-theme` を確定させる。
 * これが無いと初回描画でダーク⇄ライトのフラッシュが起きる。
 *
 * 優先順位:
 *   1. localStorage の "theme" が "dark" / "light" ならそれ
 *   2. 無ければ prefers-color-scheme: light が true のときだけ light
 *   3. それ以外（dark / no-preference / 判定不能）は dark
 */
export const THEME_INIT_SCRIPT = `(function(){try{
var s=localStorage.getItem('${THEME_STORAGE_KEY}');
var t=(s==='light'||s==='dark')?s:
  (window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');
document.documentElement.setAttribute('data-theme',t);
document.documentElement.style.colorScheme=t;
}catch(e){document.documentElement.setAttribute('data-theme','dark');}})()`

function readTheme(): Theme {
  if (typeof document === "undefined") return "dark"
  return document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark"
}

function MoonIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-4"
    >
      <path d="M13.5 9.6A5.9 5.9 0 0 1 6.4 2.5a5.9 5.9 0 1 0 7.1 7.1Z" />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-4"
    >
      <circle cx="8" cy="8" r="3.1" />
      <path d="M8 1v1.6M8 13.4V15M15 8h-1.6M2.6 8H1M12.9 3.1l-1.1 1.1M4.2 11.8l-1.1 1.1M12.9 12.9l-1.1-1.1M4.2 4.2 3.1 3.1" />
    </svg>
  )
}

/**
 * テーマトグル（dark ⇄ light の 2 状態のみ）。
 * "system" の第 3 状態とプルダウンは持たない。
 */
export function ThemeToggle({
  label,
  toLightLabel,
  toDarkLabel,
}: {
  label: string
  toLightLabel: string
  toDarkLabel: string
}) {
  // aria-label / aria-pressed 用。アイコン自体はこの state を経由せず CSS で出し分ける
  // （下記コメント参照）。マウント前は実テーマが未確定なので、以下の JSX では両属性とも
  // 「間違った値」ではなく「まだ値を主張しない」状態にする（isDark をそのまま出さない）。
  const [theme, setTheme] = useState<Theme>("dark")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setTheme(readTheme())
    setMounted(true)
  }, [])

  function toggle() {
    const next: Theme = readTheme() === "dark" ? "light" : "dark"
    document.documentElement.setAttribute("data-theme", next)
    document.documentElement.style.colorScheme = next
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next)
    } catch {
      // プライベートモード等で localStorage が使えなくても切替自体は成立させる
    }
    setTheme(next)
  }

  const isDark = theme === "dark"

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={mounted ? (isDark ? toLightLabel : toDarkLabel) : label}
      aria-pressed={mounted ? isDark : undefined}
      className="border-border text-text-muted hover:text-text-primary hover:bg-surface-1 flex size-7 items-center justify-center rounded-[6px] border transition-colors"
    >
      {/* アイコンは state ではなく <html data-theme> に紐づく dark: バリアントで出し分ける。
          <head> の同期スクリプトが data-theme をペイント前に確定させるので、SSR マークアップの
          時点から正しい方だけが表示され、JS state 経由では避けられない「まず dark 側で描画され
          てから切り替わる」チラつきが原理的に起きない。 */}
      <span className="dark:hidden" aria-hidden="true">
        <SunIcon />
      </span>
      <span className="hidden dark:inline" aria-hidden="true">
        <MoonIcon />
      </span>
    </button>
  )
}
