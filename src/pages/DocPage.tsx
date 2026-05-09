import { useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'

interface DocPageProps {
  title: string
  content: string
}

export default function DocPage({ title, content }: DocPageProps) {
  useEffect(() => {
    document.title = `${title} — AI OS`
    return () => {
      document.title = 'AI OS — Context-enriched GitHub Copilot Framework'
    }
  }, [title])

  return (
    <article className="prose" aria-label={title}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
      >
        {content}
      </ReactMarkdown>
    </article>
  )
}
