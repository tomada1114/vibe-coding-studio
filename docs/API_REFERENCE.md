# Vibe Coding Studio — API Reference

> Updated: 2026-09-15

## Scope

This project currently exposes no public `src/app/api/**` route handlers. The site
is a statically generated content site. The following functions are the supported
internal interfaces used by route components and metadata generation.

## Locale and dictionary APIs

### `getDictionary(locale)`

```ts
import { getDictionary } from "@/i18n/dictionaries"

const dict = getDictionary("en")
```

Returns a `Dictionary` with the display copy for the requested `Locale` (`"ja"`
or `"en"`). Both dictionaries are checked against the same TypeScript shape.

### `getLocaleFromPathname(pathname)`

```ts
getLocaleFromPathname(pathname: string | null): Locale
```

Returns `"en"` for `/en` and `/en/*`; all other paths use the default locale
`"ja"`.

### `localizePath(pathname, locale)`

```ts
localizePath(pathname: string, locale: Locale): string
```

Adds the `/en` prefix only for `EN_ENABLED_PATHS` (`/`, `/courses`, and
`/community`). Japanese paths remain unchanged, and paths without an English
page are returned unchanged rather than producing a broken link.

### `getLocaleAlternates(pathname)`

```ts
getLocaleAlternates(pathname: string | null): Record<Locale, string>
```

Returns the Japanese and English links for the language toggle. For a page without
an English counterpart, the English link is `/en`.

## SEO APIs

### `getSiteUrl()`

```ts
getSiteUrl(): string
```

Reads `NEXT_PUBLIC_SITE_URL`, validates it, strips one trailing slash, and falls
back to `https://www.vibecodingstudio.dev` when the value is missing or invalid.

It is used by route metadata, `src/app/robots.ts`, and `src/app/sitemap.ts` so
canonical URLs share one source of truth.

## Content data APIs

### `getAllUdemyCourses()`

```ts
getAllUdemyCourses(): UdemyCourse[]
```

Returns a copy of the complete course list. The function also copies each topic
array so callers cannot mutate the source data in `src/data/udemy-courses/index.ts`.
The returned title and description fields are the published Japanese source data.

### `formatMemberCount(count)`

```ts
formatMemberCount(count: number): string
```

Rounds a Discord member count down to the nearest ten and formats it with a
locale-aware thousands separator and a trailing `+`. A zero count returns an
empty string.

### `getDiscordMemberCount()`

```ts
getDiscordMemberCount(): Promise<number>
```

Fetches approximate guild member counts from Discord API v10 using the private
environment variables `DISCORD_BOT_TOKEN` and `DISCORD_GUILD_ID`. The request is
cached for one hour with the `discord-member-count` tag. Missing credentials return
`0`; HTTP and network failures throw `DiscordAPIError` after logging the failure.

## Route metadata

The six public page routes are statically generated:

| Route | Canonical URL | Alternate URLs |
| --- | --- | --- |
| `/` | site root | `/en` |
| `/en` | `/en` | site root |
| `/courses` | `/courses` | `/en/courses` |
| `/en/courses` | `/en/courses` | `/courses` |
| `/community` | `/community` | `/en/community` |
| `/en/community` | `/en/community` | `/community` |

The sitemap includes all six URLs. `robots.txt` allows the public site and
disallows `/api/` and `/_next/` paths.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical URLs, robots, and sitemap |
| `DISCORD_BOT_TOKEN` | Optional | Server-side Discord member count |
| `DISCORD_GUILD_ID` | Optional | Discord guild selected for the count |

Keep the bot token server-side. Do not expose it through a client component or a
`NEXT_PUBLIC_*` variable.
