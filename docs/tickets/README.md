# Índice de Tickets Técnicos - Workout Tracker

> Mapeo completo de User Stories a Tickets Técnicos  
> Fecha: 2026-02-08  
> Versión: 1.0

---

## Resumen

Este directorio contiene todos los tickets técnicos enriquecidos generados a partir de las 33 User Stories del proyecto Workout Tracker.

**Total de Tickets:** 33 (una US = un ticket principal, algunas US divididas en múltiples tickets)

---

## Mapeo User Stories → Tickets

### 1. Autenticación y Gestión de Usuarios

| User Story | Ticket | Título | Prioridad | Sprint |
|------------|--------|--------|-----------|--------|
| US-001 | [WT-001](./WT-001.md) | Implementar endpoint de registro de usuario | Crítica | Sprint 1 |
| US-002 | [WT-002](./WT-002.md) | Implementar endpoint de inicio de sesión con JWT | Crítica | Sprint 1 |
| US-003 | [WT-003](./WT-003.md) | Implementar funcionalidad de cierre de sesión en frontend | Alta | Sprint 1 |
| US-004 | [WT-004](./WT-004.md) | Implementar middleware de autenticación JWT para proteger endpoints | Crítica | Sprint 1 |

### 2. Catálogo de Ejercicios

| User Story | Ticket | Título | Prioridad | Sprint |
|------------|--------|--------|-----------|--------|
| US-005 | [WT-005](./WT-005.md) | Crear seeder de ejercicios predefinidos | Crítica | Sprint 1 |
| US-006 | [WT-006](./WT-006.md) | Implementar endpoint para listar ejercicios con filtros y paginación | Crítica | Sprint 1 |
| US-007 | [WT-007](./WT-007.md) | Implementar endpoint para obtener detalle de ejercicio | Alta | Sprint 1 |

### 3. Gestión de Planes de Entrenamiento

| User Story | Ticket | Título | Prioridad | Sprint |
|------------|--------|--------|-----------|--------|
| US-008 | [WT-008](./WT-008.md) | Implementar endpoint para crear plan de entrenamiento | Crítica | Sprint 2 |
| US-009 | [WT-009](./WT-009.md) | Implementar endpoint para listar planes de entrenamiento del usuario | Crítica | Sprint 2 |
| US-010 | [WT-010](./WT-010.md) | Implementar endpoint para obtener detalle de plan de entrenamiento | Crítica | Sprint 2 |
| US-011 | [WT-011](./WT-011.md) | Implementar endpoint para actualizar plan de entrenamiento | Crítica | Sprint 2 |
| US-012 | [WT-012](./WT-012.md) | Implementar endpoint para eliminar plan de entrenamiento | Alta | Sprint 2 |
| US-013 | [WT-013](./WT-013.md) | Implementar funcionalidad de comentarios en entrenamientos | Media | Sprint 3 |

### 4. Programación y Calendario

| User Story | Ticket | Título | Prioridad | Sprint |
|------------|--------|--------|-----------|--------|
| US-014 | [WT-014](./WT-014.md) | Implementar endpoint para programar entrenamiento con fecha y hora | Alta | Sprint 3 |
| US-015 | [WT-015](./WT-015.md) | Implementar endpoint para listar entrenamientos programados (calendario) | Alta | Sprint 3 |
| US-016 | [WT-016](./WT-016.md) | Implementar endpoint para marcar entrenamiento como completado | Alta | Sprint 3 |

### 5. Reportes y Analíticas

| User Story | Ticket | Título | Prioridad | Sprint |
|------------|--------|--------|-----------|--------|
| US-017 | [WT-017](./WT-017.md) | Implementar endpoint para generar reporte de progreso | Alta | Sprint 4 |
| US-018 | [WT-018](./WT-018.md) | Implementar endpoint para ver historial de entrenamientos completados | Alta | Sprint 4 |
| US-019 | [WT-019](./WT-019.md) | Implementar endpoint para análisis de tendencias por ejercicio | Media | Sprint 5 |

### 6. Agente IA - Workout Coach

