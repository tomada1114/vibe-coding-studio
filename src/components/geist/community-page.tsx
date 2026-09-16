import { DiscordMemberCount } from "@/components/discord-member-count"
import { AsyncErrorBoundary } from "@/components/error-boundary"
import type { Dictionary } from "@/i18n/dictionaries"
import type { Locale } from "@/i18n/locale"
import { DISCORD_INVITE_URL } from "@/lib/constants"
import { getSiteUrl } from "@/lib/seo/site-url"
import Image from "next/image"

type CommunityCopy = Dictionary["community"]

function CommunityStructuredData({
  copy,
  locale,
}: {
  copy: CommunityCopy
  locale: Locale
}) {
  const path = locale === "en" ? "/en/community" : "/community"
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Vibe Coding Studio",
    url: `${getSiteUrl()}${path}`,
    sameAs: [
      "https://x.com/muscle_coding",
      "https://www.youtube.com/@vibe-coding-studio",
      "https://qiita.com/tomada",
      "https://note.com/tomada",
    ],
    description: copy.metaDescription,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

function SectionHeading({
  label,
  children,
}: {
  label: string
  children: string
}) {
  return (
    <header>
      <p className="gg-label">{label}</p>
      <h2 className="text-text-primary mt-3 text-[28px] leading-[1.3] font-medium tracking-[-0.015em] sm:text-[36px] sm:leading-[1.2]">
        {children}
      </h2>
    </header>
  )
}

function CommunityHero({ copy }: { copy: CommunityCopy["hero"] }) {
  return (
    <div className="gg-glow relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="gg-grid-field pointer-events-none absolute inset-0 -z-10"
      />
      <div className="mx-auto max-w-[1120px] px-4 pt-16 pb-14 sm:px-6 sm:pt-24 sm:pb-20 lg:px-8">
        <p className="gg-label">{copy.label}</p>
        <h1 className="text-text-primary mt-4 max-w-[800px] text-[40px] leading-[1.15] font-semibold tracking-[-0.02em] sm:text-[56px] sm:leading-[1.1]">
          {copy.title}
        </h1>
        <p className="gg-prose-ja text-text-secondary mt-6 max-w-[720px] text-[18px]">
          {copy.lead}
        </p>
        <p className="text-text-primary mt-4 text-[16px] font-medium sm:text-[18px]">
          {copy.highlights}
        </p>

        <div className="mt-8 max-w-[560px]">
          <div className="gg-cell border-border border">
            <p className="gg-label">MEMBERS</p>
            <div className="text-text-primary mt-3">
              <AsyncErrorBoundary fallback={null}>
                <DiscordMemberCount label={copy.memberLabel} />
              </AsyncErrorBoundary>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <a
            href={DISCORD_INVITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="gg-btn gg-btn-primary"
          >
            {copy.cta}
          </a>
        </div>
      </div>
    </div>
  )
}

export default function CommunityPage({
  locale,
  dict,
}: {
  locale: Locale
  dict: Dictionary
}) {
  const copy = dict.community

  return (
    <div className="gg-surface" data-locale={locale}>
      <CommunityStructuredData copy={copy} locale={locale} />
      <main id="main-content" aria-label={copy.about.heading}>
        <CommunityHero copy={copy.hero} />
        <div aria-hidden="true" className="gg-rule-accent" />

        <div className="mx-auto max-w-[1120px] px-4 pb-24 sm:px-6 sm:pb-32 lg:px-8">
          <section className="mt-12 sm:mt-16">
            <SectionHeading label={copy.value.label}>
              {copy.value.heading}
            </SectionHeading>
            <div className="gg-cell-grid mt-6 grid-cols-1 lg:grid-cols-3">
              {copy.value.items.map(proposition => (
                <article key={proposition.title} className="gg-cell">
                  <p className="gg-label">{proposition.label}</p>
                  <h3 className="text-text-primary mt-3 text-[20px] leading-[1.5] font-medium">
                    {proposition.title}
                  </h3>
                  <p className="text-text-secondary mt-2 text-[14px] leading-[1.7] font-medium">
                    {proposition.description}
                  </p>
                  <ul className="gg-prose-ja text-text-secondary mt-5 space-y-2 text-[14px]">
                    {proposition.benefits.map(benefit => (
                      <li key={benefit} className="flex items-start gap-2">
                        <span
                          aria-hidden="true"
                          className="text-accent mt-[0.15em]"
                        >
                          /
                        </span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-16 sm:mt-24">
            <SectionHeading label={copy.about.label}>
              {copy.about.heading}
            </SectionHeading>
            <p className="gg-prose-ja text-text-secondary mt-5 max-w-[720px] text-[16px] sm:text-[18px]">
              {copy.about.lead}
            </p>
            <div className="gg-cell-grid mt-6 grid-cols-1 lg:grid-cols-[1fr_280px]">
              <div className="gg-cell">
                <Image
                  src="/vcs-logo-wide-transparent.png"
                  alt={copy.about.logoAlt}
                  width={300}
                  height={100}
                  sizes="(max-width: 640px) 240px, 300px"
                  className="h-auto w-full max-w-[300px]"
                />
                <div className="mt-6 space-y-4">
                  {copy.about.paragraphs.map(paragraph => (
                    <p
                      key={paragraph}
                      className="gg-prose-ja text-text-secondary text-[16px]"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
              <div className="gg-cell flex items-center justify-center">
                <Image
                  src="/tomada.png"
                  alt={copy.about.profileAlt}
                  width={560}
                  height={560}
                  sizes="(max-width: 1024px) 50vw, 280px"
                  className="h-auto w-full max-w-[280px]"
                />
              </div>
            </div>
          </section>

          <section className="mt-16 sm:mt-24">
            <SectionHeading label={copy.startHere.label}>
              {copy.startHere.heading}
            </SectionHeading>
            <div className="gg-cell-grid mt-6 grid-cols-1 md:grid-cols-2">
              {copy.startHere.items.map(item => (
                <article key={item.question} className="gg-cell">
                  <h3 className="text-text-primary text-[18px] leading-[1.5] font-medium">
                    {item.question}
                  </h3>
                  <p className="gg-prose-ja text-text-secondary mt-3 text-[14px]">
                    {item.answer}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-16 sm:mt-24">
            <SectionHeading label={copy.channels.label}>
              {copy.channels.heading}
            </SectionHeading>
            <p className="gg-prose-ja text-text-secondary mt-5 max-w-[720px] text-[16px] sm:text-[18px]">
              {copy.channels.lead}
            </p>
            <div className="gg-cell-grid mt-6 grid-cols-1 md:grid-cols-2">
              {copy.channels.items.map(channel => (
                <article key={channel.name} className="gg-cell">
                  <p className="gg-label">{channel.label}</p>
                  <h3 className="text-text-primary mt-3 text-[20px] leading-[1.5] font-medium">
                    {channel.name}
                  </h3>
                  <p className="gg-prose-ja text-text-secondary mt-3 text-[14px]">
                    {channel.description}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-16 sm:mt-24">
            <SectionHeading label={copy.audience.label}>
              {copy.audience.heading}
            </SectionHeading>
            <div className="gg-cell-grid mt-6 grid-cols-1 md:grid-cols-2">
              {copy.audience.items.map(person => (
                <div key={person} className="gg-cell flex items-start gap-3">
                  <span aria-hidden="true" className="text-accent mt-[0.15em]">
                    /
                  </span>
                  <p className="gg-prose-ja text-text-secondary text-[16px]">
                    {person}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-16 sm:mt-24">
            <SectionHeading label={copy.faq.label}>
              {copy.faq.heading}
            </SectionHeading>
            <p className="gg-prose-ja text-text-secondary mt-5 max-w-[720px] text-[16px] sm:text-[18px]">
              {copy.faq.lead}
            </p>
            <div className="gg-cell-grid mt-6 grid-cols-1">
              {copy.faq.items.map(item => (
                <details
                  key={item.question}
                  className="gg-cell open:bg-surface-1"
                >
                  <summary className="text-text-primary cursor-pointer list-none pr-8 text-[18px] leading-[1.5] font-medium marker:hidden">
                    {item.question}
                  </summary>
                  <p className="gg-prose-ja text-text-secondary mt-4 text-[14px]">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>

          <section className="mt-16 sm:mt-24">
            <div className="gg-cell border-border border text-center sm:p-10">
              <p className="gg-label">{copy.join.label}</p>
              <h2 className="text-text-primary mt-3 text-[28px] leading-[1.3] font-medium tracking-[-0.015em] sm:text-[36px] sm:leading-[1.2]">
                {copy.join.heading}
              </h2>
              <p className="gg-prose-ja text-text-secondary mx-auto mt-4 max-w-[560px] text-[16px] sm:text-[18px]">
                {copy.join.lead.map(line => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
              <a
                href={DISCORD_INVITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="gg-btn gg-btn-primary mt-7"
              >
                {copy.join.cta}
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
