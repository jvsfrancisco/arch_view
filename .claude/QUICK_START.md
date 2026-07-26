# Quick Start Commands

---

## Development

```bash
npm install          # required — node_modules is not checked in
npm run dev          # Vite dev server on http://localhost:5173
npm run build        # tsc -b && vite build
npm run preview      # serve the production build
npm run kanban       # backlog board on http://localhost:5175
```

## Typecheck

```bash
npx tsc --noEmit -p tsconfig.json
```

Do not run `tsc -b --noEmit` — it fails with TS6310 because of the project
references. Use the command above, or `npm run build`.

## Not working

`npm run lint` is broken: there is no `eslint.config.js` and ESLint is not in
`devDependencies`. Typecheck is the real gate.

---

**Last Updated**: 2026-07-26
