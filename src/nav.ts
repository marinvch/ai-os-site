export interface NavItem {
  label: string
  path: string
}

export interface NavGroup {
  title: string | null
  items: NavItem[]
}

export const navGroups: NavGroup[] = [
  {
    title: null,
    items: [{ label: 'Home', path: '/' }],
  },
  {
    title: 'Getting Started',
    items: [
      { label: 'Installation', path: '/getting-started' },
      { label: 'Configuration', path: '/configuration' },
      { label: 'Profiles', path: '/profiles' },
    ],
  },
  {
    title: 'Features',
    items: [
      { label: 'MCP Tools', path: '/mcp-tools' },
      { label: 'CLI Reference', path: '/cli' },
      { label: 'Dry-Run Mode', path: '/dry-run' },
      { label: 'Memory System', path: '/memory' },
      { label: 'JSON Output', path: '/json-output' },
    ],
  },
  {
    title: 'Reference',
    items: [
      { label: 'Architecture', path: '/architecture' },
      { label: 'Contributing', path: '/contributing' },
    ],
  },
]
