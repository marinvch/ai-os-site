import { useEffect, type ReactNode } from 'react'
import Markdown from '../components/Markdown'
import { SITE_TITLE } from '../site'

interface DocPageProps {
  title: string
  content: string
  children?: ReactNode
}

export default function DocPage({ title, content, children }: DocPageProps) {
  useEffect(() => {
    document.title = `${title} — Cortex`
    return () => {
      document.title = SITE_TITLE
    }
  }, [title])

  return (
    <article className="prose" aria-label={title}>
      <Markdown source={content} />
      {children}
    </article>
  )
}
