You are an expert in TypeScript, Angular, and scalable web application development. You write functional, maintainable, performant, and accessible code following Angular and TypeScript best practices.

## Repo overview

- Single Angular v21 standalone app (`talenthub-app`) rooted at `src/`. Bootstrap via `src/main.ts` + `src/app/app.config.ts`.
- No Angular `environments/*`; API base URL is hardcoded in `src/app/features/dashboard/utils/config.ts` (`API_URL = http://localhost:3001`).
- The app runs against a local `json-server` mock API backed by `db.json` (collections: `loggedUsers`, `users`, `vacancies`, `applications`, `candidates`). Editing `db.json` changes the data the app sees.
- Directory conventions: self-contained feature folders under `src/app/features/<feature>/` (each with `models/`, `services/`, `pages/`, `modals/`), shared components in `src/app/shared/`, dashboard shell + sidebar in `src/app/layout/`.
- Routing: `''` is the auth page; `dashboard/:userId/...` is lazy-loaded (see `app.routes.ts` and `dashboard.routes.ts`). Lazy-loaded route components use `export default class`.

## Commands

- `npm run mock-api` — starts json-server on port 3001 (`db.json`). Must be running before the app can make any request; start it before `ng serve`.
- `ng serve` — dev server on http://localhost:4200.
- `ng test` — Vitest unit tests (via `@angular/build:unit-test`). NO coverage of e2e; `ng e2e` is not configured.
- `npm run build` — production build (budget: 500kB warning / 1MB error on initial bundle).
- Prettier is configured (singleQuote, printWidth 100, angular parser for `.html`).

## UI stack

- Tailwind CSS 4 + daisyUI 5, themed in `src/styles.css` (`@plugin "daisyui"` with `light` default, `dark` prefersdark, `emerald`).
- MANDATORY: for any UI/HTML/Tailwind work, load the local daisyUI skill (`.agents/skills/daisyui/SKILL.md`) and follow its usage + colors docs before writing daisyUI class names like `card`, `badge`, `btn`.

## Repo-specific conventions

- Session/auth state is stored in localStorage under keys `talenthub_session`, `talenthub_current_user`, `talenthub_role`. Roles are `ADMIN | RECRUITER | CANDIDATE` (`src/app/features/auth/models/LoggedUser.ts`). Guards (`auth.guard.ts`) check `talenthub_session` presence.
- Data services inject `HttpClient` directly and expose signals; follow the existing pattern: `signal()` for state, `computed()` for derived flags, `inject()` instead of constructor injection, `providedIn: 'root'`.
- `noPropertyAccessFromIndexSignature` is enforced — use bracket access on index-signature types.

## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default in Angular v20+.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

## Accessibility Requirements

- It MUST pass all AXE checks.
- It MUST follow all WCAG AA minimums, including focus management, color contrast, and ARIA attributes.

### Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Prefer inline templates for small components
- Prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead
- When using external templates/styles, use paths relative to the component TS file.

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables
- Do not assume globals like (`new Date()`) are available.

## Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Use the `inject()` function instead of constructor injection