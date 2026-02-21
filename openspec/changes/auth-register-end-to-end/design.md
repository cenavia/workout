## Context

The Workout Tracker app uses an Angular frontend (workout-app) and a Node.js backend (workout-core) with Clean Architecture and DDD. The frontend already defines `RegisterDto` and `AuthService.register()` targeting `POST /api/v1/auth/register`, but the backend has no register endpoint and no register page exists. The project follows base-standards (TDD, type safety) and uses `ai-specs/specs/backend-standards.mdc` and frontend specs for patterns. The UI design is defined in `docs/ui-desing/ui/register.html` and design tokens in `docs/ui-desing/ui/styles/tokens.css`.

## Goals / Non-Goals

**Goals:**

- Implement end-to-end registration: backend endpoint (API contract per WT-001), frontend UI (reproducing register.html), and integration.
- Backend: layered architecture (use case, repository, router) per `ai-specs/specs/backend-standards.mdc`.
- Frontend: Angular component that reproduces register.html, routes in auth module, styling via `tokens.css`.
- Validate input (email format, password length, unique email) and return clear errors (400, 409).

**Non-Goals:**

- Password reset, email verification, or social login.
- Rate limiting or captcha (future considerations).

## Decisions

### 1. Backend layers (per backend-standards.mdc)

**Decision:** Structure auth context following Clean Architecture and DDD per `ai-specs/specs/backend-standards.mdc`:

- **Application layer**: `RegisterUserUseCase` (orchestrates validation, duplicate check, hash, persistence).
- **Domain layer**: `User` entity, `IUserRepository` interface.
- **Infrastructure layer**: `UserRepository` implementation, `auth.router.ts` with POST /register endpoint.

**Rationale:** Backend standards define use cases, repositories, and HTTP adapters. This structure keeps domain isolated and testable.

### 2. API contract per WT-001

**Decision:** Register endpoint Request/Response aligned with WT-001: 200 returns `{ message, user }`, 400 returns `{ error, details }`, 409 returns `{ error }`. No tokens in register response.

**Rationale:** Specs require API igual a WT-001. Frontend redirects to login after success or calls login to obtain tokens if needed.

### 3. Password hashing: bcrypt with salt rounds 10

**Decision:** Use bcrypt with 10 salt rounds for password hashing.

**Rationale:** Matches WT-001. bcrypt is widely used and suitable for this scale.

### 4. Validation: Zod in application layer

**Decision:** Validate request DTO with Zod in the use case or HTTP adapter.

**Rationale:** Backend standards recommend validation libraries. Zod integrates well with TypeScript.

### 5. Frontend: Angular component reproducing register.html

**Decision:** Build `RegisterComponent` that reproduces the structure and behavior of `docs/ui-desing/ui/register.html`: auth header, auth card, form (name, email, password), password visibility toggle, password strength indicator, submit button with loading state, alerts (success/error/validation/offline), auth footer with sign-in link.

**Rationale:** register.html is the design reference. The Angular component SHALL match its layout and states.

### 6. Frontend: tokens.css integration

**Decision:** Use design tokens from `docs/ui-desing/ui/styles/tokens.css` for colors, spacing, radii, shadows, and layout dimensions (e.g. `--color-primary-500`, `--space-xl`, `--radius-xl`, `--bg-card`, `--input-height`).

**Rationale:** Ensures UI consistency with the design system. Tokens can be imported as CSS variables or mapped to Tailwind if the app uses Tailwind.

### 7. Routes in auth module

**Decision:** Add register route to `AuthRoutingModule` at path `register`, reachable as `/auth/register`.

**Rationale:** Keeps auth flows grouped in the auth module.

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Email enumeration via 409 | Acceptable for MVP; add rate limiting or generic messaging later if needed. |
| Weak passwords | Enforce min 8 chars; consider strength indicator or stronger rules later. |
| Auth router not yet scaffolded | Add auth router and register route if missing; follow existing health router patterns. |
