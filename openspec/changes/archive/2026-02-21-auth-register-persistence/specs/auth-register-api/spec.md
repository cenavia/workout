## ADDED Requirements

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
