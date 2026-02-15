## Ticket: WT-020-FE

**Título:** Implementar componente de chat con Workout Coach (frontend)
**Tipo:** [FEATURE]
**Estimación:** 3h
**Prioridad:** Crítica
**Asignado a:** Sin asignar
**Sprint:** Sprint 3

---

### Descripción

Implementar componente de chat en Angular que permite al usuario interactuar con el agente Workout Coach. El componente debe ser accesible desde cualquier pantalla (flotante o sidebar), mostrar historial de conversación y manejar el envío/recepción de mensajes.

### User Story Relacionada

**Como** usuario  
**Quiero** chatear con el agente IA desde cualquier pantalla  
**Para** recibir asistencia sin interrumpir mi flujo de trabajo

---

### Criterios de Aceptación

- [ ] Componente ChatComponent creado
- [ ] Chat disponible como componente flotante o sidebar
- [ ] Se puede abrir/cerrar desde cualquier pantalla
- [ ] Muestra historial de conversación
- [ ] Usuario puede escribir y enviar mensajes
- [ ] Muestra indicador "escribiendo..." mientras agente procesa
- [ ] Incluye sugerencias rápidas de prompts comunes
- [ ] UI moderna tipo chat (burbujas, avatares)
- [ ] Responsive design
- [ ] Tests implementados

---

### Especificación Técnica

#### Componentes Frontend

| Componente | Ubicación | Descripción |
|------------|-----------|-------------|
| ChatComponent | `workout-app/src/app/shared/components/chat/` | Componente principal |
| ChatService | `workout-app/src/app/services/chat.service.ts` | Servicio de comunicación |

#### Archivos a Modificar

- `workout-app/src/app/shared/components/chat/chat.component.ts`
- `workout-app/src/app/shared/components/chat/chat.component.html`
- `workout-app/src/app/shared/components/chat/chat.component.scss`
- `workout-app/src/app/services/chat.service.ts`
- `workout-app/src/app/models/chat.model.ts`

---

### Tareas Técnicas

1. [ ] Crear modelo TypeScript para mensajes y conversación
2. [ ] Implementar ChatService con método sendMessage()
3. [ ] Crear componente ChatComponent
4. [ ] Implementar UI de chat (burbujas, input, botón enviar)
5. [ ] Implementar historial de conversación
6. [ ] Agregar indicador de "escribiendo..."
7. [ ] Implementar sugerencias rápidas
8. [ ] Hacer componente flotante/sidebar (toggle)
9. [ ] Estilos responsivos
10. [ ] Escribir tests unitarios
11. [ ] Code review

---

### Dependencias

- **Bloqueado por:** WT-020 (Backend chat), WT-002 (Login)
- **Bloquea a:** WT-031 (Chat integrado - mismo componente)
- **Relacionado con:** WT-020, WT-031

---

### Requisitos No Funcionales

- **UX:** 
  - Animaciones suaves
  - Scroll automático a último mensaje
  - Auto-focus en input
- **Performance:** 
  - Lazy loading del componente
  - Debounce en envío de mensajes

---

### Notas Adicionales

- Usar librería de UI para chat o implementar custom
- Considerar WebSocket para mensajes en tiempo real (futuro)
- El componente debe ser reutilizable y accesible globalmente
