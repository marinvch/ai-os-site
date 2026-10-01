import { Fragment, type ReactNode } from 'react'

// One line of a ritual's `when` or `does` cell: `code`, **strong** and *emphasis*, nothing else.
// It is not react-markdown on purpose. The home page shows these cells, and importing the markdown
// pipeline for three kinds of span put it, with syntax highlighting, in the bundle every visitor
// loads first. Text goes to React as text, so a `<` in a cell is shown, never parsed as HTML.
// scripts/check-facts.mjs fails the build on a cell that uses anything else.
export const INLINE_SYNTAX = /`[^`]+`|\*\*[^*]+\*\*|\*[^*\s][^*]*\*/g

export function InlineMarkdown({ source }: { source: string }) {
  const out: ReactNode[] = []
  let last = 0
  for (const m of source.matchAll(INLINE_SYNTAX)) {
    const at = m.index ?? 0
    if (at > last) out.push(source.slice(last, at))
    const t = m[0]
    if (t.startsWith('`')) out.push(<code key={at}>{t.slice(1, -1)}</code>)
    else if (t.startsWith('**')) out.push(<strong key={at}>{t.slice(2, -2)}</strong>)
    else out.push(<em key={at}>{t.slice(1, -1)}</em>)
    last = at + t.length
  }
  if (last < source.length) out.push(source.slice(last))
  return <Fragment>{out}</Fragment>
}
