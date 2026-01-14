/**
 * Blog Pagination Component
 *
 * Shared pagination UI for blog listing pages.
 * Supports both blog index and category pages.
 */

import Link from "next/link"

interface PaginationProps {
  currentPage: number
  totalPages: number
  baseUrl: string
}

export function Pagination({
  currentPage,
  totalPages,
  baseUrl,
}: PaginationProps) {
  if (totalPages <= 1) return null

  const prevUrl =
    currentPage > 1 ? `${baseUrl}?page=${currentPage - 1}` : undefined
  const nextUrl =
    currentPage < totalPages ? `${baseUrl}?page=${currentPage + 1}` : undefined

  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      {prevUrl ? (
        <Link
          href={prevUrl}
          className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-gray-50"
        >
          Previous
        </Link>
      ) : (
        <span className="rounded-md border px-4 py-2 text-sm font-medium text-gray-400">
          Previous
        </span>
      )}

      <span className="px-4 py-2 text-sm">
        Page {currentPage} of {totalPages}
      </span>

      {nextUrl ? (
        <Link
          href={nextUrl}
          className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-gray-50"
        >
          Next
        </Link>
      ) : (
        <span className="rounded-md border px-4 py-2 text-sm font-medium text-gray-400">
          Next
        </span>
      )}
    </div>
  )
}
