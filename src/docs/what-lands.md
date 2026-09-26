# What lands in your repo

Everything Cortex can write into a target repository, and whether it is committed:

```
AGENTS.md             small root brief + a routing table
CLAUDE.md GEMINI.md   one-line shims
CONTEXT.md            the domain glossary
docs/adr/             decisions, created lazily
<area>/AGENTS.md      scoped leaves, only where you accepted one
.cortex/
  index/              generated, gitignored
  findings/           generated, gitignored
  view/               generated, gitignored — the HTML graph
  memory/             COMMITTED — shared context, secrets refused at the gate
```

Nothing above appears until you choose it. `/cortex` and `/cortex-install` index and report
read-only, then ask; `/cortex-scaffold` is the separate step that writes.

## Why memory is committed

Cortex needs somewhere to keep what a team learns about a codebase — decisions, drift, the gotcha
found the hard way — so that several developers, each running their own agents, work without
context drift. Per-developer local state cannot be shared, so it cannot do that job.

So memory lives in `.cortex/memory/`, **committed to the product repository**, as append-only
dated files. Git is the entire sync mechanism: context travels with the code, arrives with a
clone, and needs no server or protocol. A developer joining the repo inherits everything the
team's agents have learned.

| Rejected option | Why not |
|---|---|
| A separate team-brain repo, synced by git | a second repo per team, plus a sync story, plus a way to relate memory to the code it describes |
| Local-only per developer | zero leak risk and zero conflicts, but no sharing — which was the entire requirement |
| Sanitise secrets on write instead of refusing | silently rewriting a developer's note is a worse failure than declining it, and a sanitiser that misses one writes the secret to history |

## The gate

Because memory ships with the code, every write goes through **the gate** — a secret scanner that
**refuses** anything carrying a credential, key, token or connection string, and names only the
kind of secret it found. It never sanitises silently.

The gate mitigates the leak surface; it does not eliminate it. A pattern the scanner does not
know still gets through, which is why memory holds knowledge about the codebase, not credentials,
personal notes or employer-sensitive material.

## Brownfield-safe

A curated `AGENTS.md` or `CLAUDE.md` is never clobbered — you get `AGENTS.generated.md` to diff —
existing files back up to `*.bak`, and Cortex warns if a generated file is gitignored.
