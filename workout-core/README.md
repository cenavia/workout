# workout-core

API REST para gestión de entrenamientos con Node.js y TypeScript siguiendo Clean Architecture y Domain-Driven Design.

## Tabla de Contenidos

- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Scripts Disponibles](#scripts-disponibles)
- [Arquitectura](#arquitectura)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Guía de Desarrollo](#guía-de-desarrollo)
- [Convenciones de Código](#convenciones-de-código)
- [Testing](#testing)
- [Path Aliases](#path-aliases)
- [Endpoints](#endpoints)

---

## Requisitos

- **Node.js**: 20.x o superior
- **npm**: 10.x o superior

## Instalación

```bash
# Clonar repositorio
git clone <repo-url>
cd workout-core

# Instalar dependencias
npm install

# Configurar variables de entorno (si aplica)
cp .env.example .env

# Ejecutar en desarrollo
npm run dev
```

## Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia el servidor en modo desarrollo con hot-reload |
| `npm run build` | Compila TypeScript a JavaScript |
| `npm start` | Ejecuta la versión compilada |
| `npm test` | Ejecuta todos los tests |
| `npm run test:watch` | Ejecuta tests en modo watch |
| `npm run test:coverage` | Genera reporte de cobertura |
| `npm run lint` | Ejecuta el linter (Biome) |
| `npm run format` | Formatea el código (Biome) |
| `npm run check` | Ejecuta lint + format check |

---

## Arquitectura

Este proyecto sigue **Clean Architecture** con **Domain-Driven Design (DDD)**.

### Principios Fundamentales

1. **Independencia de frameworks**: El dominio no depende de librerías externas
2. **Testeable**: La lógica de negocio se puede probar sin UI, DB o servicios externos
3. **Independencia de UI**: La interfaz puede cambiar sin afectar el dominio
4. **Independencia de BD**: Se puede cambiar la base de datos sin tocar el dominio
5. **Independencia de agentes externos**: Las reglas de negocio no conocen el mundo exterior

### Capas de la Arquitectura

```
┌─────────────────────────────────────────────────────┐
│                   INFRASTRUCTURE                     │
│  (Controllers, Repositories Impl, External APIs)     │
├─────────────────────────────────────────────────────┤
│                    APPLICATION                       │
│         (Use Cases, DTOs, Orchestration)            │
├─────────────────────────────────────────────────────┤
│                      DOMAIN                          │
│  (Entities, Value Objects, Repository Interfaces)    │
└─────────────────────────────────────────────────────┘
```

### Regla de Dependencias

```
infrastructure → application → domain
     ↓               ↓            ↓
   puede          puede        NO puede
  importar       importar      importar
     de             de         de nadie
  application     domain        más
```

**CRÍTICO**: El dominio es puro y no importa de capas superiores.

---

## Estructura del Proyecto

```
workout-core/
├── src/
│   ├── config/
│   │   └── env.config.ts           # Configuración de entorno
│   ├── contexts/
│   │   └── shared/                 # Building blocks compartidos
│   │       ├── domain/
│   │       │   └── errors/
│   │       │       └── domain.error.ts
│   │       └── infrastructure/
│   │           └── http/
│   │               ├── health.router.ts
│   │               └── health.router.test.ts
│   ├── app.ts                      # Configuración de Express
│   └── index.ts                    # Entry point
│
├── tests/
│   └── contexts/                   # Estructura espejo de src/
│
├── package.json
├── tsconfig.json
├── biome.json
├── vitest.config.ts
└── README.md
```

### Bounded Contexts

| Contexto | Responsabilidad |
|----------|-----------------|
| `shared` | Building blocks compartidos (Entity, VO, Errors, HTTP) |

---

## Guía de Desarrollo

### Crear una Nueva Entidad

1. **Crear el archivo** en `src/contexts/{context}/domain/entities/{name}.entity.ts`
2. **Extender** de `Entity` o `AggregateRoot` según corresponda
3. **Definir propiedades** como interfaz privada
4. **Implementar** método factory `create()` y `reconstitute()`

```typescript
// src/contexts/workouts/domain/entities/workout.entity.ts
import { Entity } from "@/shared/domain/entity.js";

interface WorkoutProps {
  name: string;
  duration: number;
  createdAt: Date;
}

export class Workout extends Entity<WorkoutProps> {
  private constructor(id: string, props: WorkoutProps) {
    super(id, props);
  }

  static create(props: Omit<WorkoutProps, "createdAt">): Workout {
    return new Workout(crypto.randomUUID(), {
      ...props,
      createdAt: new Date(),
    });
  }

  get name(): string {
    return this.props.name;
  }
}
```

### Crear un Caso de Uso

1. **Crear el archivo** en `src/contexts/{context}/application/use-cases/{action}-{entity}.usecase.ts`
2. **Implementar** interfaz `UseCase<Input, Output>`
3. **Inyectar** repositorios y servicios por constructor

```typescript
// src/contexts/workouts/application/use-cases/create-workout.usecase.ts
import { UseCase } from "@/shared/application/use-case.js";
import { Workout } from "../../domain/entities/workout.entity.js";
import { WorkoutRepository } from "../../domain/repositories/workout.repository.js";

export class CreateWorkoutUseCase implements UseCase<CreateWorkoutDto, WorkoutResponseDto> {
  constructor(private readonly repository: WorkoutRepository) {}

  async execute(input: CreateWorkoutDto): Promise<WorkoutResponseDto> {
    const workout = Workout.create(input);
    await this.repository.save(workout);
    return WorkoutMapper.toResponse(workout);
  }
}
```

### Crear un Error de Dominio

```typescript
// src/contexts/workouts/domain/errors/workout.error.ts
import { DomainError } from "@/shared/domain/errors/domain.error.js";

export class WorkoutNotFoundError extends DomainError {
  constructor(id: string) {
    super("WORKOUT_NOT_FOUND", `Workout with id "${id}" not found`);
  }
}
```

---

## Convenciones de Código

### Nomenclatura de Archivos

| Tipo | Patrón | Ejemplo |
|------|--------|---------|
| Entidad | `{name}.entity.ts` | `workout.entity.ts` |
| Value Object | `{name}.vo.ts` | `duration.vo.ts` |
| Caso de Uso | `{action}-{entity}.usecase.ts` | `create-workout.usecase.ts` |
| DTO entrada | `{action}-{entity}.dto.ts` | `create-workout.dto.ts` |
| DTO salida | `{entity}.response.dto.ts` | `workout.response.dto.ts` |
| Repositorio (port) | `{entity}.repository.ts` | `workout.repository.ts` |
| Error | `{context}.error.ts` | `workout.error.ts` |
| Test | `{name}.test.ts` | `workout.entity.test.ts` |

### Nomenclatura de Código

```typescript
// Archivos y carpetas: kebab-case
create-workout.usecase.ts

// Clases y tipos: PascalCase
class CreateWorkoutUseCase {}
interface WorkoutRepository {}

// Funciones y variables: camelCase
function createWorkout() {}
const workoutRepository = {};

// Constantes: UPPER_SNAKE_CASE
const MAX_WORKOUT_DURATION = 180;
```

### TypeScript

- **Strict mode**: Siempre habilitado (`strict: true`)
- **No `any`**: Usar `unknown` + type guards
- **Readonly**: Preferir propiedades inmutables

```typescript
// ❌ Evitar
const data: any = fetchData();

// ✅ Preferir
const data: unknown = fetchData();
if (isValidData(data)) {
  // TypeScript ahora conoce el tipo
}
```

### Imports

- Usar **path aliases** sobre rutas relativas profundas
- Incluir extensión `.js` en imports (requerido por ESM)

```typescript
// ❌ Evitar
import { Workout } from "../../../domain/entities/workout.entity";

// ✅ Preferir
import { Workout } from "@/workouts/domain/entities/workout.entity.js";
```

---

## Testing

### Enfoque: TDD/BDD con Given-When-Then

```typescript
describe("Workout Entity", () => {
  describe("create", () => {
    it("should create a workout with provided name", () => {
      // Given
      const props = { name: "Morning Run", duration: 30 };

      // When
      const workout = Workout.create(props);

      // Then
      expect(workout.name).toBe("Morning Run");
    });
  });
});
```

### Estructura de Tests

```
tests/
└── contexts/
    └── {bounded-context}/
        ├── domain/
        │   ├── entities/
        │   │   └── {entity}.entity.test.ts
        │   └── value-objects/
        │       └── {vo}.vo.test.ts
        ├── application/
        │   └── use-cases/
        │       └── {action}-{entity}.usecase.test.ts
        └── fixtures/
            └── {entity}.fixture.ts
```

### Cobertura

Mantener cobertura **> 80%** en código de dominio y aplicación.

```bash
npm run test:coverage
```

---

## Path Aliases

### Configuración

Los aliases están configurados en `tsconfig.json` y `vitest.config.ts`:

| Alias | Ruta |
|-------|------|
| `@/shared/*` | `src/contexts/shared/*` |
| `@/test/*` | `tests/*` |

### Uso

```typescript
// Importar desde shared
import { DomainError } from "@/shared/domain/errors/domain.error.js";

// Importar fixtures en tests
import { WorkoutFixture } from "@/test/contexts/workouts/fixtures/workout.fixture.js";
```

---

## Endpoints

### Health Check

```
GET /health
```

**Respuesta exitosa (200):**

```json
{
  "status": "ok",
  "timestamp": "2026-02-01T12:00:00.000Z"
}
```

---

## Git Workflow

### Branches

- `main` - Producción
- `feat/{description}` - Nueva funcionalidad
- `fix/{description}` - Corrección de bugs
- `refactor/{description}` - Refactorización
- `test/{description}` - Agregar/modificar tests

### Commits (Conventional Commits)

```
feat(workouts): add create workout use case
fix(shared): handle null in domain error
refactor(shared): extract base entity class
test(workouts): add unit tests for workout entity
```

---

## Tecnologías

- **Runtime**: Node.js 20+
- **Lenguaje**: TypeScript 5.6+ (strict mode)
- **Framework**: Express 4.21+
- **Testing**: Vitest
- **Linting/Formatting**: Biome
