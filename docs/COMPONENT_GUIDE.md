# Vibe Coding Studio — Component Guide

> Updated: 2026-09-15

## Component organization

The former learning-document component tree was removed with the `/docs` feature.
The current component tree is intentionally small:

```text
src/components/
├── geist/
│   ├── community-page.tsx
│   ├── courses-page.tsx
│   ├── footer.tsx
│   ├── header.tsx
│   ├── html-lang.tsx
│   ├── profile-page.tsx
│   ├── profile-structured-data.tsx
│   ├── social-icons.tsx
│   └── theme-toggle.tsx
├── courses/
│   ├── course-card.tsx
│   └── course-list.tsx
├── discord-member-count.tsx
├── discord-member-count-client.tsx
└── error-boundary.tsx
```

All public page components use Geist Grid. The canonical visual rules and token
definitions live in `.claude/skills/geist-grid-design/SKILL.md` and
`src/styles/tailwind.css`.

## Page components

### `ProfilePage`

```tsx
<ProfilePage locale="ja" dict={getDictionary("ja")} />
```

Props:

```ts
{
  locale: Locale
  dict: Dictionary
}
```

Renders the profile, book, teaching, career, credentials, and links sections. It
uses shared book and course data while taking all display copy from the dictionary.

### `CoursesPage`

```tsx
<CoursesPage locale="en" dict={getDictionary("en")} />
```

Props:

```ts
{
  locale: Locale
  dict: Dictionary
}
```

Renders a Geist Grid page shell and delegates the published source course data to
`CourseList`. The page heading, lead, and metadata copy are localized; the Udemy
course titles and descriptions remain the published Japanese data.

### `CommunityPage`

```tsx
<CommunityPage locale="ja" dict={getDictionary("ja")} />
```

Props:

```ts
{
  locale: Locale
  dict: Dictionary
}
```

Renders the community hero, value cells, about section, pre-join questions,
channel guide, audience list, FAQ, and Discord calls to action. FAQ items use
native `<details>` and `<summary>` elements for keyboard and screen-reader support.
The page also emits locale-aware Organization JSON-LD.

## Shared shell components

### `Header`

```tsx
<Header />
```

The client component renders the three-item site navigation, language links,
skip-to-content link, mobile menu, and `ThemeToggle`. It derives the current
locale and language alternates from `usePathname()`. Navigation links use
`localizePath`, so English pages keep their `/en` prefix and active state.

### `Footer`

```tsx
<Footer />
```

Renders localized site, Discord, and social links plus the current-year copyright.
It shares the same `localizePath` behavior as the header.

### `ThemeToggle`

```tsx
<ThemeToggle
  label="Toggle theme"
  toLightLabel="Switch to light theme"
  toDarkLabel="Switch to dark theme"
/>
```

The control has exactly two states: `dark` and `light`. The synchronous
`THEME_INIT_SCRIPT` in the root layout reads the stored preference before
hydration; the toggle then updates `data-theme`, `color-scheme`, and localStorage.

### `HtmlLang`

```tsx
<HtmlLang locale="en" />
```

The client helper updates the document's `lang` attribute after mounting because
the root layout does not receive the route pathname. English routes must include
it.

## Course components

### `CourseList`

```tsx
<CourseList courses={getAllUdemyCourses()} />
```

`courses` is optional; when omitted it calls `getAllUdemyCourses()`. The wrapper
uses `gg-cell-grid` and renders one `CourseCard` per course.

### `CourseCard`

```tsx
<CourseCard course={course} />
```

Each card is a `gg-cell` article with an optimized thumbnail, external Udemy link,
source title/description, and neutral `gg-tag` topic labels. It has no rounded
marketing card treatment, category color system, or decorative shadow.

## Runtime and resilience components

### `DiscordMemberCount`

An async server component that calls `getDiscordMemberCount()` and delegates the
rendered count to `DiscordMemberCountClient`. It accepts an optional localized
label:

```tsx
<DiscordMemberCount label="members learning together" />
```

Missing configuration, a zero count, and API failures result in no visible count so
the community page remains usable.

### `ErrorBoundary` and `AsyncErrorBoundary`

Client-side boundaries catch render errors, show a token-based Geist Grid fallback,
and provide retry/homepage actions. `AsyncErrorBoundary` is a small composition
wrapper used around asynchronous UI such as the Discord count.

## Styling rules

- Use `gg-surface` for page roots.
- Use `gg-cell-grid` plus `gg-cell` for 1px cell layouts; do not add individual
  card shadows or large corner radii.
- Use semantic tokens (`text-text-primary`, `bg-surface-1`, `border-border`, and
  related utilities), never raw palette classes, raw hex values, or component-level
  `dark:` variants.
- Use `gg-label` for short uppercase English mono labels and `gg-prose-ja` for
  readable body copy.
- Keep focus indicators keyboard-visible. The global stylesheet provides the
  Geist double-ring focus treatment.
- Respect the page budgets for `gg-glow` and `gg-rule-accent` documented in the
  design skill.

## Adding a page

1. Add display copy to both `ja` and `en` in `src/i18n/dictionaries.ts`.
2. Build the page in `src/components/geist/` with `locale` and `dict` props.
3. Add the Japanese and English route files, `HtmlLang`, alternate metadata, and
   sitemap entries when the page has an English counterpart.
4. Add focused tests, then run `npm run check:all` and `npm run build`.
