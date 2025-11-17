# Understanding the `public/` Folder in Vite

## What is the `public/` Folder?

The `public/` folder in a Vite project is for **static assets** that should be served as-is without processing by the build system.

## How It Works

- **Files in `public/` are copied directly** to the root of the build output (`dist/`)
- **No processing**: Files are NOT transformed, bundled, minified, or hashed
- **Root-level access**: Files are accessible at the root URL path

### Example:
```
public/favicon.svg       → dist/favicon.svg       → https://yoursite.com/favicon.svg
public/blog/post.md      → dist/blog/post.md      → https://yoursite.com/blog/post.md
public/CV.pdf            → dist/CV.pdf            → https://yoursite.com/CV.pdf
```

## What SHOULD Go in `public/`

### ✅ Files that should go in `public/`:

1. **Static documents** that users download or view directly:
   - PDFs (like CVs, resumes, documentation)
   - Text files, markdown files
   - Example: `CV_OscarBennichBjorkman_2025_en.pdf` ✅

2. **Files referenced by exact URL path**:
   - Blog posts in markdown format
   - Example: Blog markdown files accessed via `/blog/post-name.md` ✅

3. **Root-level special files**:
   - `robots.txt` (SEO)
   - `sitemap.xml` (SEO)
   - `manifest.json` (PWA)
   - `.well-known/` directory files

4. **Files that must have exact names**:
   - Favicon at exact path (`/favicon.ico`)
   - Files expected at specific URLs by third parties

### ❌ Files that should NOT go in `public/`:

1. **Images used in components**:
   - Should go in `src/assets/` instead
   - Vite will optimize, hash, and bundle them
   - Example: Component images, icons used in React

2. **JavaScript/TypeScript files**:
   - Should go in `src/` 
   - Need to be compiled/bundled

3. **CSS files used by components**:
   - Should be imported in your components
   - Vite will process and optimize them

4. **Any file you want optimized**:
   - Files that should be minified
   - Files that should have cache-busting hashes
   - Files that should be tree-shaken

## Our Current Setup

### ✅ Correctly placed:

- `public/favicon.svg` - Root favicon, needs exact path
- `public/CV_OscarBennichBjorkman_2025_en.pdf` - Direct download link, correct! ✅
- `public/blog/*.md` - Markdown files fetched dynamically, correct! ✅

### Why These Are Correct:

1. **CV PDF**: 
   - Users download it directly via `<a href="/CV_OscarBennichBjorkman_2025_en.pdf">`
   - No processing needed
   - Should stay as-is

2. **Blog Markdown Files**:
   - Fetched dynamically via `fetch('/blog/post-name.md')`
   - Need to be at a predictable URL path
   - Should not be bundled into JavaScript
   - Content should be separate from code

## Alternative: Assets Folder

If we wanted to **import** files into components (processed by Vite), we'd use:

```
src/assets/logo.png       → Imported in components
src/assets/images/hero.jpg → Processed and optimized
```

## Summary

**Your current setup is correct!** ✅

- CV PDF in `public/` - Correct (direct download)
- Blog markdown in `public/blog/` - Correct (fetched dynamically)
- Favicon in `public/` - Correct (exact path needed)

The `public/` folder is perfect for files that:
- Users access directly by URL
- Don't need processing/optimization
- Should have predictable paths
- Are fetched dynamically (like markdown content)
