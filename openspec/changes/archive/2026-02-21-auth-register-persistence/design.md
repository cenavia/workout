## Context

workout-core tiene un flujo de registro funcional con `RegisterUserUseCase`, `IUserRepository` e `InMemoryUserRepository`. El router usa directamente `InMemoryUserRepository`; los usuarios no persisten entre reinicios. El proyecto sigue Clean Architecture y DDD (backend-standards.mdc). La entidad `User` tiene `id`, `email`, `name`, `passwordHash`. No existe Prisma ni PostgreSQL en workout-core; workout-chatbot usa Docker + PostgreSQL para su propia BD.

## Goals / Non-Goals

**Goals:**

- Persistir usuarios en PostgreSQL mediante Prisma.
- Implementar `PrismaUserRepository` que cumpla `IUserRepository`.
- Añadir esquema Prisma y migración para la tabla `user`.
- Proporcionar Docker (docker-compose) para PostgreSQL en desarrollo local.
- Mantener tests unitarios usando `InMemoryUserRepository` (sin dependencia de BD).

**Non-Goals:**

- Migrar datos existentes (no hay datos en producción).
- Modificar el contrato API ni los casos de uso.
- Tests de integración con BD real (se pueden añadir en un cambio posterior).

## Decisions

### 1. ORM: Prisma con PostgreSQL

**Decisión:** Usar Prisma como ORM y PostgreSQL como base de datos.

**Rationale:** El proyecto ya referencia Prisma en ai-specs (development_guide, prompts). Prisma ofrece tipado, migraciones declarativas y buen soporte con TypeScript. PostgreSQL es estándar en el ecosistema (workout-chatbot ya lo usa).

### 2. Esquema User: id UUID, email único, name, passwordHash

**Decisión:** Modelo Prisma `User` con campos `id` (UUID), `email` (unique, indexed), `name`, `passwordHash`, `createdAt`, `updatedAt`. Sin relaciones de momento.

**Rationale:** Mapeo directo a la entidad de dominio. UUID evita información secuencial en IDs. `createdAt`/`updatedAt` para auditoría. Constraint unique en email para 409 en duplicados.

### 3. Docker Compose para workout-core

**Decisión:** Añadir `workout-core/docker-compose.yml` (o `docker/docker-compose.postgres.yml` en raíz) con PostgreSQL para desarrollo. Variables de entorno vía `.env` con `DATABASE_URL` para Prisma.

**Rationale:** Aislamiento de la BD de workout-core respecto a workout-chatbot. Desarrollador puede levantar solo la BD necesaria para la API.

### 4. Inyección de dependencias: repository por configuración

**Decisión:** El router/wire debe poder recibir `IUserRepository` inyectado o determinarlo por `NODE_ENV`/variable de entorno. En producción: `PrismaUserRepository`; en tests: `InMemoryUserRepository`.

**Rationale:** DIP ya está respetado (use case depende de `IUserRepository`). Falta el wire: hoy el router crea `InMemoryUserRepository` directamente. Se cambiará a factory o DI simple que devuelva `PrismaUserRepository` cuando haya `DATABASE_URL`, o `InMemoryUserRepository` en tests.

### 5. Tests unitarios: seguir con InMemoryUserRepository

**Decisión:** Los tests del use case seguirán usando `InMemoryUserRepository`. No se requiere BD en los tests unitarios actuales.

**Rationale:** Mantiene tests rápidos y sin setup externo. Los tests de integración con BD se pueden añadir más adelante si se desea.

### 6. Migraciones: carpetas por defecto de Prisma

**Decisión:** `prisma/schema.prisma`, `prisma/migrations/` con la migración inicial para `User`.

**Rationale:** Convención estándar de Prisma. Facilita futuras migraciones.

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Puerto PostgreSQL ocupado (workout-core vs workout-chatbot) | Usar puerto distinto para workout-core (ej. 5433) o servicio nombrado diferente en compose |
| DATABASE_URL no configurada en dev | Documentar en README; `.env.example` con `DATABASE_URL`; fallback o mensaje claro si falta |
| Prisma Client genera en `node_modules` | Incluir `prisma generate` en postinstall o script pre-build; documentar en setup |
| Duplicado de email vía Prisma | Usar `create` y capturar `P2002` (unique violation) para devolver 409; o `findFirst` + `create` según preferencia |
