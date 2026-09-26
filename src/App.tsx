import { Suspense, lazy } from 'react'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import { ThemeProvider } from './context/ThemeContext'

import install from './docs/install.md?raw'
import sequence from './docs/sequence.md?raw'
import whatLands from './docs/what-lands.md?raw'
import indexAndFindings from './docs/index-and-findings.md?raw'
import cortexView from './docs/cortex-view.md?raw'
import contextLayer from './docs/context-layer.md?raw'
import teamMemory from './docs/team-memory.md?raw'
import cli from './docs/cli.md?raw'
import principles from './docs/principles.md?raw'
import vault from './docs/vault.md?raw'
import privacy from './docs/privacy.md?raw'
import contributing from './docs/contributing.md?raw'
import migrate from './docs/migrate.md?raw'

const DocPage = lazy(() => import('./pages/DocPage'))
const Rituals = lazy(() => import('./pages/Rituals'))
const McpBrain = lazy(() => import('./pages/McpBrain'))

const Loader = () => <div className="content-loader" aria-live="polite">Loading…</div>

const docs: { path: string; title: string; content: string }[] = [
  { path: '/install', title: 'Installation', content: install },
  { path: '/sequence', title: 'The sequence', content: sequence },
  { path: '/what-lands', title: 'What lands in your repo', content: whatLands },
  { path: '/index-and-findings', title: 'Index & findings', content: indexAndFindings },
  { path: '/cortex-view', title: 'Cortex View', content: cortexView },
  { path: '/context-layer', title: 'The context layer', content: contextLayer },
  { path: '/team-memory', title: 'Team memory', content: teamMemory },
  { path: '/cli', title: 'CLI reference', content: cli },
  { path: '/principles', title: 'Design principles', content: principles },
  { path: '/vault', title: 'Personal vault', content: vault },
  { path: '/privacy', title: 'Privacy & firewall', content: privacy },
  { path: '/contributing', title: 'Contributing', content: contributing },
  { path: '/migrate', title: 'Moving off the old engine', content: migrate },
]

// Hash routes the old engine's site published. Links to them still exist in the wild, so each
// lands on the page that replaced it rather than on a 404.
const redirects: Record<string, string> = {
  '/getting-started': '/install',
  '/mcp-tools': '/mcp',
  '/memory': '/team-memory',
  '/architecture': '/principles',
  '/configuration': '/migrate',
  '/profiles': '/migrate',
  '/dry-run': '/migrate',
  '/json-output': '/migrate',
}

export default function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <Layout>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              {docs.map(d => (
                <Route key={d.path} path={d.path} element={<DocPage title={d.title} content={d.content} />} />
              ))}
              <Route path="/rituals" element={<Rituals />} />
              <Route path="/mcp" element={<McpBrain />} />
              {Object.entries(redirects).map(([from, to]) => (
                <Route key={from} path={from} element={<Navigate to={to} replace />} />
              ))}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Layout>
      </HashRouter>
    </ThemeProvider>
  )
}
