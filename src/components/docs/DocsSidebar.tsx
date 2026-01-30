"use client"

import { Navigation } from "@/components/Navigation"
import { Search } from "@/components/Search"
import { shouldShowNavigation } from "@/lib/navigation-utils"
import { usePathname } from "next/navigation"

export function DocsSidebar() {
  const pathname = usePathname()
  const showNav = shouldShowNavigation(pathname)

  if (!showNav) {
    return null
  }

  return (
    <div className="hidden lg:relative lg:block lg:flex-none">
      <div className="sticky top-0 -ml-0.5 h-[calc(100vh-4.5rem)] w-64 overflow-x-hidden overflow-y-auto py-16 pr-8 pl-0.5 xl:w-72 xl:pr-16">
        <Search />
        <Navigation className="mt-6" />
      </div>
    </div>
  )
}
