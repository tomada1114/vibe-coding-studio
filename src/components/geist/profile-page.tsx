/**
 * トップページ（個人プロフィール）— Geist Grid の正典実装。
 *
 * このファイルが、以後 Geist Grid へ移行するページの参照実装になる。守っている規則:
 *   - 色はセマンティックトークン経由のみ。生 hex・`gray-*`・`dark:` を書かない
 *   - セルは `gg-cell-grid` + `gg-cell`（gap 1px + 親背景）で罫線を 1px に保つ。角丸 0
 *   - 各セルの上辺に英語の Mono ラベル（`gg-label`）
 *   - グローは 1 ページ 2 個以内・1 ビューポート 1 個・静止（ここではヒーローの 1 個のみ）
 *   - グラデーション罫線（`gg-rule-accent`）は 1 ページ 2 本まで（ここでは 1 本）
 *   - 行の形が違うセクションを混ぜる（数値セル / 2 カラム / 年表 / タグ群 / リスト）
 *
 * 詳細は `.claude/skills/geist-grid-design/SKILL.md`。
 */

import { book } from "@/data/book"
import { getAllUdemyCourses } from "@/data/udemy-courses"
import type { Dictionary } from "@/i18n/dictionaries"
import type { Locale } from "@/i18n/locale"
import { localizePath } from "@/i18n/locale"
import { DISCORD_INVITE_URL } from "@/lib/constants"
import { clsx } from "clsx"
import Image from "next/image"
import Link from "next/link"
import {
  GitHubIcon,
  LinkedInIcon,
  NoteIcon,
  QiitaIcon,
  UdemyIcon,
  XIcon,
  YouTubeIcon,
} from "./social-icons"

const YOUTUBE_URL = "https://www.youtube.com/@vibe-coding-studio"
const SPEAKING_URL = "https://ai-fest-tokyo.connpass.com/event/369543/"

const PROFILE_LINKS = [
  { name: "X", url: "https://x.com/muscle_coding", Icon: XIcon },
  { name: "YouTube", url: YOUTUBE_URL, Icon: YouTubeIcon },
  { name: "GitHub", url: "https://github.com/tomada1114", Icon: GitHubIcon },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/tomoshi-masuyama-5b4b31199/",
    Icon: LinkedInIcon,
  },
  { name: "Qiita", url: "https://qiita.com/tomada", Icon: QiitaIcon },
  { name: "note", url: "https://note.com/tomada", Icon: NoteIcon },
  { name: "Udemy", url: "/courses", Icon: UdemyIcon },
] as const

/** 外部リンクの末尾に置く矢印 */
function ExternalArrow() {
  return (
    <span aria-hidden="true" className="ml-1 text-[12px] text-text-secondary">
      ↗
    </span>
  )
}

function Section({
  label,
  heading,
  children,
  className,
}: {
  label: string
  heading: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section className={clsx("mt-16 sm:mt-24", className)}>
      <div className="flex items-baseline gap-3">
        <p className="gg-label">{label}</p>
        <span aria-hidden="true" className="h-px flex-1 bg-border" />
      </div>
      <h2 className="mt-3 text-[20px] leading-[1.5] font-medium text-text-primary sm:text-2xl sm:tracking-[-0.015em]">
        {heading}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  )
}

function StatCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="gg-cell">
      <p className="gg-label">{label}</p>
      <p className="mt-3 font-mono text-[32px] leading-none font-medium text-text-primary tabular-nums sm:text-[40px]">
        {value}
      </p>
    </div>
  )
}

