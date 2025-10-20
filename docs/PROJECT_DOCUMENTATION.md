# Radiant Template - Comprehensive Project Documentation

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [API Documentation](#api-documentation)
4. [Component Library](#component-library)
5. [Sanity CMS Integration](#sanity-cms-integration)
6. [Security Features](#security-features)
7. [Performance Optimizations](#performance-optimizations)
8. [Testing](#testing)
9. [Development Workflow](#development-workflow)
10. [Deployment](#deployment)

## Project Overview

Radiant is a modern, production-ready Next.js 15 template with TypeScript, Tailwind CSS v4, and Sanity CMS integration. It features enterprise-grade security, performance monitoring, and a comprehensive component library.

### Key Features

- **Next.js 15.4.4** with App Router and React 19
- **TypeScript** with strict mode enabled
- **Tailwind CSS v4** with PostCSS integration
- **Sanity CMS** for content management
- **Security-first** approach with CSP and security headers
- **Component library** with animation support via Framer Motion
- **Testing suite** with Jest, Playwright, and Storybook

## Architecture

### Directory Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── company/           # Company marketing page
│   ├── pricing/           # Pricing page
│   ├── login/             # Authentication entry point
│   ├── signup/            # Registration page
│   └── page.tsx           # Landing page
├── components/            # Reusable UI components
├── lib/                   # Utility libraries
└── sanity/                # Sanity CMS integration
    ├── types/             # Content type definitions
    └── queries/           # GROQ queries
```

### Tech Stack Details

| Layer       | Technology      | Purpose                      |
| ----------- | --------------- | ---------------------------- |
| Framework   | Next.js 15.4.4  | React framework with SSG/SSR |
| UI Library  | React 19        | Component library            |
| Styling     | Tailwind CSS v4 | Utility-first CSS            |
| CMS         | Sanity v4       | Headless CMS                 |
| Animations  | Framer Motion   | Animation library            |
| Icons       | Heroicons       | Icon library                 |
| Type Safety | TypeScript 5    | Static typing                |

## API Documentation

### Content Security Policy (CSP) Reporting

**Endpoint:** `/api/csp-report`  
**Method:** `POST`  
**Purpose:** Receives and processes CSP violation reports from browsers

**Request Body:**

```json
{
  "csp-report": {
    "document-uri": "string",
    "violated-directive": "string",
    "effective-directive": "string",
    "blocked-uri": "string",
    "source-file": "string",
    "line-number": "number",
    "column-number": "number"
  }
}
```

**Response:**

- `204 No Content` on success
- `400 Bad Request` for invalid format
- `500 Internal Server Error` for processing errors

**Features:**

- Automatic violation logging with severity levels
- Critical violation detection and alerting
- Optional integration with analytics services
- CORS support for cross-origin reporting

### Cache Revalidation

**Endpoint:** `/api/revalidate`  
**Methods:** `POST`, `GET`  
**Purpose:** On-demand cache invalidation for ISR pages

**POST Request Body:**

```json
{
  "type": "path|tag|all",
  "path": "/pricing",
  "tag": "marketing",
  "paths": ["/pricing", "/company"],
  "tags": ["marketing"],
  "secret": "your-secret"
}
```

**GET Parameters:**

- `path`: Path to revalidate
- `tag`: Tag to revalidate
- `secret`: Authentication secret

**Response:**

```json
{
  "revalidated": ["path:/pricing", "path:/company", "tag:marketing"],
  "timestamp": "2024-01-01T00:00:00Z"
}
```

**Features:**

- Sanity webhook compatibility
- Bulk revalidation support
- Secret-based authentication
- Automatic post/category detection

## Component Library

### Core Components

#### BentoCard

Interactive card component with animation support.

```tsx
<BentoCard
  dark={false}
  eyebrow="Category"
  title="Card Title"
  description="Card description text"
  graphic={<ImageComponent />}
  fade={['top', 'bottom']}
/>
```

**Props:**

- `dark`: Enable dark mode styling
- `eyebrow`: Small heading text
- `title`: Main card title
- `description`: Card description
- `graphic`: Visual component (300px height)
- `fade`: Gradient fade directions

#### AnimatedNumber

Animated number display with counting effect.

```tsx
<AnimatedNumber value={1234} duration={2000} format={n => n.toFixed(0)} />
```

#### Container

Responsive container with consistent padding.

```tsx
<Container className="custom-class">{/* Content */}</Container>
```

#### Button

Consistent button styling with variants.

```tsx
<Button
  variant="primary|secondary|outline"
  size="sm|md|lg"
  href="/link"
  onClick={handleClick}
>
  Button Text
</Button>
```

### Layout Components

#### Navbar

Navigation bar with responsive menu.

Features:

- Mobile-responsive hamburger menu
- Active route highlighting
- Smooth scroll behavior
- Logo integration

#### Footer

Site footer with links and branding.

Features:

- Multi-column layout
- Social media links
- Copyright information
- Newsletter signup

### Visual Components

#### Screenshot

Image display with device frame.

```tsx
<Screenshot src="/image.png" alt="Description" width={1200} height={800} />
```

#### Logo Variants

- `Logo`: Standard logo
- `LogoCloud`: Partner logo grid
- `LogoCluster`: Animated logo arrangement
- `LogoTimeline`: Timeline-based logo display

#### PlusGrid

Background grid pattern for visual enhancement.

#### Gradient

Dynamic gradient backgrounds.

## Sanity CMS Integration

### Content Types

#### Post

Blog post with rich content support.

**Fields:**

- `title`: Post title (required)
- `slug`: URL slug (auto-generated)
- `publishedAt`: Publication date
- `isFeatured`: Featured flag (max 3)
- `author`: Author reference
- `mainImage`: Hero image with alt text
- `categories`: Category references
- `excerpt`: Short description
- `body`: Rich text content

#### Author

Content author information.

**Fields:**

- `name`: Author name
- `image`: Profile image
- `bio`: Author biography

#### Category

Post categorization.

**Fields:**

- `title`: Category name
- `slug`: URL slug
- `description`: Category description

#### Block Content

Rich text content with formatting support.

**Features:**

- Headings (H1-H6)
- Lists (ordered/unordered)
- Links with external/internal support
- Images with captions
- Code blocks
- Quotes

### GROQ Queries

#### Available Queries

```typescript
// Get paginated posts
getPosts(startIndex: number, endIndex: number, category?: string)

// Get featured posts
getFeaturedPosts(quantity: number)

// Get single post
getPost(slug: string)

// Get all categories
getCategories()

// Get posts for RSS feed
getPostsForFeed()

// Get total post count
getPostsCount(category?: string)
```

### Live Preview

The template includes Sanity Live Preview support for real-time content editing.

**Setup:**

1. Configure environment variables
2. Enable preview mode in Sanity Studio
3. Use `sanityFetch` for queries

## Security Features

### Content Security Policy (CSP)

**Implementation:**

- Nonce-based inline script execution
- Report-only mode for development
- Full enforcement for production
- Comprehensive directive coverage

**Directives:**

```
default-src: 'self'
script-src: 'self' 'nonce-{nonce}'
style-src: 'self' 'unsafe-inline'
img-src: 'self' data: https:
font-src: 'self' data:
connect-src: 'self' https://api.sanity.io
```

### Security Headers

**Implemented Headers:**

- `Strict-Transport-Security`: HSTS with preload
- `X-Frame-Options`: SAMEORIGIN
- `X-Content-Type-Options`: nosniff
- `Referrer-Policy`: strict-origin-when-cross-origin
- `Permissions-Policy`: Restrictive permissions

### Environment Validation

Automatic validation of required environment variables:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_API_TOKEN` (for preview mode)
- `REVALIDATION_SECRET` (for webhooks)

## Performance Optimizations

### Optimization Strategies

#### Image Optimization

- Automatic format conversion (AVIF/WebP)
- Responsive image generation
- Lazy loading by default
- Sanity image CDN integration

#### Bundle Optimization

- Tree shaking enabled
- Code splitting per route
- Dynamic imports for heavy components
- Bundle analysis with `npm run build:analyze`

#### Caching Strategy

- ISR with 60-second revalidation
- Static generation for marketing pages
- On-demand revalidation via webhooks
- Edge caching headers

### Performance Budget

| Metric           | Target | Critical |
| ---------------- | ------ | -------- |
| Bundle Size      | <500KB | <1MB     |
| Load Time (3G)   | <3s    | <5s      |
| Load Time (WiFi) | <1s    | <2s      |
| Lighthouse Score | >90    | >75      |

## Testing

### Unit Testing (Jest)

**Setup:**

```bash
npm test              # Run tests
npm test:watch        # Watch mode
npm test:coverage     # Coverage report
```

**Test Structure:**

```typescript
describe('Component', () => {
  it('should render correctly', () => {
    // Test implementation
  })
})
```

### E2E Testing (Playwright)

**Commands:**

```bash
npm run e2e           # Run all tests
npm run e2e:ui        # UI mode
npm run e2e:debug     # Debug mode
npm run e2e:chromium  # Chrome only
npm run e2e:mobile    # Mobile browsers
```

**Test Example:**

```typescript
test('should navigate to pricing', async ({ page }) => {
  await page.goto('/')
  await page.click('text=Pricing')
  await expect(page).toHaveURL('/pricing')
})
```

### Visual Testing (Storybook)

**Commands:**

```bash
npm run storybook     # Development
npm run build-storybook # Production build
```

**Story Example:**

```typescript
export const Default: Story = {
  args: {
    title: 'Example',
    description: 'Description',
  },
}
```

## Development Workflow

### Initial Setup

```bash
# Install dependencies
npm install

# Setup environment
npm run setup

# Validate environment
npm run validate:env

# Generate Sanity types
npm run typegen
```

### Development

```bash
# Start dev server
npm run dev

# Type checking
npm run type-check

# Linting
npm run lint

# Run tests
npm test
```

### Pre-commit Checks

```bash
# Type checking + linting
npm run prebuild

# Bundle size check
npm run bundle:check
```

## Deployment

### Environment Variables

**Required:**

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
```

**Optional:**

```env
SANITY_API_TOKEN=              # For preview mode
REVALIDATION_SECRET=           # For webhooks
NEXT_PUBLIC_ANALYTICS_ENDPOINT= # For analytics
```

### Build Process

```bash
# Production build
npm run build

# Analyze bundle
npm run build:analyze

# Start production server
npm start
```

### Deployment Platforms

#### Vercel (Recommended)

1. Connect GitHub repository
2. Set environment variables
3. Deploy with automatic builds

#### Other Platforms

- Netlify: Use Next.js adapter
- AWS: Deploy with Amplify or custom EC2
- Docker: Use provided Dockerfile (if available)

### Post-Deployment

1. **Configure Webhooks**: Set up Sanity webhooks for content updates
2. **Monitor Performance**: Review analytics logs for regressions
3. **Test CSP**: Verify security policy in production
4. **Enable Analytics**: Configure performance tracking

## Best Practices

### Code Standards

- Use TypeScript strict mode
- Follow ESLint rules
- Maintain >80% test coverage
- Document complex functions

### Component Guidelines

- Use composition over inheritance
- Implement proper error boundaries
- Follow accessibility standards (WCAG 2.1)
- Optimize for mobile-first

### Performance Guidelines

- Lazy load heavy components
- Optimize images with next/image
- Use static generation where possible
- Monitor bundle size regularly

### Security Guidelines

- Never expose API keys in client code
- Validate all user inputs
- Use CSP in enforcement mode for production
- Regular dependency updates

## Support & Resources

### Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### Community

- GitHub Issues for bug reports
- Discussions for feature requests
- Discord/Slack for community support

### License

Check LICENSE file for usage terms.

---

_Last Updated: 2024_
