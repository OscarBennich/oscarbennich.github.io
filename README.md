# oscarbennich.github.io

A site I made for myself to host my CV, random posts, and some general info about me. Built with React, TypeScript, Vite, and Tailwind CSS. Hosted on GitHub Pages.

## Why

I wanted a personal site where I can share my resume and write posts about things I'm learning and thinking about. It also serves as a playground — a project I can use to try out new things outside of work, especially on the frontend side, and learn by doing.

## How it was built

This site was built almost entirely using agentic coding with [GitHub Copilot CLI](https://githubnext.com/projects/copilot-cli). Every prompt used to build and iterate on the site is logged in [`docs/agents/PROMPTS.md`](docs/agents/PROMPTS.md). That file serves as a complete history of the instructions given to the agent and the resulting changes — a transparent look at what agentic coding looks like in practice.

## Running the site locally

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- npm (comes with Node.js)

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Deploying the site

The site is automatically deployed to GitHub Pages when changes are pushed to the main branch via GitHub Actions. See [deploy.yml](/.github/workflows/deploy.yml).
