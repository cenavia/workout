# Workout App

Aplicación Angular para gestión de entrenamientos y rutinas de ejercicio.

## 📋 Características

- 🔐 **Autenticación**: Login, registro y gestión de sesiones
- 💪 **Gestión de Entrenamientos**: Crear, editar y eliminar rutinas de ejercicio
- 📊 **Dashboard**: Panel principal con estadísticas y resumen
- 👤 **Perfil de Usuario**: Gestión de información personal

## 🏗️ Arquitectura

### Estructura del Proyecto

```
src/app/
├── guards/              # Route guards (authGuard)
├── interceptors/        # HTTP interceptors (tokenInterceptor)
├── models/              # TypeScript interfaces y tipos
│   ├── user.model.ts
│   ├── auth.model.ts
│   └── workout.model.ts
├── services/            # Servicios compartidos
│   ├── auth.service.ts
│   ├── workout.service.ts
│   └── user.service.ts
├── modules/             # Feature modules (lazy-loaded)
│   ├── auth/
│   ├── workouts/
│   ├── dashboard/
│   └── profile/
├── shared/              # Componentes, directivas y pipes compartidos
└── utils/               # Utilidades y helpers
```

### Path Aliases

El proyecto utiliza path aliases para imports limpios:

```typescript
import { AuthService } from '@services/auth.service';
import { User } from '@models/user.model';
import { authGuard } from '@guards/auth.guard';
```

Aliases configurados:
- `@services/*` → `src/app/services/*`
- `@models/*` → `src/app/models/*`
- `@guards/*` → `src/app/guards/*`
- `@interceptors/*` → `src/app/interceptors/*`
- `@shared/*` → `src/app/shared/*`
- `@environments/*` → `src/environments/*`
- `@auth/*` → `src/app/modules/auth/*`
- `@workouts/*` → `src/app/modules/workouts/*`
- `@dashboard/*` → `src/app/modules/dashboard/*`
- `@profile/*` → `src/app/modules/profile/*`

## 🚀 Inicio Rápido

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.1.2.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.


## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## 🔒 Seguridad

- **AuthGuard**: Protege rutas que requieren autenticación
- **TokenInterceptor**: Añade automáticamente el token JWT a las peticiones HTTP
- **TypeScript Strict Mode**: Habilitado para mayor seguridad de tipos

## 📝 Modelos de Datos

### User
```typescript
interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Workout
```typescript
interface Workout {
  id: string;
  userId: string;
  name: string;
  description?: string;
  exercises: WorkoutExercise[];
  duration?: number;
  calories?: number;
  difficulty?: DifficultyLevel;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}
```

## 🛠️ Tecnologías

- **Angular 21** - Framework
- **TypeScript** - Lenguaje
- **SCSS** - Estilos
- **RxJS** - Programación reactiva

## 📦 Próximos Pasos

1. Implementar componentes UI en cada módulo
2. Añadir formularios reactivos para login/registro
3. Crear componentes para visualización de workouts
4. Implementar dashboard con gráficos
5. Añadir tests unitarios y e2e
6. Integrar con backend API


## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
