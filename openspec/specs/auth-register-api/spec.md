# auth-register-api

## Purpose

Registration API endpoint per WT-001 contract. Handles user registration with validation, bcrypt hashing, and persistence.

## Requirements

### Requirement: API contract (Request/Response) aligned with WT-001

The system SHALL expose `POST /api/auth/register` (or `/api/v1/auth/register` per app config) with Request/Response formats identical to WT-001. This contract is what the frontend SHALL expect.

**Request (WT-001):**

```json
{
  "email": "usuario@example.com",
  "password": "password123",
  "name": "Juan Pérez"
}
```

| Campo    | Tipo   | Requerido | Validación           |
|----------|--------|-----------|----------------------|
| email    | String | Sí        | Email válido, único  |
| password | String | Sí        | Mínimo 8 caracteres  |
| name     | String | Sí        | Mínimo 2 caracteres  |

**200 OK (WT-001):**

```json
{
  "message": "Usuario registrado exitosamente",
  "user": {
    "id": "uuid",
    "email": "usuario@example.com",
    "name": "Juan Pérez"
  }
}
```

**400 Bad Request:**

```json
{
  "error": "Datos inválidos",
  "details": ["El email no es válido", "La contraseña debe tener al menos 8 caracteres"]
}
```

**409 Conflict:**

```json
{
  "error": "El email ya está registrado"
}
```

#### Scenario: Successful registration with valid data

- **WHEN** client sends POST /api/auth/register with valid email, password (min 8 chars), and name (min 2 chars)
- **THEN** system returns 200 with `{ message, user }` per WT-001
- **AND** user is stored with bcrypt-hashed password
- **AND** email is stored in lowercase

#### Scenario: Registration fails with duplicate email

- **WHEN** client sends POST /api/auth/register with an email already in the database
- **THEN** system returns 409 Conflict with `{ "error": "El email ya está registrado" }`

#### Scenario: Registration fails with invalid email format

- **WHEN** client sends POST /api/auth/register with an invalid email format
- **THEN** system returns 400 Bad Request with `{ "error", "details" }`

#### Scenario: Registration fails with short password

- **WHEN** client sends POST /api/auth/register with password shorter than 8 characters
- **THEN** system returns 400 Bad Request with `{ "error", "details" }`

#### Scenario: Registration fails with short name

- **WHEN** client sends POST /api/auth/register with name shorter than 2 characters
- **THEN** system returns 400 Bad Request with `{ "error", "details" }`

### Requirement: Persistence with Prisma and PostgreSQL

The system SHALL persist registered users in PostgreSQL via Prisma ORM. The `UserRepository` implementation used in production SHALL use Prisma Client to create and query users. In-memory storage is acceptable only for unit tests.

#### Scenario: User persisted in database

- **WHEN** a user is successfully registered (POST returns 200)
- **THEN** the user record SHALL be stored in PostgreSQL via Prisma
- **AND** the record SHALL persist across process restarts

#### Scenario: Duplicate email detected from database

- **WHEN** client sends POST /api/auth/register with an email that already exists in the database
- **THEN** system returns 409 Conflict with `{ "error": "El email ya está registrado" }`
- **AND** the uniqueness check SHALL be performed against the database (not in-memory)

### Requirement: Frontend contract expectation

The frontend SHALL expect the API contract above. On 200 OK, the frontend SHALL receive `{ message, user }`; it MAY redirect to login or call the login endpoint to obtain tokens if the app requires immediate authentication.
