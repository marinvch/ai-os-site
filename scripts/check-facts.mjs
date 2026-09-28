#!/usr/bin/env node
// Fails the build when the site states a Cortex fact that site-facts.json does not back.
//
// The site once drifted four product versions behind because every page restated facts by hand.
// Facts now render from site-facts.json (generated in the Cortex repo by
// `node tools/cortex-site-facts.mjs --out site-facts.json`), and this check keeps prose honest:
//
//   1. site-facts.json has the shape src/facts.ts expects.
//   2. Every ritual a page names — `/name` in inline code, or a fenced line starting `/name` — is a
//      ritual in site-facts.json, or on the short allowlist below with its reason.
//   3. Every ritual page code names goes through ritual('name'), and that name exists.
//   4. Every {{token}} a page uses is one fillFacts() knows.
//   5. The two fact pages (Rituals, MCP brain) name no ritual or tool by hand at all.
//
// Run: node scripts/check-facts.mjs   (the build runs it first)
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))

// Slash commands a page may name that are not Cortex rituals.
const ALLOW = new Map([
  ['plugin', "Claude Code's own /plugin command — the first install step"],
  ['reload-plugins', "Claude Code's own command that loads an updated plugin into a running session"],
])

const problems = []
const fail = (msg) => problems.push(msg)

// ── 1. shape ──
let facts
try {
  facts = JSON.parse(readFileSync(join(root, 'site-facts.json'), 'utf8'))
} catch (e) {
  console.error(`check-facts: cannot read site-facts.json — ${e.message}`)
  process.exit(1)
}
if (facts.schema !== 1) fail(`site-facts.json schema is ${facts.schema}; this site reads schema 1`)
if (!/^\d+\.\d+\.\d+$/.test(facts.version ?? '')) fail(`site-facts.json version "${facts.version}" is not x.y.z`)
if (typeof facts.node !== 'string' || !facts.node) fail('site-facts.json has no node floor')
if (!Array.isArray(facts.install?.commands) || facts.install.commands.length === 0) fail('site-facts.json has no install commands')
if (!Array.isArray(facts.rituals) || facts.rituals.length === 0) fail('site-facts.json has no rituals')
if (!Array.isArray(facts.mcpTools) || facts.mcpTools.length === 0) fail('site-facts.json has no MCP tools')
for (const r of facts.rituals ?? []) {
  for (const k of ['name', 'when', 'does']) if (typeof r[k] !== 'string' || !r[k]) fail(`ritual ${JSON.stringify(r.name)} has no ${k}`)
  if (r.invocation !== 'model' && r.invocation !== 'user') fail(`ritual /${r.name} has invocation "${r.invocation}"`)
}
for (const t of facts.mcpTools ?? []) {
  if (!Array.isArray(t.modes) || t.modes.some(m => m !== 'repo' && m !== 'vault')) fail(`MCP tool ${t.name} has modes ${JSON.stringify(t.modes)}`)
}
if (problems.length) report()

const rituals = new Set(facts.rituals.map(r => r.name))
const tools = new Set(facts.mcpTools.map(t => t.name))

const files = []
;(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walk(p)
    else if (/\.(md|tsx?)$/.test(name)) files.push(p)
  }
})(join(root, 'src'))

// fillFacts' token names, read from its source so the two cannot disagree.
const factsTs = readFileSync(join(root, 'src', 'facts.ts'), 'utf8')
const tokenBlock = factsTs.match(/const tokens[^{]*\{([\s\S]*?)\n\s*\}/)
const knownTokens = new Set(tokenBlock ? [...tokenBlock[1].matchAll(/(?:^|[\s,])(\w+):/g)].map(m => m[1]) : [])
if (knownTokens.size === 0) fail('src/facts.ts: could not read the fillFacts token list')

const checkRitual = (name, where) => {
  if (rituals.has(name) || ALLOW.has(name)) return
  fail(`${where}: names /${name}, which is not a ritual in site-facts.json`)
}

for (const file of files) {
  const rel = relative(root, file).replaceAll('\\', '/')
  const text = readFileSync(file, 'utf8')
  const lines = text.split('\n')

  if (file.endsWith('.md')) {
    // ── 2. rituals in markdown ──
    let fenced = false
    lines.forEach((line, i) => {
      const where = `${rel}:${i + 1}`
      if (/^\s*```/.test(line)) { fenced = !fenced; return }
      if (fenced) {
        const m = line.match(/^\s*\/([a-z][a-z0-9-]*)(?=\s|$)/)
        if (m) checkRitual(m[1], where)
        return
      }
      for (const m of line.matchAll(/`\/([a-z][a-z0-9-]*)(?=[`\s<])/g)) checkRitual(m[1], where)
      // ── 4. tokens ──
      for (const m of line.matchAll(/\{\{(\w+)\}\}/g)) {
        if (!knownTokens.has(m[1])) fail(`${where}: {{${m[1]}}} is not a fact token fillFacts() knows`)
      }
    })
    continue
  }

  // ── 3. rituals in page code ──
  lines.forEach((line, i) => {
    const where = `${rel}:${i + 1}`
    if (/^\s*\/\//.test(line)) return
    for (const m of line.matchAll(/\britual\(\s*['"`]([^'"`]+)['"`]\s*\)/g)) {
      if (!rituals.has(m[1])) fail(`${where}: ritual('${m[1]}') is not a ritual in site-facts.json`)
    }
    for (const m of line.matchAll(/<code[^>]*>\/([a-z][a-z0-9-]*)<\/code>/g)) checkRitual(m[1], where)
  })

  // ── 5. the fact pages restate nothing ──
  if (/\/(Rituals|McpBrain)\.tsx$/.test(rel)) {
    lines.forEach((line, i) => {
      for (const m of line.matchAll(/['"`]\/?([a-z][a-z0-9_-]*)['"`]/g)) {
        if (rituals.has(m[1]) || tools.has(m[1])) {
          fail(`${rel}:${i + 1}: hard-codes "${m[1]}" — a fact page renders rituals and tools from site-facts.json only`)
        }
      }
    })
  }
}

report()

function report() {
  if (problems.length) {
    console.error(`check-facts: ${problems.length} problem(s)\n` + problems.map(p => `  ✗ ${p}`).join('\n'))
    console.error('\nIf Cortex changed, regenerate: in a Cortex clone, node tools/cortex-site-facts.mjs --out <this repo>/site-facts.json')
    process.exit(1)
  }
  console.log(`check-facts: ok — v${facts.version}, ${rituals.size} rituals, ${tools.size} MCP tools, ${files.length} files checked`)
  process.exit(0)
}
