import { Suspense, lazy } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import { ThemeProvider } from './context/ThemeContext'

import gettingStarted from './docs/getting-started.md?raw'
import configuration from './docs/configuration.md?raw'
import profiles from './docs/profiles.md?raw'
import mcpTools from './docs/mcp-tools.md?raw'
import cliRef from './docs/cli-reference.md?raw'
import dryRun from './docs/dry-run.md?raw'
import memory from './docs/memory.md?raw'
import jsonOutput from './docs/json-output.md?raw'
import architecture from './docs/architecture.md?raw'
import contributing from './docs/contributing.md?raw'

const DocPage = lazy(() => import('./pages/DocPage'))

const Loader = () => <div className="content-loader" aria-live="polite">Loading…</div>

export default function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/getting-started" element={<Suspense fallback={<Loader />}><DocPage title="Installation" content={gettingStarted} /></Suspense>} />
            <Route path="/configuration" element={<Suspense fallback={<Loader />}><DocPage title="Configuration" content={configuration} /></Suspense>} />
            <Route path="/profiles" element={<Suspense fallback={<Loader />}><DocPage title="Profiles" content={profiles} /></Suspense>} />
            <Route path="/mcp-tools" element={<Suspense fallback={<Loader />}><DocPage title="MCP Tools" content={mcpTools} /></Suspense>} />
            <Route path="/cli" element={<Suspense fallback={<Loader />}><DocPage title="CLI Reference" content={cliRef} /></Suspense>} />
            <Route path="/dry-run" element={<Suspense fallback={<Loader />}><DocPage title="Dry-Run Mode" content={dryRun} /></Suspense>} />
            <Route path="/memory" element={<Suspense fallback={<Loader />}><DocPage title="Memory System" content={memory} /></Suspense>} />
            <Route path="/json-output" element={<Suspense fallback={<Loader />}><DocPage title="JSON Output" content={jsonOutput} /></Suspense>} />
            <Route path="/architecture" element={<Suspense fallback={<Loader />}><DocPage title="Architecture" content={architecture} /></Suspense>} />
            <Route path="/contributing" element={<Suspense fallback={<Loader />}><DocPage title="Contributing" content={contributing} /></Suspense>} />
          </Routes>
        </Layout>
      </HashRouter>
    </ThemeProvider>
  )
}
