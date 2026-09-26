# Design principles

Each principle below is a decision record in the Cortex repository, with the alternatives it
rejected. They are the reasons Cortex behaves the way it does.

## The user decides, not the AI

Indexing and reporting cannot modify your repository. **The findings report is a proposal**, and
applying it is a separate, explicitly invoked step. `/cortex` may start the install sequence on its
own, but what protects your repo is a **consent gate on the first write**, not a flag that stops
the sequence from starting. *(ADR 0005)*

## The report is the script

The findings report is ranked by severity, and that ranking is the order you are asked what to act
on — propose everything, then one yes. A repo whose worst problem is a leaked secret is not asked
the same questions, in the same order, as one missing an `AGENTS.md`. *(ADR 0006)*

## No runtime dependencies

A plugin install clones the repository — it does not run `npm install`, honour a lockfile or build.
Whatever is in the tree is what runs. So Cortex has **no runtime dependencies**: its MCP transport
is about a hundred lines of Node, and a test fails the build if an import creeps back in.
*(ADR 0004)*

## One door onto a root

Every path a Cortex tool reads or writes goes through a single guard that resolves it and refuses
anything that escapes the root — including through a symlink. Safety that five modules each have to
remember is a disclosure bug waiting to happen. *(ADR 0007, and its shell counterpart ADR 0010)*

## A guarantee belongs to the act

A promise such as "the generated directories are gitignored" is kept by the code that performs the
write, not by whichever skill happens to mention it. Where a promise needs judgment it stays in the
skill — and a test asserts the sentence is there. *(ADR 0016)*

## The code layers

```
      core/          shared kernel — depends on nothing else
     /     \         paths (the root guard) · scrub (the secret gate) · memory · date
 index/    mcp/      leaves — depend on core, never on each other
```

A test fails if `core/` reaches upward, or if either leaf imports the other. Shared code goes in
`core/`; convenience imports across leaves are how two packages get welded into one.

## Official practice, checked

Cortex follows Anthropic's own Claude Code documentation, and vendors those rules as data — each
with its source page, the exact sentence it rests on, and the date it was checked. A maintainer
tool re-verifies them weekly, so a rule that changes upstream is noticed rather than trusted.
*(ADR 0017)*
