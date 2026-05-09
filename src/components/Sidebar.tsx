import { useNavigate, useLocation } from 'react-router-dom'
import { navGroups } from '../nav'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined'
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined'
import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined'
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined'
import TerminalOutlinedIcon from '@mui/icons-material/TerminalOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import MemoryOutlinedIcon from '@mui/icons-material/MemoryOutlined'
import DataObjectOutlinedIcon from '@mui/icons-material/DataObjectOutlined'
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import type { SvgIconComponent } from '@mui/icons-material'

const iconMap: Record<string, SvgIconComponent> = {
  '/': HomeOutlinedIcon,
  '/getting-started': DownloadOutlinedIcon,
  '/configuration': TuneOutlinedIcon,
  '/profiles': LayersOutlinedIcon,
  '/mcp-tools': BuildOutlinedIcon,
  '/cli': TerminalOutlinedIcon,
  '/dry-run': VisibilityOutlinedIcon,
  '/memory': MemoryOutlinedIcon,
  '/json-output': DataObjectOutlinedIcon,
  '/architecture': AccountTreeOutlinedIcon,
  '/contributing': GroupsOutlinedIcon,
}

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export default function Sidebar({ open }: SidebarProps) {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <nav className={`sidebar${open ? ' open' : ''}`}>
      {navGroups.map((group, gi) => (
        <div key={gi}>
          {group.title && (
            <Typography
              variant="caption"
              sx={{
                display: 'block',
                px: 2.5,
                pt: gi === 0 ? 1.5 : 2,
                pb: 0.5,
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'text.disabled',
                fontSize: '0.675rem',
              }}
            >
              {group.title}
            </Typography>
          )}
          <List dense disablePadding>
            {group.items.map(item => {
              const Icon = iconMap[item.path]
              const isActive = location.pathname === item.path
              return (
                <ListItemButton
                  key={item.path}
                  selected={isActive}
                  onClick={() => navigate(item.path)}
                  sx={{ py: 0.6 }}
                >
                  {Icon && (
                    <ListItemIcon>
                      <Icon sx={{ fontSize: '1.05rem' }} />
                    </ListItemIcon>
                  )}
                  <ListItemText
                    disableTypography
                    primary={
                      <span style={{ fontSize: '0.875rem', fontWeight: isActive ? 600 : 400 }}>
                        {item.label}
                      </span>
                    }
                  />
                </ListItemButton>
              )
            })}
          </List>
          {gi < navGroups.length - 1 && (
            <Divider sx={{ mx: 2, mt: 1.5, borderColor: 'divider' }} />
          )}
        </div>
      ))}

      <div style={{ marginTop: '1.5rem', padding: '0 1.5rem' }}>
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
