// Every fact this site states about Cortex comes from here, and this comes from site-facts.json —
// generated in the Cortex repo by `node tools/cortex-site-facts.mjs --out site-facts.json`.
// The site drifted four product versions once because it restated these by hand (Cortex #415).
// Nothing in src/ may hard-code a version, an install command, a ritual or an MCP tool;
// scripts/check-facts.mjs fails the build when a page names a ritual this file does not know.
import raw from '../site-facts.json'

export interface Ritual {
  name: string
  when: string
  does: string
  invocation: 'model' | 'user'
}

export interface McpTool {
  name: string
  modes: ('repo' | 'vault')[]
  description: string
}

export interface SiteFacts {
  schema: number
  version: string
  node: string
  install: { commands: string[] }
  rituals: Ritual[]
  mcpTools: McpTool[]
}

export const facts = raw as SiteFacts

/** The install block exactly as Cortex's README states it, one command per line. */
export const installBlock = facts.install.commands.join('\n')

/**
 * Fill `{{token}}` placeholders in a markdown page from the facts, so prose can state a fact
 * without restating it. An unknown token throws: a typo must fail the build, not ship as text.
 */
export function fillFacts(md: string): string {
  const tokens: Record<string, string> = {
    version: facts.version,
    node: facts.node,
    install: '```\n' + installBlock + '\n```',
    ritualCount: String(facts.rituals.length),
    mcpToolCount: String(facts.mcpTools.length),
    repoTools: facts.mcpTools.filter(t => t.modes.includes('repo')).map(t => '`' + t.name + '`').join(', '),
    vaultTools: facts.mcpTools.filter(t => t.modes.includes('vault')).map(t => '`' + t.name + '`').join(', '),
  }
  return md.replace(/\{\{(\w+)\}\}/g, (_, key: string) => {
    if (!(key in tokens)) throw new Error(`Unknown fact token {{${key}}}`)
    return tokens[key]
  })
}

// A ritual named in page code goes through here, so the build check can find every one
// (scripts/check-facts.mjs looks for `ritual('<name>')`) and the page breaks loudly, not silently.
export function ritual(name: string): Ritual {
  const found = facts.rituals.find(r => r.name === name)
  if (!found) throw new Error(`Unknown ritual /${name} — not in site-facts.json`)
  return found
}
