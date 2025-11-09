# Linting and Type Checking in This Project

This document explains how linting and type checking work together in this project.

## Overview of Tools

### 1. TypeScript (`typescript`)

**What it does:** Type checking and compilation

- Checks your code for type errors (e.g., passing a string where a number is expected)
- Ensures type safety across your entire codebase
- In your project, it runs via `tsc --noEmit` (type-check without generating output files)
- Vite handles the actual compilation to JavaScript at build time

**Example:**
```typescript
function greet(name: string): string {
  return `Hello ${name}`;
}
greet(123); // ❌ TypeScript error: number is not assignable to string
```

### 2. ESLint (`eslint`)

**What it does:** Code quality and style checking

- Finds problematic patterns in your code (bugs, bad practices, style issues)
- Enforces coding standards and conventions
- **Does NOT check types** - that's TypeScript's job
- Runs via `npm run lint` (which executes `eslint .`)

**Example of what ESLint catches:**
```javascript
// Unused variable
const x = 5; // ⚠️ ESLint warning: 'x' is assigned but never used

// Missing dependency in useEffect
useEffect(() => {
  console.log(userId);
}, []); // ⚠️ ESLint warning: 'userId' should be in dependency array
```

### 3. typescript-eslint (`typescript-eslint`)

**What it does:** Bridges ESLint and TypeScript

- Allows ESLint to understand TypeScript syntax
- Provides TypeScript-specific linting rules
- **This is the glue** that makes ESLint work with TypeScript files

**Without typescript-eslint:** ESLint would crash on TypeScript syntax like interfaces, type annotations, etc.

**With typescript-eslint:** ESLint can parse and lint `.ts` and `.tsx` files

---

## How They Work Together in Your Project

Here's your `eslint.config.mjs`:

```javascript
import tseslint from 'typescript-eslint'  // ← The bridge

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,           // ← Basic JavaScript rules
      ...tseslint.configs.recommended    // ← TypeScript-specific rules
    ],
    files: ['**/*.{ts,tsx}'],          // ← Only lint TS files
    // ... React plugin rules
  },
)
```

---

## When Each Tool Runs

| Command | What Runs | What It Checks |
|---------|-----------|----------------|
| `npm run lint` | ESLint (with typescript-eslint) | Code style, patterns, React rules |
| `tsc --noEmit` | TypeScript compiler | Type correctness |
| `npm run build` | Vite (uses esbuild/tsc) | Compilation + type checking |
| `npm run dev` | Vite dev server | Fast compilation (skips some checks) |

---

## Key Differences

### ESLint catches:
- Unused variables
- Console.log statements left in code
- Missing React dependencies in hooks
- Complexity issues
- Style violations

### TypeScript catches:
- Type mismatches
- Missing properties
- Wrong function arguments
- Undefined variables/properties
- Interface violations

### They overlap on:
- Some can be caught by both (e.g., unused variables)
- typescript-eslint adds rules that use type information for deeper checks

---

## Why You Need Both

**Scenario 1:** Type-safe but bad code
```typescript
function calculate(a: number, b: number): number {
  const unused = 123;  // ✅ TypeScript: OK (types are fine)
                      // ❌ ESLint: "unused variable"
  return a + b;
}
```

**Scenario 2:** Good style but type-unsafe
```typescript
function greet(name) {  // ✅ ESLint: OK (no style issues)
                        // ❌ TypeScript: "implicit any"
  return `Hello ${name}`;
}
```

---

## In Your Workflow

1. **During development:** Vite gives you fast feedback
2. **Before committing:** Run `npm run lint` to check code quality
3. **Type safety:** Run `tsc --noEmit` to verify types
4. **Before deploying:** `npm run build` does everything

---

## Quick Analogy

Think of it like writing an essay:

- **TypeScript** = Grammar checker (ensures sentences are structurally correct)
- **ESLint** = Style guide enforcer (ensures you follow MLA/APA format, don't repeat yourself, etc.)
- **typescript-eslint** = The translator that lets the style guide understand technical grammar

You need both because correct grammar doesn't guarantee good style, and good style doesn't guarantee correct grammar!
