# JSON Output Mode

All AI OS action commands support `--json` for structured, machine-readable output. This makes AI OS easy to integrate into CI pipelines, scripts, and automation workflows.

## Enabling JSON Output

Add `--json` to any action command:

```bash
npx -y github:marinvch/ai-os --doctor --json
npx -y github:marinvch/ai-os --check-freshness --json
npx -y github:marinvch/ai-os --check-hygiene --json
npx -y github:marinvch/ai-os --dry-run --json
```

When `--json` is active, the terminal banner is suppressed and only JSON is written to stdout.

## Output Schemas

### --doctor --json

```json
{
  "action": "doctor",
  "cwd": "/path/to/project",
  "toolVersion": "0.15.0",
  "checks": [
    { "name": "MCP runtime", "status": "pass", "detail": "Server responding" },
    { "name": ".vscode/mcp.json", "status": "pass", "detail": "Valid JSON" },
    { "name": "config.json", "status": "warn", "detail": "memoryTtlDays not set" }
  ],
  "criticalFailures": 0,
  "warnings": 1
}
```

### --check-freshness --json

```json
{
  "action": "check-freshness",
  "status": "fresh",
  "score": 94,
  "snapshotCapturedAt": "2026-05-01T10:00:00.000Z",
  "lastGeneratedAt": "2026-05-01T10:00:00.000Z",
  "staleArtifacts": [],
  "changedSourceFiles": [],
  "recommendations": []
}
```

`status` is `"fresh"`, `"stale"`, or `"unknown"`. The command exits with code `1` when status is `"stale"`.

### --check-hygiene --json

```json
{
  "action": "check-hygiene",
  "cwd": "/path/to/project",
  "passed": true,
  "issues": []
}
```

`passed` is `false` and `issues` is populated when hygiene problems are found. Exit code `1` on failure.

### --dry-run --json

```json
{
  "action": "dry-run",
  "files": [
    { "path": ".github/copilot-instructions.md", "type": "changed", "additions": 12, "deletions": 3 },
    { "path": ".github/ai-os/context/architecture.md", "type": "new", "additions": 48, "deletions": 0 }
  ],
  "totalAdditions": 60,
  "totalDeletions": 3
}
```

## CI Integration Examples

### Fail CI if context is stale

```yaml
- name: Check AI OS freshness
  run: npx -y github:marinvch/ai-os --check-freshness
```

### Parse JSON output in a script

```bash
PASSED=$(npx -y github:marinvch/ai-os --check-hygiene --json | jq -r '.passed')
if [ "$PASSED" != "true" ]; then
  echo "Hygiene check failed"
  exit 1
fi
```

### Store doctor results as a CI artifact

```bash
npx -y github:marinvch/ai-os --doctor --json > doctor-report.json
```
