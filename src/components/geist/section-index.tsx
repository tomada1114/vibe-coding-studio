"use client"

/**
 * ページ内目次（Geist Grid）
 *
 * 左余白に追従する番号付きの目次。読んでいる位置のセクションを
 * `aria-current` と、左罫線上を滑る 1px のインジケータで示す。
 * 目次は内容を隠さない — スクロール位置はインジケータの位置を変えるだけ。
 *
 * クリックではセクションへスムーズに移動する（視差効果を減らす設定では瞬時）。
 * `scroll-behavior: smooth` をページ全体に掛けると、初回表示のアンカー移動や
 * ルート遷移まで滑らかになって途中で止まるため、目次のクリックに限っている。
 * JS が無い環境では素のページ内リンクとして動く。
 */

import { clsx } from "clsx"
import { useEffect, useRef, useState, type MouseEvent } from "react"
import { REDUCED_MOTION, useMediaQuery } from "./use-media-query"

type SectionIndexItem = {
  /** 対応する `<section id>` */
  id: string
  label: string
}

/** 画面上端からこの割合の位置を「読んでいる線」とする */
const READING_LINE = 0.4

/** 利用者が自分でスクロールし始めたとみなす入力 */
const USER_SCROLL_INPUTS = ["wheel", "touchstart", "keydown", "pointerdown"]

/**
 * 移動先の見出しへフォーカスを移す。素のページ内リンクと同じくフォーカスの起点を
 * 移しつつ、リングはセクション全体ではなく見出しに出し、読み上げも見出しから始める。
 */
function focusHeading(section: HTMLElement) {
  const target = section.querySelector<HTMLElement>("h2, h3") ?? section
  if (!target.hasAttribute("tabindex")) {
    target.setAttribute("tabindex", "-1")
    target.addEventListener("blur", () => target.removeAttribute("tabindex"), {
      once: true,
    })
  }
  target.focus({ preventScroll: true })
}

export function SectionIndex({
  label,
  items,
}: {
  label: string
  items: SectionIndexItem[]
}) {
  const reducedMotion = useMediaQuery(REDUCED_MOTION)
  const [active, setActive] = useState<string | null>(null)
  /**
   * 目次でクリックした項目。縦に長い画面では移動先が最下部と重なり、位置からは
   * 末尾が現在地と判定されてしまうため、利用者が自分でスクロールするまで優先する。
   */
  const pinned = useRef<string | null>(null)
  const scheduleRef = useRef<() => void>(() => {})

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      if (pinned.current) {
        setActive(pinned.current)
        return
      }

      const root = document.documentElement
      const scrollable = root.scrollHeight > window.innerHeight
      const atBottom =
        scrollable &&
        window.innerHeight + window.scrollY >= root.scrollHeight - 2

      // 最下部では最後のセクションが読む線に届かないことがあるので、末尾を現在地にする
      if (atBottom) {
        setActive(items.at(-1)?.id ?? null)
        return
      }

      const line = window.innerHeight * READING_LINE
      let current: string | null = null
      for (const item of items) {
        const section = document.getElementById(item.id)
        if (section && section.getBoundingClientRect().top <= line) {
          current = item.id
        }
      }
      setActive(current)
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    const release = () => {
      if (!pinned.current) return
      pinned.current = null
      schedule()
    }
    scheduleRef.current = schedule

    update()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    USER_SCROLL_INPUTS.forEach(type =>
      window.addEventListener(type, release, { passive: true })
    )
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
      USER_SCROLL_INPUTS.forEach(type =>
        window.removeEventListener(type, release)
      )
    }
  }, [items])

  const navigate = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    // 新しいタブで開く等の修飾つきクリックはブラウザに任せる
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return
    }
    const section = document.getElementById(id)
    if (!section) return

    event.preventDefault()
    pinned.current = id
    setActive(id)
    section.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    })
    focusHeading(section)
    // 第 1 引数は null（Next.js の App Router がルーターの URL と同期する公式の書き方）
    window.history.replaceState(null, "", `#${id}`)
    scheduleRef.current()
  }

  const activeIndex = items.findIndex(item => item.id === active)

  return (
    <nav aria-label={label}>
      <div className="relative">
        {/* 現在地のインジケータ。ヘッダーの現在地（下辺 1px のアクセント）と同じ語彙 */}
        <span
          aria-hidden="true"
          className="absolute top-0 left-0 h-7 w-px bg-accent transition-[transform,opacity] duration-200 ease-out"
          style={{
            transform: `translateY(${Math.max(activeIndex, 0) * 100}%)`,
            opacity: activeIndex < 0 ? 0 : 1,
          }}
        />
        <ol className="border-l border-border">
          {items.map((item, index) => {
            const current = item.id === active
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={event => navigate(event, item.id)}
                  aria-current={current ? "true" : undefined}
                  className={clsx(
                    "flex h-7 items-center gap-2.5 pl-3 text-[13px] transition-colors duration-150 ease-out",
                    current
                      ? "text-text-primary"
                      : "text-text-secondary hover:text-text-primary"
                  )}
                >
                  <span
                    aria-hidden="true"
                    className="font-mono text-[11px] text-text-label tabular-nums"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </a>
              </li>
            )
          })}
        </ol>
      </div>
    </nav>
  )
}
