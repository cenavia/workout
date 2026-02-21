## 1. Setup Prisma y base de datos

- [x] 1.1 Añadir dependencias Prisma (`prisma`, `@prisma/client`) a workout-core
- [x] 1.2 Crear `prisma/schema.prisma` con datasource PostgreSQL y provider
- [x] 1.3 Añadir `DATABASE_URL` a `.env.example` y documentar en README
- [x] 1.4 Crear docker-compose para PostgreSQL (workout-core o carpeta docker)
- [x] 1.5 Añadir scripts `prisma:generate` y `prisma:migrate` en package.json

## 2. Esquema y migración User

- [x] 2.1 Definir modelo `User` en schema.prisma (id, email, name, passwordHash, createdAt, updatedAt)
- [x] 2.2 Ejecutar `prisma migrate dev` para crear migración inicial
- [x] 2.3 Verificar que `prisma generate` produce el cliente correctamente

## 3. PrismaUserRepository

- [x] 3.1 Crear `PrismaUserRepository` en `infrastructure/repositories/` implementando `IUserRepository`
- [x] 3.2 Implementar `findByEmail` con búsqueda case-insensitive (email en lowercase)
- [x] 3.3 Implementar `create` mapeando entidad dominio ↔ modelo Prisma
- [x] 3.4 Manejar error P2002 (unique violation) para devolver/permiter 409 en capa superior

## 4. Wire y configuración

- [x] 4.1 Crear factory o función que devuelva `PrismaUserRepository` cuando exista `DATABASE_URL`
- [x] 4.2 Actualizar `auth.router.ts` para usar el repository de producción (Prisma) en lugar de InMemoryUserRepository
- [x] 4.3 Verificar que tests unitarios siguen usando `InMemoryUserRepository` (sin cambios si ya lo hacen)
