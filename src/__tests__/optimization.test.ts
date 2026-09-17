describe("Next.js Configuration Structure", () => {
  const expectedConfig = {
    images: {
      formats: ["image/avif", "image/webp"],
      deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
      imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },
    compress: true,
    poweredByHeader: false,
    generateEtags: true,
    swcMinify: true,
    experimental: {
      webVitalsAttribution: ["CLS", "LCP", "FCP", "INP", "TTFB"],
    },
    typescript: {
      ignoreBuildErrors: false,
    },
    eslint: {
      ignoreDuringBuilds: false,
    },
    output: "standalone",
  }

  it("should have image optimization configuration", () => {
    expect(expectedConfig.images).toBeDefined()
    expect(expectedConfig.images.formats).toContain("image/avif")
    expect(expectedConfig.images.formats).toContain("image/webp")
    expect(expectedConfig.images.deviceSizes).toHaveLength(8)
    expect(expectedConfig.images.imageSizes).toHaveLength(8)
  })

  it("should have performance optimizations enabled", () => {
    expect(expectedConfig.compress).toBe(true)
    expect(expectedConfig.poweredByHeader).toBe(false)
    expect(expectedConfig.generateEtags).toBe(true)
    expect(expectedConfig.swcMinify).toBe(true)
  })

  it("should have experimental features configured", () => {
    expect(expectedConfig.experimental).toBeDefined()
    expect(expectedConfig.experimental.webVitalsAttribution).toContain("LCP")
    expect(expectedConfig.experimental.webVitalsAttribution).toContain("CLS")
  })

  it("should have TypeScript and ESLint strict mode enabled", () => {
    expect(expectedConfig.typescript.ignoreBuildErrors).toBe(false)
    expect(expectedConfig.eslint.ignoreDuringBuilds).toBe(false)
  })

  it("should have standalone output configured", () => {
    expect(expectedConfig.output).toBe("standalone")
  })
})
