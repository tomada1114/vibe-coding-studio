"use client"

import { Dialog } from "@headlessui/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

import { Logomark } from "@/components/logo"
import { Navigation } from "@/components/Navigation"
import { shouldShowNavigation } from "@/lib/navigation-utils"

function MenuIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M5 6h14M5 18h14M5 12h14"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CloseIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M6 18L18 6M6 6l12 12"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function BasicNavLinks() {
  return (
    <div className="space-y-1">
      <Link
        href="/docs"
        className="block py-2 text-base font-semibold text-slate-700 hover:text-slate-900"
      >
        カリキュラム
      </Link>
    </div>
  )
}

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const isCurriculumPage = shouldShowNavigation(pathname)

  useEffect(() => {
    if (!isOpen) return

    function onRouteChange() {
      setIsOpen(false)
    }

    window.addEventListener("popstate", onRouteChange)

    return () => {
      window.removeEventListener("popstate", onRouteChange)
    }
  }, [isOpen])

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex h-6 w-6 items-center justify-center rounded-md transition hover:bg-slate-900/5"
        aria-label="Toggle navigation"
      >
        <MenuIcon className="h-5 w-5 stroke-slate-900" />
      </button>
      <Dialog
        open={isOpen}
        onClose={setIsOpen}
        className="fixed inset-0 z-50 flex items-start overflow-y-auto bg-slate-900/50 pr-10 backdrop-blur lg:hidden"
        aria-label="Navigation"
      >
        <Dialog.Panel className="min-h-full w-full max-w-xs bg-white px-4 pt-5 pb-12 sm:px-6">
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex h-6 w-6 items-center justify-center rounded-md transition hover:bg-slate-900/5"
              aria-label="Close navigation"
            >
              <CloseIcon className="h-5 w-5 stroke-slate-900" />
            </button>
            <Link
              href="/"
              className="ml-6"
              aria-label="Home page"
              prefetch={true}
            >
              <Logomark className="h-9 w-9" />
            </Link>
          </div>

          {/* Navigation content based on page type */}
          <div className="mt-5 px-1">
            {/* Always show basic links */}
            <BasicNavLinks />

            {/* Show curriculum navigation only on curriculum pages */}
            {isCurriculumPage && (
              <div className="mt-6 border-t border-slate-200 pt-6">
                <Navigation />
              </div>
            )}
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  )
}
