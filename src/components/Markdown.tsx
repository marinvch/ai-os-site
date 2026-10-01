import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlightFences from './highlight'
import { fillFacts } from '../facts'

// Page markdown: fact tokens are filled from site-facts.json before rendering.
export default function Markdown({ source }: { source: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlightFences]}>
      {fillFacts(source)}
    </ReactMarkdown>
  )
}
