/**
 * i18n — ロケール定義とパス解決
 *
 * 方式: `/en` プレフィクス。日本語は既定でプレフィクスなし（既存 URL を維持）。
 * 翻訳対象はトップ・講座一覧・コミュニティの 3 面。英語版を持たないページは
 * 言語トグルから英語トップへフォールバックする。
 *
 * 将来 next-intl などへ移行する場合も `src/i18n/dictionaries.ts` の
 * メッセージ構造はそのまま流用できるようにしてある。
 */

export const LOCALES = ["ja", "en"] as const

export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = "ja"

// 英語版を持つ日本語パス。ここに足すだけで localizePath / getLocaleAlternates が追随する。
export const EN_ENABLED_PATHS = ["/", "/courses", "/community"] as const

/** `/en` プレフィクスを持つロケール（既定ロケールはプレフィクスなし） */
export const LOCALE_PREFIX: Record<Locale, string> = {
  ja: "",
  en: "/en",
}

/** `<html lang>` / `hreflang` に使う BCP 47 タグ */
export const LOCALE_HTML_LANG: Record<Locale, string> = {
  ja: "ja",
  en: "en",
}

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value)
}

/**
 * パス名からロケールを判定する。
 * `/en` および `/en/...` のみ英語。それ以外は全て日本語。
 */
export function getLocaleFromPathname(pathname: string | null): Locale {
  if (!pathname) return DEFAULT_LOCALE
  if (pathname === "/en" || pathname.startsWith("/en/")) return "en"
  return DEFAULT_LOCALE
}

/**
 * ロケールを付けた内部パスを返す。
 */
export function localizePath(pathname: string, locale: Locale): string {
  if (locale === DEFAULT_LOCALE) return pathname
  if (
    !EN_ENABLED_PATHS.includes(pathname as (typeof EN_ENABLED_PATHS)[number])
  ) {
    return pathname
  }
  return pathname === "/" ? "/en" : `/en${pathname}`
}

/** 現在のパスに対応する、各ロケールの URL を返す（言語トグル用） */
export function getLocaleAlternates(
  pathname: string | null
): Record<Locale, string> {
  const path = pathname && pathname !== "" ? pathname : "/"
  const jaPath =
    path === "/en" ? "/" : path.startsWith("/en/") ? path.slice(3) : path
  return {
    ja: jaPath,
    en: EN_ENABLED_PATHS.includes(jaPath as (typeof EN_ENABLED_PATHS)[number])
      ? localizePath(jaPath, "en")
      : "/en",
  }
}
