# Contributing

Cortex is source code with contributors, tests, CI and releases. Before editing anything in the
repository, read [`docs/changing-cortex.md`](https://github.com/marinvch/Cortex/blob/master/docs/changing-cortex.md)
— the invariants that apply to every package. Several of them exist because the mistake they
prevent has already been made once.

## The rules that bite first

- **Never hand-edit a version.** `node tools/cortex-version.mjs --set <x.y.z>` stamps every site at
  once and refuses without a changelog entry.
- **Every ritual declares a capability floor** — `mechanical`, `judgment` or `strong`, under its
  frontmatter's `metadata:` map — so a model too weak for a ritual is told, not trusted. Its
  `effort:` is read off that floor, not chosen again: `low` for `mechanical`, `high` for `strong`.
- **Cortex follows the Claude Code rules it reports on.** A test runs the `claude-setup/` findings
  over the Cortex repository itself and fails on any. Fix the repo, never the checker: loosening a
  check loosens it for every user.
- **Every ritual is reachable** from another, or says what reaches it. A ritual nothing points at is
  unreachable except by someone who already knows it exists.
- **A destructive shell tool routes its target through the root guard.** A string-prefix check is
  not a guard: a symlink out of the root passes any prefix comparison.
- **Assert the property, not the symptom you thought of.** A test naming one symptom passes for
  every other way of failing.
- **Edit the body of a skill that has an eval baseline and you re-measure it.** CI fails once a
  skill listed in `evals/skills.mjs` no longer matches its recorded baseline;
  `node evals/run.mjs <skill> --record` re-measures it, and refuses a real drop in score unless you
  give the reason. Frontmatter edits are exempt.

## Running the tests

```bash
node --test core/test/*.test.js
node --test index/test/*.test.mjs
(cd mcp && npm test)
bash tools/test/run.sh          # the shell half: real git repos in temp dirs
node evals/run.mjs --check      # needs no model: has an evaled skill changed since its baseline
```

`tools/test/run.sh` is the only way to run a shell test fragment — each one expects the temp
directory the runner prepares, and run on its own it would act on the repository you are standing
in.

## Where to look

Read the root `AGENTS.md`, match your work to a row of its routing table, then open **one** leaf —
`core/`, `index/`, `mcp/` or `tools/` each carry their own brief. Domain terms are defined once in
`CONTEXT.md`; decisions and their rejected alternatives are in `docs/adr/`.

Issues and pull requests: [github.com/marinvch/Cortex](https://github.com/marinvch/Cortex).