| User Story | Ticket | Título | Prioridad | Sprint |
|------------|--------|--------|-----------|--------|
| US-020 | [WT-020](./WT-020.md) | Implementar endpoint de chat con Workout Coach (backend) | Crítica | Sprint 3 |
| US-020 | [WT-020-FE](./WT-020-FE.md) | Implementar componente de chat con Workout Coach (frontend) | Crítica | Sprint 3 |
| US-021 | [WT-021](./WT-021.md) | Implementar tool create_workout_plan en agente IA | Crítica | Sprint 4 |
| US-022 | [WT-022](./WT-022.md) | Implementar tools analyze_user_progress y get_recommendations | Alta | Sprint 5 |
| US-023 | [WT-023](./WT-023.md) | Implementar RAG con base de conocimiento fitness | Alta | Sprint 4 |
| US-024 | [WT-024](./WT-024.md) | Implementar tool update_workout en agente IA | Alta | Sprint 5 |
| US-025 | [WT-025](./WT-025.md) | Implementar tool schedule_workout en agente IA | Media | Sprint 5 |

### 7. Frontend Web - Dashboard

| User Story | Ticket | Título | Prioridad | Sprint |
|------------|--------|--------|-----------|--------|
| US-026 | [WT-026](./WT-026.md) | Implementar componente Dashboard principal | Alta | Sprint 3 |
| US-027 | [WT-027](./WT-027.md) | Implementar visualización de progreso en dashboard | Alta | Sprint 4 |

### 8. Frontend Web - Interfaz de Usuario

| User Story | Ticket | Título | Prioridad | Sprint |
|------------|--------|--------|-----------|--------|
| US-028 | [WT-028](./WT-028.md) | Implementar constructor de rutinas con drag & drop | Alta | Sprint 4 |
| US-029 | [WT-029](./WT-029.md) | Implementar calendario visual interactivo | Alta | Sprint 4 |
| US-030 | [WT-030](./WT-030.md) | Implementar biblioteca de ejercicios con búsqueda y filtros | Alta | Sprint 3 |
| US-031 | [WT-031](./WT-031.md) | Implementar chat integrado con Workout Coach (frontend) | Crítica | Sprint 3 |
| US-032 | [WT-032](./WT-032.md) | Implementar vista detallada de entrenamiento | Alta | Sprint 3 |
| US-033 | [WT-033](./WT-033.md) | Implementar reportes visuales con gráficos | Media | Sprint 5 |

---

## Estadísticas

- **Total User Stories:** 33
- **Total Tickets:** 35 (algunas US divididas en backend + frontend)
- **Tickets Críticos (P1):** 13
- **Tickets Alta Prioridad (P2):** 15
- **Tickets Media Prioridad (P3):** 7

---

## Distribución por Sprint

### Sprint 1: Fundación y Autenticación
- WT-001, WT-002, WT-003, WT-004, WT-005, WT-006, WT-007
- **Total:** 7 tickets

### Sprint 2: Gestión de Planes
- WT-008, WT-009, WT-010, WT-011, WT-012
- **Total:** 5 tickets

### Sprint 3: Frontend Básico y Agente IA Inicial
- WT-013, WT-014, WT-015, WT-016, WT-020, WT-020-FE, WT-026, WT-030, WT-031, WT-032
- **Total:** 10 tickets

### Sprint 4: Agente IA Avanzado y Reportes
- WT-017, WT-018, WT-021, WT-023, WT-027, WT-028, WT-029
- **Total:** 7 tickets

### Sprint 5: Optimización y Mejoras
- WT-019, WT-022, WT-024, WT-025, WT-033
- **Total:** 5 tickets

---

## Convenciones de Nomenclatura

- **WT-XXX:** Ticket principal de backend o funcionalidad completa
- **WT-XXX-FE:** Ticket específico de frontend (cuando se divide backend/frontend)
- **WT-XXX-BE:** Ticket específico de backend (cuando se divide backend/frontend)

---

## Estado de Implementación

| Estado | Descripción | Cantidad |
|--------|-------------|----------|
| ✅ Creado | Ticket creado con especificación completa | 8 |
| 📝 Pendiente | Ticket pendiente de creación | 27 |
| 🚧 En Progreso | Ticket en desarrollo | 0 |
| ✅ Completado | Ticket implementado y testeado | 0 |

---

## Notas

- Cada ticket tiene un máximo de 3 horas de esfuerzo estimado
- Si una funcionalidad requiere más de 3h, se divide en múltiples tickets
- Todos los tickets incluyen: descripción, criterios de aceptación, especificación técnica, tareas, dependencias y BDD

---

*Última actualización: 2026-02-08*
