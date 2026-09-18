# Vibe Coding Studio

Vibe Coding Studio is a static site built with [Next.js](https://nextjs.org), [Tailwind CSS](https://tailwindcss.com), and the Geist Grid design system.

The site presents a profile, Udemy courses, and a Discord community without a CMS or authentication system.

## Features

- ✨ **Next.js 16** with App Router
- 🎨 **Tailwind CSS v4** with PostCSS
- 🔒 **Content Security Policy (CSP)** via static response headers (keeps pages statically generated)
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

# Optional: Discord Bot Token for fetching server member count
DISCORD_BOT_TOKEN=your_bot_token_here

# Optional: Discord Guild (Server) ID
DISCORD_GUILD_ID=your_guild_id_here
```

#### Discord Configuration (Optional)

To display Discord server member count on the community page:

1. **Create a Discord Bot**:
   - Visit [Discord Developer Portal](https://discord.com/developers/applications)
   - Click "New Application" and give it a name
   - Go to "Bot" section and create a bot
   - Copy the bot token and add it to `DISCORD_BOT_TOKEN`

2. **Get Your Guild ID**:
   - Enable Developer Mode in Discord (User Settings → Advanced → Developer Mode)
   - Right-click your server and select "Copy ID"
   - Add it to `DISCORD_GUILD_ID`

3. **Invite the Bot**:
   - Go to "OAuth2" → "URL Generator"
   - Select scopes: `bot`
   - No permissions are required (bot only reads server info)
   - Copy the generated URL and open it in your browser to invite the bot

**Note**: If these environment variables are not set, the member count will simply not be displayed.

### 3. Run Development Server

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
npm run check:all        # Run all repository checks

# Testing
npm run test             # Run Jest tests
npm run test:coverage    # Run Jest with coverage
npx jest --watch         # Run tests in watch mode
```

## Project Structure

```
├── src/
│   ├── app/              # Next.js App Router routes and metadata
│   ├── components/       # Shared components, including Geist Grid UI
│   ├── data/             # Book and Udemy course data
│   ├── i18n/             # Locale helpers and Japanese/English dictionaries
│   ├── lib/              # SEO and Discord API utilities
│   └── styles/           # Global Tailwind CSS tokens and utilities
├── public/               # Static images and topic assets
├── docs/                 # Project and design documentation
└── .kiro/steering/       # Product, technical, and structure guidance
```

## Customizing

You can customize the site by modifying the files in the `/src` folder. The development server auto-updates as you edit the files.

### Key Files to Edit

- `src/app/page.tsx` - Home page content
- `src/components/geist/header.tsx` - Navigation links
- `src/components/geist/footer.tsx` - Footer content
- `src/app/courses/page.tsx` - Udemy course listing
- `src/app/layout.tsx` - Site metadata and global layout
- `src/i18n/dictionaries.ts` - Japanese and English display copy

## Development Workflow

### Before Committing

Always run the repository checks to ensure code quality:

```bash
npm run check:all
```

This runs formatting, ESLint, TypeScript, and the Jest test suite. Run `npm run build` separately to verify Next.js route entry points.

### Commit Convention

Follow conventional commit format:
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `test:` Test additions or changes
- `refactor:` Code refactoring
- `chore:` Maintenance tasks

## Testing

The project includes colocated Jest tests and a global 80% coverage gate:

```bash
npm run test              # Run all tests
npm run test:coverage     # Run tests with coverage
npx jest --watch          # Run tests in watch mode
```

## Documentation

Comprehensive documentation is available in the `/docs` directory:

- `PROJECT_DOCUMENTATION.md` - Complete project overview
- `API_REFERENCE.md` - Exported utilities and metadata contracts
- `COMPONENT_GUIDE.md` - Component library reference
- `design/` - Design system documentation

## Performance

Performance-related settings include:

- **Image Optimization**: AVIF/WebP support
- **Bundle Analysis**: Available via `npm run analyze`
- **Caching Strategy**: Cache-Control headers and Next.js image caching in `next.config.mjs`

## Security

Security features included:

- Content Security Policy (CSP) set as a static header in `next.config.mjs` (no nonces; inline scripts are allowed so pages stay static — it blocks third-party script origins, plugins, base-tag and form hijacking, and framing)
- X-Frame-Options, X-Content-Type-Options, and Referrer-Policy headers

## Learn More

To learn more about the technologies used in this site:

- [Tailwind CSS](https://tailwindcss.com/docs) - Official Tailwind CSS documentation
- [Next.js](https://nextjs.org/docs) - Official Next.js documentation
