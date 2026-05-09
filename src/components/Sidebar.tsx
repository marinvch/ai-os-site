import { NavLink } from 'react-router-dom'
import { navGroups } from '../nav'

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export default function Sidebar({ open }: SidebarProps) {
  return (
    <nav className={`sidebar${open ? ' open' : ''}`}>
      {navGroups.map((group, gi) => (
        <div key={gi} className="sidebar-group">
          {group.title && (
            <div className="sidebar-group-title">{group.title}</div>
          )}
          {group.items.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `sidebar-link${isActive ? ' active' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      ))}

      <div style={{ marginTop: '2rem', padding: '0 1.25rem' }}>
        <a
          href="https://github.com/marinvch/ai-os/releases"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textDecoration: 'none', display: 'block', marginBottom: '0.4rem' }}
        >
          Changelog →
        </a>
        <a
          href="https://github.com/marinvch/ai-os/issues"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textDecoration: 'none' }}
        >
          Report an issue →
        </a>
      </div>
    </nav>
  )
}
