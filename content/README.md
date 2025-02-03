# Content Directory Structure

This directory contains all MDX content files for the site. Content is managed directly through the filesystem.

## Directory Structure

```
content/
├── pages/        # Static pages (about, contact, etc.)
├── posts/        # Blog posts and articles
└── global/       # Global content snippets and shared MDX components
```

## File Format

All content files should be in MDX format with frontmatter:

```mdx
---
title: Page Title
description: Page description
date: 2024-02-03    # For blog posts
---

# Content goes here

Your MDX content with components...
```

## Usage
1. Add new content by creating .mdx files in the appropriate directory
2. Use frontmatter for metadata
3. Write content using MDX syntax
4. Components from `components/` can be imported and used in MDX files
