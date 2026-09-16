import { CoursesPage } from "@/components/geist/courses-page"
import { getDictionary } from "@/i18n/dictionaries"
import { getSiteUrl } from "@/lib/seo/site-url"
import type { Metadata } from "next"

const siteUrl = getSiteUrl()
const dict = getDictionary("ja")

export const metadata: Metadata = {
  title: dict.courses.metaTitle,
  description: dict.courses.metaDescription,
  alternates: {
    canonical: `${siteUrl}/courses`,
  },
}

export default function CoursesRoute() {
  return <CoursesPage locale="ja" dict={dict} />
}
