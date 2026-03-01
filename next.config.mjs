import withMarkdoc from "@markdoc/next.js"

// 静的アセット用キャッシュヘッダー値（30日 + 1日 stale-while-revalidate）
const STATIC_ASSET_CACHE_CONTROL =
  "public, max-age=2592000, stale-while-revalidate=86400"

/** @type {import('next').NextConfig} */
const nextConfig = {
  // React configuration
  reactStrictMode: true,

  // Markdownファイルをページとして認識させる
  pageExtensions: ["js", "jsx", "md", "ts", "tsx"],

  // Image optimization - simplified
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
      },
      // YouTubeサムネイル画像用
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
    ],
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
      "clsx",
      "dayjs",
    ],

    // Enable partial prerendering (experimental)
    ppr: false,

    // Enable server actions
    serverActions: {
      bodySizeLimit: "2mb",
    },

    // Web vitals attribution
    webVitalsAttribution: ["CLS", "LCP", "FCP", "FID", "TTFB"],
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

  // Headers configuration - simplified
  async headers() {
    return [
      {
        // 全ルートにセキュリティヘッダーを適用
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
      {
        // 画像・フォント・静的アセット（30日キャッシュ）
        source:
          "/:path(.*\\.(?:png|jpg|jpeg|gif|webp|avif|ico|svg|woff|woff2|ttf|otf))",
        headers: [
          {
            key: "Cache-Control",
            value: STATIC_ASSET_CACHE_CONTROL,
          },
        ],
      },
      {
        // /images/ ディレクトリ（30日キャッシュ）
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: STATIC_ASSET_CACHE_CONTROL,
          },
        ],
      },
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
    ]
  },

  // Environment variables to expose to the browser
  env: {
    NEXT_PUBLIC_SITE_URL:
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
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
