import { useEffect, type ReactNode } from 'react'
import Markdown from '../components/Markdown'
import { SITE_TITLE } from '../site'

interface DocPageProps {
  title: string
  content: string
  /** Rendered between the page's introduction and its first `##` section. */
  afterIntro?: ReactNode
  children?: ReactNode
}

/** The page up to its first `##` heading, and the rest. A page with no section is all intro. */
function splitIntro(content: string): [string, string] {
  const at = content.search(/^## /m)
  return at === -1 ? [content, ''] : [content.slice(0, at), content.slice(at)]
}

export default function DocPage({ title, content, afterIntro, children }: DocPageProps) {
  useEffect(() => {
    document.title = `${title} — Cortex`
    return () => {
      document.title = SITE_TITLE
    }
  }, [title])

  const [intro, rest] = afterIntro ? splitIntro(content) : [content, '']

  return (
    <article className="prose" aria-label={title}>
      <Markdown source={intro} />
      {afterIntro}
      {rest && <Markdown source={rest} />}
      {children}
    </article>
  )
}
