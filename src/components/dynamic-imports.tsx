/**
 * Dynamic imports for heavy components to reduce initial bundle size
 * These components are loaded on-demand to improve performance
 */

import dynamic from "next/dynamic"
import { ContentSkeleton } from "./loading-skeleton"

// Animation-heavy components (Framer Motion)
export const AnimatedNumber = dynamic(
  () =>
    import("./animated-number").then(mod => ({ default: mod.AnimatedNumber })),
  {
    loading: () => (
      <span className="inline-block h-6 w-16 animate-pulse rounded bg-gray-200" />
    ),
    ssr: true,
  }
)

export const BentoCard = dynamic(
  () => import("./bento-card").then(mod => ({ default: mod.BentoCard })),
  {
    loading: () => <ContentSkeleton className="h-96" />,
    ssr: true,
  }
)

export const LinkedAvatars = dynamic(
  () =>
    import("./linked-avatars").then(mod => ({ default: mod.LinkedAvatars })),
  {
    loading: () => (
      <div className="h-12 w-48 animate-pulse rounded bg-gray-200" />
    ),
    ssr: true,
  }
)

export const LogoCluster = dynamic(
  () => import("./logo-cluster").then(mod => ({ default: mod.LogoCluster })),
  {
    loading: () => <ContentSkeleton className="h-64" />,
    ssr: true,
  }
)

export const Map = dynamic(
  () => import("./map").then(mod => ({ default: mod.Map })),
  {
    loading: () => <ContentSkeleton className="aspect-[16/9]" />,
    ssr: false, // Map component often uses browser APIs
  }
)

export const Testimonials = dynamic(
  () => import("./testimonials").then(mod => ({ default: mod.Testimonials })),
  {
    loading: () => <ContentSkeleton className="h-96" />,
    ssr: true,
  }
)

// Error boundary - loaded only when needed
export const ErrorBoundary = dynamic(
  () =>
    import("./error-boundary").then(mod => ({ default: mod.ErrorBoundary })),
  {
    ssr: true,
  }
)

// Export directly imported lightweight components
export { Button } from "./button"
export { Container } from "./container"
export { Footer } from "./footer"
export { GradientBackground } from "./gradient"
export { Link } from "./link"
export { Logo } from "./logo"
export { LogoCloud } from "./logo-cloud"
export { LogoTimeline } from "./logo-timeline"
export { Navbar } from "./navbar"
export { PlusGrid, PlusGridItem, PlusGridRow } from "./plus-grid"
export { Screenshot } from "./screenshot"
export { Heading, Lead, Subheading } from "./text"
