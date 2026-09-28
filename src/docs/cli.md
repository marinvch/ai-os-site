# CLI reference

The rituals are the interface — `/cortex`, `/cortex-next` and the rest. Underneath, every step is a
plain Node or shell script you can run yourself from a clone of the Cortex repository. Inside a
skill the same scripts run through the plugin's own path.

## The codebase half — `index/`

```bash
node index/cortex-next.mjs .        # where this repo is; writes nothing at all
node index/cortex-index.mjs .       # writes .cortex/index/index.json
node index/cortex-findings.mjs .    # writes .cortex/findings/<date>.md
node index/cortex-view.mjs .        # writes .cortex/view/repo.html and opens it
node index/cortex-enrich.mjs plan . # optional: plan the semantic enrichment pass
node index/cortex-routes.mjs . --workspace  # which back-end handler serves each front-end call
node index/cortex-stamps.mjs .     # which files /cortex stamped are out of date; writes nothing
node index/cortex-shared-plugin.mjs .  # on a team repo: what --write would add to .claude/settings.json
```

Every command prints a `Next →` line when it finishes, and refuses an unknown or misspelled flag
with a message naming it — a typo is never reinterpreted as a path.

## Tools — `tools/`

Every script here runs on a stock machine — no `npm install`, no lockfile, no runtime dependency.

| Script | Does |
|---|---|
| `cortex-init.sh` | install a codebase brain into any repo |
| `cortex.sh` | build and open `cortex.html` — the vault viewer |
| `cortex-rm.sh` | remove a note safely (archive + de-link + refresh) |
| `cortex-scan-projects.sh` | list which local repos already have a codebase brain |
| `cortex-sync-skills.sh` | mirror the rituals into `.claude/skills/`; `--check` reports drift |
| `cortex-vault-extract.sh` | lift the personal-vault half out into its own repo |
| `cortex-capability.mjs` | what each ritual needs from the setup running it |
| `cortex-frontmatter.mjs` | is every ritual's frontmatter readable by a router |
| `cortex-version.mjs` | `--set X.Y.Z` — stamp the version everywhere, refuse without a changelog entry |
| `cortex-preflight.mjs` | root, profile and index freshness — what every ritual asks before it writes |
| `cortex-plugin-check.mjs` | which Cortex this session is actually running |
| `cortex-skill-graph.mjs` | which ritual reaches which; `--check` fails on one stranded in both directions |
| `cortex-skill-usage.mjs` | which rituals your sessions have actually reached |
| `cortex-claude-docs.mjs` | re-verify the official Claude Code rules Cortex checks against |
| `cortex-site-facts.mjs` | extract the facts this site renders; `--check` names any that drifted |
