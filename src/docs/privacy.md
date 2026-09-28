# Privacy & the firewall

## The product holds nothing of yours

The Cortex repository is **data-free**: it holds the product and nothing else, because it is
cloned, forked and read by strangers. Gitignore is a backstop, not a security boundary. A vault
lives in its own private repo.

On a team, what is shared is the **target repo's** context layer — `AGENTS.md`, `.cortex/memory/`
— committed with that code. Every memory write passes the secret gate, which refuses a credential
rather than sanitising it.

## What Cortex writes, and who fetches an update

- **The indexer, findings, View and every `index/` script** read the repo on disk and write only
  under its `.cortex/` (the first index run also appends three lines to `.gitignore`, after you
  agree). They make no network calls and install nothing. Two things there are meant to be
  committed: `.cortex/memory/`, and `.cortex/stamps.json` — the record of which files Cortex
  stamped into the repo and from which release.
- **Two scripts write outside `.cortex/`**, and `/cortex` runs each only on what you confirmed:
  - `cortex-stamps.mjs update` rewrites only a file Cortex stamped that nobody has touched since,
    and never when `.cortex/stamps.json` names a newer Cortex than the one running. That check
    compares the record with the plugin's own version file; nothing is fetched to make it.
  - `cortex-shared-plugin.mjs --write`, on a team's repo, adds two entries to
    `.claude/settings.json`, creating the file if there is none, and leaves every other key as it
    was. It refuses a file that does not parse as JSON. `--auto-update`, a separate choice, also
    writes `"autoUpdate": true` on a `cortex` entry it adds, and never changes one already there.
- **Updates are Claude Code's, not Cortex's.** Cortex never checks for a newer release. With
  auto-update turned on, Claude Code fetches the marketplace itself; the manual update is the two
  `claude plugin` commands on [Installation](#/install). Once a team has committed the `cortex`
  marketplace to `.claude/settings.json`, it is Claude Code, not Cortex, that clones
  `github.com/marinvch/Cortex` on each teammate's machine when they trust the folder.

## One install, one world

A **profile** declares which world an install belongs to: `home`, `work` or `lab`, set with
`CORTEX_PROFILE`. It is the one setting that decides what the rituals will accept.

- A **`home`** install holds personal projects and knowledge only — never employer or client
  names, day-job tickets, colleagues, or internal architecture. Even role-level detail counts: the
  aggregate is the leak.
- A **`work`** install is the same rule from the other side.
- A **`lab`** install refuses nothing and publishes nothing — one decision, stored as one policy,
  so the firewall cannot be switched off while still leaking.

Work knowledge a team shares belongs in the **work repo's own context layer**, which stays inside
that repo.

## Enforced, not just written

The rituals refuse the write: `/capture` and `/daily` decline material from the wrong world,
`/audit` and `/cortex-audit` treat a breach as a critical finding, and `/scan-projects` skips repos
under a work directory. `/cortex-profile` shows or sets which world this install serves.
