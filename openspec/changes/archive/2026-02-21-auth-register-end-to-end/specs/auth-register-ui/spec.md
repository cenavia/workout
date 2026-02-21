## ADDED Requirements

### Requirement: Register page UI reproduces register.html

The system SHALL provide a register page at route `/auth/register` that reproduces the UI structure and behavior of `docs/ui-desing/ui/register.html`. The UI SHALL include: auth header, auth card with title and subtitle, form with full name, email, and password fields, password visibility toggle, password strength indicator, submit button with loading state, alerts for success/error/validation/offline, auth footer with sign-in link. The page SHALL use design tokens from `tokens.css` (colors, spacing, radii, shadows) for consistent styling.

#### Scenario: UI layout matches register.html

- **WHEN** user navigates to `/auth/register`
- **THEN** page displays auth header, auth card, form fields (name, email, password), submit button, and auth footer
- **AND** styles use `tokens.css` variables (e.g. `--bg-card`, `--color-primary-500`, `--space-xl`)

#### Scenario: Form validation and submission

- **WHEN** user fills email, password (min 8 chars), and name (min 2 chars) and submits
- **THEN** system calls the register API with the form values
- **AND** on 200 OK, user is redirected to login or main app
- **AND** validation/API errors are shown in alerts

### Requirement: Register form and API integration

The form SHALL use Angular Reactive Forms with validators (required, email, minLength) and SHALL submit data in the WT-001 Request format. The frontend SHALL expect the WT-001 Response contract (200: `{ message, user }`, 400: `{ error, details }`, 409: `{ error }`).

#### Scenario: User submits valid form

- **WHEN** user fills valid email, password (min 8 chars), and name (min 2 chars) and submits
- **THEN** system sends POST to register API with `{ email, password, name }`
- **AND** on 200 OK with `{ message, user }`, user is redirected to login or main app

#### Scenario: Form shows validation errors

- **WHEN** user submits with invalid email, short password, or short name
- **THEN** system displays field-level validation messages
- **AND** system does not call the API

#### Scenario: API error is displayed

- **WHEN** register API returns 409 or 400
- **THEN** system displays the appropriate alert (duplicate email or validation details)
- **AND** form remains editable

### Requirement: Routes in auth module

The register route SHALL be defined in the auth routing module at path `register` and SHALL be reachable as `/auth/register`. Routes SHALL follow the auth module structure defined in the app.
