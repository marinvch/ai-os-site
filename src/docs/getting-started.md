# Installation

AI OS is a context-enrichment layer for GitHub Copilot that installs in 30 seconds and keeps your context fresh automatically.

## Prerequisites

- **Node.js** 20 or later (`node --version`)
- **GitHub Copilot** subscription with VS Code extension installed
- Any project directory (TypeScript, Python, Go, PHP, JavaScript, and more)

## Install

Run this one command in your project root:

```bash
npx -y github:marinvch/ai-os
```

That's it. AI OS will:

1. **Detect your stack** — language, framework, package manager, test tools
2. **Generate context files** — `copilot-instructions.md`, architecture, conventions, stack docs
3. **Configure MCP tools** — wires up 30 context tools in `.vscode/mcp.json` and `.mcp.json`
4. **Install skills & agents** — domain-specific Copilot skills matched to your stack
5. **Set up memory guidelines** — persistent memory across Copilot sessions

## What Gets Created

```
.github/
  copilot-instructions.md        # Main Copilot instructions
  ai-os/
    context/
      architecture.md            # Codebase architecture overview
      conventions.md             # Coding conventions & patterns
      stack.md                   # Full dependency inventory
      memory.md                  # Memory safety guidelines
    context-snapshot.json        # Freshness baseline
    config.json                  # AI OS configuration
    protect.json                 # Protected file rules
    tools.json                   # Active MCP tool list
.vscode/
  mcp.json                       # VS Code MCP server config
.mcp.json                        # Root MCP config (for other IDEs)
.agents/
  skills/                        # Installed skills
  *.agent.md                     # Agent files
.github/instructions/
  *.instructions.md              # Instruction files
```

## Refresh Existing Context

When your project evolves (new dependencies, refactors, new team conventions), refresh:

```bash
npx -y github:marinvch/ai-os --refresh-existing
```

AI OS uses **SHA-256 content-hash gating** — it only writes files that have actually changed, so refresh is fast and non-destructive.

## Verify Installation

Run the doctor command to validate everything is working:

```bash
npx -y github:marinvch/ai-os --doctor
```

This checks:
- MCP runtime connectivity
- `.vscode/mcp.json` and `.mcp.json` correctness
- `config.json` validity
- `tools.json` presence and format
- Skills installation status

## Preview Before Applying

Not sure what AI OS will change? Run a dry run first:

```bash
npx -y github:marinvch/ai-os --dry-run
```

This shows a colorized unified diff of every file that would be written — nothing touches disk until you run without `--dry-run`.

## Uninstall

```bash
npx -y github:marinvch/ai-os --uninstall
```

Removes all AI OS-managed files while preserving your own modifications.
