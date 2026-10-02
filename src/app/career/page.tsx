/**
 * 経歴ページ（日本語）
 *
 * 実装は `src/components/geist/career-page.tsx`。英語版は `src/app/en/career/page.tsx`。
 * トップページ（個人プロフィール）から経歴の全文を分割したもの。
 */
import { CareerPage } from "@/components/geist/career-page"
import { getDictionary } from "@/i18n/dictionaries"
import { getSiteUrl } from "@/lib/seo/site-url"
import type { Metadata } from "next"

const dict = getDictionary("ja")
const siteUrl = getSiteUrl()

export const metadata: Metadata = {
  title: dict.career.page.metaTitle,
  description: dict.career.page.metaDescription,
  alternates: {
    canonical: `${siteUrl}/career`,
    languages: {
      ja: `${siteUrl}/career`,
      en: `${siteUrl}/en/career`,
      "x-default": `${siteUrl}/career`,
    },
  },
  openGraph: {
    type: "profile",
    locale: "ja_JP",
    url: `${siteUrl}/career`,
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

export default function CareerRoute() {
  return <CareerPage locale="ja" dict={dict} />
}
