Please analyze and fix the Jira ticket: $ARGUMENTS for the **Node.js/TypeScript** stack (workout-core API).

Follow these steps:

1. Understand the problem described in the ticket.
2. Search the codebase in `workout-core/` for relevant files (see ai-specs/specs/backend-standards.mdc globs).
3. Start a new branch (e.g. feature/TICKET-123-node or feature/WT-010-node).
4. Implement following the plan in ai-specs/changes/[ticket_id]_node.md if it exists, in order: tests, code, documentation.
5. Ensure code passes linting (`npm run lint`) and type checking (`npm run build`).
6. Stage only files affected by the ticket. Create a descriptive commit message.
7. Push and create a PR with the ticket ID for traceability.

Use project rules from ai-specs/specs/base-standards.mdc, ai-specs/specs/backend-standards.mdc, and ai-specs/specs/documentation-standards.mdc. Adopt the role defined in ai-specs/.agents/node-developer.md when working on this technology.
