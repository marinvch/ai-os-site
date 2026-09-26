import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { fillFacts } from '../facts'

// Page markdown: fact tokens are filled from site-facts.json before rendering.
export default function Markdown({ source }: { source: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
      {fillFacts(source)}
    </ReactMarkdown>
  )
}

// One line of inline markdown — a ritual's `when` or `does` cell — without a wrapping <p>.
export function InlineMarkdown({ source }: { source: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ p: ({ children }) => <>{children}</> }}>
      {source}
    </ReactMarkdown>
  )
}
