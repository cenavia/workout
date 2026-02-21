# Workout Tracker UI Skeleton

This folder contains the complete visual skeleton requested for the project, implemented with semantic HTML + CSS and driven by centralized design tokens.

## Source-of-truth mapping

- PRD `docs/PRD.md` section `5.2.1` maps to `index.html` (dashboard summary, highlighted metrics, quick access, notifications).
- PRD `docs/PRD.md` section `5.2.2` maps to `workouts.html` (routine builder, templates, detailed workout flow).
- PRD `docs/PRD.md` section `5.2.3` maps to `calendar.html` (monthly/weekly calendar, scheduling, adherence).
- PRD `docs/PRD.md` section `5.2.4` maps to `reports.html` (progress charts, period comparison, exports).
- PRD `docs/PRD.md` section `5.2.5` maps to `exercises.html` (search/filter library and exercise cards).
- PRD `docs/PRD.md` section `5.3.1` maps to `coach.html` (embedded chat, suggestions, feedback actions).
- Style guide `docs/ui-desing/light-mode-style-guide.html` maps to `styles/tokens.css` (colors, semantics, shadows, radius, spacing, dimensions).
- Style guide `docs/ui-desing/light-mode-style-guide.html` also maps to `styles/app.css` (navbar/sidebar behavior, cards, buttons, focus rings, alerts).

## File structure

- `styles/tokens.css`: design tokens only (single source).
- `styles/app.css`: shared layout and component skeleton styles.
- `index.html`: dashboard view.
- `workouts.html`: workouts management view.
- `calendar.html`: scheduling view.
- `reports.html`: analytics view.
- `exercises.html`: exercise library view.
- `coach.html`: AI coach chat view.

## Token rules

- Use `var(--token-name)` only; avoid hardcoded design values in page-level styles.
- Keep all design primitives in `styles/tokens.css` (colors, spacing, shadows, radius, dimensions, breakpoint vars).
- Reuse shared primitives from `styles/app.css` before creating page-specific classes.
- If a new token is needed, add it in `styles/tokens.css` and reference the originating style-guide section.

## UI states coverage

Each page includes placeholders for:
- `loading` (skeleton + `aria-busy="true"`),
- `empty`,
- `error` (`role="alert"`),
- `offline`,
- `with data`.

## Accessibility guardrails

- `<html lang="es">` aligned with project language context in PRD.
- Semantic landmarks used on every page: `<header>`, `<nav>`, `<aside>`, `<main>`, `<section>`, `<article>`.
- Focus visibility is preserved with explicit focus styles.
- Dynamic response regions (chat feed) use `aria-live="polite"`.
- Icon-only or non-textual controls include `aria-label`.
- Color usage follows light-mode guide contrast constraints (AA references in style-guide accessibility section).

## Performance choices (no external dependencies)

- CSS token file loaded first, shared stylesheet deferred with `media="print"` + `onload`.
- Shared stylesheet preloaded with `<link rel="preload" as="style">`.
- Minimal critical style is inlined in each page `<head>` for above-the-fold stability.
- Non-critical preview image uses `loading="lazy"`.

## Active breakpoints

The style guide provides layout dimensions and behavior but does not provide numeric breakpoint values.  
Fallback used: Tailwind defaults (documented as required by skill workflow).

| Breakpoint | Width | Mobile-first behavior |
|---|---:|---|
| Base | `< 640px` | Single-column main content, collapsed nav behavior |
| `sm` | `>= 640px` | Two-column content grids where applicable |
| `md` | `>= 768px` | Collapsed sidebar visible (`64px`) |
| `lg` | `>= 1024px` | Full sidebar (`240px`) + desktop header navigation |
| `xl` | `>= 1280px` | Wider content support under max width (`1120px`) |

## Extension checklist

- Confirm new section exists in PRD before adding new visual blocks.
- Confirm token exists in style-guide before introducing new color/radius/shadow.
- Add all 5 states (`loading`, `empty`, `error`, `offline`, `with data`) for each new view.
- Keep semantic landmarks and ARIA attributes consistent.
- Preserve mobile-first behavior and only use documented breakpoints.

## Maintenance notes

- Evolve this skeleton by replacing placeholders with real components incrementally.
- Keep one HTML file per PRD view unless PRD is updated.
- If PRD or style-guide changes, update this README mapping first, then update files.
# Workout Tracker UI Flow

This folder contains the interface flow design package aligned to:

- `docs/PRD.md`
- `docs/ui-desing/light-mode-style-guide.html`

## Contents

- `interface-flow.md`: UX flow, IA, route map, screen catalog, wireframes, accessibility checklist
- `components.md`: reusable component documentation (variants, states, accessibility notes)
- `pages/`: semantic HTML + Tailwind implementations for key views

## View pages locally

Open any file in `pages/` directly in the browser, or serve the repository root with a static server.
