# Common Mistakes

**⚠️ CRITICAL - Read at session start**

---

## 1. Typechecking with `tsc -b --noEmit`

**Symptom**: `error TS6310: Referenced project 'tsconfig.node.json' may not disable emit`.
**Cause**: the repo uses project references; `-b` and `--noEmit` conflict.
**Fix**: run `npx tsc --noEmit -p tsconfig.json`, or just `npm run build`.

## 2. Trusting a typecheck without `node_modules`

**Symptom**: `npx tsc` reports "No errors found" on code that cannot compile.
**Cause**: `node_modules` is not checked in; npx pulls a bare compiler that
resolves nothing.
**Check**: `test -d node_modules` before believing a green result.
**Fix**: `npm install` first.

## 3. Treating `npm run lint` as a gate

**Symptom**: the script errors out or returns nothing useful.
**Cause**: there is no `eslint.config.js` and ESLint is not a devDependency.
**Fix**: use the typecheck as the gate. Don't "fix" lint output that isn't real.

## 4. Adding a field to a domain type and stopping there

**Symptom**: TS errors across `mock.ts` after editing `src/data/types.ts`.
**Cause**: every object literal in `mock.ts` must satisfy the type — there are
5 projects and a dozen photo records, all written out by hand.
**Fix**: update `types.ts` and every literal in `mock.ts` in the same change.

## 5. Reading `.claude/rules/*.md` as project policy

**Symptom**: instructions referencing `.agents/`, a Socratic Gate, `checklist.py`.
**Cause**: leftover scaffold from another framework; the `.agents/` directory
does not exist in this repo.
**Fix**: ignore it. `CLAUDE.md` is the real policy file.

## 6. Commits failing at the end of a long session

**Symptom**: `gpg: signing failed: Timeout` / `fatal: failed to write commit object`.
**Cause**: commits are GPG-signed and the cached passphrase expired.
**Fix**: ask the user to unlock the key (`echo test | gpg --clearsign`), then
retry. Never work around it with `--no-gpg-sign`.

---

**Last Updated**: 2026-07-26
