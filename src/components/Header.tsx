import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import MenuIcon from '@mui/icons-material/Menu'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import GitHubIcon from '@mui/icons-material/GitHub'
import LaunchIcon from '@mui/icons-material/Launch'

interface HeaderProps {
  onMenuToggle: () => void
}

export default function Header({ onMenuToggle }: HeaderProps) {
  const { theme, toggle } = useTheme()

  return (
    <header className="header">
      <Tooltip title="Navigation" placement="bottom">
        <IconButton
          onClick={onMenuToggle}
          aria-label="Toggle navigation"
          size="small"
          sx={{ display: { md: 'none' }, mr: 0.5, color: 'text.primary' }}
        >
          <MenuIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Link to="/" className="header-logo">
        <svg className="header-logo-icon" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="64" height="64" rx="10" fill="#0f172a"/>
          <line x1="12" y1="32" x2="24" y2="32" stroke="#3b82f6" strokeWidth="2"/>
          <line x1="40" y1="32" x2="52" y2="32" stroke="#3b82f6" strokeWidth="2"/>
          <line x1="32" y1="12" x2="32" y2="24" stroke="#3b82f6" strokeWidth="2"/>
          <line x1="32" y1="40" x2="32" y2="52" stroke="#3b82f6" strokeWidth="2"/>
          <line x1="18" y1="18" x2="24" y2="24" stroke="#60a5fa" strokeWidth="1.5"/>
          <line x1="46" y1="18" x2="40" y2="24" stroke="#60a5fa" strokeWidth="1.5"/>
          <line x1="18" y1="46" x2="24" y2="40" stroke="#60a5fa" strokeWidth="1.5"/>
          <line x1="46" y1="46" x2="40" y2="40" stroke="#60a5fa" strokeWidth="1.5"/>
          <circle cx="32" cy="32" r="8" fill="#1e40af" stroke="#3b82f6" strokeWidth="2"/>
          <circle cx="32" cy="32" r="3" fill="#60a5fa"/>
          <circle cx="12" cy="32" r="3" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="1.5"/>
          <circle cx="52" cy="32" r="3" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="1.5"/>
          <circle cx="32" cy="12" r="3" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="1.5"/>
          <circle cx="32" cy="52" r="3" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="1.5"/>
        </svg>
        AI OS
      </Link>

      <span className="header-version">v0.15.0</span>

      <div className="header-spacer" />

      <Tooltip title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
        <IconButton onClick={toggle} size="small" sx={{ color: 'text.secondary', mx: 0.25 }}>
          {theme === 'light'
            ? <DarkModeOutlinedIcon fontSize="small" />
            : <LightModeOutlinedIcon fontSize="small" />}
        </IconButton>
      </Tooltip>

      <Tooltip title="View on GitHub">
        <IconButton
          component="a"
          href="https://github.com/marinvch/ai-os"
          target="_blank"
          rel="noopener noreferrer"
          size="small"
          sx={{ color: 'text.secondary', mx: 0.25 }}
        >
          <GitHubIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Tooltip title="View on npm">
        <IconButton
          component="a"
          href="https://www.npmjs.com/package/ai-os"
          target="_blank"
          rel="noopener noreferrer"
          size="small"
          sx={{
            color: '#fff',
            bgcolor: 'primary.main',
            ml: 0.5,
            px: 1.5,
            borderRadius: '6px',
            fontSize: '0.8rem',
            fontWeight: 600,
            gap: 0.5,
            '&:hover': { bgcolor: 'primary.dark' },
          }}
        >
          <LaunchIcon sx={{ fontSize: '0.9rem' }} />
          npm
        </IconButton>
      </Tooltip>
    </header>
  )
}
