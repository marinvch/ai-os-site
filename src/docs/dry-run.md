# Dry-Run Mode

The `--dry-run` flag lets you preview every file change AI OS would make — as a colorized unified diff — without writing anything to disk.

## Basic Usage

```bash
npx -y github:marinvch/ai-os --dry-run
```

Or with refresh:

```bash
npx -y github:marinvch/ai-os --refresh-existing --dry-run
```

## What You See

Dry-run output shows each file with a label and a +N/-N summary:

```
[CHANGED] .github/copilot-instructions.md  (+12 / -3)
  1   | ## Project: my-app
  2   | **Primary Language:** TypeScript
  3 - | **Framework:** Express
  3 + | **Framework:** Fastify
  4   | **Package Manager:** npm
  ...

[NEW] .github/ai-os/context/architecture.md  (+48 / -0)
  1 + | # Architecture
  2 + |
  3 + | ## Overview
  ...
```

- **Green `+`** lines are additions
- **Red `-`** lines are removals
- **`[NEW]`** marks files being created for the first time
- **`[CHANGED]`** marks files with modifications

## Full Diff Mode

By default, dry-run shows only the changed lines with a few lines of context. To see the complete file content for every changed file:

```bash
npx -y github:marinvch/ai-os --dry-run --full-diff
```

Useful when reviewing a first-time install or a major refresh.

## How It Works

1. AI OS runs the complete generation pipeline in memory
2. For each file: compares the generated content with what's on disk
3. For new files: shows all lines as additions
4. For changed files: runs LCS (Longest Common Subsequence) diff to compute minimal changes
5. Prints the colorized output to stdout
6. Exits without writing anything

## Content-Hash Optimization

AI OS uses SHA-256 content-hash gating. Files whose hash matches the previous run are skipped entirely — they won't appear in the dry-run output even in `--full-diff` mode, because they haven't changed.

## Use in CI

Dry-run is safe for CI pipelines. Pipe the output to a file or use `--json` for structured output:

```bash
npx -y github:marinvch/ai-os --dry-run --json > dry-run-report.json
```

The JSON output includes the list of files that would be written, their change type (`new` or `changed`), and line counts.
