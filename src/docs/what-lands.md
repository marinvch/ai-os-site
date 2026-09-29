# What lands in your repo

Everything Cortex can write into a target repository, and whether it is committed:

```
AGENTS.md             small root brief + a routing table
CLAUDE.md GEMINI.md   shims — CLAUDE.md also carries "Verifying your work"
CONTEXT.md            the domain glossary
docs/adr/             decisions, created lazily (adr/ when docs/ is a published site)
<area>/AGENTS.md      scoped leaves, only where you accepted one
REVIEW.md             what a review of this repo checks
intent/               where a change starts: intent → spec → plan
.claude/              the verifier or the agent team, hooks, skills that fit the stack
.github/workflows/    cortex-review.yml (advisory PR review) · agent-evals.yml
.cortex/
  index/              generated, gitignored
  findings/           generated, gitignored
  view/               generated, gitignored — the HTML graph
  memory/             COMMITTED — shared context, secrets refused at the gate
  stamps.json         COMMITTED — which loop files Cortex stamped, from which release, so a re-run
                      updates the untouched ones and asks about the ones your team edited
```

Nothing above appears until you choose it. `/cortex` and `/cortex-install` index and report
read-only, then ask; `/cortex-scaffold` is the separate step that writes.

## Why memory is committed

Cortex needs somewhere to keep what a team learns about a codebase — decisions, drift, the gotcha
found the hard way — so that several developers, each running their own agents, work without
context drift. Per-developer local state cannot be shared, so it cannot do that job.

So memory lives in `.cortex/memory/`, **committed to the product repository**, as append-only
dated files. Git is the entire sync mechanism: context travels with the code, arrives with a
clone, and needs no server or protocol. A developer joining the repo inherits everything the
team's agents have learned.

| Rejected option | Why not |
|---|---|
| A separate team-brain repo, synced by git | a second repo per team, plus a sync story, plus a way to relate memory to the code it describes |
| Local-only per developer | zero leak risk and zero conflicts, but no sharing — which was the entire requirement |
| Sanitise secrets on write instead of refusing | silently rewriting a developer's note is a worse failure than declining it, and a sanitiser that misses one writes the secret to history |

## The gate

Because memory ships with the code, every write goes through **the gate** — a secret scanner that
**refuses** anything carrying a credential, key, token or connection string, and names only the
kind of secret it found. It never sanitises silently.

The gate mitigates the leak surface; it does not eliminate it. A pattern the scanner does not
know still gets through, which is why memory holds knowledge about the codebase, not credentials,
personal notes or employer-sensitive material.

## Why the stamp record is committed

The loop files `/cortex` writes — `REVIEW.md`, the verifier, the hooks and the rest — once never
changed again: a hook fixed in a later release stayed broken in every repo stamped before the fix.
Now each one is recorded in `.cortex/stamps.json` with the release and template that wrote it, and a
re-run of `/cortex` compares both against that record:

| State | What the re-run does |
|---|---|
| current | nothing |
| update — the template changed, nobody touched the file | one confirmed row updates them all |
| edited — your team changed it, the template did not | nothing; it is yours |
| conflict — both changed; review — the template changed, but the file holds lines Cortex cannot re-create | asks file by file, with the diff |
| missing, retired | asks whether to stamp it again or drop it from the record |

The record is committed because it is how the next release tells your team's edits from Cortex's
own. A repo stamped before the record existed adopts its files without a single rewrite: each is
compared with the current template before anything changes. The agent team's files are recorded
too: its agents, the Tester's fence script and the `team` skill. The `CLAUDE.md` verification
block, the team's section in `CLAUDE.md` and the hooks merged into `.claude/settings.json` sit
inside files your team also writes, so they are not in the record.

The team's section is checked another way: a re-run compares it with every version of it Cortex has
shipped, filled with the roster the section already names. If it is an earlier release's text that
nobody changed, the one confirmation offers to replace it, with the diff, and keeps the roster. If
your team edited it, you see the diff and take any line you want by hand; it is never replaced.
`node index/cortex-section.mjs .` shows which it is and writes nothing.

