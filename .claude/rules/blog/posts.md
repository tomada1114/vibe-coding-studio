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
title: "Article Title"       # Required
date: "YYYY-MM-DD"           # Required
excerpt: "Brief description" # Optional, defaults to empty string
---
```

## Content

- GFM (GitHub Flavored Markdown)
- Code blocks with language identifier for syntax highlighting
- Headings auto-generate Table of Contents
