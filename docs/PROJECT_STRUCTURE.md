# Project Structure Explanation

This document explains the file and folder structure of this project and why it's organized this way.

## Root Directory Overview

```
oscarbennich.github.io/
├── .git/                    # Git version control data
├── .github/                 # GitHub Actions workflows
├── .gitattributes           # Git line ending configuration
├── .gitignore              # Tells Git what files to ignore
├── AGENTS.md               # Custom agent instructions
├── LICENSE                 # Project license
├── README.md               # Project documentation
├── dist/                   # Build output (deployed to GitHub Pages)
├── docs/                   # Documentation folder
├── eslint.config.mjs       # ESLint configuration
├── index.html              # Entry HTML file
├── node_modules/           # Installed npm packages (not in Git)
├── package-lock.json       # Locked dependency versions
├── package.json            # Project dependencies and scripts
├── postcss.config.ts       # PostCSS configuration
├── public/                 # Static assets (copied as-is)
├── src/                    # Application source code
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite build tool configuration
```

---

## Why So Many Config Files?

This is **completely standard** for modern JavaScript/TypeScript projects. Here's why:

### The Modern JavaScript Ecosystem Philosophy

Modern web development uses **specialized, composable tools** rather than all-in-one solutions:

```
┌─────────────────────────────────────┐
│ Your Project                        │
├─────────────────────────────────────┤
│ TypeScript    → tsconfig.json       │
│ Vite          → vite.config.ts      │
│ ESLint        → eslint.config.mjs   │
│ Tailwind      → tailwind.config.ts  │
│ PostCSS       → postcss.config.ts   │
│ npm           → package.json        │
└─────────────────────────────────────┘
```

**Advantages:**
- ✅ Each tool is independent and can be swapped out
- ✅ Easier to share configurations across projects
- ✅ Community can create specialized tools for specific problems
- ✅ You have full control over each tool's behavior

**Tradeoffs:**
- ❌ More files in your root directory
- ❌ Need to understand what each tool does
- ❌ More initial setup (though tooling helps)

---

## File-by-File Breakdown

### Core Project Files (Required)

#### **`package.json`**
- Defines project metadata (name, version)
- Lists all dependencies (React, Vite, TypeScript, etc.)
- Defines npm scripts (`dev`, `build`, `lint`)
- **Think of it as:** The project's blueprint and dependency manifest

#### **`package-lock.json`**
- Locks exact versions of all dependencies (including transitive ones)
- Ensures everyone gets the exact same versions
- Auto-generated and auto-updated by npm
- **Think of it as:** A detailed inventory of exact package versions

#### **`tsconfig.json`**
- Configures TypeScript compiler behavior
- Sets strictness levels, target JavaScript version
- Defines which files to include/exclude
- **Think of it as:** TypeScript's rulebook

#### **`index.html`**
- Entry point HTML file
- References your main TypeScript file (`src/main.tsx`)
- Vite injects scripts and styles during build
- **Think of it as:** The HTML shell for your single-page app

---

### Tool Configuration Files

#### **`vite.config.ts`**
- Configures Vite (build tool + dev server)
- Defines plugins (like React support)
- Sets build options and dev server settings
- **Purpose:** Controls how your app is built and served

#### **`eslint.config.mjs`**
- Configures ESLint (code quality checker)
- Defines coding standards and rules
- Integrates TypeScript and React rules
- **Purpose:** Enforces code quality and catches bugs

#### **`tailwind.config.ts`**
- Configures Tailwind CSS (utility-first CSS framework)
- Defines which files to scan for classes
- Customizes theme (colors, fonts, etc.)
- **Purpose:** Customizes your CSS utility framework

#### **`postcss.config.ts`**
- Configures PostCSS (CSS processor)
- Integrates Tailwind and Autoprefixer
- **Purpose:** Processes and optimizes your CSS

---

### Source Code Directories

#### **`src/`**
Your application source code:
```
src/
├── App.tsx                 # Root React component
├── main.tsx                # Application entry point
├── index.css               # Global styles
├── vite-env.d.ts          # TypeScript declarations
├── components/            # Reusable React components
│   ├── AnimatedBackground.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── Hero.tsx
│   └── Layout.tsx
├── pages/                 # Page components
│   ├── Home.tsx
│   ├── About.tsx
│   └── Blog.tsx
└── assets/                # Images, icons, etc.
```

#### **`public/`**
Static files copied as-is to build output:
- PDFs, images, favicons
- Files here are NOT processed by Vite
- Accessible at root URL (e.g., `/CV_file.pdf`)

---

### Build Output & Dependencies

#### **`dist/`**
- Generated by `npm run build`
- Contains optimized, production-ready files
- This folder is deployed to GitHub Pages
- **Not committed to Git** (recreated on each build)

