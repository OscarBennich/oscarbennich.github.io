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

---

## Prompt 2
**Date & Time:** 2025-10-26 20:12:36 UTC  
**Tool:** GitHub Copilot CLI  
**Model:** Claude Sonnet 4.5

**Prompt:**
```
Modify the instructions in AGENTS.md to only include prompts that lead to file changes. For example if I ask a question or ask to run a git command, this should not be included as an entry in prompts.md.
```

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

---

## Prompt 4
**Date & Time:** 2025-10-26 20:31:58 UTC  
**Tool:** GitHub Copilot CLI  
**Model:** Claude Sonnet 4.5

**Prompt:**
```
Okay, let's get started with milestone 1. Once that's done, stop and let me review and test.
```

---

## Prompt 5
**Date & Time:** 2025-10-26 20:53:24 UTC  
**Tool:** GitHub Copilot CLI  
**Model:** Claude Sonnet 4.5

**Prompt:**
```
Deploying the site using the deploy.yml file seems to have been successful but when going to the site it is just a blank white screen and there is this error in the dev console: "(index):1 Failed to load module script: Expected a JavaScript-or-Wasm module script but the server responded with a MIME type of "text/html". Strict MIME type checking is enforced for module scripts per HTML spec."
```

---
