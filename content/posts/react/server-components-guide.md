---
title: Understanding React Server Components
date: '2025-01-11'
excerpt: Deep dive into React Server Components, their benefits, and how to use them effectively in your applications.
---

## What are Server Components?

React Server Components (RSC) are a new paradigm that allows components to render on the server with zero JavaScript sent to the client.

## Key Benefits

### Zero Bundle Size Impact

Server Components don't add to your JavaScript bundle:

```typescript
// This component runs ONLY on the server
async function ProductList() {
  // Large library used only on server
  const { processData } = await import('heavy-data-processor');
  const products = await getProducts();
  const processed = processData(products);

  return (
    <ul>
      {processed.map(product => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}
```

### Direct Data Access

Access databases and file systems directly:

```typescript
import { db } from '@/lib/database';
import { readFile } from 'fs/promises';

async function Article({ slug }: { slug: string }) {
  // Direct database access
  const article = await db.article.findUnique({
    where: { slug }
  });

  // Direct file system access
  const content = await readFile(`./content/${slug}.md`, 'utf-8');

  return <article>{content}</article>;
}
```

## Server vs Client Components

### When to use Server Components

- Data fetching
- Access backend resources
- Keep sensitive information on server
- Large dependencies

### When to use Client Components

- Interactivity (onClick, onChange)
- Browser APIs (localStorage, geolocation)
- Custom hooks with state
- Effects (useEffect)

## Composition Patterns

### Passing Server Components as Props

```typescript
// Server Component
async function UserProfile({ userId }: { userId: string }) {
  const user = await getUser(userId);
  return <div>{user.name}</div>;
}

// Client Component
'use client'
function Modal({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open</button>
      {isOpen && <div className="modal">{children}</div>}
    </>
  );
}

// Usage - Server Component inside Client Component!
function Page() {
  return (
    <Modal>
      <UserProfile userId="123" />
    </Modal>
  );
}
```

## Data Fetching Patterns

### Parallel Data Fetching

```typescript
async function Dashboard() {
  // These run in parallel
  const userPromise = getUser();
  const statsPromise = getStats();
  const notificationsPromise = getNotifications();

  const [user, stats, notifications] = await Promise.all([
    userPromise,
    statsPromise,
    notificationsPromise
  ]);

  return (
    <div>
      <UserCard user={user} />
      <StatsPanel stats={stats} />
      <NotificationList items={notifications} />
    </div>
  );
}
```

### Sequential with Dependencies

```typescript
async function UserPosts({ userId }: { userId: string }) {
  const user = await getUser(userId);
  const posts = await getPosts(user.id);
  const comments = await getComments(posts.map(p => p.id));

  return <PostList posts={posts} comments={comments} />;
}
```

## Best Practices

1. **Keep components on the server by default**
2. **Move to client only when needed**
3. **Use the "children" pattern for composition**
4. **Fetch data as close to where it's used as possible**

## Conclusion

Server Components represent a fundamental shift in how we build React applications. By keeping more code on the server, we can build faster, more secure applications while maintaining the component model we love.
