/**
 * トップページ（日本語）— 個人プロフィール
 *
 * 実装は `src/components/geist/profile-page.tsx`（Geist Grid の正典実装）。
 * 英語版は `src/app/en/page.tsx`。
 */
import { ProfilePage } from "@/components/geist/profile-page"
import { ProfileStructuredData } from "@/components/geist/profile-structured-data"
import { getDictionary } from "@/i18n/dictionaries"
import { getSiteUrl } from "@/lib/seo/site-url"
import type { Metadata } from "next"

const dict = getDictionary("ja")
const siteUrl = getSiteUrl()

export const metadata: Metadata = {
  title: dict.meta.title,
  description: dict.meta.description,
  alternates: {
    canonical: siteUrl,
    languages: {
      ja: siteUrl,
      en: `${siteUrl}/en`,
      "x-default": siteUrl,
    },
  },
  openGraph: {
    type: "profile",
    locale: "ja_JP",
    url: siteUrl,
    title: dict.meta.title,
    description: dict.meta.description,
  },
}

export default function Home() {
  return (
    <>
      <ProfileStructuredData />
      <ProfilePage locale="ja" dict={dict} />
    </>
  )
}
