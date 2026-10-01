import { useEffect, useMemo, useState } from 'react'
import { facts } from '../facts'
import { InlineMarkdown } from '../components/InlineMarkdown'
import { SITE_TITLE } from '../site'

// Every row comes from site-facts.json. Nothing on this page names a ritual by hand.
export default function Rituals() {
  const [query, setQuery] = useState('')

  useEffect(() => {
    document.title = 'Rituals — Cortex'
    return () => { document.title = SITE_TITLE }
  }, [])

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return facts.rituals
    return facts.rituals.filter(r => `${r.name} ${r.when} ${r.does}`.toLowerCase().includes(q))
  }, [query])

  const userOnly = facts.rituals.filter(r => r.invocation === 'user').length

  return (
    <article className="prose" aria-label="Rituals">
      <h1>Rituals</h1>
      <p>
        The interface to Cortex is {facts.rituals.length} rituals — each a plain-markdown{' '}
        <code>SKILL.md</code>. With the plugin installed they are slash commands; without
        it, name one to any AI tool and it can follow it.
      </p>
      <p>
        <span className="badge">Claude or you</span> rituals may be started by Claude when the request
        matches. <span className="badge badge-user">you only</span> rituals — {userOnly} of them — do
        something you should decide to do, so only you can start them.
      </p>

      <div className="fact-toolbar">
        <label htmlFor="ritual-filter" style={{ position: 'absolute', left: '-9999px' }}>Filter rituals</label>
        <input
          id="ritual-filter"
          className="fact-filter"
          type="search"
          placeholder="Filter by name, when, or what it does"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <span className="fact-count" aria-live="polite">
          {rows.length} of {facts.rituals.length}
        </span>
      </div>

      <table>
        <thead>
          <tr>
            <th scope="col">Ritual</th>
            <th scope="col">When</th>
            <th scope="col">Does</th>
            <th scope="col">Started by</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.name}>
              <td><code className="ritual-name">/{r.name}</code></td>
              <td><InlineMarkdown source={r.when} /></td>
              <td><InlineMarkdown source={r.does} /></td>
              <td>
                {r.invocation === 'user'
                  ? <span className="badge badge-user">you only</span>
                  : <span className="badge">Claude or you</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  )
}
