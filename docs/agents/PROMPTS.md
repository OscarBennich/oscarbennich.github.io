# Agent Prompts Log

This file contains a chronological record of all prompts used to build this site.

---

## Prompt 1
**Date & Time:** 2025-10-26 20:03:47 UTC  
**Tool:** GitHub Copilot CLI  
**Model:** Claude Sonnet 4.5

**Prompt:**
```
I want you to help me create a personal site that I can host on Github pages. I'm work as a software engineer and I want the site to be place to show my skills (like a CV/portfolio) as well as write some thoughts and blogposts.

To start I want you to create a docs folder and inside it add an agents folder. Inside of that folder I want you to create a "PROMPTS.md" file where you will store all prompts I've used to build this site (including this one) in chronological order. Please include date and time as well as the tool (Github Copilot CLI) and the model being used.

After you've done that, let me know.
```

**Changes:**
- Created `docs/agents/` folder structure
- Created `docs/agents/PROMPTS.md` with initial prompt logged

---

## Prompt 2
**Date & Time:** 2025-10-26 20:12:36 UTC  
**Tool:** GitHub Copilot CLI  
**Model:** Claude Sonnet 4.5

**Prompt:**
```
Modify the instructions in AGENTS.md to only include prompts that lead to file changes. For example if I ask a question or ask to run a git command, this should not be included as an entry in prompts.md.
```

**Changes:**
- Modified `AGENTS.md` instructions to only log prompts with file changes
- Updated `PROMPTS.md` with this prompt entry

---

## Prompt 3
**Date & Time:** 2025-10-26 20:21:12 UTC  
**Tool:** GitHub Copilot CLI  
**Model:** Claude Sonnet 4.5

**Prompt:**
```
Okay, now I want you to make a plan for the site that I can review. Add it as a "SITE_PLAN.md" file under docs/agents.

As I said before, I want to host this as a static site using Github pages. I also want the tech stack to include React and Tailwind as I want to take the opporunity to learn and refresh my skills with these libraries.

I want you to start with the simplest possible design and focus on the tech. Break down the plan in multiple milestones and I want the first milestone to be that the site works and can be built and deployed using Github pages, but leave the rest (styling, content, design, animation, etc.) to later.
```

**Changes:**
- Created `docs/agents/SITE_PLAN.md` with 7 milestones and future enhancements

---

## Prompt 4
**Date & Time:** 2025-10-26 20:31:58 UTC  
**Tool:** GitHub Copilot CLI  
**Model:** Claude Sonnet 4.5

**Prompt:**
```
Okay, let's get started with milestone 1. Once that's done, stop and let me review and test.
```

**Changes:**
- Initialized React project with Vite
- Installed and configured Tailwind CSS v4 with `@tailwindcss/postcss`
- Created `tailwind.config.js` and `postcss.config.js`
- Modified `src/index.css` to include Tailwind directives
- Simplified `src/App.jsx` to a Hello World page with Tailwind classes
- Configured `vite.config.js` with base path for GitHub Pages
- Created `.github/workflows/deploy.yml` for automated deployment
- Updated `README.md` with project information
- Verified build works locally

---

## Prompt 5
**Date & Time:** 2025-10-26 20:53:24 UTC  
**Tool:** GitHub Copilot CLI  
**Model:** Claude Sonnet 4.5

**Prompt:**
```
Deploying the site using the deploy.yml file seems to have been successful but when going to the site it is just a blank white screen and there is this error in the dev console: "(index):1 Failed to load module script: Expected a JavaScript-or-Wasm module script but the server responded with a MIME type of "text/html". Strict MIME type checking is enforced for module scripts per HTML spec."
```

**Changes:**
- Modified `vite.config.js` base path from `/oscarbennich.github.io/` to `/` for correct GitHub Pages root domain deployment

---

## Prompt 6
**Date & Time:** 2025-10-26 20:57:48 UTC  
**Tool:** GitHub Copilot CLI  
**Model:** Claude Sonnet 4.5

**Prompt:**
```
I want you to modify the PROMPTS.md file and the instructions in AGENTS.md to include a brief summary of additions and modifications following each prompt.
```

**Changes:**
- Modified `AGENTS.md` format template to include **Changes** section
- Modified `AGENTS.md` instructions to require changes summary
- Updated all entries in `docs/agents/PROMPTS.md` with **Changes** sections

---

## Prompt 7
**Date & Time:** 2025-10-26 20:58:56 UTC  
**Tool:** GitHub Copilot CLI  
**Model:** Claude Sonnet 4.5

**Prompt:**
```
I'm getting this lineending issue in git: "warning: in the working copy of 'src/App.jsx', LF will be replaced by CRLF the next time Git touches it".

Please add a .gitattribute file to fix this.
```

**Changes:**
- Created `.gitattributes` to enforce LF line endings for text files across all platforms

---

## Prompt 8
**Date & Time:** 2025-10-30 21:27:34 UTC  
**Tool:** GitHub Copilot CLI  
**Model:** Claude Sonnet 4.5

**Prompt:**
```
Please implement milestone 2 from @docs\agents\SITE_PLAN.md
```

**Changes:**
- Created `src/components/` directory
- Created `src/pages/` directory
- Created `src/components/Hero.jsx` with basic hero section (name and title)
- Created `src/pages/Home.jsx` home page component
- Modified `src/App.jsx` to use the new Home page component
- Verified build succeeds

---
