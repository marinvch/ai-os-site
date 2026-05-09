import { HashRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import DocPage from './pages/DocPage'

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

export default function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/getting-started" element={<DocPage title="Installation" content={gettingStarted} />} />
          <Route path="/configuration" element={<DocPage title="Configuration" content={configuration} />} />
          <Route path="/profiles" element={<DocPage title="Profiles" content={profiles} />} />
          <Route path="/mcp-tools" element={<DocPage title="MCP Tools" content={mcpTools} />} />
          <Route path="/cli" element={<DocPage title="CLI Reference" content={cliRef} />} />
          <Route path="/dry-run" element={<DocPage title="Dry-Run Mode" content={dryRun} />} />
          <Route path="/memory" element={<DocPage title="Memory System" content={memory} />} />
          <Route path="/json-output" element={<DocPage title="JSON Output" content={jsonOutput} />} />
          <Route path="/architecture" element={<DocPage title="Architecture" content={architecture} />} />
          <Route path="/contributing" element={<DocPage title="Contributing" content={contributing} />} />
        </Routes>
      </Layout>
    </HashRouter>
  )
}
