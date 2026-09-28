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
  stamps.json         COMMITTED — which loop files Cortex stamped, from which release, so a re-run
                      updates the untouched ones and asks about the ones your team edited
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

## Why the stamp record is committed

The loop files `/cortex` writes — `REVIEW.md`, the verifier, the hooks and the rest — once never
changed again: a hook fixed in a later release stayed broken in every repo stamped before the fix.
Now each one is recorded in `.cortex/stamps.json` with the release and template that wrote it, and a
re-run of `/cortex` compares both against that record:

| State | What the re-run does |
|---|---|
| current | nothing |
| update — the template changed, nobody touched the file | one confirmed row updates them all |
| edited — your team changed it, the template did not | nothing; it is yours |
| conflict — both changed; review — the template changed, but the file holds lines Cortex cannot re-create | asks file by file, with the diff |
| missing, retired | asks whether to stamp it again or drop it from the record |

The record is committed because it is how the next release tells your team's edits from Cortex's
own. A repo stamped before the record existed adopts its files without a single rewrite: each is
compared with the current template before anything changes. The `CLAUDE.md` verification block and
the hooks merged into `.claude/settings.json` sit inside files your team also writes, so they are
not in the record.

## Brownfield-safe

A curated `AGENTS.md` or `CLAUDE.md` is never clobbered — you get `AGENTS.generated.md` to diff —
existing files back up to `*.bak`, and Cortex warns if a generated file is gitignored.
