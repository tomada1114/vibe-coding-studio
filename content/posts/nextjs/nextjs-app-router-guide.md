---
title: Next.js 15 App Router Complete Guide
date: '2025-01-12'
excerpt: Master the Next.js App Router with this comprehensive guide covering layouts, server components, and best practices.
---

## Introduction to App Router

Next.js 15 introduces powerful features with the App Router. This guide will help you understand and leverage these capabilities.

## Directory Structure

The App Router uses a file-system based routing:

```
src/
└── app/
    ├── layout.tsx      # Root layout
    ├── page.tsx        # Home page (/)
    ├── about/
    │   └── page.tsx    # About page (/about)
    └── blog/
        ├── page.tsx    # Blog index (/blog)
        └── [slug]/
            └── page.tsx # Dynamic route (/blog/[slug])
```

## Server Components

By default, all components in the App Router are Server Components:

```typescript
// This runs on the server
async function BlogPage() {
  // Can directly fetch data
  const posts = await fetch('https://api.example.com/posts');

  return (
    <div>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  );
}
```

## Client Components

Use `'use client'` directive for interactive components:

```typescript
'use client'

import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(c => c + 1)}>
      Count: {count}
    </button>
  );
}
```

## Layouts and Templates

### Root Layout

```typescript
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

### Nested Layouts

```typescript
// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="dashboard">
      <nav>Dashboard Navigation</nav>
      <main>{children}</main>
    </div>
  );
}
```

## Data Fetching

### Static Data Fetching

```typescript
// This data is cached by default
async function getData() {
  const res = await fetch('https://api.example.com/data');
  return res.json();
}
```

### Dynamic Data Fetching

```typescript
// Revalidate every 60 seconds
async function getData() {
  const res = await fetch('https://api.example.com/data', {
    next: { revalidate: 60 }
  });
  return res.json();
}
```

## Metadata API

```typescript
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Page Title',
  description: 'Page description for SEO',
  openGraph: {
    title: 'My Page Title',
    description: 'Page description for social sharing',
  },
};
```

## Route Handlers

Create API endpoints with Route Handlers:

```typescript
// app/api/posts/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const posts = await getPosts();
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newPost = await createPost(body);
  return NextResponse.json(newPost, { status: 201 });
}
```

## Conclusion

The App Router provides a powerful and flexible way to build modern web applications. Embrace Server Components, leverage caching, and enjoy the improved developer experience.
