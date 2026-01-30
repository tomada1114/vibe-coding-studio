import { DocsHeader } from '@/components/DocsHeader'
import { DocsArticleStructuredData } from '@/components/structured-data/DocsArticleStructuredData'
import { PrevNextLinks } from '@/components/PrevNextLinks'
import { Prose } from '@/components/Prose'
import { AuthorCredit } from '@/components/docs/AuthorCredit'
import { DocsBreadcrumb } from '@/components/docs/DocsBreadcrumb'

export function DocsLayout({
  children,
  frontmatter: { title, author, createdAt, updatedAt },
}: {
  children: React.ReactNode
  frontmatter: {
    title?: string
    author?: string
    createdAt?: string
    updatedAt?: string
  }
}) {
  return (
    <>
      {title && (
        <DocsArticleStructuredData
          title={title}
          author={author}
          datePublished={createdAt}
          dateModified={updatedAt}
        />
      )}

      <div className="max-w-2xl min-w-0 flex-auto px-4 py-16 lg:max-w-none lg:pr-0 lg:pl-8 xl:px-16">
        <article>
          <DocsBreadcrumb title={title} />
          <DocsHeader title={title} />
          <Prose>{children}</Prose>

          <AuthorCredit
            authorName={author}
            createdAt={createdAt}
            updatedAt={updatedAt}
            className="text-right"
          />
        </article>

        <PrevNextLinks />
      </div>
    </>
  )
}