## The agent team

`/cortex` also offers a small team of agents, written into `.claude/agents/` and committed with the
code. Each one does one job, carries only the tools that job needs, and is filled in from this
repo's own commands, briefs and ADRs. Every claim one makes about the repo cites a `path:line`, an
ADR or a command's output.

| Agent | Its one job | Can edit |
|---|---|---|
| `architect` | turn a request into a plan: files, blast radius, the rules each must keep | no |
| `tester` | write the failing test first, then confirm it passes | test files only, fenced by a hook |
| `implementer` | make the agreed change, inside the planned files | yes |
| `reviewer` | check the change independently: run it, exercise what sits next to it, read the diff against `REVIEW.md` and the docs | no |
| `project-manager` | acceptance criteria and the task list, offered only where a plan folder exists | plan folders, by instruction; no hook enforces it |

**You pick each role**, one yes or no at a time. An agent the repo already has is graded and matched
to a role, and you confirm the match. Then it is offered concrete edits, one agent at a time with
the diff. A role it covers is never offered again, and Cortex never writes over an agent or skill it
did not create. A repo with the verifier is offered the upgrade to the Reviewer, and keeps the
verifier if it says no.

### How a task runs

A short section in `CLAUDE.md` puts the team to work. Before any work on a new task that changes
code, your session runs `/cortex-impact <files> --size` on the files the task will touch and tells
you, in words, what it recommends (one agent, the team, or that it cannot size the task) and why.
Then it ends its reply with the question **"Single agent or team?"** and waits: it plans, edits and
delegates nothing until you answer. It asks even when the recommendation is a single agent, and
even when you told it to just do it. The sizing thresholds are provisional: they were set from four
repos' commit history and are not yet measured against outcomes. It recommends; you decide.

The first release that offered the team wrote a section that could skip the question. On a repo
that has it, a re-run of `/cortex` offers to replace it, as described under the stamp record above.

Only once you answer "team" does the session load the `team` skill:

1. The Architect plans.
2. The Tester and the Reviewer object. An objection with no `path:line`, ADR or test behind it is
   dropped, and the session says how many it dropped.
3. The Architect accepts or rebuts each remaining objection, with a citation.
4. After at most two rounds, whatever is still open comes to you side by side, and you decide.
5. Then comes a failing test, the change, and an independent review.

The session passes work between the agents and edits nothing itself: a change the review calls for
goes back through the Implementer and then the Reviewer. Nothing is committed, pushed or merged
unless you ask.

### What the fence does not cover

The Tester's fence is a hook in its own agent file. It is an allow-list, so an edit is refused
unless it resolves to a test file inside the repo, and an input it cannot read is refused too. It
has limits:

- **An untrusted folder, and `claude -p`.** Claude Code skips the hook until you trust the folder,
  and a `-p` session never counts as trusted. The Tester still runs, unfenced.
- **Bash.** The Tester needs Bash to run tests, and a shell command can write any file. Writing only
  through Edit and Write is an instruction to it, not a guard.
- **Teammates.** A Tester spawned as an agent-teams teammate is not documented to carry the hook.
- **Windows without Git Bash.** Claude Code then runs hooks in PowerShell, and whether a failure
  there still refuses the edit depends on its version. Treat Git Bash as required.

Claude Code's experimental agent teams can run the same agents as teammates. Cortex never turns that
mode on, because it is experimental and costs far more tokens; the `team` skill says how, if you
choose to.

To remove the team, delete its section of `CLAUDE.md`, `.claude/skills/team/` and the agents.

## Brownfield-safe

A curated `AGENTS.md` or `CLAUDE.md` is never clobbered — you get `AGENTS.generated.md` to diff —
existing files back up to `*.bak`, and Cortex warns if a generated file is gitignored.
