# User Stories - Workout Tracker

> Artefacto #3 - Historias de Usuario  
> Fecha: 2026-02-08  
> Versión: 1.0

---

## Índice

- [1. Autenticación y Gestión de Usuarios](#1-autenticación-y-gestión-de-usuarios)
- [2. Catálogo de Ejercicios](#2-catálogo-de-ejercicios)
- [3. Gestión de Planes de Entrenamiento](#3-gestión-de-planes-de-entrenamiento)
- [4. Programación y Calendario](#4-programación-y-calendario)
- [5. Reportes y Analíticas](#5-reportes-y-analíticas)
- [6. Agente IA - Workout Coach](#6-agente-ia---workout-coach)
- [7. Frontend Web - Dashboard](#7-frontend-web---dashboard)
- [8. Frontend Web - Interfaz de Usuario](#8-frontend-web---interfaz-de-usuario)

---

## 1. Autenticación y Gestión de Usuarios

### US-001: Registro de Usuario

**Como** usuario nuevo  
**Quiero** registrarme en la plataforma con email y contraseña  
**Para** poder acceder a todas las funcionalidades de Workout Tracker

#### Criterios de Aceptación
- [ ] El usuario puede registrarse proporcionando email, contraseña y nombre
- [ ] La contraseña debe cumplir requisitos de seguridad (mínimo 8 caracteres)
- [ ] El email debe ser único y válido
- [ ] Se valida que el email no esté ya registrado
- [ ] Se envía confirmación de registro exitoso
- [ ] Los datos se almacenan de forma segura en la base de datos

#### Notas Técnicas
- Endpoint: `POST /api/auth/register`
- Validación de email con regex
- Hash de contraseña con bcrypt
- Respuesta incluye mensaje de éxito

---

### US-002: Inicio de Sesión

**Como** usuario registrado  
**Quiero** iniciar sesión con mis credenciales  
**Para** acceder a mi cuenta y datos de entrenamientos

#### Criterios de Aceptación
- [ ] El usuario puede iniciar sesión con email y contraseña
- [ ] Se valida que las credenciales sean correctas
- [ ] Se genera un JWT token al autenticarse exitosamente
- [ ] El token se incluye en la respuesta
- [ ] Se retorna error 401 si las credenciales son incorrectas
- [ ] El token tiene expiración configurada

#### Notas Técnicas
- Endpoint: `POST /api/auth/login`
- JWT con expiración de 24 horas (configurable)
- Payload del token incluye user_id y email
- Respuesta: `{ token: string, user: { id, email, name } }`

---

### US-003: Cierre de Sesión

**Como** usuario autenticado  
**Quiero** cerrar sesión de forma segura  
**Para** proteger mi cuenta cuando termine de usar la aplicación

#### Criterios de Aceptación
- [ ] El usuario puede cerrar sesión desde cualquier pantalla
- [ ] El token JWT se invalida o se elimina del cliente
- [ ] Se redirige al usuario a la pantalla de login
- [ ] No se puede acceder a rutas protegidas después del logout

#### Notas Técnicas
- Endpoint: `POST /api/auth/logout` (opcional, principalmente cliente)
- Eliminación de token del localStorage/sessionStorage
- Invalidación opcional en blacklist de tokens (si se implementa)

---

### US-004: Protección de Endpoints con JWT

**Como** sistema  
**Quiero** validar JWT en todas las rutas protegidas  
**Para** garantizar que solo usuarios autenticados accedan a sus datos

#### Criterios de Aceptación
- [ ] Todos los endpoints excepto `/auth/*` requieren token JWT
- [ ] Se valida la firma y expiración del token
- [ ] Se retorna 401 si el token es inválido o expirado
- [ ] El user_id del token se extrae y se usa para filtrar datos
- [ ] Cada usuario solo puede acceder a sus propios recursos

#### Notas Técnicas
- Middleware de autenticación JWT
- Extracción de `user_id` del payload del token
- Validación en cada request protegido

---

## 2. Catálogo de Ejercicios

### US-005: Seeder de Ejercicios Predefinidos

**Como** administrador del sistema  
**Quiero** que la base de datos se inicialice con ejercicios predefinidos  
**Para** que los usuarios tengan ejercicios disponibles desde el inicio

#### Criterios de Aceptación
- [ ] Existe un script/comando para poblar la base de datos con ejercicios
- [ ] Los ejercicios incluyen: nombre, descripción, categoría, grupo muscular
- [ ] Se categorizan por tipo: cardio, fuerza, flexibilidad
- [ ] Se agrupan por músculo: pecho, espalda, piernas, hombros, brazos, core
- [ ] El seeder es idempotente (puede ejecutarse múltiples veces sin duplicar)
- [ ] Mínimo 50 ejercicios predefinidos

#### Notas Técnicas
- Script de migración/seeder
- Datos en JSON o SQL
- Validación de existencia antes de insertar

---

### US-006: Listar Ejercicios Disponibles

**Como** usuario  
**Quiero** ver el catálogo completo de ejercicios disponibles  
**Para** poder seleccionar ejercicios al crear mis rutinas

#### Criterios de Aceptación
- [ ] El usuario puede listar todos los ejercicios disponibles
- [ ] Se puede filtrar por categoría (cardio, fuerza, flexibilidad)
- [ ] Se puede filtrar por grupo muscular (pecho, espalda, piernas, etc.)
- [ ] Se puede buscar por nombre
- [ ] La respuesta incluye: id, nombre, descripción, categoría, grupo muscular
- [ ] Los resultados están paginados

#### Notas Técnicas
- Endpoint: `GET /api/exercises`
- Query params: `?category=strength&muscle_group=chest&search=press`
- Paginación: `?page=1&limit=20`

---

### US-007: Obtener Detalle de Ejercicio

**Como** usuario  
**Quiero** ver información detallada de un ejercicio específico  
**Para** entender cómo realizarlo correctamente

#### Criterios de Aceptación
- [ ] El usuario puede consultar un ejercicio por su ID
- [ ] Se muestra: nombre, descripción completa, categoría, grupo muscular
- [ ] Se retorna 404 si el ejercicio no existe
- [ ] La información es clara y útil

#### Notas Técnicas
- Endpoint: `GET /api/exercises/:id`
- Respuesta con objeto ejercicio completo

---

## 3. Gestión de Planes de Entrenamiento

### US-008: Crear Plan de Entrenamiento

**Como** usuario  
**Quiero** crear un nuevo plan de entrenamiento con múltiples ejercicios  
**Para** organizar mis rutinas de forma estructurada

#### Criterios de Aceptación
- [ ] El usuario puede crear un plan con nombre y descripción
- [ ] Puede agregar múltiples ejercicios al plan
- [ ] Para cada ejercicio puede especificar: series, repeticiones, peso
- [ ] El plan se asocia automáticamente al usuario autenticado
- [ ] Se valida que todos los ejercicios existan
- [ ] Se retorna el plan creado con su ID

#### Notas Técnicas
- Endpoint: `POST /api/workouts`
- Body: `{ name, description, exercises: [{ exercise_id, sets, reps, weight }] }`
- Validación de existencia de ejercicios
- Transacción para garantizar integridad

---

### US-009: Listar Mis Planes de Entrenamiento

**Como** usuario  
**Quiero** ver todos mis planes de entrenamiento  
**Para** poder seleccionar, editar o ejecutar uno

#### Criterios de Aceptación
- [ ] El usuario solo ve sus propios planes (aislamiento de datos)
- [ ] Los planes se listan ordenados por fecha de creación (más recientes primero)
- [ ] Se puede filtrar por estado: activos, completados, pendientes
- [ ] Cada plan muestra: nombre, fecha creación, número de ejercicios, estado
- [ ] Los resultados están paginados

#### Notas Técnicas
- Endpoint: `GET /api/workouts`
- Query params: `?status=active&page=1&limit=10`
- Filtrado por `user_id` del token JWT
- Ordenamiento por `created_at DESC`

---

### US-010: Ver Detalle de Plan de Entrenamiento

**Como** usuario  
**Quiero** ver los detalles completos de un plan específico  
**Para** revisar los ejercicios, series, repeticiones y pesos configurados

#### Criterios de Aceptación
- [ ] El usuario puede consultar un plan por su ID
- [ ] Solo puede ver sus propios planes (retorna 403 si es de otro usuario)
- [ ] Se muestra: nombre, descripción, fecha creación, estado
- [ ] Se listan todos los ejercicios con: nombre, series, repeticiones, peso
- [ ] Se muestra historial de ejecuciones si existe

#### Notas Técnicas
- Endpoint: `GET /api/workouts/:id`
- Validación de propiedad del recurso
- Respuesta con plan completo y ejercicios relacionados

---

### US-011: Actualizar Plan de Entrenamiento

**Como** usuario  
**Quiero** modificar un plan de entrenamiento existente  
**Para** ajustar ejercicios, series, repeticiones o pesos según mi progreso

#### Criterios de Aceptación
- [ ] El usuario puede actualizar nombre, descripción y ejercicios del plan
- [ ] Solo puede modificar sus propios planes
- [ ] Puede agregar, eliminar o modificar ejercicios del plan
- [ ] Se valida que los nuevos ejercicios existan
- [ ] Se retorna el plan actualizado

#### Notas Técnicas
- Endpoint: `PUT /api/workouts/:id`
- Body parcial: solo se envían campos a modificar
- Validación de propiedad antes de actualizar

---

### US-012: Eliminar Plan de Entrenamiento

**Como** usuario  
**Quiero** eliminar un plan de entrenamiento  
**Para** mantener mi lista organizada y eliminar planes obsoletos

#### Criterios de Aceptación
- [ ] El usuario puede eliminar un plan por su ID
- [ ] Solo puede eliminar sus propios planes
- [ ] Se confirma la eliminación antes de proceder (frontend)
- [ ] Se retorna 204 No Content al eliminar exitosamente
- [ ] Se retorna 404 si el plan no existe o 403 si no es del usuario

#### Notas Técnicas
- Endpoint: `DELETE /api/workouts/:id`
- Soft delete o hard delete según requerimiento
- Validación de propiedad

---

### US-013: Agregar Comentarios a Entrenamiento

**Como** usuario  
**Quiero** agregar comentarios y notas a mis entrenamientos  
**Para** registrar sensaciones, ajustes o recordatorios para futuras sesiones

#### Criterios de Aceptación
- [ ] El usuario puede agregar un comentario a un plan de entrenamiento
- [ ] El comentario se guarda asociado al plan
- [ ] Puede editar o eliminar sus propios comentarios
- [ ] Los comentarios se muestran en el detalle del plan
- [ ] Se puede agregar comentario al completar un entrenamiento

#### Notas Técnicas
- Endpoint: `POST /api/workouts/:id/comments`
- Campo `comments` en tabla workouts o tabla separada
- Validación de longitud máxima

---

## 4. Programación y Calendario

### US-014: Programar Entrenamiento con Fecha y Hora

**Como** usuario  
**Quiero** asignar una fecha y hora específica a un plan de entrenamiento  
**Para** organizar mi semana y recibir recordatorios

#### Criterios de Aceptación
- [ ] El usuario puede programar un plan para una fecha y hora específica
- [ ] Se valida que la fecha sea futura o del día actual
- [ ] Un plan puede tener múltiples programaciones (recurrente)
- [ ] Se puede cancelar o modificar una programación
- [ ] La programación incluye: plan_id, fecha, hora, estado (pendiente/completado)

#### Notas Técnicas
- Endpoint: `POST /api/workouts/:id/schedule`
- Body: `{ scheduled_date, scheduled_time }`
- Tabla `workout_schedules` o campo en `workouts`

---

### US-015: Listar Entrenamientos Programados (Calendario)

**Como** usuario  
**Quiero** ver mis entrenamientos programados ordenados cronológicamente  
**Para** tener una vista clara de mi planificación semanal/mensual

#### Criterios de Aceptación
- [ ] Los entrenamientos se listan ordenados por fecha y hora (ascendente)
- [ ] Se puede filtrar por rango de fechas (semana, mes, rango personalizado)
- [ ] Se puede filtrar por estado: pendientes, completados
- [ ] Cada entrada muestra: nombre del plan, fecha, hora, estado
- [ ] Los entrenamientos pasados se marcan como completados o pendientes

#### Notas Técnicas
- Endpoint: `GET /api/workouts/scheduled`
- Query params: `?start_date=2026-02-01&end_date=2026-02-28&status=pending`
- Ordenamiento por `scheduled_date, scheduled_time ASC`

---

### US-016: Marcar Entrenamiento como Completado

**Como** usuario  
**Quiero** marcar un entrenamiento programado como completado  
**Para** llevar registro de mi adherencia al plan

#### Criterios de Aceptación
- [ ] El usuario puede marcar un entrenamiento como completado
- [ ] Se puede marcar desde la vista de calendario o detalle
- [ ] Al completar, se puede registrar el peso real usado (si difiere del plan)
- [ ] Se actualiza el estado del entrenamiento programado
- [ ] Se registra la fecha/hora de completado

#### Notas Técnicas
- Endpoint: `PATCH /api/workouts/:id/complete`
- Body: `{ completed_at, actual_exercises: [{ exercise_id, sets, reps, weight }] }`
- Actualización de estado y registro de ejecución

---

## 5. Reportes y Analíticas

### US-017: Generar Reporte de Progreso

**Como** usuario  
**Quiero** ver un reporte de mi progreso en un período determinado  
**Para** visualizar mi evolución y tomar decisiones sobre mi rutina

#### Criterios de Aceptación
- [ ] El usuario puede generar reportes por rango de fechas
- [ ] El reporte incluye: número de entrenamientos, frecuencia semanal
- [ ] Muestra evolución de pesos y repeticiones por ejercicio
- [ ] Calcula volumen total (series × reps × peso) por ejercicio
- [ ] Identifica tendencias: aumento, disminución, estancamiento
- [ ] Se puede exportar en formato PDF o CSV

#### Notas Técnicas
- Endpoint: `GET /api/reports/progress`
- Query params: `?start_date=2026-01-01&end_date=2026-02-08`
- Cálculos agregados en base de datos
- Generación de PDF con librería (p.ej., pdfkit)

---

### US-018: Ver Historial de Entrenamientos Completados

**Como** usuario  
**Quiero** ver el historial completo de mis entrenamientos completados  
**Para** revisar mi actividad pasada y comparar rendimientos

#### Criterios de Aceptación
- [ ] Se listan todos los entrenamientos completados ordenados por fecha (más recientes primero)
- [ ] Cada entrada muestra: nombre del plan, fecha de ejecución, ejercicios realizados
- [ ] Se puede filtrar por plan específico
- [ ] Se puede filtrar por rango de fechas
- [ ] Los resultados están paginados

#### Notas Técnicas
- Endpoint: `GET /api/workouts/history`
- Query params: `?workout_id=123&start_date=...&end_date=...&page=1`
- Filtrado por `status=completed` y `user_id`

---

### US-019: Análisis de Tendencias por Ejercicio

**Como** usuario atleta serio  
**Quiero** ver la evolución de un ejercicio específico a lo largo del tiempo  
**Para** identificar si estoy progresando o estancado

#### Criterios de Aceptación
- [ ] El usuario puede seleccionar un ejercicio y ver su evolución
- [ ] Se muestra gráfico de línea con evolución de peso a lo largo del tiempo
- [ ] Se muestra evolución de repeticiones y volumen
- [ ] Se identifican períodos de estancamiento (sin progreso en X semanas)
- [ ] Se calcula tasa de progresión promedio

#### Notas Técnicas
- Endpoint: `GET /api/reports/exercise/:exercise_id/trends`
- Query params: `?start_date=...&end_date=...`
- Cálculo de tendencias con regresión lineal o media móvil
- Respuesta con datos para gráfico (fechas, valores)

---

## 6. Agente IA - Workout Coach

### US-020: Iniciar Conversación con Workout Coach

**Como** usuario  
**Quiero** abrir un chat con el agente Workout Coach  
**Para** recibir asistencia personalizada sobre entrenamientos

#### Criterios de Aceptación
- [ ] El usuario puede abrir la interfaz de chat desde cualquier pantalla
- [ ] El chat muestra historial de conversaciones previas
- [ ] El usuario puede escribir mensajes en lenguaje natural
- [ ] El agente responde de forma conversacional y útil
- [ ] La interfaz es responsiva y fácil de usar

#### Notas Técnicas
- Endpoint: `POST /api/chat/message`
- Integración con agente LangGraph
- WebSocket o polling para respuestas en tiempo real
- Almacenamiento de historial de conversación

---

### US-021: Crear Plan de Entrenamiento con Agente IA

**Como** usuario casual  
**Quiero** que el agente IA me guíe para crear mi primer plan de entrenamiento  
**Para** tener una rutina personalizada sin necesidad de conocimientos previos

#### Criterios de Aceptación
- [ ] El usuario puede pedir al agente crear un plan
- [ ] El agente pregunta: objetivos, disponibilidad, experiencia, limitaciones
- [ ] El agente genera un plan completo con ejercicios, series, reps, pesos
- [ ] El plan se guarda automáticamente en la cuenta del usuario
- [ ] El agente explica por qué seleccionó ciertos ejercicios
- [ ] El usuario puede pedir ajustes al plan generado

#### Notas Técnicas
- Tool del agente: `create_workout_plan`
- Parámetros: `goal, days_per_week, equipment, restrictions`
- El agente llama al endpoint `POST /api/workouts` internamente
- Respuesta conversacional con detalles del plan creado

---

### US-022: Obtener Recomendaciones Basadas en Progreso

**Como** usuario  
**Quiero** que el agente analice mi progreso y me dé recomendaciones  
**Para** optimizar mi rutina y evitar estancamientos

#### Criterios de Aceptación
- [ ] El usuario puede pedir recomendaciones al agente
- [ ] El agente analiza el historial de entrenamientos del usuario
- [ ] Identifica ejercicios con estancamiento (sin progreso en X semanas)
- [ ] Sugiere aumentos de peso/reps cuando detecta que el usuario está listo
- [ ] Propone ejercicios alternativos si uno no funciona
- [ ] Recomienda deloads cuando detecta fatiga acumulada

#### Notas Técnicas
- Tool del agente: `analyze_user_progress` y `get_recommendations`
- El agente consulta `GET /api/reports/progress` y `GET /api/reports/exercise/:id/trends`
- Análisis de tendencias y generación de sugerencias
- Respuesta con justificación basada en datos

---

### US-023: Consultar Base de Conocimiento Fitness (RAG)

**Como** usuario  
**Quiero** hacer preguntas sobre técnica, ejercicios o principios de entrenamiento  
**Para** resolver dudas sin necesidad de buscar en internet

#### Criterios de Aceptación
- [ ] El usuario puede hacer preguntas sobre fitness en lenguaje natural
- [ ] El agente consulta la base de conocimiento vectorizada (RAG)
- [ ] Las respuestas son precisas y fundamentadas
- [ ] El agente considera el contexto del usuario (objetivos, historial)
- [ ] Se pueden hacer preguntas sobre: técnica, grupos musculares, descanso, nutrición básica

#### Notas Técnicas
- Tool del agente: `search_knowledge_base`
- Vector store con embeddings de documentos fitness
- Retrieval de documentos relevantes y generación de respuesta
- Contexto del usuario incluido en el prompt

---

### US-024: Modificar Plan Existente con Agente IA

**Como** usuario  
**Quiero** pedir al agente que modifique un plan de entrenamiento existente  
**Para** ajustar mi rutina según mi evolución o cambios en objetivos

#### Criterios de Aceptación
- [ ] El usuario puede pedir modificar un plan específico
- [ ] El agente pregunta qué cambios desea (ejercicios, series, reps, peso)
- [ ] El agente actualiza el plan usando la API
- [ ] El agente explica los cambios realizados
- [ ] El usuario puede deshacer cambios si no está satisfecho

#### Notas Técnicas
- Tool del agente: `update_workout`
- El agente llama a `PUT /api/workouts/:id`
- Conversación iterativa para refinar cambios

---

### US-025: Programar Entrenamiento con Agente IA

**Como** usuario  
**Quiero** pedir al agente que programe un entrenamiento en mi calendario  
**Para** organizar mi semana de forma conversacional

#### Criterios de Aceptación
- [ ] El usuario puede pedir programar un plan para una fecha/hora
- [ ] El agente pregunta fecha y hora si no se especifican
- [ ] El agente programa el entrenamiento usando la API
- [ ] Confirma la programación con detalles
- [ ] Puede programar múltiples entrenamientos en una conversación

#### Notas Técnicas
- Tool del agente: `schedule_workout`
- El agente llama a `POST /api/workouts/:id/schedule`
- Parsing de fechas/horas en lenguaje natural

---

## 7. Frontend Web - Dashboard

### US-026: Dashboard Principal con Resumen

**Como** usuario  
**Quiero** ver un dashboard con resumen de mi actividad fitness  
**Para** tener una vista rápida de mi estado y progreso

#### Criterios de Aceptación
- [ ] El dashboard muestra: entrenamientos de la semana, racha activa, próximo entrenamiento
- [ ] Muestra métricas destacadas: progreso hacia objetivos, ejercicios favoritos
- [ ] Incluye acceso rápido: iniciar entrenamiento, chat con Workout Coach, ver calendario
- [ ] Muestra notificaciones: recordatorios, logros, tips del día
- [ ] El diseño es responsivo y visualmente atractivo

#### Notas Técnicas
- Componente Angular: `DashboardComponent`
- Llamadas a múltiples endpoints para obtener datos
- Caché de datos para mejorar rendimiento
- Diseño con cards y gráficos (Chart.js o similar)

---

### US-027: Visualización de Progreso en Dashboard

**Como** usuario  
**Quiero** ver gráficos de mi progreso en el dashboard  
**Para** visualizar rápidamente mi evolución sin navegar a reportes

#### Criterios de Aceptación
- [ ] Se muestra gráfico de frecuencia de entrenamientos (últimas 4 semanas)
- [ ] Se muestra gráfico de evolución de peso en ejercicios principales
- [ ] Los gráficos son interactivos (hover para ver detalles)
- [ ] Se puede cambiar el período de visualización (semana, mes, 3 meses)

#### Notas Técnicas
- Librería de gráficos: Chart.js, D3.js o ng2-charts
- Datos desde `GET /api/reports/progress`
- Componentes reutilizables para gráficos

---

## 8. Frontend Web - Interfaz de Usuario

### US-028: Constructor de Rutinas con Drag & Drop

**Como** usuario  
**Quiero** crear rutinas arrastrando ejercicios a un plan  
**Para** construir mis entrenamientos de forma visual e intuitiva

#### Criterios de Aceptación
- [ ] El usuario puede buscar ejercicios y arrastrarlos a su plan
- [ ] Puede configurar series, repeticiones y peso para cada ejercicio
- [ ] Puede reordenar ejercicios arrastrándolos
- [ ] Puede eliminar ejercicios del plan
- [ ] Se valida que el plan tenga al menos un ejercicio antes de guardar

#### Notas Técnicas
- Librería de drag & drop: Angular CDK Drag & Drop o ngx-dnd
- Componente: `WorkoutBuilderComponent`
- Validación en frontend y backend

---

### US-029: Calendario Visual Interactivo

**Como** usuario  
**Quiero** ver mis entrenamientos programados en un calendario visual  
**Para** planificar mi semana de forma clara

#### Criterios de Aceptación
- [ ] El calendario muestra vista mensual o semanal
- [ ] Los entrenamientos programados se muestran en el día correspondiente
- [ ] Se puede hacer clic en un día para ver/editar entrenamientos
- [ ] Se puede arrastrar un entrenamiento a otro día para reprogramarlo
- [ ] Los días con entrenamientos se destacan visualmente

#### Notas Técnicas
- Librería de calendario: FullCalendar, Angular Calendar o custom
- Componente: `CalendarComponent`
- Integración con drag & drop para reprogramar

---

### US-030: Biblioteca de Ejercicios con Búsqueda y Filtros

**Como** usuario  
**Quiero** explorar el catálogo de ejercicios con búsqueda y filtros  
**Para** encontrar ejercicios adecuados para mis objetivos

#### Criterios de Aceptación
- [ ] El usuario puede buscar ejercicios por nombre
- [ ] Puede filtrar por categoría (cardio, fuerza, flexibilidad)
- [ ] Puede filtrar por grupo muscular (pecho, espalda, piernas, etc.)
- [ ] Los resultados se muestran en cards con imagen (futuro) y descripción
- [ ] Al hacer clic en un ejercicio se muestra ficha detallada

#### Notas Técnicas
- Componente: `ExerciseLibraryComponent`
- Búsqueda en tiempo real con debounce
- Filtros combinables (múltiples selecciones)
- Llamada a `GET /api/exercises` con query params

---

### US-031: Chat Integrado con Workout Coach

**Como** usuario  
**Quiero** chatear con el agente IA desde cualquier pantalla  
**Para** recibir asistencia sin interrumpir mi flujo de trabajo

#### Criterios de Aceptación
- [ ] El chat está disponible como componente flotante o sidebar
- [ ] Se puede abrir/cerrar desde cualquier pantalla
- [ ] Muestra historial de conversación
- [ ] El usuario puede escribir mensajes y recibir respuestas
- [ ] Muestra indicador de "escribiendo..." mientras el agente procesa
- [ ] Incluye sugerencias rápidas de prompts comunes

#### Notas Técnicas
- Componente: `ChatComponent` (flotante o sidebar)
- WebSocket o polling para mensajes en tiempo real
- Integración con `POST /api/chat/message`
- UI moderna tipo chat (burbujas, avatares)

---

### US-032: Vista Detallada de Entrenamiento

**Como** usuario  
**Quiero** ver todos los detalles de un entrenamiento específico  
**Para** revisar ejercicios, series, reps y ejecutar el plan

#### Criterios de Aceptación
- [ ] Se muestra información completa del plan: nombre, descripción, fecha creación
- [ ] Se listan todos los ejercicios con: nombre, series, repeticiones, peso
- [ ] Se muestra historial de ejecuciones anteriores
- [ ] El usuario puede editar o eliminar el plan desde esta vista
- [ ] Puede marcar el entrenamiento como completado
- [ ] Incluye temporizador para descansos entre series

#### Notas Técnicas
- Componente: `WorkoutDetailComponent`
- Ruta: `/workouts/:id`
- Llamada a `GET /api/workouts/:id`
- Temporizador con Web Audio API para sonidos

---

### US-033: Reportes Visuales con Gráficos

**Como** usuario atleta serio  
**Quiero** ver reportes de progreso con gráficos interactivos  
**Para** analizar mi evolución de forma visual

#### Criterios de Aceptación
- [ ] Se muestran gráficos de línea para evolución de peso por ejercicio
- [ ] Se muestran gráficos de barras para volumen total por semana
- [ ] Se muestran gráficos de frecuencia de entrenamientos
- [ ] Los gráficos son interactivos (zoom, hover, tooltips)
- [ ] Se puede seleccionar rango de fechas
- [ ] Se puede exportar el reporte en PDF

#### Notas Técnicas
- Componente: `ReportsComponent`
- Librería de gráficos: Chart.js, D3.js o ng2-charts
- Datos desde `GET /api/reports/progress`
- Exportación PDF con jsPDF o similar

---

## Resumen de User Stories

| Categoría | Cantidad | Prioridad |
|-----------|----------|-----------|
| Autenticación | 4 | 🔴 Crítica |
| Catálogo Ejercicios | 3 | 🔴 Crítica |
| Gestión Planes | 6 | 🔴 Crítica |
| Programación/Calendario | 3 | 🟡 Alta |
| Reportes | 3 | 🟡 Alta |
| Agente IA | 6 | 🔴 Crítica |
| Frontend Dashboard | 2 | 🟡 Alta |
| Frontend UI | 6 | 🟡 Alta |
| **TOTAL** | **33** | |

---

*Documento generado basado en PRD v1.1. User Stories sujetas a refinamiento en sprint planning.*
