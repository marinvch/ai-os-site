# Team memory

What a team and its agents know about a codebase, travelling with the code.

## Memory

`<repo>/.cortex/memory/` — **committed**, append-only, one file per day, synced by git and nothing
else. Several developers appending to the same day's file merge as ordinary text; nobody edits a
shared document in place, so there is no lost update to reason about.

Memory is **authored, not derived** — it is never regenerated, and it is not a cache.

## The gate

Every write to memory, and every tool that publishes, goes through **the gate**: a check that
**refuses** anything carrying a credential rather than sanitising it, because silently rewriting
someone's note is a worse failure than declining it with a reason.

## The rituals that move context across a gap

They are **not** interchangeable. The cut is in-flight state versus durable knowledge:

| Ritual | Writes | For |
|---|---|---|
| `/dream` | a dated digest into the committed `.cortex/memory/` | a future reader of the codebase — tomorrow's agents and the rest of the team |
| `/handoff` | a compact handoff to the OS temp dir, deliberately ephemeral | the next agent, right now, picking up work mid-flight |
| `/catch-me-up` | nothing — it reads | you, after time away: notes plus git history over a date range |
| `/resume` | nothing — it reads the repo first | starting on work already in flight: committed, uncommitted, diverged, then what is left |

Running `/handoff` alone on a day that taught you something parks the work and loses the lesson.

## A shared team brain

For knowledge that spans several repositories, a team lead runs `/team-init` once to create a
shared private **team-brain** repository. Each developer runs `/team-add` inside a product repo to
connect it: the team-brain is cloned locally and a generic connector — the team, the project and
the team-brain's URL, nothing else — is dropped into the product repo, so notes captured there
reach the whole team.

In a connected repo, `/catch-me-up` pulls the team-brain first (fast-forward only) and returns
what every repo of the team captured since the date, alongside the local notes. If the pull fails
it says so, rather than reporting a quiet week from a stale clone.

## Recall from any agent

With the plugin installed, the Cortex MCP server gives MCP-speaking agents live tools over this
memory — see [MCP brain](#/mcp).
