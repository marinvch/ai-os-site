# Cortex View

See the repo, don't read about it.

```
/cortex-view
```

That is the whole command, in any repo where the plugin is installed. From a clone of the Cortex
repository, `node index/cortex-view.mjs .` is the same thing.

It writes **one self-contained HTML page** — no server, no CDN, no runtime. The data is inlined,
so it works offline and copies anywhere. Same index, same page.

## The tabs

- **Next steps** — the sequence, with your repo's position marked.
- **Map** — a force graph of every code file, coloured by area and laid out by import depth, so it
  reads top-down instead of as a hairball. Click an area in the legend to hide it; a red ring means
  no test was found. Markdown and config stay out of the Map on purpose: they have no imports to
  draw, and would bury the files that do.
- **Files** — every file with who imports it and what it imports, both clickable.
- **Areas** — the top-level shape, and which areas already have a scoped brief.
- **Gaps** — orphans, import cycles, and the busiest code with no test found, ranked by commits.

## Read it honestly

Orphans are stated as **questions, never as a delete list**. Import resolution is pattern-based —
a plugin install runs no build, so there is no parser — which makes dynamic imports invisible. The
same goes for coverage: a file exercised only through a subprocess reads as untested, which is the
safe direction to be wrong in.

Run `/cortex-enrich` first and each file card also carries what that file *does*.
