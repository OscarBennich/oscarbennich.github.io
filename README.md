# Personal Site

A personal portfolio and blog site built with React and Tailwind CSS, hosted on GitHub Pages.

## TODO
- Blog fixes:
  - Add a table of contents to the side of the main content
  - Add ability to deeplink to specific sections (and automatically copy link when hovering section title)
  - Fix the layout on mobile
  - Change font etc. to make it easier to read?
- Add blog content
- Update footer to include where to find more information about how the site was built and move GitHub + LinkedIn links to "About" page instead (I think...?)
- Add page for projects
  - At that point, change side menu to a hamburger menu for mobile, as 3 links will be too many
- Idea: change the landing page to a terminal-like thing, add animation to write `whoami`, then print the information (could include much more than we have today), ending with the caret flashing animation we have today
  - Follow-up: Add some easter egg information? Allow the user to actually write some commands? Could add some fun interactivity to the site.
- Update README.md
- Update text under "whoami" on About page

## Tech Stack

- React
- Tailwind CSS
- Vite
- GitHub Pages

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

The site is automatically deployed to GitHub Pages when changes are pushed to the main branch via GitHub Actions.
