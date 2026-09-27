# Installation

Cortex installs as a **Claude plugin**. Install it once, then run it in any repository — a working
project or an empty one.

{{install}}

The first two lines add the marketplace and install the plugin. The third, `/cortex`, runs
**inside the repo you want it to serve**.

## What `/cortex` does on first run

It indexes the codebase, writes **one findings report** — issues, gaps and recommendations,
ranked — works out which parts of the development loop the repo is missing (a verification block
in `CLAUDE.md`, a verifier subagent, `REVIEW.md`, a PR review workflow, hooks, an `intent/` home,
evals, control bands), and then **stops and asks once**.

Nothing in your repo is modified until you pick what to act on. Indexing and reporting are
read-only by construction: a different skill applies changes.

## Requirements

| Needs | Why |
|---|---|
| Claude Code with plugin support | Cortex ships as a plugin: skills, two subagents and an MCP server |
| Node `{{node}}` | the indexer, the findings report, Cortex View and the MCP server are plain Node |
| git | the index asks git which files belong to the repo, and reads history for hot spots |

**No `npm install`, no build step, no lockfile.** A plugin install clones the repository and runs
what is there, so Cortex has no runtime dependencies at all — every script runs on a stock machine.

## Keeping it current

A marketplace update alone can leave the old version installed. After updating, confirm which
version is active with `claude plugin list` — the current release is **v{{version}}**.

## Other agents

Cortex's output is plain markdown. `CLAUDE.md` and `GEMINI.md` are one-line shims pointing at the
same root `AGENTS.md`, and the rituals are plain `SKILL.md` files — name one to any AI tool and it
can follow it.

## Next

- [The sequence](#/sequence) — what to run after `/cortex`, and how Cortex tells you.
- [What lands in your repo](#/what-lands) — every file it can write, and which are committed.
