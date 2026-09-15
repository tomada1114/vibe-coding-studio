import withMarkdoc from "@markdoc/next.js"

/** @type {import('next').NextConfig} */
const nextConfig = {
  // React configuration
  reactStrictMode: true,

  // Markdownファイルをページとして認識させる
  pageExtensions: ["js", "jsx", "md", "ts", "tsx"],

  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    // Cache TTL for optimized images served via /_next/image.
    // Use minimumCacheTTL (not headers()) as Next.js controls /_next/image internally.
    // ファイル名が不変のローカル画像のみなので長期キャッシュで変換クォータを節約する。
    minimumCacheTTL: 2678400, // 31 days
  },

  // Basic optimizations
  poweredByHeader: false,

  // Experimental features
  experimental: {
    // Enable optimized package imports
    optimizePackageImports: [
      "@heroicons/react",
      "@headlessui/react",
      "framer-motion",
    ],

    // Enable partial prerendering (experimental)
    ppr: false,

    // Web vitals attribution
    webVitalsAttribution: ["CLS", "LCP", "FCP", "INP", "TTFB"],
  },

  // Compiler options
  compiler: {
    // Remove console.log in production
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
            exclude: ["error", "warn"],
          }
        : false,
  },

  // Headers configuration
  async headers() {
    // Helper: generates a Cache-Control header entry. sMaxAge and swr are in seconds.
    const cacheHeader = (source, sMaxAge, swr) => ({
      source,
      headers: [
        {
          key: "Cache-Control",
          value: `public, s-maxage=${sMaxAge}, stale-while-revalidate=${swr}`,
        },
      ],
    })

    return [
      {
        // Apply security headers to all routes
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "origin-when-cross-origin" },
        ],
      },
      // Cache-Control for static assets in public/.
      // /_next/static/ uses immutable SHA-hashed filenames — Next.js sets its own
      // Cache-Control and it cannot be overridden here, so no entry needed.
      // /_next/image is controlled via images.minimumCacheTTL above.
      cacheHeader("/images/udemy/:path*", 604800, 2592000), // s-maxage=7d, swr=30d
      cacheHeader("/img/:path*", 86400, 604800), // s-maxage=1d, swr=7d
      cacheHeader("/images/topics/:path*", 2592000, 31536000), // s-maxage=30d, swr=1y
    ]
  },

  // Redirects for common patterns
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/index",
        destination: "/",
        permanent: true,
      },
      {
        // 運営者プロフィールはトップページへ統合した（Geist Grid 移行 第1弾）
        source: "/founder",
        destination: "/",
        permanent: true,
      },
    ]
  },

  // TypeScript configuration
  typescript: {
    // Fail build on TypeScript errors in production
    ignoreBuildErrors: false,
  },

  // ESLint configuration
  eslint: {
    // Fail build on ESLint errors in production
    ignoreDuringBuilds: false,
  },
}

// Bundle analyzer configuration (only in development)
let config = nextConfig

if (process.env.ANALYZE === "true") {
  const withBundleAnalyzer = (await import("@next/bundle-analyzer")).default({
    enabled: true,
    openAnalyzer: true,
  })

  config = withBundleAnalyzer(nextConfig)
}

export default withMarkdoc({ schemaPath: "./src/markdoc" })(config)
