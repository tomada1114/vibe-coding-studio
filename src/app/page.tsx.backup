import { BentoCard } from "@/components/bento-card"
import { Button } from "@/components/button"
import { Container } from "@/components/container"
import { AsyncErrorBoundary } from "@/components/error-boundary"
import { Footer } from "@/components/footer"
import { Gradient } from "@/components/gradient"
import { Keyboard } from "@/components/keyboard"
import { LinkedAvatars } from "@/components/linked-avatars"
import { LoadingWrapper } from "@/components/loading-wrapper"
import { LogoCloud } from "@/components/logo-cloud"
import { LogoCluster } from "@/components/logo-cluster"
import { LogoTimeline } from "@/components/logo-timeline"
import { Map } from "@/components/map"
import { Navbar } from "@/components/navbar"
import { Screenshot } from "@/components/screenshot"
import { Testimonials } from "@/components/testimonials"
import { Heading, Subheading } from "@/components/text"
import type { Metadata } from "next"

export const metadata: Metadata = {
  description:
    "A minimal Next.js template built with Tailwind CSS v4, TypeScript, and modern best practices.",
}

function Hero() {
  return (
    <div className="relative">
      <Gradient className="absolute inset-2 bottom-0 rounded-4xl ring-1 ring-black/5 ring-inset" />
      <Container className="relative">
        <Navbar />
        <div className="pt-16 pb-24 sm:pt-24 sm:pb-32 md:pt-32 md:pb-48">
          <h1 className="font-display text-6xl/[0.9] font-medium tracking-tight text-balance text-gray-950 sm:text-8xl/[0.8] md:text-9xl/[0.8]">
            Build something amazing.
          </h1>
          <p className="mt-8 max-w-lg text-xl/7 font-medium text-gray-950/75 sm:text-2xl/8">
            A minimal static site template powered by Next.js 15 and Tailwind
            CSS v4. Start building your next project with modern tools and best
            practices.
          </p>
          <div className="mt-12 flex flex-col gap-x-6 gap-y-4 sm:flex-row">
            <Button href="#features">Get started</Button>
            <Button variant="secondary" href="https://github.com">
              View on GitHub
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}

function FeatureSection() {
  return (
    <AsyncErrorBoundary>
      <div className="overflow-hidden">
        <Container className="pb-24">
          <Heading as="h2" className="max-w-3xl">
            Everything you need to get started.
          </Heading>
          <LoadingWrapper
            showSkeleton={true}
            skeletonProps={{
              showImage: true,
              showTitle: false,
              showDescription: false,
              className: "mt-16 h-144 sm:h-auto sm:w-304",
            }}
          >
            <Screenshot
              width={1216}
              height={768}
              src="/screenshots/app.png"
              className="mt-16 h-144 sm:h-auto sm:w-304"
            />
          </LoadingWrapper>
        </Container>
      </div>
    </AsyncErrorBoundary>
  )
}

function BentoSection() {
  return (
    <Container>
      <Subheading>Features</Subheading>
      <Heading as="h3" className="mt-2 max-w-3xl" id="features">
        Built with modern technologies.
      </Heading>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
        <BentoCard
          eyebrow="Framework"
          title="Next.js 15"
          description="The latest version of Next.js with App Router, Server Components, and optimized performance out of the box."
          graphic={
            <div className="h-80 bg-[url(/screenshots/profile.png)] bg-size-[1000px_560px] bg-position-[left_-109px_top_-112px] bg-no-repeat" />
          }
          fade={["bottom"]}
          className="max-lg:rounded-t-4xl lg:col-span-3 lg:rounded-tl-4xl"
        />
        <BentoCard
          eyebrow="Styling"
          title="Tailwind CSS v4"
          description="The newest version of Tailwind CSS with improved performance, smaller bundle sizes, and enhanced developer experience."
          graphic={
            <div className="absolute inset-0 bg-[url(/screenshots/competitors.png)] bg-size-[1100px_650px] bg-position-[left_-38px_top_-73px] bg-no-repeat" />
          }
          fade={["bottom"]}
          className="lg:col-span-3 lg:rounded-tr-4xl"
        />
        <BentoCard
          eyebrow="TypeScript"
          title="Fully typed"
          description="Complete TypeScript support with strict mode enabled for maximum type safety and better developer experience."
          graphic={
            <div className="flex size-full pt-10 pl-10">
              <Keyboard highlighted={["LeftCommand", "LeftShift", "D"]} />
            </div>
          }
          className="lg:col-span-2 lg:rounded-bl-4xl"
        />
        <BentoCard
          eyebrow="Components"
          title="UI Component library"
          description="Pre-built accessible components using Headless UI and Framer Motion for smooth animations."
          graphic={<LogoCluster />}
          className="lg:col-span-2"
        />
        <BentoCard
          eyebrow="Testing"
          title="Jest testing"
          description="Comprehensive test setup with Jest for unit and component testing with full coverage support."
          graphic={<Map />}
          className="max-lg:rounded-b-4xl lg:col-span-2 lg:rounded-br-4xl"
        />
      </div>
    </Container>
  )
}

function DarkBentoSection() {
  return (
    <div className="mx-2 mt-2 rounded-4xl bg-gray-900 py-32">
      <Container>
        <Subheading dark>Quality</Subheading>
        <Heading as="h3" dark className="mt-2 max-w-3xl">
          Production-ready from day one.
        </Heading>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
          <BentoCard
            dark
            eyebrow="Security"
            title="Content Security Policy"
            description="Built-in CSP with nonce-based inline scripts, secure headers, and best practices for production deployments."
            graphic={
              <div className="h-80 bg-[url(/screenshots/networking.png)] bg-size-[851px_344px] bg-no-repeat" />
            }
            fade={["top"]}
            className="max-lg:rounded-t-4xl lg:col-span-4 lg:rounded-tl-4xl"
          />
          <BentoCard
            dark
            eyebrow="Performance"
            title="Optimized builds"
            description="Fast builds with bundle optimization, image optimization, and incremental static regeneration support."
            graphic={<LogoTimeline />}
            // `overflow-visible!` is needed to work around a Chrome bug that disables the mask on the graphic.
            className="z-10 overflow-visible! lg:col-span-2 lg:rounded-tr-4xl"
          />
          <BentoCard
            dark
            eyebrow="Code Quality"
            title="Linting and formatting"
            description="ESLint and TypeScript configured with strict rules to maintain code quality and catch errors early."
            graphic={<LinkedAvatars />}
            className="lg:col-span-2 lg:rounded-bl-4xl"
          />
          <BentoCard
            dark
            eyebrow="Documentation"
            title="Comprehensive guides"
            description="Detailed documentation covering setup, development workflow, testing strategies, and deployment best practices."
            graphic={
              <div className="h-80 bg-[url(/screenshots/engagement.png)] bg-size-[851px_344px] bg-no-repeat" />
            }
            fade={["top"]}
            className="max-lg:rounded-b-4xl lg:col-span-4 lg:rounded-br-4xl"
          />
        </div>
      </Container>
    </div>
  )
}

export default function Home() {
  return (
    <div className="overflow-hidden">
      <AsyncErrorBoundary>
        <Hero />
      </AsyncErrorBoundary>
      <main>
        <Container className="mt-10">
          <AsyncErrorBoundary>
            <LogoCloud />
          </AsyncErrorBoundary>
        </Container>
        <div className="bg-linear-to-b from-white from-50% to-gray-100 py-32">
          <FeatureSection />
          <AsyncErrorBoundary>
            <BentoSection />
          </AsyncErrorBoundary>
        </div>
        <AsyncErrorBoundary>
          <DarkBentoSection />
        </AsyncErrorBoundary>
      </main>
      <AsyncErrorBoundary>
        <Testimonials />
      </AsyncErrorBoundary>
      <Footer />
    </div>
  )
}
