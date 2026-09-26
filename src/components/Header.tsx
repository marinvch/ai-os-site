import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import MenuIcon from '@mui/icons-material/Menu'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import GitHubIcon from '@mui/icons-material/GitHub'
import Logo from './Logo'
import { facts } from '../facts'
import { REPO_URL } from '../site'

interface HeaderProps {
  onMenuToggle: () => void
}

export default function Header({ onMenuToggle }: HeaderProps) {
  const { theme, toggle } = useTheme()
  const next = theme === 'light' ? 'dark' : 'light'

  return (
    <header className="header">
      <Tooltip title="Navigation">
        <IconButton
          onClick={onMenuToggle}
          aria-label="Toggle navigation"
          sx={{ display: { md: 'none' }, mr: 0.5, color: 'text.primary' }}
        >
          <MenuIcon />
        </IconButton>
      </Tooltip>

      <Link to="/" className="header-logo">
        <Logo className="header-logo-icon" />
        Cortex
      </Link>

      <span className="header-version" aria-label={`Version ${facts.version}`}>v{facts.version}</span>
      <span className="header-tag">a Claude plugin</span>

      <div className="header-spacer" />

      <Tooltip title={`Switch to ${next} mode`}>
        <IconButton onClick={toggle} aria-label={`Switch to ${next} mode`} sx={{ color: 'text.primary', mx: 0.25 }}>
          {theme === 'light' ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
        </IconButton>
      </Tooltip>

      <Tooltip title="Cortex on GitHub">
        <IconButton
          component="a"
          href={REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Cortex on GitHub"
          sx={{ color: 'text.primary', mx: 0.25 }}
        >
          <GitHubIcon />
        </IconButton>
      </Tooltip>
    </header>
  )
}
