# Repository Guidelines

A concise guide for contributing to the Electric JSON Canvas demo. Keep changes small, typed, and lint‑clean.

## Project Structure & Module Organization

- src/: application code
  - routes/: TanStack Router routes (e.g., `src/routes/index.tsx`)
  - components/: UI components (e.g., `src/components/UserError.tsx`)
  - api/: Hono API server (entry: `src/api/node-main.ts`)
  - domain/: contracts and clients (`domain/contract/*`, `domain/client/*`)
  - utils/: shared helpers (e.g., `src/utils/type-assert.ts`)
  - config: `src/config.ts`
- db/: migrations (`db/migrations/*`), schema (`db/schema.sql`) via dbmate
- Tooling: `vite.config.ts`, `tsconfig.json`, `eslint.config.js`, `postcss.config.cjs`

## Build, Test, and Development Commands

- pnpm dev: run the app at http://localhost:3000
- pnpm dev:api: start API server with `tsx` (uses `.env` if present)
- pnpm build: production build + TypeScript checks (`vite build && tsc --noEmit`)
- pnpm lint | pnpm lint-fix: lint and auto‑fix with ESLint
- pnpm check-types: strict type checks (via `tsgo`)
- pnpm dbmate:new | pnpm dbmate:up: create/apply DB migrations
  Tip: run `pnpm dev` and `pnpm dev:api` in separate terminals during local development.

## Coding Style & Naming Conventions

- TypeScript strict; path alias `@/*` (see `tsconfig.json`)
- ESLint (Antfu config); stylistic: double quotes, no semicolons
- Components: PascalCase (`UserError.tsx`); routes/components: `.tsx`
- Utilities/modules: kebab‑case or camelCase (`type-assert.ts`, `node-main.ts`)
- Generated files `*.gen.ts` are ignored by lint—do not edit manually.

## Testing Guidelines

- No formal test suite yet. Prefer small, testable functions.
- Place future tests under `tests/` (e.g., `tests/unit/*.test.ts`).
- Use `pnpm lint` and `pnpm check-types` as a pre‑merge quality gate.

## Commit & Pull Request Guidelines

- Commits: imperative, concise subject (e.g., "Add todos API route").
- PRs: describe intent, link issues, include screenshots for UI changes.
- Include migration notes when touching `db/migrations/`.
- Ensure `pnpm build`, `pnpm lint`, and local app/API run clean before requesting review.

## Security & Configuration Tips

- Store secrets in `.env` (not committed). Typical needs: database URL for API/migrations.
- Review changes under `src/api/` for security and validation; prefer narrow, typed inputs.
