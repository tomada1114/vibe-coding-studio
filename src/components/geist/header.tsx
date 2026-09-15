"use client"

import type { Dictionary, NavKey } from "@/i18n/dictionaries"
import { getDictionary } from "@/i18n/dictionaries"
import type { Locale } from "@/i18n/locale"
import {
  getLocaleAlternates,
  getLocaleFromPathname,
  LOCALE_HTML_LANG,
  localizePath,
} from "@/i18n/locale"
import { clsx } from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { ThemeToggle } from "./theme-toggle"

const NAV: { key: NavKey; href: string }[] = [
  { key: "home", href: "/" },
  { key: "docs", href: "/docs" },
  { key: "videos", href: "/videos" },
  { key: "community", href: "/community" },
  { key: "coupons", href: "/coupons" },
  { key: "roadmap", href: "/roadmap" },
]

function isPathActive(pathname: string | null, href: string, locale: Locale) {
  if (!pathname) return false
  if (href === "/") return pathname === "/" || pathname === "/en"
  // 英語トップ以外は日本語 URL を共有するため、ロケールに関わらず前方一致で判定する
  void locale
  return pathname === href || pathname.startsWith(`${href}/`)
}

function LanguageToggle({
  locale,
  alternates,
  groupLabel,
}: {
  locale: Locale
  alternates: Record<Locale, string>
  groupLabel: string
}) {
  return (
    <div
      role="group"
      aria-label={groupLabel}
      className="border-border inline-flex h-7 overflow-hidden rounded-[6px] border"
    >
      {(["ja", "en"] as const).map((code, index) => {
        const active = locale === code
        return (
          <Link
            key={code}
            href={alternates[code]}
            hrefLang={LOCALE_HTML_LANG[code]}
            aria-current={active ? "true" : undefined}
            className={clsx(
              "flex items-center px-[10px] font-mono text-[11px] tracking-[0.08em] uppercase transition-colors",
              index > 0 && "border-border border-l",
              active
                ? "bg-surface-1 text-text-primary"
                : "text-text-secondary hover:text-text-primary"
            )}
          >
            {code}
          </Link>
        )
      })}
    </div>
  )
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
      className="size-4"
    >
      {open ? (
        <path d="M3.5 3.5 12.5 12.5M12.5 3.5 3.5 12.5" />
      ) : (
        <path d="M2 4.75h12M2 11.25h12" />
      )}
    </svg>
  )
}

export function Header({ dictionary }: { dictionary?: Dictionary } = {}) {
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname)
  const dict = dictionary ?? getDictionary(locale)
  const alternates = getLocaleAlternates(pathname)
  const [menuOpen, setMenuOpen] = useState(false)

  // ページ遷移したらモバイルメニューを閉じる
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <header className="bg-bg/80 border-border sticky top-0 z-50 border-b backdrop-blur-[8px]">
      <a
        href="#main-content"
        className="focus:bg-bg focus:text-text-primary focus:border-border sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:rounded-[6px] focus:border focus:px-4 focus:py-2 focus:text-sm focus:font-medium"
      >
        {dict.header.skipToContent}
      </a>
      <div className="mx-auto flex h-14 max-w-[1120px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMenuOpen(o => !o)}
            aria-expanded={menuOpen}
            aria-controls="gg-mobile-nav"
            aria-label={menuOpen ? dict.header.menuClose : dict.header.menuOpen}
            className="text-text-secondary hover:text-text-primary hover:bg-surface-1 -ml-1 flex size-8 items-center justify-center rounded-[6px] transition-colors lg:hidden"
          >
            <MenuIcon open={menuOpen} />
          </button>
          <Link
            href={localizePath("/", locale)}
            className="text-text-primary text-[15px] font-medium whitespace-nowrap"
          >
            Vibe Coding Studio
          </Link>
        </div>

        <nav
          aria-label={dict.nav.label}
          className="hidden h-14 items-stretch lg:flex"
        >
          {NAV.map(({ key, href }) => {
            const active = isPathActive(pathname, href, locale)
            return (
              <Link
                key={key}
                href={localizePath(href, locale)}
                aria-current={active ? "page" : undefined}
                className={clsx(
                  "relative flex items-center px-3 text-sm transition-colors",
                  active
                    ? "text-text-primary"
                    : "text-text-secondary hover:text-text-primary"
                )}
              >
                {dict.nav.items[key]}
                {active && (
                  <span
                    aria-hidden="true"
                    className="bg-accent absolute inset-x-0 bottom-0 h-px"
                  />
                )}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageToggle
            locale={locale}
            alternates={alternates}
            groupLabel={dict.header.languageGroupLabel}
          />
          <ThemeToggle
            label={dict.header.themeToggleLabel}
            toLightLabel={dict.header.themeToggleToLight}
            toDarkLabel={dict.header.themeToggleToDark}
          />
        </div>
      </div>

      {menuOpen && (
        <nav
          id="gg-mobile-nav"
          aria-label={dict.nav.label}
          className="border-border bg-bg border-t lg:hidden"
        >
          <ul className="mx-auto max-w-[1120px] px-4 py-2 sm:px-6">
            {NAV.map(({ key, href }) => {
              const active = isPathActive(pathname, href, locale)
              return (
                <li key={key}>
                  <Link
                    href={localizePath(href, locale)}
                    aria-current={active ? "page" : undefined}
                    className={clsx(
                      "block py-2.5 text-sm transition-colors",
                      active
                        ? "text-text-primary font-medium"
                        : "text-text-secondary hover:text-text-primary"
                    )}
                  >
                    {dict.nav.items[key]}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      )}
    </header>
  )
}
