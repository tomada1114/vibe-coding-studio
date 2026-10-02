/**
 * 経歴ページ（英語）
 *
 * 実装は日本語版と共有（`src/components/geist/career-page.tsx`）。
 */
import { CareerPage } from "@/components/geist/career-page"
import { HtmlLang } from "@/components/geist/html-lang"
import { getDictionary } from "@/i18n/dictionaries"
import { getSiteUrl } from "@/lib/seo/site-url"
import type { Metadata } from "next"

const dict = getDictionary("en")
const siteUrl = getSiteUrl()

export const metadata: Metadata = {
  title: dict.career.page.metaTitle,
  description: dict.career.page.metaDescription,
  alternates: {
    canonical: `${siteUrl}/en/career`,
    languages: {
      ja: `${siteUrl}/career`,
      en: `${siteUrl}/en/career`,
      "x-default": `${siteUrl}/career`,
    },
  },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: `${siteUrl}/en/career`,
    title: dict.career.page.metaTitle,
    description: dict.career.page.metaDescription,
    // openGraph を上書きすると layout の images が引き継がれないので明示する
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: dict.career.page.metaTitle,
      },
    ],
  },
}

export default function EnglishCareer() {
  return (
    <>
      <HtmlLang locale="en" />
      <CareerPage locale="en" dict={dict} />
    </>
  )
}
