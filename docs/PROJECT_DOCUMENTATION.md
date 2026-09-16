# Vibe Coding Studio — Project Documentation

> Updated: 2026-09-15

## Project overview

Vibe Coding Studio is a static Next.js 15 site built with the App Router, React 19,
TypeScript strict mode, and Tailwind CSS v4. It presents Tomada's profile, book,
Udemy courses, and Discord community.

The former learning-document feature has been removed. There is no `/docs` route,
Markdoc pipeline, or documentation asset bundle in this project. The repository
root `docs/` directory is project documentation and is unrelated to the removed
site feature.

## Public routes

| Locale | Route | Purpose |
| --- | --- | --- |
| Japanese | `/` | Profile, book, teaching, career, and links |
| English | `/en` | English profile and the same public facts |
| Japanese | `/courses` | Udemy course listing |
| English | `/en/courses` | English course-list page shell with the source course data |
| Japanese | `/community` | Discord community information |
| English | `/en/community` | English Discord community information |

Error handling, robots, and sitemap metadata are provided by the App Router files
`src/app/not-found.tsx`, `src/app/error.tsx`, `src/app/global-error.tsx`,
`src/app/robots.ts`, and `src/app/sitemap.ts`.

## Architecture

```text
src/
├── app/                    # App Router routes and route metadata
│   ├── en/                 # English versions of the three public surfaces
│   └── ...
├── components/
│   ├── geist/              # Shared Geist Grid page and shell components
│   └── courses/            # Course list and course card
├── data/                   # Book facts and source Udemy course data
├── i18n/                   # Locale helpers and typed display dictionaries
├── lib/                    # Constants, Discord API, and SEO helpers
├── styles/tailwind.css     # Tailwind v4 theme tokens and gg-* utilities
└── types/                  # Shared TypeScript models
```

## Design system: Geist Grid

All six public page routes and the shared header/footer use Geist Grid. The design
uses a dark default theme and a manual light-theme toggle. Pages are rooted in
`gg-surface`; cell layouts use `gg-cell-grid` and `gg-cell`, with semantic color
tokens such as `bg-bg`, `text-text-primary`, `text-text-secondary`, and
`border-border`.

The canonical rules are in
`.claude/skills/geist-grid-design/SKILL.md`, with the implementation in
`src/styles/tailwind.css`. New page work must follow that skill and must not add
raw palette classes, component-level `dark:` variants, or raw hex colors.

## Content and localization

- `src/data/book.ts` is the single source for book facts.
- `src/data/udemy-courses/` is the single source for the published course data.
  Course titles and descriptions are source content and remain Japanese on both
  course-list routes.
- `src/i18n/dictionaries.ts` contains typed display copy for Japanese and English.
  The dictionary covers the header, footer, profile, courses, and community.
- `src/i18n/locale.ts` uses `/en` as the English prefix and
  `EN_ENABLED_PATHS` to decide which paths have English counterparts. Unsupported
  paths fall back to `/en` in the language toggle.

English routes use the shared page component with the English dictionary, add
`HtmlLang`, and publish `ja`, `en`, and `x-default` alternate URLs in metadata.

## Runtime integrations and SEO

The site has no public application API route handlers. The community page may read
the Discord guild member count server-side through `src/lib/discord-api.ts`. If
`DISCORD_BOT_TOKEN` or `DISCORD_GUILD_ID` is absent, the count is omitted without
breaking the page.

`NEXT_PUBLIC_SITE_URL` is used by page metadata, `robots.txt`, and the sitemap. If
it is absent or invalid, `src/lib/seo/site-url.ts` uses the documented fallback
URL and logs a diagnostic message.

## Development commands

```bash
npm install
npm run dev
npm run check:all       # lint, format, type-check, and Jest
npm run build           # production build and static route generation
npm run start
```

Run a focused test with:

```bash
npx jest --runInBand src/app/__tests__/sitemap.test.ts
```

The project currently uses Jest with Testing Library. There are no active
Playwright, Storybook, Sanity, or Markdoc scripts in `package.json`.

## Quality requirements

- TypeScript strict mode and ESLint must pass.
- The full Jest suite must pass; coverage thresholds are defined in `jest.config.js`.
- Interactive controls must remain keyboard accessible and meet WCAG 2.1 AA goals.
- New display copy belongs in both locale dictionaries.
- New public routes must be represented in metadata, localization behavior, and
  the sitemap when appropriate.

## Deployment

Build the site with `npm run build` and serve it with `npm run start`, or deploy
the Next.js application to the project's configured hosting provider. Set
`NEXT_PUBLIC_SITE_URL` for canonical URLs. Set the two Discord variables only when
the live member count is required.
