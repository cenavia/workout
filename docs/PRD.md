# Workout Tracker

> Artefacto #1 - Diseño Inicial  
> Fecha: 2026-02-08  
> Versión: 1.1

---

## Índice

- [1. Descripción del Software](#1-descripción-del-software)
- [2. Arquitectura del Sistema](#2-arquitectura-del-sistema)
- [3. Análisis de Mercado](#3-análisis-de-mercado)
- [4. Valor Añadido y Ventajas Competitivas](#4-valor-añadido-y-ventajas-competitivas)
  - [4.1 Ventajas Críticas](#41-ventajas-críticas)
  - [4.2 Ventajas Deseables](#42-ventajas-deseables)
- [5. Funciones Principales](#5-funciones-principales)
  - [5.1 Backend API](#51-backend-api)
  - [5.2 Frontend Web](#52-frontend-web)
  - [5.3 Agente de IA - Workout Coach](#53-agente-de-ia---workout-coach)
- [6. Claves de Éxito Identificadas](#6-claves-de-éxito-identificadas)
- [Referencias](#referencias)

---

## 1. Descripción del Software

**¿Qué es?**  
Workout Tracker es una **plataforma integral de fitness** compuesta por tres componentes principales:

1. **Backend API (RESTful):** Sistema central que gestiona autenticación, datos de entrenamientos y reportes
2. **Frontend Web (SPA):** Interfaz de usuario moderna y responsiva para interactuar con la plataforma
3. **Agente de IA (Workout Coach):** Asistente inteligente conversacional que ayuda a los usuarios con planificación de entrenamientos, recomendaciones personalizadas y optimización de rutinas según sus objetivos

**¿Para quién?**  
- **Usuarios casuales de gimnasio:** Personas que entrenan ocasionalmente y quieren llevar un registro básico de sus actividades, con ayuda del agente IA para crear rutinas iniciales
- **Atletas y deportistas serios:** Personas con entrenamientos estructurados que buscan optimizar su rendimiento con recomendaciones basadas en datos
- **Entrenadores personales:** Profesionales que pueden gestionar rutinas para sus clientes y usar el agente como herramienta de apoyo
- **Gimnasios y centros fitness:** Establecimientos que pueden ofrecer la aplicación a sus miembros como valor agregado

**¿En qué contexto?**  
Aplicación web responsiva con interfaz intuitiva y un chatbot inteligente integrado que actúa como entrenador virtual, disponible 24/7 para asistir a los usuarios en su journey fitness.

**Problema que resuelve:**  
Los usuarios necesitan una forma centralizada, estructurada e inteligente de:
- Registrar y organizar sus entrenamientos con asistencia guiada
- **Recibir recomendaciones personalizadas** basadas en sus objetivos (pérdida de peso, ganancia muscular, resistencia, etc.)
- Crear planes de ejercicio optimizados con ayuda de IA
- **Obtener sugerencias de mejora** en sus rutinas según su progreso histórico
- Programar entrenamientos con recordatorios inteligentes
- Monitorear su progreso con análisis y insights generados por IA
- **Resolver dudas sobre técnica y ejercicios** mediante chat conversacional

---

## 2. Arquitectura del Sistema

### 2.1 Visión General

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              WORKOUT TRACKER                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────────┐    ┌──────────────────┐    ┌──────────────────────┐   │
│  │   FRONTEND WEB   │    │   BACKEND API    │    │   AGENTE IA          │   │
│  │    (Angular)     │◄──►│  (Spring Boot/   │◄──►│  (Workout Coach)     │   │
│  │                  │    │   Node.js)       │    │   (LangGraph/Python) │   │
│  │  • Dashboard     │    │                  │    │                      │   │
│  │  • Calendario    │    │  • Auth JWT      │    │  • Planificación     │   │
│  │  • Ejercicios    │    │  • CRUD Workouts │    │  • Recomendaciones   │   │
│  │  • Reportes      │    │  • Reportes      │    │  • Análisis progreso │   │
│  │  • Chat IA       │    │  • Ejercicios    │    │  • Q&A fitness       │   │
│  └──────────────────┘    └────────┬─────────┘    └──────────┬───────────┘   │
│                                   │                         │               │
│                                   ▼                         ▼               │
│                          ┌──────────────────┐    ┌──────────────────────┐   │
│                          │   PostgreSQL     │    │   Vector Store       │   │
│                          │   (Relacional)   │    │   (Embeddings)       │   │
│                          └──────────────────┘    └──────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Componentes del Sistema

| Componente | Tecnología Sugerida | Responsabilidades |
|------------|---------------------|-------------------|
| **Frontend Web** | Angular 19+ / React | Interfaz de usuario, visualización de datos, chat con agente |
| **Backend API** | Spring Boot 3.x / Node.js | Autenticación, lógica de negocio, persistencia, API REST |
| **Agente IA** | LangGraph + LangChain + OpenAI/Anthropic | Conversación, planificación inteligente, recomendaciones |
| **Base de Datos** | PostgreSQL | Almacenamiento relacional de usuarios, entrenamientos, ejercicios |
| **Vector Store** | pgvector / Pinecone / Chroma | Embeddings para RAG del agente (ejercicios, técnicas, FAQ) |

### 2.3 Flujo de Interacción con el Agente IA

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        FLUJO: Usuario ↔ Agente IA                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   Usuario                    Frontend                Agente IA               │
│     │                           │                       │                    │
│     │ "Quiero ganar músculo"    │                       │                    │
│     │──────────────────────────►│                       │                    │
│     │                           │  POST /chat           │                    │
│     │                           │──────────────────────►│                    │
│     │                           │                       │ Analiza objetivo   │
│     │                           │                       │ Consulta historial │
│     │                           │                       │ Busca ejercicios   │
│     │                           │  Respuesta + Plan     │ (RAG)              │
│     │                           │◄──────────────────────│                    │
│     │ Plan personalizado        │                       │                    │
│     │◄──────────────────────────│                       │                    │
│     │                           │                       │                    │
│     │ "¿Puedo modificar el      │                       │                    │
│     │  día de piernas?"         │                       │                    │
│     │──────────────────────────►│──────────────────────►│                    │
│     │                           │                       │ Ajusta plan        │
│     │                           │◄──────────────────────│ Guarda cambios     │
│     │ Plan actualizado          │                       │                    │
│     │◄──────────────────────────│                       │                    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.4 Capacidades del Agente IA (Workout Coach)

| Capacidad | Descripción | Herramientas/Tools |
|-----------|-------------|--------------------|
| **Planificación de rutinas** | Crear planes de entrenamiento personalizados según objetivos | `create_workout_plan`, `get_exercises_by_goal` |
| **Recomendaciones** | Sugerir ejercicios, ajustes de peso/reps basados en progreso | `analyze_progress`, `recommend_exercises` |
| **Análisis de progreso** | Interpretar histórico y dar insights sobre evolución | `get_user_stats`, `calculate_trends` |
| **Q&A Fitness** | Responder preguntas sobre técnica, nutrición básica, descanso | RAG sobre base de conocimiento fitness |
| **Modificación de planes** | Ajustar entrenamientos existentes según feedback | `update_workout`, `reschedule_workout` |
| **Motivación** | Recordatorios, celebración de logros, tips de consistencia | `get_achievements`, `send_reminder` |

---

## 3. Análisis de Mercado

### 3.1 Competidores Identificados

| Competidor | Fortalezas | Debilidades | Oportunidad de diferenciación |
|------------|-----------|-------------|-------------------------------|
| **MyFitnessPal** | Gran base de datos nutricional, comunidad establecida (150M+ usuarios) | Enfoque principal en nutrición, no en entrenamientos; historial de brechas de seguridad | Enfoque específico en entrenamiento con seguridad robusta |
| **Strong** | Interfaz simple, especializado en fuerza | Solo iOS/Android nativo, funcionalidades limitadas en versión gratuita | Plataforma web accesible, modelo de features escalable |
| **JEFIT** | Amplia biblioteca de ejercicios, planes predefinidos | Interfaz anticuada, sincronización lenta | UX moderna, API documentada para integraciones |
| **Fitbod** | Recomendaciones AI, personalización | Requiere suscripción, algoritmo opaco | Transparencia en lógica, API abierta y documentada |
| **Nike Training Club** | Gratuito, videos de alta calidad | Sin personalización real de rutinas, sin seguimiento detallado | Personalización completa de planes y métricas |

### 3.2 Tendencias del Sector

- **Personalización con IA:** Las aplicaciones de fitness están incorporando inteligencia artificial para ofrecer recomendaciones adaptadas según el WHO y ACSM.[1] **Workout Tracker implementa esto con el Agente Workout Coach.**
- **Chatbots y asistentes virtuales:** Creciente adopción de interfaces conversacionales para guiar usuarios en su journey fitness, disponibles 24/7.
- **Coaching personalizado escalable:** La IA permite ofrecer experiencia de entrenador personal a escala, democratizando el acceso a asesoría fitness.
- **Integración con wearables:** Conexión con fitness trackers y dispositivos IoT para sincronización automática de datos de actividad.[2]
- **Privacidad como prioridad:** Tras incidentes como la brecha de MyFitnessPal (150 millones de usuarios afectados), los usuarios valoran más la seguridad de sus datos.[3]
- **Gamificación:** Elementos competitivos entre usuarios para aumentar la motivación y retención.
- **Sincronización multiplataforma:** Acceso a datos desde cualquier dispositivo con backup en servidor.

### 3.3 Features Estándar del Mercado

| Feature | Presente en | Relevancia |
|---------|-------------|------------|
| Registro de usuarios y autenticación | 5/5 competidores | Crítica |
| Biblioteca de ejercicios | 5/5 competidores | Crítica |
| Planes de entrenamiento personalizados | 4/5 competidores | Crítica |
| Historial y reportes | 4/5 competidores | Alta |
| Programación de entrenamientos | 3/5 competidores | Media |
| Integración con wearables | 3/5 competidores | Media |
| Funciones sociales | 3/5 competidores | Baja |
| **Asistente IA/Chatbot** | 2/5 competidores | **Alta (tendencia)** |
| **Coaching personalizado** | 2/5 competidores | **Alta (diferenciador)** |

---

## 4. Valor Añadido y Ventajas Competitivas

### 4.1 Ventajas Críticas

1. **Autenticación JWT Robusta**  
   Sistema de autenticación basado en JSON Web Tokens que garantiza seguridad en cada endpoint, diferenciándose de competidores con historiales de brechas de seguridad. Permite sesiones seguras sin almacenamiento de estado en servidor.

2. **Aislamiento Total de Datos por Usuario**  
   Arquitectura que garantiza que cada usuario solo puede acceder a sus propios planes de entrenamiento, implementando autorización a nivel de recurso. Esto responde directamente a las preocupaciones de privacidad del mercado.

3. **API RESTful Completamente Documentada (OpenAPI)**  
   Documentación completa de endpoints siguiendo especificación OpenAPI, facilitando integraciones con terceros, desarrollo de frontends y potencial apertura como API pública. Diferenciador frente a apps cerradas.

4. **Gestión Completa de Entrenamientos (CRUD)**  
   Operaciones completas de crear, leer, actualizar y eliminar para planes de entrenamiento, con soporte para múltiples ejercicios por plan, incluyendo repeticiones, series y pesos configurables.

5. **Catálogo de Ejercicios Predefinido con Seeder**  
   Base de datos inicializada con ejercicios categorizados por tipo (cardio, fuerza, flexibilidad) y grupo muscular (pecho, espalda, piernas), acelerando el onboarding de usuarios.

6. **Base de Datos Relacional Bien Estructurada**  
   Esquema de base de datos relacional optimizado para consultas de progreso, reportes históricos y relaciones complejas entre usuarios, planes y ejercicios.

7. **Suite de Pruebas Unitarias**  
   Código respaldado por pruebas unitarias que garantizan la corrección y facilitan el mantenimiento evolutivo del sistema.

8. **Agente de IA Conversacional (Workout Coach)**  
   Asistente inteligente integrado que conversa con los usuarios para crear planes de entrenamiento personalizados, responder dudas sobre ejercicios y ofrecer recomendaciones basadas en sus objetivos y progreso histórico. **Diferenciador clave frente al 60% de competidores que no ofrecen esta funcionalidad.**

9. **Interfaz Web Moderna (SPA)**  
   Frontend responsivo con dashboard intuitivo, calendario de entrenamientos, visualización de progreso y chat integrado con el agente IA. Experiencia de usuario fluida y accesible desde cualquier navegador.

### 4.2 Ventajas Deseables

1. **Programación de Entrenamientos con Calendario**  
   Capacidad de agendar entrenamientos para fechas y horas específicas, con listado de entrenamientos activos/pendientes ordenados cronológicamente. Facilita la planificación semanal/mensual.

2. **Generación de Reportes de Progreso**  
   Sistema de reportes que analiza entrenamientos pasados y presenta métricas de progreso, permitiendo a los usuarios visualizar su evolución a lo largo del tiempo.

3. **Sistema de Comentarios en Entrenamientos**  
   Posibilidad de agregar notas y comentarios a cada entrenamiento completado, útil para registrar sensaciones, ajustes o recordatorios.

4. **Arquitectura Extensible para Integraciones**  
   Diseño de API que permite futuras integraciones con dispositivos wearables y fitness trackers, siguiendo la tendencia del mercado sin ser requisito inicial.

5. **Soporte Multicliente (Web/Móvil)**  
   Backend agnóstico que puede servir a aplicaciones web responsivas y, en el futuro, aplicaciones móviles nativas sin modificaciones.

6. **RAG (Retrieval-Augmented Generation) para Fitness**  
   Base de conocimiento vectorizada con información sobre ejercicios, técnicas, grupos musculares y principios de entrenamiento que el agente consulta para dar respuestas precisas y fundamentadas.

7. **Análisis Predictivo de Progreso**  
   El agente puede analizar tendencias en el historial del usuario y predecir cuándo alcanzará sus objetivos, sugiriendo ajustes proactivos.

8. **Memoria Conversacional**  
   El agente recuerda conversaciones previas y contexto del usuario para ofrecer una experiencia personalizada y coherente a lo largo del tiempo.

---

## 5. Funciones Principales

### 5.1 Backend API

#### 5.1.1 Gestión de Usuarios

Sistema completo de autenticación y autorización que incluye:

- **Registro (Sign-Up):** Creación de cuentas con validación de datos
- **Inicio de sesión (Login):** Autenticación con generación de JWT
- **Cierre de sesión (Logout):** Invalidación segura de tokens
- **Protección de endpoints:** Middleware de autorización JWT en todas las rutas protegidas

#### 5.1.2 Catálogo de Ejercicios

Gestión del repositorio de ejercicios disponibles:

- **Seeder inicial:** Población automática de la base de datos con ejercicios predefinidos
- **Estructura de ejercicio:** Nombre, descripción, categoría y grupo muscular
- **Categorías:** Cardio, fuerza, flexibilidad
- **Grupos musculares:** Pecho, espalda, piernas, hombros, brazos, core

#### 5.1.3 Gestión de Planes de Entrenamiento

Operaciones CRUD completas para entrenamientos:

- **Crear entrenamiento:** Definir plan con múltiples ejercicios, cada uno con series, repeticiones y peso
- **Listar entrenamientos:** Consulta de entrenamientos activos/pendientes ordenados por fecha
- **Actualizar entrenamiento:** Modificación de ejercicios, comentarios y parámetros
- **Eliminar entrenamiento:** Borrado de planes obsoletos o incorrectos

#### 5.1.4 Programación y Calendario

Sistema de agendamiento de entrenamientos:

- **Programar entrenamiento:** Asignar fecha y hora específica a un plan
- **Vista de calendario:** Listado cronológico de entrenamientos programados
- **Filtrado por estado:** Entrenamientos pendientes, completados, activos

#### 5.1.5 Reportes y Analíticas

Generación de informes de progreso:

- **Historial de entrenamientos:** Registro de todos los entrenamientos completados
- **Métricas de progreso:** Evolución de pesos, repeticiones y frecuencia
- **Reportes por período:** Análisis semanal, mensual o por rango de fechas

#### 5.1.6 Documentación API

Especificación completa de la API:

- **OpenAPI/Swagger:** Documentación interactiva de todos los endpoints
- **Ejemplos de uso:** Requests y responses de ejemplo para cada operación
- **Esquemas de datos:** Definición de modelos y validaciones

---

### 5.2 Frontend Web

#### 5.2.1 Dashboard Principal

Vista general del estado fitness del usuario:

- **Resumen de actividad:** Entrenamientos de la semana, racha activa, próximo entrenamiento
- **Métricas destacadas:** Progreso hacia objetivos, ejercicios favoritos, tiempo total
- **Acceso rápido:** Iniciar entrenamiento, chat con Workout Coach, ver calendario
- **Notificaciones:** Recordatorios, logros desbloqueados, tips del día

#### 5.2.2 Gestión de Entrenamientos

Interfaz para crear y gestionar planes:

- **Constructor de rutinas:** Drag & drop de ejercicios, configuración de series/reps/peso
- **Plantillas:** Rutinas predefinidas (PPL, Full Body, Upper/Lower) personalizables
- **Vista detallada:** Información completa del entrenamiento con historial de ejecuciones
- **Temporizador integrado:** Cronómetro para descansos entre series

#### 5.2.3 Calendario y Programación

Vista temporal de entrenamientos:

- **Vista mensual/semanal:** Entrenamientos programados con indicadores visuales
- **Arrastrar y soltar:** Reprogramar entrenamientos fácilmente
- **Estadísticas de adherencia:** Porcentaje de cumplimiento del plan

#### 5.2.4 Reportes y Progreso

Visualización de evolución:

- **Gráficos de progreso:** Evolución de pesos, volumen, frecuencia por ejercicio
- **Comparativas:** Semana actual vs anterior, mes actual vs anterior
- **Insights automáticos:** Destacados y alertas generados por el sistema
- **Exportación:** Descarga de reportes en PDF/CSV

#### 5.2.5 Biblioteca de Ejercicios

Exploración del catálogo:

- **Búsqueda y filtros:** Por grupo muscular, categoría, equipo necesario
- **Fichas de ejercicio:** Descripción, músculos trabajados, variaciones
- **Videos demostrativos:** (Futura implementación) Técnica correcta

---

### 5.3 Agente de IA - Workout Coach

#### 5.3.1 Interfaz de Chat

Experiencia conversacional integrada:

- **Chat embebido:** Ventana de chat accesible desde cualquier pantalla
- **Historial de conversaciones:** Acceso a chats anteriores
- **Sugerencias rápidas:** Prompts predefinidos para acciones comunes
- **Feedback:** Botones de útil/no útil para mejorar respuestas

#### 5.3.2 Planificación Inteligente

Creación asistida de planes:

- **Onboarding guiado:** El agente pregunta objetivos, disponibilidad, experiencia, limitaciones
- **Generación de plan:** Rutina completa adaptada al perfil del usuario
- **Explicación:** Justificación de por qué se seleccionaron ciertos ejercicios
- **Ajustes iterativos:** Refinamiento del plan mediante conversación

**Ejemplo de interacción:**
```
Usuario: "Quiero ganar masa muscular, puedo entrenar 4 días a la semana"

Workout Coach: "¡Perfecto! Para hipertrofia con 4 días, te recomiendo una
rutina Upper/Lower. ¿Tienes acceso a un gimnasio completo o entrenas en casa?
También, ¿hay algún ejercicio que debas evitar por lesiones?"

Usuario: "Gimnasio completo, tengo una molestia en el hombro derecho"

Workout Coach: "Entendido. Evitaré press militar y ejercicios que sobrecarguen
el hombro. He creado tu plan:

📋 **Tu Plan: Upper/Lower Hipertrofia**
- Lunes: Upper A (énfasis pecho/espalda)
- Martes: Lower A (énfasis cuádriceps)
- Jueves: Upper B (énfasis brazos/espalda)
- Viernes: Lower B (énfasis posterior)

¿Quieres que te muestre el detalle del Día 1?"
```

#### 5.3.3 Recomendaciones Basadas en Progreso

Optimización continua:

- **Detección de estancamiento:** Alerta cuando no hay progresión en ejercicios clave
- **Sugerencias de progresión:** Cuándo aumentar peso/reps según historial
- **Alternativas:** Proponer variaciones cuando un ejercicio no funciona
- **Deload automático:** Recomendar semanas de descarga cuando detecta fatiga acumulada

**Ejemplo:**
```
Workout Coach: "He notado que llevas 3 semanas con el mismo peso en press
banca (60kg). Basándome en tu progreso en otros ejercicios de empuje,
creo que estás listo para subir a 62.5kg. ¿Quieres que actualice tu plan?"
```

#### 5.3.4 Q&A Fitness (RAG)

Respuestas fundamentadas:

- **Base de conocimiento:** Información verificada sobre ejercicios, técnicas, anatomía
- **Respuestas contextuales:** Considera el historial y objetivos del usuario
- **Fuentes citadas:** Cuando aplica, menciona principios o estudios

**Ejemplo:**
```
Usuario: "¿Cuánto tiempo debo descansar entre series para hipertrofia?"

Workout Coach: "Para hipertrofia, el rango óptimo de descanso es 60-90
segundos para ejercicios de aislamiento y 2-3 minutos para compuestos
pesados como sentadilla o peso muerto. Esto permite recuperación
suficiente del sistema nervioso mientras mantienes tensión metabólica.

Dado que tu objetivo es ganancia muscular, te sugiero:
- Compuestos (sentadilla, press): 2-3 min
- Accesorios (curl, extensiones): 60-90 seg"
```

#### 5.3.5 Motivación y Seguimiento

Engagement del usuario:

- **Recordatorios inteligentes:** "Tienes entrenamiento de piernas hoy a las 6pm"
- **Celebración de logros:** "¡Nuevo récord personal en peso muerto! 🎉"
- **Check-ins proactivos:** "No has registrado entreno en 5 días, ¿todo bien?"
- **Tips personalizados:** Consejos basados en el contexto del usuario

#### 5.3.6 Herramientas del Agente (Tools)

| Tool | Descripción | Parámetros |
|------|-------------|------------|
| `create_workout_plan` | Genera un nuevo plan de entrenamiento | goal, days_per_week, equipment, restrictions |
| `get_exercises_by_criteria` | Busca ejercicios según filtros | muscle_group, category, equipment |
| `analyze_user_progress` | Analiza historial y calcula tendencias | user_id, date_range, metrics |
| `update_workout` | Modifica un entrenamiento existente | workout_id, changes |
| `get_user_context` | Obtiene perfil y preferencias del usuario | user_id |
| `schedule_workout` | Programa entrenamiento en fecha/hora | workout_id, datetime |
| `search_knowledge_base` | Consulta RAG sobre fitness | query |
| `get_recommendations` | Genera sugerencias de mejora | user_id, focus_area |

---

## 6. Claves de Éxito Identificadas

### Críticas

| # | Categoría | Clave de Éxito | Origen | Justificación |
|---|-----------|----------------|--------|---------------|
| 1 | Seguridad | Autenticación JWT completa | Usuario | Requisito explícito; estándar de la industria para APIs stateless |
| 2 | Seguridad | Aislamiento de datos por usuario | Usuario | "Solo acceder a sus propios planes"; crítico tras brechas de competidores |
| 3 | Funcionalidad | CRUD completo de entrenamientos | Usuario | Core del producto; sin esto no hay valor |
| 4 | Funcionalidad | Gestión de usuarios (registro/login/logout) | Usuario | Requisito explícito; base de toda la funcionalidad |
| 5 | Funcionalidad | Catálogo de ejercicios con seeder | Usuario | Requisito explícito; acelera onboarding |
| 6 | Datos | Base de datos relacional estructurada | Usuario | Restricción explícita; necesaria para relaciones complejas |
| 7 | Operación | Documentación OpenAPI | Usuario | Requisito explícito; diferenciador vs apps cerradas |
| 8 | Operación | Pruebas unitarias | Usuario | Requisito explícito; garantiza calidad |
| 9 | **IA** | **Agente Workout Coach conversacional** | Usuario | Requerimiento nuevo; diferenciador clave frente a 60% de competidores |
| 10 | **IA** | **Planificación inteligente de rutinas** | Usuario | Core del agente; genera planes personalizados según objetivos |
| 11 | **UX** | **Frontend web SPA moderno** | Usuario | Requerimiento nuevo; interfaz intuitiva accesible desde navegador |
| 12 | **UX** | **Chat integrado con agente IA** | Usuario | Punto de acceso principal para asistencia; disponible 24/7 |

### Deseables

| # | Categoría | Clave de Éxito | Origen | Justificación |
|---|-----------|----------------|--------|---------------|
| 1 | Funcionalidad | Programación con fecha/hora | Usuario | Agrega valor de planificación; presente en 3/5 competidores |
| 2 | Datos | Generación de reportes de progreso | Usuario | Diferenciador; permite visualizar evolución |
| 3 | Funcionalidad | Sistema de comentarios | Usuario | "Add comments"; útil para notas personales |
| 4 | Funcionalidad | Listado ordenado por fecha | Usuario | Mejora UX; facilita navegación |
| 5 | Integraciones | Arquitectura extensible para wearables | Web | Tendencia de mercado; no bloquea MVP |
| 6 | UX | Soporte multicliente (web/móvil) | Usuario | Plataforma web inicial; preparado para expansión |
| 7 | **IA** | **Recomendaciones basadas en progreso** | Usuario | Agente analiza historial y sugiere mejoras proactivas |
| 8 | **IA** | **RAG con base de conocimiento fitness** | Usuario | Respuestas precisas sobre técnica, ejercicios, principios |
| 9 | **IA** | **Memoria conversacional** | Usuario | Contexto persistente para experiencia personalizada |
| 10 | **IA** | **Detección de estancamiento** | Usuario | Alertas proactivas cuando no hay progresión |
| 11 | **UX** | **Dashboard con métricas visuales** | Usuario | Vista rápida de estado fitness y progreso |
| 12 | **UX** | **Calendario visual interactivo** | Usuario | Programación drag & drop de entrenamientos |

**Total claves:** 12 críticas, 12 deseables  
**Duplicados eliminados:** 5  
**Fuentes web consultadas:** 3

---

## Referencias

| # | Fuente | URL | Fecha de consulta |
|---|--------|-----|-------------------|
| 1 | Wikipedia - Fitness app | https://en.wikipedia.org/wiki/Fitness_app | 2026-02-08 |
| 2 | roadmap.sh - Workout Tracker Project | https://roadmap.sh/projects/fitness-workout-tracker | 2026-02-08 |
| 3 | The Guardian - MyFitnessPal data breach | https://www.theguardian.com/technology/2018/mar/30/hackers-steal-data-150m-myfitnesspal-app-users-under-armour | 2026-02-08 |

---

*Documento generado en fase de ideación. Sujeto a refinamiento en fases posteriores de diseño técnico.*
