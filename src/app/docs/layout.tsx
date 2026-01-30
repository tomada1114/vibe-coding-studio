'use client'

import { Footer } from '@/components/footer'
import { MobileNavigation } from '@/components/MobileNavigation'
import { Navigation } from '@/components/Navigation'
import { Search } from '@/components/Search'
import { shouldShowNavigation } from '@/lib/navigation-utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function DocsNavbar() {
  return (
    <div className="sticky top-0 z-50 flex flex-wrap items-center justify-between gap-x-6 border-b border-slate-200 bg-white px-4 py-3 shadow-sm sm:px-6 lg:px-8">
      <div className="flex items-center gap-4">
        <div className="lg:hidden">
          <MobileNavigation />
        </div>
        <Link href="/" className="text-lg font-semibold text-slate-900">
          Vibe Coding Studio
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <Search />
        <Link
          href="/docs"
          className="hidden text-sm font-medium text-slate-600 hover:text-slate-900 lg:block"
        >
          コース一覧
        </Link>
      </div>
    </div>
  )
}

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const showNav = shouldShowNavigation(pathname)

  return (
    <>
      <DocsNavbar />
      <div className="relative mx-auto flex max-w-8xl justify-center sm:px-2 lg:px-8 xl:px-12">
        {showNav && (
          <div className="hidden lg:relative lg:block lg:flex-none">
            <div className="sticky top-[4.5rem] -ml-0.5 h-[calc(100vh-4.5rem)] w-64 overflow-y-auto overflow-x-hidden py-16 pl-0.5 pr-8 xl:w-72 xl:pr-16">
              <Navigation />
            </div>
          </div>
        )}
        <div className="min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pr-0 lg:pl-8 xl:px-16">
          {children}
        </div>
      </div>
      <Footer />
    </>
  )
}
