import { CoursesPage } from "@/components/geist/courses-page"
import { HtmlLang } from "@/components/geist/html-lang"
import { getDictionary } from "@/i18n/dictionaries"
import { getSiteUrl } from "@/lib/seo/site-url"
import type { Metadata } from "next"

const dict = getDictionary("en")
const siteUrl = getSiteUrl()

export const metadata: Metadata = {
  title: dict.courses.metaTitle,
  description: dict.courses.metaDescription,
  alternates: {
    canonical: `${siteUrl}/en/courses`,
    languages: {
      ja: `${siteUrl}/courses`,
      en: `${siteUrl}/en/courses`,
      "x-default": `${siteUrl}/courses`,
    },
  },
}

export default function EnglishCourses() {
  return (
    <>
      <HtmlLang locale="en" />
      <CoursesPage locale="en" dict={dict} />
    </>
  )
}
