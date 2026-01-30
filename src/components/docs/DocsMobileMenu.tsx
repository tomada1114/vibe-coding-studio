"use client"

import { MobileNavigation } from "@/components/MobileNavigation"
import { Search } from "@/components/Search"
import { shouldShowNavigation } from "@/lib/navigation-utils"
import { usePathname } from "next/navigation"

export function DocsMobileMenu() {
  const pathname = usePathname()
  const showNav = shouldShowNavigation(pathname)

  if (!showNav) {
    return null
  }

  return (
    <div className="flex items-center gap-4 border-b border-gray-200 px-4 py-3 lg:hidden">
      <MobileNavigation />
      <Search />
    </div>
  )
}
