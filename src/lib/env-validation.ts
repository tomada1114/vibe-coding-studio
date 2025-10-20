/**
 * Environment variable validation
 * Simple validation for static site
 */

export interface EnvConfig {
  siteUrl?: string
  isValid: boolean
  errors: string[]
  warnings: string[]
}

/**
 * Validates and returns environment configuration
 */
export function validateEnv(): EnvConfig {
  const errors: string[] = []
  const warnings: string[] = []

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

  // Optional site URL validation
  if (siteUrl && !/^https?:\/\//i.test(siteUrl)) {
    warnings.push(
      "NEXT_PUBLIC_SITE_URL is set but is not an absolute http(s) URL."
    )
  }

  const config: EnvConfig = {
    siteUrl,
    isValid: errors.length === 0,
    errors,
    warnings,
  }

  return config
}

/**
 * Checks if environment is properly configured
 */
export function requireEnv(): EnvConfig {
  return validateEnv()
}

/**
 * Helper to check if running in development mode
 */
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === "development"
}

/**
 * Helper to check if running in production mode
 */
export function isProduction(): boolean {
  return process.env.NODE_ENV === "production"
}

/**
 * Get safe environment variable summary
 */
export function getSafeEnvSummary(): Record<string, string> {
  const config = validateEnv()

  return {
    NODE_ENV: process.env.NODE_ENV || "development",
    SITE_URL: config.siteUrl || "NOT_SET",
  }
}
