/**
 * Blog Layout
 *
 * Layout wrapper for all blog pages.
 * Imports CSS files for blog styling and syntax highlighting.
 */

import "prismjs/plugins/line-numbers/prism-line-numbers.css"
import "prismjs/themes/prism-tomorrow.css"
import "./blog.css"

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
