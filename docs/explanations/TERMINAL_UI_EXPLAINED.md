# Understanding the Terminal UI on the Home Page

## Overview

The home page features an interactive terminal emulator that serves as the primary UI. Instead of a traditional hero section, visitors are greeted with a macOS-style terminal window that auto-types a command, reveals introductory text, and then becomes fully interactive — letting users type real commands to explore the site.

## Components

The terminal UI is built from four source files:

| File | Purpose |
|---|---|
| `src/components/Hero.tsx` | Main component — renders the terminal window, manages animation phases, handles user input |
| `src/utils/terminalCommands.ts` | Pure logic — maps command strings to output lines and special effects |
| `src/components/MatrixRain.tsx` | Canvas-based "Matrix digital rain" visual effect |
| `src/components/Confetti.tsx` | CSS-animated falling confetti pieces |

The home page (`src/pages/Home.tsx`) simply renders `<Hero />` with no additional content.

## The Animation State Machine

The opening animation is driven by a **phase-based state machine** with five sequential phases. Each phase is implemented as a separate `useEffect` hook that watches the `phase` state variable.

```
waiting  →  typing  →  pausing  →  output  →  interactive
 1000ms     80ms/char    500ms     300ms/line    (user input)
```

### Phase Details

1. **Waiting** (`1000ms`): The terminal shows the green prompt (`guest@oscarbennich.github.io:~$`) with a blinking block cursor. Nothing else happens — this gives the user a moment to notice the terminal before the animation begins.

2. **Typing** (`80ms` per character): The command `cat about.txt` is revealed one character at a time. This is achieved by maintaining a `typedChars` counter and rendering `COMMAND.slice(0, typedChars)`. Each tick increments the counter by one. Once `typedChars >= COMMAND.length`, the phase advances.

3. **Pausing** (`500ms`): A brief pause after the command is fully typed — mimicking the natural delay before pressing Enter.

4. **Output** (`300ms` per line): The intro output lines appear one at a time:
   - *"Hi! 👋 I'm Oscar Bennich-Björkman."*
   - *"Tech Lead / Full-Stack Developer @ Viedoc in Uppsala, Sweden."*

   A `visibleLines` counter controls how many lines from `INTRO_OUTPUT` are rendered. Once all lines are visible, the phase advances.

5. **Interactive**: The user can now type commands. A hidden `<input>` element captures keystrokes, while the visible text is rendered as styled `<span>` elements to maintain the terminal aesthetic.

## Interactive Command System

### Input Handling

The interactive input uses a clever layered approach:
- A **visible layer** renders the green prompt, the typed text, and a blinking cursor — all styled `<span>` elements.
- A **hidden `<input>`** sits on top with `opacity: 0`, capturing all keyboard events.
- Clicking anywhere on the terminal body focuses the hidden input (via `onClick={focusInput}`).

Arrow up/down keys navigate through **command history**, just like a real terminal.

### Available Commands

Commands are processed in `terminalCommands.ts` via the `executeCommand()` function, which returns a `CommandResult` containing output lines and an optional special effect.

| Command | Description |
|---|---|
| `help` | Lists all available commands with descriptions |
| `skills` | Displays tech stack (C#, ASP.NET, React, TypeScript, Azure, etc.) |
| `posts` | Lists blog posts as clickable links (sorted newest first) |
| `contact` | Shows GitHub, LinkedIn, and email links |
| `cv` | Link to download/view CV PDF |
| `date` | Prints the current date and time |
| `history` | Shows previously entered commands |
| `cowsay [msg]` | Renders an ASCII cow saying the given message (defaults to "moo") |
| `matrix` | Triggers the Matrix rain effect |
| `party` | Triggers the confetti effect |
| `exit` | Fades out the terminal (1s opacity transition) |
| `clear` | Clears all command history from the screen |
| `sudo rm -rf /` | Easter egg — shows "Permission denied" with a glitch effect |

### Output Rendering

Each command returns an array of `TerminalLine` objects:

```ts
interface TerminalLine {
  text: string        // The text content
  className?: string  // Tailwind classes for styling
  isLink?: boolean    // Whether to render as an <a> tag
  href?: string       // Link destination
}
```

Lines can be plain text (rendered as `<span>`) or links (rendered as `<a>` with hover underline). Internal links (starting with `/#/`) open in the same tab; external links open in a new tab.

## Special Effects

Three visual effects can be triggered by commands:

### Matrix Rain (`MatrixRain.tsx`)
- Uses a `<canvas>` element that covers the full viewport.
- Draws columns of random katakana characters and digits in green (`#0F0`) on a semi-transparent black background.
- Each column has an independent drop position that resets randomly when it reaches the bottom.
- Runs at ~30fps (`setInterval` at 33ms) for 5 seconds.

### Confetti (`Confetti.tsx`)
- Renders 50 absolutely-positioned `<div>` elements with randomized properties (color, size, position, delay, duration).
- Uses the `animate-confetti` CSS animation to make each piece fall from top to bottom while rotating 720°.
- Colors are drawn from a palette of 10 Material Design colors.
- Each piece is randomly a circle or square. Runs for 4 seconds.

### Glitch (`index.css`)
- A full-screen overlay `<div>` with the `.animate-glitch` class.
- The CSS animation rapidly flashes red/green/blue tinted backgrounds with slight positional shifts.
- Plays 3 times over 0.3s each (0.9s total). Triggered only by the `sudo rm -rf /` easter egg.

## CSS Animations

All custom animations are defined in `src/index.css`:

```css
/* Blinking block cursor (█) */
.caret {
  animation: blink 1s step-end infinite;
}

/* RGB color-shift glitch */
.animate-glitch {
  animation: glitch 0.3s ease-in-out 3;
}

/* Confetti falling with rotation */
.animate-confetti {
  animation: confetti-fall linear forwards;
}
```

## Terminal Styling

The terminal is styled to resemble a macOS terminal window:

- **Title bar**: Dark gray (`bg-gray-800`) with three colored dots (red, yellow, green) and centered title text.
- **Body**: Near-black background (`bg-gray-950`) with monospace font. Responsive padding (`p-6` → `p-8` → `p-10`) and font size (`text-base` → `text-lg` → `text-xl`).
- **Prompt**: Green text (`text-green-400`) — `guest@oscarbennich.github.io:~$`.
- **User input**: Light gray (`text-gray-100`).
- **Output**: Medium gray (`text-gray-300`) for normal text, `text-gray-400` for help descriptions, `text-blue-400` for links, `text-red-400` for errors.
- **Scrolling**: Max height of `60vh` with `overflow-y-auto`. Auto-scrolls to bottom on new output.
- **Exit animation**: 1-second opacity transition from 100% to 0%.

## Data Flow Summary

```
User types → hidden <input> captures keystrokes
           → Enter pressed
           → handleCommand() called
           → executeCommand() returns { output, specialEffect }
           → output appended to history state
           → history.map() renders all past commands + output
           → specialEffect triggers Matrix/Confetti/Glitch/Exit
```
