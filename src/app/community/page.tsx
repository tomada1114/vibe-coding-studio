import CommunityPage from "@/components/geist/community-page"
import { getSiteUrl } from "@/lib/seo/site-url"
import type { Metadata } from "next"

const siteUrl = getSiteUrl()
const communityTitle = "コミュニティ"
const communityOgTitle = "コミュニティ - Vibe Coding Studio"
const communityDescription =
  "AI駆動開発を学ぶ仲間と繋がり、最新検証を見ながら一緒に成長するDiscordコミュニティに参加しよう"

export const metadata: Metadata = {
  title: communityTitle,
  description: communityDescription,
  openGraph: {
    title: communityOgTitle,
    description: communityDescription,
    type: "website",
    url: `${siteUrl}/community`,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: communityOgTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: communityOgTitle,
    description: communityDescription,
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: `${siteUrl}/community`,
  },
}

export const revalidate = 3600

export default function CommunityRoute() {
  return <CommunityPage />
}
