/**
 * i18n — ロケール定義とパス解決
 *
 * 方式: `/en` プレフィクス。日本語は既定でプレフィクスなし（既存 URL を維持）。
 * 現時点の翻訳対象はヘッダー・フッター・トップページの 3 面のみ。
 * それ以外のページは日本語のままで、`/en` 配下のルートを持たない。
 *
 * 将来 next-intl などへ移行する場合も `src/i18n/dictionaries.ts` の
 * メッセージ構造はそのまま流用できるようにしてある。
 */

export const LOCALES = ["ja", "en"] as const

export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = "ja"

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
 *
 * 英語版が存在するのはトップページのみなので、それ以外のパスは
 * 英語ロケールでも日本語版の URL をそのまま返す（リンク切れを作らない）。
 */
export function localizePath(pathname: string, locale: Locale): string {
  if (locale === DEFAULT_LOCALE) return pathname
  if (pathname === "/") return "/en"
  return pathname
}

/** 現在のパスに対応する、各ロケールの URL を返す（言語トグル用） */
export function getLocaleAlternates(
  pathname: string | null
): Record<Locale, string> {
  const isTop =
    pathname === "/" ||
    pathname === "/en" ||
    pathname === null ||
    pathname === ""
  return {
    ja: isTop ? "/" : (pathname ?? "/"),
    en: isTop ? "/en" : "/en",
  }
}
