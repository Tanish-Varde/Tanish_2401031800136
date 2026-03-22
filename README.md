# RecipeAI

RecipeAI is a modern React app that helps users discover and generate recipes from available ingredients.
It combines a curated recipe library with an AI-like streaming generator experience, plus favorites and history tracking.

## Highlights

- AI-style recipe generation from ingredient input.
- Progressive streaming UI for generated recipe sections.
- Search and filter across a curated recipe collection.
- Favorites and generation history saved in browser localStorage.
- Responsive, animated interface built with Tailwind CSS and shadcn/ui components.

## Tech Stack

- React 18 + TypeScript
- Vite 5
- Tailwind CSS + shadcn/ui + Radix UI
- React Router
- TanStack Query
- Framer Motion
- Vitest + Testing Library
- Playwright (config scaffold present)

## Project Structure

```text
src/
	components/      Reusable UI and feature components
	data/            Static recipe dataset and Recipe type
	hooks/           Shared React hooks
	lib/             Utility and AI mock generation logic
	pages/           Route-level pages
	test/            Vitest setup and sample tests
```

## Routes

- /: Home page with hero, search, featured recipes, and AI generator
- /explore: Browse all recipes with search and filters
- /favorites: Saved recipes (localStorage-backed)
- /history: Previously generated recipes (localStorage-backed)
- /about: Product mission and feature overview
- /login: Demo login form
- /signup: Demo registration form

## Local Data Persistence

RecipeAI stores data in browser localStorage:

- recipeai-favorites: favorited recipes
- recipeai-history: last generated recipes (up to 20)

Note: There is no backend in this version. Login and signup flows are demo-only and show toast feedback.

## AI Generator Behavior

The generator currently uses mock AI logic in src/lib/ai-mock.ts:

- Builds recipes from template variations.
- Applies user inputs (ingredients, diet, cuisine).
- Streams sections (title, ingredients, steps, completion metadata) to create an AI-like experience.

This makes local development fast and deterministic while preserving an architecture that can be swapped with a real AI service later.

## Getting Started

### Prerequisites

- Node.js 18+ (or Bun runtime)
- Package manager: npm, pnpm, yarn, or bun

### Installation

```bash
# clone and enter project
git clone https://github.com/Tanish-Varde/RecipeAI.git
cd RecipeAI/code

# install dependencies
npm install
```

If you prefer Bun:

```bash
bun install
```

### Run Development Server

```bash
npm run dev
```

Open the local URL printed by Vite (usually http://localhost:5173).

## Available Scripts

- npm run dev: Start Vite dev server
- npm run build: Production build
- npm run build:dev: Development-mode build
- npm run preview: Preview built app locally
- npm run lint: Run ESLint
- npm run test: Run Vitest once
- npm run test:watch: Run Vitest in watch mode

## Testing

Unit test tooling is configured with Vitest and jsdom.

```bash
npm run test
```

Playwright configuration and fixture files exist for browser testing setup, ready for adding end-to-end specs.

## Deployment

Build the app:

```bash
npm run build
```

The production output is generated in the dist folder and can be deployed to any static hosting platform.

## Future Improvements

- Replace mock generator with a real LLM/API integration
- Add real authentication and user accounts
- Sync favorites/history to cloud storage
- Expand test coverage (unit + end-to-end)

## License

No license file is currently included. Add a LICENSE file if you want to define usage terms.
