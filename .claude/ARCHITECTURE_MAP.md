# Architecture Map

---

## Directory Structure

```
src/
├── components/
│   ├── Layout.tsx        # sidebar, topbar, "Novo" menu, Genie card
│   └── ui.tsx            # Card, Avatar, AvatarStack, Badge, Progress, Ring
├── data/
│   ├── types.ts          # every domain type (Project, Issue, Inspection, PhotoRecord…)
│   └── mock.ts           # all demo data — the app has no backend
├── lib/
│   ├── theme.tsx         # light/dark provider, persists to localStorage
│   └── ui.ts             # gradients, date formatting, status/priority metadata
└── pages/                # one file per route
scripts/
├── kanban-server.mjs     # local server that writes docs/backlog-whatsapp.md
└── kanban.html           # the board it serves
docs/
└── backlog-whatsapp.md   # product backlog, BL-## ids + Status lines
```

## Key File Locations

- **Routes**: `src/App.tsx`
- **Main entry**: `src/main.tsx` → `index.html`
- **Design tokens**: `tailwind.config.js` + `src/lib/ui.ts`
- **Domain types**: `src/data/types.ts` (change here first, then `mock.ts`)
- **Tests**: none yet

## Data flow

There is no API layer. Pages import directly from `@/data/mock` and filter in
place (`photos.filter(p => p.projectId === id)`). Interactive state is local
`useState` and resets on reload — that is intentional for the demo.

---

**Last Updated**: 2026-07-26
