# Profiles

AI OS supports three install profiles that control how much context, how many tools, and how many skills get installed. Choose based on your project's complexity and how much Copilot context you want.

## Selecting a Profile

Pass `--profile` when installing or refreshing:

```bash
npx -y github:marinvch/ai-os --profile minimal
npx -y github:marinvch/ai-os --profile standard
npx -y github:marinvch/ai-os --profile full
```

The selected profile is saved to `config.json` and used on subsequent refreshes automatically.

## Profile Comparison

| Capability | minimal | standard | full |
|---|---|---|---|
| `copilot-instructions.md` | ✅ | ✅ | ✅ |
| Architecture context | — | ✅ | ✅ |
| Conventions context | — | ✅ | ✅ |
| Stack context | — | ✅ | ✅ |
| Memory guidelines | — | ✅ | ✅ |
| MCP tools config | — | ✅ | ✅ |
| Agent files | — | — | ✅ |
| Skills auto-install | — | — | ✅ |
| Prompt files | — | — | ✅ |
| Workflow files | — | — | ✅ |

## minimal

The lightest footprint. Generates only `copilot-instructions.md` with a brief project summary. Suitable for small personal projects or when you want to add minimal files to source control.

```bash
npx -y github:marinvch/ai-os --profile minimal
```

**Files generated:** 1–2

## standard

The default. Generates the full context layer: instructions, architecture, conventions, stack, memory guidelines, and MCP tool configuration. Covers 95% of use cases.

```bash
npx -y github:marinvch/ai-os --profile standard
```

**Files generated:** 8–15

## full

Everything in `standard` plus agent files, domain-specific skills, prompt templates, and workflow automation files. Best for teams or large codebases where deep Copilot integration matters.

```bash
npx -y github:marinvch/ai-os --profile full
```

**Files generated:** 15–30+

## Changing Profiles

You can switch profiles at any time:

```bash
npx -y github:marinvch/ai-os --profile full --refresh-existing
```

Upgrading from `minimal` → `full` adds the missing files. Downgrading from `full` → `minimal` does **not** delete files — it only skips generating new ones. Use `--uninstall` first if you want a clean downgrade.
