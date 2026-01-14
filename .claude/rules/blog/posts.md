---
paths: content/posts/**/*.md
---

# Blog Post Rules

## File Structure

`content/posts/[category]/[slug].md`

- Category = folder name
- Slug = filename without .md

## Required Frontmatter

```yaml
---
title: "Article Title"
date: "YYYY-MM-DD"
excerpt: "Brief description"
---
```

## Content

- GFM (GitHub Flavored Markdown)
- Code blocks with language identifier for syntax highlighting
- Headings auto-generate Table of Contents
