# Workout Tracker

> Plataforma de seguimiento fitness con coaching de entrenamientos mediante IA, catálogo de ejercicios y planes de entrenamiento personalizados.

---

## Tabla de contenidos

- [Descripción general](#a-descripción-general)
- [Stack tecnológico](#b-stack-tecnológico)
- [Instalación y ejecución](#c-instalación-y-ejecución)
- [Estructura del proyecto](#d-estructura-del-proyecto)
- [Funcionalidades principales](#e-funcionalidades-principales)
- [Recursos adicionales](#recursos-adicionales)

---

## a. Descripción general

**Workout Tracker** es una aplicación fitness full-stack que permite a los usuarios crear, gestionar y seguir sus rutinas de entrenamiento. La plataforma combina un backend REST API, un frontend SPA con Angular y un asistente chatbot con IA para ofrecer una experiencia completa de gestión fitness.

### Objetivos principales

- **Gestión de usuarios**: Registro seguro, autenticación y manejo de sesiones con JWT
- **Catálogo de ejercicios**: Explorar y filtrar ejercicios por categoría y grupo muscular
- **Planes de entrenamiento**: Crear, editar y organizar rutinas de entrenamiento personalizadas
- **Programación**: Planificar entrenamientos con fecha y hora; registrar historial de completados
- **Coach IA**: Asistente conversacional para crear planes, responder preguntas de fitness y dar recomendaciones mediante RAG (Retrieval-Augmented Generation)

### Vista general de la arquitectura

El proyecto sigue una estructura de monorepo modular con tres aplicaciones principales:

| Aplicación | Propósito |
|------------|-----------|
| **workout-core** | Backend REST API (Node.js/TypeScript, Clean Architecture, DDD) |
| **workout-app** | Frontend SPA (Angular 21) |
| **workout-chatbot** | Asistente IA de entrenamientos (Python, LangGraph, FastAPI) |

---

## b. Stack tecnológico

### Backend (workout-core)

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| Node.js | 20+ | Runtime |
| TypeScript | 5.6+ | Lenguaje (modo estricto) |
| Express | 4.21+ | Framework HTTP |
| Vitest | 2.1+ | Testing unitario |
| Biome | 1.9+ | Linting y formateo |

**Arquitectura**: Clean Architecture, Domain-Driven Design (DDD)

### Frontend (workout-app)

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| Angular | 21.x | Framework SPA |
| TypeScript | 5.9+ | Lenguaje |
| RxJS | 7.8+ | Programación reactiva |
| SCSS | - | Hojas de estilo |
| Vitest | 4.x | Testing unitario |

### Agente IA (workout-chatbot)

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| Python | 3.12+ | Runtime |
| LangGraph | 0.2.60+ | Framework de agente |
| LangChain | 0.3.14+ | Orquestación LLM |
| ChromaDB | 0.5.23+ | Vector store para RAG |
| FastAPI | 0.115.6+ | API REST |
| PostgreSQL | 16 | Almacenamiento de checkpoints |
| UV | latest | Gestión de paquetes |

### Tecnologías complementarias

- **Docker**: Contenedor de PostgreSQL para persistencia del chatbot
- **JWT**: Autenticación y autorización
- **OpenAPI/Swagger**: Documentación de API (planificado)

---

## c. Instalación y ejecución

### Requisitos previos

- **Node.js** 20.x o superior
- **npm** 10.x o superior
- **Python** 3.12+ (para workout-chatbot)
- **UV** como gestor de paquetes (para workout-chatbot)
- **Docker** (opcional, para PostgreSQL)
- **Clave de API de OpenAI** (para workout-chatbot)

---

### 1. workout-core (API Backend)

```bash
cd workout-core

# Instalar dependencias
npm install

# Configurar variables de entorno (si aplica)
cp .env.example .env
# Editar .env con tu configuración

# Base de datos (PostgreSQL con Prisma)
docker compose up -d
npm run prisma:migrate

# Modo desarrollo (recarga automática)
npm run dev

# Build de producción
npm run build
npm start
```

**Puerto por defecto**: Consultar `env.config.ts` o `src/config/env.config.ts` para la configuración del puerto.

**Scripts disponibles**:

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo con hot-reload |
| `npm run build` | Genera Prisma Client y compila TypeScript |
| `npm run prisma:generate` | Genera el cliente Prisma |
| `npm run prisma:migrate` | Ejecuta migraciones en desarrollo |
| `npm start` | Ejecuta la versión compilada |
| `npm test` | Ejecuta los tests |
| `npm run test:coverage` | Ejecuta tests con cobertura |
| `npm run lint` | Ejecuta el linter (Biome) |
| `npm run format` | Formatea el código |
| `npm run check` | Lint + comprobación de formato |

---

### 2. workout-app (Frontend)

```bash
cd workout-app

# Instalar dependencias
npm install

# Servidor de desarrollo
npm start
# o: ng serve
```

Abrir [http://localhost:4200](http://localhost:4200) en el navegador.

**Scripts disponibles**:

| Script | Descripción |
|--------|-------------|
| `npm start` | Inicia el servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm test` | Ejecuta tests unitarios |

---

### 3. workout-chatbot (Agente IA)

```bash
cd workout-chatbot

# Instalar dependencias
uv sync

# Configurar entorno
cp .env.example .env
# Editar .env con OPENAI_API_KEY y demás configuraciones

# Iniciar PostgreSQL (opcional, para persistencia de checkpoints)
docker-compose up -d
# o: just db-up

# Ingerir conocimiento de entrenamientos para RAG
just ingest

# Ejecutar el agente
just run
# o: uv run langgraph dev
```

**Alternativa: servidor FastAPI**

```bash
just api
# La API corre en http://localhost:8000
```

**Comandos disponibles** (vía `just`):

| Comando | Descripción |
|---------|-------------|
| `just install` | Instalar dependencias |
| `just run` | Iniciar servidor de desarrollo LangGraph |
| `just ingest` | Ingerir documentos en el vector store |
| `just api` | Iniciar servidor FastAPI |
| `just db-up` | Iniciar contenedor PostgreSQL |
| `just db-down` | Detener contenedor PostgreSQL |
| `just test` | Ejecutar tests |
| `just format` | Formatear código |
| `just lint` | Ejecutar linter |

---

### Ejecutar el stack completo

1. Iniciar la API **workout-core**
2. Iniciar **workout-chatbot** (LangGraph o FastAPI) si se usan funciones de IA
3. Iniciar el frontend **workout-app**
4. Asegurar que las variables de entorno apunten a las URLs correctas de la API (ej. `API_URL` en workout-app)

---

## d. Estructura del proyecto

```
workout/
├── workout-core/                 # Backend REST API
│   ├── src/
│   │   ├── config/               # Entorno y configuración
│   │   ├── contexts/             # Bounded contexts (DDD)
│   │   │   └── shared/           # Building blocks compartidos
│   │   │       ├── domain/       # Entidades, errores, value objects
│   │   │       └── infrastructure/
│   │   │           └── http/     # Routers, controladores
│   │   ├── app.ts
│   │   └── index.ts
│   ├── tests/                    # Tests unitarios e integración
│   ├── package.json
│   ├── tsconfig.json
│   ├── biome.json
│   └── vitest.config.ts
│
├── workout-app/                  # Frontend Angular
│   ├── src/
│   │   ├── app/
│   │   │   ├── guards/           # Route guards (auth)
│   │   │   ├── interceptors/     # Interceptores HTTP (token)
│   │   │   ├── models/           # Interfaces TypeScript
│   │   │   ├── services/         # Servicios auth, workout, user
│   │   │   ├── modules/          # Módulos funcionales (lazy-loaded)
│   │   │   │   ├── auth/
│   │   │   │   ├── workouts/
│   │   │   │   ├── dashboard/
│   │   │   │   └── profile/
│   │   │   └── shared/           # Componentes compartidos
│   │   ├── environments/
│   │   └── main.ts
│   ├── package.json
│   └── angular.json
│
├── workout-chatbot/              # Asistente IA de entrenamientos
│   ├── src/
│   │   ├── agents/               # Agente LangGraph
│   │   │   ├── modular/          # Grafo, estado, nodos, rutas
│   │   │   └── rag/              # Vector store, ingestión
│   │   └── api/                  # Endpoints FastAPI
│   ├── data/
│   │   ├── chroma/               # Vector store (generado)
│   │   └── documents/            # Documentos RAG
│   ├── pyproject.toml
│   ├── langgraph.json
│   ├── docker-compose.yml
│   └── justfile
│
├── ai-specs/specs/               # Estándares de desarrollo IA
│   ├── base-standards.mdc
│   ├── backend-standards.mdc
│   ├── frontend-standards.mdc
│   ├── ai-agents-standards.mdc
│   └── documentation-standards.mdc
│
├── docs/                         # Documentación del proyecto
│   ├── backlog-priorizado.md
│   ├── user-stories.md
│   └── tickets/                 # Tickets estilo Jira
│
├── .claude/                      # Skills y plantillas de Claude
└── README.md                     # Este archivo
```

### Bounded contexts (workout-core)

| Contexto | Responsabilidad |
|----------|-----------------|
| `shared` | Building blocks compartidos (Entity, DomainError, health router) |

Se irán añadiendo más contextos (auth, exercises, workouts, etc.) según las user stories y el backlog.

---

## e. Funcionalidades principales

*Según [PRD v1.1](docs/PRD.md) y [Claves de Éxito](docs/PRD.md#6-claves-de-éxito-identificadas).*

### Implementadas (estado actual)

| Funcionalidad | Componente | Estado |
|---------------|------------|--------|
| Endpoint de health check | workout-core | ✅ Implementado |
| Configuración Clean Architecture + DDD | workout-core | ✅ Implementado |
| Skeleton SPA Angular | workout-app | ✅ Implementado |
| Módulo Auth (login, registro) | workout-app | ✅ Skeleton |
| Módulo Workouts | workout-app | ✅ Skeleton |
| Módulo Dashboard | workout-app | ✅ Skeleton |
| Módulo Profile | workout-app | ✅ Skeleton |
| Auth guard e interceptor de token | workout-app | ✅ Implementado |
| AI Workout Coach (LangGraph) | workout-chatbot | ✅ Implementado |
| RAG con ChromaDB | workout-chatbot | ✅ Implementado |
| Endpoint chat FastAPI | workout-chatbot | ✅ Implementado |

### Planificadas (según PRD sección 5)

#### 5.1 Backend API

| Área | Funcionalidades |
|------|-----------------|
| **Gestión de usuarios** | Registro (sign-up), inicio de sesión (login) con JWT, cierre de sesión (logout), protección de endpoints con middleware JWT |
| **Catálogo de ejercicios** | Seeder inicial, estructura (nombre, descripción, categoría, grupo muscular), categorías (cardio, fuerza, flexibilidad), grupos musculares (pecho, espalda, piernas, hombros, brazos, core) |
| **Gestión de planes** | CRUD completo: crear, listar, actualizar y eliminar entrenamientos; soporte para múltiples ejercicios con series, repeticiones y peso |
| **Programación y calendario** | Programar entrenamiento con fecha/hora, vista cronológica, filtrado por estado (pendiente, completado, activo) |
| **Reportes y analíticas** | Historial de entrenamientos completados, métricas de progreso (pesos, repeticiones, frecuencia), reportes por período (semanal, mensual, rango de fechas) |
| **Documentación API** | OpenAPI/Swagger, ejemplos de uso, esquemas de datos |

#### 5.2 Frontend Web

| Área | Funcionalidades |
|------|-----------------|
| **Dashboard principal** | Resumen de actividad (entrenamientos de la semana, racha activa, próximo entrenamiento), métricas destacadas, acceso rápido (iniciar entrenamiento, chat, calendario), notificaciones |
| **Gestión de entrenamientos** | Constructor de rutinas con drag & drop, plantillas predefinidas (PPL, Full Body, Upper/Lower), vista detallada con historial de ejecuciones, temporizador para descansos entre series |
| **Calendario y programación** | Vista mensual/semanal, arrastrar y soltar para reprogramar, estadísticas de adherencia |
| **Reportes y progreso** | Gráficos de evolución (pesos, volumen, frecuencia), comparativas temporales, insights automáticos, exportación PDF/CSV |
| **Biblioteca de ejercicios** | Búsqueda y filtros (grupo muscular, categoría, equipo), fichas de ejercicio con descripción y variaciones |

#### 5.3 Agente de IA - Workout Coach

| Área | Funcionalidades |
|------|-----------------|
| **Interfaz de chat** | Chat embebido accesible desde cualquier pantalla, historial de conversaciones, sugerencias rápidas, feedback útil/no útil |
| **Planificación inteligente** | Onboarding guiado (objetivos, disponibilidad, experiencia, limitaciones), generación de planes personalizados, explicación de ejercicios seleccionados, ajustes iterativos |
| **Recomendaciones basadas en progreso** | Detección de estancamiento, sugerencias de progresión (cuándo subir peso/reps), ejercicios alternativos, deload automático ante fatiga |
| **Q&A Fitness (RAG)** | Base de conocimiento sobre ejercicios, técnicas y anatomía; respuestas contextuales; fuentes citadas cuando aplica |
| **Motivación y seguimiento** | Recordatorios inteligentes, celebración de logros, check-ins proactivos, tips personalizados |
| **Tools del agente** | `create_workout_plan`, `get_exercises_by_criteria`, `analyze_user_progress`, `update_workout`, `get_user_context`, `schedule_workout`, `search_knowledge_base`, `get_recommendations` |

### Claves de éxito (resumen PRD sección 6)

- **Críticas (12):** Autenticación JWT, aislamiento de datos, CRUD entrenamientos, gestión usuarios, catálogo con seeder, BD relacional, OpenAPI, pruebas unitarias, agente conversacional, planificación inteligente, SPA moderno, chat integrado
- **Deseables (12):** Programación con calendario, reportes de progreso, comentarios, listado ordenado, arquitectura extensible wearables, multicliente, recomendaciones IA, RAG fitness, memoria conversacional, detección de estancamiento, dashboard con métricas, calendario visual

---

## Recursos adicionales

- **Estándares backend**: [ai-specs/specs/backend-standards.mdc](ai-specs/specs/backend-standards.mdc)
- **Estándares frontend**: [ai-specs/specs/frontend-standards.mdc](ai-specs/specs/frontend-standards.mdc)
- **Estándares agentes IA**: [ai-specs/specs/ai-agents-standards.mdc](ai-specs/specs/ai-agents-standards.mdc)
- **User stories**: [docs/user-stories.md](docs/user-stories.md)
- **Backlog priorizado**: [docs/backlog-priorizado.md](docs/backlog-priorizado.md)

### READMEs por módulo

- [workout-core/README.md](workout-core/README.md) – Arquitectura backend, casos de uso y convenciones
- [workout-app/README.md](workout-app/README.md) – Estructura y funcionalidades del frontend
- [workout-chatbot/README.md](workout-chatbot/README.md) – Arquitectura y uso del agente IA

---

*Workout Tracker – Desarrollado con Clean Architecture, DDD y coaching mediante IA.*
