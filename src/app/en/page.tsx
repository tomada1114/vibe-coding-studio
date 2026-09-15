/**
 * トップページ（英語）— 個人プロフィール
 *
 * 実装は日本語版と共有（`src/components/geist/profile-page.tsx`）。
 * 英語版を持つのは現時点でこのページのみで、他のルートは日本語のまま。
 */
import { HtmlLang } from "@/components/geist/html-lang"
import { ProfilePage } from "@/components/geist/profile-page"
import { ProfileStructuredData } from "@/components/geist/profile-structured-data"
import { getDictionary } from "@/i18n/dictionaries"
import { getSiteUrl } from "@/lib/seo/site-url"
import type { Metadata } from "next"

const dict = getDictionary("en")
const siteUrl = getSiteUrl()

export const metadata: Metadata = {
  title: dict.meta.title,
  description: dict.meta.description,
  alternates: {
    canonical: `${siteUrl}/en`,
    languages: {
      ja: siteUrl,
      en: `${siteUrl}/en`,
      "x-default": siteUrl,
    },
  },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: `${siteUrl}/en`,
    title: dict.meta.title,
    description: dict.meta.description,
  },
}

export default function EnglishHome() {
  return (
    <>
      <HtmlLang locale="en" />
      <ProfileStructuredData />
      <ProfilePage locale="en" dict={dict} />
    </>
  )
}
