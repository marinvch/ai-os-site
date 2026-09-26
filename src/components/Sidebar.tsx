import { useNavigate, useLocation } from 'react-router-dom'
import { navGroups } from '../nav'
import { REPO_URL } from '../site'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined'
import FormatListNumberedOutlinedIcon from '@mui/icons-material/FormatListNumberedOutlined'
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined'
import TravelExploreOutlinedIcon from '@mui/icons-material/TravelExploreOutlined'
import HubOutlinedIcon from '@mui/icons-material/HubOutlined'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined'
import MemoryOutlinedIcon from '@mui/icons-material/MemoryOutlined'
import TerminalOutlinedIcon from '@mui/icons-material/TerminalOutlined'
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined'
import BookOutlinedIcon from '@mui/icons-material/BookOutlined'
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined'
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined'
import MoveUpOutlinedIcon from '@mui/icons-material/MoveUpOutlined'
import type { SvgIconComponent } from '@mui/icons-material'

const iconMap: Record<string, SvgIconComponent> = {
  '/': HomeOutlinedIcon,
  '/install': DownloadOutlinedIcon,
  '/sequence': FormatListNumberedOutlinedIcon,
  '/what-lands': FolderOutlinedIcon,
  '/index-and-findings': TravelExploreOutlinedIcon,
  '/cortex-view': HubOutlinedIcon,
  '/context-layer': DescriptionOutlinedIcon,
  '/team-memory': GroupsOutlinedIcon,
  '/rituals': AutoStoriesOutlinedIcon,
  '/mcp': MemoryOutlinedIcon,
  '/cli': TerminalOutlinedIcon,
  '/principles': AccountTreeOutlinedIcon,
  '/vault': BookOutlinedIcon,
  '/privacy': ShieldOutlinedIcon,
  '/contributing': HandshakeOutlinedIcon,
  '/migrate': MoveUpOutlinedIcon,
}

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <nav className={`sidebar${open ? ' open' : ''}`} aria-label="Documentation">
      {navGroups.map((group, gi) => (
        <div key={gi}>
          {group.title && <span className="sidebar-group-title">{group.title}</span>}
          <List dense disablePadding>
            {group.items.map(item => {
              const Icon = iconMap[item.path]
              const isActive = location.pathname === item.path
              return (
                <ListItemButton
                  key={item.path}
                  selected={isActive}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={() => { navigate(item.path); onClose() }}
                >
                  {Icon && (
                    <ListItemIcon>
                      <Icon sx={{ fontSize: '1.2rem' }} />
                    </ListItemIcon>
                  )}
                  <ListItemText
                    disableTypography
                    primary={
                      <span style={{ fontSize: '0.975rem', fontWeight: isActive ? 700 : 500 }}>
                        {item.label}
                      </span>
                    }
                  />
                </ListItemButton>
              )
            })}
          </List>
        </div>
      ))}

      <div className="sidebar-footer">
        <a href={`${REPO_URL}/blob/master/CHANGELOG.md`} target="_blank" rel="noopener noreferrer">
          Changelog →
        </a>
        <a href={`${REPO_URL}/issues`} target="_blank" rel="noopener noreferrer">
          Report an issue →
        </a>
      </div>
    </nav>
  )
}
