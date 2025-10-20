import { clsx } from "clsx"

interface SkeletonProps {
  className?: string
  animate?: boolean
}

/**
 * Base skeleton component with shimmer animation
 */
export function Skeleton({ className, animate = true }: SkeletonProps) {
  return (
    <div
      className={clsx(
        "rounded bg-gray-200",
        animate && "animate-pulse",
        className
      )}
    />
  )
}

/**
 * Text skeleton for headings and paragraphs
 */
export function TextSkeleton({
  lines = 1,
  className,
}: {
  lines?: number
  className?: string
}) {
  return (
    <div className={className}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={clsx(
            "mb-2 h-4",
            i === lines - 1 && "w-3/4" // Last line is shorter
          )}
        />
      ))}
    </div>
  )
}

/**
 * Card skeleton for blog posts and content cards
 */
export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={clsx("rounded-lg border border-gray-200 p-6", className)}>
      <Skeleton className="mb-4 h-48" />
      <Skeleton className="mb-2 h-6 w-3/4" />
      <Skeleton className="mb-2 h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  )
}

/**
 * Blog post skeleton
 */
export function BlogPostSkeleton() {
  return (
    <article className="relative flex flex-col gap-8 lg:flex-row">
      <div className="lg:w-1/2">
        <Skeleton className="aspect-[16/9] rounded-2xl" />
      </div>
      <div className="flex flex-col justify-center lg:w-1/2">
        <Skeleton className="mb-4 h-4 w-24" /> {/* Date */}
        <Skeleton className="mb-4 h-8 w-3/4" /> {/* Title */}
        <TextSkeleton lines={3} className="mb-4" /> {/* Excerpt */}
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-full" /> {/* Avatar */}
          <Skeleton className="h-4 w-32" /> {/* Author name */}
        </div>
      </div>
    </article>
  )
}

/**
 * Bento card skeleton
 */
export function BentoCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={clsx("relative rounded-3xl bg-gray-50 p-8", className)}>
      <Skeleton className="mb-4 h-4 w-20" /> {/* Eyebrow */}
      <Skeleton className="mb-4 h-8 w-3/4" /> {/* Title */}
      <TextSkeleton lines={2} className="mb-6" /> {/* Description */}
      <Skeleton className="h-40" /> {/* Graphic */}
    </div>
  )
}

/**
 * Navigation skeleton
 */
export function NavbarSkeleton() {
  return (
    <nav className="flex items-center justify-between py-6">
      <div className="flex items-center gap-8">
        <Skeleton className="h-8 w-32" /> {/* Logo */}
        <div className="hidden gap-6 md:flex">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
      <Skeleton className="h-10 w-24 rounded-full" /> {/* Button */}
    </nav>
  )
}

/**
 * Table skeleton for data tables
 */
export function TableSkeleton({
  rows = 5,
  columns = 4,
}: {
  rows?: number
  columns?: number
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {Array.from({ length: columns }).map((_, i) => (
              <th key={i} className="px-6 py-3">
                <Skeleton className="h-4 w-20" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <td key={colIndex} className="px-6 py-4">
                  <Skeleton className="h-4 w-24" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/**
 * Form skeleton
 */
export function FormSkeleton({ fields = 4 }: { fields?: number }) {
  return (
    <div className="space-y-6">
      {Array.from({ length: fields }).map((_, i) => (
        <div key={i}>
          <Skeleton className="mb-2 h-4 w-24" /> {/* Label */}
          <Skeleton className="h-10 w-full rounded" /> {/* Input */}
        </div>
      ))}
      <Skeleton className="h-10 w-32 rounded-full" /> {/* Submit button */}
    </div>
  )
}

/**
 * Generic content skeleton with customizable layout
 */
export function ContentSkeleton({
  showImage = true,
  showTitle = true,
  showDescription = true,
  className,
}: {
  showImage?: boolean
  showTitle?: boolean
  showDescription?: boolean
  className?: string
}) {
  return (
    <div className={className}>
      {showImage && <Skeleton className="mb-6 h-64 rounded-lg" />}
      {showTitle && <Skeleton className="mb-4 h-8 w-3/4" />}
      {showDescription && <TextSkeleton lines={4} />}
    </div>
  )
}
