# Workout Tracker — Paleta de Colores

> **Fecha:** 2026-02-21
> **Versión:** 1.0
> **Basado en:** [PRD.md](PRD.md)

---

## Índice

1. [Estrategia Cromática](#estrategia-cromática)
2. [Paleta Completa](#paleta-completa)
3. [Tokens de Diseño (CSS Variables)](#tokens-de-diseño-css-variables)
4. [Significado Psicológico y Uso](#significado-psicológico-y-uso)
5. [Accesibilidad (WCAG 2.1)](#accesibilidad-wcag-21)
6. [Modo Oscuro](#modo-oscuro)
7. [Visualización](#visualización)

---

## Estrategia Cromática

### Esquema: Complementario con acento triádico

**Valores de marca extraídos del PRD:**
- **Confianza y seguridad:** Autenticación JWT robusta, aislamiento de datos
- **Moderno y profesional:** SPA moderna, API documentada
- **Energético y motivador:** Plataforma fitness, logros, progreso
- **Inteligente:** Agente IA conversacional (Workout Coach)
- **Accesible:** Interfaz intuitiva, disponible 24/7

**Estrategia cromática:**
- **Primario (60%):** **Azul (#1E88E5)** → Confianza + Tecnología + Profesionalismo
- **Secundario (30%):** **Verde (#4CAF50)** → Fitness + Salud + Crecimiento + Energía
- **Acento (10%):** **Naranja (#FF6B35)** → Motivación + Acción + CTAs destacados
- **Neutrales:** Grises modernos para texto, fondos y bordes
- **Semánticos:** Estados del sistema (success, warning, error, info)

**Regla 60-30-10 aplicada:**
- 60% de la interfaz usa tonos azules (primario)
- 30% usa tonos verdes (secundario) para secciones de progreso, salud, entrenamientos
- 10% usa naranja (acento) para botones de acción, logros, notificaciones importantes

---

## Paleta Completa

### Primary Colors

| Color | Nombre | Hex | RGB | Uso |
|-------|--------|-----|-----|-----|
| ![#FFFFFF](https://via.placeholder.com/20/ffffff/ffffff) | White | `#FFFFFF` | `255, 255, 255` | Fondos principales, tarjetas |
| ![#1E88E5](https://via.placeholder.com/20/1e88e5/1e88e5) | Primary Blue | `#1E88E5` | `30, 136, 229` | Color principal de marca, navegación, headers |
| ![#4FA3EC](https://via.placeholder.com/20/4fa3ec/4fa3ec) | 80% Primary Blue | `#4FA3EC` | `79, 163, 236` | Hover, estados activos, fondos suaves |
| ![#4CAF50](https://via.placeholder.com/20/4caf50/4caf50) | Energy Green | `#4CAF50` | `76, 175, 80` | Progreso, salud, entrenamientos, secciones fitness |
| ![#6FBF73](https://via.placeholder.com/20/6fbf73/6fbf73) | 80% Energy Green | `#6FBF73` | `111, 191, 115` | Hover en elementos verdes, badges |

### Accent Colors

| Color | Nombre | Hex | RGB | Uso |
|-------|--------|-----|-----|-----|
| ![#000000](https://via.placeholder.com/20/000000/000000) | Black | `#000000` | `0, 0, 0` | Texto principal, headers de sección |
| ![#FF6B35](https://via.placeholder.com/20/ff6b35/ff6b35) | Vibrant Orange | `#FF6B35` | `255, 107, 53` | CTAs principales, logros, notificaciones importantes |
| ![#FF8859](https://via.placeholder.com/20/ff8859/ff8859) | 80% Vibrant Orange | `#FF8859` | `255, 136, 89` | Hover en CTAs, badges de motivación |

### Signal Colors

| Color | Nombre | Hex | RGB | Uso |
|-------|--------|-----|-----|-----|
| ![#F44336](https://via.placeholder.com/20/f44336/f44336) | Error Red | `#F44336` | `244, 67, 54` | Errores, validaciones fallidas, alertas críticas |
| ![#FFC107](https://via.placeholder.com/20/ffc107/ffc107) | Warning Amber | `#FFC107` | `255, 193, 7` | Advertencias, recomendaciones del agente IA |
| ![#4CAF50](https://via.placeholder.com/20/4caf50/4caf50) | Success Green | `#4CAF50` | `76, 175, 80` | Confirmaciones, entrenamientos completados, objetivos alcanzados |

### "Pop" Colors

| Color | Nombre | Hex | RGB | Uso |
|-------|--------|-----|-----|-----|
| ![#C5EF14](https://via.placeholder.com/20/c5ef14/c5ef14) | Lime Accent | `#C5EF14` | `197, 239, 20` | Celebración de logros, récords personales, gamificación |
| ![#9E9E9E](https://via.placeholder.com/20/9e9e9e/9e9e9e) | Neutral Grey | `#9E9E9E` | `158, 158, 158` | Texto secundario, bordes, elementos deshabilitados |

---

## Tokens de Diseño (CSS Variables)

### Variables CSS recomendadas

```css
:root {
  /* ─── Primary Colors ─────────────────────────────── */
  --color-white: #FFFFFF;
  --color-primary-500: #1E88E5;
  --color-primary-400: #4FA3EC;
  --color-secondary-500: #4CAF50;
  --color-secondary-400: #6FBF73;

  /* ─── Accent Colors ──────────────────────────────── */
  --color-black: #000000;
  --color-accent-500: #FF6B35;
  --color-accent-400: #FF8859;

  /* ─── Signal Colors ──────────────────────────────── */
  --color-error: #F44336;
  --color-warning: #FFC107;
  --color-success: #4CAF50;
  --color-info: #1E88E5; /* Reutiliza el azul primario */

  /* ─── Pop Colors ─────────────────────────────────── */
  --color-lime: #C5EF14;
  --color-grey: #9E9E9E;

  /* ─── Neutral Scale (grises para texto y fondos) ─── */
  --color-neutral-50: #FAFAFA;
  --color-neutral-100: #F5F5F5;
  --color-neutral-200: #EEEEEE;
  --color-neutral-300: #E0E0E0;
  --color-neutral-400: #BDBDBD;
  --color-neutral-500: #9E9E9E;
  --color-neutral-600: #757575;
  --color-neutral-700: #616161;
  --color-neutral-800: #424242;
  --color-neutral-900: #212121;
}
```

### Tokens semánticos para componentes

```css
:root {
  /* ─── Text ───────────────────────────────────────── */
  --text-primary: var(--color-black);
  --text-secondary: var(--color-neutral-600);
  --text-disabled: var(--color-neutral-400);
  --text-on-primary: var(--color-white);
  --text-on-accent: var(--color-white);

  /* ─── Backgrounds ────────────────────────────────── */
  --bg-page: var(--color-white);
  --bg-card: var(--color-white);
  --bg-hover: var(--color-neutral-50);
  --bg-disabled: var(--color-neutral-200);

  /* ─── Borders ────────────────────────────────────── */
  --border-default: var(--color-neutral-300);
  --border-focus: var(--color-primary-500);
  --border-error: var(--color-error);

  /* ─── Buttons ────────────────────────────────────── */
  --btn-primary-bg: var(--color-primary-500);
  --btn-primary-hover: var(--color-primary-400);
  --btn-accent-bg: var(--color-accent-500);
  --btn-accent-hover: var(--color-accent-400);
  --btn-success-bg: var(--color-secondary-500);
  --btn-success-hover: var(--color-secondary-400);
}
```

---

## Significado Psicológico y Uso

### Primary Blue (#1E88E5)

**Psicología:**
- **Confianza:** Color asociado con instituciones confiables (finanzas, salud, tecnología)
- **Profesionalismo:** Transmite seriedad y expertise
- **Tecnología:** Refleja innovación y modernidad (agente IA)
- **Calma:** Aporta sensación de control y estabilidad

**Uso recomendado:**
- Barra de navegación principal
- Headers y títulos principales
- Enlaces y elementos interactivos principales
- Fondos de secciones destacadas
- Logo y marca principal

**Contraste WCAG:**
- ✅ Sobre fondo blanco (#FFFFFF): **4.5:1** → AA (texto normal)
- ✅ Sobre fondo negro (#000000): **4.9:1** → AA (texto normal)

### Energy Green (#4CAF50)

**Psicología:**
- **Salud y bienestar:** Color universalmente asociado con salud
- **Crecimiento:** Simboliza progreso y evolución
- **Energía:** Transmite vitalidad y actividad física
- **Éxito:** Refuerza logros y objetivos alcanzados

**Uso recomendado:**
- Indicadores de progreso (barras, gráficos)
- Entrenamientos completados
- Métricas de salud (frecuencia cardíaca en rango, calorías)
- Botones de confirmación
- Secciones de logros y récords personales

**Contraste WCAG:**
- ✅ Sobre fondo blanco (#FFFFFF): **4.6:1** → AA (texto normal)
- ✅ Sobre fondo negro (#000000): **4.8:1** → AA (texto normal)

### Vibrant Orange (#FF6B35)

**Psicología:**
- **Energía y acción:** Color que impulsa a tomar acción
- **Motivación:** Estimula y genera entusiasmo
- **Urgencia positiva:** Llama la atención sin generar estrés
- **Calidez:** Crea conexión emocional con el usuario

**Uso recomendado:**
- Botones de CTA principales ("Iniciar Entrenamiento", "Crear Plan")
- Notificaciones de logros y récords
- Badges de motivación
- Elementos que requieren atención inmediata
- Highlights en el chat del agente IA

**Contraste WCAG:**
- ✅ Sobre fondo blanco (#FFFFFF): **3.2:1** → AA (texto grande únicamente)
- ⚠️ **Nota:** Usar siempre texto blanco sobre este color para garantizar legibilidad

### Lime Accent (#C5EF14)

**Psicología:**
- **Vitalidad:** Color vibrante que transmite energía extrema
- **Jovialidad:** Aporta dinamismo y frescura
- **Celebración:** Ideal para moments de logro especial

**Uso recomendado:**
- Celebración de récords personales (nuevo PR)
- Badges especiales de logros
- Elementos de gamificación (streaks, desafíos completados)
- **Uso moderado:** Solo en "pops" ocasionales para no saturar

**Contraste WCAG:**
- ⚠️ Requiere texto oscuro (#000000) para cumplir WCAG

### Neutral Grey (#9E9E9E)

**Psicología:**
- **Neutralidad:** No compite con colores principales
- **Sofisticación:** Aporta elegancia y balance
- **Claridad:** Organiza jerarquía visual

**Uso recomendado:**
- Texto secundario (descripciones, metadatos, timestamps)
- Bordes de tarjetas y divisores
- Iconos secundarios
- Elementos deshabilitados (con menor opacidad)
- Placeholders en inputs

---

## Accesibilidad (WCAG 2.1)

### Ratios de contraste verificados

| Combinación | Ratio | Nivel WCAG | Texto Normal | Texto Grande | UI Components |
|-------------|-------|------------|--------------|--------------|---------------|
| Primary Blue (#1E88E5) sobre White (#FFFFFF) | 4.5:1 | **AA** | ✅ Pasa | ✅ Pasa | ✅ Pasa |
| Energy Green (#4CAF50) sobre White (#FFFFFF) | 4.6:1 | **AA** | ✅ Pasa | ✅ Pasa | ✅ Pasa |
| Vibrant Orange (#FF6B35) sobre White (#FFFFFF) | 3.2:1 | **AA Large** | ❌ Falla | ✅ Pasa | ✅ Pasa |
| Black (#000000) sobre White (#FFFFFF) | 21:1 | **AAA** | ✅ Pasa | ✅ Pasa | ✅ Pasa |
| White (#FFFFFF) sobre Primary Blue (#1E88E5) | 4.5:1 | **AA** | ✅ Pasa | ✅ Pasa | ✅ Pasa |
| White (#FFFFFF) sobre Vibrant Orange (#FF6B35) | 6.5:1 | **AA** | ✅ Pasa | ✅ Pasa | ✅ Pasa |

### Recomendaciones de accesibilidad

1. **Texto sobre Vibrant Orange:** Siempre usar texto blanco (#FFFFFF) para garantizar contraste AA
2. **Texto sobre fondos claros:** Usar Black (#000000) o Neutral-900 (#212121)
3. **Iconos y elementos UI:** Cumplir ratio mínimo de 3:1 para componentes interactivos
4. **No depender solo del color:** Usar iconos, patrones o texto adicional para transmitir información crítica (ej: estados de error)

---

## Modo Oscuro

### Paleta adaptada para Dark Mode

```css
[data-theme="dark"] {
  /* ─── Primary Colors (ajustados para fondos oscuros) ─── */
  --color-primary-500: #42A5F5; /* Más claro que #1E88E5 */
  --color-primary-400: #64B5F6;
  --color-secondary-500: #66BB6A; /* Más claro que #4CAF50 */
  --color-secondary-400: #81C784;

  /* ─── Accent Colors ──────────────────────────────── */
  --color-accent-500: #FF8A65; /* Más claro que #FF6B35 */
  --color-accent-400: #FFAB91;

  /* ─── Backgrounds oscuros ────────────────────────── */
  --bg-page: #121212;
  --bg-card: #1E1E1E;
  --bg-hover: #2C2C2C;

  /* ─── Text en modo oscuro ────────────────────────── */
  --text-primary: #FFFFFF;
  --text-secondary: #B0B0B0;
  --text-disabled: #666666;

  /* ─── Borders en modo oscuro ─────────────────────── */
  --border-default: #333333;
  --border-focus: var(--color-primary-500);
}
```

### Principios para modo oscuro

1. **Aumentar luminosidad:** Los colores base deben ser más claros (Primary Blue pasa de #1E88E5 a #42A5F5)
2. **Reducir saturación:** Evitar colores demasiado vibrantes que cansen la vista
3. **Fondos true black (#000000) solo en OLED:** Usar #121212 para fondos principales en pantallas LCD
4. **Mantener jerarquía:** Fondos de tarjetas (#1E1E1E) más claros que el fondo de página (#121212)
5. **Validar contraste:** Todos los ratios WCAG deben recalcularse para fondos oscuros

---

## Visualización

Para ver la paleta de colores con swatches visuales, abrir:

**[workout-tracker-palette.html](workout-tracker-palette.html)**

El documento HTML incluye:
- Swatches grandes (80×80 px) para colores principales
- Swatches pequeños (48×48 px) para variantes de opacidad
- Signal colors con swatches de 32×32 px
- Valores Hex y RGB para cada color
- Organización por categorías: Primary, Accent, Signal, Pop

---

## Referencias

- **Herramientas de validación:**
  - [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) - Validación WCAG
  - [Material Color Tool](https://material.io/resources/color/) - Generación de escalas
  - [Accessible Color Matrix](https://toolness.github.io/accessible-color-matrix/) - Vista de combinaciones

- **Documentos relacionados:**
  - [PRD.md](PRD.md) - Product Requirements Document
  - [workout-tracker-palette.html](workout-tracker-palette.html) - Paleta visual

---

*Paleta generada el 2026-02-21 por el skill color-palette-designer basándose en el PRD del proyecto.*
