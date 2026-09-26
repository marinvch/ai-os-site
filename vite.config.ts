import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import facts from './site-facts.json'

// index.html states the version in its JSON-LD; it comes from site-facts.json like every other fact.
function siteFacts(): Plugin {
  return {
    name: 'cortex-site-facts',
    transformIndexHtml: html => html.replaceAll('%CORTEX_VERSION%', facts.version),
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), siteFacts()],
  base: '/cortex-site/',
})
