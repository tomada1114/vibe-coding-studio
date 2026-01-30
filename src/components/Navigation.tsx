"use client"

import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { navigation } from "@/lib/navigation"

export function Navigation({
  className,
  onLinkClick,
}: {
  className?: string
  onLinkClick?: React.MouseEventHandler<HTMLAnchorElement>
}) {
  const pathname = usePathname()

  // パスからセクションスラッグを抽出
  const currentSlug = pathname.split("/").filter(Boolean)[1] // '/docs/rails/...' から 'rails' を取得

  // 現在のパスに基づいてナビゲーションをフィルタリング
  const filteredNavigation = navigation.filter(
    section => !currentSlug || section.slug === currentSlug
  )

  return (
    <nav className={clsx("text-base lg:text-sm", className)}>
      <ul role="list" className="space-y-9">
        {filteredNavigation.map(section => (
          <li key={section.title}>
            <ul
              role="list"
              className="space-y-2 border-l-2 border-slate-100 lg:mt-4 lg:space-y-4 lg:border-slate-200"
            >
              {section.links.map(link => (
                <li key={link.href} className="relative">
                  <Link
                    href={link.href}
                    onClick={onLinkClick}
                    prefetch={true}
                    className={clsx(
                      "block w-full overflow-hidden pl-3.5 font-semibold text-ellipsis whitespace-nowrap before:pointer-events-none before:absolute before:top-1/2 before:-left-1 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full",
                      link.href === pathname
                        ? "font-semibold text-sky-500 before:bg-sky-500"
                        : "text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block"
                    )}
                    title={link.title} // ホバー時にフルテキストをツールチップで表示
                  >
                    <span className="block truncate">{link.title}</span>
                  </Link>

                  {link.children && link.children.length > 0 && (
                    <ul className="mt-2 space-y-2 pl-5">
                      {link.children.map(child => (
                        <li key={child.href} className="relative">
                          <Link
                            href={child.href}
                            onClick={onLinkClick}
                            prefetch={true}
                            className={clsx(
                              "block w-full pl-3.5 before:pointer-events-none before:absolute before:top-1/2 before:-left-1 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full",
                              child.href === pathname
                                ? "font-semibold text-sky-500 before:bg-sky-500"
                                : "text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block"
                            )}
                            title={child.title} // ホバー時にフルテキストをツールチップで表示
                          >
                            <span className="block truncate">
                              {child.title}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  )
}
