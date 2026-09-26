# Index & findings

Cortex understands a repository in two layers: a **deterministic index** anyone can reproduce, and
an optional **enrichment** a model writes on top of it. From the index it writes **one ranked
findings report**.

## The index

The structural map of a repository: files, languages, resolved imports, layers, test flags, git
hot spots. Built with **no LLM and no network**, so the same tree always produces the same output —
two runs agree byte for byte. That is what makes it safe in CI and cheap on every install.

It lives at `.cortex/index/index.json` and is the source of truth for structure. It asks **git**
which files belong to the repo, rather than guessing from ignore files.

**Imports are resolved by pattern, not by a parser.** A plugin install runs no build, so there is
no parser to run. The consequence is stated rather than hidden: dynamic imports are invisible, so
every "who depends on this" number is a **floor**, never a total, and an orphan is stated as a
question, never as a delete list.

## Findings

The single ranked markdown report at `.cortex/findings/<date>.md` — issues, gaps and
opportunities, ranked by severity. **Proposals only.** The module that produces findings has no
authority to modify a repository; nothing outside `.cortex/` is written until you choose.

The ranking is not decoration: it is the order `/cortex` walks when it asks you what to act on.
Offers collapse by action, so one "add a brief" question can cover several findings — and a merged
question inherits the severity of its most serious member, so merging never buries a critical one.

## Enrichment

The optional prose layer — a summary, role and tags per file — produced by a model with
`/cortex-enrich`. It lives beside the index in `enriched.json` and is **strictly additive**: it
never edits `index.json`, adds files or removes them, and its absence degrades Cortex to
deterministic behaviour rather than breaking it.

Enrichment made against an older tree is declined, not shown: a summary about a file as it was
last month is worse than no summary.

## Run it yourself

From a clone of the Cortex repository — inside a skill these run through the plugin's own path:

```bash
node index/cortex-next.mjs .        # where this repo is; writes nothing at all
node index/cortex-index.mjs .       # writes .cortex/index/index.json
node index/cortex-findings.mjs .    # writes .cortex/findings/<date>.md
node index/cortex-view.mjs .        # writes .cortex/view/repo.html and opens it
node index/cortex-enrich.mjs plan . # optional: plan the semantic enrichment pass
```
