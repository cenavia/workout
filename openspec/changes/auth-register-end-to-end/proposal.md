## Why

Users cannot create accounts today because the registration flow is incomplete. The frontend has `AuthService.register()` and `RegisterDto` defined, but there is no register endpoint in the backend and no register page or route in the app. Implementing the full end-to-end flow unblocks onboarding and enables access to Workout Tracker features.

## What Changes

- **Backend**: Implement `POST /api/v1/auth/register` with validation (email format, password length, unique email), bcrypt hashing, and storage. Return user and tokens on success; 400 for invalid input, 409 for duplicate email.
- **Frontend**: Add register page with form (email, password, name), route `/auth/register`, and integration with `AuthService.register()`. Redirect to app or login on success; display validation and API errors.
- **Routing**: Add register route to auth routing module and app routes.

## Capabilities

### New Capabilities

- `auth-register-api`: Registration API endpoint (validation, bcrypt, persistence, responses).
- `auth-register-ui`: Registration page, form, validation, routing, and AuthService integration.

### Modified Capabilities

- None. No existing specs in `openspec/specs/`.

## Impact

- **workout-core**: New or updated auth context (register use case, router, repository, DTOs).
- **workout-app**: Auth module (register component, auth routing, possible guard).
- **APIs**: New endpoint `POST /api/v1/auth/register`.
- **Dependencies**: bcrypt (backend), existing Angular auth models and services.
