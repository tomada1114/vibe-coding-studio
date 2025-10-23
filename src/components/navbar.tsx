"use client"

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react"
import { Bars2Icon } from "@heroicons/react/24/solid"
import { clsx } from "clsx"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { Link } from "./link"
import { Logo } from "./logo"
import { PlusGrid, PlusGridItem, PlusGridRow } from "./plus-grid"

const navLinks = [
  { href: "/", label: "ホーム" },
  { href: "/community", label: "コミュニティ" },
  { href: "/founder", label: "運営者" },
]

type NavLink = {
  href: string
  label: string
}

function isPathActive(pathname: string | null, href: string) {
  if (!pathname) return false
  if (href === "/") {
    return pathname === "/"
  }
  return pathname === href || pathname.startsWith(`${href}/`)
}

function DesktopNav({
  navLinks,
  pathname,
}: {
  navLinks: NavLink[]
  pathname: string | null
}) {
  return (
    <nav className="relative hidden lg:flex">
      {navLinks.map(({ href, label }) => {
        const active = isPathActive(pathname, href)
        return (
          <PlusGridItem key={href} className="relative flex">
            <Link
              href={href}
              aria-current={active ? "page" : undefined}
              data-active={active ? "true" : undefined}
              className={clsx(
                "flex items-center px-4 py-3 text-base font-medium text-gray-950",
                "bg-blend-multiply transition-colors data-hover:bg-black/2.5",
                "data-[active=true]:bg-black/10 data-[active=true]:text-gray-950 data-[active=true]:shadow-inner"
              )}
            >
              {label}
            </Link>
          </PlusGridItem>
        )
      })}
    </nav>
  )
}

function MobileNavButton() {
  return (
    <DisclosureButton
      className="flex size-12 items-center justify-center self-center rounded-lg transition-colors data-hover:bg-black/5 lg:hidden"
      aria-label="Open main menu"
    >
      <Bars2Icon className="size-6" />
    </DisclosureButton>
  )
}

function MobileNav({
  navLinks,
  pathname,
}: {
  navLinks: NavLink[]
  pathname: string | null
}) {
  return (
    <DisclosurePanel className="lg:hidden">
      <div className="flex flex-col gap-6 py-4">
        {navLinks.map(({ href, label }, linkIndex) => {
          const active = isPathActive(pathname, href)
          return (
            <motion.div
              initial={{ opacity: 0, rotateX: -90 }}
              animate={{ opacity: 1, rotateX: 0 }}
              transition={{
                duration: 0.15,
                ease: "easeInOut",
                rotateX: { duration: 0.3, delay: linkIndex * 0.1 },
              }}
              key={href}
            >
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                data-active={active ? "true" : undefined}
                className={clsx(
                  "text-base font-medium text-gray-950 transition-colors",
                  "data-[active=true]:font-semibold data-[active=true]:text-gray-950 data-[active=true]:underline"
                )}
              >
                {label}
              </Link>
            </motion.div>
          )
        })}
      </div>
      <div className="absolute left-1/2 w-screen -translate-x-1/2">
        <div className="absolute inset-x-0 top-0 border-t border-black/5" />
        <div className="absolute inset-x-0 top-2 border-t border-black/5" />
      </div>
    </DisclosurePanel>
  )
}

export function Navbar({ banner }: { banner?: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <Disclosure as="header">
      <PlusGrid className="px-6 lg:px-8">
        <PlusGridRow className="relative flex justify-between">
          <div className="relative flex gap-6">
            <div className="py-3">
              <Link href="/" title="Home">
                <Logo variant="wide" className="h-9" />
              </Link>
            </div>
            {banner && (
              <div className="relative hidden items-center py-3 lg:flex">
                {banner}
              </div>
            )}
          </div>
          <DesktopNav navLinks={navLinks} pathname={pathname} />
          <MobileNavButton />
        </PlusGridRow>
      </PlusGrid>
      <MobileNav navLinks={navLinks} pathname={pathname} />
    </Disclosure>
  )
}
