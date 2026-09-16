import CommunityPage from "@/components/geist/community-page"
import { getDictionary } from "@/i18n/dictionaries"
import { getSiteUrl } from "@/lib/seo/site-url"
import type { Metadata } from "next"

const siteUrl = getSiteUrl()
const dict = getDictionary("ja")

export const metadata: Metadata = {
  title: dict.community.metaTitle,
  description: dict.community.metaDescription,
  openGraph: {
    title: dict.community.ogTitle,
    description: dict.community.metaDescription,
    type: "website",
    url: `${siteUrl}/community`,
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
    canonical: `${siteUrl}/community`,
  },
}

export const revalidate = 3600

export default function CommunityRoute() {
  return <CommunityPage locale="ja" dict={dict} />
}
