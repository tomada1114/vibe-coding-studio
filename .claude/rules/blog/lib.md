---
paths: src/lib/blog/**/*.ts
---

# Blog Library Rules

## Error Handling

- Use `BlogPostError` class with context (`filePath`, `category`)
- Use `logBlogError()` / `logBlogWarning()` for structured logging
- Return empty arrays for missing directories (graceful degradation)

## Category System

- Programming languages: Devicon icons
- Non-programming: Emoji icons
- Add new categories to `categories.ts` config objects
