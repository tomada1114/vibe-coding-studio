"use client"

import type { NavKey } from "@/i18n/dictionaries"
import { getDictionary } from "@/i18n/dictionaries"
import { getLocaleFromPathname, localizePath } from "@/i18n/locale"
import { DISCORD_INVITE_URL, SOCIAL_LINKS } from "@/lib/constants"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { socialIconMap, XIcon } from "./social-icons"

const SITE_LINKS: { key: NavKey; href: string }[] = [
  { key: "home", href: "/" },
  { key: "community", href: "/community" },
  { key: "courses", href: "/courses" },
]

export function Footer() {
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname)
  const dict = getDictionary(locale)
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-bg">
      <div className="gg-container">
        <div className="gg-cell-grid grid-cols-1 border-x-0 sm:grid-cols-3">
          <div className="gg-cell">
            <p className="gg-label">Site</p>
            <ul className="mt-3 space-y-2">
              {SITE_LINKS.map(({ key, href }) => (
                <li key={key}>
                  <Link
                    href={localizePath(href, locale)}
                    className="text-sm text-text-secondary transition-colors hover:text-text-primary hover:underline"
                  >
                    {dict.nav.items[key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="gg-cell">
            <p className="gg-label">Community</p>
            <ul className="mt-3 space-y-2">
              <li>
                <a
                  href={DISCORD_INVITE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-secondary transition-colors hover:text-text-primary hover:underline"
                >
                  {dict.footer.discord}
                  <span aria-hidden="true" className="ml-1 text-text-secondary">
                    ↗
                  </span>
                </a>
              </li>
            </ul>
          </div>

          <div className="gg-cell">
            <p className="gg-label">Social</p>
            <ul className="mt-3 flex flex-wrap gap-4">
              {SOCIAL_LINKS.map(link => {
                const Icon = socialIconMap[link.icon.toLowerCase()] ?? XIcon
                const external = link.url.startsWith("http")
                return (
                  <li key={link.name}>
                    <a
                      href={link.url}
                      aria-label={link.name}
                      {...(external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="inline-flex size-7 items-center justify-center rounded-[6px] text-text-muted transition-colors hover:text-text-primary"
                    >
                      <Icon className="size-4" />
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-border py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="gg-meta text-text-secondary">
            © {year} {dict.footer.copyright}
          </p>
          <p className="gg-label">Geist Grid</p>
        </div>
      </div>
    </footer>
  )
}
