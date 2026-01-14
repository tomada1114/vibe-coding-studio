/**
 * Blog Logging Utilities
 *
 * Centralized logging for blog-related operations.
 * Prepares for future integration with error tracking (e.g., Sentry).
 */

type LogLevel = "debug" | "warn" | "error"

interface LogContext {
  [key: string]: unknown
}

/**
 * Log a blog-related event with structured context.
 * In production, this can be extended to send to Sentry or other monitoring.
 *
 * @param level - Log level (debug, warn, error)
 * @param eventId - Unique identifier for the event type
 * @param context - Additional context for debugging
 */
function log(level: LogLevel, eventId: string, context?: LogContext): void {
  const message = `[Blog:${eventId}]`

  // In development, always log to console
  // In production, these could be sent to error tracking service
  if (process.env.NODE_ENV === "development" || level === "error") {
    /* eslint-disable no-console */
    const logFn =
      level === "error"
        ? console.error
        : level === "warn"
          ? console.warn
          : console.log
    /* eslint-enable no-console */
    if (context) {
      logFn(message, context)
    } else {
      logFn(message)
    }
  }
}

/**
 * Log debug information (development only)
 */
export function logBlogDebug(eventId: string, context?: LogContext): void {
  log("debug", eventId, context)
}

/**
 * Log warning (potential issues that don't break functionality)
 */
export function logBlogWarning(eventId: string, context?: LogContext): void {
  log("warn", eventId, context)
}

/**
 * Log error (issues that may affect functionality)
 */
export function logBlogError(eventId: string, context?: LogContext): void {
  log("error", eventId, context)
}
