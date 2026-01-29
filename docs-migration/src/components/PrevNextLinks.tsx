'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { navigation } from '@/lib/navigation'

function ArrowIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" {...props}>
      <path d="m9.182 13.423-1.17-1.16 3.505-3.505H3V7.065h8.517l-3.506-3.5L9.181 2.4l5.512 5.511-5.511 5.512Z" />
    </svg>
  )
}

// ナビゲーションリンクの型定義を拡張
type NavigationLink = {
  title: string
  href: string
  children?: NavigationLink[]
}

function PageLink({
  title,
  href,
  dir = 'next',
  _children,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'div'>, 'dir' | 'title' | 'children'> & {
  title: string
  href: string
  dir?: 'previous' | 'next'
  _children?: NavigationLink[]
}) {
  return (
    <div {...props}>
      <dt className="font-display text-sm font-medium text-slate-900">
        {dir === 'next' ? 'Next' : 'Previous'}
      </dt>
      <dd className="mt-1">
        <Link
          href={href}
          className={clsx(
            'flex items-center gap-x-1 text-base font-semibold text-slate-700 hover:text-slate-600 dark:text-slate-200 dark:hover:text-slate-300',
            dir === 'previous' && 'flex-row-reverse'
          )}
        >
          {title}
          <ArrowIcon
            className={clsx('h-4 w-4 flex-none fill-current', dir === 'previous' && '-scale-x-100')}
          />
        </Link>
      </dd>
    </div>
  )
}

export function PrevNextLinks() {
  const pathname = usePathname()

  // すべてのリンクをフラット化する関数（子リンクも含む）
  const flattenLinks = (links: NavigationLink[]): NavigationLink[] => {
    return links.reduce<NavigationLink[]>((acc, link) => {
      acc.push(link)
      if (link.children && link.children.length > 0) {
        acc.push(...flattenLinks(link.children))
      }
      return acc
    }, [])
  }

  // ナビゲーションからすべてのリンクをフラット化
  const allLinks = navigation.flatMap(section => {
    const sectionLinks = section.links as NavigationLink[]
    return flattenLinks(sectionLinks)
  })

  const linkIndex = allLinks.findIndex(link => link.href === pathname)
  const previousPage = linkIndex > -1 ? allLinks[linkIndex - 1] : null
  const nextPage = linkIndex > -1 ? allLinks[linkIndex + 1] : null

  if (!nextPage && !previousPage) {
    return null
  }

  return (
    <dl className="mt-12 flex border-t border-slate-200 pt-6 dark:border-slate-800">
      {previousPage && <PageLink dir="previous" {...previousPage} />}
      {nextPage && <PageLink className="ml-auto text-right" {...nextPage} />}
    </dl>
  )
}
