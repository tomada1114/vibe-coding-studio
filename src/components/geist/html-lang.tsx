"use client"

import type { Locale } from "@/i18n/locale"
import { LOCALE_HTML_LANG } from "@/i18n/locale"
import { useEffect } from "react"

/**
 * `<html lang>` をロケールに合わせる。
 *
 * `<html>` を出力できるのはルートレイアウトだけで、そこではパスを知れない。
 * ルートは `lang="ja"` を出力し、英語ページだけがマウント後に上書きする。
 */
export function HtmlLang({ locale }: { locale: Locale }) {
  useEffect(() => {
    const previous = document.documentElement.lang
    document.documentElement.lang = LOCALE_HTML_LANG[locale]
    return () => {
      document.documentElement.lang = previous
    }
  }, [locale])

  return null
}
