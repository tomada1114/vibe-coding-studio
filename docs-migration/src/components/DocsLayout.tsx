import { type Node } from '@markdoc/markdoc'

import { DocsHeader } from '@/components/DocsHeader'
import { DocsStructuredData } from '@/components/DocsStructuredData'
import { DocsArticleStructuredData } from '@/components/structured-data/DocsArticleStructuredData'
import { PrevNextLinks } from '@/components/PrevNextLinks'
import { Prose } from '@/components/Prose'
import { AuthorCredit } from '@/components/docs/AuthorCredit'
import { DocsBreadcrumb } from '@/components/docs/DocsBreadcrumb'

export function DocsLayout({
  children,
  frontmatter: { title, author, createdAt, updatedAt },
  _nodes,
}: {
  children: React.ReactNode
  frontmatter: {
    title?: string
    author?: string
    createdAt?: string
    updatedAt?: string
  }
  _nodes: Array<Node>
}) {
  return (
    <>
      {/* 既存の構造化データ（互換性のため残す） */}
      {title && (
        <DocsStructuredData
          title={title}
          author={author}
          datePublished={createdAt}
          dateModified={updatedAt}
        />
      )}

      {/* 新しいDocs専用の構造化データ */}
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

          {/* 作成者情報をコンテンツ下部に目立たない形で表示 */}
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
