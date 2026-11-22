# PocketPlan Repository Guide

## Project overview and domain rules

PocketPlan is a personal finance planner for a single user. The application currently uses mock data and is planned to use a Node.js REST API with PostgreSQL.

- PLN is the application's only currency.
- Represent monetary amounts as integer grosze: for example, `12550` means `125.50 PLN`.
- Never use floating-point arithmetic for financial calculations.
- Use fictional data in public demos. Never commit real financial data, credentials, tokens, or secrets.

## Language

- Write all code, identifiers, code comments, and technical documentation in English.
- User-facing product text should follow the language specified for the feature.

## Angular development

- The frontend is an Angular 22 application using standalone APIs. Work in `frontend/pocketplan` and follow the existing Angular CLI structure and SCSS styling.
- Prefer lazy loading for feature routes.
- Use `ChangeDetectionStrategy.OnPush` where appropriate.
- Prefer modern template control flow (`@if`, `@for`, and `@switch`); include `track` in `@for` loops.
- Prefer modern APIs such as `input()` and `output()` where appropriate.
- Keep components focused on presentation and user interaction. Keep business logic outside components.
- Avoid unnecessary lifecycle hooks and manual subscriptions.

## Signals and RxJS

- Use signals for local synchronous state and derived values. Use `computed()` for derived state.
- Use RxJS for asynchronous streams, HTTP requests, search, debouncing, cancellation, and combining asynchronous sources.
- Use `effect()` only for side effects, not general state synchronization.
- Do not introduce NgRx or another state management library without discussing and agreeing on the need.

## TypeScript

- Follow strict type checking. Recommend TypeScript strict mode and Angular `strictTemplates`; do not change configuration as part of unrelated work.
- Avoid `any`; prefer explicit types, generics, and `unknown` where appropriate.
- Avoid unnecessary type assertions.
- Prefer `readonly` where mutation is not intended.

## Frontend architecture

Organize application code by feature. The intended structure is:

```text
src/app/
  core/
  shared/
  features/
    dashboard/
    transactions/
    budgets/
    categories/
    savings-goals/
```

This is a guideline, not a requirement to create all directories immediately. Put app-wide services and infrastructure in `core/`, reusable UI and utilities in `shared/`, and feature-specific screens and logic in `features/`. Keep responsibilities clear and prefer straightforward Angular and TypeScript patterns. Do not impose Clean Architecture, Domain-Driven Design, or unnecessary abstraction layers.

## Data access

- Components must not depend directly on mock data or a specific backend implementation.
- Use a dedicated data-access layer. Keep API communication separate from presentation and business logic.
- The mock and future HTTP implementations should expose compatible interfaces or contracts.
- Avoid coupling components to API response formats.

## Styling and accessibility

- Use SCSS and prefer reusable design tokens for colors, spacing, and typography.
- Keep styles scoped to components unless they are genuinely global.
- Use semantic HTML and accessible interactions. Support keyboard navigation and visible focus states.
- Do not introduce a UI component library without approval.

## Testing

- Use Vitest for unit tests. Do not introduce Jasmine or Karma.
- Prioritize tests for business logic, financial calculations, data transformations, services, and important component behavior.
- Tests must be deterministic and must not depend on real financial data.
- The frontend test command is `npm test` (or `ng test`) from `frontend/pocketplan`.

## Backend guidelines

- The planned backend is Node.js with TypeScript, and PostgreSQL is the planned database.
- The backend framework and architecture have not been finalized. Discuss framework, API contracts, database access, and ORM choices before implementation.
- Validate incoming request data.
- Keep business logic separate from HTTP handlers and handle errors consistently.
- Do not expose secrets or sensitive information.

## Dependencies and project changes

- Prefer existing dependencies and tooling. Preserve project configuration unless the task requires a change.
- Keep changes small, focused on the requested behavior, and avoid unrelated refactors.
- Do not change project configuration unless the task requires and authorizes it.

## AI agent working rules

- Act as a senior engineering partner, not an autonomous project architect.
- Inspect relevant files before making changes and explain significant technical trade-offs.
- Ask for approval before introducing dependencies or changing architecture or configuration.
- Make small, focused changes. Do not modify unrelated files or overwrite user changes.
- Never commit or push unless explicitly requested.
- Do not claim tests pass unless they were actually executed.
- After implementation, summarize changed files, decisions, tests, and potential risks.

## Useful frontend commands

Run these from `frontend/pocketplan`:

```bash
npm start
npm run build
npm test
```
