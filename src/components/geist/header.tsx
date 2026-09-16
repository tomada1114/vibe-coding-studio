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
  { key: "community", href: "/community" },
  { key: "courses", href: "/courses" },
]

function normalizePathname(pathname: string, locale: Locale) {
  if (locale !== "en") return pathname
  if (pathname === "/en") return "/"
  return pathname.startsWith("/en/") ? pathname.slice(3) : pathname
}

function isPathActive(pathname: string | null, href: string, locale: Locale) {
  if (!pathname) return false
  const normalizedPathname = normalizePathname(pathname, locale)
  if (href === "/") return normalizedPathname === "/"
  return (
    normalizedPathname === href || normalizedPathname.startsWith(`${href}/`)
  )
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
      className="inline-flex h-7 rounded-[6px] border border-border"
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
              "relative z-0 flex h-full items-center px-[10px] font-mono text-[11px] tracking-[0.08em] uppercase transition-colors focus-visible:z-10",
              index === 0 ? "rounded-l-[6px]" : "rounded-r-[6px]",
              index > 0 && "border-l border-border",
              active
                ? "bg-surface-1 text-text-primary"
                : "text-text-label hover:text-text-primary"
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
    <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-[8px]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:rounded-[6px] focus:border focus:border-border focus:bg-bg focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-text-primary"
      >
        {dict.header.skipToContent}
      </a>
      <div className="gg-container flex h-14 items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMenuOpen(o => !o)}
            aria-expanded={menuOpen}
            aria-controls="gg-mobile-nav"
            aria-label={menuOpen ? dict.header.menuClose : dict.header.menuOpen}
            className="-ml-1 flex size-8 items-center justify-center rounded-[6px] text-text-secondary transition-colors hover:bg-surface-1 hover:text-text-primary lg:hidden"
          >
            <MenuIcon open={menuOpen} />
          </button>
          <Link
            href={localizePath("/", locale)}
            className="text-[15px] font-medium whitespace-nowrap text-text-primary"
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
                    className="absolute inset-x-0 bottom-0 h-px bg-accent"
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
          className="border-t border-border bg-bg lg:hidden"
        >
          <ul className="gg-container py-2">
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
                        ? "font-medium text-text-primary"
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
