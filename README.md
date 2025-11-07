# Radiant - Minimal Static Site Template

Radiant is a minimal [Tailwind Plus](https://tailwindcss.com/plus) site template built using [Tailwind CSS](https://tailwindcss.com) and [Next.js](https://nextjs.org).

This template has been simplified to serve as a clean, static site foundation with no external dependencies like CMS or authentication systems.

## Features

- ✨ **Next.js 15** with App Router
- 🎨 **Tailwind CSS v4** with PostCSS
- 🧩 **Headless UI** components
- 🎬 **Framer Motion** animations
- 🔒 **Content Security Policy (CSP)** with nonce-based inline scripts
- ⚡ **Incremental Static Regeneration (ISR)** for optimal performance
- 🧪 **Jest** for unit testing
- 📝 **TypeScript** with strict mode enabled

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup (Optional)

Copy the example environment file:

```bash
cp .env.example .env.local
```

Edit `.env.local` to configure optional settings:

```env
# Optional: Canonical site URL used in metadata
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# Optional: Report URI for CSP violations
NEXT_PUBLIC_CSP_REPORT_URI=/api/csp-report
```

### 3. Validate Configuration (Optional)

```bash
npm run validate:env
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the website.

## Development Scripts

```bash
# Development
npm run dev              # Start development server

# Production
npm run build            # Build for production
npm run start            # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run type-check       # Run TypeScript type checking
npm run pre-commit-check # Run all pre-commit checks

# Testing
npm run test             # Run Jest tests
npm run test:watch       # Run tests in watch mode
```

## Utility Scripts

### Export Video Metadata to Plain Text

Export all YouTube video metadata as plain text files for use in video descriptions:

```bash
npx tsx scripts/export-videos-to-markdown.ts
```

This script will:
- ✅ Convert all video metadata from `src/data/videos/` to YouTube-compatible plain text format
- ✅ Generate files in `.output/videos-plaintext/` directory
- ✅ Create one `.txt` file per video, named after the video title
- ✅ Include all sections: opening, learning points, related videos, Udemy courses, timestamps, social links, and tags
- ✅ Format links as separate lines (text and URL) for YouTube compatibility
- ✅ Use section dividers (━━━━━━) for visual separation

**Output Location**: `.output/videos-plaintext/`

**Use Case**: Copy the generated text directly into YouTube video descriptions when uploading or updating videos.

## Project Structure

```
├── src/
│   ├── app/              # Next.js App Router pages and layouts
│   ├── components/       # Reusable UI components
│   │   ├── __tests__/   # Component tests
│   │   └── ...          # UI components (Button, Card, etc.)
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility libraries and configuration
│   └── styles/          # Global styles and Tailwind configuration
├── public/              # Static assets
└── docs/                # Documentation
```

## Customizing

You can start customizing this template by modifying the files in the `/src` folder. The site will auto-update as you edit these files.

### Key Files to Edit

- `src/app/page.tsx` - Home page content
- `src/components/navbar.tsx` - Navigation links
- `src/components/footer.tsx` - Footer content
- `src/app/layout.tsx` - Site metadata and global layout

## Development Workflow

### Before Committing

Always run the pre-commit check to ensure code quality:

```bash
npm run pre-commit-check
```

This will:
- ✅ Run ESLint checks
- ✅ Verify TypeScript types
- ✅ Validate environment configuration
- ✅ Check for required files

### Commit Convention

Follow conventional commit format:
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `test:` Test additions or changes
- `refactor:` Code refactoring
- `chore:` Maintenance tasks

## Testing

This template includes comprehensive test coverage:

```bash
npm run test              # Run all tests
npm run test:watch        # Run tests in watch mode
```

## Documentation

Comprehensive documentation is available in the `/docs` directory:

- `PROJECT_DOCUMENTATION.md` - Complete project overview
- `API_REFERENCE.md` - API endpoints and utilities
- `COMPONENT_GUIDE.md` - Component library reference
- `design/` - Design system documentation

## Performance

The template is optimized for performance:

- **ISR**: 60-second revalidation for blog pages
- **Image Optimization**: AVIF/WebP support
- **Bundle Analysis**: Available via `ANALYZE=true` environment variable
- **Caching Strategy**: Optimized via middleware

## Security

Security features included:

- Content Security Policy (CSP) with nonce-based inline scripts
- Strict-Transport-Security (HSTS) with preload
- X-Frame-Options, X-Content-Type-Options headers
- Permissions-Policy restrictions

## License

This site template is a commercial product and is licensed under the [Tailwind Plus license](https://tailwindcss.com/plus/license).

## Learn More

To learn more about the technologies used in this site template:

- [Tailwind CSS](https://tailwindcss.com/docs) - Official Tailwind CSS documentation
- [Next.js](https://nextjs.org/docs) - Official Next.js documentation
- [Headless UI](https://headlessui.dev) - Official Headless UI documentation
- [Framer Motion](https://www.framer.com/motion/) - Animation library