#### **`node_modules/`**
- Contains all installed npm packages
- Generated by `npm install`
- **Not committed to Git** (too large, regenerated from package.json)
- Can be deleted and recreated anytime

---

### Git & GitHub

#### **`.git/`**
- Git version control database
- Stores all commits, branches, history
- **Never manually edit this folder**

#### **`.github/`**
- GitHub-specific configuration
- Contains GitHub Actions workflows (`.github/workflows/deploy.yml`)
- **Purpose:** Automates deployment to GitHub Pages

#### **`.gitignore`**
- Lists files/folders Git should ignore
- Examples: `node_modules/`, `dist/`, `.env`
- **Purpose:** Keeps build artifacts and secrets out of Git

#### **`.gitattributes`**
- Configures Git behavior for specific files
- Handles line endings (LF vs CRLF)
- **Purpose:** Ensures consistent behavior across different operating systems

---

### Documentation

#### **`docs/`**
Project documentation:
```
docs/
├── agents/
│   ├── PROMPTS.md           # AI agent prompt history
│   └── SITE_PLAN.md         # Site development plan
├── LINTING_AND_TYPE_CHECKING.md  # Tool explanations
└── VITE_EXPLAINED.md        # Vite documentation
```

#### **`README.md`**
- Project overview and setup instructions
- First thing people see on GitHub
- Standard for all open-source projects

#### **`AGENTS.md`**
- Custom instructions for AI coding assistants
- Defines prompt logging format
- Specific to this project's workflow

#### **`LICENSE`**
- Legal license for the project
- Defines how others can use your code

---

## Comparison with Other Frameworks

### This Project (Vite + React)
```
✓ 5 config files (vite, eslint, tailwind, postcss, tsconfig)
✓ Minimal, fast, flexible
✓ Full control over tooling
```

### Create React App (Legacy)
```
✓ Hidden configs (ejecting reveals 10+ files)
✗ Slow build times
✗ Less control without ejecting
```

### Next.js (Alternative)
```
✓ 4-5 config files (next, tailwind, postcss, tsconfig)
✓ More opinionated (routing, SSR built-in)
✗ Heavier, more complex
```

### Vue + Vite
```
✓ Similar structure to this project
✓ 4-5 config files
✓ Same philosophy: composable tools
```

---

## Is This Normal? YES!

**Your project is actually on the LEAN side.** Many projects have additional configs:

- `.prettierrc` - Code formatter (Prettier)
- `.nvmrc` - Node version specification
- `jest.config.js` - Testing framework
- `.editorconfig` - Editor settings
- `vitest.config.ts` - Test runner
- `playwright.config.ts` - E2E testing
- `docker-compose.yml` - Docker setup
- `.env` - Environment variables

---

## Could This Be Simplified?

### Option 1: Monorepo Tools
Tools like Turborepo or Nx can manage configs centrally, but they add complexity and are overkill for a single site.

### Option 2: All-in-One Frameworks
Frameworks like Next.js or Remix hide some complexity but are more opinionated and you still have ~4-5 config files.

### Option 3: Move Configs to `/config`
You could create a `/config` folder, but:
- ❌ Non-standard (confuses tools and developers)
- ❌ Many tools expect configs in root
- ❌ More hassle than it's worth

### Option 4: Accept It
**This is what 99% of developers do.** The ecosystem values flexibility and composability over having fewer files.

---

## The Tradeoff

**More config files** = More flexibility, easier to customize each tool  
**Fewer config files** = Less control, more opinionated frameworks

The JavaScript/TypeScript ecosystem chose flexibility. You have the power to:
- Swap out any tool (replace Vite with Webpack, ESLint with Biome, etc.)
- Share configs across projects
- Use best-in-class tools for each job

---

## Bottom Line

This structure is:
- ✅ **Standard** for modern React + TypeScript projects
- ✅ **Expected** by the community and tooling
- ✅ **Flexible** and allows customization
- ✅ **Maintainable** because each tool has clear responsibilities

Think of it like a professional kitchen - you have separate tools for different tasks (knives, pans, ovens) rather than one appliance that does everything poorly.

---

## Quick Reference

**When you're confused about a file, ask:**
1. Is it a config file? → Configures a specific tool
2. Is it in `.gitignore`? → Generated file, can be deleted and recreated
3. Is it documentation? → Safe to read/modify
4. Is it source code? → Part of your application

**Files you'll edit most:**
- `src/**` - Your application code
- `docs/**` - Your documentation
- `package.json` - When adding new dependencies

**Files you'll rarely touch:**
- Config files (unless changing tool behavior)
- `package-lock.json` (auto-managed by npm)
- `.github/**` (unless changing CI/CD)

**Files you should never manually edit:**
- `node_modules/**` (managed by npm)
- `dist/**` (generated by build)
- `.git/**` (managed by Git)
