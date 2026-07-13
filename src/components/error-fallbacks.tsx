"use client"

import { Button } from "./button"
import { Container } from "./container"
import { Heading } from "./text"

interface ErrorFallbackProps {
  error?: Error
  reset?: () => void
  message?: string
}

/**
 * Network error fallback component
 */
export function NetworkErrorFallback({ reset }: ErrorFallbackProps) {
  return (
    <Container className="py-16 text-center">
      <div className="mx-auto max-w-md">
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
          <svg
            className="h-8 w-8 text-amber-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <Heading as="h3" className="mb-2">
          Connection Issue
        </Heading>
        <p className="mb-6 text-sm/6 text-gray-600">
          We&apos;re having trouble connecting to our servers. Please check your
          internet connection and try again.
        </p>
        {reset && (
          <Button onClick={reset} variant="secondary">
            Try Again
          </Button>
        )}
      </div>
    </Container>
  )
}

/**
 * Data loading error fallback
 */
export function DataErrorFallback({ reset, message }: ErrorFallbackProps) {
  return (
    <Container className="py-16 text-center">
      <div className="mx-auto max-w-md">
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
          <svg
            className="h-8 w-8 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
        <Heading as="h3" className="mb-2">
          Unable to Load Data
        </Heading>
        <p className="mb-6 text-sm/6 text-gray-600">
          {message ||
            "We encountered an error while loading the data. Please try again later."}
        </p>
        {reset && (
          <div className="flex justify-center gap-3">
            <Button onClick={reset}>Retry</Button>
            <Button variant="secondary" href="/">
              Go Home
            </Button>
          </div>
        )}
      </div>
    </Container>
  )
}

/**
 * Permission error fallback
 */
export function PermissionErrorFallback({ reset }: ErrorFallbackProps) {
  return (
    <Container className="py-16 text-center">
      <div className="mx-auto max-w-md">
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
          <svg
            className="h-8 w-8 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <Heading as="h3" className="mb-2">
          Access Denied
        </Heading>
        <p className="mb-6 text-sm/6 text-gray-600">
          You don&apos;t have permission to access this resource. Please contact
          support if you believe this is an error.
        </p>
        <div className="flex justify-center gap-3">
          {reset && (
            <Button onClick={reset} variant="secondary">
              Try Again
            </Button>
          )}
          <Button href="/">Go Home</Button>
        </div>
      </div>
    </Container>
  )
}

/**
 * 404 Not Found fallback
 */
export function NotFoundFallback() {
  return (
    <Container className="py-16 text-center">
      <div className="mx-auto max-w-md">
        <div className="mb-6 text-6xl font-bold text-gray-200">404</div>
        <Heading as="h2" className="mb-2">
          Page Not Found
        </Heading>
        <p className="mb-6 text-sm/6 text-gray-600">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex justify-center gap-3">
          <Button href="/">Go Home</Button>
          <Button variant="secondary" href="/docs">
            学習コースを見る
          </Button>
        </div>
      </div>
    </Container>
  )
}

/**
 * Minimal error fallback for critical failures
 */
export function MinimalErrorFallback({ reset }: ErrorFallbackProps) {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="text-center">
        <h1 className="mb-4 text-2xl font-semibold">Something went wrong</h1>
        <p className="mb-6 text-gray-600">
          An unexpected error occurred. Please try refreshing the page.
        </p>
        {reset ? (
          <button
            onClick={reset}
            className="rounded-lg bg-gray-900 px-4 py-2 text-white hover:bg-gray-800"
          >
            Try Again
          </button>
        ) : (
          <button
            onClick={() => window.location.reload()}
            className="rounded-lg bg-gray-900 px-4 py-2 text-white hover:bg-gray-800"
          >
            Refresh Page
          </button>
        )}
      </div>
    </div>
  )
}

/**
 * Image loading error fallback
 */
export function ImageErrorFallback({ className }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center bg-gray-100 ${className || ""}`}
    >
      <svg
        className="h-12 w-12 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    </div>
  )
}

/**
 * Component error fallback
 */
export function ComponentErrorFallback({
  componentName,
  reset,
}: ErrorFallbackProps & { componentName?: string }) {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-4">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg
            className="h-5 w-5 text-red-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">
            {componentName
              ? `Error loading ${componentName}`
              : "Component Error"}
          </h3>
          <div className="mt-2 text-sm text-red-700">
            <p>This component couldn&apos;t be loaded. Please try again.</p>
          </div>
          {reset && (
            <div className="mt-3">
              <button
                onClick={reset}
                className="text-sm font-medium text-red-600 hover:text-red-500"
              >
                Retry
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
