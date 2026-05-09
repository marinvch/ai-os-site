# Memory System

AI OS implements a three-tier memory system that persists context across GitHub Copilot conversations. This solves the fundamental problem of Copilot "forgetting" your architecture, decisions, and constraints at the start of every session.

## Memory Tiers

### Repo Memory

Stored in `.github/copilot-instructions.md` and `.github/ai-os/memory/` — scoped to the repository. Survives across all conversations, all users, and all machines that have the repo checked out.

Use for:

- Verified architectural decisions ("We use tRPC v11, not REST")
- Codebase constraints ("All database queries must be scoped by owner")
- Build commands and test scripts
- Patterns that Copilot should always follow in this repo

### Session Memory

Stored in `/memories/session/` within Copilot's workspace. Scoped to the current conversation. Cleared when the session ends.

Use for:

- Current task context and in-progress state
- Intermediate findings during a multi-step task
- Temporary notes that don't belong in permanent memory

### User Memory

Stored in `/memories/` — global across all workspaces and repos for the current user.

Use for:

- Personal coding preferences
- Frequently used patterns across projects
- General insights that apply everywhere

## MCP Tools for Memory

| Tool | When to call |
|---|---|
| `get_repo_memory` | At the start of any non-trivial task |
| `remember_repo_fact` | After completing a substantial task — persist verified learnings |
| `get_memory_guidelines` | Before deciding what to store |
| `prune_memory` | When memory grows stale or has near-duplicates |

## Memory Hygiene

AI OS v0.15.0 introduced automatic memory hygiene:

- **TTL pruning** — entries older than `memoryTtlDays` (default: 90 days) are flagged for removal
- **Near-duplicate detection** — Jaccard similarity comparison flags entries with similarity above `memoryNearDuplicateThreshold` (default: 0.85)
- **Manual compact** — run `npx -y github:marinvch/ai-os --compact-memory` to prune stale and duplicate entries

## What to Store

**Do store:**

- Verified, durable facts unlikely to change soon
- Decisions that change Copilot's behavior (API contracts, error patterns)
- Build and test commands after you confirm they work

**Do not store:**

- Speculative or temporary notes — use session memory instead
- Duplicate or paraphrased versions of existing facts
- Secrets, credentials, or sensitive data

## Session Restart Protocol

At the start of every new Copilot conversation, call these tools in order:

```
1. get_session_context  → reloads MUST-ALWAYS rules and key files
2. get_repo_memory      → reloads durable architectural decisions
3. get_conventions      → reloads coding rules and naming conventions
```

This ensures Copilot starts with the full picture of your codebase — even after a context window reset.
