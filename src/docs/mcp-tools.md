# MCP Tools

AI OS configures 30 Model Context Protocol (MCP) tools that GitHub Copilot can call to retrieve live context about your project. These tools replace the need to manually paste architecture diagrams, file lists, or conventions into every chat.

## How They Work

When you ask Copilot a question, it can call MCP tools to fetch relevant context on demand. Tools are wired up in `.vscode/mcp.json` and `.mcp.json` and powered by the AI OS MCP server bundled with your install.

When `strictStackFiltering` is enabled (default), only tools relevant to your detected stack are activated. The rest are listed in `tools.json` as `availableButInactive`.

## Tool Reference

### Session & Context

| Tool | Description |
|---|---|
| `get_session_context` | Reload MUST-ALWAYS rules, build commands, and key file locations. Call at the start of every conversation. |
| `get_repo_memory` | Retrieve durable architectural decisions and constraints stored in repo memory. |
| `get_memory_guidelines` | Load memory safety protocol — when to store, when to skip. |
| `compact_session_context` | Summarize and compress the current session context to free up token budget. |

### Project Introspection

| Tool | Description |
|---|---|
| `get_project_structure` | List directory tree of unfamiliar areas before exploring. |
| `get_stack_info` | Full dependency inventory — libraries, versions, and their role. |
| `get_conventions` | Coding conventions, naming rules, linter config, and formatter settings. |
| `get_file_summary` | Understand a file without reading it fully — saves tokens. |
| `get_env_vars` | List all environment variables referenced in the codebase. |
| `get_dependency_chain` | Trace how a module connects to the rest of the code. |

### Impact Analysis

| Tool | Description |
|---|---|
| `get_impact_of_change` | Show blast radius before editing any file — what else depends on it. |
| `search_codebase` | Find symbols, patterns, or usage examples with semantic search. |
| `get_package_info` | Fetch metadata about an npm/pip/go package before adding it as a dependency. |

### Freshness & Health

| Tool | Description |
|---|---|
| `get_context_freshness` | Score how stale the AI OS context is relative to recent code changes. |
| `check_for_updates` | Check if AI OS artifacts are out of date with the latest release. |

### Planning & Checkpoints

| Tool | Description |
|---|---|
| `get_active_plan` | Retrieve the current active multi-step plan. |
| `upsert_active_plan` | Create or update the active plan. |
| `append_checkpoint` | Add a checkpoint to the active plan (for long tasks). |
| `close_checkpoint` | Mark a checkpoint as complete. |
| `reset_session_state` | Clear the current session state and start fresh. |

### Memory Management

| Tool | Description |
|---|---|
| `remember_repo_fact` | Persist a verified, durable fact to repo memory. |
| `prune_memory` | Remove stale or near-duplicate entries from memory. |
| `sync_hosted_memory` | Sync memory to/from hosted storage. |

### Recommendations & Improvements

| Tool | Description |
|---|---|
| `get_recommendations` | Stack-appropriate tool, extension, and skill recommendations. |
| `suggest_improvements` | Surface architectural and tooling gaps in the current project. |
| `record_failure_pattern` | Log a recurring failure pattern to avoid future regressions. |
| `set_watchdog_threshold` | Configure alerting thresholds for staleness or failure rates. |

### Diagnostics

| Tool | Description |
|---|---|
| `get_active_plan` | View the current plan with status and checkpoints. |

## Customizing Active Tools

Edit `tools.json` or set `strictStackFiltering: false` in `config.json` to activate all tools regardless of stack:

```json
{
  "strictStackFiltering": false
}
```
