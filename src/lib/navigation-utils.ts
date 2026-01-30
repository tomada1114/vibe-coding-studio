/**
 * Determines if curriculum navigation should be displayed based on the current path
 * @param path Current path from usePathname()
 * @returns Boolean indicating if curriculum navigation should be shown
 */
export function shouldShowNavigation(path: string): boolean {
  return (
    path.startsWith("/docs/") && path !== "/docs/" && !path.startsWith("/blog")
  )
}
