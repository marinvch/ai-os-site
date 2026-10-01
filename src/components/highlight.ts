import { createLowlight } from 'lowlight'
import bash from 'highlight.js/lib/languages/bash'

// Syntax highlighting for the fences the pages use, and no others. rehype-highlight did this job,
// but it imports all 37 of lowlight's common grammars whatever it is told to register, and they
// weighed more than every page of prose together. The pages fence only `bash`. A fence in another
// language renders as plain code until its grammar is registered here.
const lowlight = createLowlight({ bash })

interface Node {
  type: string
  tagName?: string
  value?: string
  properties?: { className?: unknown }
  children?: Node[]
}

const classes = (n: Node): string[] => (Array.isArray(n.properties?.className) ? (n.properties!.className as string[]) : [])
const text = (n: Node): string => n.value ?? (n.children ?? []).map(text).join('')

function walk(node: Node, parent: Node | null) {
  if (node.type === 'element' && node.tagName === 'code' && parent?.tagName === 'pre') {
    const lang = classes(node).find(c => c.startsWith('language-'))?.slice('language-'.length)
    if (lang && lowlight.registered(lang)) {
      node.children = lowlight.highlight(lang, text(node)).children as Node[]
      node.properties = { ...node.properties, className: [...classes(node), 'hljs'] }
    }
    return
  }
  for (const child of node.children ?? []) walk(child, node)
}

/** A rehype plugin: highlight `pre > code.language-<registered>` in place. */
export default function rehypeHighlightFences() {
  return (tree: Node) => walk(tree, null)
}
