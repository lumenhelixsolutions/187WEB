# Validation and Release Standard

Typical 187WEB gates:

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run skills:validate
npm run release:validate
npm run docs:drift
npm run adapters:drift
npm run showcase:sync
```

Use only commands that exist in the repository. Label unexecuted commands `needs verification`.

Release synchronization includes canonical skills, adapters, aliases, command reference, README, AGENTS, install/routing docs, public data when applicable, changelog, version, migration notes, CI evidence, and rollback.
