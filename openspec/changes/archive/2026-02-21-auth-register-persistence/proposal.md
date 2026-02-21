## Why

Implementar persistencia real con Prisma para el registro de usuarios. El registro actual usa un `InMemoryUserRepository`; los usuarios no persisten entre reinicios. Usar PostgreSQL y Docker permite una base de datos real para desarrollo y pruebas, preparando el camino para producción.

## What Changes

- `UserRepository` con persistencia en base de datos real (reemplazar `InMemoryUserRepository` en producción)
- Migración y esquema Prisma para la tabla `user`
- Configuración de PostgreSQL vía Docker para desarrollo local
- Mantener `InMemoryUserRepository` para tests unitarios (opcional, según estrategia de tests)

## Capabilities

### New Capabilities

- Ninguna.

### Modified Capabilities

- `auth-register-api`: La persistencia pasa de in-memory a base de datos real. Se añade el requisito de usar Prisma con PostgreSQL para almacenar usuarios; el contrato API no cambia.

## Impact

- **workout-core**: Nueva dependencia de base de datos (Prisma, PostgreSQL).
- **Docker**: Requiere PostgreSQL en contenedor para desarrollo local.
- **Tests**: Pueden seguir usando in-memory o configurar BD de test; decisión en design.
