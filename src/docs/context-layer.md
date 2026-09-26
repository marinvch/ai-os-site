# The context layer

The files every developer's agent reads before it touches the code. Cortex writes them; you choose
which.

## Root `AGENTS.md` and the shims

A **small** root brief — what the repo is, how to run it, its invariants and gotchas — ending in a
**routing table**. `CLAUDE.md` and `GEMINI.md` are one-line shims importing it, so Claude, Gemini,
Copilot and Cursor all read the same file.

Written by `/cortex-scaffold`, the apply step: it is invoked explicitly and never runs on its own.

## The routing table

The table in the root `AGENTS.md` mapping *where you are working* to *which brief to read*. It is
prose an agent follows — there is no resolver, no hook, no engine. An agent working in one area
loads that area's context instead of the whole monolith.

## Scoped briefs

A **brief** is a scoped `AGENTS.md` inside a directory, holding what the root cannot: that area's
invariants and gotchas. It is reached through the routing table and read only when work happens
there.

`/cortex-brief <dir>` writes one for a part of the repo that earns it — a directory that is
critical, high-churn, or holds invariants an agent could violate — and wires it into the routing
table. It proposes candidates from the index, or takes a directory you name; you confirm each one.
One filename per area, never a sprawl of per-topic files.

## The glossary and decisions

`CONTEXT.md` is the repo's **domain glossary**: the words the codebase uses, and what they mean
*here*. `docs/adr/` holds decisions and the alternatives that were rejected.

`/domain-modeling` builds and sharpens them — it challenges fuzzy terms, stress-tests them against
scenarios, and writes the glossary and decisions down as they crystallise.

## Skills that fit the stack

`/cortex-skills` proposes skills for **this** codebase, from what the index detected — a webhook
skill because the repo takes payments, a migration skill because it owns a database schema, a
first-test skill because it has none. You pick each one; they are written into the repo and
committed with its code.

## Keeping it small

`/optimize-context` audits and slims an existing `AGENTS.md`, `CLAUDE.md` or `.cursorrules` — run
it **before** scaffolding, so you end with one file rather than two to merge. A context file that
grows too long gets ignored: when an agent keeps breaking a rule that is written down, the file is
usually too long, not the rule too weak.
