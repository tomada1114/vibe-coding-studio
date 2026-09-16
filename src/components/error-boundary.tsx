"use client"

import type { ErrorInfo, ReactNode } from "react"
import { Component } from "react"

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
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.error("Error boundary caught an error:", error, errorInfo)
    }

    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }

    this.setState(prevState => ({
      errorInfo,
      errorCount: prevState.errorCount + 1,
    }))

    if (process.env.NODE_ENV === "production") {
      // TODO: Send to an error reporting service (e.g., Sentry)
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
      if (this.props.fallback) {
        return <>{this.props.fallback}</>
      }

      return (
        <div className="flex min-h-[400px] items-center justify-center gg-surface px-4 py-12">
          <div className="gg-cell w-full max-w-[560px] border border-border text-center sm:p-10">
            <p className="gg-label">ERROR</p>
            <h2 className="mt-3 text-[24px] leading-[1.3] font-medium tracking-[-0.015em] text-text-primary sm:text-[28px]">
              Oops! Something went wrong
            </h2>
            <p className="mt-4 text-[14px] gg-prose-ja text-text-secondary">
              We encountered an unexpected error. Please try refreshing the page
              or contact support if the problem persists.
            </p>

            {this.props.showDetails &&
              process.env.NODE_ENV === "development" &&
              this.state.error && (
                <details className="mt-6 border border-border text-left">
                  <summary className="cursor-pointer px-3 py-2 text-sm font-medium text-text-secondary">
                    Error Details (Development Only)
                  </summary>
                  <div className="overflow-auto border-t border-border bg-surface-1 p-3 font-mono text-xs">
                    <div className="text-text-primary">
                      {this.state.error.toString()}
                    </div>
                    {this.state.error.stack && (
                      <pre className="mt-2 gg-prose-ja whitespace-pre-wrap text-text-secondary">
                        {this.state.error.stack}
                      </pre>
                    )}
                  </div>
                </details>
              )}

            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={this.handleReset}
                className="gg-btn gg-btn-outline"
              >
                Try Again
              </button>
              <button
                type="button"
                onClick={() => (window.location.href = "/")}
                className="gg-btn gg-btn-outline"
              >
                Go to Homepage
              </button>
            </div>

            {this.state.errorCount > 2 && (
              <p className="mt-4 text-sm text-text-secondary">
                If this error persists, please try clearing your browser cache
                or contact support.
              </p>
            )}
          </div>
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

    throw error
  }
}
