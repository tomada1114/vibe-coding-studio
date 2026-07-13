"use client"

import type { ErrorInfo, ReactNode } from "react"
import { Component } from "react"
import { Button } from "./button"
import { Container } from "./container"
import { Heading } from "./text"

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
  showDetails?: boolean
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
  errorCount: number
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorCount: 0,
    }
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error in development
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.error("Error boundary caught an error:", error, errorInfo)
    }

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }

    // Update state with error info
    this.setState(prevState => ({
      errorInfo,
      errorCount: prevState.errorCount + 1,
    }))

    // In production, you might want to send to an error reporting service
    if (process.env.NODE_ENV === "production") {
      // TODO: Send to error reporting service (e.g., Sentry)
      // reportErrorToService(error, errorInfo)
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    })
  }

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return <>{this.props.fallback}</>
      }

      // Default error UI
      return (
        <div className="flex min-h-[400px] items-center justify-center py-12">
          <Container>
            <div className="mx-auto max-w-md text-center">
              <div className="mb-8">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
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
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <Heading as="h2" className="mb-2">
                  Oops! Something went wrong
                </Heading>
                <p className="mb-6 text-sm/6 text-gray-600">
                  We encountered an unexpected error. Please try refreshing the
                  page or contact support if the problem persists.
                </p>
              </div>

              {/* Show error details in development */}
              {this.props.showDetails &&
                process.env.NODE_ENV === "development" &&
                this.state.error && (
                  <details className="mb-6 text-left">
                    <summary className="mb-2 cursor-pointer text-sm font-medium text-gray-700">
                      Error Details (Development Only)
                    </summary>
                    <div className="overflow-auto rounded-lg bg-gray-50 p-4 font-mono text-xs">
                      <div className="mb-2 text-red-600">
                        {this.state.error.toString()}
                      </div>
                      {this.state.error.stack && (
                        <pre className="whitespace-pre-wrap text-gray-600">
                          {this.state.error.stack}
                        </pre>
                      )}
                    </div>
                  </details>
                )}

              <div className="flex flex-col justify-center gap-3 sm:flex-row">
                <Button onClick={this.handleReset}>Try Again</Button>
                <Button
                  variant="secondary"
                  onClick={() => (window.location.href = "/")}
                >
                  Go to Homepage
                </Button>
              </div>

              {this.state.errorCount > 2 && (
                <p className="mt-4 text-sm text-gray-500">
                  If this error persists, please try clearing your browser cache
                  or contact support.
                </p>
              )}
            </div>
          </Container>
        </div>
      )
    }

    return this.props.children
  }
}

/**
 * Async Error Boundary for handling errors in async components
 */
export function AsyncErrorBoundary({
  children,
  fallback,
  showDetails = false,
}: {
  children: ReactNode
  fallback?: ReactNode
  showDetails?: boolean
}) {
  return (
    <ErrorBoundary fallback={fallback} showDetails={showDetails}>
      {children}
    </ErrorBoundary>
  )
}

/**
 * Hook for error handling in functional components
 */
export function useErrorHandler() {
  return (error: Error) => {
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.error("Error caught by useErrorHandler:", error)
    }

    // You could also trigger a state update or navigation here
    throw error // Re-throw to be caught by nearest error boundary
  }
}
