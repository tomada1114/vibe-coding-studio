import { headers } from "next/headers"

/**
 * Provides CSP nonce to the application
 * This component should be rendered in the root layout
 */
export async function CSPNonceProvider() {
  const headersList = await headers()
  const nonce = headersList.get("x-nonce") || undefined

  if (!nonce) {
    return null
  }

  // Make nonce available to client-side scripts
  // Using inline script element directly since we're in the App directory
  // suppressHydrationWarning is used because nonce values differ between server and client
  return (
    <script
      nonce={nonce}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: `window.__CSP_NONCE__ = '${nonce}';`,
      }}
    />
  )
}

/**
 * Hook to get CSP nonce on client side
 * Note: This only works after CSPNonceProvider has been rendered
 */
export function useCSPNonce(): string | undefined {
  if (typeof window === "undefined") {
    return undefined
  }

  return (window as unknown as { __CSP_NONCE__?: string }).__CSP_NONCE__
}
