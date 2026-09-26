# Moving off the old engine

Before Cortex 2, this site documented **AI OS** — an engine that wrote its state into `.ai-os/`
and `.github/ai-os/`. That engine is retired. Its configuration, profiles, dry-run
mode and JSON output pages are gone because the features are gone.

## If a repo still has `.ai-os/`

Install Cortex, then run this first, inside that repo:

```
/migrate-engine
```

It **harvests first and deletes second**: the old engine's memory is read and folded into the
repo's `AGENTS.md` before anything is removed, so no knowledge is lost across the change.

Then continue with [the sequence](#/sequence) — `/cortex` from the top.