export function ProfilePage({
  locale,
  dict,
}: {
  locale: Locale
  dict: Dictionary
}) {
  const courseCount = getAllUdemyCourses().length

  const bookFacts = [
    { label: dict.book.releaseLabel, value: book.releaseDateLabel },
    { label: dict.book.publisherLabel, value: book.publisher },
    { label: dict.book.priceLabel, value: book.price },
    { label: dict.book.formatLabel, value: book.format },
    { label: dict.book.isbnLabel, value: book.isbn },
  ]

  const teachingHrefs = [
    localizePath("/courses", locale),
    YOUTUBE_URL,
    localizePath("/community", locale),
  ]

  return (
    <div className="gg-surface">
      <main id="main-content">
        {/* ── HERO ─────────────────────────────────────────────
            グローはこのページで唯一の 1 個。静止。 */}
        <div className="gg-glow relative isolate overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 gg-grid-field"
          />
          <div className="gg-container pt-16 pb-12 sm:pt-24 sm:pb-16">
            <div className="grid items-start gap-10 lg:grid-cols-[1fr_auto]">
              <div className="max-w-[720px]">
                <p className="gg-label">{dict.hero.label}</p>
                <h1 className="mt-4 text-[40px] leading-[1.15] font-semibold tracking-[-0.02em] text-text-primary sm:text-[56px] sm:leading-[1.1]">
                  {dict.hero.name}
                </h1>
                <p className="mt-3 gg-meta text-text-secondary">
                  {dict.hero.legalName}
                </p>
                <p className="mt-6 text-[18px] leading-[1.6] font-medium text-text-primary">
                  {dict.hero.role}
                </p>
                <p className="mt-4 text-[16px] gg-prose-ja text-text-secondary">
                  {dict.hero.lead}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a
                    href={book.amazonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gg-btn gg-btn-primary"
                  >
                    {dict.hero.primaryCta}
                  </a>
                  <Link
                    href={localizePath("/courses", locale)}
                    className="gg-btn gg-btn-outline"
                  >
                    {dict.hero.secondaryCta}
                  </Link>
                  <a
                    href={YOUTUBE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gg-btn gg-btn-outline"
                  >
                    {dict.hero.tertiaryCta}
                    <ExternalArrow />
                  </a>
                </div>
              </div>

              <div className="w-full max-w-[280px] overflow-hidden rounded-[6px] border border-border">
                <Image
                  src="/tomada.png"
                  alt={dict.hero.photoAlt}
                  width={560}
                  height={560}
                  priority
                  sizes="(max-width: 1024px) 280px, 280px"
                  className="h-auto w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* グラデーション罫線。このページで唯一の 1 本。 */}
        <div aria-hidden="true" className="gg-rule-accent" />

        <div className="gg-container pb-24 sm:pb-32">
          {/* ── STATS ─────────────────────────────────────── */}
          <section className="mt-12 sm:mt-16">
            <h2 className="sr-only">{dict.hero.label}</h2>
            <div className="gg-cell-grid grid-cols-1 sm:grid-cols-3">
              <StatCell
                label={dict.stats.since}
                value={dict.stats.sinceValue}
              />
              <StatCell
                label={dict.stats.courses}
                value={String(courseCount)}
              />
              <StatCell
                label={dict.stats.students}
                value={dict.stats.studentsValue}
              />
            </div>
          </section>

          {/* ── BOOK ──────────────────────────────────────── */}
          <Section label={dict.book.label} heading={dict.book.heading}>
            <p className="mb-6 max-w-[720px] text-[18px] gg-prose-ja text-text-secondary">
              {dict.book.lead}
            </p>
            <div className="gg-cell-grid grid-cols-1 lg:grid-cols-[320px_1fr]">
              <div className="gg-cell">
                <p className="gg-label">Cover</p>
                <Image
                  src={book.cover.src}
                  alt={book.cover.alt}
                  width={book.cover.width}
                  height={book.cover.height}
                  sizes="(max-width: 1024px) 240px, 280px"
                  className="mt-3 h-auto w-full max-w-[280px] rounded-[6px]"
                />
              </div>

              <div className="gg-cell">
                <p className="gg-label">Title</p>
                <h3 className="mt-3 text-[20px] leading-[1.5] font-medium text-text-primary sm:text-2xl sm:tracking-[-0.015em]">
                  {book.title}
                </h3>

                <dl className="mt-5 border-t border-border">
                  {bookFacts.map(fact => (
                    <div
                      key={fact.label}
                      className="flex gap-4 border-b border-border py-2.5"
                    >
                      <dt className="w-[88px] shrink-0 text-[14px] text-text-secondary">
                        {fact.label}
                      </dt>
                      <dd className="gg-meta text-text-primary">
                        {fact.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-5 space-y-4">
                  {dict.book.body.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-[14px] gg-prose-ja text-text-secondary"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href={book.amazonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gg-btn gg-btn-secondary"
                  >
                    {book.ctaLabel}
                  </a>
                  <a
                    href={book.publisherUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[14px] gg-link"
                  >
                    {dict.book.tocCta}
                    <ExternalArrow />
                  </a>
                </div>
              </div>
            </div>
          </Section>

          {/* ── TEACHING ──────────────────────────────────── */}
          <Section label={dict.teaching.label} heading={dict.teaching.heading}>
            <div className="gg-cell-grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {dict.teaching.items.map((item, index) => {
                const href = teachingHrefs[index]
                const external = href.startsWith("http")
                const isLast = index === dict.teaching.items.length - 1
                return (
                  <div
                    key={item.label}
                    className={clsx(
                      "gg-cell gg-cell-hover",
                      // 3件を sm:2列で並べると最終行が1個だけ余り、
                      // gg-cell-grid の親背景（罫線色）がそのまま空セルとして
                      // 露出してしまう。最後のセルを2列分に広げて埋める。
                      isLast && "sm:col-span-2 lg:col-span-1"
                    )}
                  >
                    <p className="gg-label">{item.label}</p>
                    <h3 className="mt-3 text-[16px] font-medium text-text-primary">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-[14px] gg-prose-ja text-text-secondary">
                      {item.body}
                    </p>
                    {external ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-block text-[14px] gg-link"
                      >
                        {item.cta}
                        <ExternalArrow />
                      </a>
                    ) : (
                      <Link
                        href={href}
                        className="mt-4 inline-block text-[14px] gg-link"
                      >
                        {item.cta}
                      </Link>
                    )}
                  </div>
                )
              })}
            </div>
            <p className="mt-4 gg-meta text-text-secondary">
              Discord:{" "}
              <a
                href={DISCORD_INVITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="gg-link"
              >
                discord.gg
                <ExternalArrow />
              </a>
            </p>
          </Section>

          {/* ── CAREER ────────────────────────────────────── */}
          <Section label={dict.career.label} heading={dict.career.heading}>
            <div className="gg-cell-grid grid-cols-1">
              {dict.career.entries.map(entry => (
                <div key={entry.year} className="gg-cell">
                  <div className="grid gap-3 sm:grid-cols-[96px_1fr] sm:gap-6">
                    <p className="pt-1 gg-label">{entry.year}</p>
                    <div>
                      <h3 className="text-[16px] font-medium text-text-primary">
                        {entry.title}
                      </h3>
                      <p className="mt-2 text-[14px] gg-prose-ja text-text-secondary">
                        {entry.body}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* ── STACK ─────────────────────────────────────── */}
          <Section label={dict.stack.label} heading={dict.stack.heading}>
            <p className="mb-6 max-w-[720px] text-[16px] gg-prose-ja text-text-secondary">
              {dict.stack.lead}
            </p>
            <div className="gg-cell-grid grid-cols-1 sm:grid-cols-2">
              {dict.stack.groups.map(group => (
                <div key={group.label} className="gg-cell">
                  <p className="gg-label">{group.label}</p>
                  <h3 className="mt-3 text-[16px] font-medium text-text-primary">
                    {group.title}
                  </h3>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {group.items.map(item => (
                      <li key={item} className="gg-tag">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>

          {/* ── CERTIFICATIONS / SPEAKING ─────────────────── */}
          <Section
            label={dict.credentials.certificationsLabel}
            heading={dict.credentials.certificationsHeading}
          >
            <div className="gg-cell-grid grid-cols-1 lg:grid-cols-2">
              <div className="gg-cell">
                <p className="gg-label">Credentials</p>
                <ul className="mt-3 border-t border-border">
                  {dict.credentials.certifications.map(item => (
                    <li
                      key={item}
                      className="border-b border-border py-2.5 text-[14px] text-text-secondary"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="gg-cell">
                <p className="gg-label">
                  {dict.credentials.speakingLabel} ·{" "}
                  {dict.credentials.speakingDate}
                </p>
                <h3 className="mt-3 text-[16px] font-medium text-text-primary">
                  {dict.credentials.speakingTitle}
                </h3>
                <p className="mt-2 text-[14px] text-text-primary">
                  {dict.credentials.speakingSubtitle}
                </p>
                <p className="mt-3 text-[14px] gg-prose-ja text-text-secondary">
                  {dict.credentials.speakingBody}
                </p>
                <a
                  href={SPEAKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-[14px] gg-link"
                >
                  {dict.credentials.speakingCta}
                  <ExternalArrow />
                </a>
              </div>
            </div>
          </Section>

          {/* ── LINKS ─────────────────────────────────────── */}
          <Section label={dict.links.label} heading={dict.links.heading}>
            <div className="gg-cell-grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7">
              {PROFILE_LINKS.map(({ name, url, Icon }, index) => {
                const external = url.startsWith("http")
                const isLast = index === PROFILE_LINKS.length - 1
                const className = clsx(
                  "gg-cell flex items-center gap-2 gg-cell-hover text-text-secondary transition-colors hover:text-text-primary",
                  // 7件を2列/4列で並べると最終行が余り、gg-cell-grid の
                  // 親背景（罫線色）がそのまま空セルとして露出する。
                  // 最後のセルを残り列数ぶん広げて埋める。
                  isLast && "col-span-2 lg:col-span-1"
                )
                const content = (
                  <>
                    <Icon className="size-4 shrink-0" />
                    <span className="gg-meta">{name}</span>
                    {external && <ExternalArrow />}
                  </>
                )
                return external ? (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={className}
                  >
                    {content}
                  </a>
                ) : (
                  <Link
                    key={name}
                    href={localizePath(url, locale)}
                    className={className}
                  >
                    {content}
                  </Link>
                )
              })}
            </div>
          </Section>
        </div>
      </main>
    </div>
  )
}
