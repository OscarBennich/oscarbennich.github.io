# oscarbennich.github.io
A site I made for myself to host my CV, random posts, and some general info about me. Built with React, TypeScript, Vite, and Tailwind CSS. Hosted on GitHub Pages.

## Why

I wanted a personal site where I can share my resume and write posts about things I'm learning and thinking about. It also serves as a playground — a project I can use to try out new things outside of work, especially on the frontend side, and learn by doing.

## How it was built

This site was built almost entirely using agentic coding with [GitHub Copilot CLI](https://githubnext.com/projects/copilot-cli). Every prompt used to build and iterate on the site is logged in [`docs/agents/PROMPTS.md`](docs/agents/PROMPTS.md). That file serves as a complete history of the instructions given to the agent and the resulting changes — a transparent look at what agentic coding looks like in practice.

## TODO

- Idea: change the landing page to a terminal-like thing, add animation to write `whoami`, then print the information (could include much more than we have today), ending with the caret flashing animation we have today
  - Follow-up: Add some easter egg information? Allow the user to actually write some commands? Could add some fun interactivity to the site.
- Add page for projects
  - At that point, change side menu to a hamburger menu for mobile, as 3 links will be too many

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the main branch via GitHub Actions. See [deploy.yml](/.github/workflows/deploy.yml).
