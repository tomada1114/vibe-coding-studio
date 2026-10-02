"use client"

/**
 * 拠点の現在時刻（Geist Grid）
 *
 * ヒーローのステータス行。1 ページに 1 つだけ置ける常駐の動き（秒が進む）。
 *
 * - サーバー描画ではプレースホルダを出し、時刻はマウント後に埋める
 *   （ハイドレーション不一致を起こさないため）。時差の行とタイムゾーン略称は
 *   サーバー描画の時点から場所を確保し、埋まっても行が増えない（CLS を出さない）。
 * - 自動で更新され続ける情報なので、止める手段を持つ（WCAG 2.2.2）。先頭の
 *   青い点が一時停止のトグル。
 * - 視差効果を減らす設定では秒を出さず、1 分ごとの更新に落とす。
 * - 閲覧者のタイムゾーンが判別できない環境では、時差だけを省く。
 */

import type { Dictionary } from "@/i18n/dictionaries"
import {
  describeTimeDifference,
  formatClock,
  getHourDifference,
  getTimeZoneAbbreviation,
  type TimeDifferenceTemplates,
} from "@/lib/local-time"
import { clsx } from "clsx"
import { useEffect, useState } from "react"
import { REDUCED_MOTION, useMediaQuery } from "./use-media-query"

type ClockState = {
  time: string
  zone: string
  difference: string
}

function describeDifference(
  now: Date,
  timeZone: string,
  viewer: string | undefined,
  templates: TimeDifferenceTemplates
): string {
  if (!viewer) return ""
  try {
    return describeTimeDifference(
      getHourDifference(now, timeZone, viewer),
      templates
    )
  } catch {
    // "Etc/Unknown" など Intl が受け付けないタイムゾーン。時差は飾りなので省く
    return ""
  }
}

export function LiveClock({
  timeZone,
  messages,
  viewerTimeZone,
}: {
  timeZone: string
  messages: Dictionary["hero"]["localTime"]
  /** 時差の基準。省略時は閲覧者の環境のタイムゾーン */
  viewerTimeZone?: string
}) {
  const reducedMotion = useMediaQuery(REDUCED_MOTION)
  const [paused, setPaused] = useState(false)
  const [clock, setClock] = useState<ClockState | null>(null)

  useEffect(() => {
    if (paused) return

    const viewer =
      viewerTimeZone ?? Intl.DateTimeFormat().resolvedOptions().timeZone
    const tick = () => {
      const now = new Date()
      setClock({
        time: formatClock(now, timeZone, { seconds: !reducedMotion }),
        zone: getTimeZoneAbbreviation(now, timeZone),
        difference: describeDifference(now, timeZone, viewer, messages),
      })
    }

    // 秒（減速設定では分）の境目に揃えて更新する
    const interval = reducedMotion ? 60_000 : 1000
    let timer: ReturnType<typeof setTimeout>
    const schedule = () => {
      timer = setTimeout(
        () => {
          tick()
          schedule()
        },
        interval - (Date.now() % interval)
      )
    }

    tick()
    schedule()
    return () => clearTimeout(timer)
  }, [timeZone, messages, viewerTimeZone, reducedMotion, paused])

  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
      {/* 24px の押せる範囲に 6px の点。負のマージンで行の中の占有幅は点のまま */}
      <button
        type="button"
        aria-pressed={paused}
        aria-label={messages.pause}
        title={messages.pause}
        onClick={() => setPaused(value => !value)}
        className="-m-[9px] grid size-6 shrink-0 place-items-center rounded-full transition-colors duration-150 ease-out hover:bg-surface-1"
      >
        <span
          aria-hidden="true"
          className={clsx(
            "size-1.5 rounded-full border border-accent",
            paused ? "bg-transparent" : "bg-accent"
          )}
        />
      </button>
      <span className="gg-label">{messages.location}</span>
      <span className="gg-meta text-text-primary">
        {clock ? (
          <time>{clock.time}</time>
        ) : (
          <span aria-hidden="true">--:--:--</span>
        )}{" "}
        <span className="inline-block min-w-[3ch] text-text-secondary">
          {clock?.zone}
        </span>
      </span>
      {/* モバイルでは常に独立した 1 行。中身が後から入っても高さは変わらない */}
      <span className="min-h-[1lh] basis-full text-[13px] text-text-secondary sm:basis-auto">
        {clock?.difference}
      </span>
    </p>
  )
}
