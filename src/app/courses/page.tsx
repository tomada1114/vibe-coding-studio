import { CoursesPage } from "@/components/geist/courses-page"
import { getDictionary } from "@/i18n/dictionaries"
import { getSiteUrl } from "@/lib/seo/site-url"
import type { Metadata } from "next"

const siteUrl = getSiteUrl()

export const metadata: Metadata = {
  title: "講座一覧",
  description: "著者が公開しているUdemy講座の一覧です。",
  alternates: {
    canonical: `${siteUrl}/courses`,
  },
}

export default function CoursesRoute() {
  return <CoursesPage locale="ja" dict={getDictionary("ja")} />
}
