import { book } from "@/data/book"
import { getSiteUrl } from "@/lib/seo/site-url"

/**
 * トップページ（個人プロフィール）の JSON-LD。
 * 旧 `/founder` から移設。`@id` はトップページのものに付け替えてある。
 */
export function ProfileStructuredData() {
  const siteUrl = getSiteUrl()
  const personId = `${siteUrl}/#person`

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: "とまだ（Tomada）",
        alternateName: ["増山友司", "Tomoshi Masuyama"],
        jobTitle: "ソフトウェアエンジニア / AI駆動開発の実践者・教育者",
        url: siteUrl,
        sameAs: [
          "https://x.com/muscle_coding",
          "https://www.youtube.com/@vibe-coding-studio",
          "https://github.com/tomada1114",
          "https://www.linkedin.com/in/tomoshi-masuyama-5b4b31199/",
          "https://qiita.com/tomada",
          "https://zenn.dev/tmasuyama1114",
          "https://note.com/tomada",
        ],
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "北海道大学大学院",
        },
        worksFor: {
          "@type": "Organization",
          name: "Vibe Coding Studio",
        },
      },
      {
        "@type": "Book",
        "@id": `${siteUrl}/#book`,
        name: book.title,
        author: { "@id": personId },
        publisher: {
          "@type": "Organization",
          name: book.publisher,
        },
        isbn: book.isbn,
        numberOfPages: book.pages,
        datePublished: book.releaseDateISO,
        inLanguage: "ja",
        bookFormat: "https://schema.org/Paperback",
        url: book.publisherUrl,
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
