# Backlog Priorizado - Workout Tracker

> Artefacto #4 - Priorización de Backlog  
> Fecha: 2026-02-08  
> Versión: 1.0

---

## Índice

- [1. Metodología de Priorización](#1-metodología-de-priorización)
- [2. Backlog Priorizado](#2-backlog-priorizado)
- [3. Roadmap por Sprints](#3-roadmap-por-sprints)
- [4. Dependencias Críticas](#4-dependencias-críticas)

---

## 1. Metodología de Priorización

### Criterios de Evaluación

1. **Impacto Usuario/Negocio** (Alto/Medio/Bajo)
   - Alto: Funcionalidad crítica sin la cual el producto no tiene valor
   - Medio: Funcionalidad importante que mejora significativamente la experiencia
   - Bajo: Funcionalidad deseable pero no bloqueante

2. **Urgencia** (Alta/Media/Baja)
   - Alta: Requisito explícito del PRD, diferenciador clave, tendencia de mercado
   - Media: Importante pero puede esperar al siguiente sprint
   - Baja: Mejora incremental, puede postergarse

3. **Complejidad** (Alta/Media/Baja)
   - Alta: Requiere integración compleja, múltiples componentes, investigación
   - Media: Implementación estándar con componentes conocidos
   - Baja: Implementación directa, funcionalidad simple

4. **Riesgos/Dependencias**
   - Dependencias técnicas: Requiere completar otras user stories primero
   - Dependencias de negocio: Bloquea otras funcionalidades
   - Riesgos técnicos: Tecnologías nuevas, integraciones complejas

### Niveles de Prioridad

- **P1 - Crítica (Must Have):** MVP core, sin esto el producto no funciona
- **P2 - Alta (Should Have):** Funcionalidad importante para MVP completo
- **P3 - Media (Nice to Have):** Mejora significativa, puede estar en v1.1
- **P4 - Baja (Future):** Post-MVP, mejoras incrementales

### Mapeo con Claves de Éxito del PRD

Las user stories se priorizan según las **12 Claves de Éxito Críticas** y **12 Claves de Éxito Deseables** definidas en el PRD:

- **Claves Críticas** → P1 o P2
- **Claves Deseables** → P2 o P3

---

## 2. Backlog Priorizado

| ID | User Story | Impacto | Urgencia | Complejidad | Riesgos/Dependencias | Prioridad | Sprint Sugerido |
|----|------------|---------|----------|-------------|---------------------|-----------|-----------------|
| **AUTENTICACIÓN Y GESTIÓN DE USUARIOS** |
| US-001 | Registro de Usuario | Alto | Alta | Baja | Ninguna | **P1** | Sprint 1 |
| US-002 | Inicio de Sesión | Alto | Alta | Baja | Requiere US-001 | **P1** | Sprint 1 |
| US-003 | Cierre de Sesión | Medio | Media | Baja | Requiere US-002 | **P2** | Sprint 1 |
| US-004 | Protección de Endpoints con JWT | Alto | Alta | Media | Requiere US-002, crítico para seguridad | **P1** | Sprint 1 |
| **CATÁLOGO DE EJERCICIOS** |
| US-005 | Seeder de Ejercicios Predefinidos | Alto | Alta | Baja | Ninguna, debe ejecutarse antes de US-006 | **P1** | Sprint 1 |
| US-006 | Listar Ejercicios Disponibles | Alto | Alta | Baja | Requiere US-005 | **P1** | Sprint 1 |
| US-007 | Obtener Detalle de Ejercicio | Medio | Media | Baja | Requiere US-005 | **P2** | Sprint 1 |
| **GESTIÓN DE PLANES DE ENTRENAMIENTO** |
| US-008 | Crear Plan de Entrenamiento | Alto | Alta | Media | Requiere US-004, US-006 | **P1** | Sprint 2 |
| US-009 | Listar Mis Planes de Entrenamiento | Alto | Alta | Baja | Requiere US-004, US-008 | **P1** | Sprint 2 |
| US-010 | Ver Detalle de Plan de Entrenamiento | Alto | Alta | Baja | Requiere US-004, US-008 | **P1** | Sprint 2 |
| US-011 | Actualizar Plan de Entrenamiento | Alto | Alta | Media | Requiere US-004, US-008 | **P1** | Sprint 2 |
| US-012 | Eliminar Plan de Entrenamiento | Medio | Media | Baja | Requiere US-004, US-008 | **P2** | Sprint 2 |
| US-013 | Agregar Comentarios a Entrenamiento | Medio | Baja | Baja | Requiere US-008 | **P3** | Sprint 3 |
| **PROGRAMACIÓN Y CALENDARIO** |
| US-014 | Programar Entrenamiento con Fecha y Hora | Medio | Media | Media | Requiere US-008 | **P2** | Sprint 3 |
| US-015 | Listar Entrenamientos Programados (Calendario) | Medio | Media | Media | Requiere US-014 | **P2** | Sprint 3 |
| US-016 | Marcar Entrenamiento como Completado | Medio | Media | Baja | Requiere US-014 | **P2** | Sprint 3 |
| **REPORTES Y ANALÍTICAS** |
| US-017 | Generar Reporte de Progreso | Medio | Media | Alta | Requiere US-008, US-016, cálculos complejos | **P2** | Sprint 4 |
| US-018 | Ver Historial de Entrenamientos Completados | Medio | Media | Baja | Requiere US-016 | **P2** | Sprint 4 |
| US-019 | Análisis de Tendencias por Ejercicio | Medio | Baja | Alta | Requiere US-017, análisis estadístico | **P3** | Sprint 5 |
| **AGENTE IA - WORKOUT COACH** |
| US-020 | Iniciar Conversación con Workout Coach | Alto | Alta | Alta | Integración LangGraph, WebSocket/polling | **P1** | Sprint 3 |
| US-021 | Crear Plan de Entrenamiento con Agente IA | Alto | Alta | Alta | Requiere US-020, US-008, tools del agente | **P1** | Sprint 4 |
| US-022 | Obtener Recomendaciones Basadas en Progreso | Alto | Alta | Alta | Requiere US-020, US-017, análisis de datos | **P2** | Sprint 5 |
| US-023 | Consultar Base de Conocimiento Fitness (RAG) | Alto | Alta | Alta | Requiere US-020, vector store, embeddings | **P2** | Sprint 4 |
| US-024 | Modificar Plan Existente con Agente IA | Medio | Media | Media | Requiere US-020, US-011 | **P2** | Sprint 5 |
| US-025 | Programar Entrenamiento con Agente IA | Medio | Baja | Media | Requiere US-020, US-014 | **P3** | Sprint 5 |
| **FRONTEND WEB - DASHBOARD** |
| US-026 | Dashboard Principal con Resumen | Alto | Alta | Media | Requiere US-002, múltiples endpoints | **P2** | Sprint 3 |
| US-027 | Visualización de Progreso en Dashboard | Medio | Media | Media | Requiere US-026, US-017, librería gráficos | **P2** | Sprint 4 |
| **FRONTEND WEB - INTERFAZ DE USUARIO** |
| US-028 | Constructor de Rutinas con Drag & Drop | Medio | Media | Alta | Requiere US-008, librería drag & drop | **P2** | Sprint 4 |
| US-029 | Calendario Visual Interactivo | Medio | Media | Alta | Requiere US-015, librería calendario, drag & drop | **P2** | Sprint 4 |
| US-030 | Biblioteca de Ejercicios con Búsqueda y Filtros | Medio | Media | Media | Requiere US-006, componentes de búsqueda | **P2** | Sprint 3 |
| US-031 | Chat Integrado con Workout Coach | Alto | Alta | Alta | Requiere US-020, componente chat, WebSocket | **P1** | Sprint 3 |
| US-032 | Vista Detallada de Entrenamiento | Alto | Alta | Baja | Requiere US-010, temporizador | **P2** | Sprint 3 |
| US-033 | Reportes Visuales con Gráficos | Medio | Baja | Alta | Requiere US-017, librería gráficos avanzada | **P3** | Sprint 5 |

---

## 3. Roadmap por Sprints

### Sprint 1: Fundación y Autenticación (MVP Core - Backend)
**Objetivo:** Establecer base de seguridad y datos

| User Story | Esfuerzo Estimado |
|------------|------------------|
| US-001: Registro de Usuario | 4h |
| US-002: Inicio de Sesión | 4h |
| US-004: Protección de Endpoints con JWT | 8h |
| US-005: Seeder de Ejercicios Predefinidos | 4h |
| US-006: Listar Ejercicios Disponibles | 4h |
| US-003: Cierre de Sesión | 2h |
| US-007: Obtener Detalle de Ejercicio | 2h |
| **Total Sprint 1** | **28h** |

**Entregables:**
- ✅ Sistema de autenticación JWT completo
- ✅ Catálogo de ejercicios funcional
- ✅ API protegida con aislamiento de datos por usuario

---

### Sprint 2: Gestión de Planes (MVP Core - Backend)
**Objetivo:** CRUD completo de entrenamientos

| User Story | Esfuerzo Estimado |
|------------|------------------|
| US-008: Crear Plan de Entrenamiento | 8h |
| US-009: Listar Mis Planes de Entrenamiento | 4h |
| US-010: Ver Detalle de Plan de Entrenamiento | 4h |
| US-011: Actualizar Plan de Entrenamiento | 6h |
| US-012: Eliminar Plan de Entrenamiento | 2h |
| **Total Sprint 2** | **24h** |

**Entregables:**
- ✅ CRUD completo de planes de entrenamiento
- ✅ Aislamiento total de datos por usuario
- ✅ API RESTful documentada (OpenAPI)

---

### Sprint 3: Frontend Básico y Agente IA Inicial
**Objetivo:** Interfaz web funcional y chat con agente

| User Story | Esfuerzo Estimado |
|------------|------------------|
| US-020: Iniciar Conversación con Workout Coach | 12h |
| US-031: Chat Integrado con Workout Coach | 8h |
| US-026: Dashboard Principal con Resumen | 8h |
| US-030: Biblioteca de Ejercicios con Búsqueda | 6h |
| US-032: Vista Detallada de Entrenamiento | 4h |
| US-014: Programar Entrenamiento con Fecha y Hora | 6h |
| US-015: Listar Entrenamientos Programados | 6h |
| US-016: Marcar Entrenamiento como Completado | 3h |
| **Total Sprint 3** | **53h** |

**Entregables:**
- ✅ Frontend SPA básico con Angular
- ✅ Chat funcional con agente IA
- ✅ Dashboard con resumen de actividad
- ✅ Programación de entrenamientos

---

### Sprint 4: Agente IA Avanzado y Reportes
**Objetivo:** Funcionalidades inteligentes y analíticas

| User Story | Esfuerzo Estimado |
|------------|------------------|
| US-021: Crear Plan de Entrenamiento con Agente IA | 12h |
| US-023: Consultar Base de Conocimiento Fitness (RAG) | 16h |
| US-017: Generar Reporte de Progreso | 10h |
| US-018: Ver Historial de Entrenamientos Completados | 4h |
| US-027: Visualización de Progreso en Dashboard | 6h |
| US-028: Constructor de Rutinas con Drag & Drop | 10h |
| US-029: Calendario Visual Interactivo | 12h |
| **Total Sprint 4** | **70h** |

**Entregables:**
- ✅ Agente IA con planificación inteligente
- ✅ RAG con base de conocimiento fitness
- ✅ Reportes de progreso con gráficos
- ✅ Constructor visual de rutinas
- ✅ Calendario interactivo

---

### Sprint 5: Optimización y Mejoras
**Objetivo:** Recomendaciones avanzadas y refinamientos

| User Story | Esfuerzo Estimado |
|------------|------------------|
| US-022: Obtener Recomendaciones Basadas en Progreso | 14h |
| US-024: Modificar Plan Existente con Agente IA | 8h |
| US-019: Análisis de Tendencias por Ejercicio | 10h |
| US-013: Agregar Comentarios a Entrenamiento | 4h |
| US-025: Programar Entrenamiento con Agente IA | 6h |
| US-033: Reportes Visuales con Gráficos | 12h |
| **Total Sprint 5** | **54h** |

**Entregables:**
- ✅ Recomendaciones proactivas del agente
- ✅ Análisis de tendencias avanzado
- ✅ Reportes visuales completos
- ✅ Funcionalidades de mejora incremental

---

## 4. Dependencias Críticas

### Cadena de Dependencias Técnicas

```
Sprint 1 (Fundación)
├── US-001, US-002, US-004 → Autenticación JWT
└── US-005, US-006 → Catálogo de Ejercicios
    │
Sprint 2 (CRUD)
├── US-008, US-009, US-010, US-011 → Gestión de Planes
└── Depende de: US-004 (JWT), US-006 (Ejercicios)
    │
Sprint 3 (Frontend + IA Básico)
├── US-020, US-031 → Agente IA y Chat
├── US-026, US-030, US-032 → Frontend Básico
└── US-014, US-015, US-016 → Programación
    │
Sprint 4 (IA Avanzado + Reportes)
├── US-021, US-023 → Agente IA Avanzado
├── US-017, US-018 → Reportes
└── US-027, US-028, US-029 → Frontend Avanzado
    │
Sprint 5 (Optimización)
└── US-022, US-024, US-019 → Análisis y Recomendaciones
```

### Dependencias de Negocio

1. **Agente IA requiere:**
   - Autenticación (US-004) para identificar usuario
   - Gestión de planes (US-008) para crear/modificar
   - Reportes (US-017) para análisis de progreso

2. **Frontend requiere:**
   - Todas las APIs del backend funcionando
   - Autenticación para proteger rutas

3. **Reportes requieren:**
   - Planes creados (US-008)
   - Entrenamientos completados (US-016)
   - Historial de datos suficiente

### Riesgos Identificados

| Riesgo | Impacto | Mitigación |
|--------|---------|------------|
| Integración LangGraph compleja | Alto | Prototipo temprano en Sprint 3, documentación clara |
| Vector Store para RAG | Medio | Usar solución probada (pgvector o Pinecone) |
| Performance de reportes con muchos datos | Medio | Paginación, índices en BD, caché |
| Drag & Drop en Angular | Bajo | Usar librería establecida (Angular CDK) |
| WebSocket para chat en tiempo real | Medio | Fallback a polling si WebSocket falla |

---

## 5. Resumen de Priorización

### Distribución por Prioridad

- **P1 - Crítica (Must Have):** 13 user stories
- **P2 - Alta (Should Have):** 15 user stories
- **P3 - Media (Nice to Have):** 5 user stories

### Distribución por Sprint

- **Sprint 1:** 7 user stories (28h) - Fundación
- **Sprint 2:** 5 user stories (24h) - CRUD
- **Sprint 3:** 8 user stories (53h) - Frontend + IA Básico
- **Sprint 4:** 7 user stories (70h) - IA Avanzado + Reportes
- **Sprint 5:** 6 user stories (54h) - Optimización

**Total estimado:** 229 horas (~6 semanas con equipo de 2 desarrolladores full-time)

---

## 6. Criterios de Éxito por Sprint

### Sprint 1 - Éxito si:
- ✅ Usuarios pueden registrarse e iniciar sesión
- ✅ JWT protege todos los endpoints
- ✅ Catálogo de ejercicios disponible con 50+ ejercicios

### Sprint 2 - Éxito si:
- ✅ Usuarios pueden crear, ver, editar y eliminar planes
- ✅ Cada usuario solo ve sus propios planes
- ✅ API documentada con OpenAPI/Swagger

### Sprint 3 - Éxito si:
- ✅ Frontend SPA funcional con dashboard
- ✅ Chat con agente IA responde mensajes básicos
- ✅ Usuarios pueden programar entrenamientos

### Sprint 4 - Éxito si:
- ✅ Agente IA crea planes personalizados
- ✅ RAG responde preguntas sobre fitness
- ✅ Reportes muestran progreso con gráficos

### Sprint 5 - Éxito si:
- ✅ Agente IA da recomendaciones basadas en progreso
- ✅ Análisis de tendencias identifica estancamientos
- ✅ Todas las funcionalidades críticas funcionan end-to-end

---

*Documento generado basado en PRD v1.1 y User Stories. Priorización sujeta a revisión en sprint planning y feedback de stakeholders.*
