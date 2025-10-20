"use client"

import type { ReactNode } from "react"
import { Suspense } from "react"
import { ContentSkeleton } from "./loading-skeleton"

interface LoadingWrapperProps {
  children: ReactNode
  fallback?: ReactNode
  showSkeleton?: boolean
  skeletonProps?: {
    showImage?: boolean
    showTitle?: boolean
    showDescription?: boolean
    className?: string
  }
}

/**
 * Wrapper component that provides loading state with Suspense
 */
export function LoadingWrapper({
  children,
  fallback,
  showSkeleton = true,
  skeletonProps,
}: LoadingWrapperProps) {
  const loadingFallback =
    fallback ||
    (showSkeleton ? <ContentSkeleton {...skeletonProps} /> : <LoadingSpinner />)

  return <Suspense fallback={loadingFallback}>{children}</Suspense>
}

/**
 * Simple loading spinner
 */
export function LoadingSpinner({
  size = "md",
  className = "",
}: {
  size?: "sm" | "md" | "lg"
  className?: string
}) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`${sizeClasses[size]} animate-spin`}>
        <svg
          className="text-gray-300"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
    </div>
  )
}

/**
 * Loading overlay for sections that are updating
 */
export function LoadingOverlay({
  visible = true,
  message = "Loading...",
}: {
  visible?: boolean
  message?: string
}) {
  if (!visible) return null

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center rounded-lg bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-3">
        <LoadingSpinner size="lg" />
        <p className="text-sm text-gray-600">{message}</p>
      </div>
    </div>
  )
}

/**
 * Page loading indicator
 */
export function PageLoading({
  message = "Loading page...",
}: {
  message?: string
}) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="lg" className="mb-4" />
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  )
}
