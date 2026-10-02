/**
 * 経歴ページ（Geist Grid）
 *
 * トップページ（個人プロフィール）から分割した経歴の全文。トップには直近 3 件
 * だけを置き、各行がこのページの該当エントリ（`careerEntryId`）へリンクする。
 *
 * 守っている規則はトップページ（`profile-page.tsx`）と同じ:
 *   - 色はセマンティックトークン経由のみ。セルは `gg-cell-grid` + `gg-cell`
 *   - セルグリッドは罫線スポットライト（`gg-spotlight` + `data-spotlight`）に参加する
 *   - 動きで内容を隠さない。全エントリは最初から見えている
 */

import type { Dictionary } from "@/i18n/dictionaries"
import type { Locale } from "@/i18n/locale"
import { localizePath } from "@/i18n/locale"
import Link from "next/link"
import { GridSpotlight } from "./grid-spotlight"
import { HashTarget } from "./hash-target"

/** 経歴エントリのアンカー ID。"2025–2026" のような期間表記も ASCII に寄せる */
export function careerEntryId(year: string): string {
  return `career-${year.replace(/[^0-9A-Za-z]+/g, "-")}`
}

export function CareerPage({
  locale,
  dict,
}: {
  locale: Locale
  dict: Dictionary
}) {
  const entries = dict.career.entries
  const span = `${entries[0]?.year.slice(0, 4)} – ${entries.at(-1)?.year.slice(-4)}`

  return (
    <div className="gg-surface">
      <GridSpotlight />
      <HashTarget />
      <main id="main-content">
        <div className="gg-container pt-12 pb-24 sm:pt-16 sm:pb-32">
          <Link
            href={localizePath("/", locale)}
            className="group inline-flex items-center gap-1.5 text-[14px] text-text-secondary transition-colors duration-150 ease-out hover:text-text-primary"
          >
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-150 ease-out group-hover:-translate-x-0.5"
            >
              ←
            </span>
            {dict.career.page.backToProfile}
          </Link>

          <div className="mt-10 flex items-baseline gap-3">
            <p className="gg-label">{dict.career.label}</p>
            <span aria-hidden="true" className="h-px flex-1 bg-border" />
            <p className="gg-label">{span}</p>
          </div>
          <h1 className="mt-3 text-[32px] leading-[1.3] font-semibold tracking-[-0.02em] text-text-primary sm:text-[40px] sm:leading-[1.2]">
            {dict.career.heading}
          </h1>
          <p className="mt-4 max-w-[720px] text-[16px] gg-prose-ja text-text-secondary">
            {dict.career.page.lead}
          </p>

          <ol
            data-spotlight=""
            className="gg-spotlight mt-10 gg-cell-grid grid-cols-1"
          >
            {entries.map(entry => (
              <li
                key={entry.year}
                id={careerEntryId(entry.year)}
                className="gg-cell scroll-mt-24 data-current:bg-surface-1"
              >
                <div className="grid gap-3 sm:grid-cols-[112px_1fr] sm:gap-6">
                  <p className="pt-1.5 gg-label">{entry.year}</p>
                  <div className="max-w-[760px]">
                    <h2 className="text-[18px] leading-[1.5] font-medium text-text-primary">
                      {entry.title}
                    </h2>
                    <p className="mt-2 text-[14px] gg-prose-ja text-text-secondary sm:text-[15px]">
                      {entry.body}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </main>
    </div>
  )
}
