/**
 * トップページ（個人プロフィール）— Geist Grid の正典実装。
 *
 * このファイルが、以後 Geist Grid へ移行するページの参照実装になる。守っている規則:
 *   - 色はセマンティックトークン経由のみ。生 hex・`gray-*`・`dark:` を書かない
 *   - セルは `gg-cell-grid` + `gg-cell`（gap 1px + 親背景）で罫線を 1px に保つ。角丸 0
 *   - 各セルの上辺に英語の Mono ラベル（`gg-label`）
 *   - グローは 1 ページ 2 個以内・1 ビューポート 1 個・静止（ここではヒーローの 1 個のみ）
 *   - グラデーション罫線（`gg-rule-accent`）は 1 ページ 2 本まで（ここでは 1 本）
 *   - 行の形が違うセクションを混ぜる（数値セル / 2 カラム / 年表 / リスト）
 *
 * 詳細は `.claude/skills/geist-grid-design/SKILL.md`。
 */

import { book } from "@/data/book"
import type { Dictionary } from "@/i18n/dictionaries"
import type { Locale } from "@/i18n/locale"
import { localizePath } from "@/i18n/locale"
import { DISCORD_INVITE_URL } from "@/lib/constants"
import { getLatestCoupons } from "@/lib/coupons/coupon-data"
import { getAllVideos } from "@/lib/videos/video-data"
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
  { name: "Udemy", url: "/coupons", Icon: UdemyIcon },
] as const

/** 外部リンクの末尾に置く矢印 */
function ExternalArrow() {
  return (
    <span aria-hidden="true" className="text-text-secondary ml-1 text-[12px]">
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
        <h2 className="gg-label">{label}</h2>
        <span aria-hidden="true" className="bg-border h-px flex-1" />
      </div>
      <p className="text-text-primary mt-3 text-[20px] leading-[1.5] font-medium tracking-[-0.01em] sm:text-2xl sm:tracking-[-0.015em]">
        {heading}
      </p>
      <div className="mt-6">{children}</div>
    </section>
  )
}

function StatCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="gg-cell">
      <p className="gg-label">{label}</p>
      <p className="text-text-primary mt-3 font-mono text-[32px] leading-none font-medium tabular-nums sm:text-[40px]">
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
  const videoCount = getAllVideos().length
  const courseCount = getLatestCoupons().length

  const bookFacts = [
    { label: dict.book.releaseLabel, value: book.releaseDateLabel },
    { label: dict.book.publisherLabel, value: book.publisher },
    { label: dict.book.priceLabel, value: book.price },
    { label: dict.book.formatLabel, value: book.format },
    { label: dict.book.isbnLabel, value: book.isbn },
  ]

  const teachingHrefs = [
    localizePath("/coupons", locale),
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
            className="gg-grid-field pointer-events-none absolute inset-0 -z-10"
          />
          <div className="mx-auto max-w-[1120px] px-4 pt-16 pb-12 sm:px-6 sm:pt-24 sm:pb-16 lg:px-8">
            <div className="grid items-start gap-10 lg:grid-cols-[1fr_auto]">
              <div className="max-w-[720px]">
                <p className="gg-label">{dict.hero.label}</p>
                <h1 className="text-text-primary mt-4 text-[40px] leading-[1.15] font-semibold tracking-[-0.02em] sm:text-[56px] sm:leading-[1.1]">
                  {dict.hero.name}
                </h1>
                <p className="gg-meta text-text-secondary mt-3">
                  {dict.hero.legalName}
                </p>
                <p className="text-text-primary mt-6 text-[18px] leading-[1.6] font-medium">
                  {dict.hero.role}
                </p>
                <p className="gg-prose-ja text-text-secondary mt-4 text-[16px]">
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
                    href={localizePath("/coupons", locale)}
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

              <div className="border-border w-full max-w-[280px] border">
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

        <div className="mx-auto max-w-[1120px] px-4 pb-24 sm:px-6 sm:pb-32 lg:px-8">
          {/* ── STATS ─────────────────────────────────────── */}
          <section className="mt-12 sm:mt-16">
            <h2 className="sr-only">{dict.hero.label}</h2>
            <div className="gg-cell-grid grid-cols-2 lg:grid-cols-4">
              <StatCell
                label={dict.stats.since}
                value={dict.stats.sinceValue}
              />
              <StatCell
                label={dict.stats.courses}
                value={String(courseCount)}
              />
              <StatCell label={dict.stats.videos} value={String(videoCount)} />
              <StatCell
                label={dict.stats.students}
                value={dict.stats.studentsValue}
              />
            </div>
          </section>

          {/* ── BOOK ──────────────────────────────────────── */}
          <Section label={dict.book.label} heading={dict.book.heading}>
            <p className="gg-prose-ja text-text-secondary mb-6 max-w-[720px] text-[18px]">
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
                <h3 className="text-text-primary mt-3 text-[20px] leading-[1.5] font-medium tracking-[-0.01em] sm:text-2xl">
                  {book.title}
                </h3>

                <dl className="border-border mt-5 border-t">
                  {bookFacts.map(fact => (
                    <div
                      key={fact.label}
                      className="border-border flex gap-4 border-b py-2.5"
                    >
                      <dt className="text-text-secondary w-[88px] shrink-0 text-[14px]">
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
                      className="gg-prose-ja text-text-secondary text-[14px]"
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
                    className="gg-link text-[14px]"
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
                return (
                  <div key={item.label} className="gg-cell gg-cell-hover">
                    <p className="gg-label">{item.label}</p>
                    <h3 className="text-text-primary mt-3 text-[16px] font-medium">
                      {item.title}
                    </h3>
                    <p className="gg-prose-ja text-text-secondary mt-3 text-[14px]">
                      {item.body}
                    </p>
                    {external ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="gg-link mt-4 inline-block text-[14px]"
                      >
                        {item.cta}
                        <ExternalArrow />
                      </a>
                    ) : (
                      <Link
                        href={href}
                        className="gg-link mt-4 inline-block text-[14px]"
                      >
                        {item.cta}
                      </Link>
                    )}
                  </div>
                )
              })}
            </div>
            <p className="gg-meta text-text-secondary mt-4">
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
                    <p className="gg-label pt-1">{entry.year}</p>
                    <div>
                      <h3 className="text-text-primary text-[16px] font-medium">
                        {entry.title}
                      </h3>
                      <p className="gg-prose-ja text-text-secondary mt-2 text-[14px]">
                        {entry.body}
                      </p>
                    </div>
                  </div>
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
                <ul className="border-border mt-3 border-t">
                  {dict.credentials.certifications.map(item => (
                    <li
                      key={item}
                      className="border-border text-text-secondary border-b py-2.5 text-[14px]"
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
                <h3 className="text-text-primary mt-3 text-[16px] font-medium">
                  {dict.credentials.speakingTitle}
                </h3>
                <p className="text-text-primary mt-2 text-[14px]">
                  {dict.credentials.speakingSubtitle}
                </p>
                <p className="gg-prose-ja text-text-secondary mt-3 text-[14px]">
                  {dict.credentials.speakingBody}
                </p>
                <a
                  href={SPEAKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gg-link mt-4 inline-block text-[14px]"
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
              {PROFILE_LINKS.map(({ name, url, Icon }) => {
                const external = url.startsWith("http")
                const className =
                  "gg-cell gg-cell-hover text-text-secondary hover:text-text-primary flex items-center gap-2 transition-colors"
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
