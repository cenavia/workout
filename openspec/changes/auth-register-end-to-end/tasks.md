## 1. Backend - Auth context and register use case

- [x] 1.1 Add bcrypt and Zod to workout-core dependencies
- [x] 1.2 Create RegisterUserDto with Zod schema (email, password, name validations)
- [x] 1.3 Create User entity and IUserRepository interface in auth domain
- [x] 1.4 Implement RegisterUserUseCase (validate, check duplicate email, hash password, persist)
- [x] 1.5 Write unit tests for RegisterUserUseCase
- [x] 1.6 Create in-memory UserRepository implementation for tests

## 2. Backend - Auth router and HTTP layer

- [x] 2.1 Create auth router with POST /register route
- [x] 2.2 Wire register endpoint to RegisterUserUseCase and return WT-001 format: 200 `{ message, user }`, 400 `{ error, details }`, 409 `{ error }`
- [x] 2.4 Add auth router to app.ts and mount at /api/v1/auth
- [x] 2.5 Write integration tests for POST /api/v1/auth/register (success, 409, 400 cases)

## 3. Backend - Persistence

- [ ] 3.1 Implement UserRepository with real DB (Prisma/TypeORM or project default)
- [ ] 3.2 Add user table migration or schema if needed
- [x] 3.3 Ensure register endpoint uses production repository

## 4. Frontend - Register page and routing

- [x] 4.1 Create RegisterComponent reproducing register.html layout (auth header, card, form, alerts, footer) using tokens.css
- [x] 4.2 Add Reactive Form with validators (required, email, minLength) for name, email, password; password visibility toggle; password strength indicator
- [x] 4.3 Add register route to AuthRoutingModule at path register
- [x] 4.4 Ensure register route is reachable from app routes
- [x] 4.5 Wire form submit to register API (WT-001 contract); handle 200, 400, 409 and redirect to login on success
- [x] 4.6 Display validation errors and API error message on failure

## 5. Frontend - Tests

- [x] 5.1 Write unit tests for RegisterComponent (form validation, submit, error display)
