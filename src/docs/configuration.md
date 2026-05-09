# Configuration

AI OS stores its configuration in `.github/ai-os/config.json`. This file is created on first install and persisted across refreshes.

## config.json Reference

```json
{
  "version": "0.15.0",
  "profile": "standard",
  "strictStackFiltering": true,
  "memoryTtlDays": 90,
  "memoryNearDuplicateThreshold": 0.85,
  "protect": []
}
```

### Fields

| Field | Type | Default | Description |
|---|---|---|---|
| `version` | string | current | AI OS version that last ran |
| `profile` | `minimal` \| `standard` \| `full` | `standard` | Install profile |
| `strictStackFiltering` | boolean | `true` | Only activate MCP tools relevant to detected stack |
| `memoryTtlDays` | number | `90` | Days before memory entries are considered stale |
| `memoryNearDuplicateThreshold` | number | `0.85` | Jaccard similarity threshold for near-duplicate detection |
| `protect` | string[] | `[]` | Paths to treat as protected (never overwritten) |

## protect.json

The `protect.json` file controls which files AI OS will never overwrite:

```json
{
  "protected": [
    ".github/copilot-instructions.md"
  ],
  "hybrid": [
    ".github/ai-os/context/architecture.md"
  ]
}
```

### Modes

- **`protected`** — AI OS will never touch these files. Manual-only.
- **`hybrid`** — AI OS regenerates the file but preserves `USER_BLOCK` regions.

## User Block Preservation

In hybrid-mode files, wrap your custom content in user block markers:

```markdown
<!-- AI-OS:USER_BLOCK:START id="my-notes" -->
## My Team Notes

These lines are mine and will survive every refresh.
<!-- AI-OS:USER_BLOCK:END -->
```

AI OS extracts these blocks before generation and merges them back after, keyed by the `id` attribute.

## Protected Regions in Code

Use inline markers to protect specific code regions from being modified:

```typescript
// @ai-os:protect reason="custom auth logic"
const myCustomAuth = () => { /* ... */ }
// @ai-os:protect-end
```

AI OS will never modify, delete, or simplify content inside protected blocks.

## tools.json

Generated automatically. Shows which MCP tools are active vs. available-but-inactive for your stack:

```json
{
  "activeTools": ["get_session_context", "search_codebase", "get_conventions"],
  "availableButInactive": ["get_stack_info"]
}
```

When `strictStackFiltering` is `false`, all tools are active regardless of stack.

## Environment Variables

AI OS reads no mandatory environment variables. Optional context can come from:

- `AI_OS_PROFILE` — override the install profile (`minimal`, `standard`, `full`)
- `AI_OS_DRY_RUN` — set to `1` to enable dry-run mode without the CLI flag
