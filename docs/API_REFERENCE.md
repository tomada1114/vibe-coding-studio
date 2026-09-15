# API Reference - Vibe Coding Studio

## Overview

This document provides detailed API documentation for all endpoints, utilities, and integrations in Vibe Coding Studio.

## Table of Contents

1. [REST API Endpoints](#rest-api-endpoints)
2. [Utility Functions](#utility-functions)
3. [Component APIs](#component-apis)

## REST API Endpoints

### CSP Report Endpoint

#### `POST /api/csp-report`

Receives and processes Content Security Policy violation reports.

**Request Headers:**

- `Content-Type`: `application/csp-report` or `application/json`

**Request Body:**

```typescript
interface CSPReport {
  'csp-report': {
    'document-uri': string
    'violated-directive': string
    'effective-directive': string
    'original-policy': string
    disposition: 'enforce' | 'report'
    'blocked-uri': string
    'line-number': number
    'column-number': number
    'source-file': string
    'status-code': number
    'script-sample': string
  }
}
```

**Response:**

- Status: `204 No Content` (success)
- Status: `400 Bad Request` (invalid format)
- Status: `500 Internal Server Error` (processing error)

**Error Response:**

```json
{
  "error": "Error message description"
}
```

**Implementation Details:**

- Validates CSP report format using `parseCSPViolation`
- Logs violations with appropriate severity levels
- Detects critical violations (script-src, default-src)
- Optional analytics integration for metrics tracking

---

### Udemy Courses API

Vibe Coding Studioで扱っているUdemy講座の情報を取得するAPI。トピックでフィルタリングして関連講座を検索できます。価格情報は含まれません。

#### `GET /api/udemy-courses`

講座一覧を取得します。

**Query Parameters:**

| Parameter | Type   | Required | Description                                                                 |
| --------- | ------ | -------- | --------------------------------------------------------------------------- |
| `topic`   | string | No       | フィルタリングするトピックのスラッグ。例: `claude-code`, `codex`, `nextjs` |

**Response:**

```typescript
interface UdemyCoursesApiResponse {
  courses: UdemyCourseApiInfo[]
  totalCount: number
  filter?: {
    topic?: string
  }
}

interface UdemyCourseApiInfo {
  id: string           // 講座ID（Udemy内部ID）
  title: string        // 講座タイトル
  slug: string         // URLスラッグ
  description: string  // 講座の概要説明
  topics: string[]     // 関連トピック一覧
  url: string          // 詳細ページURL
}
```

**Example Request:**

```bash
# 全講座取得
curl https://www.vibecodingstudio.dev/api/udemy-courses

# Claude Code関連の講座を取得
curl https://www.vibecodingstudio.dev/api/udemy-courses?topic=claude-code

# Codex関連の講座を取得
curl https://www.vibecodingstudio.dev/api/udemy-courses?topic=codex
```

**Example Response:**

```json
{
  "courses": [
    {
      "id": "6691241",
      "title": "【Claude Code×Vibe Coding】プログラミング未経験OK！ゼロから学べる AI 駆動開発実践講座",
      "slug": "claude-code-vibe-coding",
      "description": "Claude Code×Vibe Codingでプログラミング未経験でもReact・Next.jsで5つのアプリを開発！実践的な開発スキルを身につけることができます。",
      "topics": ["claude-code", "react", "nextjs"],
      "url": "https://www.vibecodingstudio.dev/coupons/claude-code-vibe-coding"
    }
  ],
  "totalCount": 8,
  "filter": {
    "topic": "claude-code"
  }
}
```

---

#### `GET /api/udemy-courses/topics`

利用可能なトピック一覧を取得します。`/coupons` ページのフィルタ種別と連動しています。

**Response:**

```typescript
interface UdemyTopicsApiResponse {
  topics: UdemyTopicApiInfo[]
  totalCount: number
}

interface UdemyTopicApiInfo {
  slug: string       // トピックスラッグ（フィルタリング用キー）
  name: string       // トピック表示名
  icon: string       // アイコンURL
  courseCount: number // 該当講座数
}
```

**Example Request:**

```bash
curl https://www.vibecodingstudio.dev/api/udemy-courses/topics
```

**Example Response:**

```json
{
  "topics": [
    {
      "slug": "claude-code",
      "name": "Claude Code",
      "icon": "/images/topics/claude.svg",
      "courseCount": 8
    },
    {
      "slug": "nextjs",
      "name": "Next.js",
      "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original-wordmark.svg",
      "courseCount": 6
    },
    {
      "slug": "codex",
      "name": "Codex",
      "icon": "/images/topics/codex.svg",
      "courseCount": 3
    }
  ],
  "totalCount": 18
}
```

---

#### `GET /api/udemy-courses/info`

API の説明情報を取得します。

**Response:**

```typescript
interface UdemyCoursesApiInfo {
  name: string
  description: string
  baseUrl: string
  endpoints: {
    path: string
    method: string
    description: string
    parameters?: {
      name: string
      type: string
      required: boolean
      description: string
    }[]
  }[]
}
```

**Example Request:**

```bash
curl https://www.vibecodingstudio.dev/api/udemy-courses/info
```

---

#### `OPTIONS /api/csp-report`

CORS preflight handler for CSP reporting.

**Response Headers:**

- `Access-Control-Allow-Origin`: `*`
- `Access-Control-Allow-Methods`: `POST, OPTIONS`
- `Access-Control-Allow-Headers`: `Content-Type`

---

### Cache Revalidation Endpoint

#### `POST /api/revalidate`

On-demand cache revalidation for ISR pages.

**Request Body:**

```typescript
interface RevalidateBody {
  type?: 'path' | 'tag' | 'all'
  path?: string
  tag?: string
  paths?: string[]
  tags?: string[]
  secret?: string
}
```

**Sanity Webhook Format:**

```typescript
interface SanityWebhook {
  _type: 'page' | 'category' | string
  slug?: {
    current: string
  }
  // Other Sanity document fields
}
```

**Response:**

```json
{
  "revalidated": ["path:/pricing", "tag:marketing"],
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

**Security:**

- Requires `REVALIDATION_SECRET` environment variable
- Returns 401 for invalid secrets

---

#### `GET /api/revalidate`

Manual revalidation endpoint for testing.

**Query Parameters:**

- `path`: Path to revalidate
- `tag`: Cache tag to revalidate
- `secret`: Authentication secret

**Info Response (no params):**

```json
{
  "message": "Cache revalidation endpoint",
  "usage": {
    "POST": {
      /* ... */
    },
    "GET": {
      /* ... */
    }
  },
  "examples": [
    /* ... */
  ]
}
```

---

## Utility Functions

### CSP Utilities

#### `parseCSPViolation(body)`

Parse and validate CSP violation reports.

**Parameters:**

- `body`: Raw CSP report body

**Returns:**

```typescript
{
  documentUri: string
  violatedDirective: string
  effectiveDirective: string
  blockedUri: string
  sourceFile?: string
  lineNumber?: number
  columnNumber?: number
  sample?: string
  disposition: 'enforce' | 'report'
  statusCode?: number
  referrer?: string
} | null
```

---

### Image Utilities

#### `urlForImage(source)`

Generate optimized Sanity image URLs.

**Parameters:**

- `source`: Sanity image reference

**Returns:** Sanity image URL builder instance

**Methods:**

- `.width(pixels)`: Set image width
- `.height(pixels)`: Set image height
- `.auto('format')`: Auto-format selection
- `.quality(percentage)`: Set quality (0-100)
- `.url()`: Generate final URL

---

### Logger Utilities

#### `logger`

Structured logging utility with levels.

**Methods:**

- `logger.info(message, metadata?)`
- `logger.warn(message, metadata?)`
- `logger.error(message, metadata?)`
- `logger.debug(message, metadata?)`

**Metadata Structure:**

```typescript
{
  [key: string]: any
  timestamp?: number
  context?: string
}
```

---

### Cache Utilities

#### `revalidatePath(path)`

Revalidate specific path cache.

**Parameters:**

- `path`: Path to revalidate (e.g., '/pricing')

---

#### `revalidateTag(tag)`

Revalidate cache by tag.

**Parameters:**

- `tag`: Cache tag (e.g., 'marketing')

---

### Retry Utilities

#### `withRetry(fn, options?)`

Execute function with automatic retry logic.

**Parameters:**

- `fn`: Function to execute
- `options`: Retry configuration

**Options:**

```typescript
{
  maxAttempts?: number   // Default: 3
  delay?: number        // Default: 1000ms
  backoff?: number      // Default: 2 (exponential)
  onRetry?: (error, attempt) => void
}
```

## Component APIs

### BentoCard

```typescript
interface BentoCardProps {
  dark?: boolean
  className?: string
  eyebrow: React.ReactNode
  title: React.ReactNode
  description: React.ReactNode
  graphic: React.ReactNode
  fade?: ('top' | 'bottom')[]
}
```

### AnimatedNumber

```typescript
interface AnimatedNumberProps {
  value: number
  duration?: number // Default: 2000ms
  format?: (value: number) => string
  className?: string
}
```

### Container

```typescript
interface ContainerProps {
  className?: string
  children: React.ReactNode
}
```

### Button

```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  onClick?: () => void
  disabled?: boolean
  className?: string
  children: React.ReactNode
}
```

### Screenshot

```typescript
interface ScreenshotProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
}
```

## Type Definitions

### Security Types

#### CSP Violation

```typescript
interface CSPViolation {
  documentUri: string
  violatedDirective: string
  effectiveDirective: string
  originalPolicy: string
  disposition: 'enforce' | 'report'
  blockedUri: string
  lineNumber?: number
  columnNumber?: number
  sourceFile?: string
  statusCode?: number
  scriptSample?: string
  referrer?: string
}
```

## Error Codes

### API Error Codes

| Code | Description           | Resolution                   |
| ---- | --------------------- | ---------------------------- |
| 400  | Bad Request           | Check request format         |
| 401  | Unauthorized          | Verify authentication secret |
| 404  | Not Found             | Check endpoint URL           |
| 500  | Internal Server Error | Check server logs            |

### Validation Errors

| Error                | Description                           | Resolution                         |
| -------------------- | ------------------------------------- | ---------------------------------- |
| `INVALID_CSP_FORMAT` | CSP report format invalid             | Ensure proper CSP report structure |
| `INVALID_SECRET`     | Revalidation secret mismatch          | Check REVALIDATION_SECRET env var  |
| `MISSING_ENV_VAR`    | Required environment variable missing | Set required environment variables |
| `SANITY_API_ERROR`   | Sanity API request failed             | Check Sanity configuration         |

## Rate Limiting

### Endpoint Limits

| Endpoint           | Rate Limit   | Window   |
| ------------------ | ------------ | -------- |
| `/api/csp-report`  | 100 req/min  | 1 minute |
| `/api/performance` | 1000 req/min | 1 minute |
| `/api/revalidate`  | 10 req/min   | 1 minute |

### Response Headers

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1234567890
```

## Webhook Integration

### Sanity Webhooks

Configure in Sanity Studio:

**URL:** `https://your-domain.com/api/revalidate`

**Headers:**

```json
{
  "Content-Type": "application/json"
}
```

**Body:**

```json
{
  "secret": "your-revalidation-secret",
  "_type": "{{doc._type}}",
  "slug": "{{doc.slug}}"
}
```

**Triggers:**

- Create
- Update
- Delete

## Examples

### Manual Cache Revalidation

```bash
# Revalidate path
curl -X POST https://your-domain.com/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{"type":"path","path":"/pricing","secret":"your-secret"}'

# Revalidate tag
curl -X POST https://your-domain.com/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{"type":"tag","tag":"marketing","secret":"your-secret"}'
```

---

_Generated from Vibe Coding Studio v0.1.0_
