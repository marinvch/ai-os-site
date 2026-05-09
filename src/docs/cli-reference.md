# CLI Reference

AI OS is invoked via `npx -y github:marinvch/ai-os` with optional flags.

## Synopsis

```bash
npx -y github:marinvch/ai-os [flags]
```

## Flags

### Actions

| Flag | Description |
|---|---|
| _(none)_ | Fresh install — detect stack and generate all files |
| `--refresh-existing` | Re-detect stack and regenerate, skipping unchanged files |
| `--bootstrap` | Full install + auto-install recommended skills |
| `--dry-run` | Preview changes as a unified diff without writing to disk |
| `--doctor` | Validate MCP runtime, config, and tools |
| `--check-freshness` | Score context staleness, exit non-zero if stale |
| `--check-hygiene` | Validate context file quality and completeness |
| `--compact-memory` | Prune stale and near-duplicate memory entries |
| `--uninstall` | Remove all AI OS-managed files |
| `--update` | Check for AI OS updates |

### Options

| Flag | Values | Description |
|---|---|---|
| `--profile` | `minimal` `standard` `full` | Set install profile (default: `standard`) |
| `--full-diff` | — | Show full file content in dry-run diff (not just changes) |
| `--json` | — | Output structured JSON instead of human-readable text |

## Examples

### Fresh install with full profile

```bash
npx -y github:marinvch/ai-os --profile full
```

### Preview what a refresh would change

```bash
npx -y github:marinvch/ai-os --refresh-existing --dry-run
```

### Preview with complete file output

```bash
npx -y github:marinvch/ai-os --dry-run --full-diff
```

### CI freshness check (exits 1 if stale)

```bash
npx -y github:marinvch/ai-os --check-freshness
```

### CI hygiene check with JSON output

```bash
npx -y github:marinvch/ai-os --check-hygiene --json | jq '.passed'
```

### Health check

```bash
npx -y github:marinvch/ai-os --doctor
```

### Compact memory (remove stale entries)

```bash
npx -y github:marinvch/ai-os --compact-memory
```

## JSON Output Mode

All action flags support `--json` for machine-readable output:

```bash
# Doctor check
npx -y github:marinvch/ai-os --doctor --json
# => { "action": "doctor", "checks": [...], "criticalFailures": 0, "warnings": 2 }

# Freshness check
npx -y github:marinvch/ai-os --check-freshness --json
# => { "action": "check-freshness", "status": "fresh", "score": 92, ... }

# Hygiene check
npx -y github:marinvch/ai-os --check-hygiene --json
# => { "action": "check-hygiene", "passed": true, "issues": [] }
```

## Exit Codes

| Code | Meaning |
|---|---|
| `0` | Success |
| `1` | Action failed, stale context detected, or hygiene issues found |
| `2` | Invalid arguments |
