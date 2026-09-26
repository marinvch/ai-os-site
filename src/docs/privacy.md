# Privacy & the firewall

## The product holds nothing of yours

The Cortex repository is **data-free**: it holds the product and nothing else, because it is
cloned, forked and read by strangers. Gitignore is a backstop, not a security boundary. A vault
lives in its own private repo.

On a team, what is shared is the **target repo's** context layer — `AGENTS.md`, `.cortex/memory/`
— committed with that code. Every memory write passes the secret gate, which refuses a credential
rather than sanitising it.

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
