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

- **Overview** — opens first: the state of the repo on one screen. Whether the index is fresh,
  which profile is serving, how far team memory trails the code; files, import edges, test
  coverage, 30-day churn and findings by severity; the import graph as a slowly turning cloud
  (click a point to open the file); the next commands to run, one click to copy; and a timeline of
  memory entries and commits. A fact that could not be read says *not available* and why — never a
  zero.
- **Map** — a force graph of every code file, coloured by area and laid out by import depth, so it
  reads top-down instead of as a hairball. Click an area in the legend to hide it; a red ring means
  no test was found. Markdown and config stay out of the Map on purpose: they have no imports to
  draw, and would bury the files that do.
- **Structure** — what an agent is handed: root `AGENTS.md`, the docs beside it, every code area
  with its scoped brief, busiest files and tests, and what Cortex generates. Missing pieces are
  drawn dashed, with the command that writes them.
- **Files** — every file with who imports it and what it imports, both clickable.
- **Areas** — the top-level shape, and which areas already have a scoped brief.
- **Gaps** — orphans, import cycles, and the busiest code with no test found, ranked by commits.
- **Next steps** — the sequence, with your repo's position marked.

It follows your OS theme, with a button to override it, and every word on it clears 7:1 contrast
at 13px or larger — computed in the tests, not tuned by eye. Churn and the timeline end at the
indexed commit, not at today, so the page is the same on every machine.

## Read it honestly

Orphans are stated as **questions, never as a delete list**. Import resolution is pattern-based —
a plugin install runs no build, so there is no parser — which makes dynamic imports invisible. The
same goes for coverage: a file exercised only through a subprocess reads as untested, which is the
safe direction to be wrong in.

Run `/cortex-enrich` first and each file card also carries what that file *does*.
