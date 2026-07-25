# CLAUDE.md

Guidance for Claude Code (and any AI agent) working in this repository.

## Project

**ArchView · Field & Site** — construction site management SPA for architects
(vistorias, non-conformance tracking, photo reports, client portal). React SPA
with a custom design system, currently running on demo/mock data (no backend).

Stack: React 18 · Vite 6 · TypeScript · Tailwind CSS 3 · React Router · Recharts · lucide-react.

```
src/
  components/   # Layout (sidebar/topbar) and shared UI
  data/         # types + mock data
  lib/          # design tokens, helpers, theme
  pages/        # one page per module
docs/           # product backlog and working notes (not app code)
```

Commands:

```bash
npm run dev       # Vite dev server
npm run build     # tsc -b && vite build
npm run preview   # serve the build
npm run lint      # eslint .
```

## Code conventions

- Follow the existing patterns in `src/lib` (design tokens, `ui.ts` helpers) and
  `src/components/ui` before introducing new primitives — check for an existing
  `Badge`/`Avatar`/`Progress`/`Card` before writing a new one.
- Data is mocked in `src/data/mock.ts` / `src/data/types.ts`. Keep types there in
  sync with any UI that consumes them.
- No comments unless the *why* is non-obvious. No speculative abstractions for a
  single call site.

## Commit conventions

All commits are **atomic** and use **Conventional Commits, written in English**.

- **Atomic**: one logical change per commit. Don't bundle an unrelated fix with a
  feature, or touch files outside the change's scope. If a change has two
  unrelated purposes, split it into two commits.
- **Format**: `<type>(<optional scope>): <subject>`
  - Types: `feat`, `fix`, `docs`, `refactor`, `style`, `perf`, `test`, `chore`
  - Subject: imperative mood ("add", not "added"/"adds"), no trailing period,
    ideally ≤ 72 chars.
  - Body (optional, only when the *why* isn't obvious from the diff): wrap at
    ~72 chars, explain motivation/context, not a restatement of the diff.
- Examples:
  - `feat(kanban): add drag-and-drop between issue columns`
  - `fix(reports): correct PDF page break on long checklists`
  - `docs(backlog): mark BL-05 as in progress`
- Never combine `feat` + `fix` + `chore` in one commit. Never use vague subjects
  like "update stuff" or "fixes".

## Working notes

- `docs/backlog-whatsapp.md` — product backlog sourced from a WhatsApp feedback
  conversation. Each item has a stable `BL-##` id and a `Status:` line
  (`Backlog` / `A fazer` / `Em andamento` / `Concluído`). Treat the `Status:`
  line as the source of truth for what's actively being worked on.
- `.claude/rules/*.md` contains an unused agent-framework scaffold (references
  a `.agents/` directory that does not exist in this repo). It has no effect
  today — flagged here so it isn't mistaken for active project policy.
