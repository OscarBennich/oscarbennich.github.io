# Agent Instructions

## Tech Stack

- **React 19** with **TypeScript** (strict mode)
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **React Router** for routing
- **Markdown** with frontmatter (gray-matter) for blog posts

## Commands

| Command | Description |
|---|---|
| `npm run dev` | Start dev server (localhost:5173) |
| `npm run build` | Production build to `dist/` |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build |

## Deployment

Pushing to `main` triggers a GitHub Actions workflow that builds the project and deploys `dist/` to GitHub Pages.

## Workflow

1. **Wait for a prompt** — User provides instructions for changes
2. **Execute the task** — Make the necessary code/file changes
3. **Wait for review** — User tests and reviews the changes
4. **Iterate if needed** — If issues are found, fix them and repeat step 3
5. **Finalize** — When user says it's complete/perfect:
   - Commit the changes with an appropriate message
