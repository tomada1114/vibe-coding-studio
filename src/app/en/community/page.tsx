import CommunityPage from "@/components/geist/community-page"
import { HtmlLang } from "@/components/geist/html-lang"
import { getDictionary } from "@/i18n/dictionaries"
import { getSiteUrl } from "@/lib/seo/site-url"
import type { Metadata } from "next"

const dict = getDictionary("en")
const siteUrl = getSiteUrl()

export const metadata: Metadata = {
  title: dict.community.metaTitle,
  description: dict.community.metaDescription,
  openGraph: {
    title: dict.community.ogTitle,
    description: dict.community.metaDescription,
    type: "website",
    url: `${siteUrl}/en/community`,
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: dict.community.ogTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: dict.community.ogTitle,
    description: dict.community.metaDescription,
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: `${siteUrl}/en/community`,
    languages: {
      ja: `${siteUrl}/community`,
      en: `${siteUrl}/en/community`,
      "x-default": `${siteUrl}/community`,
    },
  },
}

export const revalidate = 3600

export default function EnglishCommunity() {
  return (
    <>
      <HtmlLang locale="en" />
      <CommunityPage locale="en" dict={dict} />
    </>
  )
}
