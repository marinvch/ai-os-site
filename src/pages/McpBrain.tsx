import DocPage from './DocPage'
import { facts } from '../facts'
import mcp from '../docs/mcp.md?raw'

// The prose is mcp.md; the table is site-facts.json. No tool is named here by hand.
export default function McpBrain() {
  return (
    <DocPage title="MCP brain" content={mcp}>
      <table>
        <thead>
          <tr>
            <th scope="col">Tool</th>
            <th scope="col">Mode</th>
            <th scope="col">Does</th>
          </tr>
        </thead>
        <tbody>
          {facts.mcpTools.map(t => (
            <tr key={t.name}>
              <td><code className="ritual-name">{t.name}</code></td>
              <td>
                {t.modes.map(m => (
                  <span key={m} className={m === 'repo' ? 'badge badge-user' : 'badge'} style={{ marginRight: 4 }}>{m}</span>
                ))}
              </td>
              <td>{t.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </DocPage>
  )
}
